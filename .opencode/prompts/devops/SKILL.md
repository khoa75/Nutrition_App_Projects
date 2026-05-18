---
name: devops
description: Docker Compose setup, CI/CD pipelines, infrastructure scaling, monitoring, and backup strategies
license: Apache-2.0
compatibility: opencode
---
## 1. Services & Ports
| Service | Port | Docker Image Base |
|---------|------|-------------------|
| Spring Boot Backend | 8080 | eclipse-temurin:21-jdk |
| React Admin | 3000 | node:20-alpine (build stage) |
| PostgreSQL | 5432 | postgres:15 |

## 2. Docker Compose (Local Dev)
```yaml
services:
  backend:
    build: ./backend
    ports: ["8080:8080"]
    depends_on: [postgres]
  postgres:
    image: postgres:15
    ports: ["5432:5432"]
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: nutrition_db
```

## 3. CI/CD Pipeline (GitHub Actions)
```
Workflows:
├── backend-ci.yml       # Build, test, lint on PR to main
├── react-native-ci.yml  # lint (ESLint), TypeScript check, Jest tests
├── react-ci.yml         # lint, test, build (Admin Dashboard)
├── deploy-staging.yml   # Deploy all services to staging
└── deploy-prod.yml      # Deploy with manual approval gate
```

## 4. Infrastructure (Initial: Single VPS → Scale: AWS/GCP)
- **Phase 1**: Single VPS (Docker Compose, 2GB RAM, 2 CPU)
- **Phase 2**: AWS ECS or GCP Cloud Run (containerized, auto-scale)
- **Phase 3**: PostgreSQL managed service (RDS/Cloud SQL), Redis (caching)

## 5. Monitoring Stack
- Backend: Spring Boot Actuator + /health endpoint
- Logging: Centralized via `docker logs` → later ELK/Fluentd
- Uptime target: ≥ 99.5% (max ~3.5h downtime/month)

## 6. Backup Strategy
- PostgreSQL automated snapshots (daily, 7-day retention)
- Configuration in `.env` files / GitHub Secrets (never in code)

## 7. Implementation Prompts
These steps guide the automated implementation of CI/CD:
- [Step 1: Backend CI](.opencode/prompts/devops/github-actions-prompts/step_1_ci_backend.md)
- [Step 2: Frontend CI](.opencode/prompts/devops/github-actions-prompts/step_2_ci_frontend.md)
- [Step 3: CD & Deployment](.opencode/prompts/devops/github-actions-prompts/step_3_cd_deployment.md)

## 8. Workflow Practices
- **Full Automation:** All source code changes pushed to main branches or creating Pull Requests must trigger automated check pipelines (Lint, Test, Build).
- **Environment Separation:**
  - `feature-*` branches: Only run CI (Build, Test) to detect errors early.
  - `staging` (or pre-prod) branch: Run CI and automatically deploy (CD) to staging environment for integration testing.
  - `main` branch: Requires manual approval (Manual Approval Gate) before deploying (CD) to Production.
- **Fail-Fast:** Pipeline will automatically stop if any step fails (e.g., Service test coverage < 90%), preventing buggy code from proceeding.
- **Secure Secrets Management:** Do not store API Keys, passwords in YAML files. All sensitive information must be passed through GitHub Secrets or equivalent secure environment.
- **Frequent Commit Requirement:** Whenever there is a change on the codebase, the developer (or AI Agent) must always proactively ask: *"Do you want to create a commit for this change?"* before moving to another task.

**Last Updated**: May 2026 | **Status**: Infrastructure Ready for Phase 1
