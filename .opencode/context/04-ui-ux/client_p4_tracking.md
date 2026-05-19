# Client Page 4: Main Dashboard - Tracking Tab
* Platform: Mobile Portrait Layout (iPhone 15 Pro Max Viewport) with Fixed Bottom Tab Bar Navigation.
* Theme: Clean Light Mode (Background #F5F5F5)
* Navigation Bar Fixed Elements: Bottom tab bar (Background #FFFFFF, border top #E2E8F0) with 3 active navigation icon blocks: [Tracking (Selected Highlight), Daily, Profile]. Text/Icon color #1E293B when active, #64748B when inactive.

---

## 📅 Section 1: Interactive Calendar Control Bar
* **UI Layout:** Full-width header panel container (Surface #FFFFFF, border bottom #E2E8F0).
* **Core Interactive Component Elements:**
    * **Top Quick Selector Row:** * Left-aligned: Active Month/Year dropdown menu button reading e.g., "May 2026 ▾" (Inter 16px SemiBold, #1E293B). Clicking this opens a native modal date picker overlay allowing fast, flexible scrolling across different days, months, and years.
        * Right-aligned: "Today" utility capsule text chip link to quickly reset selection to current date context.
    * **Bottom Horizontal Scrolling Date Matrix:** * A dynamic 7-day inline calendar strip wheel (Dates list row view: Mon | Tue | Wed | Thu | Fri | Sat | Sun stacked over numeric day strings e.g., 18 | 19 | 20...).
        * *Active State:* The currently selected target date node is fully highlighted inside an isolated crisp vertical capsule background chip block (Mint Green #2ED5C5, text dark solid #1E293B). Inactive days display clean neutral gray fonts.

---

## 🎯 Section 2: Focal Calories Metric Overview Card
* **UI Layout:** Large 24px Rounded White Frosted Glassmorphic Surface Panel. Uses a prominent crisp drop shadow elevation (Shadow-2) to isolate it from the workspace background layout.
* **Core Structural Graphics Component:**
    * **Central Object:** Massive circular progress ring graphic wrapper (Base structural background track line uses Light Gray #E2E8F0; active forward progressive stroke uses a smooth dynamic color gradient transitioning from Mint Green #10B981 to Electric Blue #3B82F6).
    * **Inner Focal Text Frame Structure:** Large numeric center string reading "1,450" (Outfit 40px Bold, color #1E293B) stacked perfectly on top of a centered secondary context label reading "Kcal consumed" (#64748B).
* **Card Base Footer Context:** A clear baseline status text centered underneath the circular layout reading: "Remaining: 550 Kcal" highlighted cleanly in a distinctive Dark Mint Green font color (#10B981).

---

## 📊 Section 3: Macro Nutrients Distribution Ring Matrix
* **UI Layout:** Three-column horizontal flexible row grid directly linked layout-wise below the focal calories overview panel.
* **Core Component Elements (3 Independent Circular Progress Blocks):**
    * **Column 1 (Protein Ring Block):** * Top: Label string text "Protein" (Inter 12px Medium, #1E293B).
        * Middle: Mini circular progress indicator loop wheel component (Background track #E2E8F0, active dynamic foreground arc stroke uses an intense Rose Red Gradient #E11D48).
        * Bottom: Core tracking value text label reading "45g / 120g" (Inter 12px Regular, #64748B).
    * **Column 2 (Carbs Ring Block):** * Top: Label string text "Carbs" (Inter 12px Medium, #1E293B).
        * Middle: Mini circular progress indicator loop wheel component (Background track #E2E8F0, active dynamic foreground arc stroke uses a vibrant Orange Gradient #F59E0B).
        * Bottom: Core tracking value text label reading "180g / 250g" (Inter 12px Regular, #64748B).
    * **Column 3 (Fats Ring Block):** * Top: Label string text "Fats" (Inter 12px Medium, #1E293B).
        * Middle: Mini circular progress indicator loop wheel component (Background track #E2E8F0, active dynamic foreground arc stroke uses a rich Purple Gradient #8B5CF6).
        * Bottom: Core tracking value text label reading "35g / 70g" (Inter 12px Regular, #64748B).

---

## 🍽️ Section 4: Today's Logged Meals Food Grid List
* **UI Layout Section Header:** Title label string text "Today's Meals" (Inter 20px SemiBold, #1E293B) grouped horizontally alongside a right-aligned functional action link reading "View all" (#2ED5C5).
* **Core Data Component Matrix:**
    * **Vertical Item Cards Stack:** 16px Rounded Rectangular structural list containers (Background surface #FFFFFF, subtle crisp outline boundary line, light shadow).
    * **Each Logged Item Layout Matrix (Left-to-Right layout stack):**
        1. *Left-Center Information Stack:* *(Food image thumbnail completely removed)*.
            * Item Primary Name: "Pan-seared Chicken Breast" (Inter 16px SemiBold, color #1E293B).
            * Detailed Horizontal Macro-Badge Sub-row: Micro-text tokens grouping exact metrics together: `P: 35g` • `C: 0g` • `F: 4g` (Inter 12px Regular, Muted color #64748B).
        2. *Center-Right Total Intake Token:* Bold intake tag string explicitly noting target calorie contribution reading "+350 kcal" highlighted inside a neat, clean Green text layout string (#10B981).
        3. *Right Action Slot:* A standalone dedicated **"Three-Dots" (vertical ellipsis ⋮) contextual menu dropdown button anchor component** (Target touch space ≥ 44×44dp).
* **⚡ Interaction Layers & Menu State Triggers:**
    * **Action 1 (Swipe-Left Shortcut):** Dragging an item card row to the left dynamically reveals a solid background Red container area hosting a clean white garbage bin icon vector asset to trigger instant data deletion.
    * **Action 2 (Contextual Action Overlay Menu):** Tapping the vertical Three-Dots icon anchor instantly renders an anchored floating dropdown overlay list box providing two clear option paths:
        * Option Item 1: **"Update Entry"** link (Triggers an open state modal pop-up containing gram weight text fields).
        * Option Item 2: **"Delete Entry"** link (Triggers data removal from layout pipeline).

---

## 📈 Section 5: Weekly Calorie Analytics Line Chart Card
* **UI Layout Container:** 12px Rounded background card frame panel (Background solid #FFFFFF, Padding 16px).
* **Section Header Layout:** Title text string "Weekly Overview" (Inter 16px SemiBold, #1E293B) stacked above secondary descriptive sub-string layout reading "Calories consumed vs goal" (Inter 12px Regular, #64748B).
* **Graph Canvas Engine Layout Constraints:**
    * **X-Axis (Horizontal Scale Baseline):** Explicitly plots and prints the clear calendar markers representing specific absolute calendar contexts for the current week window (e.g., "18/05", "19/05", "20/05", "21/05", "22/05", "23/05", "24/05" day-month indicator formats).
    * **Y-Axis (Vertical Scale Baseline):** Clear numerical coordinate markers mapping total calorie scale bounds (e.g., 0 kcal to 3000 kcal scale boundaries).
    * **Data Path Overlays (2 Distinct Plotted Line Track Graphs):**
        1. **Line Path 1 (Target Daily Goal Horizon):** A static, crisp horizontal baseline threshold path vector graph line colored strictly in continuous **Mint Green / Cyan Blue (#2ED5C5)** representing the daily calculated target calorie budget.
        2. **Line Path 2 (Actual Client Consumption Graph):** An interactive, dynamic plotted line path charting actual values eaten daily across the calendar axis, colored strictly in high-contrast **Vibrant Crimson Red (#F44336)**. Clicking on individual data intersection nodes opens dynamic precise hovering tooltip bubbles overlaying text data summaries for that calendar instance.
