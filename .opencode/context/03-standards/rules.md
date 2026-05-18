# Project Rules & Constraints

Based on the [PRD.md](../../PRD.md) and architectural constraints, the following are mandatory rules and standards that must be followed during the design and development of the Nutrition App project.

## 1. System Constraints
- **Client Platform:** The Mobile application must support at least **Android 8+** (Android only).
- **Performance & Responsiveness:**
  - Every API response time (including Dashboard data loading) must be **< 2 seconds**.
  - Total system uptime must reach **≥ 99.5%**.
- **Scalability:** The Database and Server structure must be designed for easy scaling and to support at least **100,000+ active users**.

## 2. Security & Privacy
- **Privacy:** Strict compliance with international personal data protection regulations such as **GDPR** and **CCPA** is mandatory.
- **Data Encryption:**
  - User passwords must be hashed using strong algorithms (e.g., **BCrypt** or PBKDF2) before storage. Never store plaintext passwords.
  - All communication traffic between Client (App/Web) and Server must be encrypted via **HTTPS/SSL**.
- **Data Redundancy:** The system must have an **automatic daily data backup** mechanism.

## 3. Functional Business Rules
- **Health Metric Calculation:** Mandatory use of international standard formulas. Specifically for BMI: `BMI = Weight (kg) / (Height (m))²`.
- **Unit System:** The App must support flexible data entry and conversion between two systems:
  - Weight: **kg** and **pounds (lbs)**.
  - Height: **cm** and **feet/inches**.
- **Audit Logging:** Every Admin intervention in user data (creation, modification, locking/unlocking) must be fully recorded (Audit Log).

## 4. Architecture & Coding Principles
- **Main Backend:** Adhere to the **Modular Monolith** model. Code is decomposed into independent modules (packages) based on features (Feature-based packaging).
- **Development Process:** Apply **Test-Driven Development (TDD)**. **Always write tests before writing code.** Write unit tests to define behavior before writing the actual processing code.
- **Food Database Updates:** The core food database must be designed to support regular updates from Admins/Nutritionists.
