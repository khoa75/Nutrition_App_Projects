# Design System & Design Tokens

This document defines the Design Language for the entire **Nutrition App**. The application follows a **Modern, Premium & Glassmorphism** style, creating a smooth, vivid feel that encourages user interaction.

## 1. Color Palette
The system uses an HSL/Hex color system with high contrast, providing a sense of energy without being overwhelming.

### Primary Colors
- **Primary Green (Brand)**: `#059669` (Emerald) - Symbolizes health, nature, and growth. Used for primary buttons (Call to Action) and goal progress bars.
- **Primary Accent**: `#10B981` (Mint) - Used as a gradient in combination with Primary Green or for hover/active states.

### Secondary/Semantic Colors
- **Warning (Orange)**: `#F59E0B` - Used when calorie consumption is approaching its limit.
- **Danger (Red/Dark Pink)**: `#E11D48` - Used when calorie levels exceed limits or BMI is at Obese levels. Error states.
- **Info (Blue)**: `#3B82F6` - Used for water intake metrics, sleep, or tips.

### Background & Surface
The application supports Dark Mode as the default interface (Premium Dark), as Dark Mode highlights food images and gradient color bands.
- **Main Background (Dark)**: `#0F172A` (Slate 900) - Main background color of the application.
- **Surface/Card (Dark)**: `#1E293B` (Slate 800) - Background for Cards and Modals.
- **Text Primary**: `#F8FAFC` (Slate 50) - Primary text.
- **Text Secondary**: `#94A3B8` (Slate 400) - Secondary text, small descriptions.

## 2. Typography
- **Font Family**: `Inter` or `Outfit` (Google Fonts).
- **Heading (H1)**: Font weight 700 (Bold), Size 32px, Letter spacing -0.02em.
- **Subheading (H2)**: Font weight 600 (SemiBold), Size 24px.
- **Body Text**: Font weight 400 (Regular), Size 16px, Line height 1.5.
- **Caption**: Font weight 400, Size 12px, Text Secondary color.

## 3. Visual Effects

### Glassmorphism
Instead of using solid Card backgrounds, the application uses Glassmorphism for Overlays (such as Bottom Sheets, Modals, or floating Headers).
- **Background**: `rgba(30, 41, 59, 0.7)`
- **Backdrop Filter**: `blur(12px)`
- **Border**: `1px solid rgba(255, 255, 255, 0.1)`

### Drop Shadows & Glow
- Use **Glow** effects instead of traditional black drop shadows to create a Cyber/Premium feel.
- **Glow Button**: `box-shadow: 0 4px 15px rgba(16, 185, 129, 0.4)` (Jade light radiating from buttons).

### Micro-Animations
1. **Buttons**: When pressed (Tap/Click), buttons will slightly shrink `scale(0.95)` and quickly bounce back (Spring animation).
2. **Progress Bars**: When the screen opens, the Calorie progress bar will run from 0 to its current value in `800ms` with an `ease-out-cubic` effect.
3. **Page Transitions**: Use gentle Fade-in and Slide-up effects (`translateY` from 10px to 0px, `opacity` from 0 to 1 in `300ms`).
