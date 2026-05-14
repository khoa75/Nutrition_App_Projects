# Project Architecture: Nutrition App

**Nutrition App** is a comprehensive health management mobile application designed to help users manage their diet and track weight loss/gain progress. The app integrates AI technology to recognize food images and automatically analyze calories, thereby providing highly personalized nutritional roadmaps.

## 1. Core Objectives
- Provide a convenient and accurate solution for daily diet tracking.
- Offer personalized nutritional recommendations based on BMI indices and individual health goals.
- Apply Artificial Intelligence (AI/ML) to minimize manual data entry (food recognition and calorie estimation via images).

## 2. Core Features
1. **BMI Calculation System:** Calculate, store, and track BMI. Provide current physical state classification.
2. **Nutritional Roadmap Suggestions:** Create eating plans (daily/weekly/monthly) based on TDEE, allowing for flexible food substitution.
3. **Food Recognition and Calorie Analysis (AI Powered):** Allow users to take photos of food; the system automatically recognizes the dish name, ingredients, and estimates calories. Supports manual data entry as well.
4. **Dashboard & Progress Tracking:** Visualize consumed calorie data, weight fluctuations, and progress towards goals through real-time charts.
5. **User Administration (Admin):** Separate dashboard for Admins to manage accounts, track activity, and detect abnormal behavior.

## 3. System Architecture (Modular Monolith)
The project is built using the **Modular Monolith** model to ensure isolation between business modules while maintaining the simplicity of a single codebase for the Backend.
- **Backend (Spring Boot)**: Acts as the central hub for logic processing and data coordination.
- **AI Service (FastAPI)**: Responsible for computationally heavy tasks and image recognition.
- **Clients (Flutter & React)**: Provide cross-platform user interfaces.
