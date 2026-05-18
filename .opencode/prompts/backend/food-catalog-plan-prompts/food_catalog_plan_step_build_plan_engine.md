---
name: food_catalog_plan_step_build_plan_engine
description: >
  Prompt: Build Food Catalog & Nutrition Plan Module - Step 2: Build Nutrition Plan Engine
license: Apache-2.0
compatibility: opencode
---

# Prompt: Build Food Catalog & Nutrition Plan Module - Step 2: Build Nutrition Plan Engine

## 1. Context & Constraints
- `.opencode/context/02-requirements/module_breakdown.md` (`food_catalog` & `nutrition_plan` sections)
- `.opencode/prompts/database/SKILL.md` (PostgreSQL Indexing Strategy)
- `.opencode/context/02-requirements/business-rules.md` (Macronutrients & Target Calories)

## 2. Task: Build Nutrition Plan Engine
1. Create an algorithm (Service) that takes `TDEE` and the user's `goal` (weight gain/loss) as input.
2. Generate a daily meal plan (Breakfast, Lunch, Dinner) such that total calories approximately match `Target Calories` (TDEE +/- 500 calories).
3. Implement API `POST /api/v1/foods`: Add food and `POST /api/v1/logs` to log a meal with gram input, auto-calculating total calories (`gram / 100 * calories_per_100g`).

## 3. Acceptance Criteria
- Dish search functionality works efficiently with the Text Search Index.
- The meal plan generation algorithm does not enter infinite loops and correctly calculates total calories.
- APIs handle load effectively under simulated high traffic.
