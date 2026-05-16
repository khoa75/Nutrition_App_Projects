# UI‑UX Detailed Specification

## 1. Global Design Foundations
| Aspect | Specification |
|--------|----------------|
| **Color Palette** | Primary: `#2ED5C5` (Mint), Secondary: `#A3E4D7` (Light Mint), Accent: `#FFB400` (Sunshine Yellow), Neutral: `#F5F5F5` (Background), `#212121` (Text). All combos meet WCAG AA contrast (≥4.5:1). |
| **Typography** | Headings: **Inter** – 700 weight, sizes 32‑24‑20‑18 px. Body: **Inter** – 400 weight, 16 px (mobile) / 14 px (desktop). Use `rem` units. |
| **Spacing** | 8‑point grid; margins/paddings multiples of 8 px (8, 16, 24, 32…). |
| **Iconography** | Feather icons (stroke 2 px). Outline for default, filled for active. |
| **Corner Radius** | 8 px cards, 12 px modals, 4 px buttons. |
| **Elevation** | Shadow‑1: `0 1px 3px rgba(0,0,0,0.12)`. Shadow‑2: `0 4px 6px rgba(0,0,0,0.15)`. |
| **Motion** | 200 ms ease‑out for UI transitions, 300 ms for page navigation. |
| **Accessibility** | Touch target ≥ 44 × 44 dp, focus ring `2px solid #FFB400`, ARIA labels for icons/forms, optional dark‑mode with `prefers-color-scheme`. |

## 2. Navigation Structure
| Area | Elements | Behavior |
|------|----------|----------|
| **Top App Bar** (desktop) | Logo, nav links (Home, Food Catalog, Meal Tracker, Dashboard, Profile), user avatar dropdown. | Sticky, collapses to hamburger < 768 px. |
| **Bottom Tab Bar** (mobile) | 5 tabs with icons+labels. | Active tab highlighted, haptic feedback. |
| **Side Drawer** (tablet/desktop) | Mirrors top links + Settings, Help. | Slides from left, overlay darkens, dismiss on outside tap/ESC. |
| **Breadcrumbs** (dashboard) | Home > Dashboard > [Section]. | Clickable for quick navigation. |

## 3. Screens & Detailed UI Elements
### 3.1 Home / Landing
- **Hero**: Full‑width image, dark overlay, headline, primary CTA button.
- **Feature Cards**: 3‑column grid (desktop) or carousel (mobile). Icon, title, short text, “Learn More”.
- **Testimonials**: Auto‑rotating carousel, avatar, quote.
- **Footer**: 4 columns – About, Resources, Legal, Social.

### 3.2 Food Catalog
- **Search Bar**: Persistent, debounce 300 ms, clear button.
- **Filter Modal**: Slide‑up (mobile) / side panel (desktop) – categories, calorie range slider, Apply.
- **Result Grid**: Cards 160 × 200 px, image, name, macro badge, hover elevation.
- **Infinite Scroll** with skeleton loaders.
- **Detail Page**: Header image, sticky “Add to Meal” FAB, nutrition table, similar foods carousel.

### 3.3 Meal Tracker
- **Day Overview**: Horizontal date picker.
- **Meal Sections**: Collapsible cards with “Add Food”.
- **Add Food Dialog**: Searchable dropdown, quantity stepper, unit toggle, real‑time macro summary.
- **Progress Bar**: Circular calorie goal, macro distribution.
- **History Timeline**: Vertical list, expandable entries.

### 3.4 Dashboard (Analytics)
- **Header**: Date range selector (Today, Week, Month, Custom).
- **Key Metrics Row**: Cards for Calories, Protein %, Carb %, Fat % with delta arrows and sparkline.
- **Charts**: Line (daily calories), Stacked Bar (macro per day), Radar (nutrient balance vs targets).
- **Export Button**: CSV/PDF modal.
- Responsive: two‑column desktop, stacked mobile.

