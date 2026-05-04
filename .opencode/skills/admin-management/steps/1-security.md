# Step 1: Backend - Security

You are an expert Spring Boot developer.
Your task is to secure the Admin endpoints.

1. Update the Spring Security configuration.
2. Ensure that any request to `/api/v1/admin/**` requires the `ADMIN` role in the JWT token.
3. Write a simple mock endpoint `GET /api/v1/admin/ping` and write a test to ensure a normal user gets 403 Forbidden.