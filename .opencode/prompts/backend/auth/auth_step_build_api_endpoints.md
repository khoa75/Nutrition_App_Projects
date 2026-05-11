# Prompt: Build Auth Module (Authentication & Authorization) - Step 2: Build API Endpoints

## 1. Context & Constraints
Please read the following files before writing code:
- `.opencode/context/module_breakdown.md` (Module `auth` section)
- `.opencode/context/rules.md` (Security: HTTPS, BCrypt, GDPR)
- `.opencode/context/coding-standards.md`
- `.opencode/skills/security.md`

## 2. Task: Build API Endpoints
1. `POST /api/auth/register`: Receives `email`/`phone`/`social`, hashes the password using BCrypt, and saves to DB. Validates password strength.
2. `POST /api/auth/login`: Authenticates credentials, returns `jwt_token` and `refresh_token`. Handles `remember_me` flag and the 5-failed-password limit.
3. `POST /api/auth/logout`: Implements logout logic (token blacklisting or removal from device).
4. `POST /api/auth/reset-password`: Handles sending OTP via email/SMS.

## 3. Acceptance Criteria
- All passwords in the DB are hashed using BCrypt/PBKDF2.
- API response time is always `< 2 seconds`.
- Unit tests cover 80%+ of AuthService logic.
