---
name: front-end
description: React-Native mobile app architecture, state management, API client patterns, and React admin dashboard
license: Apache-2.0
compatibility: opencode
---
## 1. React-Native (Mobile App) Architecture
```
src/
├── core/          # Theme, constants, network client, navigation
├── modules/       # Feature modules mirror backend
│   ├── auth/      # Login, Register screens
│   ├── profile/   # BMI, user profile & goal settings
│   ├── food/      # Search, food catalog browsing
│   ├── meal/      # Manual meal logging
│   ├── plan/      # Meal plan viewer
│   └── dashboard/ # Charts & progress
└── App.tsx
```

## 2. State Management
- Use **React Context + useReducer** for global auth state
- Use **React Query (TanStack Query)** for server state / API calls (auto caching, refetching)
- Local form state: `useState` / `useForm` (React Hook Form)
- All API calls go through a centralized `apiClient` with JWT interceptor (Axios)

## 3. API Client Pattern
```typescript
// src/core/apiClient.ts
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Request interceptor: auto-attach JWT Bearer token
// Response interceptor: auto-refresh on 401, unwrap ApiResponse<T>
```

## 4. Screen Templates (per module)
- `{Feature}Screen.tsx` → custom hook `use{Feature}` → `apiClient`
- Every screen handles Loading / Error / Empty states
- Navigation via React Navigation (Stack + Tab navigators)

## 5. React (Admin Dashboard) Patterns
```
src/
├── components/   # Reusable UI (Table, SearchBar, StatsCard)
├── pages/        # AdminUsers, AuditLogs, SystemHealth
├── hooks/        # useAuth, useApi, usePagination
├── services/     # Axios client with JWT interceptor
└── contexts/     # AuthContext, ThemeContext
```

## 6. Key UI Screens (React-Native)
| Screen | Module | Route |
|--------|--------|-------|
| Login/Register | auth | AuthStack |
| Profile Onboarding | profile | /profile/onboarding |
| Food Search | food | /food/search |
| Meal Log | meal | /meal/log |
| Weekly Dashboard | dashboard | /dashboard |
| Daily Plan | plan | /plan/daily |

## 7. Data Visualization
- **React-Native**: `react-native-chart-kit` or `Victory Native` for calorie/weight line charts
- **React**: `Recharts` for admin analytics
- Chart colors match UI design tokens in `.opencode/context/04-ui-ux/`
