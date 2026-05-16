---
name: backend
description: Spring Boot module structure, internal service interfaces, controller templates, MongoDB repository patterns
license: Apache-2.0
compatibility: opencode
---
## 1. Module Structure (Package-by-Feature)
Each module follows: `controller/` → `service/` → `repository/` → `model/` → `dto/`
```
auth/
├── controller/AuthController.java
├── service/AuthService.java (interface)
├── service/impl/AuthServiceImpl.java
├── repository/UserRepository.java
├── model/User.java
└── dto/LoginRequest.java, RegisterRequest.java, TokenResponse.java
```

## 2. Internal Service Interface Pattern
```java
// 1) Define interface in the module
public interface UserProfileService {
    ProfileResponse calculateMetrics(MetricsRequest request);
}

// 2) Cross-module access ONLY via interface (no direct repository access)
// 3) Interfaces live in the module package, impl stays private
```

## 3. Controller Templates
- `@RestController`, `@RequestMapping("/api/v1/{module}")`
- All endpoints return `ResponseEntity<ApiResponse<T>>`
- No business logic in controllers — delegate to Service immediately
- Use `@Valid` for DTO validation

## 4. Module-Specific Patterns
| Module | Base Path | Key Entity | Notes |
|--------|-----------|------------|-------|
| auth | /api/v1/auth | User | JWT + refresh tokens |
| user_profile | /api/v1/profile | UserProfile | BMR uses Mifflin-St Jeor |
| food_catalog | /api/v1/foods | FoodItem | text indexes on name |
| nutrition_plan | /api/v1/plans | MealPlan | TDEE-based generation |
| meal_tracking | /api/v1/meals | MealLog | can call ai-service via RestClient |
| dashboard | /api/v1/dashboard | — | read-only aggregation |
| admin | /api/v1/admin | — | RBAC: ADMIN role only |

## 5. API Response Envelope
```java
public record ApiResponse<T>(boolean success, String message, T data, LocalDateTime timestamp) {}
```
Always wrap in this format. Error responses use same envelope with `data = null`.

## 6. MongoDB Repository Patterns
- `MongoRepository<T, String>` for CRUD
- `@Query` with JSON for custom lookups
- `Aggregation` pipeline for stats (weekly calorie totals)
- Compound indexes on `{userId: 1, date: -1}` for time-series queries
