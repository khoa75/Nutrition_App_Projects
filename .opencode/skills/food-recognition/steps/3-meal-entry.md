# Step 3: Backend - Meal Entry

You are an expert Spring Boot developer.
Your task is to create the backend storage for meals within a dedicated `meals` module.

1. Place all code in the `com.nutrition.meals` package.
2. Create a `MealEntry` entity: `id`, `userId`, `date`, `foodName`, `calories`, `protein`, `carbs`, `fat`, `imageUrl`, `isRecognized` (boolean).
3. Create the `MealEntryRepository` (package-private if possible).
4. Create a `MealInternalService` public interface to allow other modules (like Dashboard) to fetch meal statistics.