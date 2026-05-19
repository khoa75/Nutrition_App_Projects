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
  - *Low (little/no exercise):* 1.2
  - *Average (1-3 days/week):* 1.55
  - *High (4+ days/week or physical job):* 1.725

## 3. Determining Target Calories
- **Weight Loss:** `TDEE - (300 to 500 calories)`
- **Weight Gain:** `TDEE + (300 to 500 calories)`
- **Maintenance:** `TDEE`

