# Client Page 2: Health Profile Metrics Onboarding
* Platform: Mobile Portrait Layout (iPhone 15 Pro Max Viewport)
* Theme: Clean Light Mode (Background #F5F5F5)
## UI Layout & Components
* **Header Section:**
    * Title text "Tell Us About Yourself" (Inter 24px Bold, color #1E293B).
* **Scrollable Vertical Form Container (Surface #FFFFFF cards with crisp Shadow-1 elevation):**
    * **Personal Inputs Stack:**
        * Label + Fullname text field (placeholder "John Doe", text color #1E293B, border #E2E8F0).
        * Label + Gender segmented radio picker blocks layout: [Male | Female | Other] (Inactive background #F5F5F5, Active background #2ED5C5 with text #1E293B).
        * Label + Birthdate picker box container featuring a calendar trailing icon (Text color #1E293B).
    * **Body Metrics Layout (Two-column responsive row):**
        * Left Column: Height text box wrapper with "cm" label suffix.
        * Right Column: Weight text box wrapper with "kg" label suffix.
        * Sub-row Cell 1: Read-only data card displaying calculated live "BMI Score: XX.X" using a subtle light gray tint background (#F5F5F5).
        * **Sub-row Cell 2: BMI Status Read-only Badge** (Displays health classification text mapped directly to `BmiStatusEnum` values):
            * Expected display states: `UNDERWEIGHT`, `NORMAL`, `OVERWEIGHT`, `OBESITY_LEVEL_1`, `OBESITY_LEVEL_2`.
    * **Target Strategy Selector Area:**
        * Section Title: "Select Goal Strategy" (#1E293B).
        * Target Weight (kg) (numerical input text field, border #E2E8F0).
        * Layout: Three distinct 8px rounded grid option blocks layout: [Lose Weight | Maintain | Gain Weight]. 
        * Visual States: Default state background is pure #FFFFFF with #E2E8F0 border. The selected option is dynamically highlighted with a crisp Mint Green #2ED5C5 border outline line, a light 10% opacity mint background tint fill, and dark text (#1E293B).
    * **Weekly Intensity Target Widget:**
        * Label: "Target rate per week" (#1E293B).
        * Component: Linear horizontal slider bar track component. Node thumb is colored Mint Green #2ED5C5, displaying live scale values boundary indicators ranging from "0.0 kg" minimum up to "1.0 kg" maximum per week.
    * **Activity Index Selector Row:**
        * Label: "Activity Index Level" (#1E293B).
        * **Component: Selection menu mapped directly to `ActivityLevelEnum` options**:
            * Dropdown / Radio Pill Options: `SEDENTARY`, `LIGHT_ACTIVE`, `ACTIVE`, `VERY_ACTIVE`.
            * Visual States: Default pill background uses #FFFFFF with a subtle border. Active selected pill switches to Mint Green #2ED5C5 background with solid dark text (#1E293B).
* **Action Button Area (Proximity Layout):**
    * *Constraint:* Placed directly underneath the form container stack with a strict fixed vertical spacing margin of **32px** (No absolute bottom pinning or Spacer layout elements to avoid separation on tall viewports).
    * CTA Button: "Submit" large primary action button widget (Solid Mint Green #2ED5C5 card, bold text #1E293B, 4px corner radius, Shadow-2 elevation).
