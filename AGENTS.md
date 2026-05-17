# Nutrition App – AGENTS.md

## Build-file reality (don't guess)

| Component | Build config | Status |
|-----------|--------------|--------|
| **Backend** (`backend/`) | `pom.xml` ✅ | Spring Boot 3.4.4, Java 21, JJWT 0.12.6, embed mongo for test |
| **AI Service** (`ai-service/`) | ❌ No `pyproject.toml` | Needs creation before any `uv` command |
| **Mobile App** (`frontend/`) | ❌ No `pubspec.yaml` | Needs creation before any `flutter` command |
| **Admin Dashboard** (`admin-dashboard/`) | ❌ No `package.json` | Needs creation before any `npm` command |
| **Seeding scripts** (`scripts/`) | `pyproject.toml` ✅ | Has `pymongo` dep, `uv sync` works here |

## What's already written vs. empty scaffolding

- **Backend `auth` module** — 8 files: `AuthController`, `AuthService` + `impl`, `User` model, `UserRepository`, DTOs (`LoginRequest`, `RegisterRequest`, `TokenResponse`). **`AuthServiceImpl` returns mock JWT tokens** (line 56: `TODO: generate real JWT`). No JWT filter, no `JwtUtils` class exists yet.
- **Backend `userprofile` module** — 7 files: controller, service, `UserProfile` model, repository, DTOs. **Fully functional** BMI/BMR/TDEE calculation.
- **Backend `common`** — `SecurityConfig` (permitAll `/api/v1/auth/**`, stateless sessions, CSRF disabled), `CorsConfig` (permit all origins), `GlobalExceptionHandler`, `ApiResponse<T>` wrapper.
- **Backend empty modules** — `foodcatalog/`, `nutritionplan/`, `mealtracking/`, `dashboard/`, `admin/` **exist as empty directory trees only** (no `.java` files).
- **Backend tests** — `src/test/java/` exists but **zero test files**.
- **Frontend, AI Service, Admin Dashboard** — All three are **empty scaffolding** (0 code files).
- All four Dockerfiles exist and `docker-compose.yml` is complete.

## Surprising things that matter

- **`AuthServiceImpl` only stubs JWT** — `buildTokenResponse()` returns `"mock-jwt-token"` / `"mock-refresh-token"`. Need to create `JwtUtils`, JWT filter, and wire into `SecurityConfig` before auth is real.
- **`SecurityConfig` has no JWT filter chain** — `authorizeHttpRequests` permits `/api/v1/auth/**` and `/actuator/**`, but any other path requires authentication with no filter to provide it yet.
- **No `.github/` directory, no CI/CD** — workflows must be created from scratch.
- **No pre-commit hooks, no formatter config** — no `.editorconfig`, `.prettierrc`, `.eslintrc`.

## Exact commands

```bash
# Backend
./mvnw spring-boot:run         # start on :8080 (needs MongoDB on :27017)
./mvnw test                    # runs tests (embed Mongo, no external deps)

# AI Service (after creating pyproject.toml)
uv sync                        # install deps
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
docker compose down -v         # WARNING: deletes MongoDB volume

# Seeding
cd scripts && uv run python seed_mongodb.py
```

## Backend structure

```
com.nutrition
├── auth/          # login, register, JWT (mock)
├── userprofile/   # profile CRUD + health metrics
├── foodcatalog/   # EMPTY
├── nutritionplan/ # EMPTY
├── mealtracking/  # EMPTY
├── dashboard/     # EMPTY
├── admin/         # EMPTY
└── common/        # SecurityConfig, CorsConfig, exceptions, ApiResponse
```

- **No cross-module repository access** — modules communicate only via internal service interfaces.
- Module dependency order: `auth → user_profile → food_catalog → nutrition_plan → meal_tracking → dashboard → admin`.
- AI service (`ai_vision_service`) is a separate FastAPI process invoked by `meal_tracking`.
- All controllers: `@RestController`, `/api/v1/<module>` prefix, `@RequiredArgsConstructor` constructor injection.
- All endpoints return `ResponseEntity<ApiResponse<T>>`.
- DTOs use Java `record` types with `jakarta.validation` annotations.

## Model / DB notes

- `User` → collection `users` (fields: `email`, `phone` with unique sparse indexes, `passwordHash`, `fullName`, `role`, `status`, `failedAttempts`, `lockedUntil`, `socialProviders[]`).
- `UserProfile` → collection `user_profiles` (fields: `user_id` unique index, `height_cm`, `weight_kg`, `activity_level`, `goal_type`, `target_weight_kg`, `bmi`, `bmr`, `tdee`).
- MongoDB field naming: `snake_case` in Java via `@Field("field_name")`.
- Spring `@CreatedDate` / `@LastModifiedDate` require `@EnableMongoAuditing` (already on `NutritionApplication`).

## OpenCode config that changes behavior

- **Permissions**: `opencode.json` sets `bash=ask`, `edit=ask` — subagents must ask before running commands or editing files.
- **LSP**: Java (jdtls), Python (pyright), Dart (dart language-server), TS/JS (typescript-language-server).
- **Skills path**: `.opencode/skills/` — contains backend, front-end, ai-services, devops, testing, security, system-design, database, git skills. Import via `skill` tool.
- **Context files**: `.opencode/context/` — project overview, requirements, standards, UI/UX, infrastructure, glossary, API contracts, QA specs.
- **opencode.json references AGENTS.md** as its only `instructions` entry.
- **Agent models**: GPT-4o for plan/build/review, Claude Sonnet for backend/AI/database, Gemini Flash for explore/devops/docs.

## Commit conventions

- Conventional Commits expected (implied by `git-advanced-workflows` skill).
- Record every user request in `HISTORY_PROMPTS.md` with timestamp.

## Namespace rules

| Scope | Convention | Example |
|-------|-----------|---------|
| Java vars/methods | `camelCase` | `getProfile` |
| Java classes | `PascalCase` | `AuthServiceImpl` |
| Java constants | `UPPER_SNAKE_CASE` | `ACTIVITY_MULTIPLIERS` |
| MongoDB fields | `snake_case` | `height_cm`, `user_id` |
| Dart filenames | `snake_case` | `login_screen.dart` |
| React | TypeScript only, functional components + hooks | |
| Flutter | Clean Architecture, Riverpod | |
