# Core Test Scenarios

List of critical test cases that the system must pass to ensure TDD coverage > 90% for Service layers and > 80% for Controller layers.
AI Agents (`build`, `reviewer`) will use this list as a source of truth for automatically writing Unit Tests and Integration Tests.

## 1. Authentication Module
- **TC-AUTH-01**: Intentionally enter incorrect password 5 times -> Account must be temporarily locked.
- **TC-AUTH-02**: Token expired -> Successful request for a new one using Refresh Token.
- **TC-AUTH-03**: Role-based permissions -> User with `USER` role cannot access endpoints prefixed with `/api/admin/*`.

## 2. BMI & User Profile Module
- **TC-BMI-01**: Accurate BMI calculation -> Input: Height 170cm, Weight 65kg -> Output: BMI ~ 22.49 (Normal).
- **TC-BMI-02**: Validate negative data -> Intentionally enter height or weight <= 0 -> System throws `ValidationException` (HTTP 400).
- **TC-BMI-03**: Daily Target Calculation -> System must recalculate Calorie targets when a user's weight changes or goal is updated.

## 3. Food Catalog & Meal Tracking Module
- **TC-FOOD-01**: Custom Portion Size Recalculation -> Input: Food with 150 calories per 100g, customize portion to 200g -> Output: System accurately recalculates to 300 calories.
- **TC-FOOD-02**: Validate negative portions -> Input: Add meal with portion size -50g -> System throws `ValidationException` (HTTP 400).

*(Additional cases to be added as new features are integrated into the system...)*
