# Step 1: Backend - User Entity & Database Schema

You are an expert Spring Boot developer.
Your task is to create the `User` entity and set up the MongoDB repository within a dedicated `user` module.

Requirements:
1. Place all code in the `com.nutrition.user` package.
2. Fields: `id`, `weightKg` (double), `heightCm` (double), `dateOfBirth` (LocalDate), `gender` (Enum), `activityLevel` (Enum), `bmiCurrent` (double), `status`.
3. Create a `UserRepository` interface extending `MongoRepository` (keep it package-private if possible).
4. Create a `UserInternalService` public interface to allow other modules to fetch/update users without accessing the repository directly.