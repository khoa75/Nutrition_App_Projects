# Nutrition App – AGENTS.md

## Critical Setup (Easy to Miss)
- **Backend**: `pom.xml` exists → `./mvnw spring-boot:run` (needs MongoDB:27017)
- **AI Service**: Missing `pyproject.toml` → create first, then `uv sync` + `uv run uvicorn app.main:app --reload`
- **Mobile**: `pubspec.yaml` exists → `flutter pub get` + `flutter run`
- **Admin Dashboard**: Missing `package.json` → create first, then `npm install` + `npm run dev`
- **Seeding**: `scripts/pyproject.toml` exists → `cd scripts && uv run python seed_mongodb.py`

## Key Gotchas (Agents Often Miss)
- **Auth**: `AuthServiceImpl` returns mock JWT tokens (TODO: generate real JWT). Need `JwtUtils` + JWT filter in `SecurityConfig`.
- **SecurityConfig**: No JWT filter chain → permits `/api/v1/auth/**` and `/actuator/**`, but other paths require auth with no filter.
- **MongoDB**: Embedded for tests (`./mvnw test`), but dev needs external MongoDB on port 27017.
- **Docker**: `docker compose down -v` deletes MongoDB volume (data loss).

## Module Structure & Communication
```
com.nutrition
├── auth/          # login, register (JWT mock)
├── userprofile/   # profile CRUD + health metrics (BMI/BMR/TDEE works)
├── foodcatalog/   # EMPTY
├── nutritionplan/ # EMPTY
├── mealtracking/  # EMPTY (calls AI service)
├── dashboard/     # EMPTY
├── admin/         # EMPTY
└── common/        # SecurityConfig, CorsConfig, exceptions, ApiResponse
```
- **No cross-module repository access** → modules communicate only via internal service interfaces.
- **Dependency order**: `auth → user_profile → food_catalog → nutrition_plan → meal_tracking → dashboard → admin`.
- **AI service**: Separate FastAPI process (`ai_vision_service`) invoked by `meal_tracking`.

## Backend Specifics
- **Controllers**: `@RestController`, `/api/v1/<module>` prefix, `@RequiredArgsConstructor`.
- **Responses**: `ResponseEntity<ApiResponse<T>>`.
- **DTOs**: Java `record` types with `jakarta.validation`.
- **MongoDB fields**: `snake_case` in Java via `@Field("field_name")`.
- **Collections**: 
  - `users`: `email`, `phone` (unique sparse indexes), `passwordHash`, `role`, `status`, etc.
  - `user_profiles`: `user_id` (unique index), `height_cm`, `weight_kg`, `bmi`, `bmr`, `tdee`.

## Development Commands
- **Backend test**: `./mvnw test` (uses embedded MongoDB).
- **Backend lint/typecheck**: Not configured → rely on IDE/LSP.
- **History**: Every prompt logged in `HISTORY_PROMPTS.md` with timestamp.
- **Skills**: Load via `.opencode/skills/` (backend, front-end, ai-services, etc.).
- **Context**: `.opencode/context/` contains architecture, requirements, API contracts, etc.

## Coding Conventions
- **Java**: `camelCase` (vars/methods), `PascalCase` (classes), `UPPER_SNAKE_CASE` (constants).
- **MongoDB**: `snake_case` (e.g., `height_cm`, `user_id`).
- **Dart**: `snake_case` filenames (e.g., `login_screen.dart`).
- **React/TS**: Functional components + hooks only.
- **Flutter**: Clean Architecture + Riverpod state management.

## OpenCode Agent Models (from opencode.json)
- **plan**: `openrouter/openai/gpt-oss-20b:free`
- **build**: `openrouter/deepseek/deepseek-chat:free`
- **explore**: `openrouter/deepseek/deepseek-chat:free`
- **general**: `openrouter/mistralai/mistral-7b-instruct:free`
- **project_lead**: `openrouter/openai/gpt-oss-20b:free`
- **backend_dev**: `openrouter/openai/gpt-oss-20b:free`
- **ai_engineer**: `openrouter/openai/gpt-oss-20b:free`
- **database_admin**: `openrouter/openai/gpt-oss-20b:free`
- **security_auditor**: `openrouter/mistralai/mistral-7b-instruct:free`
- **frontend_dev**: `openrouter/openai/gpt-oss-20b:free`
- **devops_engineer**: `openrouter/deepseek/deepseek-chat:free`
- **qa_tester**: `openrouter/openai/gpt-oss-20b:free`
- **reviewer**: `openrouter/openai/gpt-oss-20b:free`
- **docs_writer**: `openrouter/deepseek/deepseek-chat:free`
- **Permissions**: `bash=ask`, `edit=ask` (subagents must ask before running commands/editing files).