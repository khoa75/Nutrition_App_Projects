# Prompt: Setup GitHub Actions CI - Step 1: Backend & AI Service

## 1. Context & Constraints
Please read the following files before writing code:
- `.opencode/context/01-project/architecture.md`
- `.opencode/context/05-infrastructure/ci_cd.md`
- `.opencode/skills/devops/SKILL.md`

## 2. Task: Setup Backend & AI CI
1. Create `.github/workflows/backend-ci.yml`:
   - Trigger on PR to `main` and `develop`.
   - Setup Java 21 (Temurin).
   - Run `./mvnw spotless:check` (lint).
   - Run `./mvnw test` (unit & integration tests).
   - Check JaCoCo coverage (Fail if < 80%).
2. Create `.github/workflows/ai-service-ci.yml`:
   - Trigger on changes in `ai-service/` folder.
   - Setup Python 3.12 with `uv`.
   - Run `ruff check .` and `ruff format --check .`.
   - Run `pytest` with coverage.

## 3. Acceptance Criteria
- Workflows trigger correctly on Pull Requests.
- All tests pass in the CI environment.
- Code coverage is enforced at 80%+.
