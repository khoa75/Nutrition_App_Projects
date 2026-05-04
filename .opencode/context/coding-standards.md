# Coding Standards & Conventions

This document defines the coding standards for the Nutrition App project.

## 1. Backend Standards (Spring Boot & Java)
- **Language**: Java 17+.
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

## 4. Git Workflow
- **Branches**: `feature/<name>`, `bugfix/<name>`, `fix/<name>`.
- **Commits**: Atomic commits with reference to User Stories (e.g., "US-1: User Registration").
