# Skill: Security & Compliance

Skills to protect the system against cybersecurity threats and adhere to international data protection regulations.

## 1. Authentication & Authorization
- **JWT (JSON Web Tokens)**: Implement secure token issuance, validation, revocation, and refresh workflows.
- **RBAC (Role-Based Access Control)**: Clearly separate access permissions between Endpoints intended for `USER` (App) and `ADMIN` (Web Dashboard).

## 2. Data Encryption & Protection
- **Password Hashing**: Utilize secure password hashing algorithms such as `BCrypt` or `PBKDF2`. Storing plaintext passwords is strictly prohibited.
- **Transport Security**: Establish and enforce that all client-server communication must be encrypted using `HTTPS/SSL` protocols.

## 3. Compliance & Auditing
- **Privacy Laws**: Design the storage and anonymization of personally identifiable information (PII) to strictly comply with `GDPR` and `CCPA` standards.
- **Audit Logging**: Track and log all sensitive operations performed by Admins related to user data (creating, modifying, or locking accounts) to facilitate security auditing.
