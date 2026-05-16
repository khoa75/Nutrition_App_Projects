# Nutrition App – OpenCode Guidance

## Project State
**Scaffolding phase** – directory structures exist for all four components but no build files yet (`pom.xml`, `pyproject.toml`, `pubspec.yaml`, `admin-dashboard/package.json`). Create build configs before running any build/test commands.

Source tree status:
- `backend/src/main/java/` and `backend/src/test/` exist – no packages or `pom.xml` yet
- `ai-service/app/{api,core,models,services}/` exist – no `pyproject.toml` yet
- `admin-dashboard/src/{assets,components,pages,services,store,tests,utils}/` exist – no `package.json` yet
- `frontend/lib/` exists (empty) – no `pubspec.yaml` yet; `android/` and `ios/` shells present

## Architecture
Modular monolith. Four components:

| Component | Stack | Directory |
|---|---|---|
| Backend | Spring Boot 3 / Java 21 / MongoDB | `backend/` |
| AI Service | FastAPI / Python / PyTorch | `ai-service/` |
| Mobile App | Flutter / Dart | `frontend/` |
| Admin Dashboard | React / TypeScript / Tailwind | `admin-dashboard/` |

**Rule:** Backend modules communicate only via internal service interfaces. No cross-module repository access.

## Backend Modules (package-by-feature)
`auth` → `user_profile` → `food_catalog` → `nutrition_plan` → `meal_tracking` → `dashboard` → `admin`

AI service (`ai_vision_service`) is a separate FastAPI process called by `meal_tracking`.

## Execution Roadmap
1. **Phase 1 (MVP):** Auth → User Profile → Food Catalog → Manual Meal Tracking → Dashboard
2. **Phase 2 (AI):** FastAPI init → Food image recognition → Vision-to-log workflow → Nutrition plan
3. **Phase 3 (Scale):** Advanced dashboard charts → Admin module → Audit logging → DB index optimization
4. **Phase 4 (Future):** Redis caching, notifications, HealthKit/Google Fit

## Key Commands (after scaffolding)
- **Backend:** `./mvnw spring-boot:run` · `./mvnw test`
- **AI Service:** `uv sync` · `uv run uvicorn app.main:app --reload`
- **Flutter:** `flutter pub get` · `flutter run` · `flutter test`
- **Admin UI:** `npm install` · `npm run dev`

## Coding Standards
- **Backend:** Controller → Service → Repository. No business logic in controllers. `@Async` for non-blocking tasks.
- **Naming:** `camelCase` (vars/methods), `PascalCase` (classes), `UPPER_SNAKE_CASE` (constants), `snake_case` (DB fields, Dart filenames).
- **Testing:** TDD – write tests **before** implementation. 80%+ coverage (Service 90%, Controller 80%).
- **Flutter:** Clean Architecture. **React:** TypeScript only (no `.js`/`.jsx`), functional components with hooks.

## Security
- JWT with refresh tokens, BCrypt passwords.
- Account lockout after 5 failed login attempts.
- Roles: `USER`, `ADMIN`.
- Secrets in `.env` (gitignored) – **never commit credentials**.

## MCP Servers (from `opencode.json`)
MongoDB (`nutrition_db`), GitHub, Brave Search, Docker, Cloudinary, Postman – all available via `npx`. Env vars required: `OPENROUTER_API_KEY`, `GITHUB_PERSONAL_ACCESS_TOKEN`, `BRAVE_API_KEY`, `CLOUDINARY_URL`, `POSTMAN_API_KEY`.

## Reference Docs
All detailed specs live in `.opencode/context/`:
- `01-project/` – architecture, overview, tech stack
- `02-requirements/` – business rules, module breakdown, user stories
- `03-standards/` – coding standards, rules
- `04-ui-ux/` – UI/UX specs (Modern Mint color palette)
- `05-infrastructure/` – CI/CD plan (GitHub Actions, Docker)
- `06-glossary/` – terminology
- `07-api-contracts/` – API specs
- `08-qa/` – QA guidelines

Skills in `.opencode/skills/` (19 total: `java-springboot`, `fastapi-python`, `jwt-security`, `typescript-react-reviewer`, `rest-api-design`, `git-advanced-workflows`, `git-branch-pr-workflow`, `conversation-memory`, `ai-services`, `backend`, `database`, `devops`, `front-end`, `git`, `security`, `system-design`, `testing`, `debug`).

## Agents (from `opencode.json`)
- `project_lead` – orchestration, architecture
- `backend_dev` – Spring Boot / Java 21
- `frontend_dev` – Flutter + React/TS
- `ai_engineer` – FastAPI / PyTorch
- `devops_engineer` – Docker / CI/CD
- `reviewer` – code review, security, quality
- `database_admin` – MongoDB schema / indexes
- `qa_tester` – TDD, coverage enforcement
- `security_auditor` – JWT, RBAC, OWASP
- `docs_writer` – docs, changelogs, history

## History
Log every user request into `HISTORY_PROMPTS.md` with timestamp and exact prompt text.
