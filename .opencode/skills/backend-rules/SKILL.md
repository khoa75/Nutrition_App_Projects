---
name: backend-rules
description: Quy tắc phát triển Backend Spring Boot
---

# Backend Development Rules (Spring Boot)

- **Framework**: Spring Boot 3.x
- **Language**: Java 17+
- **Organization**: Package-by-feature (e.g., `com.app.user`, `com.app.nutrition`).
- **Naming**:
  - Methods: `camelCase`
  - Classes: `PascalCase`
  - Constants: `UPPER_SNAKE_CASE`
- **Logic**: All business logic must reside in `@Service` classes.
- **DTOs**: Use DTOs for data transfer between layers and API responses.
- **Security**: JWT + Spring Security.
- **Testing**: Target 80%+ code coverage using JUnit 5 and Mockito.