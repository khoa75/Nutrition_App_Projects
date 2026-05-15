---
name: admin_step_build_audit_logging
description: >
  Prompt: Build Admin Module (Administration & Monitoring) - Step 2: Build Audit Logging
license: Apache-2.0
compatibility: opencode
---

# Prompt: Build Admin Module (Administration & Monitoring) - Step 2: Build Audit Logging

## 1. Context & Constraints
- `.opencode/context/02-requirements/module_breakdown.md` (Module `admin` section)
- `.opencode/skills/front-end.md` (React Hooks, Reusable Components)
- `.opencode/skills/security.md` (Audit Logging, RBAC)

## 2. Task: Build Audit Logging
1. Every time an Admin modifies a user's status, save a log to the `audit_logs` collection (time, action, description, IP).
2. Implement API `GET /api/admin/audit-logs` to display this history for Super Admins.

## 3. Acceptance Criteria
- Strictly authorized APIs; regular Users must never be able to call Admin endpoints.
- Pagination works correctly, without loading redundant data from MongoDB.
- Every User data modification is recorded in `audit_logs`.
