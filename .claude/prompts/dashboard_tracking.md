# Prompt: Cụm Chức Năng Dashboard & Progress Tracking

*Sử dụng lần lượt các prompt nguyên tử dưới đây để xây dựng hệ thống Dashboard.*

## Bước 1: Backend - API Thống kê Calo Hàng ngày
```text
You are an expert Spring Boot developer.
Your task is to write an aggregation API for daily calories in the Dashboard module.
1. Create a `DashboardService`.
2. IMPORTANT: Inject the `MealInternalService` from the `meals` module to fetch all `MealEntry` records for a specific user on a specific `Date`. Do NOT query `MealEntryRepository` directly.
3. Calculate the total calories, protein, carbs, and fat consumed that day.
4. Expose `GET /api/v1/dashboard/summary?date=YYYY-MM-DD` returning these totals alongside the user's daily targets.
```

## Bước 2: Backend - API Lịch sử Cân nặng
```text
You are an expert Spring Boot developer.
Your task is to provide weight history data for charting.
1. Create `GET /api/v1/users/weight/history?days=30`.
2. IMPORTANT: Inject the `UserInternalService` to fetch the last 30 days of weight entries for the authenticated user. Do NOT query `WeightEntryRepository` directly from the dashboard module.
3. Return the data sorted chronologically.
```

## Bước 3: Frontend - Giao diện Thanh Tiến trình Calo
```text
You are an expert Flutter developer.
Your task is to build a Daily Progress UI.
1. Fetch data from `/api/v1/dashboard/summary`.
2. Display a large circular progress bar showing `Calories Consumed / Target Calories`.
3. Display 3 smaller linear progress bars below it for Protein, Carbs, and Fats.
4. If consumed > target, turn the bar color to warning/red.
```

## Bước 4: Frontend - Tích hợp Biểu đồ Cân nặng (fl_chart)
```text
You are an expert Flutter developer.
Your task is to build a Weight History Chart using `fl_chart`.
1. Add the `fl_chart` dependency.
2. Fetch data from `/api/v1/users/weight/history`.
3. Render a beautiful Line Chart with smooth curves showing weight fluctuations over the last 30 days.
4. Add tooltips when the user taps on a data point.
```

## Bước 5: Frontend - Nút Cập nhật Cân nặng Nhanh
```text
You are an expert Flutter developer.
Your task is to add a quick action to the Dashboard.
1. Add a Floating Action Button (FAB) or a prominent card to "Log Today's Weight".
2. Open a modal bottom sheet with a number input.
3. Upon submitting, call the backend API to save the new weight and refresh the weight chart automatically.
```
