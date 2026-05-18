# UI Component Spec: Error Messages & System Fault Screens
*   Platform: Universal Responsive Viewport Layouts
*   Theme: Alert Warning Indicators - Light Mode Uniform

## Component 1: Critical Error Toast Notification Banner
*   Container: Rectangular horizontal banner card frame with sharp 8px rounded corners.
*   Visual Parameters: Solid Background Red (#F44336), White text contrast.
*   Internal Layout items:
    *   Left item: Triangular exclamation alert danger warning icon sign asset (20dp size).
    *   Body text string: "Sync failed. Please check internet connection." (Inter 14px text white).

## Component 2: Overloaded Server / Timeout Error Screen (Full Page State)
*   Platform Target: Full Screen Viewport Replacement (When request exceeds 30 seconds limit).
*   Background Base: Light Gray / Off-White (#F5F5F5 for Client App / #FAFAFA for Admin Web).
*   Central UI Block layout:
    *   Graphic Asset: A friendly, humorous vector illustration of a sleeping lazy food mascot character or a disconnected plug outline wire.
    *   Headline: Text "Oops! The Server is Overloaded" (Inter 24px Bold weight, color #1E293B / #212121).
    *   Explanatory Sub-text: "This process is taking longer than expected. Our nutrition bots are working hard to fix this." (Color #64748B / #757575, centered alignment).
*   Interactive UI Anchor: Prominent, highlighted [Try Again] Primary Action Button (Mint Green #2ED5C5 with dark text for Mobile / Deep Indigo #303F9F with white text for Admin Web) to trigger data refresh.
