---
name: dashboard_step_statistics_api
description: >
  Prompt: Build Dashboard Module (Statistics & Visualization) - Step 1: Statistics API (Spring Boot)
license: Apache-2.0
compatibility: opencode
---

# Prompt: Build Dashboard Module (Statistics & Visualization) - Step 1: Statistics API (Spring Boot)

## 1. Context & Constraints
- `.opencode/context/02-requirements/module_breakdown.md` (Module `dashboard` section)
- `.opencode/prompts/front-end/SKILL.md` (How to use Charts in React-Native/React)
- `.opencode/context/03-standards/rules.md` (Dashboard query speed < 2s)

## 2. Task: Statistics API (Spring Boot)
1. **Write unit tests for the expected business logic before writing the actual source code (Test-First).**
2. In the `com.nutrition.dashboard` package, implement API `GET /api/dashboard/summary?date=YYYY-MM-DD`.
3. Extract data from tables (`users`, `logs`) to return: `goal_calories`, `total_calories` consumed.
4. Implement API `GET /api/v1/statistics/weekly` and `GET /api/v1/statistics/monthly`: Retrieve time-series calorie data grouped by day using PostgreSQL native SQL queries (`GROUP BY DATE(logged_at)`).

## 3. Acceptance Criteria
- Dashboard loads all data in under 2 seconds even with a large number of logs.
- UI redraws charts smoothly without lag (use appropriate caching in React-Native).
