# Admin Page 3: Food Inventory Management
*   Platform: Web Desktop Viewport (1440x900) with Master Layout (15% Sidebar on left, 85% Content Area on right).
*   Theme: Light Mode
*   URL Route: `/admin/foods` or `/admin/inventory`

## Sidebar Components (Left 15%)
*   Vertical Menu Items: [User Management, Food Management (Active), Category Management].
*   Visual State: "Food Management" is selected. It has a very light green background and a vertical Lime Green (#76FF03) indicator bar on its left edge.

## Main Content Area Components (Right 85%)
*   Top Workspace Row: Title "Food Catalog Management" + **"Add New Food" Primary Button (Deep Indigo #303F9F, solid style, text white, 4px corner radius)**.
*   Control Filters Row:
    *   Left: Search input bar "Search by food name...".
    *   Right: *Empty / Spacing placeholder* (Category filter completely removed).
*   Data Table Container (12px Rounded Card, Surface #FFFFFF):
    *   Column Headers: [ Name | Calories | Macros (P/C/F) | Actions]
    *   Row Items: Macros column displays values grouped neatly. Actions column has an [Edit] icon button.

## Popup Component: Food Form Modal (Create/Read/Update)
*   **Initial State: Hidden by default (`isOpen = false`)**. The main Food Management dashboard must be fully visible and rendered first; this modal and its background overlay must not appear on initial page load.
*   Container: Centered 12px Rounded Dialog box over blurred light background layer.
*   Form Layout:
        *  Column Input Stack: Food Name input, Calories (kcal input), Protein (grams), Carb (grams), Fat (grams). *(Category selection menu completely removed)*.
*   Footer Actions: [Discard] text button + [Confirm Template] filled Deep Indigo button.

## ⚡ Interaction & State Triggers
1.  **Open Modal Trigger:**
    *   Fires when the Admin clicks the **"Add New Food"** Primary Button.
        *   *Action:* Switches component state to visible (`isOpen = true`), sets the context to "Create Mode", and initializes empty form fields.
    *   Fires when the Admin clicks the **[Edit]** icon button inside any specific row item within the Data Table Grid.
        *   *Action:* Switches component state to visible (`isOpen = true`), sets the context to "Update Mode", and populates fields with that food item's specific data template payload.
2.  **Close Modal Trigger:**
    *   Fires when clicking the `[Discard]` footer text button.
    *   Fires when clicking anywhere on the outer blurred light background layer overlay.
    *   Fires when pressing the `Esc` key on the keyboard.
    *   *Action:* Reverts component state back to hidden (`isOpen = false`) and clears out any transient form state.
