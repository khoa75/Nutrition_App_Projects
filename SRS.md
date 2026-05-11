# SOFTWARE REQUIREMENTS SPECIFICATION (SRS)
## Nutrition App - Health & Diet Management System

## 1. Introduction
### 1.1 Purpose
The purpose of this document is to provide a detailed description of the software requirements for the Nutrition App. It will illustrate the functional and non-functional requirements of the system.

### 1.2 Scope
This system is a health management platform comprising a mobile application (Flutter), a backend service (Spring Boot), an AI service (FastAPI), and an admin dashboard (React).

---

## 2. Overall Description
### 2.1 Product Perspective
The system consists of:
- **Mobile App**: User interface for diet tracking and health monitoring.
- **Admin Dashboard**: Web interface for system management.
- **Backend API**: Core business logic and data persistence (MongoDB).
- **AI Service**: Image recognition for food analysis (PyTorch).

### 2.2 Functional Requirements

#### 2.2.1 Authentication & Profile Management
- **Registration**: Email/Password, OTP-based Phone, or Social Login (Google, Facebook, Apple).
- **Login**: Secure login with JWT, "Remember me", and account lockout after 5 failed attempts.
- **2FA**: Optional Two-Factor Authentication.
- **Profile**: CRUD operations for user profiles including health data.

#### 2.2.2 BMI & Health Metrics
- **Data Input**: Full name, DOB, weight (kg/lbs), height (cm/feet), gender, activity level, weight goal.
- **Calculations**: 
  - BMI = weight (kg) / (height (m))²
  - TDEE (Total Daily Energy Expenditure) calculation.
  - Target Calories based on goals (Weight Gain/Loss).

#### 2.2.3 Food Tracking & AI Recognition
- **Image Recognition**: Identify food items from photos with ≥85% accuracy.
- **Calorie Estimation**: Calculate calories and macronutrients (Protein, Carbs, Fat) from recognized items.
- **Manual Entry**: Searchable food database for manual logging.
- **Meal Logs**: Daily history of consumed meals.

#### 2.2.4 Nutrition Recommendation Engine
- **Meal Planning**: Generate daily/weekly/monthly meal plans based on target calories.
- **Dish Replacement**: Suggest alternatives with similar calorie profiles (< 50 kcal variance).

#### 2.2.5 Dashboard & Progress Tracking
- **Visual Analytics**: Time-series charts for weight trends and calorie consumption.
- **Goal Monitoring**: Progress bars and real-time updates on calorie balance.

#### 2.2.6 Administration
- **User Management**: List, filter, search, lock/unlock, and edit users.
- **Audit Logging**: Track all administrative actions and sensitive user activities.
- **Analytics**: System-wide DAU/MAU and success rate reporting.

---

## 3. External Interface Requirements
### 3.1 User Interfaces
- **Mobile**: Responsive Flutter-based UI following Material Design.
- **Admin**: Web-based React dashboard using Tailwind CSS.

### 3.2 Software Interfaces
- **Database**: MongoDB for primary storage.
- **Storage**: Cloudinary or AWS S3 for image hosting.
- **AI Engine**: FastAPI service running PyTorch models.

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
- **OS Support**: iOS 13+ and Android 8+.
- **Data Quality**: Food recognition depends on a frequently updated nutritional database.
- **Connectivity**: Requires active internet connection for AI features and data sync.
