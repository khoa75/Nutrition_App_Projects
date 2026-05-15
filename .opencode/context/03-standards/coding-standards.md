# Coding Standards & Conventions

This document defines the coding standards for the Nutrition App project.

## 1. Backend Standards (Spring Boot & Java)
- **Language**: Java 21+.
- **Layering**: `Controller` → `Service` → `Repository`.
- **Logic**: No business logic in Controllers.
- **Naming**:
  - `camelCase` for methods/variables.
  - `PascalCase` for classes.
  - `UPPER_SNAKE_CASE` for constants.
- **Module Boundaries**: Modules must communicate via Service Interfaces. No cross-module Repository access.
- **Asynchronous**: Use `@Async` for non-blocking tasks.

## 2. Frontend Standards (Flutter & React)
- **Flutter**: Use Clean Architecture. PascalCase for Classes, snake_case for filenames.
- **React**: Functional components and Hooks. PascalCase for Components.

## 3. Database Standards (MongoDB)
- Use `snake_case` for field names in collections.
- Define explicit indexes for performance.

## 4. Testing & Quality Assurance
- **TDD (Test-Driven Development)**: **Luôn luôn viết test trước khi viết code (Always write tests before writing code).** Always write Unit Tests for business logic before implementing the actual source code (Test-First approach).
- **Coverage**: Ensure Code Coverage reaches a minimum of **80%** for Service and Controller layers.
- **Automation**: All Unit and Integration Tests must be automatically run in the CI/CD pipeline.
