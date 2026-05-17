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

### New Food‑Sync Service (Node/Express)
- **Location**: `food-sync/` (create this folder). All source files live under `src/` following the clean‑architecture layout described in the previous answer.
- **Entry point**: `npm run start` (script defined in `package.json`). The server listens on `PORT` (default 3000).
- **Required env vars** (place in `.env` at the repo root):
  ```
  BING_API_KEY=your‑bing‑key
  CLOUDINARY_CLOUD_NAME=...
  CLOUDINARY_API_KEY=...
  CLOUDINARY_API_SECRET=...
  MONGODB_URI=mongodb://localhost:27017/nutrition_app
  BATCH_SIZE=100          # foods processed per batch
  CONCURRENCY=10          # parallel async calls
  LOG_LEVEL=info
  ```
- **Run the whole pipeline**: `POST /sync-foods` – idempotent; it will upsert foods by `foodId` and skip already‑processed items.
- **Run only the API**: `GET /foods` – returns `{foodName, imageUrl}` for the frontend.
- **Batch processing**: the service reads `food_list.json` (≈ 5900 items) in chunks of `BATCH_SIZE`. Each chunk processes up to `CONCURRENCY` items in parallel.
- **Error handling**:
  * If Bing returns no image → log `WARN` and continue.
  * Cloudinary upload → retry up to **3** times before giving up (log `ERROR`).
  * MongoDB write errors → log and continue; the pipeline never aborts.
- **Logging**: `winston` writes to console and `logs/food-sync.log`. Progress is logged every 10 % of the total items.
- **Idempotency**: before inserting a food, the repository does an `upsert` on `{foodId}`; existing `imageUrl` is kept unless a new successful upload occurs.
- **Testing**: unit tests live under `src/__tests__/`. Run with `npm test`. Aim for ≥ 80 % coverage.
- **CI**: add a GitHub Action that runs `npm ci && npm test && npm run lint` on every PR.

### Existing Backend (Spring Boot) notes
- **Auth** still uses mock JWTs – see `backend/auth/service/impl/AuthServiceImpl.java`. Real JWT implementation must be added before any protected endpoint is used.
- **SecurityConfig** currently permits all `/api/v1/auth/**` but no JWT filter; remember to wire `JwtUtils` and the filter when you protect routes.
- **MongoDB** collections used by the new service (`foods`) are **outside** the current Spring modules; they can be accessed directly via Spring Data if needed.
- **Docker compose** already brings up a MongoDB container; the Node service can connect using the same `MONGODB_URI`.

### Common commands (do NOT guess)
- **Start Spring backend**: `./mvnw spring-boot:run`
- **Run backend tests**: `./mvnw test`
- **Start AI service** (once `pyproject.toml` exists): `uv sync && uv run uvicorn app.main:app --reload`
- **Start mobile app**: `flutter pub get && flutter run`
- **Start admin dashboard** (once `package.json` exists): `npm install && npm run dev`
- **Full stack Docker**: `docker compose up -d` then `docker compose down -v` to wipe DB.
- **Seed DB** (scripts folder): `cd scripts && uv run python seed_mongodb.py`

### Repository‑wide conventions
- **All commands must be run from the repository root** unless a `workdir` is explicitly set.
- **Never commit generated files** (e.g., `node_modules`, `target/`, `build/`).
- **Use Conventional Commits** for every change.
- **Update `.env.example`** whenever a new environment variable is added.
- **Never store binary image data in MongoDB** – only Cloudinary `secure_url` is persisted.
- **Idempotent scripts**: re‑running `POST /sync-foods` must not duplicate records.
- **Do not edit files without first reading them** – OpenCode enforces `read` before `edit`.

### Helpful files to read first
- `README.md` – overall project description.
- `db-schema/migrations/V001__create_core_collections.js` – shows existing collection patterns.
- `backend/common/config/SecurityConfig.java` – where JWT filter would be added.
- `db-schema/indexes/foods.indexes.js` – example index definition for the new `foods` collection.
- `AGENTS.md` – this file contains the authoritative command shortcuts.

---
*Keep this file short and up‑to‑date; it is the first thing OpenCode agents consult.*
- **Run commands** – always use the exact snippets above; missing build files will cause failures.
- **Testing** – create tests first; the test suite currently has zero files.
- **JWT** – implement `JwtUtils` and a Spring Security filter before adding protected endpoints.
- **CI** – add GitHub Actions workflows; no existing `.github/` directory.
- **Formatting** – set up `.editorconfig` / `.prettierrc` if needed; none exist.

*(All other instruction files (`README*`, `.opencode/context/*`, etc.) contain deeper project details and should be consulted as needed.)*