---
name: admin_step_web_frontend
description: >
  Prompt: Build Admin Module (Administration & Monitoring) - Step 3: Web Frontend (React.js)
license: Apache-2.0
compatibility: opencode
---

# Prompt: Build Admin Module (Administration & Monitoring) - Step 3: Web Frontend (React.js)

## 1. Context & Constraints
- `.opencode/context/02-requirements/module_breakdown.md` (Module `admin` section)
- `.opencode/prompts/front-end/SKILL.md` (React Hooks, Reusable Components)
- `.opencode/prompts/security/SKILL.md` (Audit Logging, RBAC)

## 2. Task: Web Frontend (React.js)
1. **Write unit tests for the expected business logic before writing the actual source code (Test-First).**
2. Build the Admin page using React.js and Tailwind CSS.
3. Manage state using React Hooks, and use React Router to navigate between pages: User List, System History, and General Dashboard.
4. Create Reusable Tables to render the user list.

## 3. Acceptance Criteria
- Strictly authorized APIs; regular Users must never be able to call Admin endpoints.
- Pagination works correctly, without loading redundant data from the database.
- Every User data modification is recorded in `audit_logs`.
