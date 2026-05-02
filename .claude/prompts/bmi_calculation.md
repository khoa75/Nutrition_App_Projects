# Prompt: Cụm Chức Năng BMI Calculation

*Thay vì yêu cầu AI làm toàn bộ trong một bước, hãy sử dụng lần lượt các prompt nguyên tử (atomic prompts) dưới đây để kiểm soát chặt chẽ từng bước phát triển.*

## Bước 1: Backend - Khởi tạo User Entity & Database Schema
```text
You are an expert Spring Boot developer.
Your task is to create the `User` entity and set up the MongoDB repository within a dedicated `user` module.
Requirements:
1. Place all code in the `com.nutrition.user` package.
2. Fields: `id`, `weightKg` (double), `heightCm` (double), `dateOfBirth` (LocalDate), `gender` (Enum), `activityLevel` (Enum), `bmiCurrent` (double), `status`.
3. Create a `UserRepository` interface extending `MongoRepository` (keep it package-private if possible).
4. Create a `UserInternalService` public interface to allow other modules to fetch/update users without accessing the repository directly.
```

## Bước 2: Backend - Service Tính toán BMI
```text
You are an expert Spring Boot developer.
Your task is to implement the business logic for BMI calculation inside the `user` module.
1. Create a `BmiService`.
2. Implement a method `calculateBmi(double weightKg, double heightCm)` returning the BMI value.
3. Implement a method `categorizeBmi(double bmi)` returning a category (UNDERWEIGHT, NORMAL, OVERWEIGHT, OBESE).
4. Write 100% covered Unit Tests using JUnit for these calculation methods.
```

## Bước 3: Backend - Tạo Controller & Tích hợp
```text
You are an expert Spring Boot developer.
Your task is to expose the BMI calculation via REST API.
1. Create a `UserController`.
2. Add a `POST /api/v1/users/profile/bmi` endpoint.
3. The endpoint should receive user data, call `BmiService`, calculate the BMI, update the `User` entity, and save to `UserRepository`.
4. Ensure proper validation (e.g., negative weight) and return HTTP 400 for bad input.
5. Write an Integration Test using MockMvc.
```

## Bước 4: Frontend - Giao diện Nhập liệu cơ bản
```text
You are an expert Flutter developer.
Your task is to create the Profile Setup Form UI.
1. Build a responsive form taking input for Weight (kg/lbs toggle), Height (cm/feet toggle), Date of Birth, Gender, and Activity Level.
2. Ensure input validation on the text fields (numbers only, no negative values).
3. Do not implement API calls yet, just the clean UI with standard Flutter Material design.
```

## Bước 5: Frontend - State Management & Tích hợp API
```text
You are an expert Flutter developer.
Your task is to integrate the Profile Setup Form with the backend API.
1. Set up a state management class (using Provider or Riverpod) for the User Profile.
2. Implement an API service to POST data to `/api/v1/users/profile/bmi`.
3. Handle loading states and error states (show SnackBar on error).
4. Upon successful API response, navigate the user to the Result Screen and pass the calculated BMI data.
```

## Bước 6: Frontend - Giao diện Hiển thị Kết quả
```text
You are an expert Flutter developer.
Your task is to build a beautiful BMI Result Widget.
1. Display the BMI number prominently.
2. Color-code the result based on category (Green for Normal, Red for Obese, etc.).
3. Add a brief medical disclaimer text.
```
