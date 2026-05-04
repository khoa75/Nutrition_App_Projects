# Step 4: Frontend - Data Layer

You are an expert Flutter developer.
Your task is to create the data layer for the Daily Nutrition Target.

1. Create a Dart model class `DailyNutritionTarget` with fields: targetCalories, proteinGrams, carbsGrams, fatGrams. Use `json_serializable`.
2. Implement a repository method to `GET /api/v1/nutrition/daily-target`.
3. Handle parsing errors and network exceptions.