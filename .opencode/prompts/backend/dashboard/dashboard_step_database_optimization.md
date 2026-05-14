# Prompt: Build Dashboard Module (Statistics & Visualization) - Step 2: Database Optimization

## 1. Context & Constraints
- `.opencode/context/02-requirements/module_breakdown.md` (Module `dashboard` section)
- `.opencode/skills/front-end.md` (How to use Charts in Flutter/React)
- `.opencode/context/03-standards/rules.md` (Dashboard query speed < 2s)

## 2. Task: Database Optimization
1. Ensure log storage collections have Indexes on the `user_id` and `date` fields to prevent query slowdown as data grows.

## 3. Acceptance Criteria
- Dashboard loads all data in under 2 seconds even with a large number of logs.
- UI redraws charts smoothly without lag (use const constructors and appropriate caching in Flutter).
