# User Stories

Extracted from the [PRD.md](../../PRD.md) document.

## For End Users:

**US-1: Create an account for regular users**
- **Role:** New user
- **Goal:** Securely and conveniently register a system account
- **Acceptance Criteria:**
  - Can register with Email/Password or Phone number (requires OTP verification).
  - Can register quickly via social accounts (Google, Facebook, Apple).
  - Passwords must meet security standards (minimum 8 characters, including uppercase, lowercase, numbers, and special characters).
  - Mandatory agreement to Terms of Use and Privacy Policy before completion.

**US-1.1: System Login**
- **Role:** Regular user with an existing account
- **Goal:** Securely access personal account
- **Acceptance Criteria:**
  - Can login with Email/Password or Phone number/OTP.
  - Supports quick login via linked social accounts (Google, Facebook, Apple).
  - Supports "Remember me" functionality.
  - Temporary account lockout (e.g., 15 minutes) after 5 consecutive incorrect password attempts.
  - Option to logout from current device or all devices.

**US-1.2: Initial Health Information Entry**
- **Role:** New user (after successful registration)
- **Goal:** Provide basic data for the system to personalize the experience
- **Acceptance Criteria:**
  - Enter full information: full name, date of birth, weight, height, gender, exercise intensity, weight goal.
  - System calculates and displays current BMI immediately after entry.
  - Data is stored securely.

**US-2: Receive personalized nutrition plans**
- **Role:** User with an account
- **Goal:** Receive an eating plan suitable for their goals and BMI
- **Acceptance Criteria:**
  - Plan is created based on BMI and weight goals.
  - Can choose timeframe (day/week/month/year).
  - Can replace suggested dishes with others of similar calories.

**US-3: Record meals using image recognition**
- **Role:** User
- **Goal:** Quickly record meals by taking a photo instead of manual entry
- **Acceptance Criteria:**
  - Can take a photo or select from gallery.
  - System recognizes dish name and ingredients.
  - Displays estimated total calories.
  - Can edit recognition results if necessary.

**US-4: View Progress Dashboard**
- **Role:** User
- **Goal:** Track weight loss/gain progress and calorie consumption through visual charts
- **Acceptance Criteria:**
  - Dashboard displays total calorie consumption for the day.
  - Displays variance from target.
  - Weight trend charts by day/week/month.
  - Weight goal progress displayed as a progress bar.
  - Real-time data updates.

**US-5: Daily weight updates**
- **Role:** User
- **Goal:** Record daily weight to track progress
- **Acceptance Criteria:**
  - Can update weight once or multiple times a day.
  - System stores weight change history.
  - Displays change trends.

**US-6: Manual meal entry**
- **Role:** User
- **Goal:** Manually enter meal information when image recognition cannot be used
- **Acceptance Criteria:**
  - Can search and add dishes from a list.
  - Can manually enter dish name and serving size.
  - System displays calorie estimate.
  - Can view meal history.

## For Admins:

**US-7: View user list**
- **Role:** Admin
- **Goal:** View a list of all users in the system
- **Acceptance Criteria:**
  - Displays full list with information: name, email, gender, age, status, weight goal.
  - Can search by name, email, status, goal.
  - Can paginate or load more.

**US-8: Manage user accounts**
- **Role:** Admin
- **Goal:** Create, edit, lock/unlock user accounts
- **Acceptance Criteria:**
  - Can create new accounts.
  - Can edit personal information of users.
  - Can lock/unlock accounts.
  - History of actions is recorded.

**US-9: View user activity history**
- **Role:** Admin
- **Goal:** Track user activity history to detect abnormal behavior
- **Acceptance Criteria:**
  - View login times.
  - View information update history.
  - View weight change history.
  - View nutritional record history.
  - Can filter by date and activity type.
