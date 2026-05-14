# Prompt: Build User Profile Module (Health Profile) - Step 1: Design Model & DTO (Spring Boot)

## 1. Context & Constraints
Please read the following files before writing code:
- `.opencode/context/02-requirements/module_breakdown.md` (Module `user_profile` section)
- `.opencode/context/02-requirements/business-rules.md` (BMI, BMR, TDEE formulas)
- `.opencode/context/03-standards/rules.md` (kg/lbs, cm/feet support)

## 2. Task: Design Model & DTO (Spring Boot)
1. **Write unit tests for the expected business logic before writing the actual source code (Test-First).**
2. Create the `com.nutrition.userprofile` package.
3. Create the `user_health_logs` collection in MongoDB to store daily weight history.
4. Create DTOs requiring input for `full_name`, `dob`, `gender`, `activity_level`, and `goal_type`.

## 3. Acceptance Criteria
- BMI and TDEE metrics must match standard formulas exactly.
- Weight logs must not be duplicated for the same day (update instead of inserting new).
- Adhere to coding standards and include Unit Tests for formula calculations.
