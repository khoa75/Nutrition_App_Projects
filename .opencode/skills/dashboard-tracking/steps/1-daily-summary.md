# Step 1: Backend - Daily Summary API

You are an expert Spring Boot developer.
Your task is to write an aggregation API for daily calories in the Dashboard module.

1. Create a `DashboardService`.
2. IMPORTANT: Inject the `MealInternalService` from the `meals` module to fetch all `MealEntry` records for a specific user on a specific `Date`. Do NOT query `MealEntryRepository` directly.
3. Calculate the total calories, protein, carbs, and fat consumed that day.
4. Expose `GET /api/v1/dashboard/summary?date=YYYY-MM-DD` returning these totals alongside the user's daily targets.