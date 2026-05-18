---
name: user_profile_step_design_model_dto
description: >
  Prompt: Build User Profile Module (Health Profile) - Step 1: Design Model & DTO (Spring Boot)
license: Apache-2.0
compatibility: opencode
---

# Prompt: Build User Profile Module (Health Profile) - Step 1: Design Model & DTO (Spring Boot)

## 1. Context & Constraints
Please read the following files before writing code:
- `.opencode/context/02-requirements/module_breakdown.md` (Module `user_profile` section)
- `.opencode/context/02-requirements/business-rules.md` (BMI, BMR, TDEE formulas)
- `.opencode/context/03-standards/rules.md` (metric only: kg, cm)

## 2. Task: Design Model & DTO (Spring Boot)
1. **Write unit tests for the expected business logic before writing the actual source code (Test-First).**
2. Create the `com.nutrition.userprofile` package.
3. Create the `User` JPA Entity for PostgreSQL. Use `@Column(name = "snake_case")` for all field mappings.
4. Create DTOs requiring input for `name`, `dob`, `gender`, `current_weight`, `target_weight`, `height`, `activity_level`, `goal_type`, and `kg_per_week`.

## 3. Acceptance Criteria
- BMI and TDEE metrics must match standard formulas exactly.
- Weight logs must not be duplicated for the same day (update instead of inserting new).
- Adhere to coding standards and include Unit Tests for formula calculations.
