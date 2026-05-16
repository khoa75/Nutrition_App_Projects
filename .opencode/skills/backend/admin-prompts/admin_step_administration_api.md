---
name: admin_step_administration_api
description: >
  Prompt: Build Admin Module (Administration & Monitoring) - Step 1: Administration API (Spring Boot)
license: Apache-2.0
compatibility: opencode
---

# Prompt: Build Admin Module (Administration & Monitoring) - Step 1: Administration API (Spring Boot)

## 1. Context & Constraints
- `.opencode/context/02-requirements/module_breakdown.md` (Module `admin` section)
- `.opencode/skills/front-end.md` (React Hooks, Reusable Components)
- `.opencode/skills/security.md` (Audit Logging, RBAC)

## 2. Task: Administration API (Spring Boot)
1. **Write unit tests for the expected business logic before writing the actual source code (Test-First).**
2. Endpoint Authorization: APIs in the `com.nutrition.admin` package must require a JWT containing `ROLE_ADMIN`.
3. Implement API `GET /api/admin/users`: Retrieves a list of all users, mandatory support for Pagination, filtering (Status, Goal), and Search by name/email.
4. Implement API `POST /api/admin/users/{id}/status`: Locks or unlocks an account.

## 3. Acceptance Criteria
- Strictly authorized APIs; regular Users must never be able to call Admin endpoints.
- Pagination works correctly, without loading redundant data from MongoDB.
- Every User data modification is recorded in `audit_logs`.
