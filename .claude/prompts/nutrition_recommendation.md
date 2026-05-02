# Prompt: Cụm Chức Năng Nutrition Recommendation

*Sử dụng lần lượt các prompt nguyên tử dưới đây để xây dựng hệ thống Gợi ý Dinh dưỡng.*

## Bước 1: Backend - Tính toán TDEE (Service)
```text
You are an expert Spring Boot developer.
Your task is to implement the TDEE (Total Daily Energy Expenditure) logic.
1. Create a `NutritionService`.
2. Implement Mifflin-St Jeor formula for BMR calculation. (Requires gender, weight, height, age).
3. Implement TDEE calculation by multiplying BMR with the Activity Level factor (Low=1.2, Moderate=1.55, High=1.9).
4. Write thorough JUnit tests verifying the math with known correct examples.
```

## Bước 2: Backend - Logic Phân bổ Calo và Macros
```text
You are an expert Spring Boot developer.
Your task is to calculate daily target calories and macronutrients.
1. In `NutritionService`, write logic to determine Target Calories:
   - Weight Loss: TDEE - 500
   - Weight Gain: TDEE + 500
   - Maintain: TDEE
2. Write logic to split Target Calories into Macros (Protein=30%, Carbs=40%, Fat=30%). Recall that 1g Protein=4kcal, 1g Carb=4kcal, 1g Fat=9kcal.
3. Return a `DailyNutritionTarget` object.
4. Add JUnit tests for this calculation.
```

## Bước 3: Backend - API Endpoint Gợi ý
```text
You are an expert Spring Boot developer.
Your task is to expose the daily nutrition plan via API in the Nutrition module.
1. Create an endpoint `GET /api/v1/nutrition/daily-target`.
2. IMPORTANT: Fetch the authenticated user's profile by calling the internal `UserInternalService` from the `user` module. Do NOT access `UserRepository` directly.
3. Call `NutritionService` to compute targets, and return the result.
4. Ensure the response format includes total target calories and target grams for protein, carbs, and fat.
```

## Bước 4: Frontend - Lớp Data (Model & API Client)
```text
You are an expert Flutter developer.
Your task is to create the data layer for the Daily Nutrition Target.
1. Create a Dart model class `DailyNutritionTarget` with fields: targetCalories, proteinGrams, carbsGrams, fatGrams. Use `json_serializable`.
2. Implement a repository method to `GET /api/v1/nutrition/daily-target`.
3. Handle parsing errors and network exceptions.
```

## Bước 5: Frontend - Giao diện Biểu đồ Mục tiêu
```text
You are an expert Flutter developer.
Your task is to build a UI widget displaying the Daily Target.
1. Create a clean Card widget.
2. Inside, prominently display the Target Calories.
3. Use linear progress bars or circular indicators to show the target amount of Protein, Carbs, and Fats.
4. Ensure the design is modern, using appropriate spacing and typography.
```

## Bước 6: Frontend - Giao diện Thay đổi Mục tiêu
```text
You are an expert Flutter developer.
Your task is to add functionality for users to change their weight goal.
1. Create a simple form/dialog allowing the user to select a new goal (Lose/Maintain/Gain weight).
2. Call a backend API to update the profile.
3. Trigger a state refresh to recalculate and redraw the Daily Target widget.
```
