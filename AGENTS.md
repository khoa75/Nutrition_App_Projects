# Nutrition App - Agent Notes

## Ground truth first
- The only runnable product code is `backend/` (Spring Boot + Maven wrapper). `ui/` currently contains mock images, not executable frontend apps.
- Root `README.md` is stale (mentions Mongo/Flutter/FastAPI scaffold). Trust executable config: `backend/pom.xml`, `backend/src/main/resources/application.properties`, `docker-compose.yml`.
- OpenCode auto-loads this file and many `.opencode/context/*` docs via `.opencode/opencode.json`; treat those docs as planning context, not always implementation truth.

## Commands you should actually run
- PowerShell (repo root): `backend\mvnw.cmd spring-boot:run`
- POSIX shell (repo root): `./backend/mvnw spring-boot:run`
- Full tests: `backend\mvnw.cmd test`
- Single class: `backend\mvnw.cmd -Dtest=AuthenticationServiceImplTest test`
- Single method: `backend\mvnw.cmd -Dtest=AuthenticationServiceImplTest#login_ShouldReturnTokens_WhenCredentialsValid test`
- Start local DB + backend containers: `docker compose up -d postgres backend`

## Runtime quirks that break people
- DB is PostgreSQL + Flyway (not Mongo).
- Default DB port is `5433` on host (`docker-compose.yml` maps `5433:5432`); many tools default to `5432` and fail.
- DB name default is `nutrion` (intentional typo in current config); keep it unchanged unless you migrate all references.
- Hibernate is `ddl-auto=validate`; schema changes must go through Flyway migrations in `backend/src/main/resources/db/migration`.
- Timezone is forced to UTC in app + DB (`BackendApplication`, Hibernate timezone property, container `JAVA_TOOL_OPTIONS`).

## Code map (real entrypoints)
- App entry: `backend/src/main/java/com/example/backend/BackendApplication.java`
- Security rules: `backend/src/main/java/com/example/backend/config/SecurityConfig.java`
- Response envelope: `backend/src/main/java/com/example/backend/dto/response/ApiResponse.java`
- Main implemented verticals today: auth, user profile/metrics, foods, logs, weight logs (`controller`, `service`, `repository`, `entity` packages).

## Testing and workflow constraints
- Tests already exist under `backend/src/test/java` (service + controller); extend focused suites instead of assuming greenfield.
- There is currently no CI workflow under `.github/workflows`; run relevant Maven tests locally before handoff.
- Project rule in this repo: append every user prompt to `HISTORY_PROMPTS.md`.
