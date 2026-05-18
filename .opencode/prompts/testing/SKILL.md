---
name: testing
description: Testing patterns, TDD workflow, coverage requirements, and test scenarios for Nutrition App
license: Apache-2.0
compatibility: opencode
---
## 1. TDD Workflow
1. Write test (fails) → implement minimal code → test passes → refactor
2. Every new feature module starts with 3 test files: `{Module}ServiceTest`, `{Module}ControllerTest`, `{Module}IntegrationTest`

## 2. Backend Testing (JUnit 5 + Mockito)
```
backend/src/test/java/com/nutrition/
├── auth/
│   ├── AuthServiceTest.java       # Unit: registration, login, token refresh, lockout
│   └── AuthControllerTest.java     # WebMvc: status codes, validation errors
├── user_profile/
│   ├── BmiCalculationTest.java     # Unit: verify Mifflin-St Jeor formula
│   └── ProfileControllerTest.java
├── food_catalog/
│   ├── FoodSearchTest.java         # Unit: name search, pagination
│   └── FoodCatalogControllerTest.java
├── meal_tracking/
│   ├── MealLogServiceTest.java     # Unit: calorie calculation from gram input
│   └── MealTrackingControllerTest.java
├── dashboard/
│   ├── DashboardServiceTest.java   # Unit: weekly/monthly calorie aggregation
│   └── DashboardControllerTest.java
├── admin/
│   ├── AdminServiceTest.java       # Unit: user mgmt, audit logging
│   └── AdminControllerTest.java
└── common/
    └── SecurityIntegrationTest.java # Integration: full auth flow
```

## 3. Key Test Scenarios (per module)
| Module | Critical Scenarios |
|--------|---|
| auth | Login success, wrong password, account locked after 5 attempts, token refresh |
| user_profile | BMI categories (UNDERWEIGHT/NORMAL/OVERWEIGHT/OBESITY_LEVEL_1/OBESITY_LEVEL_2), BMR for M/F, TDEE at 4 activity levels |
| food_catalog | Name search, empty results, pagination boundary, admin vs user food creation |
| meal_tracking | Manual log with gram input, calorie auto-calculation, date range filtering |
| dashboard | Weekly/monthly aggregation, date range boundaries, empty periods |
| admin | Lock/unlock user, search with filters, audit trail integrity |

## 4. Coverage Requirements
- Service layer: **90%+** line coverage (core business logic)
- Controller layer: **80%+** (happy path + validation errors)
- Repository: integration tests only (verify custom queries)
- Run via: `./mvnw test` (with `-Dspring.profiles.active=test`)

## 5. Frontend Testing (React-Native)
- **React-Native**: `Jest` + `React Native Testing Library` — component tests for each screen (loading/error/data states)
- **React (Admin)**: `Vitest` — component tests + MSW for API mocking
- Critical flows: registration, food search, meal logging, dashboard rendering