### 3.5 Profile & Settings
- **Profile Header**: Avatar, name, email, edit icon.
- **Account Settings**: Username, email (read‑only), password change with validation.
- **Preferences**: Toggles – Dark Mode, Push Notifications, Daily Reminder Time picker.
- **Connected Apps**: Google Fit, Apple Health – connect/disconnect.
- **Logout**: Red button with confirmation modal.

### 3.6 AI Vision Integration (Future)
- **Capture FAB** on Meal Tracker opens camera/file picker.
- **Loading Overlay** with spinner “Analyzing image…”.
- **Result Snackbar**: “Detected X items – add to meal?” with actions.

## 4. Interaction Details
| Interaction | Description |
|-------------|-------------|
| **Button States** | Default primary `#2ED5C5`; Hover darken 10 %; Pressed darken 20 %; Disabled opacity 0.4. |
| **Form Validation** | Inline error text red `#D32F2F`, icon, auto‑scroll to first error. |
| **Toast Notifications** | Bottom‑center, auto‑dismiss 3 s, slide‑in/out. Types: Success (green), Error (red), Info (blue). |
| **Pull‑to‑Refresh** | Home & Dashboard trigger data reload with top spinner. |
| **Swipe Actions** (Meal list) | Swipe left → Delete (red), swipe right → Edit (blue). |
| **Keyboard Navigation** | Logical tab order, focus ring, Enter triggers default button. |
| **Error Pages** | 404 friendly illustration, link home; 500 “Something went wrong”, retry button. |

## 5. Component Library (Reusable)
| Component | Props | Notes |
|-----------|-------|-------|
| **Button** | `variant` (primary, secondary, outline), `size` (sm, md, lg), `disabled` | Styled‑components (React) / ElevatedButton (Flutter). |
| **Card** | `elevation` (1‑2), `onClick` | Hover elevation increase on desktop. |
| **Modal** | `title`, `isOpen`, `onClose`, `size` | Focus trap, ESC closes, background scroll locked. |
| **FAB** | `icon`, `onPress` | Fixed position, ripple effect. |
| **ProgressCircle** | `value` (0‑100), `size` | Animated stroke. |
| **DatePicker** | `mode` (single, range), `locale` | Native pickers on iOS/Android. |
| **Chart** | `type` (line, bar, radar), `data`, `options` | Wrapper around Chart.js / fl_chart. |
| **Toast** | `message`, `type` (success, error, info) | Queue handling, auto‑dismiss. |

## 6. Accessibility Checklist
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- ARIA labels for icons, custom controls, charts.
- Contrast ≥ 4.5:1 (verified with Lighthouse).
- Focus management for modals/dialogs.
- Touch target ≥ 44 × 44 dp.
- Keyboard shortcuts: `Ctrl+K` global search, `Esc` close dialogs, `Alt+1‑5` switch bottom tabs.

## 7. Documentation & Handoff
1. **Design System File** – Export Figma/Sketch library with colors, typography, components, interactions.
2. **Component Spec Docs** – Markdown under `docs/ui/` describing each reusable component, props, examples, accessibility notes.
3. **Style Guide** – Spacing, layout grids, responsive breakpoints (mobile < 768 px, tablet 768‑1024 px, desktop > 1024 px).
4. **Prototype Links** – Interactive prototype URLs for major flows (Home → Catalog → Add → Dashboard).

## 8. Next Steps for Implementation
| Step | Owner | Deliverable |
|------|-------|-------------|
| **Finalize Design System** | UI/UX Designer | Figma library + component spec markdown. |
| **Create React Component Library** | Front‑end Dev | `src/components/` with Button, Card, Modal, Chart wrappers. |
| **Integrate with Flutter** | Mobile Dev | Dart widget equivalents, theme data matching palette. |
| **Add Accessibility Tests** | QA / Tester | Axe‑core CI integration, unit tests for ARIA. |
| **Update Documentation** | Docs Writer | `docs/ui/README.md` linking specs & prototypes. |
| **Review & Sign‑off** | Project Lead | Walkthrough of all screens, confirm compliance. |

---
*All UI‑UX details are now fully documented for immediate implementation.*