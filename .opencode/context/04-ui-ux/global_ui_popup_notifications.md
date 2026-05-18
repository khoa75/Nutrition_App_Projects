# UI Component Spec: Confirmation Dialogs & Interactive Modals
*   Platform: Web Admin Table UI & Mobile App Navigation Contexts
*   Theme: Light Mode Validation Screens

## Component 1: Glassmorphism Confirmation Alert Box (Admin Actions)
*   Container Layer: Centered Dialog box wrapper (Scale up transition anchor from center screen).
*   Visual Styling: Frosted Light Glassmorphism card effect background (White blur backdrop overlay with a thin crisp #E0E0E0 border outline boundary framework line).
*   Layout Structure:
    *   Header label: "Lock User Account?" (Inter 18px Bold Red alert emphasis style typography text #D32F2F).
    *   Body statement: "Warning: This administrative action will restrict user login access immediately. Are you sure you want to proceed?" (Text color #212121).
*   Action Buttons Grid Row:
    *   Left side slot: [Cancel Request] sleek outline dark border button frame.
    *   Right side slot: [Confirm Lock Account] solid warning accent color crimson red text button card element (Background #D32F2F, text white).

## Component 2: Quick Action Bottom Sheet Drawer (Mobile Vision Feedback)
*   Container Layout: Bottom slide-up drawer card container anchored to the base interface (Slide-up motion framework animation layout).
*   Visual Design: 16px Top-Left & Top-Right rounded edge curves framing, background solid pure white #FFFFFF with soft drop shadow backing.
*   Header Section: Small gray horizontal swipe pill handle bar element centered at the very top edge (#E2E8F0).
*   Content Components Stack:
    *   Title notification text block: "AI Vision Detected 3 Food Items! 🥑" (Inter 18px Bold Dark color #1E293B).
    *   Interactive Chip Matrix Rows: Horizontal grid layout row containing pill tags: [Avocado Salad chip] + [Grilled Chicken Slice chip] + [Boiled Brown Rice chip] (Background #F5F5F5, text #1E293B). Each chip item includes a small 'x' delete tag icon indicator button.
*   Action Footer Row Grid: 
    *   Button element 1: [Edit Items manually] light gray background block button (Background #E2E8F0, text #1E293B).
    *   Button element 2: [Add items directly to Meal tracker log] Primary Highlighted Mint Green #2ED5C5 filled button layout container (Text #1E293B).
