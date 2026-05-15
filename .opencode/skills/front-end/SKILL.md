---
name: front-end
description: Flutter mobile app architecture, Riverpod state management, API client patterns, and React admin dashboard
license: Apache-2.0
compatibility: opencode
---
## 1. Flutter (Mobile App) Architecture
```
lib/
├── core/          # Theme, constants, network client, DI
├── modules/       # Feature modules mirror backend
│   ├── auth/      # Login, Register, OTP screens
│   ├── profile/   # BMI, weight tracking
│   ├── food/      # Search, catalog browsing
│   ├── meal/      # Manual + AI meal logging
│   ├── plan/      # Meal plan viewer
│   └── dashboard/ # Charts & progress
└── main.dart
```

## 2. State Management (Riverpod)
- `StateNotifierProvider` for form state
- `FutureProvider` for API calls
- `StreamProvider` for real-time weight updates
- All API calls go through a centralized `ApiClient` with JWT interceptor

## 3. API Client Pattern
```dart
class ApiClient {
  final Dio _dio;
  
  // Auto-attach JWT Bearer token
  // Auto-refresh on 401
  // Wrap responses into ApiResponse<T> envelope
}
```

## 4. Screen Templates (per module)
- `{Feature}Screen.dart` → `{Feature}Controller.dart` → `ApiClient`
- Controllers use Riverpod, screens are ConsumerWidget
- Loading/Error/Empty states in every screen

## 5. React (Admin Dashboard) Patterns
```
src/
├── components/   # Reusable UI (Table, SearchBar, StatsCard)
├── pages/        # AdminUsers, AuditLogs, SystemHealth
├── hooks/        # useAuth, useApi, usePagination
├── services/     # Axios client with JWT interceptor
└── contexts/     # AuthContext, ThemeContext
```

## 6. Key UI Screens (Flutter)
| Screen | Module | Route |
|--------|--------|-------|
| Login/Register | auth | /auth |
| BMI Input Form | profile | /profile/onboarding |
| Food Search | food | /food/search |
| AI Camera | meal | /meal/camera |
| Meal Log | meal | /meal/log |
| Weekly Dashboard | dashboard | /dashboard |
| Daily Plan | plan | /plan/daily |

## 7. Data Visualization
- **Flutter**: `fl_chart` for calorie/weight line charts
- **React**: `Recharts` for admin analytics
- Chart colors match UI design tokens in `.opencode/context/04-ui-ux/`
