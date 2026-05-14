# Technology Stack (Tech Stack)

The **Nutrition App** project is built entirely with a **Modular Monolith** architecture.

## 1. Backend Core (Business Logic & API)
- **Framework:** Spring Boot (Java 21)
- **Database:** MongoDB (Using Spring Data MongoDB)
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** Spring Security, BCrypt (Password encryption)
- **File Storage:** Cloudinary

## 2. AI / ML Service (Analysis & Recognition)
- **Framework:** FastAPI (Python)
- **Package Manager:** `uv` (Faster and more modern than pip/poetry)
- **Machine Learning:** PyTorch
- **Core Features:** Food image recognition, calorie estimation analysis.

## 3. Frontend Client
### Mobile App (For End Users)
- **Framework:** Flutter (Dart)
- **State Management:** Provider / Riverpod
- **UI Design:** Flutter Material & Cupertino

### Web Admin Dashboard (For Admins)
- **Framework:** React.js and Tailwind CSS
- **UI Library:** Ant Design Pro / AdminLTE

## 4. DevOps & Configuration
- **Cloud Hosting:** AWS / GCP
- **Database Hosting:** MongoDB Atlas
- **CI/CD:** GitHub Actions
- **Containerization:** Docker
