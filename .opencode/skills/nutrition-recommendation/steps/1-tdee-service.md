# Step 1: Backend - TDEE Service

You are an expert Spring Boot developer.
Your task is to implement the TDEE (Total Daily Energy Expenditure) logic.

1. Create a `NutritionService`.
2. Implement Mifflin-St Jeor formula for BMR calculation. (Requires gender, weight, height, age).
3. Implement TDEE calculation by multiplying BMR with the Activity Level factor (Low=1.2, Moderate=1.55, High=1.9).
4. Write thorough JUnit tests verifying the math with known correct examples.