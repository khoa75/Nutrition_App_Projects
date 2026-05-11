# AI Food Recognition Screen (Food AI Scanner)

This screen is the core feature that defines the app's breakthrough nature. The interface needs to be deeply technological (Sci-Fi, Futuristic) yet intuitive and easy to use.

## 1. Camera View (Viewfinder)
When the user clicks "Scan Food" from the Dashboard, the Camera screen opens in full screen.

- **Background**: Live stream from the phone's camera. Overlaid with a vignette at the corners to focus attention on the center.
- **UI Overlay**:
  - **Bounding Box**: A square frame in the center with 4 corners marked by bright white lines. These lines move with a subtle breathing animation to indicate AI activity.
  - **Scan Line**: A horizontal `#10B981` (Mint Green) line with a glow effect that continuously slides up and down within the bounding box, mimicking a laser scanner effect.
  - **Top Corner**: An `X` icon to close the camera.
  - **Bottom Corner**: A large, circular white shutter button. Secondary buttons for "Select from Gallery" on the left and "Toggle Flash" on the right.

## 2. Processing State
After the shutter button is pressed, the image freezes.
- A black overlay layer covers the image (`rgba(0,0,0, 0.6)`).
- The text "AI is analyzing calorie content..." appears in the center, with a ripple-effect loading animation consisting of concentric circles expanding outwards in Primary Green.
- Micro-animations: Rapidly scrolling numbers (matrix style) in the background enhance the high-tech analysis feel.

## 3. Analysis Result Modal (Bottom Sheet Result)
After the FastAPI API returns results (typically under 2s), a Bottom Sheet slides up from the bottom.

- **Entrance Effect**: Smoothly slides up from the bottom (Slide Up), with a dark **Glassmorphism** background (`#1E293B` with 20px blur).
- **Top Sheet Content**: A small light-gray drag handle.
- **AI Data Returned**:
  - **Confidence Badge**: In the right corner, a small tag: "Confidence: 92% AI Match" in green or yellow depending on the level.
  - **Dish Name (Title)**: Large, prominent text (e.g., "Grilled Pork Chop Rice").
  - **Total Calories (Highlight)**: A huge number in Blue Gradient: "780 Kcal".
  
- **Nutritional Breakdown (Macro Breakdown)**:
  - Grid layout (3 columns).
  - Block 1: Red column, labeled "Protein", "35g".
  - Block 2: Orange column, labeled "Carbs", "80g".
  - Block 3: Purple column, labeled "Fats", "20g".
  - These blocks have light backgrounds corresponding to the text color and 12px rounded corners.

## 4. Confirmation Actions (CTAs)
- Primary Button (Call To Action): **"Add to Log"** (Large Mint Green Glow Button spanning 100% width).
- Secondary link directly below: "Information incorrect? Edit manually" (Small underlined text, Slate 400). When clicked, the AI data blocks above turn into input fields for the user to re-enter text/numbers.
