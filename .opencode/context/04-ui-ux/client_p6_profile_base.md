# Client Page 6: Main Dashboard - Profile Settings Root Hub
* Platform: Mobile Portrait Layout (iPhone 15 Pro Max Viewport) with Fixed Bottom Tab Bar Navigation.
* Theme: Clean Light Mode (Background #F5F5F5)
* Navigation Bar Fixed Elements: Bottom tab bar (Background #FFFFFF, border top #E2E8F0) with 3 active navigation icon blocks: [Tracking, Daily, Profile (Selected Highlight)]. Text/Icon color #1E293B when active, #64748B when inactive.

---

## 👤 Section 1: User Profile Summary Card
* **UI Layout:** Rounded 16px structural card container panel (Surface #FFFFFF, light drop shadow elevation).
* **Component Content Layout (Stack):**
    * Information Stack:
        * Primary Name Header: "Khoa Nguyen" (Inter 18px Bold, color #1E293B).
        * Sub-label Info String: "khoanguyen@email.com" (Inter 12px Regular, color #64748B).

---

## 🎯 Section 2: Current Fitness Target Overview Card
* **UI Layout:** Rounded 16px structural tracking status card container (Surface #FFFFFF, light drop shadow elevation).
* **Component Content Layout:**
    * Header Row: Title "Active Plan Metrics" (Inter 14px SemiBold, #1E293B) + current goal badge label displaying e.g., "Weight Loss Strategy".
    * Data Grid Cells Row: 
        * Metric 1: Label "Daily Budget" text stacked above highlighted green text reading **"2,000 Kcal"** (#10B981).
        * Metric 2: Label "Target Weight" text stacked above value reading "70.0 kg" (#1E293B).

---

## ⚙️ Section 3: Navigation Menu Action List-View
* **UI Layout Layout:** Vertical stack of layout-linked menu interactive bar blocks (Spacing vertical 8px, items use Surface background #FFFFFF, border lines #E2E8F0).
* **Core Interactive Menu Items:**
    1.  **Edit Personal Profile Form Anchor:** * Layout: Left user settings graphic icon + title text string **"Edit Personal Information"** (#1E293B) + Right chevron arrowhead indicator icon.
        * *Action:* Redirects viewport layout state directly to **Client Page 7**.
    2.  **Adjust Target & Calorie Engine Anchor:** * Layout: Left target crosshair graphic icon + title text string **"Adjust Goal"** (#1E293B) + Right chevron arrowhead indicator icon.
        * *Action:* Redirects viewport layout state directly to **Client Page 8**.

---

## 🚪 Section 4: Account Exiting CTA Block
* **UI Layout:** Placed 32px below the last settings menu navigation cell.
* **Component Button:** Red text full-width outline functional row button element labeled **"Logout Account"** (Color #F44336 outline, text centered, triggers a clean overlay verification popup alert).
