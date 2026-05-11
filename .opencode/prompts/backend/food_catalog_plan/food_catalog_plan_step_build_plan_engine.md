# Prompt: Build Food Catalog & Nutrition Plan Module - Step 2: Build Nutrition Plan Engine

## 1. Context & Constraints
- `.opencode/context/module_breakdown.md` (`food_catalog` & `nutrition_plan` sections)
- `.opencode/skills/database.md` (MongoDB Indexing Strategy)
- `.opencode/context/business-rules.md` (Macronutrients & Target Calories)

## 2. Task: Build Nutrition Plan Engine
1. Create an algorithm (Service) that takes `TDEE` and the user's `goal` (weight gain/loss) as input.
2. Generate a daily meal plan (Breakfast, Lunch, Dinner) such that total calories approximately match `Target Calories` (TDEE +/- 500 calories).
3. Implement API `POST /api/plan/replace-item`: Search for food items with a calorie variance of `< 50 kcal` compared to the item being replaced to suggest to the user.

## 3. Acceptance Criteria
- Dish search functionality works efficiently with the Text Search Index.
- The meal plan generation algorithm does not enter infinite loops and correctly calculates total calories.
- APIs handle load effectively under simulated high traffic.
