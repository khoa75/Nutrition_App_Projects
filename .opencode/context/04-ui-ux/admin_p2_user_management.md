# Admin Page 2: User Management Dashboard
*   Platform: Web Desktop Viewport (1440x900) with Master Layout (15% Sidebar Navigation on left, 85% Content Area on right).
*   Theme: Light Mode
*   Role: Default Landing Page (Root Dashboard Viewport after Authentication)
*   URL Route: `/admin` or `/admin/users`

## Sidebar Components (Left 15%)
*   Vertical Menu Items: [User Management (Active/Default), Food Management, Category Management].
*   Visual State: "User Management" is selected by default upon entry. It has a very light green background and a vertical Lime Green (#76FF03) indicator bar on its left edge.

## Main Content Components (Right 85%)
*   Top Header Row: Pill-shaped rounded Global Search bar (left) + Admin Avatar profile menu & Notification badge (right).
*   Main Workspace Container: Large 12px Rounded Card (Surface #FFFFFF).
    *   **Toolbar Row:**
        *   Left side: Input search "Search by Email/Name..." with magnifying glass icon.
        *   Right side: Filter chips group [Status: All | Active | Locked] + "Export CSV" Button (Deep Indigo #303F9F, outline style) + **"+ Create User" Primary Button (Deep Indigo #303F9F, solid style, text white, 4px corner radius)**.
    *   **Data Table Grid:**
        *   Column Headers (12px Uppercase Gray #757575): [User | Email | Gender | BMI | Status | Actions]
        *   Row Items: Hover highlight background #FAFAFA. "User" column displays a small circular avatar image next to the text Name.
        *   Status Badges: "Active" (Light green background, Mint Green text #76FF03, small pulsing green dot). "Locked" (Light red background, Red text).
        *   Actions Column: An iOS-style Toggle Switch widget (Green when active, Gray when locked).

## Popup Component: User Form Modal (Create/Read/Update)
*   **Initial State: Hidden by default (`isOpen = false`)**. Do not render the modal or backdrop blur layer on initial page load.
*   Container: Centered 12px Rounded Dialog box with Light Glassmorphism (white frosted glass) backdrop blur overlay.
*   Form Fields Grid (2 columns layout): Fullname, Email (read-only for edit, active for create), Gender selection menu, Height (cm), Weight (kg), BMI calculation field, Target Weight (kg), Birthdate picker, Activity level dropdown.
*   Footer Buttons Row: [Cancel] outline button + [Save Changes] filled Deep Indigo button.

## ⚡ Interaction & State Triggers
1.  **Open Modal Trigger:** 
    *   Fires when the Admin clicks the **"+ Create User"** Primary Button. 
        *   *Action:* Switches component state to visible (`isOpen = true`) and initializes empty/default form fields.
    *   Fires when the Admin clicks on an individual row item or an [Edit] action button within the Data Table Grid.
        *   *Action:* Switches component state to visible (`isOpen = true`) and populates the form fields with the selected user's payload data.
2.  **Close Modal Trigger:** 
    *   Fires when clicking the `[Cancel]` button.
    *   Fires when clicking anywhere on the outer semi-transparent backdrop blur overlay layer.
    *   Fires when pressing the `Esc` key on the keyboard.
    *   *Action:* Reverts component state back to hidden (`isOpen = false`).
