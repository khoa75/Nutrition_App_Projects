# Client Page 1: Account Creation (Sign Up)
*   Platform: Mobile Portrait Layout (iPhone 15 Pro Max Viewport)
*   Theme: Clean Light Mode (Background #F5F5F5)

## UI Layout & Components
*   Top Section: App Logo icon asset + App Name branding text. Header text "Create Account" (Inter 28px Bold, color #1E293B).
*   Form Input Stack (Vertical grid, spacing 16px, inputs have Surface #FFFFFF, border #E2E8F0):
    1. Input Field: "Email Address" text box (placeholder "example@email.com", text color #1E293B).
    2. Input Field: "Create Password" secured text input field wrapper (placeholder "••••••••", text color #1E293B):
        *   Contains an inline **"Eye" / "Eye Off" trailing icon button** positioned at the right inner edge of the text box for toggling password masking state.
    3. Input Field: "Confirm Password" secured text input field wrapper (placeholder "••••••••", text color #1E293B):
        *   Contains an identical, independent **"Eye" / "Eye Off" trailing icon button** positioned at the right inner edge of the text box for toggling confirmation password masking state.
*   Bottom Section Actions:
    *   CTA Button: "Create Account" primary filled card spanning full width (Mint Green #2ED5C5, text dark #1E293B, 4px rounded corners).
    *   Navigation Link: Center aligned text "Already have an account? Login" (Color #64748B, clickable).

## ⚡ Interaction & State Triggers
1.  **Create Password Visibility Toggle:**
    *   **Initial State:** Input characters are strictly masked (`type="password"`), trailing icon displays "Eye Off".
    *   **On Click [Eye/Eye Off Icon]:** Toggles the state of this specific input field between clear text view (`type="text"`) and masked view, updating the icon variant accordingly.
2.  **Confirm Password Visibility Toggle:**
    *   **Initial State:** Input characters are strictly masked (`type="password"`), trailing icon displays "Eye Off".
    *   **On Click [Eye/Eye Off Icon]:** Toggles the state of this specific confirmation input field independently between clear text view (`type="text"`) and masked view, updating the icon variant accordingly.
