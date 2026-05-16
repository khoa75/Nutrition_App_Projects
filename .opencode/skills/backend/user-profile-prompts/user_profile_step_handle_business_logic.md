---
name: user_profile_step_handle_business_logic
description: >
  Prompt: Build User Profile Module (Health Profile) - Step 2: Handle Business Logic
license: Apache-2.0
compatibility: opencode
---

# Prompt: Build User Profile Module (Health Profile) - Step 2: Handle Business Logic

## 1. Context & Constraints
Please read the following files before writing code:
- `.opencode/context/02-requirements/module_breakdown.md` (Module `user_profile` section)
- `.opencode/context/02-requirements/business-rules.md` (BMI, BMR, TDEE formulas)
- `.opencode/context/03-standards/rules.md` (kg/lbs, cm/feet support)

## 2. Task: Handle Business Logic
1. Implement `HealthMetricsService` to accurately calculate BMI and TDEE according to the formulas in `business-rules.md`.
2. API `POST /api/profile/update`: Saves personal information and returns calculated health metrics.
3. API `POST /api/profile/weight`: Updates the new weight for the day.
4. API `GET /api/profile/weight-history`: Retrieves weight history. Use MongoDB Aggregation if monthly statistics are needed.

## 3. Acceptance Criteria
- BMI and TDEE metrics must match standard formulas exactly.
- Weight logs must not be duplicated for the same day (update instead of inserting new).
- Adhere to coding standards and include Unit Tests for formula calculations.
