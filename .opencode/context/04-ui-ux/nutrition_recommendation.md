# Meal Suggestion Screen (Nutrition Recommendations)

This screen provides personalized meal suggestions based on the user's BMI and weight goals (Aligns with US-2). The interface is designed to stimulate the palate and provide motivation, using a modern layout such as card carousels or visual lists.

## 1. Overall Structure
- **Background**: Dark Slate (`#0F172A`) consistent with the Dashboard to ensure uniformity.
- **Header**:
  - Back button in the left corner.
  - Title: "Nutrition Plan" (Font `Outfit`, Size 24px, Bold, color `#F8FAFC`).
  - Filter/Settings button in the right corner (For users to adjust parameters like Goal or recalculate based on updated BMI).

## 2. Timeframe & Goal Selection
- **Timeframe Selector**: A sleek horizontal scroll or segmented control allowing users to switch the view between **Day / Week / Month / Year** (US-2 Acceptance Criteria).
- **Goal Toggle & Summary Card**:
  - Directly below the Timeframe is a smooth horizontal slider (Segmented Control).
  - **States**: [Weight Loss] | [Maintain] | [Weight Gain].
  - When toggling, a slider indicator glides across with a spring effect, highlighting the current goal in Primary Green (`#059669`).
  - **Summary Box**: A small Glassmorphism Card displaying a quick summary: "Current BMI: 24.5 | Target: 1,800 Kcal / day".

## 3. Meal List (Meal Timeline / Carousel)
Meals are divided chronologically (Breakfast, Lunch, Dinner, Snacks).

### Meal Card
Each card features a 3D elevation effect and Parallax during scrolling.
- **Size**: Large rectangular card, 20px rounded corners, occupying 90% of screen width.
- **Card Background**: Dark gradient from `#1E293B` to `#334155`, creating depth.
- **Thumbnail Image**:
  - Located on the upper half or left side of the card.
  - High-quality food imagery with a black Gradient Overlay from bottom to top to highlight text.
- **Typography**:
  - Classification tag: "Breakfast" (Small badge with Info Blue background `#3B82F6` at 20% opacity, Info Blue text).
  - Dish name: "Avocado Salmon Salad" (Size 18px, SemiBold).
  - Calories: "450 Kcal" (Mint Green color `#10B981`, large prominent font).
- **Macro Tags**:
  - Small pill shapes below the dish name: `[Protein: 35g]` `[Carb: 20g]` `[Fat: 15g]`.
  - 1px thin border, transparent gray background.

## 4. Interactions & Micro-animations
### Swap Button (Replacing Dishes)
- The right corner of the card features a "Swap Dish" button (rotating arrow icon).
- **Functionality**: Allows replacing suggested dishes with others of **similar calories** (US-2 Acceptance Criteria).
- **Animation**: When clicked, the icon rotates 360 degrees in 300ms. The current meal card blurs (blur transition) and a light Shimmer effect glides across before displaying the new replacement dish.

### Log Button (Eat This / Log Button)
- Located at the bottom of the card. A wide spanning button with text "Select this meal".
- When clicked, the button bounces slightly (Scale down 0.95), changes color to Primary Green, and displays a Tick `✓`, accompanied by a tiny Confetti explosion around it to reward the user (Gamification).
