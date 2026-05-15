# Core Test Scenarios

List of critical test cases that the system must pass to ensure TDD coverage >80%.
AI Agents (`build`, `reviewer`) will use this list as a source of truth for automatically writing Unit Tests and Integration Tests.

## 1. Authentication Module
- **TC-AUTH-01**: Intentionally enter incorrect password 5 times -> Account must be temporarily locked.
- **TC-AUTH-02**: Token expired -> Successful request for a new one using Refresh Token.
- **TC-AUTH-03**: Role-based permissions -> User with `USER` role cannot access endpoints prefixed with `/api/admin/*`.

## 2. BMI & User Profile Module
- **TC-BMI-01**: Accurate BMI calculation -> Input: Height 170cm, Weight 65kg -> Output: BMI ~ 22.49 (Normal).
- **TC-BMI-02**: Validate negative data -> Intentionally enter height or weight <= 0 -> System throws `ValidationException` (HTTP 400).

## 3. AI Scan Module (FastAPI)
- **TC-AI-01**: Check image format -> Send a non-image file (e.g., .pdf) -> System must block and return 415 Unsupported Media Type error.
- **TC-AI-02**: Handle oversized images -> Upload image > 5MB -> System returns a size limit error.

*(Additional cases to be added as new features are integrated into the system...)*
