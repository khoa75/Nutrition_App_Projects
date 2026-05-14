# Domain Knowledge (Business Rules)

This document summarizes concepts, formulas, and business logic related to health and nutrition.

## 1. BMI (Body Mass Index)
- **Formula:** `BMI = Weight (kg) / [Height (m)]²`
- **Classification:**
  - `< 18.5`: Underweight
  - `18.5 - 24.9`: Normal
  - `25 - 29.9`: Overweight
  - `≥ 30`: Obese

## 2. BMR & TDEE (Mifflin-St Jeor Equation)
- **BMR (Male):** `(10 × weight) + (6.25 × height) - (5 × age) + 5`
- **BMR (Female):** `(10 × weight) + (6.25 × height) - (5 × age) - 161`
- **TDEE:** `BMR × Activity Level Factor`
  - *Sedentary (little/no exercise):* 1.2
  - *Light (1-3 days/week):* 1.375
  - *Moderate (3-5 days/week):* 1.55
  - *Active (6-7 days/week):* 1.725
  - *Very Active (2x/day, physical job):* 1.9

## 3. Determining Target Calories
- **Weight Loss:** `TDEE - (300 to 500 calories)`
- **Weight Gain:** `TDEE + (300 to 500 calories)`
- **Maintenance:** `TDEE`

## 4. Macronutrients
- **Protein:** 1g = 4 calories (30%)
- **Carbs:** 1g = 4 calories (40%)
- **Fat:** 1g = 9 calories (30%)
