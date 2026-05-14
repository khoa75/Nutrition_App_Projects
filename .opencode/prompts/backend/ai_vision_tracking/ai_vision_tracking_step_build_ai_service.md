# Prompt: Build Meal Tracking & AI Vision Module - Step 1: Build AI Vision Service (FastAPI)

## 1. Context & Constraints
- `.opencode/context/02-requirements/module_breakdown.md` (`meal_tracking` and `ai_vision_service` sections)
- `.opencode/skills/ai-services.md` (PyTorch, FastAPI)
- `.opencode/context/03-standards/rules.md` (AI Accuracy ≥ 85%, fast processing time)

## 2. Task: Build AI Vision Service (FastAPI)
1. **Write unit tests for the expected business logic before writing the actual source code (Test-First).**
2. Initialize the FastAPI service, using `uv` for management.
3. Load the PyTorch food recognition model (set to `eval()`, use `torch.no_grad()`).
4. Implement API `POST /predict`: Receives uploaded image files, standardizes/resizes them, and feeds them into the model.
5. Return a JSON result containing: `food_name`, `confidence_score` (ensure results < 80% are filtered out), and `estimated_calories`.

## 3. Acceptance Criteria
- AI Service has no memory leaks after multiple predictions.
- Communication between Spring Boot and FastAPI is seamless, with appropriate timeout handling.
- All recognition logic achieves stable real-world response times.
