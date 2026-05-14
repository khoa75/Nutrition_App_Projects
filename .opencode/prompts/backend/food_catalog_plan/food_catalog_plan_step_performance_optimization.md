# Prompt: Build Food Catalog & Nutrition Plan Module - Step 3: Performance Optimization

## 1. Context & Constraints
- `.opencode/context/02-requirements/module_breakdown.md` (`food_catalog` & `nutrition_plan` sections)
- `.opencode/skills/database.md` (MongoDB Indexing Strategy)
- `.opencode/context/02-requirements/business-rules.md` (Macronutrients & Target Calories)

## 2. Task: Performance Optimization
- Apply Redis Cache for popular food lists or frequent search results to ensure extremely fast API response times.

## 3. Acceptance Criteria
- Dish search functionality works efficiently with the Text Search Index.
- The meal plan generation algorithm does not enter infinite loops and correctly calculates total calories.
- APIs handle load effectively under simulated high traffic.
