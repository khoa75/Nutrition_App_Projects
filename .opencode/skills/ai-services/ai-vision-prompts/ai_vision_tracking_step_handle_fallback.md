# Prompt: Build Meal Tracking & AI Vision Module - Step 3: Handle Fallback

## 1. Context & Constraints
- `.opencode/context/module_breakdown.md` (`meal_tracking` and `ai_vision_service` sections)
- `.opencode/skills/ai-services.md` (PyTorch, FastAPI)
- `.opencode/context/rules.md` (AI Accuracy ≥ 85%, fast processing time)

## 2. Task: Handle Fallback
1. If FastAPI returns an error or the confidence score is too low, return an appropriate error code to the Frontend.
2. (Optional) Implement an API allowing users to manually enter food items (Manual Entry Fallback).

## 3. Acceptance Criteria
- AI Service has no memory leaks after multiple predictions.
- Communication between Spring Boot and FastAPI is seamless, with appropriate timeout handling.
- All recognition logic achieves stable real-world response times.
