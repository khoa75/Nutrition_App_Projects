# Skill: Create Spring Boot API Endpoint

## Context
This skill provides instructions on how to create a new API endpoint in the Spring Boot backend of the Nutrition App.

## Prerequisites
- The backend uses Java/Kotlin with Spring Boot.
- The database is MongoDB (using Spring Data MongoDB).
- Authentication uses JWT.

## Steps

1. **Create/Update the Model (Document):**
   - Place in `src/main/java/com/nutritionapp/models/`.
   - Use `@Document` annotation.
   - Define fields, e.g., `id`, `createdAt`, etc.

2. **Create the Repository:**
   - Place in `src/main/java/com/nutritionapp/repositories/`.
   - Interface extending `MongoRepository<Model, String>`.

3. **Create the Service:**
   - Place in `src/main/java/com/nutritionapp/services/`.
   - Annotate with `@Service`.
   - Implement business logic, error handling, and interact with the Repository.

4. **Create the Controller:**
   - Place in `src/main/java/com/nutritionapp/controllers/`.
   - Annotate with `@RestController` and `@RequestMapping`.
   - Inject the Service.
   - Define `@GetMapping`, `@PostMapping`, etc.
   - Ensure proper validation (`@Valid`) and return `ResponseEntity`.

5. **Security & Authentication:**
   - If the endpoint requires authentication, ensure it is protected under the Spring Security configuration.
   - Extract user info from the JWT context if needed.

## Example Output Structure
Make sure the response follows a standard format:
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation successful"
}
```
