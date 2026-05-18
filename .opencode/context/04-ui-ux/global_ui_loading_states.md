# UI Component Spec: Loading States & Shimmer Skeletons
*   Platform: Mobile Portrait (iPhone 15) & Web Desktop Viewport
*   Theme: Light Mode Unified (Clean Light / Admin Light)

## Component 1: Mobile List Item Skeleton Loader (Shimmer Effect)
*   Container: 16px Rounded Card layout (Background #FFFFFF, light shadow border #E2E8F0).
*   Visual Elements:
    *   Left Slot: 48x48px Square box with 8px rounded corners (Solid Light Gray animation block representing Food Thumbnail).
    *   Center Stack: Two horizontal rectangular bars with rounded edges representing text lines. Top bar length 60% width (Title), Bottom bar length 40% width (Subtitle). Uses color #E2E8F0.
    *   Right Slot: Small rounded rectangle gray block representing the calorie tag.
*   Animation Context: 10% to 20% opacity continuous shifting gradient mask (Shimmer).

## Component 2: Full Screen AI Vision Scanning Overlay (Mobile View)
*   Base Layer: Blurry semi-transparent Light Mask (White #FFFFFF with 80% opacity overlay covering the entire viewport).
*   Center Focused Object:
    *   Graphic: A circular food plate silhouette line-art icon asset (Mint Green #2ED5C5 outline stroke).
    *   Effect element: A horizontal glowing neon laser beam line (#10B981) scanning vertically up and down across the plate icon.
*   Text Status Indicator Stack:
    *   Primary Text: "Using AI to recognize your dish..." (Inter 16px Medium, Dark text #1E293B).
    *   Sub-text carousel label: "Calculating calorie count..." (Color #64748B).
*   Bottom Banner Widget: "Daily Nutrition Tip: Drinking water before meals helps control portion sizes naturally." (Small card background #F5F5F5, centered text #1E293B, opacity 90%).

## Component 3: Inline Button Processing Spinner
*   Visual Component: Primary action button styled in a disabled state (Background Gray #E2E8F0, text opacity 50%, color #64748B).
*   Internal Layout: A circular 360-degree rotating loading loop line graphic icon placed strictly to the left of the button text reading "Processing...".
