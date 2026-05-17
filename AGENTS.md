# Nutrition App – AGENTS.md

## Build‑file reality (don’t guess)
| Component | Build config | Status |
|---|---|---|
| **Backend** (`backend/`) | `pom.xml` ✅ | Spring Boot 3.4.4, Java 21, JJWT 0.12.6, embedded Mongo for tests |
| **AI Service** (`ai-service/`) | ❌ No `pyproject.toml` | Create before any `uv` command |
| **Mobile App** (`frontend/`) | ❌ No `pubspec.yaml` | Create before any `flutter` command |
| **Admin Dashboard** (`admin-dashboard/`) | ❌ No `package.json` | Create before any `npm` command |
| **Seeding scripts** (`scripts/`) | `pyproject.toml` ✅ | `uv sync` works here |

**TDD required** – write tests *before* implementation (90 % service, 80 % controller coverage).

## What’s already written vs. empty scaffolding
- **Backend `auth`** – 8 files, `AuthServiceImpl` returns mock JWTs (TODO: real JWT). No `JwtUtils` or JWT filter yet.
- **Backend `userprofile`** – fully functional BMI/BMR/TDEE logic.
- **Backend `common`** – `SecurityConfig` (permits `/api/v1/auth/**`), `CorsConfig`, `GlobalExceptionHandler`, `ApiResponse<T>`.
- **Empty modules** – `foodcatalog/`, `nutritionplan/`, `mealtracking/`, `dashboard/`, `admin/` (no Java files).
- **Tests** – `src/test/java/` exists but contains no test files.
- **Frontend / AI / Admin** – only empty scaffolding.
- All Dockerfiles and `docker-compose.yml` are present.

## Surprising things that matter
- **Mock JWT** – `AuthServiceImpl.buildTokenResponse()` returns static strings. Real JWT flow needs `JwtUtils`, a filter, and wiring into `SecurityConfig`.
- **SecurityConfig** lacks a JWT filter chain; all non‑auth endpoints currently have no authentication provider.
- **No CI/CD** – `.github/` missing; workflows must be added from scratch.
- **No pre‑commit / formatter** – no `.editorconfig`, `.prettierrc`, etc.

## Exact commands (run from repo root)
```bash
# Backend
./mvnw spring-boot:run   # starts on :8080 (requires MongoDB on :27017)
./mvnw test              # runs unit/integration tests (embedded Mongo)

# AI Service (after creating pyproject.toml)
uv sync
uv run uvicorn app.main:app --reload

# Mobile (after creating pubspec.yaml)
flutter pub get
flutter run
flutter test

# Admin Dashboard (after creating package.json)
npm install
npm run dev

# Docker full stack
docker compose up -d
# WARNING: `docker compose down -v` deletes the MongoDB volume

docker compose down -v

# Seed DB
cd scripts && uv run python seed_mongodb.py
```

## Backend structure (package‑by‑feature)
```
com.nutrition
├─ auth/          # login, register, mock JWT
├─ userprofile/   # profile CRUD + health metrics
├─ foodcatalog/   # EMPTY
├─ nutritionplan/ # EMPTY
├─ mealtracking/  # EMPTY
├─ dashboard/     # EMPTY
├─ admin/         # EMPTY
└─ common/        # SecurityConfig, CorsConfig, exceptions, ApiResponse
```
- Modules communicate **only via service interfaces** – no cross‑module repository access.
- Dependency order: `auth → userprofile → foodcatalog → nutritionplan → mealtracking → dashboard → admin`.
- Controllers use `@RestController`, `/api/v1/<module>` prefix, `@RequiredArgsConstructor`, and return `ResponseEntity<ApiResponse<T>>`.
- DTOs are Java `record`s with `jakarta.validation` annotations.

## Model / DB notes
- `User` → `users` collection (unique sparse indexes on `email` and `phone`).
- `UserProfile` → `user_profiles` collection (unique `user_id`).
- Field names use **snake_case** via `@Field`.
- Auditing (`@CreatedDate`, `@LastModifiedDate`) requires `@EnableMongoAuditing` (already on `NutritionApplication`).

## OpenCode behaviour tweaks
- `opencode.json` sets **bash=ask** and **edit=ask** – agents must request permission before running commands or editing files.
- Skills live under `.opencode/skills/`; load with the `skill` tool when relevant (e.g., `backend`, `fastapi-python`).
- Detailed agent specs are in `.opencode/agents/` – consult them for role‑specific guidance.
- `opencode.json` lists this `AGENTS.md` as the first instruction file.

## Commit conventions
- Use **Conventional Commits** (see `git-advanced-workflows` skill).
- Record every user request in `HISTORY_PROMPTS.md` with a timestamp.

## Quick reference for agents
- **Run commands** – always use the exact snippets above; missing build files will cause failures.
- **Testing** – create tests first; the test suite currently has zero files.
- **JWT** – implement `JwtUtils` and a Spring Security filter before adding protected endpoints.
- **CI** – add GitHub Actions workflows; no existing `.github/` directory.
- **Formatting** – set up `.editorconfig` / `.prettierrc` if needed; none exist.

*(All other instruction files (`README*`, `.opencode/context/*`, etc.) contain deeper project details and should be consulted as needed.)*