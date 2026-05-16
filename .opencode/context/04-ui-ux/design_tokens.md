# Design System & Design Tokens

This document defines the Design Language for the entire **Nutrition App**. The application follows a **Modern, Premium & Glassmorphism** style, using the **"Modern Mint"** palette to create a fresh, clean, and energetic feel.

## 1. Color Palette: "Modern Mint"
The system uses high-quality hex colors to provide a sense of health and clarity.

### Primary Colors
- **Primary (Main)**: `#00C853` (Vibrant Green) - Symbolizes health, vitality, and growth. Used for primary actions and key highlights.
- **Secondary**: `#B9F6CA` (Mint Green) - Used for selection states, subtle backgrounds, and secondary highlights.

### Background & Surface
- **Background (Main)**: `#F7FBF7` (Pale Mint/White) - The main background color, providing a very soft mint tint for a premium look.
- **Surface (Cards/Modals)**: `#FFFFFF` (Pure White) - Used for info cards and containers to ensure high readability.
- **Text (Primary)**: `#1B5E20` (Deep Forest Green) - Used for main content and headings for maximum contrast and readability.

### Semantic & Accent Colors
- **Accent**: `#2979FF` (Electric Blue) - Used for links, information notifications, and highlighting specific metrics.
- **Warning**: `#F59E0B` (Amber) - Used when nearing calorie limits.
- **Danger**: `#E11D48` (Rose Red) - Used for error states or exceeding nutritional limits.

## 2. Typography
- **Font Family**: `Inter` or `Outfit` (Google Fonts).
- **Heading (H1)**: Font weight 700 (Bold), Size 32px, Letter spacing -0.02em, Color: Text Primary.
- **Subheading (H2)**: Font weight 600 (SemiBold), Size 24px, Color: Text Primary.
- **Body Text**: Font weight 400 (Regular), Size 16px, Line height 1.5, Color: Text Primary.
- **Caption**: Font weight 400, Size 12px, Color: Text Primary (with 60% opacity).

## 3. Visual Effects

### Glassmorphism (Light Theme)
Instead of dark overlays, we use a light, frosty glass effect.
- **Background**: `rgba(255, 255, 255, 0.7)`
- **Backdrop Filter**: `blur(16px)`
- **Border**: `1px solid rgba(0, 200, 83, 0.1)` (Subtle Primary Green border)

### Drop Shadows & Glow
- **Soft Shadow**: `box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05)` (Very subtle shadow for cards).
- **Glow Button**: `box-shadow: 0 8px 20px rgba(0, 200, 83, 0.3)` (Radiant green glow for Primary buttons).

### Micro-Animations
1. **Buttons**: When pressed, buttons slightly shrink `scale(0.96)` with a spring bounce effect.
2. **Progress Bars**: Smooth transition from 0 to current value over `1000ms` with `ease-out-expo`.
3. **Page Transitions**: Gentle Fade-in and Slide-up (`translateY(15px)` to `0`) in `400ms`.
