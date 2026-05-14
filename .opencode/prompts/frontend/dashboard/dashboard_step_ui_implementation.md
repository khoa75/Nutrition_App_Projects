# Prompt: Build Dashboard Module (Statistics & Visualization) - Step 3: UI Implementation (Flutter)

## 1. Context & Constraints
- `.opencode/context/02-requirements/module_breakdown.md` (Module `dashboard` section)
- `.opencode/skills/front-end.md` (How to use Charts in Flutter/React)
- `.opencode/context/03-standards/rules.md` (Dashboard query speed < 2s)

## 2. Task: UI Implementation (Flutter)
1. **Write unit tests for the expected business logic before writing the actual source code (Test-First).**
2. Use the `fl_chart` library to draw Line Charts (for weight trends) and Bar Charts/Pie Charts (for calorie consumption).
3. Design an intuitive, clear interface displaying warnings (in red) if the User consumes too many calories beyond the allowance.

## 3. Acceptance Criteria
- Dashboard loads all data in under 2 seconds even with a large number of logs.
- UI redraws charts smoothly without lag (use const constructors and appropriate caching in Flutter).
