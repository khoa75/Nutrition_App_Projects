# Nutrition App — Agent Notes (verified)

## Ground truth (don’t trust root README)
- `README.md` is stale (mentions Mongo/FastAPI/Flutter scaffold). Current runnable product code is **only** `backend/`.
- `ui/` contains image assets only, not a runnable frontend.
- OpenCode loads this file plus `.opencode/context/*` via `.opencode/opencode.json`.

## Backend facts easy to guess wrong
- Backend is **Maven + Java 21** with Spring Boot parent **`4.0.6`** (`backend/pom.xml`).
- DB is **PostgreSQL + Flyway** (not Mongo).
- Default DB config (`backend/src/main/resources/application.properties`):
  - host `localhost`
  - port `5433`
  - db `nutrion` (current spelling)
  - user/pass `appuser` / `apppass`
- `spring.jpa.hibernate.ddl-auto=validate`: startup fails on entity/schema drift. Update migrations in `backend/src/main/resources/db/migration/`.
- App timezone is pinned to UTC (JVM + Hibernate + Docker).

## Security/runtime gotchas
- API is stateless JWT: `SecurityConfig` uses `SessionCreationPolicy.STATELESS` and registers `JwtAuthenticationFilter` before `UsernamePasswordAuthenticationFilter`.
- Only `/auth/**`, `/api/auth/**`, and Swagger endpoints are public; everything else requires `Authorization: Bearer <jwt>`.
- If protected API returns 403/401 during manual test, first verify Bearer token from `/api/auth/login`; security does not use server session.

## Commands that actually work
Run from `backend/`:
- Start app: `./mvnw spring-boot:run` (PowerShell: `./mvnw.cmd spring-boot:run`)
- Run all tests: `./mvnw test`
- Run one class: `./mvnw -Dtest=AuthenticationServiceImplTest test`
- Run one method: `./mvnw -Dtest=AuthenticationServiceImplTest#login_ShouldReturnTokens_WhenCredentialsValid test`
- Build jar: `./mvnw clean package`

From repo root:
- Start DB + backend containers: `docker compose up -d postgres backend`

## Entry points and current shape
- Main: `backend/src/main/java/com/example/backend/BackendApplication.java`
- Security: `backend/src/main/java/com/example/backend/config/SecurityConfig.java`
- JWT filter: `backend/src/main/java/com/example/backend/config/JwtAuthenticationFilter.java`
- API response wrapper: `backend/src/main/java/com/example/backend/dto/response/ApiResponse.java`
- Exception handling intentionally uses `ResponseEntity<ApiResponse<Object>>` in `GlobalExceptionHandler`.
- User/profile endpoints are centralized in `UserProfileController` under `/api/v1/users`:
  - `/me`, `/me/goal-calories`
  - `/profiles/search` (email)
  - `/profiles/filter` (status: `ALL|ACTIVE|LOCKED|LOCK`)
- Query/filter logic for users lives in `UserQueryService` + `UserQueryServiceImpl` (JPA Specification).
- Implemented domain is still mainly auth + core entities (`Users`, `Foods`, `Logs`, `LogFoods`, `UserWeightLog`), not full planned module split.

## CI/testing reality
- No `.github/workflows` CI pipeline exists.
- Validate locally with relevant Maven tests before handoff.