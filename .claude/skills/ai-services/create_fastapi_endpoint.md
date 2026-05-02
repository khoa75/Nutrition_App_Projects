# Skill: Create AI FastAPI Endpoint

## Context
This skill guides the creation of a new Python AI service endpoint using PyTorch and FastAPI, typically for image recognition or nutritional analysis.

## Prerequisites
- Framework: FastAPI + PyTorch.
- Location: `ai-service/app/`.

## Steps

1. **Load the PyTorch Model:**
   - Ensure the trained `.pt` or `.pth` model is in `ai-service/app/models/`.
   - Write a utility in `ai-service/app/core/` or `services/` to load the model into memory upon startup to prevent loading it per-request.

2. **Create Data Schemas:**
   - Define Pydantic models in `ai-service/app/schemas.py` for Request and Response validation.
   - For images, handle `UploadFile` or base64 strings.

3. **Implement Inference Logic:**
   - In `ai-service/app/services/inference_service.py`, write the function that takes the image tensor, passes it to the PyTorch model, and interprets the output (e.g., mapping class IDs to food names and calorie values).

4. **Create the Route:**
   - In `ai-service/app/api/routes/`, define the FastAPI `@router.post()` endpoint.
   - Call the inference service.
   - Handle exceptions (e.g., image not clear, format not supported) and return appropriate HTTP status codes (e.g., 400, 422).

5. **Testing:**
   - Add a test case in `ai-service/tests/` using `TestClient`.
