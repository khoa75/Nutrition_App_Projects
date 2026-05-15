# Nutrition App – OpenCode Guidance

**Critical State** – Project is in planning; source directories are empty.

**Architecture** – Modular monolith (Spring Boot backend, FastAPI AI service, Flutter mobile, React admin). Modules must interact only via internal service interfaces; no cross‑module repository access.

**Key Commands** (will fail until scaffolding exists):
- Backend: `./mvnw spring-boot:run`, `./mvnw test`
- Flutter: `flutter pub get`, `flutter run`, `flutter test`
- AI Service: `uv sync`, `uv run uvicorn app.main:app --reload`
- Admin UI: `npm install`, `npm run dev`

**Agent Roles** – `plan`, `build`, `explore`, `general`, `project_lead`, `backend_dev`, `frontend_dev`, `ai_engineer`, `devops_engineer`, `reviewer`, `docs_writer`.

**Coding Standards Highlights**
- Backend layers: Controller → Service → Repository only; no business logic in controllers.
- Naming: camelCase (vars/methods), PascalCase (classes), UPPER_SNAKE_CASE (constants).
- Testing: TDD (Always write tests before writing code), 80%+ coverage (Service 90%, Controller 80%).
- DB: snake_case fields, explicit indexes.
- Async: use `@Async` for non‑blocking tasks.
- Frontend: Flutter Clean Architecture, PascalCase classes, snake_case filenames; React functional components with hooks.

**Security** – JWT with refresh, BCrypt passwords, lockout after 5 failures, ROLE‑based access (USER/ADMIN).

**Development Order** – MVP: Auth → User Profile → Food Catalog → Manual Meal Tracking → Dashboard. Then AI service, then admin UI.

**Logging & History**
- Prompt Tracking: Every user request must be logged into `HISTORY_PROMPTS.md` with a timestamp and the exact prompt text.

**Reference Docs** – See `.opencode/context/` for user stories, module breakdown, coding standards, CI/CD plan.

