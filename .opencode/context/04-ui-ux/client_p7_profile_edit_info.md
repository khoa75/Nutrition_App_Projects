# Client Page 7: Profile Sub-Page - Edit Information Form
* Platform: Mobile Portrait Layout (iPhone 15 Pro Max Viewport) with Top navigation back button toolbar.
* Theme: Clean Light Mode (Background #F5F5F5)

---

## 🎛️ Section 1: Top Header Navigation Bar
* **UI Layout:** Sticky top header strip panel context (Background Surface #FFFFFF, border bottom rule alignment line #E2E8F0).
* **Component Elements:** Left-aligned clickable [Back Arrow Icon Button] (Action: Pops view back instantly to Client Page 6 hub root) + Centered Page title label text string "Edit Personal Profile" (Inter 16px SemiBold, #1E293B).

---

## 📝 Section 2: Vertical Profile Configuration Form Field Stack
* **UI Layout Container:** Scrollable vertical content workspace block layout. All interactive text data inputs use pure Background Surface #FFFFFF, border outlines #E2E8F0, active focused typography #1E293B. *(Profile Avatar image picker element is completely excluded)*.
* **Core Form Component Matrix Elements:**
    1.  **Full Name:** Editable text box wrapper with input text string pre-filled.
    2.  **Email:** Disabled locked input card field widget displaying a read-only grayed-out structural template style containing the user's permanent primary key email account.
    3.  **Gender:** Dropdown selector element menu row block opening native choosing prompts.
    4.  **Body Metrics Entry Grid Row (Two-column split layout element):**
        * Left input field box: "Current Height (cm)" numerical keyboard entry slot.
        * Right input field box: "Current Weight (kg)" numerical keyboard entry slot.
    5.  **Metrics Feedback Sub-Row (Flex block layout framework):**
        * Static Cell Left: Read-Only text field component tracking computed live "Body Mass Index (BMI)" score.
        * Static Cell Right: **BMI Status Read-only Badge** displaying the active tier mapped directly to backend `BmiStatusEnum` values: `UNDERWEIGHT`, `NORMAL`, `OVERWEIGHT`, `OBESITY_LEVEL_1`, `OBESITY_LEVEL_2`.
    6.  **Target Weight Objective Field:** Labeled "Target Weight (kg)" accepting clean numeric metrics data entries.
    7.  **Birthdate Picker Box:** Integrated inline DatePicker modal selection field card displaying a decorative trailing calendar grid micro-icon element asset.
    8.  **Activity Level Dropdown Selector:** Menu text block field labeled "Current Activity Index Scale" mapped directly to process string payloads bound to backend `ActivityLevelEnum` keys:
        * Dropdown Selection Menu array list: `SEDENTARY`, `LIGHT_ACTIVE`, `ACTIVE`, `VERY_ACTIVE`.

---

## 💾 Section 3: Floating Action Confirmation Footer
* **UI Layout:** Bottom horizontal multi-column layout grid block positioned with a strict proximity spacing margin of 32px below the form stack.
* **Component Buttons:**
    * Column Left: [Discard Changes] neutral outline gray button layout element container.
    * Column Right: [Save Changes] filled bold layout button card (Solid Mint Green background layout surface #2ED5C5, text dark solid color #1E293B).

