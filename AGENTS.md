# Nutrition App – OpenCode Agent Guide

**Purpose** – Compact, high‑signal guidance to ensure all OpenCode agents start productive and avoid runtime pitfalls.

---

## 1. Runtime Essentials

- **Backend (Spring Boot & Java 21):**
  - Run with `./mvnw spring-boot:run` in `backend/`. Unit tests: `./mvnw test`.
  - Connects to PostgreSQL 15. Local: `jdbc:postgresql://localhost:5433/nutrion` (User: `appuser`, Pass: `apppass`). Override via `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USERNAME`, `DB_PASSWORD`.
  - Flyway manages schemas automatically under `backend/src/main/resources/db/migration/`.
- **Docker Stack:**
  - Launch PostgreSQL using `docker compose up -d postgres` from root (runs on port `5433` host / `5432` container).
- **Frontends (Mobile & Admin):**
  - No scaffolding exists yet. `npm` / `react-native` commands will fail until `package.json` and folders are created.
  - Mobile: React-Native (TS) + React Native Paper. Web Admin: React.js (TS) + Tailwind CSS + Ant Design.

---

## 2. Architecture & Boundaries

- **Pattern:** Strict Modular Monolith using Controller $\rightarrow$ Service $\rightarrow$ Repository.
- **Entry Point:** `backend/src/main/java/com/example/backend/BackendApplication.java`
- **Active Packages (under `com.example.backend`):** `controller`, `entity`, `repository`, `dto`, `enums`, `exception`.
- **Integration Rule:** Zero cross-module repository access. Controllers must return standard `ApiResponse<T>` (fields: `success`, `message`, `data`, `timestamp`).
- **Database Schema:** Tables are `users`, `foods`, `logs`, and `log_foods` (many-to-many intermediate table with `LogFoodsId` composite key).

---

## 3. Core Business Rules (Calorie-Only)

The app operates on a **strict calorie-only model** (no imperial units or AI vision):
- **BMI:** `weight (kg) / height (m)²` (<18.5: Underweight, 18.5-24.9: Normal, 25-29.9: Overweight, ≥30: Obese).
- **BMR (Mifflin-St Jeor):** 
  - Male: `(10 * weight_kg) + (6.25 * height_cm) - (5 * age) + 5`
  - Female: `(10 * weight_kg) + (6.25 * height_cm) - (5 * age) - 161`
- **TDEE:** `BMR * Activity Factor` (Low: 1.2, Average: 1.55, High: 1.725).
- **Daily Target:** Weight Loss: `TDEE - (300 to 500)`, Gain: `TDEE + (300 to 500)`, Maintain: `TDEE`.
- **Dish Substitution:** Calorie difference must be `< 50 kcal`.

---

## 4. Agent Architecture & Delegation

All tasks are orchestrated by the **Project Lead** (who never writes code directly) and delegated to specialized subagents:
- **Planner:** Sprint planning & breakdowns.
- **Backend Dev:** Java API and JPA implementation.
- **React Native Dev / React Dev:** Mobile and Admin dashboard interfaces.
- **DevOps:** Docker and database configurations.
- **Reviewer:** Code quality, security (<2s API response, >80% test coverage).
- **Docs Writer:** Maintaining `.opencode/context/` specs and `HISTORY_PROMPTS.md`.

---

## 5. Reference & Common Gotchas

- **Sources of Truth:** Config in `.opencode/opencode.json`, specs in `.opencode/context/`.
- **Port Gotcha:** Spring Boot runs locally on port `8080` but connects to the database via port `5433` (external port).
- **JWT Key:** Default HMAC key configured in `application.properties`; override in production.

---
*Keep this file up‑to‑date as the repository architecture and features evolve.*