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
| FastAPI AI Service | 8000 | python:3.12-slim |
| Flutter Mobile | — | Build only (no container) |
| React Admin | 3000 | node:20-alpine (build stage) |

## 2. Docker Compose (Local Dev)
```yaml
services:
  backend:
    build: ./backend
    ports: ["8080:8080"]
    depends_on: [mongodb, ai-service]
  ai-service:
    build: ./ai-service
    ports: ["8000:8000"]
  mongodb:
    image: mongo:7
    ports: ["27017:27017"]
```
FastAPI is NOT exposed to the internet — accessed only via backend internal network.

## 3. CI/CD Pipeline (GitHub Actions)
```
Workflows:
├── backend-ci.yml       # Build, test, lint on PR to main
├── ai-service-ci.yml    # pytest, lint (ruff), build
├── flutter-ci.yml       # analyze, test, build APK
├── react-ci.yml         # lint, test, build
├── deploy-staging.yml   # Deploy all services to staging
└── deploy-prod.yml      # Deploy with manual approval gate
```

## 4. Infrastructure (Initial: Single VPS → Scale: AWS/GCP)
- **Phase 1**: Single VPS (Docker Compose, 2GB RAM, 2 CPU)
- **Phase 2**: AWS ECS or GCP Cloud Run (containerized, auto-scale)
- **Phase 3**: MongoDB Atlas (dedicated cluster), Redis (caching)

## 5. Monitoring Stack
- Backend: Spring Boot Actuator + /health endpoint
- AI Service: Prometheus metrics on /metrics
- Logging: Centralized via `docker logs` → later ELK/Fluentd
- Uptime target: ≥ 99.5% (max ~3.5h downtime/month)

## 6. Backup Strategy
- MongoDB Atlas automated snapshots (daily, 7-day retention)
- File uploads (food images) stored in S3/Cloudinary, not in container
- Configuration in `.env` files / GitHub Secrets (never in code)

## 7. Implementation Prompts
These steps guide the automated implementation of CI/CD:
- [Step 1: Backend & AI CI](file:///home/khoa/Projects/Nutrition_App/Nutrition_App_Projects/.opencode/skills/devops/github-actions-prompts/step_1_ci_backend_ai.md)
- [Step 2: Frontend CI](file:///home/khoa/Projects/Nutrition_App/Nutrition_App_Projects/.opencode/skills/devops/github-actions-prompts/step_2_ci_frontend.md)
- [Step 3: CD & Deployment](file:///home/khoa/Projects/Nutrition_App/Nutrition_App_Projects/.opencode/skills/devops/github-actions-prompts/step_3_cd_deployment.md)

## 8. Workflow Practices
- **Full Automation:** All source code changes pushed to main branches or creating Pull Requests must trigger automated check pipelines (Lint, Test, Build).
- **Environment Separation:**
  - `feature-*` branches: Only run CI (Build, Test) to detect errors early.
  - `staging` (or pre-prod) branch: Run CI and automatically deploy (CD) to staging environment for integration testing.
  - `main` branch: Requires manual approval (Manual Approval Gate) before deploying (CD) to Production.
- **Fail-Fast:** Pipeline will automatically stop if any step fails (e.g., test coverage < 80%), preventing buggy code from proceeding.
- **Secure Secrets Management:** Do not store API Keys, passwords in YAML files. All sensitive information must be passed through GitHub Secrets or equivalent secure environment.
- **Frequent Commit Requirement:** Whenever there is a change on the codebase, no matter how small (fix minor bug, add docs, format code...), the developer (or AI Agent) must always proactively ask: *"Do you want to create a commit for this change?"* before moving to another task.

**Last Updated**: May 2026 | **Status**: Infrastructure Ready for Phase 1
