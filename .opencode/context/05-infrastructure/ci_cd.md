# CI/CD Workflow (Continuous Integration / Continuous Deployment)

This workflow defines the automated steps for testing, packaging, and deploying applications for the Nutrition App project using **GitHub Actions**.

## 1. Objectives
- Ensure new code does not break existing features (via Test & Lint).
- Automate the packaging (Docker) and deployment (Deploy) processes.
- Minimize human error during operations.

## 2. Environments
- **Development**: For features currently under development.
- **Staging**: A simulated production environment for QA testing.
- **Production**: The actual environment for end-users.

## 3. Continuous Integration (CI) Process
Automatically triggered upon a **Pull Request (PR)** to the `main` or `develop` branches:
1. **Checkout Code**: Retrieve the latest code.
2. **Linting & Code Style**:
   - Backend (Spring Boot): Run Spotless / Checkstyle.
   - Frontend (React/Flutter): Run ESLint / Prettier / Dart Analyze.
   - AI (FastAPI): Run Flake8 / Black.
3. **Unit & Integration Testing**:
   - Run the entire test suites for all services.
   - Check **Code Coverage** (must achieve > 80% according to `.opencode/rules/testing_guidelines.md`).
4. **Security Scan** (Optional): Run checks for security vulnerabilities in libraries (Dependabot, SonarQube).

## 4. Continuous Deployment (CD) Process
Automatically triggered when code is **Merged** into `main` or `staging`:
1. **Build Docker Images**:
   - Package the Spring Boot API, FastAPI, and React Admin Dashboard into independent Docker Images.
2. **Push to Registry**: Push images to Docker Hub or AWS ECR.
3. **Deploy**:
   - Pull the latest image to the corresponding server.
   - Restart containers (using Docker Compose or Kubernetes) without interrupting the system (Zero-downtime deployment).
4. **Health Check & Rollback**:
   - Ping critical APIs to ensure the server is up.
   - If the system does not respond (Response > 2s or 500 error), automatically rollback to the previous version.

## 5. Mandatory Rules
- NEVER deploy directly to Production manually. All changes must go through the CI/CD pipeline.
- Secrets and API Keys must be stored in **GitHub Secrets** or **AWS Parameter Store**; absolutely no hardcoding in the codebase.
