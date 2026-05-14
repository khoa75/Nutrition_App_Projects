# Nutrition App - Development Guidelines

## 🚨 Critical Project State
**Currently in PLANNING PHASE - No source code exists yet.** Main directories (`backend/`, `frontend/`, `ai-service/`, `admin-dashboard/`) are empty.

## 🏗️ Architecture Rules
**Modular Monolith (NOT Microservices)**
- Backend: Spring Boot with Package-by-Feature modules
- **Strict boundary**: Modules communicate via Internal Service Interfaces only
- **Forbidden**: Cross-module Repository access or Database sharing
- AI Service: Separate FastAPI service for heavy computation

## 📁 Module Structure
```
backend/src/main/java/com/nutrition/
├── auth/          # JWT, Social login, OTP
├── user_profile/  # BMI, BMR, TDEE calculations
├── food_catalog/  # Food database search
├── nutrition_plan/# Meal planning engine
├── meal_tracking/ # Manual + AI food logging
├── dashboard/     # Statistics & charts
└── admin/         # User management & audit logs
```

## ⚡ Development Commands
**Note: These commands will fail until project structure is created**

```bash
# Backend (Spring Boot) - Requires pom.xml first
./mvnw spring-boot:run
./mvnw test

# Frontend Mobile (Flutter) - Requires pubspec.yaml first  
flutter pub get
flutter run
flutter test

# AI Service (FastAPI) - Requires requirements.txt first
uv sync
uv run uvicorn app.main:app --reload

# Admin Dashboard (React) - Requires package.json first
npm install
npm run dev
```

## 🤖 OpenCode Agent Configuration
This repo uses specialized OpenCode agents for different tasks:
- **plan**: Architecture planning, feature breakdown
- **build**: Implementation, writing code, running tests
- **explore**: Codebase exploration, understanding structure
- **general**: Research, multi-step problem solving
- **project_lead**: Orchestrating sub-agents, maintaining architectural integrity
- **backend_dev**: Spring Boot 3/Java 21 backend modules
- **frontend_dev**: Flutter mobile app + React admin dashboard
- **ai_engineer**: FastAPI + PyTorch food recognition service
- **devops_engineer**: Docker, CI/CD, cloud deployment
- **reviewer**: Code review, security audit, quality assurance
- **docs_writer**: Documentation, API docs, README

## 📏 Coding Standards
**Mandatory:**
- **Backend**: `Controller` → `Service` → `Repository` layers only
- **Naming**: camelCase (methods/vars), PascalCase (classes), UPPER_SNAKE_CASE (constants)
- **Testing**: TDD approach, 80%+ code coverage required (Service: 90%+, Controller: 80%+)
- **Database**: snake_case field names, explicit indexes for performance
- **Modules**: Communicate via Service Interfaces only (no cross-module Repository access)
- **Async Processing**: Use `@Async` for non-blocking tasks
- **Logic**: No business logic in Controllers
- **Frontend**: 
  - Flutter: Clean Architecture, PascalCase for Classes, snake_case for filenames
  - React: Functional components and Hooks, PascalCase for Components

## 🔒 Security Requirements
- JWT tokens with refresh mechanism
- BCrypt password encryption
- Account lockout after 5 failed attempts
- Role-based access (USER/ADMIN)

## 🚀 Development Order
**Phase 1 (MVP)**: Auth → User Profile → Food Catalog → Manual Meal Tracking → Basic Dashboard
**Phase 2 (AI)**: FastAPI service → Image recognition integration → Meal planning engine
**Phase 3 (Admin)**: React dashboard → Audit logging → Performance optimization

## 📋 Key Reference Files
- **User Stories**: `.opencode/context/02-requirements/user_stories.md`
- **Module Details**: `.opencode/context/02-requirements/module_breakdown.md` 
- **API Contracts**: Each module defines Input/Output in `.opencode/context/02-requirements/`
- **Coding Standards**: `.opencode/context/03-standards/coding-standards.md`
- **CI/CD Plan**: `.opencode/context/05-infrastructure/ci_cd.md`

## ⚠️ Common Pitfalls to Avoid
1. **Never put business logic in Controllers**
2. **Never cross-access other modules' databases**
3. **Always write tests before implementation (TDD)**
4. **Use compound MongoDB indexes for performance**
5. **JWT must include refresh token mechanism**