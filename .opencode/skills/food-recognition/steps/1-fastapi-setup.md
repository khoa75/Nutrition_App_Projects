# Step 1: AI Service - FastAPI Setup

You are an expert AI/ML Python developer.
Your task is to set up a basic FastAPI service for image recognition.

1. Initialize a FastAPI app.
2. Create an endpoint `POST /predict-food` that accepts a `UploadFile`.
3. For now, create a mock PyTorch inference function that always returns {"foodName": "Chicken Breast", "confidence": 0.92}.
4. Return the result as JSON.
5. Add Swagger documentation.