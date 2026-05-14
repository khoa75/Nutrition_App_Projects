# Dashboard Screen (Progress Tracking)

This is the main screen (Home) that users see every day, designed to make a strong impression (WOW) with a visual, elegant, and data-rich interface that remains uncluttered.

## 1. Overall Structure (Layout)
The screen is vertically scrollable, with a background color of `#0F172A` (Dark Slate). There is a faint gradient radiating from the top right corner (color `#10B981` with 15% opacity) to create depth.

### Header
- Left corner: Personalized greeting "Good morning, Khoa! 👋" (White text `#F8FAFC`, font `Outfit` SemiBold 24px).
- Right corner: Circular user avatar with a thin Primary Green border.

## 2. Focal Card: Calorie Ring (Calorie Ring Card)
Located immediately below the Header, this is the largest visual highlight.
- **Background**: 24px rounded Card, applying a **Glassmorphism** effect (semi-transparent background, 12px blur, 1px light border).
- **Center**: A large circular progress ring (Circular Progress).
  - Background ring: `#334155` (Slate 700).
  - Progress ring: Uses a Gradient from `#10B981` (Mint) to `#3B82F6` (Blue).
  - **Animation**: When loading, the color band runs from 0 to the consumption percentage with a subtle glow effect (Glow).
- **Text inside the ring**:
  - Large number (prominently displayed): "1,450" (font Bold 40px).
  - Small label below: "Kcal consumed".
- **Bottom of the Card**: Displays text "Remaining: 550 Kcal" in Mint Green.

## 3. Macronutrients Breakdown (Macros Breakdown)
Located below the Calorie ring, displaying 3 metrics: Protein, Carbs, Fats.
- Layout: 3 horizontal columns (Row). Each column contains:
  - Label (e.g., "Protein").
  - Small Linear Progress bar.
  - Data (e.g., "45g / 120g").
- **Progress bar colors**:
  - Protein: Rose Red Gradient (`#E11D48`).
  - Carbs: Orange Gradient (`#F59E0B`).
  - Fats: Purple Gradient (`#8B5CF6`).

## 4. Today's Meals Area
Displayed as a vertical list.
- Title: "Today's Meals" (Size 20px, SemiBold). Small "View all" button on the right.
- **Meal Card**:
  - Light black background (`#1E293B`), 16px rounded corners. Has a slight elevation effect on hover/tap.
  - Left: Food thumbnail image, rounded, with a filter darkening the corners slightly.
  - Middle: Dish name (e.g., "Pan-seared Chicken Breast"), with time of consumption below ("12:30 PM").
  - Right: Total calories for the dish ("+350 kcal", Primary Green color).

## 5. Add Food Button (Floating Action Button - FAB)
- Position: Fixed at the bottom right corner or centered (like a tab bar Home button).
- Design: Large circular button, Gradient from Mint Green to Emerald Green.
- Box Shadow: Radiates a green glow (Glow) `0px 10px 20px rgba(16, 185, 129, 0.4)` giving a floating sensation.
- Icon: PLUS symbol (`+`) in white or a Camera icon. When pressed, the icon rotates 45 degrees into an `x` and activates a backdrop filter to open a menu: "Take Photo" or "Manual Entry".
