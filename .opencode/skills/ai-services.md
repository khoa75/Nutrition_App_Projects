# Skill: AI Services (Nutrition App)

Project-specific FastAPI & PyTorch patterns for food recognition.

## 1. Service Structure
```
ai-service/
├── app/
│   ├── main.py              # FastAPI entry point
│   ├── config.py            # Settings via pydantic-settings
│   ├── models/
│   │   └── food_recognizer.py  # PyTorch model wrapper
│   ├── schemas/
│   │   └── prediction.py    # Request/Response schemas
│   ├── services/
│   │   └── recognition.py   # Inference pipeline
│   └── utils/
│       └── image_processor.py  # Preprocessing transforms
├── models/                  # Trained .pt files
├── pyproject.toml           # uv-managed dependencies
└── Dockerfile
```

## 2. API Endpoints
| Endpoint | Method | Input | Output |
|----------|--------|-------|--------|
| `/api/v1/predict` | POST | image file (jpeg/png) | `List[{food_name, confidence, bbox}]` |
| `/api/v1/estimate` | POST | `List[{food_name, bbox}]` | `List[{food_name, weight_g, calories, macros}]` |
| `/api/v1/health` | GET | — | `{status: "ok", model_loaded: true}` |

## 3. Model Pipeline
```python
# 1) Load model once at startup (not per-request)
@app.on_event("startup")
async def load_model():
    model = torch.jit.load("models/food_resnet50.pt")
    model.eval()

# 2) Preprocessing: resize(224,224) → ToTensor() → normalize(ImageNet)
# 3) Inference with torch.no_grad()
# 4) Post-processing: softmax → confidence threshold > 0.85
# 5) Map class index to food name via lookup table
```

## 4. Integration with Spring Boot
- Spring Boot calls FastAPI via `RestClient` (synchronous fallback) or `WebClient` (async)
- Image sent as `multipart/form-data`
- Response cached on Spring Boot side for 5 minutes per image hash
- FastAPI listens on port 8000 (internal network only, not exposed publicly)

## 5. Performance Requirements
- Single image inference < 1.5 seconds (GPU) or < 4 seconds (CPU fallback)
- Batch processing disabled (meal tracking is per-image)
- Model accuracy ≥ 85% on validation set (top-3 accuracy)
- Use `uv` for dependency management: `uv sync` → `uv run uvicorn app.main:app --reload`

## 6. Food Recognition Constraints
- Minimum image size: 150x150 pixels (otherwise return "image_too_small")
- Supported formats: jpeg, png, webp
- Max file size: 10 MB
- Recognition categories: 100+ common Vietnamese & Western dishes
