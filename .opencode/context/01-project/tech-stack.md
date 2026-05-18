# Technology Stack (Tech Stack)

The **Nutrition App** project is built entirely with a **Modular Monolith** architecture.

## 1. Backend Core (Business Logic & API)
- **Framework:** Spring Boot (Java 21)
- **Database:** PostgreSQL (Using Spring Data JPA)
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Spring Security, BCrypt (Password encryption)
- **File Storage:** Cloudinary

## 2. Frontend Client
### Mobile App (For End Users - Android)
- **Framework:** React-Native (TypeScript)
- **State Management:** Redux Toolkit / Zustand
- **UI Design:** React Native Paper / Custom Components

### Web Admin Dashboard (For Admins)
- **Framework:** React.js and Tailwind CSS
- **UI Library:** Ant Design Pro / AdminLTE

## 3. DevOps & Configuration
- **Cloud Hosting:** AWS / GCP
- **Database Hosting:** Managed PostgreSQL (e.g. AWS RDS)
- **CI/CD:** GitHub Actions
- **Containerization:** Docker
