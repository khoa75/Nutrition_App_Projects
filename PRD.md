# PRODUCT REQUIREMENTS DOCUMENT (PRD)
## Nutrition App - Health & Diet Management System

## 1. Overview

**Project Name:** Nutrition App

**Description:** Nutrition App is a comprehensive health management application that helps users manage their diet and track weight progress through BMI calculation, and calorie analysis. The app provides personalized nutritional recommendations based on weight goals and individual health status.

**Main Objectives:**
- Help users track and manage their daily diet.
- Provide personalized nutritional recommendations based on BMI and weight goals.
- Support users in achieving their health goals efficiently.
- Provide administrators with tools to manage users and curate a high-quality nutritional database.

---

## 2. Core Features

### 2.1 User Account & Profile Management
- Store detailed health profiles: Full name, Email, Gender, Date of Birth, Height, Weight, Activity Level, Goals (Lose, Maintain, Gain), Target Weight, Desired Weight Loss Rate.
- Allows users to log and update their weight over time, triggering automatic recalculation of BMI and calorie targets.
- Track histories: eating activity, food/nutrition search history.
- View statistics of consumed calories versus target calories over time.

### 2.2 Dashboard and Progress Tracking
- A visual dashboard for monitoring diet and calorie intake.
- Update daily weight and log daily meals to calculate total consumed calories.
- Automatic comparison of actual consumed calories against recommended targets based on BMI, activity level, and weight goals.
- Data visualization via charts (by week, by month) showing daily calories, calorie differences, and weight targets.

### 2.3 Food and Ingredient Nutrition Search
- Search functionality for Vietnamese foods and raw ingredients by name or keywords (e.g., Phở bò, Cơm tấm).
- Display nutritional information: Calories, Protein, Carbohydrates, Fat, and an illustrative image.
- Portion customization (e.g., 100g, 200g) with automatic recalculation of nutritional values.

### 2.4 Nutrition Recommendation Roadmap
- Personalized meal plans based on BMI and weight goals with dish replacement suggestions.

### 2.5 Admin - User Management
- View list of registered users with details (Name, Email, Gender, Age, Account Status, Weight Goal).
- Administrative actions: Create new accounts, edit personal info, lock/unlock accounts.
- Advanced search (by name/email) and filtering (by active status, weight goals).

### 2.6 Admin - Food Data Management
- Manage a comprehensive database of Vietnamese dishes and ingredients.
- CRUD operations for food items: Name, Type (Soup, Fried, Grilled, Vegetarian, Snack, Drink), Ingredients, Calories, Macros (Protein, Carbs, Fat), Image.
- Cloud Storage integration for food image hosting.
- Advanced search and filtering (by name, calories, type).
- Data quality tools: duplicate checking and data moderation before publishing to users.

---

## 3. Business Context

### 3.1 User Account System
**Business Process:**
- Upon registration, users provide comprehensive health metrics and specific goals (e.g., weight loss rate) to tailor the experience.
- Ongoing profile updates (like current weight) ensure that targets and recommendations adapt dynamically.

### 3.2 Dashboard & Tracking
**Business Process:**
- Acts as the primary interface for daily user engagement.
- Empowers users with visual feedback on their progress, encouraging adherence to their dietary goals.

### 3.3 Food Search & Nutrition Verification
**Data Input Methods:**
- Users can manually search for precise ingredient logging, adjusting portion sizes to get accurate calorie calculations, vital for strict dietary tracking.

### 3.4 Data & User Administration
**Business Process:**
- System managers maintain the integrity of the community and the database.
- Curating food data with specific types and accurate calories ensures high reliability for end users.

---

## 4. Success Metrics

### User Metrics:
1. **Engagement:** DAU/MAU ratios, feature usage frequency.
2. **Behavior:** Average logs per day, plan completion rate.
3. **Outcomes:** Achievement of weight goals within 3-6 months.

### System Metrics (Detailed in SRS):
1. **Performance:** API response time < 2 seconds.
2. **Availability:** System uptime ≥ 99.5%.

---

## 5. Development Roadmap

### Phase 1: MVP
- Core BMI, Dashboard, Manual Entry (Search), and User Profile Management.
- Admin Panel for User and Food Data Management.

### Phase 2: Enhancement
- Personalized Roadmap features.

### Phase 3: Scaling
- Advanced infrastructure scaling and automated moderation tools.

### Phase 4: Advanced Features
- Integration with external devices and social features.

---

## 6. System Users
- **End User**: Health-conscious individuals tracking diet and weight.
- **Admin**: System managers, data moderators, and support staff.

---

## 7. User Stories
*(Refer to [user_stories.md](user_stories.md) for the full list)*

---

## 8. Technical Specifications
Detailed technical requirements, performance metrics, and security constraints are documented in the **[SRS.md](SRS.md)** file.
