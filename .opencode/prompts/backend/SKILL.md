---
name: backend
description: Spring Boot module structure, internal service interfaces, controller templates, JPA/PostgreSQL repository patterns
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
- All endpoints must return `ApiResponse<T>` using the class `com.example.backend.dto.ApiResponse<T>` defined in `backend/src/main/java/com/example/backend/dto/ApiResponse.java`.
- No business logic in controllers — delegate to Service immediately
- Use `@Valid` for DTO validation

## 4. Module-Specific Patterns
| Module | Base Path | Key Entity | Notes |
|--------|-----------|------------|-------|
| auth | /api/v1/auth | User | JWT + refresh tokens |
| user_profile | /api/v1/users | User | BMR uses Mifflin-St Jeor, calorie target via TDEE |
| food_catalog | /api/v1/foods | Food | B-tree index on name for search |
| meal_tracking | /api/v1/logs | Log + LogFood | Manual logging, gram-based calorie calculation |
| dashboard | /api/v1/statistics | — | read-only aggregation (weekly/monthly) |
| admin | /api/v1/admin | — | RBAC: ADMIN role only |

## 5. API Response Envelope
All API responses must use the class `com.example.backend.dto.ApiResponse<T>` located in `backend/src/main/java/com/example/backend/dto/ApiResponse.java` to wrap response data:
```java
package com.example.backend.dto;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ApiResponse<T> {
    String message;
    T data;
}
```
All endpoints must return `ApiResponse<T>`.

## 6. JPA/PostgreSQL Repository Patterns
- `JpaRepository<T, Long>` for CRUD
- `@Query` with JPQL or native SQL for custom lookups
- Use `@Column(name = "snake_case")` for all field mappings
- Compound indexes via `@Table(indexes = {...})` for time-series queries (e.g., `user_id + logged_at`)
- Use `Page<T>` and `Pageable` for all list endpoints
