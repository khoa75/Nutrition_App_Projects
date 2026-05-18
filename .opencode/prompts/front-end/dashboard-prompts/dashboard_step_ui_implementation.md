---
name: dashboard_step_ui_implementation
description: >
  Prompt: Build Dashboard Module (Statistics & Visualization) - Step 3: UI Implementation (React-Native)
license: Apache-2.0
compatibility: opencode
---

# Prompt: Build Dashboard Module (Statistics & Visualization) - Step 3: UI Implementation (React-Native)

## 1. Context & Constraints
- `.opencode/context/02-requirements/module_breakdown.md` (Module `dashboard` section)
- `.opencode/prompts/front-end/SKILL.md` (How to use Charts in React-Native/React)
- `.opencode/context/03-standards/rules.md` (Dashboard query speed < 2s)

## 2. Task: UI Implementation (React-Native)
1. **Write unit tests for the expected business logic before writing the actual source code (Test-First).**
2. Use `react-native-chart-kit` or `Victory Native` to draw Line Charts (for calorie trends) and Bar Charts (for daily calorie consumption).
3. Design an intuitive, clear interface displaying warnings (in red) if the User consumes too many calories beyond the daily goal.

## 3. Acceptance Criteria
- Dashboard loads all data in under 2 seconds even with a large number of logs.
- UI redraws charts smoothly without lag (use React Query caching and memoization).
