# Dashboard Screen (Progress Tracking)

This is the main screen (Home) that users see every day, designed to make a strong impression (WOW) with a visual, elegant, and data-rich interface that remains uncluttered and fresh.

## 1. Overall Structure (Layout)
The screen is vertically scrollable, with a background color of `#F7FBF7` (Pale Mint). A very subtle green gradient radiates from the top left corner to create a sense of light.

### Header
- **Left corner**: Personalized greeting "Good morning, Khoa! 👋" (Deep Forest Green `#1B5E20`, font `Outfit` SemiBold 24px).
- **Right corner**: Circular user avatar with a thin Primary Green (`#00C853`) border.

## 2. Focal Card: Calorie Ring (Calorie Ring Card)
Located immediately below the Header, this is the largest visual highlight.
- **Background**: 24px rounded Card, applying a **Glassmorphism** effect (White semi-transparent background, 16px blur, subtle primary green border).
- **Center**: A large circular progress ring (Circular Progress).
  - Background ring: `#E8F5E9` (Very light green).
  - Progress ring: Uses a Gradient from `#00C853` (Vibrant Green) to `#2979FF` (Electric Blue).
  - **Animation**: When loading, the color band runs from 0 to the consumption percentage with a subtle glow effect.
- **Text inside the ring**:
  - Large number: "1,450" (font Bold 40px, Deep Forest Green).
  - Small label below: "Kcal consumed".
- **Bottom of the Card**: Displays text "Remaining: 550 Kcal" in Vibrant Green.

## 3. Macronutrients Breakdown (Macros Breakdown)
Located below the Calorie ring, displaying 3 metrics: Protein, Carbs, Fats.
- Layout: 3 horizontal columns (Row). Each column contains:
  - Label (e.g., "Protein").
  - Small Linear Progress bar.
  - Data (e.g., "45g / 120g").
- **Progress bar colors**:
  - Protein: Rose Red (`#E11D48`).
  - Carbs: Amber (`#F59E0B`).
  - Fats: Electric Blue (`#2979FF`).

## 4. Weight Tracking Area (US-5)
A dedicated section to track weight progress.
- **Title**: "Weight Progress" (Size 20px, SemiBold).
- **Mini Chart**: A small sparkline chart showing the weight trend over the last 7 days.
- **Entry Action**: A small [Update Weight] button (Primary Green text with an underline).
  - When clicked, a small popup/modal appears with a numeric keypad and a slider to quickly log current weight.

## 5. Today's Meals Area
Displayed as a vertical list.
- Title: "Today's Meals" (Size 20px, SemiBold). Small "View all" button on the right.
- **Meal Card**:
  - Pure white background (`#FFFFFF`), 16px rounded corners. Has a soft drop shadow.
  - Left: Food thumbnail image, rounded.
  - Middle: Dish name (e.g., "Pan-seared Chicken Breast"), with time of consumption below ("12:30 PM").
  - Right: Total calories for the dish ("+350 kcal", Vibrant Green color).

## 6. Add Food Button (Floating Action Button - FAB)
- Position: Fixed at the bottom right corner.
- Design: Large circular button, Gradient from Vibrant Green to Deep Green.
- Box Shadow: Radiates a green glow.
- Icon: PLUS symbol (`+`) in white. When pressed, activates a menu: "Take Photo" or "Manual Entry".
