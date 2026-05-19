# Client Page 5: Main Dashboard - Daily Add Food Tab
* Platform: Mobile Portrait Layout (iPhone 15 Pro Max Viewport) with Fixed Bottom Tab Bar Navigation.
* Theme: Clean Light Mode (Background #F5F5F5)
* Navigation Bar Fixed Elements: Bottom tab bar (Background #FFFFFF, border top #E2E8F0) with 3 active navigation icon blocks: [Tracking, Daily (Selected Highlight), Profile]. Text/Icon color #1E293B when active, #64748B when inactive.

---

## 🔍 Section 1: Fixed Filter & Search Navigation Header Panel
* **UI Layout:** Sticky/fixed top panel container spanning full viewport width (Surface #FFFFFF, border bottom #E2E8F0, Shadow-1).
* **Core Interactive Input Elements:**
    * **Row 1 (Search Field Stack):** * An input search bar reading "Search food name..." (Inter 14px Regular, Surface #F5F5F5, leading magnifying glass icon).
        * Attached horizontally to a compact square "Search" button layout asset (Solid Mint Green #2ED5C5, dark icon or text #1E293B, 4px corner radius).
    * **Row 2 (Control Parameter Selector):** * Full-width Numerical Text Input slot explicitly labeled "Grams Input" (Initial placeholder text "100g", active numeric keyboard overlay constraint). *(Category Selector dropdown completely removed)*.

---

## 🍽️ Section 2: Dynamic Content Area & Live Calculation State Machine
* **UI Layout:** Centered scrollable canvas container area positioned between the fixed header panel and sticky bottom action bar.
* **Conditional UI Component States (2 Mutually Exclusive Views):**

### 🟢 State A: Food Match Found (Live Computed Results Card)
* **Container:** Main workspace card block (Surface solid #FFFFFF, 16px rounded profile edges, light crisp drop shadow elevation).
* **Internal Content Structural Stack:**
    * Text column: 
        * Title header text rendering dynamically based on search string and Grams Input, e.g., **"White Rice - Calculated for 50g input"** (Inter 16px SemiBold, color #1E293B).
        * Detailed Macro Breakdown Sub-text Matrix Row: Clean micro-tokens listing updated computed values calculated instantly against entered grams: `Calories: XX Kcal` • `Protein: Xg` • `Carbs: Xg` • `Fats: Xg` (Inter 12px Regular, distinctive theme label color #64748B).


### 🟡 State B: No Results Found (Inline Custom Food Addition Form)
* **Container:** Rendered instantly in place of State A when search API returns zero matches. Large 12px rounded info-container card (Surface #FFFFFF, crisp light red or amber warning accent badge boundary lines).
* **Internal Structural Elements:**
    * **Fallback Label Notice:** "No matches found. Create a custom food item below:" (Inter 14px Medium, color #64748B).
    * **Vertical Custom Form Stack (Spacing 12px, fields use Surface #F5F5F5, border #E2E8F0):**
        1. Input Field: "Food Name" text field (Auto-populates with the unmatched string typed in the search bar above).
        2. Input Field Row (Macros Grid): 
            * Box 1: "Calories (kcal)" numeric field.
            * Box 2: "Protein (g)" numeric field.
            * Box 3: "Carbs (g)" numeric field.
            * Box 4: "Fats (g)" numeric field.
    * **Instant Verification String:** Bottom text reading "Values will scale automatically based on the 'Grams Input' specified in the header panel."

---

## 📥 Section 3: Sticky Bottom Form Submission Action Bar
* **UI Layout:** Anchor container pinned rigidly to the viewport baseline layout grid right on top of the bottom tab bar navigation context.
* **Core Action Component Button:**
    * **Context 1 (State A active):** Full-width primary filled action button card labeled **"Add to Log Request"** (Solid Mint Green #2ED5C5, bold text #1E293B, 4px rounded corners). Triggers database logging update payloads: [Food ID reference, calculated weight log, calendar timestamp context].
    * **Context 2 (State B active):** Full-width secondary filled action button card labeled **"Create & Add Custom Food"** (Solid Electric Blue #3B82F6 or Deep Mint, bold text white #FFFFFF, 4px rounded corners). Triggers database schema creation and logs the newly engineered macro payload straight into the client tracker history timeline stream.
