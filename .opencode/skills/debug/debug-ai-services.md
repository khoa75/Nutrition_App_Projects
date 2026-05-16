---
name: debug-ai-services
description: FastAPI + PyTorch AI service debugging patterns, common issues, and resolution workflows
license: Apache-2.0
compatibility: opencode
---

## 1. Debug Workflow

```
1. Reproduce with test image via curl or Swagger UI
2. Check FastAPI logs for exceptions
3. Inspect model loading and inference pipeline
4. Validate image preprocessing steps
5. Check memory usage (GPU/CPU)
6. Write a failing test, fix, verify
```

## 2. Common Issues & Solutions

### Service Won't Start
```bash
# Check uv environment
uv sync
uv run uvicorn app.main:app --reload --log-level debug

# Common startup failures:
# - Model file not found: Check models/ directory
# - PyTorch not installed: uv add torch torchvision
# - Port already in use: lsof -i :8000

# Debug model loading
import logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup():
    logger.info("Loading model...")
    try:
        app.state.model = load_model("models/food_classifier.pt")
        logger.info("Model loaded successfully")
    except Exception as e:
        logger.error(f"Model loading failed: {e}")
        raise
```

### Model Inference Errors
```python
# ❌ WRONG: No error handling in inference
@app.post("/api/v1/recognize-food")
async def recognize_food(image: UploadFile):
    result = model.predict(image)  # Can fail silently
    return result

# ✅ CORRECT: Comprehensive error handling
@app.post("/api/v1/recognize-food")
async def recognize_food(image: UploadFile):
    try:
        # Validate image
        validated = await validate_image(image)
        processed = preprocess_image(validated)

        # Run inference with timeout
        with torch.no_grad():
            output = model(processed)

        # Post-process results
        results = post_process(output)

        return {"success": True, "items": results}
    except ValueError as e:
        logger.error(f"Invalid image: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except RuntimeError as e:
        logger.error(f"Model error: {e}")
        raise HTTPException(status_code=500, detail="Model inference failed")
```

### Image Preprocessing Issues
```python
# Debug preprocessing pipeline
def preprocess_image(image: Image.Image) -> torch.Tensor:
    logger.debug(f"Input image: {image.size}, mode={image.mode}")

    # Resize
    image = image.resize((224, 224))
    logger.debug(f"Resized to: {image.size}")

    # Convert to RGB
    if image.mode != 'RGB':
        image = image.convert('RGB')
        logger.debug("Converted to RGB")

    # Normalize
    image_array = np.array(image) / 255.0
    image_tensor = torch.FloatTensor(image_array).permute(2, 0, 1)

    normalize = transforms.Normalize(
        mean=[0.485, 0.456, 0.406],
        std=[0.229, 0.224, 0.225]
    )
    result = normalize(image_tensor)

    logger.debug(f"Output tensor shape: {result.shape}")
    return result
```

### Memory Issues (GPU/CPU)
```python
# Monitor memory usage
import psutil
import torch

def log_memory():
    process = psutil.Process()
    logger.info(f"CPU memory: {process.memory_info().rss / 1024**2:.1f} MB")

    if torch.cuda.is_available():
        logger.info(f"GPU memory allocated: {torch.cuda.memory_allocated() / 1024**2:.1f} MB")
        logger.info(f"GPU memory cached: {torch.cuda.memory_reserved() / 1024**2:.1f} MB")

# Clear GPU memory after inference
def clear_memory():
    if torch.cuda.is_available():
        torch.cuda.empty_cache()
        torch.cuda.reset_peak_memory_stats()

# Common memory issues:
# - Model not moved to correct device: model.to(device)
# - Gradients stored during inference: Use torch.no_grad()
# - Batch too large: Reduce batch_size
# - Memory leak: Clear cache after each request
```

## 3. FastAPI Debug Logging

```python
import logging

logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)

# Enable request/response logging
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"[Request] {request.method} {request.url.path}")
    response = await call_next(request)
    logger.info(f"[Response] {response.status_code}")
    return response
```

## 4. Swagger UI Debugging

