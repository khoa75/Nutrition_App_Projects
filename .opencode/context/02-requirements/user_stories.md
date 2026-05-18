# User Stories

Extracted from the [PRD.md](../../PRD.md) document.

## For End Users:

**US-1: Create an account for regular users**
- **Role:** New user
- **Goal:** Securely and conveniently register a system account
- **Acceptance Criteria:**
  - Can register with Email/Password or Phone number (requires OTP verification).
  - Can register quickly via social accounts (Google, Facebook, Apple).
  - Passwords must meet security standards (minimum 8 characters, including uppercase, lowercase, numbers, and special characters).
  - Mandatory agreement to Terms of Use and Privacy Policy before completion.

**US-1.1: System Login**
- **Role:** Regular user with an existing account
- **Goal:** Securely access personal account
- **Acceptance Criteria:**
  - Can login with Email/Password or Phone number/OTP.
  - Supports quick login via linked social accounts (Google, Facebook, Apple).
  - Supports "Remember me" functionality.
  - Temporary account lockout (e.g., 15 minutes) after 5 consecutive incorrect password attempts.
  - Option to logout from current device or all devices.

**US-1.2: Initial Health Information Entry**
- **Role:** New user (after successful registration)
- **Goal:** Provide detailed health metrics for personalized calorie targets
- **Acceptance Criteria:**
  - Enter personal information: Full name, Email, Gender, Date of Birth, Height, Weight, Activity Level.
  - Enter fitness goals: Goal (Lose, Maintain, Gain), Target Weight, Desired Weight Loss Rate.
  - System calculates and displays current BMI and recommended daily Calorie target immediately after entry.
  - Data is securely stored.

**US-2: Receive personalized nutrition plans**
- **Role:** User with an account
- **Goal:** Receive a daily eating plan suitable for their weight goals
- **Acceptance Criteria:**
  - Plan is created based on BMI and total daily calorie targets.
  - Can choose timeframe (day/week/month).
  - Can replace suggested dishes with alternatives to meet the daily calorie target.

**US-3: Food and Ingredient Search & Portion Customization**
- **Role:** User
- **Goal:** Search for Vietnamese foods and customize portion sizes to track accurate calorie intake
- **Acceptance Criteria:**
  - Can search the database by food name or keywords (e.g., Phở bò, Cơm tấm).
  - System displays Calories, Protein, Carbohydrates, Fat, and an illustrative image for the selected food.
  - Can customize portion size (e.g., 100g, 200g, or custom).
  - System automatically recalculates nutritional values based on the custom portion size.

**US-4: Log Daily Meals**
- **Role:** User
- **Goal:** Keep a daily record of consumed foods to track calorie intake
- **Acceptance Criteria:**
  - Can add searched foods/ingredients to daily meal logs.
  - System automatically calculates the total consumed calories for the day.
  - Can view meal eating history and food search history.

**US-5: View Progress Dashboard**
- **Role:** User
- **Goal:** Track weight trends and calorie consumption through visual charts
- **Acceptance Criteria:**
  - Dashboard visually compares actual consumed calories against recommended daily calorie targets based on BMI and goals.
  - Displays data visualization charts (by week, by month).
  - Charts show daily calories, calorie differences, and progress towards weight targets.

**US-6: Daily Weight Updates**
- **Role:** User
- **Goal:** Record weight changes to trigger target recalculations
- **Acceptance Criteria:**
  - Can update current weight over time.
  - System automatically recalculates BMI and daily calorie targets based on the new weight.
  - Weight trends are reflected on the progress dashboard.

## For Admins:

**US-7: View and filter user list**
- **Role:** Admin
- **Goal:** View and search all registered users in the system
- **Acceptance Criteria:**
  - Displays a comprehensive list with: Name, Email, Gender, Age, Account Status, Weight Goal.
  - Advanced search by name or email.
  - Can filter users by active status or weight goals.

**US-8: Manage user accounts**
- **Role:** Admin
- **Goal:** Create, edit, and control access for user accounts
- **Acceptance Criteria:**
  - Can manually create new accounts.
  - Can edit users' personal information.
  - Can lock/unlock user accounts.
  - Can track user activity history to detect anomalies.

**US-9: Manage Food Database**
- **Role:** Admin
- **Goal:** Curate and maintain a comprehensive database of Vietnamese dishes and ingredients
- **Acceptance Criteria:**
  - Can perform CRUD operations for food items: Name, Type (Soup, Fried, Grilled, Vegetarian, Snack, Drink), Ingredients, Calories, Macros (Protein, Carbs, Fat).
  - Can upload and update food images via Cloud Storage integration.
  - Can use advanced search and filtering (by name, calories, type) to find specific foods.

**US-10: Food Data Quality Control**
- **Role:** Admin
- **Goal:** Ensure the nutritional database is accurate and highly reliable
- **Acceptance Criteria:**
  - Can run duplicate checking tools to identify redundant food entries.
  - Can review and moderate food data before publishing it to end users.
