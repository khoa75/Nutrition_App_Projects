# Step 4: Backend - Upload API

You are an expert Spring Boot developer.
Your task is to handle image uploads and communicate with the Python AI service within the `meals` module.

1. Create `POST /api/v1/meals/recognize` accepting a Multipart File.
2. Write a service to upload this image to a mock storage (or S3) and get an image URL.
3. Use Spring's `RestTemplate` or `WebClient` to forward the image to the FastAPI `POST /predict-food` endpoint.
4. Save the result as an unconfirmed `MealEntry` and return the data to the client.