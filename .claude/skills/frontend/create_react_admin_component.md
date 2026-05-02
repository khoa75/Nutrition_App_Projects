# Skill: Create React Admin Dashboard Component

## Context
This skill outlines how to build a new feature/component for the React Admin Dashboard.

## Prerequisites
- Framework: React.
- UI: Custom Template (e.g., Ant Design Pro / MUI).
- Analytics: D3.js or Recharts for charts.

## Steps

1. **Component Structure:**
   - Reusable components go to `admin-dashboard/src/components/`.
   - Page-level components go to `admin-dashboard/src/pages/`.

2. **Fetching Data:**
   - Define API calls in `admin-dashboard/src/services/`.
   - Use a data fetching library like `SWR` or `React Query`, or handle in `useEffect` if simple.

3. **Building the UI:**
   - Use the designated Admin Template components (e.g., DataGrid, Table, Card).
   - Ensure tables include pagination, filtering, and sorting as admins need to manage large datasets (e.g., user lists).

4. **Data Visualization (Analytics):**
   - If building a dashboard widget, use D3.js or Recharts.
   - Isolate chart logic into a separate file inside `components/charts/` to keep the main page clean.

5. **Authentication/Authorization:**
   - Ensure the component checks for Admin privileges before rendering or fetching sensitive data.
