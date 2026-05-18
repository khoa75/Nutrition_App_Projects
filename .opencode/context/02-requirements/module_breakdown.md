# Functional Decomposition & Execution Roadmap

Based on the User Stories and the **Modular Monolith** (Package-by-Feature) architectural direction, the following is the decomposition of the system into atomic functional modules and a detailed implementation roadmap.

---

## 1. Functional Module Decomposition (Atomic Modules)

The Backend system (Spring Boot) will be divided into independent packages by feature.

### 📦 Module `auth` (Authentication & Authorization)
- `register_account`: Register an account (via Email/Password or Phone/OTP, supporting Social Login).
  - **Input:** `email`/`phone_number`/`social_token`, `password`, `otp`.
  - **Output:** `user_id`, `message` (Success/Failure).
- `authenticate_user`: Login (Email, Phone, or Social) and issue JWT Tokens. Supports "Remember me" and failed password limits.
  - **Input:** `email`/`phone_number`/`social_token`, `password`/`otp`, `remember_me`.
  - **Output:** `jwt_token`, `refresh_token`, `user_info`.
- `logout_user`: Logout from the current device or all devices.
  - **Input:** `user_id`, `device_id`.
  - **Output:** `message`.

### 📦 Module `user_profile` (Health Profile & Metrics)
- `update_personal_info`: Update basic information and fitness goals.
  - **Input:** `user_id`, `full_name`, `gender`, `dob`, `height`, `weight`, `activity_level`, `goal_type`, `target_weight`, `desired_weight_loss_rate`.
  - **Output:** `updated_profile_data`, `message`.
- `calculate_metrics`: Calculate BMI and Recommended Daily Calorie Target based on current profile.
  - **Input:** `weight`, `height`, `age`, `gender`, `activity_level`, `goal_type`, `desired_weight_loss_rate`.
  - **Output:** `bmi`, `bmi_category`, `daily_calorie_target`.
- `log_daily_weight`: Record daily weight updates.
  - **Input:** `user_id`, `weight_value`, `date`.
  - **Output:** `log_id`, `updated_current_weight`.

### 📦 Module `food_catalog` (Food Dictionary & Data)
- `search_foods`: Search for Vietnamese food items in the database.
  - **Input:** `search_query`, `limit`, `offset`.
  - **Output:** `List<{food_id, food_name, type, calories, macros, image_url}>`.
- `get_food_details`: Get detailed nutritional components for a specific portion.
  - **Input:** `food_id`, `portion_size_grams`.
  - **Output:** `food_details` (calories, protein, carbs, fat based on portion).

### 📦 Module `nutrition_plan` (Nutritional Roadmap)
- `generate_meal_plan`: Generate eating plan based on target calories.
  - **Input:** `user_id`, `target_calories`.
  - **Output:** `List<{meal_type, List<food_items>}>`, `total_planned_calories`.
- `replace_food_item`: Suggest replacement food items with equivalent calories.
  - **Input:** `food_id_to_replace`, `target_calories_range`.
  - **Output:** `List<{food_id, food_name, calories}>`.

### 📦 Module `meal_tracking` (Meal Logging)
- `log_meal`: Store consumed meal information.
  - **Input:** `user_id`, `meal_type` (Breakfast/Lunch/Dinner/Snack), `List<{food_id, quantity_grams}>`, `date`.
  - **Output:** `meal_log_id`, `total_calories_added`.
- `get_daily_intake`: Calculate total calories consumed during the day.
  - **Input:** `user_id`, `date`.
  - **Output:** `total_consumed_calories`.

### 📦 Module `dashboard` (Statistics & Visualization)
- `get_daily_summary`: Summarize daily metrics (Target Calories, Consumed Calories, Remaining Calories).
  - **Input:** `user_id`, `date`.
  - **Output:** `target_calories`, `consumed_calories`, `remaining_calories`, `goal_progress_percent`.
- `get_progress_charts`: Extract time-series data for weight and calorie charts (weekly/monthly).
  - **Input:** `user_id`, `chart_type`, `time_range`.
  - **Output:** `List<{date, value, target_value}>`.

### 📦 Module `admin` (Administration & Food Management)
- `get_users_list`: Retrieve user list (pagination, filtering, searching).
  - **Input:** `admin_token`, `search_keyword`, `filter_status`, `page`, `limit`.
  - **Output:** `total_users`, `List<{user_id, name, email, status, goal}>`.
- `manage_user_status`: Lock, unlock, or edit account permissions.
  - **Input:** `admin_token`, `target_user_id`, `action`.
  - **Output:** `success_status`, `message`.
- `manage_food_catalog`: Create, update, or moderate food entries.
  - **Input:** `admin_token`, `food_details` (name, type, calories, macros), `image_file`.
  - **Output:** `food_id`, `status`.
- `get_audit_logs`: Retrieve system operation history.
  - **Input:** `admin_token`, `date_range`.
  - **Output:** `List<{timestamp, action_type, description}>`.

---

## 2. Execution Roadmap

The roadmap is arranged by priority from the core foundation to advanced features, ensuring each Phase has a shippable software version.

### 🟢 Phase 1: Core Foundation & MVP (Building the Foundation)
*Goal: Ensure users can create accounts, set metrics, and use the application at a basic level.*
- **Sprint 1.1:** Project initialization (Spring Boot, React-Native, PostgreSQL). Build `auth` and `user_profile` modules (US-1, US-1.1, US-1.2).
- **Sprint 1.2:** Build `food_catalog` module (search) and `meal_tracking` for manual portion logging (US-3, US-4).
- **Sprint 1.3:** Build `user_profile` (weight update part US-6) and `dashboard` module displaying basic statistics (US-5).

### 🟡 Phase 2: Enhanced Tracking & Personalization (Core App Value)
*Goal: Automate nutritional roadmaps and provide smart planning.*
- **Sprint 2.1:** Expand `food_catalog` with dynamic portion calculation logic (US-3).
- **Sprint 2.2:** Build `nutrition_plan` module - meal suggestion algorithm and food replacement function based on calorie targets (US-2).
- **Sprint 2.3:** Enhance `dashboard` with detailed weekly/monthly chart data and visualization.

### 🟠 Phase 3: Analytics & Admin Scale (Refinement & Administration)
*Goal: Build management tools for Admins to manage users and the food database.*
- **Sprint 3.1:** Build `admin` module for User Management (US-7, US-8). Integrate with React Dashboard.
- **Sprint 3.2:** Build `admin` module for Food Database Management (CRUD, Cloud Storage image uploads) (US-9).
- **Sprint 3.3:** Implement Food Data Quality Control (duplicate checks) and complete Audit Logging (US-10).

### 🔴 Phase 4: Polish & Advanced (Future Options)
- Caching optimization (Redis) for fast food catalog search.
- Integrate notifications for meal reminders/weight updates.
- Connect data with health tracking APIs.
