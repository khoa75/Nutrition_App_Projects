# Admin Page 1: Authentication Portal
*   Platform: Web Desktop Viewport (1440x900)
*   Theme: Light Mode (Background #FAFAFA)

## UI Layout & Components
*   Container: Centered 12px Rounded Card, background #FFFFFF, light drop shadow.
*   Header Section: App Logo placeholder + Title text "System Administration Portal" (Inter 24px Bold, color #212121).
*   Form Fields Stack (Spacing 16px):
    1. Label "Email Address" + Input field (placeholder "admin@example.com").
    2. Label "Password" + Secured text input field (placeholder "••••••••").
*   Action: "Sign In" Primary Button spanning full width of the card (Deep Indigo #303F9F, text white, 4px corner radius).

## Interaction & State Triggers 1. **Password Visibility Toggle:** * **Initial State:** Password characters are strictly masked (`type="password"`), and the trailing icon displays the "Eye Off" (slashed eye) variant. * **On Click [Eye/Eye Off Icon]:** Toggles the input field type between text and password formats. * *Action:* If masked, switches to clear text view (`type="text"`) and changes the icon asset to the active "Eye" variant. If unmasked, reverts immediately back to masked view. 

## 🔄 Routing & Redirect Behavior
*   **On Click [Sign In]:** Validate credentials via API.
*   **On Success:** Strictly redirect the user to **Admin Page 2 (User Management Dashboard)** at root route `/admin` or `/admin/users`.
