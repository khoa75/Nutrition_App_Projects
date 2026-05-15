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
│   ├── FoodSearchTest.java         # Unit: text search, pagination
│   └── FoodCatalogControllerTest.java
├── meal_tracking/
│   ├── MealLogServiceTest.java     # Unit: manual + AI log creation
│   └── MealTrackingControllerTest.java
├── dashboard/
│   ├── DashboardServiceTest.java   # Unit: aggregation pipelines
│   └── DashboardControllerTest.java
├── admin/
│   ├── AdminServiceTest.java       # Unit: user mgmt, audit logging
│   └── AdminControllerTest.java
└── common/
    └── SecurityIntegrationTest.java # Integration: full auth flow
```

## 3. Key Test Scenarios (per module)
| Module | Critical Scenarios |
|--------|--------------------|
| auth | Login success, wrong password, account locked after 5 attempts, token refresh, social login |
| user_profile | BMI categories (underweight/normal/overweight/obese), BMR for M/F, TDEE at 5 activity levels |
| food_catalog | Text search with diacritics, empty results, pagination boundary |
| meal_tracking | Manual log creation, AI vision integration, duplicate prevention |
| dashboard | Weekly aggregation, date range boundaries, empty periods |
| admin | Lock/unlock user, search with filters, audit trail integrity |

## 4. Coverage Requirements
- Service layer: 90%+ line coverage (core business logic)
- Controller layer: 80%+ (happy path + validation errors)
- Repository: integration tests only (verify custom queries)
- Overall project: ≥ 80%
- Run via: `./mvnw test` (with `-Dspring.profiles.active=test`)

## 5. AI Service Testing (pytest)
```
ai-service/tests/
├── test_predict.py    # Mock image input, verify output schema
├── test_estimate.py   # Bounding box → calorie estimation accuracy
├── test_health.py     # Health endpoint returns 200
└── conftest.py        # Fixtures: sample images, mock model
```
- Accuracy test: run on 100 labeled food images, verify ≥ 85% top-3 accuracy
- Performance test: single image < 1.5s on CI GPU runner

## 6. Frontend Testing
- **Flutter**: `flutter test` — widget tests for each screen (loading/error/data states)
- **React**: `vitest` — component tests + MSW for API mocking
- Critical flows: registration, food search, meal logging, dashboard rendering
