# Nutrition App - OpenCode Agent Guide

## Current Reality (Verify First)
- This repo is backend-first right now: only `backend/` is runnable; there is no app `package.json`, `pyproject.toml`, or `pubspec.yaml` in product folders.
- Root `README.md` is stale (mentions Mongo/Flutter/FastAPI scaffold); trust executable config in `backend/` and `docker-compose.yml` instead.
- OpenCode always loads this file plus `.opencode/context/*` via `.opencode/opencode.json`.

## Commands That Actually Work
- Run API locally: `cd backend && ./mvnw spring-boot:run`
- Run full backend tests: `cd backend && ./mvnw test`
- Run one test class: `cd backend && ./mvnw -Dtest=AuthenticationServiceImplTest test`
- Run one test method: `cd backend && ./mvnw -Dtest=AuthenticationServiceImplTest#login_ShouldReturnTokens_WhenCredentialsValid test`
- Start DB + backend in Docker: `docker compose up -d postgres backend`

## Runtime and Data Quirks
- Backend is PostgreSQL + Flyway, not Mongo. JDBC defaults come from `backend/src/main/resources/application.properties`.
- Default local DB port is `5433` (`DB_PORT`), and compose maps `5433:5432`; many tools assume `5432` and will fail unless overridden.
- Default database name is `nutrion` (typo is intentional in current config and compose).
- `spring.jpa.hibernate.ddl-auto=validate`; schema must match Flyway migrations under `backend/src/main/resources/db/migration`.
- App and DB are configured for UTC (`TimeZone.setDefault("UTC")`, Hibernate timezone, and Docker `JAVA_TOOL_OPTIONS`).

## Backend Map (Real Entry Points)
- Spring Boot entry point: `backend/src/main/java/com/example/backend/BackendApplication.java`.
- Security wiring: `backend/src/main/java/com/example/backend/config/SecurityConfig.java` permits `/auth/**`, `/api/auth/**`, and Swagger docs; everything else requires auth.
- API response wrapper is standardized as `ApiResponse<T>` in `backend/src/main/java/com/example/backend/dto/response/ApiResponse.java`.
- Current implemented surface is centered around auth + core entities (`Users`, `Foods`, `Logs`, `LogFoods`), not modular feature packages described in planning docs.

## Testing and Workflow Notes
- There are existing tests in `backend/src/test/java` (service + controller + app context); do not assume test tree is empty.
- No CI workflow is present under `.github/workflows`; run relevant Maven tests locally before handing off.
