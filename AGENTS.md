# Nutrition App Agent Guidance

## Core Runtime Facts
- **Backend** is the only runnable component now. Run with `./mvnw spring-boot:run` from `backend/`. It defaults to `mongodb://localhost:27017/nutrition_db` unless `MONGODB_URI` is set.
- **Tests**: `./mvnw test` from `backend/` (no tests yet).
- **Docker**: `docker compose up -d postgres backend` from repo root (docker‑compose still points to Mongo; update required before full stack).
- **Python scripts**: `uv sync` then run the seed script from `scripts/` (ensure the script exists first).
- **Admin dashboard** and **frontend** lack package manifests; they must be scaffolded before any `npm`/`react-native` commands.

## Module Landscape
- Active Java packages: `auth`, `userprofile`, `common`.
- Empty package trees: `foodcatalog`, `nutritionplan`, `mealtracking`, `dashboard`, `admin`.
- Entry point: `backend/src/main/java/com/nutrition/NutritionApplication.java` (Mongo auditing enabled).
- Controllers return `ResponseEntity<ApiResponse<T>>` with fields `success`, `message`, `data`, `timestamp`.
- Security: `SecurityConfig` permits `/api/v1/auth/**` and `/actuator/**`; all other routes require auth, but JWT filter is not wired yet (mock tokens returned).
- Business logic lives in `UserProfileServiceImpl` (BMI/BMR/TDEE).

## Data Migration Note
- Current Mongo collections: `users`, `user_profiles`. When migrating to PostgreSQL, map JPA entities to tables `users` and `user_profiles` using `@Column(name = "snake_case")` where needed.

## Important Docs & Locations
- OpenCode config: `.opencode/opencode.json` (this file is the sole instruction source).
- Contextual docs: `.opencode/context/` (e.g., API contracts in `07-api-contracts`).
- History logging: `HISTORY_PROMPTS.md` (record each prompt with timestamp).
- **Do not trust** the root `README.md` for current setup status; it is outdated.

## Common Gotchas
- Running `npm ci` or `react-native` commands will fail until `package.json` and source directories are created in `admin-dashboard/` and `frontend/`.
- Docker compose currently expects a Mongo service; attempting to start the stack without updating `docker-compose.yml` will cause backend DB connection failures.
- No test files exist under `backend/src/test/java/`; adding tests is required before CI can be useful.
- JWT authentication is placeholder; any auth‑protected endpoint will accept the mock token.

## Quick Reference Commands
- **Backend dev**: `cd backend && ./mvnw spring-boot:run`
- **Backend test**: `cd backend && ./mvnw test`
- **Docker stack**: `docker compose up -d postgres backend`
- **Python env**: `cd scripts && uv sync`
- **Seed data**: `cd scripts && python <seed_script>.py` (verify script name first)
