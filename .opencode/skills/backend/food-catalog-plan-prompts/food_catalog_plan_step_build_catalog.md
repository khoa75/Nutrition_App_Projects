---
name: food_catalog_plan_step_build_catalog
description: >
  Prompt: Build Food Catalog & Nutrition Plan Module - Step 1: Build Food Catalog
license: Apache-2.0
compatibility: opencode
---

# Prompt: Build Food Catalog & Nutrition Plan Module - Step 1: Build Food Catalog

## 1. Context & Constraints
- `.opencode/context/02-requirements/module_breakdown.md` (`food_catalog` & `nutrition_plan` sections)
- `.opencode/skills/database.md` (MongoDB Indexing Strategy)
- `.opencode/context/02-requirements/business-rules.md` (Macronutrients & Target Calories)

## 2. Task: Build Food Catalog
1. **Write unit tests for the expected business logic before writing the actual source code (Test-First).**
2. Create the `food_items` collection containing dish name, `calories_per_100g`, and `macros` (protein, carbs, fat).
3. Set up a **Text Index** on the `food_name` field to support fast text search (< 1s).
4. Implement API `GET /api/foods/search` receiving query parameters and supporting pagination (limit/offset).

## 3. Acceptance Criteria
- Dish search functionality works efficiently with the Text Search Index.
- The meal plan generation algorithm does not enter infinite loops and correctly calculates total calories.
- APIs handle load effectively under simulated high traffic.
