# Security & Error Handling Rule

This rule outlines the mandatory security practices and error handling mechanisms across all services (Spring Boot, PyTorch, Flutter, React).

## Error Handling
1. **Validation**: Always validate user inputs on both the frontend (Flutter/React) and backend (Spring Boot/FastAPI).
2. **Responses**: Return meaningful error messages to the client without exposing internal stack traces.
3. **HTTP Status Codes**: Use proper RESTful HTTP status codes:
   - `200/201` for success.
   - `400` for bad request / validation errors.
   - `401` for unauthorized (missing/invalid JWT).
   - `403` for forbidden (insufficient permissions).
   - `404` for not found.
   - `500` for internal server errors.
4. **Logging**: Ensure server-side errors are logged properly for debugging.

## Security Practices
1. **Passwords**: Never store passwords in plain text. Always use BCrypt for hashing.
2. **Authentication**: All protected endpoints must validate the JWT token.
3. **Sanitization**: Sanitize user inputs to prevent SQL Injection (or NoSQL Injection for MongoDB) and XSS attacks.
4. **Rate Limiting**: Implement rate limiting on sensitive APIs (e.g., login, AI image recognition).
