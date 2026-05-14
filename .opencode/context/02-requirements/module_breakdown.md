# Functional Decomposition & Execution Roadmap

Based on the User Stories and the **Modular Monolith** (Package-by-Feature) architectural direction, the following is the decomposition of the system into atomic functional modules and a detailed implementation roadmap.

---

## 1. Functional Module Decomposition (Atomic Modules)

The Backend system (Spring Boot) will be divided into independent packages by feature. The AI Service is separated using FastAPI.

### 📦 Module `auth` (Authentication & Authorization)
- `register_account`: Register an account (via Email/Password or Phone/OTP, supporting Social Login).
  - **Input:** `email`/`phone_number`/`social_token`, `password` (if applicable), `otp` (if using Phone).
  - **Output:** `user_id`, `message` (Success/Failure).
- `authenticate_user`: Login (Email, Phone, or Social) and issue JWT Tokens. Supports "Remember me" and failed password attempt limits.
  - **Input:** `email`/`phone_number`/`social_token`, `password`/`otp`, `remember_me` (boolean).
  - **Output:** `jwt_token`, `refresh_token`, `user_info`.
- `logout_user`: Logout from the current device or all devices.
  - **Input:** `user_id`, `device_id` (or `all_devices` flag).
  - **Output:** `message`.
- `reset_password`: Handle forgotten passwords via email or SMS OTP.
  - **Input:** `email` or `phone_number`.
  - **Output:** `reset_token` (sent via email/SMS), `message`.

### 📦 Module `user_profile` (Health Profile & Metrics)
- `update_personal_info`: Update basic information (name, age, gender).
  - **Input:** `user_id`, `full_name`, `dob`, `gender`, `activity_level`, `goal_type`, `target_weight`.
  - **Output:** `updated_profile_data`, `message`.
- `calculate_metrics`: Calculate atomic health metrics (BMI, BMR, TDEE) based on standard formulas.
  - **Input:** `weight`, `height`, `age`, `gender`, `activity_level`.
  - **Output:** `bmi`, `bmr`, `tdee`, `bmi_category` (Underweight/Normal/Overweight/Obese).
- `log_daily_weight`: Record daily weight updates.
  - **Input:** `user_id`, `weight_value`, `date`.
  - **Output:** `log_id`, `updated_current_weight`.
- `get_weight_history`: Retrieve weight change history over a period of time.
  - **Input:** `user_id`, `start_date`, `end_date`.
  - **Output:** `List<{date, weight_value}>`, `trend` (Increase/Decrease).

### 📦 Module `food_catalog` (Food Dictionary & Data)
- `search_foods`: Search for food items in the database (for manual entry).
  - **Input:** `search_query` (keyword), `limit`, `offset`.
  - **Output:** `List<{food_id, food_name, calories_per_100g, thumbnail}>`.
- `get_food_macros`: Get detailed nutritional components (Calories, Protein, Carbs, Fat) of a specific item.
  - **Input:** `food_id`.
  - **Output:** `food_details` (calories, protein, carbs, fat, serving_size).

### 📦 Module `nutrition_plan` (Nutritional Roadmap)
- `generate_meal_plan`: Automatic meal plan generation engine based on TDEE and goals (Weight Gain/Loss).
  - **Input:** `user_id`, `target_calories`, `diet_preference` (e.g., Keto, Vegan).
  - **Output:** `List<{meal_type, List<food_items>}>`, `total_planned_calories`.
- `get_daily_plan`: Retrieve the eating plan for the current day.
  - **Input:** `user_id`, `date`.
  - **Output:** `daily_plan` (Breakfast, Lunch, Dinner, Snacks), `status`.
- `replace_food_item`: Search and suggest replacement food items with equivalent calories/macros.
  - **Input:** `food_id_to_replace`, `target_calories_range`.
  - **Output:** `List<{food_id, food_name, macros}>` (Suggested replacement items).

### 📦 Module `meal_tracking` (Meal Logging)
- `log_meal_manual`: Store manually entered meal information.
  - **Input:** `user_id`, `meal_type` (Breakfast/Lunch/Dinner), `List<{food_id, quantity}>`, `date`.
  - **Output:** `meal_log_id`, `total_calories_added`.
