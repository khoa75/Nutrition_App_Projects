---
name: user_profile_step_frontend_integration
description: >
  Prompt: Build User Profile Module (Health Profile) - Step 3: Frontend Integration (React-Native)
license: Apache-2.0
compatibility: opencode
---

# Prompt: Build User Profile Module (Health Profile) - Step 3: Frontend Integration (React-Native)

## 1. Context & Constraints
Please read the following files before writing code:
- `.opencode/context/02-requirements/module_breakdown.md` (Module `user_profile` section)
- `.opencode/context/02-requirements/business-rules.md` (BMI, BMR, TDEE formulas)
- `.opencode/context/03-standards/rules.md` (metric only: kg, cm)

## 2. Task: Frontend Integration (React-Native)
1. **Write unit tests for the expected business logic before writing the actual source code (Test-First).**
2. Create the "Initial Health Info" (Onboarding) screen for new users using React-Native.
3. Collect health data in metric units (kg, cm) only — no unit toggle needed.
4. Use `react-native-chart-kit` or `Victory Native` to draw a simple calorie progress chart.

## 3. Acceptance Criteria
- BMI and TDEE metrics must match standard formulas exactly.
- Adhere to coding standards and include Unit Tests for formula calculations.
