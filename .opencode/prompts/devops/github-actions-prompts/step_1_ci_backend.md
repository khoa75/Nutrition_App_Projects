---
name: step_1_ci_backend
description: >
  Prompt: Setup GitHub Actions CI - Step 1: Backend Service
license: Apache-2.0
compatibility: opencode
---

# Prompt: Setup GitHub Actions CI - Step 1: Backend Service

## 1. Context & Constraints
Please read the following files before writing code:
- `.opencode/context/01-project/architecture.md`
- `.opencode/context/05-infrastructure/ci_cd.md`
- `.opencode/skills/devops/SKILL.md`

## 2. Task: Setup Backend CI
1. Create `.github/workflows/backend-ci.yml`:
   - Trigger on PR to `main` and `develop`.
   - Setup Java 21 (Temurin).
   - Run `./mvnw spotless:check` (lint).
   - Run `./mvnw test` (unit & integration tests).
   - Check JaCoCo coverage (Fail if < 90% for Service layer, < 80% for Controller layer).

## 3. Acceptance Criteria
- Workflows trigger correctly on Pull Requests.
- All tests pass in the CI environment.
- Code coverage is enforced at 90% for Service and 80% for Controller.
