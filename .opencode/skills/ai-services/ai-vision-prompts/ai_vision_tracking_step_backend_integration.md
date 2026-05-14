# Prompt: Build Meal Tracking & AI Vision Module - Step 2: Integration from Spring Boot Backend

## 1. Context & Constraints
- `.opencode/context/02-requirements/module_breakdown.md` (`meal_tracking` and `ai_vision_service` sections)
- `.opencode/skills/ai-services.md` (PyTorch, FastAPI)
- `.opencode/context/03-standards/rules.md` (AI Accuracy ≥ 85%, fast processing time)

## 2. Task: Integration from Spring Boot Backend
1. In the `com.nutrition.mealtracking` package, implement API `POST /api/meals/upload`.
2. Controller receives images from the Mobile device, saves them temporarily to Cloudinary/S3, or sends the stream directly to the FastAPI Service via an HTTP Client (WebClient / RestTemplate).
3. Receive results from FastAPI and save them to the `meal_logs` collection in MongoDB with the `user_id` and current `date`.

## 3. Acceptance Criteria
- AI Service has no memory leaks after multiple predictions.
- Communication between Spring Boot and FastAPI is seamless, with appropriate timeout handling.
- All recognition logic achieves stable real-world response times.
