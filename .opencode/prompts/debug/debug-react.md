---
name: debug-react
description: React admin dashboard debugging patterns, common issues, and resolution workflows
license: Apache-2.0
compatibility: opencode
---

## 1. Debug Workflow

```
1. Reproduce in browser DevTools
2. Check React DevTools component tree and props
3. Inspect Redux state in Redux DevTools
4. Review Network tab for API failures
5. Check Console for errors and warnings
6. Write a failing test, fix, verify
```

## 2. Common Issues & Solutions

### App Won't Start
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Check for TypeScript errors
npx tsc --noEmit

# Start with verbose logging
npm run dev -- --debug
```

### Redux State Not Updating
```tsx
// ❌ WRONG: Mutating state directly
state.users.push(newUser);

// ✅ CORRECT: Return new state (immer handles this in Redux Toolkit)
state.users = [...state.users, newUser];

// ❌ WRONG: Dispatching without async thunk
dispatch({ type: 'users/load' });

// ✅ CORRECT: Use createAsyncThunk
dispatch(fetchUsers());
```

### Axios Network Errors
```tsx
// Enable request/response logging
axios.interceptors.request.use(config => {
  console.log(`[API] ${config.method?.toUpperCase()} ${config.url}`, config.data);
  return config;
});

axios.interceptors.response.use(
  response => response,
  error => {
    console.error('[API Error]', error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);

// Common error handling
try {
  const response = await axios.get('/api/users');
} catch (error) {
  if (axios.isAxiosError(error)) {
    switch (error.response?.status) {
      case 401:
        // Redirect to login or refresh token
      case 403:
        // Show permission denied
      case 404:
        // Show not found
      case 500:
        // Show server error
    }
  }
}
```

### Component Not Re-rendering
```tsx
// ❌ WRONG: Using index as key
{items.map((item, index) => <UserRow key={index} {...item} />)}

// ✅ CORRECT: Use stable unique key
{items.map(item => <UserRow key={item.id} {...item} />)}

// ❌ WRONG: Creating new objects in render
const config = { pageSize: 10 }; // New object every render
<Table pagination={config} />

// ✅ CORRECT: Memoize or use constant
const config = useMemo(() => ({ pageSize: 10 }), []);
```

### Infinite Re-render Loop
```tsx
// ❌ WRONG: Calling function in render
useEffect(() => {
  fetchData(); // fetchData is recreated every render
}, [fetchData]);

// ✅ CORRECT: Use useCallback
const fetchData = useCallback(async () => {
  const data = await api.getUsers();
  setUsers(data);
}, []);

useEffect(() => {
  fetchData();
}, [fetchData]);

// Or use useRef for mutable values that don't trigger re-renders
```

## 3. React DevTools

**Install:** Browser extension (Chrome/Firefox)

**Key features:**
- **Components tab**: Component tree, props, state, hooks
- **Profiler tab**: Render timing, why-did-you-render
- **Highlight updates**: Visualize re-renders

**Common checks:**
- Props changing unexpectedly
- Unnecessary re-renders (use React.memo)
- Hook dependency arrays missing values

## 4. Debugging Redux Toolkit

```tsx
// Enable Redux logging in development
import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';

export const store = configureStore({
  reducer: { ... },
  middleware: (getDefault) =>
    process.env.NODE_ENV === 'development'
      ? getDefault().concat(logger)
      : getDefault(),
});

// Debug async thunks
export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (params, { rejectWithValue }) => {
    try {
      console.log('[Thunk] Fetching users with params:', params);
      const response = await api.getUsers(params);
      console.log('[Thunk] Received:', response.data.length, 'users');
      return response.data;
    } catch (error) {
      console.error('[Thunk] Failed:', error);
      return rejectWithValue(error.message);
    }
  }
);
```

## 5. Debugging React Router

```tsx
// Enable route logging
const router = createBrowserRouter(routes, {
  future: {
    v7_startTransition: true,
  },
});

// Common issues:
// - Route not matching: Check path pattern exactly
// - Params undefined: Use useParams() correctly
// - Nested routes: Ensure outlet is rendered in parent
// - Navigation not working: Use useNavigate() hook

// Debug current route
function RouteDebugger() {
  const location = useLocation();
  console.log('[Router] Current path:', location.pathname);
  console.log('[Router] Search params:', location.search);
  return null;
}
```

## 6. Debugging Ant Design Components

```tsx
// Common Ant Design issues:

// Table not showing data
// ✅ Ensure dataSource is an array, not undefined
<Table dataSource={users ?? []} columns={columns} />

// Form validation not triggering
// ✅ Ensure Form.Item has name prop
<Form.Item name="email" rules={[{ required: true }]}>
  <Input />
</Form.Item>

// Modal not closing
// ✅ Control visible state properly
const [open, setOpen] = useState(false);
<Modal open={open} onCancel={() => setOpen(false)} />
```

## 7. Performance Debugging

```tsx
// Identify unnecessary re-renders
import { whyDidYouRender } from '@welldone-software/why-did-you-render';
if (process.env.NODE_ENV === 'development') {
  whyDidYouRender(React, { trackAllPureComponents: true });
}

// Common performance fixes:
// 1. React.memo for expensive components
// 2. useMemo for expensive calculations
// 3. useCallback for function props
// 4. Virtual scrolling for large lists (react-window)
// 5. Code splitting with React.lazy
```

## 8. TypeScript Debugging

```bash
# Check for type errors
npx tsc --noEmit

# Watch mode for continuous checking
npx tsc --noEmit --watch

# Common TS issues:
# - 'any' types: Use proper interfaces
# - Missing null checks: Use optional chaining (?.)
# - Union type errors: Use type guards
```

## 9. Quick Debug Checklist

- [ ] `npm install` succeeds
- [ ] `npx tsc --noEmit` shows no errors
- [ ] No unhandled promise rejections in console
- [ ] Redux state updates correctly in DevTools
- [ ] Axios interceptors attached
- [ ] Component keys are stable and unique
- [ ] useEffect dependencies are complete
- [ ] No infinite re-render loops
- [ ] Ant Design components receive correct props
