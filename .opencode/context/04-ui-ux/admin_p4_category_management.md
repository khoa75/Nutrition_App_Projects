# Admin Page 4: Category Classification Management
*   Platform: Web Desktop Viewport (1440x900) with Master Layout (15% Sidebar on left, 85% Content Area on right).
*   Theme: Light Mode
*   URL Route: `/admin/categories`

## Sidebar Components (Left 15%)
*   Vertical Menu Items: [User Management, Food Management, Category Management (Active)].
*   Visual State: "Category Management" is selected. It has a very light green background and a vertical Lime Green (#76FF03) indicator bar on its left edge.

## Main Content Area Components (Right 85%)
*   Top Control Header: Title "Food Categories" + **"Create Category" Primary Button (Deep Indigo #303F9F, solid style, text white, 4px corner radius)**.
*   Data Table Wrapper (12px Rounded Card, Surface #FFFFFF):
    *   Column Headers: [Category ID | Category Name | Total Products Linked | Actions]
    *   Row Content List: Categorized items (e.g., ID: #01, Name: "Rice & Grains", Count: "24 items").
    *   Actions Column: Contains an **[Edit Name]** text link button for inline item management.

## Popup Component: Category Form Modal (Create/Update)
*   **Initial State: Hidden by default (`isOpen = false`)**. The category dashboard page must load fully into view first; this pop-up modal card must not overlay or render on initial page hit.
*   Container: Small centered 12px Rounded Modal card over blurred light background overlay.
*   Fields: Text input "Enter Category Name" (placeholder e.g., "Dairy & Eggs").
*   Actions Row: [Cancel] outline button + [Apply Category] primary filled Deep Indigo button.

## ⚡ Interaction & State Triggers
1.  **Open Modal Trigger:**
    *   Fires when the Admin clicks the **"Create Category"** Primary Button.
        *   *Action:* Switches state to visible (`isOpen = true`), sets header title context to "Create Category", and resets the text input field to empty.
    *   Fires when the Admin clicks the **[Edit Name]** text button next to an existing category entry.
        *   *Action:* Switches state to visible (`isOpen = true`), sets header title context to "Edit Category", and pre-fills the input field with the targeted category name payload.
2.  **Close Modal Trigger:**
    *   Fires when clicking the `[Cancel]` button.
    *   Fires when clicking outside the boundary of the modal card onto the blurred light overlay backdrop.
    *   Fires when pressing the `Esc` key on the keyboard.
    *   *Action:* Reverts component state back to hidden (`isOpen = false`).
