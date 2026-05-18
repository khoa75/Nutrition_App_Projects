---
name: system-design
description: Modular monolith architecture, module dependency graph, transaction boundaries, caching strategy, and performance budgets
license: Apache-2.0
compatibility: opencode
---
## 1. Modular Monolith Communication Flow
```
Controller (module A) → Service Interface (module A)
                      → Internal Service Interface (module B) ← allowed
                      → Repository (module B) ← FORBIDDEN
                      → Direct DB access ← FORBIDDEN
```
Each module owns its database tables. Module B exposes a service interface that Module A consumes.

## 2. Module Dependency Graph
```
auth ──→ user_profile ──→ nutrition_plan
  │                           │
  └──→ meal_tracking ←── food_catalog
         │
         └──→ dashboard
                │
admin ───→ all modules (read-only via service interfaces)
```
Dependencies point FROM consumer TO provider. No circular dependencies.

## 3. Shared Kernel
Allowed shared components:
- `common/dto/ApiResponse.java` — response envelope
- `common/exception/` — GlobalExceptionHandler, custom exceptions
- `common/config/` — SecurityConfig, DatabaseConfig, CorsConfig
- `common/util/` — DateUtils, CalorieCalculator (stateless utilities)

## 4. Transaction Boundaries
- Transactions stay within a single module
- Cross-module operations use compensating actions (no distributed TX)
- Example: `logMeal()` (meal_tracking) → `updateStats()` (dashboard) via async event



## 6. Caching Strategy
- **Phase 1**: No Redis. Cache in-memory (Caffeine cache, 5 min TTL) for food catalog + BMI results
- **Phase 2**: Add Redis for meal_plan cache, session store
- **Phase 3**: Redis cluster for dashboard aggregation cache

## 7. Performance Budget
| Operation | Target | Degradation Threshold |
|-----------|--------|----------------------|
| Login/Auth | < 500ms | > 1s |
| BMI calculation | < 200ms | > 500ms |
| Food search | < 800ms | > 1.5s |

| Dashboard load | < 1.5s | > 3s |
| Meal log save | < 500ms | > 1s |
