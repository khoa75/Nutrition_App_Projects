# Nutrition App — Agent Quick Notes

## Scope that is actually runnable
- Only `backend/` is executable product code today (Spring Boot + Maven wrapper).
- `ui/` is static mockup assets only (no runnable frontend app).
- Root `README.md` is stale for structure/stack; prefer executable sources: `backend/pom.xml`, `backend/src/main/resources/application.properties`, `docker-compose.yml`.

## Correct commands from repo root (PowerShell)
- Run backend: `backend\mvnw.cmd spring-boot:run`
- Run all backend tests: `backend\mvnw.cmd test`
- Run one test class: `backend\mvnw.cmd -Dtest=AuthenticationServiceImplTest test`
- Run one test method: `backend\mvnw.cmd -Dtest=AuthenticationServiceImplTest#login_ShouldReturnTokens_WhenCredentialsValid test`
- Start local infra/services: `docker compose up -d postgres redis backend`

## Runtime and data gotchas
- Local stack is PostgreSQL + Flyway + Redis.
- PostgreSQL host port is `5433` (container still `5432`).
- Default DB name is intentionally `nutrion` (typo is in active config).
- JPA uses `spring.jpa.hibernate.ddl-auto=validate`; schema changes must go through Flyway SQL migrations in `backend/src/main/resources/db/migration`.
- App + DB run in UTC (app sets JVM timezone; datasource URL and container settings also pin UTC).

## Code map (high-value entrypoints)
- App entrypoint: `backend/src/main/java/com/example/backend/BackendApplication.java`
- Security filter chain: `backend/src/main/java/com/example/backend/config/SecurityConfig.java`
- Standard API wrapper used by controllers: `backend/src/main/java/com/example/backend/dto/response/ApiResponse.java`
- Exception handling: `backend/src/main/java/com/example/backend/exception/GlobalExceptionHandler.java`

## Workflow constraints to preserve
- Extend existing tests in `backend/src/test/java` instead of creating parallel test styles.
- No CI workflow exists under `.github/workflows`; run relevant Maven tests locally before handoff.
- Mandatory project rule: append every user prompt to `HISTORY_PROMPTS.md`.