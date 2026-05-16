# Nutrition App – OpenCode Guidance

## Project State
**Planning phase** – all source directories (`backend/src`, `ai-service/app`, `frontend/lib`, `admin-dashboard/src`) are empty. No `pom.xml`, `pyproject.toml`, `pubspec.yaml`, or root `package.json` in subdirectories yet. Scaffold before running any build/test commands.

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

## LSP Configuration (from `opencode.json`)
- Java → `jdtls` · Python → `pyright-langserver` · Dart → `dart language-server` · TS/JS → `typescript-language-server`

## Reference Docs
All detailed specs live in `.opencode/context/`:
- `01-project/` – architecture, overview, tech stack
- `02-requirements/` – business rules, module breakdown, user stories
- `03-standards/` – coding standards, rules
- `04-ui-ux/` – UI/UX specs
- `05-infrastructure/` – CI/CD plan (GitHub Actions, Docker)
- `06-glossary/` – terminology
- `07-api-contracts/` – API specs
- `08-qa/` – QA guidelines

Skills in `.opencode/skills/` (backend, database, front-end, ai-services, devops, security, testing, system-design, git).

## History
Log every user request into `HISTORY_PROMPTS.md` with timestamp and exact prompt text.
