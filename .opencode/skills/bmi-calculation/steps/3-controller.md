# Step 3: Backend - Controller

You are an expert Spring Boot developer.
Your task is to expose the BMI calculation via REST API.

1. Create a `UserController`.
2. Add a `POST /api/v1/users/profile/bmi` endpoint.
3. The endpoint should receive user data, call `BmiService`, calculate the BMI, update the `User` entity, and save to `UserRepository`.
4. Ensure proper validation (e.g., negative weight) and return HTTP 400 for bad input.
5. Write an Integration Test using MockMvc.