```python
# Access Swagger UI at http://localhost:8000/docs
# Access ReDoc at http://localhost:8000/redoc

# Test endpoints directly in browser:
# 1. Open /docs
# 2. Click on endpoint
# 3. Click "Try it out"
# 4. Upload test image
# 5. Execute and check response

# Common Swagger issues:
# - Endpoint not showing: Check @app decorator
# - Schema wrong: Check Pydantic model
# - File upload not working: Use UploadFile type
```

## 5. Debugging PyTorch Models

```python
# Model loading debug
def load_model(path: str):
    logger.info(f"Loading model from {path}")

    if not os.path.exists(path):
        raise FileNotFoundError(f"Model file not found: {path}")

    model = FoodClassifier()
    checkpoint = torch.load(path, map_location='cpu')
    model.load_state_dict(checkpoint['model_state_dict'])
    model.eval()

    logger.info(f"Model loaded: {model.__class__.__name__}")
    logger.info(f"Model parameters: {sum(p.numel() for p in model.parameters()):,}")

    return model

# Inference debug
def debug_inference(model, input_tensor):
    logger.debug(f"Input tensor shape: {input_tensor.shape}")
    logger.debug(f"Input tensor range: [{input_tensor.min():.3f}, {input_tensor.max():.3f}]")

    with torch.no_grad():
        output = model(input_tensor)

    logger.debug(f"Output shape: {output.shape}")
    logger.debug(f"Output values: {output[0][:5]}")  # First 5 values

    probabilities = torch.softmax(output, dim=1)
    confidence, predicted = torch.max(probabilities, 1)

    logger.debug(f"Predicted class: {predicted.item()}")
    logger.debug(f"Confidence: {confidence.item():.4f}")

    return output
```

## 6. Debugging Calorie Estimation

```python
def estimate_calories(food_items: List[FoodItem]) -> CalorieEstimation:
    logger.info(f"Estimating calories for {len(food_items)} items")

    for item in food_items:
        logger.debug(f"Food: {item.food_name}, bbox: {item.bounding_box}")

        # Estimate portion size from bounding box
        area = (item.bounding_box[2] - item.bounding_box[0]) * \
               (item.bounding_box[3] - item.bounding_box[1])
        logger.debug(f"Bounding box area: {area}")

        # Look up nutritional data
        nutrition = nutrition_db.get(item.food_name)
        if not nutrition:
            logger.warning(f"No nutrition data for: {item.food_name}")
            continue

        # Calculate calories
        weight_grams = estimate_weight(area, item.food_name)
        calories = nutrition.calories_per_100g * (weight_grams / 100)

        logger.debug(f"Estimated weight: {weight_grams}g, calories: {calories:.1f}")

    return total_estimation
```

## 7. Performance Debugging

```python
import time

@app.post("/api/v1/recognize-food")
async def recognize_food(image: UploadFile):
    start = time.time()

    # Preprocessing
    preprocess_start = time.time()
    processed = preprocess_image(await image.read())
    preprocess_time = time.time() - preprocess_start
    logger.info(f"Preprocessing: {preprocess_time:.3f}s")

    # Inference
    inference_start = time.time()
    output = model(processed)
    inference_time = time.time() - inference_start
    logger.info(f"Inference: {inference_time:.3f}s")

    # Post-processing
    postprocess_start = time.time()
    results = post_process(output)
    postprocess_time = time.time() - postprocess_start
    logger.info(f"Post-processing: {postprocess_time:.3f}s")

    total_time = time.time() - start
    logger.info(f"Total time: {total_time:.3f}s")

    if total_time > 2.0:
        logger.warning(f"SLA breach: {total_time:.3f}s > 2.0s")

    return {"success": True, "items": results, "processing_time": total_time}
```

## 8. Quick Debug Checklist

- [ ] Model file exists and loads correctly
- [ ] Image preprocessing produces correct tensor shape
- [ ] Inference runs within 2 seconds
- [ ] GPU memory cleared after inference (if using GPU)
- [ ] Error responses are structured and informative
- [ ] Swagger UI shows all endpoints
- [ ] Request/response logging enabled
- [ ] Nutrition database accessible
- [ ] Concurrent requests handled without errors
