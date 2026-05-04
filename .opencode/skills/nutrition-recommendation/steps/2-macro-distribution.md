# Step 2: Backend - Macro Distribution

You are an expert Spring Boot developer.
Your task is to calculate daily target calories and macronutrients.

1. In `NutritionService`, write logic to determine Target Calories:
   - Weight Loss: TDEE - 500
   - Weight Gain: TDEE + 500
   - Maintain: TDEE
2. Write logic to split Target Calories into Macros (Protein=30%, Carbs=40%, Fat=30%). Recall that 1g Protein=4kcal, 1g Carb=4kcal, 1g Fat=9kcal.
3. Return a `DailyNutritionTarget` object.
4. Add JUnit tests for this calculation.