---
name: security
description: JWT authentication, RBAC, password policy, API security, and data privacy patterns
---

## 1. JWT Implementation
```java
// Access Token: 15 minutes, contains userId + role
// Refresh Token: 7 days (30 days if "remember me"), stored as HTTP-only cookie
// Both signed with HMAC-SHA256 using a 256-bit secret
```
- Token stored in `Authorization: Bearer <token>` header
- Refresh endpoint: `POST /api/v1/auth/refresh` — takes refresh token, returns new access token
- Blacklist: store revoked tokens in MongoDB with TTL index (auto-cleanup)

## 2. RBAC Roles
| Role | Access | Modules |
|------|--------|---------|
| USER | Standard | auth, user_profile, food_catalog, meal_tracking, nutrition_plan, dashboard |
| ADMIN | Full + Management | All USER + admin module (user management, audit logs) |

Enforce at controller level:
```java
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin/users")
```

## 3. Password Policy
- Min 8 chars, must include: uppercase, lowercase, digit, special char
- Hashed with BCrypt (strength factor 12)
- Max 5 failed attempts → lock 15 minutes (field: `failed_attempts`, `locked_until`)
- Reset via OTP (email or SMS) — OTP valid 5 minutes, 6 digits

## 4. API Security
- All endpoints (except auth) require JWT via `OncePerRequestFilter`
- Rate limiting: 100 requests/minute/user (enforced per API key)
- File upload: validate MIME type, max 10MB, scan for malware
- CORS: restrict to known origins (mobile app, admin domain)

## 5. Data Privacy
- PII fields (email, phone, full_name, dob): encrypted at rest using AES-256
- Weight/height data: considered sensitive, access-logged
- Delete user: soft-delete (set `status: DELETED`), hard-delete after 30 days
- Admin audit: all admin CRUD operations logged to `audit_logs` collection
