# Project Glossary

This document defines the key terms (Ubiquitous Language) used consistently across all modules (Backend, Frontend, Admin) to avoid confusion.

## 1. Users & Permissions
- **User**: Regular mobile application user.
- **Admin**: Administrator using the React Admin Dashboard.
- **Account / UserProfile**: Detailed user information (height, weight, BMI, nutritional goals, activity level).

## 2. Nutrition System
- **Food / FoodItem**: An independent type of food or dish (e.g., Apple, Bowl of Pho).
- **Meal**: A meal during the day (Breakfast, Lunch, Dinner, Snack). A Meal can contain multiple FoodItems.
- **Portion Size**: The specific weight in grams of a FoodItem consumed by the user, used for calculating accurate calories.
- **DietLog / MealRecord**: Food diary recorded by the user during the day.
- **NutritionFacts**: Nutritional information for a food item (Calories, Protein, Fat, Carbs).
- **BMI (Body Mass Index)**: Body Mass Index.
- **TDEE (Total Daily Energy Expenditure)**: An estimation of how many calories a person burns per day.
- **Target Calories**: The recommended daily calorie intake for a user based on their TDEE and weight goals.
- **Recommendation**: Personalized menus or nutritional advice suggested by the system based on calorie targets.

*(To be updated during development...)*
