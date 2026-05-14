# Prompt: Build User Profile Module (Health Profile) - Step 3: Frontend Integration (Flutter)

## 1. Context & Constraints
Please read the following files before writing code:
- `.opencode/context/02-requirements/module_breakdown.md` (Module `user_profile` section)
- `.opencode/context/02-requirements/business-rules.md` (BMI, BMR, TDEE formulas)
- `.opencode/context/03-standards/rules.md` (kg/lbs, cm/feet support)

## 2. Task: Frontend Integration (Flutter)
1. **Write unit tests for the expected business logic before writing the actual source code (Test-First).**
2. Create the "Initial Health Info" (Onboarding) screen for new users.
3. Provide a UI/UX to easily toggle between Metric (kg/cm) and Imperial (lbs/feet) measurement systems.
4. Use `fl_chart` to draw a simple weight history chart.

## 3. Acceptance Criteria
- BMI and TDEE metrics must match standard formulas exactly.
- Weight logs must not be duplicated for the same day (update instead of inserting new).
- Adhere to coding standards and include Unit Tests for formula calculations.
