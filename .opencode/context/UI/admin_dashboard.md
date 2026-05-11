# Admin Dashboard Screen (System Administration)

Unlike the End-User App, the Admin Dashboard is a Web application (React.js) used for managing large amounts of data. The design prioritizes being **Professional, Clean, and Data-Dense** while maintaining a modern (Premium vibe) through color and movement.

## 1. Web Layout
- **Platform**: Web Desktop.
- **Theme**: Dark Mode, consistent with the App (`#0F172A`).
- **Sidebar (Left Menu)**:
  - Occupies 15% of the screen width.
  - Background `#1E293B`, thin 1px right border `#334155`.
  - Menu items (Dashboard, User Management, Audit Logs, Settings) have a Hover effect: Background changes to `#334155` and a Mint Green indicator bar (`#10B981`) runs vertically on the left.
- **Header (Top Toolbar)**:
  - Contains a Pill-shaped rounded Global Search input.
  - Notification cluster and Admin Avatar on the right.

## 2. User Management Data Table Area
This is the main screen when the Admin enters "User Management".

### Table Wrapper
- **Background**: Large 12px rounded Card, background `#1E293B`, very light Drop shadow to separate it from the page background.
- **Table Toolbar**:
  - Left: Search Input "Search by Email/Name..." (Magnifying glass icon glows slightly when focused).
  - Right: Filters "Status: All / Active / Locked". Secondary color Export CSV button.

### Columns & Rows
- **Column Header**: Small uppercase text (Size 12px, Tracking wide), gray color `#94A3B8`.
- **Row Data**:
  - When hovering, the entire row lights up slightly (`#334155`) with a `0.2s ease` transition effect.
- **Avatar & Name**: Each User has a small circular avatar next to their Name for a visual feel.
- **Status Badge**:
  - `Active`: Light green background badge (`rgba(16, 185, 129, 0.15)`), Mint Green text (`#10B981`), with a lightly pulsing dot (Pulse animation) indicating they are online/active.
  - `Locked`: Light red background badge (`rgba(225, 29, 72, 0.15)`), Red text (`#E11D48`).

## 3. Actions & States

### Lock/Unlock Account (Toggle Action)
- Instead of boring text buttons, use an iOS-style **Toggle Switch**.
- **Effects**: When the Admin toggles the lock switch for a User:
  1. The toggle changes from Green to Gray.
  2. A Confirmation Modal appears in the center (Scales up from 0.8 to 1, opacity fade in). Modal background is Glassmorphism.
  3. After confirmation, a small **Toast Notification** slides down from the top right: "Account locked successfully" (with a Tick icon, green background, auto-disappears after 3s).

### Loading State
- Instead of a boring circular Spinner, use a **Skeleton Loading** effect.
- When switching pages or calling an API, the data table turns into light gray rectangular blocks with a continuous shimmer effect (Shimmer effect), preventing the user from feeling that the application is lagging.
