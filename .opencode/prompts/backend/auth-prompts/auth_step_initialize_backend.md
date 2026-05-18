---
name: auth_step_initialize_backend
description: >
  Prompt: Build Auth Module (Authentication & Authorization) - Step 1: Initialize Backend (Spring Boot)
license: Apache-2.0
compatibility: opencode
---

# Prompt: Build Auth Module (Authentication & Authorization) - Step 1: Initialize Backend (Spring Boot)

## 1. Context & Constraints
Please read the following files before writing code:
- `.opencode/context/02-requirements/module_breakdown.md` (Module `auth` section)
- `.opencode/context/03-standards/rules.md` (Security: HTTPS, BCrypt, GDPR)
- `.opencode/context/03-standards/coding-standards.md`
- `.opencode/skills/security.md`

## 2. Task: Initialize Backend (Spring Boot)
1. **Write unit tests for the expected business logic before writing the actual source code (Test-First).**
2. Create the `com.nutrition.auth` package following the Modular Monolith standard.
3. Design the `User` JPA Entity for PostgreSQL. Ensure `@Column(name = "snake_case")` is used. Do not store plaintext passwords.
4. Set up Spring Security and JWT filters.

## 3. Acceptance Criteria
- All passwords in the DB are hashed using BCrypt/PBKDF2.
- API response time is always `< 2 seconds`.
- Unit tests cover **90%+** of AuthService logic.
