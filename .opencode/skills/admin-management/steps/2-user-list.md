# Step 2: Backend - User List API

You are an expert Spring Boot developer.
Your task is to build the User Management API for the Admin module.

1. Create `GET /api/v1/admin/users`.
2. Implement Pagination and Sorting using Spring Data `Pageable`.
3. IMPORTANT: Do not query the `UserRepository` directly. Call the public interface of the `user` module (e.g., `UserInternalService`) to fetch user summaries.
4. Add search parameters (by email or name) and filter parameters (by status: ACTIVE/INACTIVE).
5. Return a `Page` object containing user summaries (excluding passwords).