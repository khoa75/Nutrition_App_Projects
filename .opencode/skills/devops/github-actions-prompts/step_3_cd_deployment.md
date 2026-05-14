# Prompt: Setup GitHub Actions CD - Step 3: Deployment Workflows

## 1. Context & Constraints
Please read the following files before writing code:
- `.opencode/context/05-infrastructure/ci_cd.md`
- `.opencode/skills/devops/SKILL.md`

## 2. Task: Setup CD Workflows
1. Create `.github/workflows/deploy-staging.yml`:
   - Trigger on Merge to `develop`.
   - Build Docker images for all services (Backend, AI Service, Admin).
   - Push images to a Registry (e.g., GHCR, DockerHub).
   - Deploy to Staging VPS/Cloud using Docker Compose or specialized tools.
2. Create `.github/workflows/deploy-prod.yml`:
   - Trigger on Merge to `main`.
   - Add a `manual approval` gate or `environment` protection.
   - Deploy to Production environment.
   - Run post-deployment smoke tests.

## 3. Acceptance Criteria
- Secrets (DB passwords, API keys) are managed via GitHub Secrets.
- Deployment is zero-downtime if possible (e.g., Blue-Green or Rolling update).
- Automated health check passes after deployment.
