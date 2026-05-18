# Nutrition App – OpenCode Agent Guide

**Purpose** – Compact, high‑signal guidance so agents start productive and avoid common pitfalls.

---

## Runtime Essentials
- **Backend only** is runnable now. Start with the Maven wrapper from the `backend/` directory (requires Java 21; the wrapper will download the correct JDK if missing):
  ```bash
  cd backend && ./mvnw spring-boot:run
  ```
  *Uses Java 21, defaults to MongoDB at `mongodb://localhost:27017/nutrition_db` unless `MONGODB_URI` is set.*
- **Tests** – Run with `./mvnw test` inside `backend/`. No tests exist yet.
- **Docker** – `docker compose up -d postgres backend` from the repo root. The compose file still points to Mongo; update `docker‑compose.yml` before a full stack launch.
- **Frontend / Admin dashboard** – No `package.json` or source scaffolding yet; `npm`/`react‑native` commands will fail until those are created.

---

## Project Structure & Boundaries
- **Backend entry point:** `backend/src/main/java/com/nutrition/NutritionApplication.java` (Mongo auditing enabled).
- **Active Java packages:** `auth`, `userprofile`, `common`.
- **Empty package trees (placeholders):** `foodcatalog`, `nutritionplan`, `mealtracking`, `dashboard`, `admin`.
- **Controller contract:** All controllers return `ApiResponse<T>` with fields `success`, `message`, `data`, `timestamp`.
- **Security:** `SecurityConfig` permits `/api/v1/auth/**` and `/actuator/**`; all other endpoints require auth, but the JWT filter is not wired – mock tokens are accepted.
- **Business logic:** Currently lives in `UserProfileServiceImpl` (BMI/BMR/TDEE calculations).

---

## Data Migration Note
- Existing Mongo collections: `users`, `user_profiles`.
- When switching to PostgreSQL, map JPA entities to tables `users` and `user_profiles` using `@Column(name = "snake_case")` for any non‑standard column names.

---

## Important Docs & Sources
- **OpenCode config:** `.opencode/opencode.json` – the single source of truth for agent instructions.
- **Contextual docs:** `.opencode/context/` (e.g., API contracts in `07‑api‑contracts`).
- **History log:** `HISTORY_PROMPTS.md` – records of prior prompts.
- **Root README:** Out‑of‑date; do **not** rely on it for current setup.

---

## Common Gotchas
- `npm ci` or any `react‑native` command will error until `package.json` and source directories exist under `admin-dashboard/` and `frontend/`.
- Docker compose expects a Mongo service; launching without updating the compose file leads to DB connection failures.
- No test files under `backend/src/test/java/`; add tests before CI becomes useful.
- JWT authentication is a placeholder – any token passes the filter.

---

## Quick Reference Commands
- **Backend dev:** `cd backend && ./mvnw spring-boot:run`
- **Backend test:** `cd backend && ./mvnw test`
- **Docker stack:** `docker compose up -d postgres backend`

---

*Keep this file up‑to‑date as the repo evolves; it is the primary onboarding guide for OpenCode agents.*