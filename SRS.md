# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
## Nutrition App - Health & Diet Management System

## 1. Introduction
### 1.1 Purpose
The purpose of this document is to provide a detailed description of the software requirements for the Nutrition App. It will illustrate the functional and non-functional requirements of the system.

### 1.2 Scope
This system is a health management platform comprising a mobile application (React-Native), a backend service (Spring Boot), and an admin dashboard (React).

---

## 2. Overall Description
### 2.1 Product Perspective
The system consists of:
- **Mobile App**: User interface for diet tracking and health monitoring (React-Native).
- **Admin Dashboard**: Web interface for system management.
- **Backend API**: Core business logic and data persistence (PostgreSQL).

### 2.2 Functional Requirements

#### 2.2.1 Authentication & Profile Management
- **Registration**: Email/Password, OTP-based Phone, or Social Login (Google, Facebook, Apple).
- **Login**: Secure login with JWT, "Remember me", and account lockout after 5 failed attempts.
- **Profile**: CRUD operations for user profiles. Fields include: Full name, Email, Gender, Date of Birth, Height, Weight, Weight goal, Activity level, Goal type (Lose, Maintain, Gain), Target weight, and Desired weight loss rate. Allows tracking histories (diet, searches).

#### 2.2.2 BMI & Health Metrics
- **Data Input**: Weight updates trigger system recalculation.
- **Calculations**: 
  - BMI = weight (kg) / (height (m))²
  - TDEE (Total Daily Energy Expenditure) calculation.
  - Target Calories based on goals, current weight, and target weight.

#### 2.2.3 Food Tracking
- **Manual Entry & Search**: Searchable database for Vietnamese foods and ingredients by name/keyword. Displays Calories, Protein, Carbs, Fat, and an image. 
- **Portion Customization**: Users can customize food weight (e.g., 100g, 200g), and the system automatically recalculates nutritional values.
- **Meal Logs**: Daily history of consumed meals and foods.

#### 2.2.4 Nutrition Recommendation Engine
- **Meal Planning**: Generate daily/weekly/monthly meal plans based on target calories.
- **Dish Replacement**: Suggest alternatives with similar calorie profiles (< 50 kcal variance).

#### 2.2.5 Dashboard & Progress Tracking
- **Visual Analytics**: Interactive time-series charts (by week, month) displaying daily consumed calories, the difference between actual and target calories, and weight trends.
- **Goal Monitoring**: Daily weight update inputs, progress tracking against the target weight, and real-time updates on calorie balance.

#### 2.2.6 Administration - User Management
- **User Management**: View comprehensive lists of users displaying Name, Email, Gender, Age, Status, and Weight Goal.
- **Actions**: Create new accounts, edit personal info (Name, Gender, Height, Weight, DOB, Activity level), lock/unlock accounts.
- **Search & Filter**: Search by name or email. Filter by account status or weight goals.

#### 2.2.7 Administration - Food Data Management
- **Food Database Management**: Administer Vietnamese dishes and ingredients. Data fields include Name, Type (Soup, Fried, Grilled, Vegetarian, Snack, Drink), Ingredients, Calories, Macros (Protein, Carbs, Fat), and Image.
- **Operations**: Add new, edit details, upload/update images to Cloud Storage.
- **Search & Filter**: Search by food name. Filter by calories or food type.
- **Quality Control**: Identify duplicates and moderate/verify data before it becomes visible to end users.

---

## 3. External Interface Requirements
### 3.1 User Interfaces
- **Mobile**: Responsive React-Native UI for Android.
- **Admin**: Web-based React dashboard using Tailwind CSS.

### 3.2 Software Interfaces
- **Database**: PostgreSQL for primary storage.
- **Storage**: Cloudinary or AWS S3 for image hosting and management.

### 3.3 Communication Interfaces
- **Protocols**: HTTPS/SSL for all communications.
- **API**: RESTful architecture with JSON payloads.

---

## 4. Non-Functional Requirements
### 4.1 Performance
- **Response Time**: All API endpoints must respond in < 2 seconds.
- **Throughput**: Support up to 100,000 concurrent users.

### 4.2 Security
- **Data Protection**: Encrypt sensitive health data.
- **Password Hashing**: BCrypt or PBKDF2.
- **Compliance**: GDPR and CCPA compliance.

### 4.3 Availability
- **Uptime**: ≥ 99.5%.
- **Backups**: Daily automated backups.

---

## 5. Constraints & Assumptions
- **OS Support**: Android 8+.
- **Data Quality**: Food recognition depends on a frequently updated nutritional database, rigorously managed by administrators.
- **Connectivity**: Requires active internet connection for image loading, and data sync.
