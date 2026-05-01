# Code Standards Rule

This rule enforces the coding standards defined in the Nutrition App project.

## Naming Conventions
- **Functions & Methods**: `camelCase` (e.g., `calculateBMI()`, `fetchUserDetails()`).
- **Classes & Interfaces**: `PascalCase` (e.g., `UserService`, `NutritionRecommendation`).
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_ATTEMPTS`, `BASE_URL`).
- **Database Fields & Collections**: `snake_case` (e.g., `user_id`, `weight_kg`).

## Code Organization
- **Separation of Concerns**: Strictly separate Models, Controllers/Routes, Services, and UI Components.
- **Function Size**: Keep functions small, focused, and single-purpose.
- **Documentation**: Add standard comments (e.g., Javadoc, JSDoc, DartDoc) for complex logic and public API endpoints.
- **Variable Names**: Use descriptive and meaningful variable names (e.g., `userWeightKg` instead of `w`).