- `process_vision_meal`: Receive images from the user, call `ai_vision_service`, and save food results.
  - **Input:** `user_id`, `image_file`, `meal_type`, `date`.
  - **Output:** `meal_log_id`, `recognized_items`, `estimated_calories`.
- `get_daily_intake`: Calculate total calories and macros consumed during the day.
  - **Input:** `user_id`, `date`.
  - **Output:** `total_consumed_calories`, `total_protein`, `total_carbs`, `total_fat`.

### 📦 Module `dashboard` (Statistics & Visualization)
- `get_daily_summary`: Summarize daily metrics (Target Calories, Consumed Calories, Remaining Calories).
  - **Input:** `user_id`, `date`.
  - **Output:** `target_calories`, `consumed_calories`, `remaining_calories`, `goal_progress_percent`.
- `get_progress_charts`: Extract time-series data for weight and calorie charts (daily/weekly/monthly).
  - **Input:** `user_id`, `chart_type` (weight/calories), `time_range` (week/month).
  - **Output:** `List<{date, value, target_value}>` (Data for drawing charts).

### 📦 Module `admin` (Administration & Monitoring)
- `get_users_list`: Retrieve user list (supporting pagination, filtering, searching).
  - **Input:** `admin_token`, `search_keyword`, `filter_status`, `page`, `limit`.
  - **Output:** `total_users`, `List<{user_id, name, email, status, goal}>`.
- `manage_user_status`: Lock, unlock, or edit account permissions.
  - **Input:** `admin_token`, `target_user_id`, `action` (lock/unlock/update_role).
  - **Output:** `success_status`, `message`.
- `get_audit_logs`: Retrieve user system operation history (Login, Profile changes, Weight updates).
  - **Input:** `admin_token`, `target_user_id` (optional), `date_range`.
  - **Output:** `List<{timestamp, action_type, description, ip_address}>`.

### 🤖 External Service: `ai_vision_service` (FastAPI)
- `predict_food_image`: Takes an image as input, runs a PyTorch model to recognize food.
  - **Input:** `image_file` (jpeg/png).
  - **Output:** `List<{food_name, confidence_score, bounding_box}>`.
- `estimate_calories`: Estimate portions and return a list of ingredients with calories.
  - **Input:** `List<{food_name, bounding_box}>` (to calculate volume).
  - **Output:** `List<{food_name, estimated_weight_grams, calories, macros}>`, `total_estimated_calories`.

---

## 2. Execution Roadmap

The roadmap is arranged by priority from the core foundation to advanced features, ensuring each Phase has a shippable software version.

### 🟢 Phase 1: Core Foundation & MVP (Building the Foundation)
*Goal: Ensure users can create accounts, set metrics, and use the application at a basic level (manual entry).*
- **Sprint 1.1:** Project initialization (Spring Boot, Flutter, MongoDB). Build `auth` and `user_profile` modules (US-1).
- **Sprint 1.2:** Build `food_catalog` module (food database) and `meal_tracking` for manual entry (US-6).
- **Sprint 1.3:** Build `user_profile` (weight update part US-5) and `dashboard` module displaying basic statistics (US-4).

### 🟡 Phase 2: AI Integration & Smart Planning (Core App Value)
*Goal: Integrate image recognition technology and automate nutritional roadmaps.*
- **Sprint 2.1:** Initialize FastAPI service. Build `predict_food_image` endpoint (US-3).
- **Sprint 2.2:** Integrate `meal_tracking` module (Spring Boot) with `ai_vision_service` to complete the photo-to-log workflow (US-3).
- **Sprint 2.3:** Build `nutrition_plan` module - meal suggestion algorithm and food replacement function (US-2).

### 🟠 Phase 3: Analytics & Admin Scale (Refinement & Administration)
*Goal: Build management tools for Admins and upgrade charts for End-Users.*
- **Sprint 3.1:** Upgrade `dashboard` module with APIs for detailed weekly/monthly chart data export (US-4).
- **Sprint 3.2:** Build `admin` module (US-7, US-8). Integrate with React Dashboard for Admins.
- **Sprint 3.3:** Complete Audit Logging feature in the `admin` module (US-9) and perform Database Index optimization (preparing for scale).

### 🔴 Phase 4: Polish & Advanced (Future Options)
- Caching optimization (Redis) for rankings or food catalog.
- Integrate notifications for meal reminders/weight updates.
- Connect data with HealthKit/Google Fit.
