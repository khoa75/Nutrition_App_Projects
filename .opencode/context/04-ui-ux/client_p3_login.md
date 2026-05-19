# Client Page 3: User Authentication (Login)
* Platform: Mobile Portrait Layout (iPhone 15 Pro Max Viewport)
* Theme: Clean Light Mode (Background #F5F5F5)
## UI Layout & Components
* **Top Branding Section:**
    * App Logo icon asset + App Name branding text centered.
    * Subtitle text "Sign in to continue tracking" (Inter 16px Regular, Muted Slate color #64748B).
* **Form Inputs Layout Stack (Spacing 16px, elements have Surface #FFFFFF, border #E2E8F0):**
    1.  Input Field: "Email Address" text box (placeholder "example@email.com", text color #1E293B).
    2.  Input Field: "Password" secured text input field wrapper (placeholder "••••••••", text color #1E293B):
        * Contains an inline **"Eye" / "Eye Off" trailing icon button** positioned at the right inner edge of the box for toggling password masking state.
* **Action Area (Proximity Layout Fix):**
    * *Constraint:* Placed directly underneath the helper link row with a strict fixed vertical spacing margin of **32px** (No absolute bottom pinning or expanding spacers to prevent layout disconnection).
    * Main Call To Action: "Log In" primary full-width button widget (Solid Mint Green #2ED5C5, bold text #1E293B, 4px rounded corners, Shadow-1 elevation).
* **Alternative Authentication Area:**
    * Vertical Spacing: 24px below the main login button.
    * Sign Up Link: Center-aligned redirect text string "Don't have an account? Sign Up" (Color #64748B, with "Sign Up" bolded and clickable).
## ⚡ Interaction & State Triggers
1.  **Password Masking Toggle:**
    * **Initial State:** Input characters are strictly masked (`type="password"`), and trailing icon displays "Eye Off".
    * **On Click [Eye/Eye Off Icon]:** Toggles the state of this specific text box component between clear text view (`type="text"`) and secure masked format, modifying the icon asset graphics layout live.
