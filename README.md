# Nutrition_App_Projects

A modular monolith for a nutrition‑tracking ecosystem consisting of four independent components:

| Component | Stack | Directory |
|---|---|---|
| **Backend** | Spring Boot 3, Java 21, MongoDB | `backend/` |
| **AI Service** | FastAPI, PyTorch | `ai-service/` |
| **Mobile App** | Flutter / Dart | `frontend/` |
| **Admin Dashboard** | React, TypeScript, Tailwind | `admin-dashboard/` |

## Project state
- The repository currently contains only the scaffold (directory structure). Build configuration files are **not yet added** (`pom.xml`, `pyproject.toml`, `pubspec.yaml`, `admin-dashboard/package.json`). Add them before running any commands.

## Quick start (after adding the missing build files)
```bash
# Backend (Java)
./mvnw spring-boot:run   # start API server
./mvnw test              # run unit tests

# AI Service (Python)
uv sync                                 # install deps
uv run uvicorn app.main:app --reload   # start FastAPI server

# Mobile app (Flutter)
flutter pub get
flutter run          # launch on device / emulator
flutter test         # run widget/unit tests

# Admin dashboard (React/TS)
npm install
npm run dev          # start dev server
```

## Architecture snapshot
- **Modular monolith** – each component lives in its own folder but shares a single Git repo.
- Backend modules communicate **only via internal service interfaces**; no cross‑module repository access.
- Flow of user data: `auth → user_profile → food_catalog → nutrition_plan → meal_tracking → dashboard → admin`.
- The AI service (`ai_vision_service`) runs as a separate FastAPI process and is invoked by the `meal_tracking` module.

## Development conventions
- **Naming**: `camelCase` for variables/methods, `PascalCase` for classes, `UPPER_SNAKE_CASE` for constants, `snake_case` for DB fields and Dart filenames.
- **Backend**: Controller → Service → Repository pattern; use `@Async` for non‑blocking work.
- **Flutter**: Clean Architecture; Riverpod for state management.
- **React**: TypeScript only, functional components with hooks.
- **Security**: JWT + refresh tokens, BCrypt passwords, account lockout after 5 failed attempts, secrets stored in `.env` (git‑ignored).

## Using **OpenCode**
- **Start a session**: run `opencode` (or the IDE‑integrated command) inside the repository root. The agent automatically loads the `AGENTS.md` and any `.opencode/*` configuration.
- **Prompt format**: write a clear, concise request. Example:
  ```
  Add a screen for US‑1.2 (Initial Health Information Entry) in the Flutter app.
  ```
  The agent will:
  1. Read high‑value docs (`README*`, `AGENTS.md`, `opencode.json`).
  2. Locate the appropriate entry point (e.g., `frontend/lib/screens/`).
  3. Generate or modify code, run lint/tests if configured, and commit only when you ask.
- **Prompt best practices**:
  - State the *role*, *goal*, and any *acceptance criteria*.
  - Mention required files or directories if you know them.
  - Keep it short; the agent will ask follow‑up questions only when ambiguous.
- **History**: every prompt is logged in `HISTORY_PROMPTS.md` with a timestamp, enabling reproducibility and audit.

## Useful docs
- Detailed specifications live in `.opencode/context/` (architecture, requirements, UI/UX, standards, API contracts, QA, etc.).
- Skills for specialized workflows are in `.opencode/skills/`.
- Agent roles and repository configuration are defined in `opencode.json`.

## History
- All user prompts are logged in `HISTORY_PROMPTS.md` with timestamps.

---
*This README is kept intentionally concise; refer to the context files for deeper information.*
