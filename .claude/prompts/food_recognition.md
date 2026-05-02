# Prompt: Cụm Chức Năng Food Recognition (AI)

*Sử dụng lần lượt các prompt nguyên tử dưới đây để xây dựng hệ thống Nhận diện hình ảnh món ăn.*

## Bước 1: AI Service - Thiết lập FastAPI & PyTorch
```text
You are an expert AI/ML Python developer.
Your task is to set up a basic FastAPI service for image recognition.
1. Initialize a FastAPI app.
2. Create an endpoint `POST /predict-food` that accepts a `UploadFile`.
3. For now, create a mock PyTorch inference function that always returns {"foodName": "Chicken Breast", "confidence": 0.92}.
4. Return the result as JSON.
5. Add Swagger documentation.
```

## Bước 2: AI Service - Database Thành phần Dinh dưỡng
```text
You are an expert Python developer.
Your task is to enrich the prediction result with calorie data.
1. Create a local JSON database or dictionary containing basic macros (calories, protein, carbs, fat per 100g) for common foods (e.g., rice, chicken breast, beef, egg).
2. Update the `/predict-food` endpoint to append these macro details based on the predicted food name.
```

## Bước 3: Backend - Thiết kế Meal Entry & MongoDB
```text
You are an expert Spring Boot developer.
Your task is to create the backend storage for meals within a dedicated `meals` module.
1. Place all code in the `com.nutrition.meals` package.
2. Create a `MealEntry` entity: `id`, `userId`, `date`, `foodName`, `calories`, `protein`, `carbs`, `fat`, `imageUrl`, `isRecognized` (boolean).
3. Create the `MealEntryRepository` (package-private if possible).
4. Create a `MealInternalService` public interface to allow other modules (like Dashboard) to fetch meal statistics.
```

## Bước 4: Backend - API Upload & Gọi AI Proxy
```text
You are an expert Spring Boot developer.
Your task is to handle image uploads and communicate with the Python AI service within the `meals` module.
1. Create `POST /api/v1/meals/recognize` accepting a Multipart File.
2. Write a service to upload this image to a mock storage (or S3) and get an image URL.
3. Use Spring's `RestTemplate` or `WebClient` to forward the image to the FastAPI `POST /predict-food` endpoint.
4. Save the result as an unconfirmed `MealEntry` and return the data to the client.
```

## Bước 5: Frontend - Giao diện Chụp & Chọn Ảnh
```text
You are an expert Flutter developer.
Your task is to build the camera/image picker UI.
1. Integrate the `image_picker` package.
2. Build a screen allowing users to take a photo or pick from the gallery.
3. Add image compression (using `flutter_image_compress`) before storing the file locally.
```

## Bước 6: Frontend - Màn hình Xác nhận Món ăn
```text
You are an expert Flutter developer.
Your task is to build a UI to verify AI predictions.
1. Call the backend recognize API with the selected image and show a loading spinner.
2. Once the response arrives, show the predicted `foodName`, `calories`, and `confidence` score.
3. If confidence is high, show an "Approve" button.
4. Provide input fields for the user to manually edit the food name and calories if the AI is wrong.
```
