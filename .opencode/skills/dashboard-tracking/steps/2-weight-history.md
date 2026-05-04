# Step 2: Backend - Weight History API

You are an expert Spring Boot developer.
Your task is to provide weight history data for charting.

1. Create `GET /api/v1/users/weight/history?days=30`.
2. IMPORTANT: Inject the `UserInternalService` to fetch the last 30 days of weight entries for the authenticated user. Do NOT query `WeightEntryRepository` directly from the dashboard module.
3. Return the data sorted chronologically.