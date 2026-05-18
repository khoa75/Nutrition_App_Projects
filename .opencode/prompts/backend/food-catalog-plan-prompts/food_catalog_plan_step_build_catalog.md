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
- `.opencode/prompts/database/SKILL.md` (PostgreSQL Indexing Strategy)
- `.opencode/context/02-requirements/business-rules.md` (Macronutrients & Target Calories)

## 2. Task: Build Food Catalog
1. **Write unit tests for the expected business logic before writing the actual source code (Test-First).**
2. Create the `foods` JPA Entity containing `name`, `calories_per_100g`, and macros (`protein`, `carbs`, `fats`, `fiber`). Allow `user_id` to be nullable (null = admin food).
3. Set up a **B-tree Index** on the `name` column to support fast name-based search (< 1s).
4. Implement API `GET /api/v1/foods?name=...&page=...&size=...` supporting partial name matching and pagination.

## 3. Acceptance Criteria
- Food search (by name) responds in < 1 second.
- The meal plan generation algorithm does not enter infinite loops and correctly calculates total calories.
- APIs handle load effectively under simulated high traffic.
