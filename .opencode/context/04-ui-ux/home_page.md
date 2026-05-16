# Home Page Prompt (Post‑Login)

The first screen a user sees after a successful login should be a **personalized welcome prompt** that encourages immediate interaction with the core features (food catalog and meal logging). The design follows the UI‑UX spec (Modern Mint palette, rounded cards, elevation) and is implemented as a reusable component in the React admin dashboard.

---
## Visual Layout
- **Container**: `max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md` (elevation 1).
- **Title**: `Nutrition Tracker` – `text-2xl font-bold text-gray-800 mb-4`.
- **Greeting** (conditional): `text-lg text-gray-700 mb-4`.
- **Name Input Form** (shown only on first visit):
  - Label: `text-sm font-medium text-gray-600`.
  - Input: `px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary`.
  - Submit button: `mt-2 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors`.
- **Action Buttons** (always visible):
  - `Browse Food Catalog` – secondary style: `bg-secondary text-gray-800 rounded hover:bg-secondary-dark`.
  - `Log a Meal` – primary style: `bg-primary text-white rounded hover:bg-primary-dark`.
- **Spacing**: `mt-6 flex gap-4` between the two action buttons.

---
## Interaction Flow
1. **First Visit** – No name stored:
   - Prompt shows the input form.
   - User enters a name and clicks **Continue**.
   - The component stores the name in local state (or in `localStorage` for persistence) and displays a greeting: `👋 Welcome back, <name>! Ready to log your meals?`.
2. **Returning Visit** – Name already known:
   - Greeting appears immediately; the form is hidden.
3. **Action Buttons**:
   - **Browse Food Catalog** → navigates to `/catalog`.
   - **Log a Meal** → navigates to `/meal-tracker`.
   - Both buttons have a subtle hover transition and a focus ring (`focus:ring-2 focus:ring-primary`).

---
## Accessibility
- All interactive elements have a minimum touch target of **44 × 44 dp**.
- Input has `aria-label="Your name"` and the form uses `role="form"`.
- Buttons include `aria-pressed="false"` (default) and proper `type="button"`/`type="submit"` attributes.
- Focus ring color: `#FFB400` (accent).
- Text contrast meets WCAG AA (≥ 4.5:1).

---
## Reusable Component (React/TS)
```tsx
export const HomePrompt: React.FC = () => { /* implementation as described */ };
```
Exported as default for easy import:
```tsx
import HomePrompt from '@/pages/HomePrompt';
```
Place it in the **Home** route (`/src/pages/Home.tsx`) right after the authentication guard.

---
## Localization
- All static strings are stored in a `i18n` JSON file with keys `home.title`, `home.greeting`, `home.enterName`, `home.continue`, `home.browseCatalog`, `home.logMeal`.
- The component reads the current locale (`en` or `vi`) and renders the appropriate language.

---
## Future Enhancements
- **Avatar personalization** – show the user's profile picture next to the greeting.
- **Daily tip** – fetch a random nutrition tip from the backend and display it under the greeting.
- **Animated entrance** – use `framer-motion` to fade‑in the card on mount.

---
*This prompt is ready to be turned into a functional component and integrated into the post‑login flow.*