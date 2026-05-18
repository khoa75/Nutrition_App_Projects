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

## 2. Frontend Standards (React-Native & React)
- **React-Native**: Use TypeScript. Use Functional Components with hooks. PascalCase for Components, camelCase for helper functions.
- **React**: Use TypeScript. Functional components and Hooks. PascalCase for Components.

## 3. Database Standards (PostgreSQL)
- Use `snake_case` for table and column names in the relational schema.
- Define explicit B-tree indexes for performance on frequently queried columns.

## 4. Testing & Quality Assurance
- **TDD (Test-Driven Development)**: **Always write tests before writing code.** Always write Unit Tests for business logic before implementing the actual source code (Test-First approach).
- **Coverage**: Ensure Code Coverage reaches a minimum of **90%** for Service layer and **80%** for Controller layer.
- **Automation**: All Unit and Integration Tests must be automatically run in the CI/CD pipeline.
