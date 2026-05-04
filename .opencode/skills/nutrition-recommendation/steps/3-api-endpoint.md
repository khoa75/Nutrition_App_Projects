# Step 3: Backend - API Endpoint

You are an expert Spring Boot developer.
Your task is to expose the daily nutrition plan via API in the Nutrition module.

1. Create an endpoint `GET /api/v1/nutrition/daily-target`.
2. IMPORTANT: Fetch the authenticated user's profile by calling the internal `UserInternalService` from the `user` module. Do NOT access `UserRepository` directly.
3. Call `NutritionService` to compute targets, and return the result.
4. Ensure the response format includes total target calories and target grams for protein, carbs, and fat.