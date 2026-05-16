# Admin Dashboard Screen (System Administration)

Unlike the End-User App, the Admin Dashboard is a Web application (React.js) used for managing large amounts of data. The design prioritizes being **Professional, Clean, and Data-Dense** while maintaining a modern vibe through color and movement.

## 1. Web Layout
- **Platform**: Web Desktop.
- **Theme**: Light Mode (Custom Admin Palette).
  - **Primary**: `#76FF03` (Lime Green)
  - **Secondary**: `#C6FF00` (Yellow Green)
  - **Background**: `#FAFAFA` (Light Gray/White)
  - **Surface**: `#FFFFFF` (Pure White)
  - **Accent**: `#303F9F` (Deep Indigo)
  - **Text**: `#212121` (Dark Gray/Black)
- **Background**: Page background uses `#FAFAFA`.
- **Sidebar (Left Menu)**:
  - Occupies 15% of the screen width.
  - Background `#FFFFFF` (Surface), thin 1px right border `#E0E0E0`.
  - Menu items (Dashboard, User Management, Audit Logs, Settings) have a Hover effect: Background changes to a very light green and a Lime Green indicator bar (`#76FF03`) runs vertically on the left. Text is `#212121`.
- **Header (Top Toolbar)**:
  - Contains a Pill-shaped rounded Global Search input (Background `#FAFAFA`, Text `#212121`).
  - Notification cluster and Admin Avatar on the right.

## 2. User Management Data Table Area
This is the main screen when the Admin enters "User Management".

### Table Wrapper
- **Background**: Large 12px rounded Card, background `#FFFFFF` (Surface), very light Drop shadow to separate it from the page background.
- **Table Toolbar**:
  - Left: Search Input "Search by Email/Name..." (Magnifying glass icon glows slightly `#303F9F` when focused).
  - Right: Filters "Status: All / Active / Locked". Deep Indigo (`#303F9F`) Export CSV button.

### Columns & Rows
- **Column Header**: Small uppercase text (Size 12px, Tracking wide), color `#757575`.
- **Row Data**:
  - Text color `#212121`.
  - When hovering, the entire row highlights slightly (`#FAFAFA`) with a `0.2s ease` transition effect.
- **Avatar & Name**: Each User has a small circular avatar next to their Name for a visual feel.
- **Status Badge**:
  - `Active`: Light green background badge (`rgba(118, 255, 3, 0.15)`), Lime Green text (`#76FF03`), with a lightly pulsing dot indicating they are online/active.
  - `Locked`: Light red background badge, Red text.

## 3. Actions & States

### Lock/Unlock Account (Toggle Action)
- Instead of boring text buttons, use an iOS-style **Toggle Switch**.
- **Effects**: When the Admin toggles the lock switch for a User:
  1. The toggle changes from Lime Green to Gray.
  2. A Confirmation Modal appears in the center (Scales up from 0.8 to 1, opacity fade in). Modal background is Glassmorphism.
  3. After confirmation, a small **Toast Notification** slides down from the top right: "Account locked successfully" (with a Tick icon, green background, auto-disappears after 3s).

### Loading State
- Instead of a boring circular Spinner, use a **Skeleton Loading** effect.
- When switching pages or calling an API, the data table turns into light gray rectangular blocks with a continuous shimmer effect, preventing the user from feeling that the application is lagging.
