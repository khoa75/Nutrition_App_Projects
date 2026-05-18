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
- `.opencode/prompts/front-end/SKILL.md` (React Hooks, Reusable Components)
- `.opencode/prompts/security/SKILL.md` (Audit Logging, RBAC)

## 2. Task: Build Audit Logging
1. Every time an Admin modifies a user's status, save a log to the `audit_logs` table (time, action, description, IP).
2. Implement API `GET /api/admin/audit-logs` to display this history for Super Admins.
3. **API Response Envelope**: All API endpoints must return `ResponseEntity<ApiResponse<T>>` using the class `com.example.backend.dto.ApiResponse<T>` defined in `backend/src/main/java/com/example/backend/dto/ApiResponse.java` to wrap response data.

## 3. Acceptance Criteria
- All API responses are wrapped in `ApiResponse<T>` from `backend/src/main/java/com/example/backend/dto/ApiResponse.java`.
- Strictly authorized APIs; regular Users must never be able to call Admin endpoints.
- Pagination works correctly, without loading redundant data from the database.
- Every User data modification is recorded in `audit_logs`.
