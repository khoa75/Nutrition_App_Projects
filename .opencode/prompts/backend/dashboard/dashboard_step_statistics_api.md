# Prompt: Build Dashboard Module (Statistics & Visualization) - Step 1: Statistics API (Spring Boot)

## 1. Context & Constraints
- `.opencode/context/02-requirements/module_breakdown.md` (Module `dashboard` section)
- `.opencode/skills/front-end.md` (How to use Charts in Flutter/React)
- `.opencode/context/03-standards/rules.md` (Dashboard query speed < 2s)

## 2. Task: Statistics API (Spring Boot)
1. **Write unit tests for the expected business logic before writing the actual source code (Test-First).**
2. In the `com.nutrition.dashboard` package, implement API `GET /api/dashboard/summary?date=YYYY-MM-DD`.
3. Extract data from collections (`user_health_logs`, `meal_logs`) to return: `target_calories`, `consumed_calories`, `remaining_calories`, and `goal_progress_percent`.
4. Implement API `GET /api/dashboard/charts`: Retrieve time-series data for charts over week/month periods. Use MongoDB Aggregation to group data by day.

## 3. Acceptance Criteria
- Dashboard loads all data in under 2 seconds even with a large number of logs.
- UI redraws charts smoothly without lag (use const constructors and appropriate caching in Flutter).
