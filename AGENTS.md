# Nutrition App - Development Guidelines (Index)

**Nutrition App** is a health management, diet, weight tracking, and AI-powered calorie analysis application.

> **Important Note**: This `AGENTS.md` file currently serves as the "Index" (Table of Contents) for the documentation system. Do not look for every technical detail here. Please read the in-depth documentation linked below before starting to code.

---

## 1. Documentation Structure
All standard documentation is clearly distributed into folders:

### Product Requirements
- **[PRD.md](PRD.md)**: Product Requirements Document (User Stories, Metrics, Personas).

### Knowledge & Context (`.opencode/context/`)
- `project_overview.md`: Core objectives and detailed roadmap.
- `domain_knowledge.md`: Medical knowledge (BMI, BMR, TDEE, Macros formulas).
- `tech_stack.md`: Technical structure and Backend/Frontend/AI systems.

### Standard Workflows (`.opencode/workflows/`)
- `build_feature.md`: Workflow for building new features.
- `refactor.md`: Workflow for safe code refactoring.
- `debug.md`: Steps for isolating and fixing bugs.
- `write_tests.md`: Standards for writing Unit & Integration Tests.
- `ci_cd.md`: Automated testing and deployment workflow (CI/CD).

### Mandatory Rules (`.opencode/rules/`)
- `code_standards.md`: Coding standards (Naming, Package-by-feature).
- `security_and_error_handling.md`: Security standards (JWT, BCrypt) and error handling.
- `git_workflow.md`: Branching and PR process.
- `testing_guidelines.md`: Code coverage regulations (>80%).

### Storage & Skills
- `.opencode/memory/`: Progress and status tracking.
- `.opencode/skills/`: Specialized coding skills for Spring Boot, Flutter, FastAPI, React.

---

## 2. Architecture Strategy
**Architecture: Modular Monolith**
- The project absolutely **DOES NOT use Microservices**.
- Backend (Spring Boot) is organized by **Package-by-Feature**, modules (user, meals, nutrition, admin) run in the same codebase.
- **Module Boundaries**: Communication between modules must be through **Internal Service Interfaces**; cross-accessing each other's Database or Repository is strictly prohibited.
- AI analysis is handled separately via **FastAPI + PyTorch**.

---

## 3. Development Roadmap Summary
- **Phase 1 (MVP)**: Auth, BMI calculation, manual data entry, basic Dashboard UI.
- **Phase 2 (AI)**: Food image recognition (FastAPI), TDEE/Macro recommendation system.
- **Phase 3 (Admin & Scale)**: Admin Dashboard (React), Audit Logs, performance optimization.
- **Phase 4 (Advanced)**: Smartwatch integration, community features.

---

## 4. Constraints
- **Performance**: Response time for all APIs must be less than 2 seconds (< 2s).
- **Scalability**: The system must be designed to handle and scale up to 100,000 users (Scalable to 100K users).
- **Artificial Intelligence (AI)**: Accuracy of the Food Recognition model must reach over 80%.
- **Architectural Integrity**: Absolutely no Business Logic inside Controllers. Must adhere to the defined architecture (Modular Monolith / Clean Architecture).

## 5. Useful Commands
```bash
# Backend (Spring Boot)
./mvnw spring-boot:run
./mvnw test

# Frontend Mobile (Flutter)
flutter pub get
flutter run
flutter test

# Admin Dashboard (React)
npm install
npm run dev
```

## 6. Important Notes
Always:
- Adhere to layered architecture.
- Write maintainable and testable code.
- Clearly explain the reasoning/logic when creating complex segments.

---
**Last Updated:** May 2026
**Maintained by:** Nutrition App Team
