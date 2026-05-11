# Skill: Backend Development (Spring Boot)

Core skills for building robust and scalable server systems.

## 1. Spring Boot 3 Best Practices
- **Dependency Management**: Optimize `pom.xml` or `build.gradle` to avoid library conflicts.
- **Profiles**: Use `application-dev.yml` and `application-prod.yml` to manage environment-specific configurations.
- **Error Handling**: Use `@ControllerAdvice` for centralized error handling and standardized error responses.

## 2. MongoDB & Spring Data
- **Aggregations**: Use `Aggregation Pipeline` for complex queries such as calculating total calories by week/month.
- **Data Consistency**: Ensure data integrity through business logic since MongoDB does not support hard relations (Foreign Keys).
- **Indexing**: Create `Text Indexes` or `Compound Indexes` for frequently searched fields.

## 3. Security & Auth
- **JWT Implementation**: Build token refresh systems and manage login states.
- **Role-based Access Control (RBAC)**: Clear permission separation between `USER` and `ADMIN`.
