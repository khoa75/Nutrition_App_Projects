# Nutrition App – OpenCode Guidance

## Project State
- Scaffolding phase: directories exist, but no build configs (`pom.xml`, `pyproject.toml`, `pubspec.yaml`, `admin-dashboard/package.json`). Create them before any build/test.

## Architecture
- Modular monolith with four components:
  - **Backend** – Spring Boot 3, Java 21, MongoDB (`backend/`)
  - **AI Service** – FastAPI, PyTorch (`ai-service/`)
  - **Mobile App** – Flutter/Dart (`frontend/`)
  - **Admin Dashboard** – React/TS, Tailwind (`admin-dashboard/`)
- Backend modules communicate only via internal service interfaces; no cross‑module repository access.

## Module Flow
`auth → user_profile → food_catalog → nutrition_plan → meal_tracking → dashboard → admin`
- AI service (`ai_vision_service`) runs as a separate FastAPI process called by `meal_tracking`.

## Key Commands (run after adding build files)
- **Backend**: `./mvnw spring-boot:run`  •  `./mvnw test`
- **AI Service**: `uv sync`  •  `uv run uvicorn app.main:app --reload`
- **Flutter**: `flutter pub get`  •  `flutter run`  •  `flutter test`
- **Admin UI**: `npm install`  •  `npm run dev`

## Coding Standards Highlights
- Backend: Controller → Service → Repository; no business logic in controllers; use `@Async` for non‑blocking work.
- Naming: `camelCase` (vars/methods), `PascalCase` (classes), `UPPER_SNAKE_CASE` (constants), `snake_case` (DB fields, Dart filenames).
- Flutter: Clean Architecture.
- React: TypeScript only, functional components with hooks.

## Security Essentials
- JWT with refresh tokens, BCrypt passwords.
- Account lockout after 5 failed attempts.
- Roles: `USER`, `ADMIN`.
- Store secrets in `.env` (git‑ignored); never commit credentials.

## Operational Context
- MongoDB server `nutrition_db` and other services (GitHub, Brave Search, Docker, Cloudinary, Postman) are listed in `opencode.json`.
- Required env vars: `OPENROUTER_API_KEY`, `GITHUB_PERSONAL_ACCESS_TOKEN`, `BRAVE_API_KEY`, `CLOUDINARY_URL`, `POSTMAN_API_KEY`.

## Reference Docs
- Detailed specs in `.opencode/context/` (project overview, requirements, standards, UI/UX, infrastructure, glossary, API contracts, QA).
- Skills in `.opencode/skills/` for specialized workflows.
- Agent roles defined in `opencode.json`.

## History Logging
- Record every user request in `HISTORY_PROMPTS.md` with timestamp and exact prompt.
