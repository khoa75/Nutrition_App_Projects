# Task Completion Notification

When a user‑initiated operation finishes (e.g., a meal is logged, a food item is added, a profile update succeeds, or a background sync completes), display a transient **toast** notification that follows the UI‑UX spec.

## Visual Design
- **Position**: Bottom‑center on mobile, bottom‑right on desktop.
- **Size**: Up to 320 dp wide, 48 dp high.
- **Background colors**:
  - Success: `#4CAF50` (green)
  - Error:   `#F44336` (red)
  - Info:    `#2196F3` (blue)
- **Icon**: Left‑aligned, 20 dp, matching the toast type (check‑mark, error, info).
- **Border radius**: 8 dp.
- **Elevation**: Shadow‑2 – `0 4px 6px rgba(0,0,0,0.15)`.
- **Animation**: Slide‑up 200 ms on entry, fade‑out after 3 s.

## Interaction
- Auto‑dismiss after 3 seconds; user can tap to dismiss immediately.
- **Accessibility**:
  - `role="status"` for success/info, `role="alert"` for error.
  - `aria-live="polite"` (success/info) or `aria-live="assertive"` (error).
  - Does not steal focus.

## Code Snippets
### React (using `react-hot-toast`)
```tsx
import { toast } from 'react-hot-toast';

export const showSuccess = (msg: string) =>
  toast.success(msg, {
    duration: 3000,
    position: 'bottom-center',
    style: { background: '#4CAF50', color: '#fff' },
  });

export const showError = (msg: string) =>
  toast.error(msg, {
    duration: 4000,
    position: 'bottom-center',
    style: { background: '#F44336', color: '#fff' },
  });

export const showInfo = (msg: string) =>
  toast(msg, {
    duration: 3000,
    position: 'bottom-center',
    style: { background: '#2196F3', color: '#fff' },
  });
```
### Flutter
```dart
ScaffoldMessenger.of(context).showSnackBar(
  SnackBar(
    content: Text('Meal logged successfully'),
    backgroundColor: Colors.green,
    behavior: SnackBarBehavior.floating,
    duration: const Duration(seconds: 3),
  ),
);
```

## Typical Use Cases
- **Meal logged** → `showSuccess('Meal logged!')`
- **Food added** → `showSuccess('Food added to catalog')`
- **Profile saved** → `showSuccess('Profile updated')`
- **Sync error** → `showError('Failed to sync data')`
- **Validation warning** → `showInfo('Please fill required fields')`

---
*This file provides a standalone reference for implementing consistent task‑completion toasts across the Nutrition App.*