# Testing Guidelines Rule

This rule provides the testing standards required for the Nutrition App.

## Coverage Target
- Aim for at least **80% code coverage** on critical business logic.

## Types of Tests
1. **Unit Tests**:
   - Write unit tests for critical functions, especially core features like BMI Calculation, TDEE Calculation, and Nutrition Recommendation Engine.
   - Separate business logic from framework-specific code to make it easier to test.

2. **Integration Tests**:
   - Implement integration tests for the API endpoints (Spring Boot and FastAPI).
   - Verify the flow from Controller -> Service -> Database.

3. **External Services**:
   - Mock all external services during testing. Do not hit production or live APIs (like Cloudinary or actual AI model servers in standard unit tests).
   - Use WireMock or equivalent for external HTTP calls.

4. **Frontend Tests**:
   - Flutter: Write Widget Tests for reusable UI components.
   - React: Use React Testing Library for Admin Dashboard components.
