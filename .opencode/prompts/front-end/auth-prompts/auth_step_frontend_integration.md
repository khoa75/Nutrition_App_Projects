---
name: auth_step_frontend_integration
description: >
  Prompt: Build Auth Module (Authentication & Authorization) - Step 3: Frontend Integration
license: Apache-2.0
compatibility: opencode
---

# Prompt: Build Auth Module (Authentication & Authorization) - Step 3: Frontend Integration

## 1. Context & Constraints
Please read the following files before writing code:
- `.opencode/context/02-requirements/module_breakdown.md` (Module `auth` section)
- `.opencode/context/03-standards/rules.md` (Security: HTTPS, BCrypt, GDPR)
- `.opencode/context/03-standards/coding-standards.md`
- `.opencode/skills/security.md`

## 2. Task: Frontend Integration
1. **Write unit tests for the expected business logic before writing the actual source code (Test-First).**
2. **React-Native (Mobile)**: Create Login/Register screens, manage auth state with React Context, and save tokens to Secure Storage (`react-native-keychain`).
3. **React (Admin)**: Create a login page for Admins and securely store the token.

## 3. Acceptance Criteria
- All passwords in the DB are hashed using BCrypt/PBKDF2.
- API response time is always `< 2 seconds`.
- Unit tests cover **90%+** of AuthService logic.
