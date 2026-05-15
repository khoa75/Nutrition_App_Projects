# UI/UX Guide: Loading States

This document describes the principles and user interface (UI) components used when the application is processing data, especially during time-consuming tasks such as AI API calls or user authentication.

## 1. General Principles
- **Always Responsive:** Never let the screen "freeze" when a user performs an action.
- **Relevance:** Loading visuals/effects should carry the colors and icons of the nutrition app (e.g., apple, food plate, AI scan beam).
- **Error Prevention:** Disable buttons or block background interactions while waiting to prevent users from pressing submit multiple times.

## 2. Types of Loading States

### 2.1. Skeleton Screen
- **Use when:** Loading dynamic data to display on the screen (such as food lists, statistical charts, eating history).
- **Design:** Use light gray blocks (with a subtle shimmer effect) that simulate the structure of the content about to be displayed. This helps users visualize the layout beforehand instead of looking at a white screen.

### 2.2. Full Screen Overlay
- **Use when:** 
  - AI is analyzing food images (takes 2-5 seconds).
  - Creating personalized meal plan suggestions.
  - Payment/Registration processes.
- **Design:**
  - A background blur layer covers the entire current screen.
  - Centered is an animation combined with text notifications.
  - **Animation Example:** A light beam scanning across a food plate image, or a cycle of healthy food icons.

### 2.3. Inline Spinners
- **Use when:** Small, local tasks (Saving profile, updating food quantity, liking a post).
- **Design:** A spinner icon or pulsing three dots appears directly inside or next to the button. The button will turn gray and be unclickable.

## 3. Display Content
Instead of just saying "Loading...", use specific, interactive messages so users don't feel impatient:
- **When analyzing food images:** *"Using AI to recognize your dish..."* -> *"Calculating calorie count..."*
- **When creating meal plans:** *"Analyzing BMI index..."* -> *"Searching for suitable foods..."*
- **Accompanied by tips:** Randomly display "Daily Nutrition Tips" under the loading message to distract attention from the wait time.

## 4. Error Handling (Timeout/Error)
- **If over 10 seconds:** Change the message to *"This process is taking longer than expected, please wait a bit more!"*
- **If over 30 seconds (Timeout):** Display a friendly error screen: *"Oops, the server is overloaded. Please try again later"* with a clear [Try Again] button. The loading screen must disappear completely.
