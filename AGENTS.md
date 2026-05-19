# Nutrition App - Agent Notes

## What is runnable now (verified)
- `backend/` is a Spring Boot API (Java 21, Maven Wrapper).
- `admin/` is a React app using `react-scripts`.
- `mobile/` is an Expo React Native app.
- `ui/` contains image/mockup assets only.
- Root `README.md` is stale in multiple places; trust executable files (`backend/pom.xml`, package scripts, `docker-compose.yml`).

## Commands from repo root (PowerShell)
- Backend run: `backend\mvnw.cmd spring-boot:run`
- Backend tests: `backend\mvnw.cmd test`
- Single backend test class: `backend\mvnw.cmd -Dtest=AuthenticationServiceImplTest test`
- Single backend test method: `backend\mvnw.cmd -Dtest=AuthenticationServiceImplTest#login_ShouldReturnTokens_WhenCredentialsValid test`
- Start local infra + backend in Docker: `docker compose up -d postgres redis backend`
- Admin dev server: `npm --prefix admin start`
- Admin lint: `npm --prefix admin run lint`
- Mobile Expo: `npm --prefix mobile start`

## Runtime and data gotchas
- PostgreSQL host port is `5433` (container port is `5432`).
- Active DB name is intentionally `nutrion` (typo is in live config and compose).
- Hibernate uses `spring.jpa.hibernate.ddl-auto=validate`; DB shape changes must be Flyway SQL migrations in `backend/src/main/resources/db/migration`.
- App and DB timezone are pinned to UTC (JDBC URL, `JAVA_TOOL_OPTIONS`, Postgres command).
- Backend also expects Redis (`spring.cache.type=redis`).

## High-value backend entrypoints
- App bootstrap: `backend/src/main/java/com/example/backend/BackendApplication.java`
- Security chain: `backend/src/main/java/com/example/backend/config/SecurityConfig.java`
- API response wrapper: `backend/src/main/java/com/example/backend/dto/response/ApiResponse.java`
- Global exception mapping: `backend/src/main/java/com/example/backend/exception/GlobalExceptionHandler.java`

## Workflow rules to preserve
- Extend existing backend test style under `backend/src/test/java`; do not introduce a parallel testing style.
- No CI workflow is currently present under `.github/workflows`; run relevant local checks before handoff.
- Mandatory project rule: append every user prompt to `HISTORY_PROMPTS.md`.
