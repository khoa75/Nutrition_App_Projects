---
name: auth_step_build_api_endpoints
description: >
  Prompt: Build Auth Module (Authentication & Authorization) - Step 2: Build API Endpoints
license: Apache-2.0
compatibility: opencode
---

# Prompt: Build Auth Module (Authentication & Authorization) - Step 2: Build API Endpoints

## 1. Context & Constraints
Please read the following files before writing code:
- `.opencode/context/02-requirements/module_breakdown.md` (Module `auth` section)
- `.opencode/context/03-standards/rules.md` (Security: HTTPS, BCrypt, GDPR)
- `.opencode/context/03-standards/coding-standards.md`
- `.opencode/skills/security.md`

## 2. Task: Build API Endpoints
1. `POST /api/auth/register`: Receives `email`/`phone`/`social`, hashes the password using BCrypt, and saves to DB. Validates password strength.
2. `POST /api/auth/login`: Authenticates credentials, returns `jwt_token` and `refresh_token`. Handles `remember_me` flag and the 5-failed-password limit.
3. `POST /api/auth/logout`: Implements logout logic (token blacklisting or removal from device).
4. `POST /api/auth/reset-password`: Handles sending OTP via email/SMS.

## 3. Acceptance Criteria
- All passwords in the DB are hashed using BCrypt/PBKDF2.
- API response time is always `< 2 seconds`.
- Unit tests cover **90%+** of AuthService logic.
