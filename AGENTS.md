# Nutrition App Agent Notes

## Current Build Reality
- `backend/` is the only runnable app today: Spring Boot `3.4.4`, Java `21`, Maven wrapper, MongoDB, JJWT dependencies in `backend/pom.xml`.
- `scripts/` is the only Python project with `pyproject.toml`; it requires Python `>=3.13` and only depends on `pymongo`.
- `ai-service/` has a Dockerfile but no `pyproject.toml`, `uv.lock`, or `app/`; create those before running `uv` or building that image.
- `admin-dashboard/` has a Dockerfile but no `package.json`, `src/`, or `public/`; create those before `npm ci`, `npm run build`, or Docker build.
- `frontend/` has no `pubspec.yaml` or source files; create the Flutter project config before any `flutter` command.
- There is no `.github/` workflow, pre-commit config, formatter config, or test file under `backend/src/test/java/` yet.

## Commands That Actually Work
- Backend dev server: from `backend/`, run `./mvnw spring-boot:run`; it reads `MONGODB_URI` or defaults to `mongodb://localhost:27017/nutrition_db`.
- Backend tests: from `backend/`, run `./mvnw test`; embedded Mongo dependency is present, but no tests currently exist.
- Docker database/backend: from repo root, run `docker compose up -d mongodb backend`; `docker compose down -v` deletes the Mongo volume.
- Full Docker Compose is not currently buildable until `ai-service/` and `admin-dashboard/` get their missing project files.
- Seeding scripts: from `scripts/`, run `uv sync` then `uv run python seed_mongodb.py` only after confirming the script exists or adding it.

## Backend Wiring
- Entry point is `backend/src/main/java/com/nutrition/NutritionApplication.java`; Mongo auditing is enabled there.
- Existing modules with Java code: `auth`, `userprofile`, and `common`; `foodcatalog`, `nutritionplan`, `mealtracking`, `dashboard`, and `admin` are empty package trees.
- Controllers return `ResponseEntity<ApiResponse<T>>`; the actual wrapper fields are `success`, `message`, `data`, `timestamp`, not the JSend shape described in older docs.
- Current endpoints are `/api/v1/auth/register`, `/api/v1/auth/login`, `/api/v1/profile/metrics`, `/api/v1/profile/{userId}`.
- `SecurityConfig` permits `/api/v1/auth/**` and `/actuator/**`; every other route requires authentication, but no JWT filter is wired yet.
- `AuthServiceImpl` hashes passwords with BCrypt but returns literal `mock-jwt-token` and `mock-refresh-token`; adding real auth requires a JWT utility/filter and security-chain wiring.
- `UserProfileServiceImpl` contains the BMI/BMR/TDEE business logic; keep controllers thin.

## Data And Contracts
- Mongo auto-index creation is enabled in `application.yml`.
- Existing collections: `users` and `user_profiles`.
- Use explicit `@Field("snake_case")` for Mongo names that are not already snake_case; `UserProfile` already maps fields like `user_id`, `height_cm`, `target_weight_kg`, `updated_at`.
- API contract notes live in `.opencode/context/07-api-contracts/`; update those mock contracts when backend response shapes change.

## Repo Workflow
- `.opencode/opencode.json` is the active OpenCode config and references this file as its only instruction source.
- Specialized context is in `.opencode/context/`; skills are in `.opencode/skills/`.
- Record each user prompt in `HISTORY_PROMPTS.md` with a timestamp.
- Do not trust root `README.md` blindly for setup status; it still claims the backend build file is missing even though `backend/pom.xml` exists.
