# Code Standards Rule

This rule enforces the coding standards defined in the Nutrition App project.

## Naming Conventions
- **Functions & Methods**: `camelCase` (e.g., `calculateBMI()`, `fetchUserDetails()`).
- **Classes & Interfaces**: `PascalCase` (e.g., `UserService`, `NutritionRecommendation`).
- **Constants**: `UPPER_SNAKE_CASE` (e.g., `MAX_RETRY_ATTEMPTS`, `BASE_URL`).
- **Database Fields & Collections**: `snake_case` (e.g., `user_id`, `weight_kg`).

## Code Organization (Modular Monolith)
- **Package-by-Feature/Domain**: Tổ chức code theo từng module nghiệp vụ (e.g., `com.app.user`, `com.app.nutrition`) thay vì theo layer (Controllers, Services chung). Mỗi module tự chứa Model, Controller, Service và Repository của riêng nó.
- **Strict Module Boundaries**: Không module nào được gọi trực tiếp Repository hoặc truy cập trực tiếp Database của module khác. Giao tiếp chéo module (Inter-module communication) phải được thực hiện thông qua các Public Service Interfaces nội bộ.
- **Function Size**: Keep functions small, focused, and single-purpose.
- **Documentation**: Add standard comments (e.g., Javadoc, JSDoc, DartDoc) cho các đoạn logic phức tạp và public APIs (kể cả Internal APIs giữa các modules).
- **Variable Names**: Use descriptive and meaningful variable names (e.g., `userWeightKg` instead of `w`).
