---
name: debug-backend
description: Spring Boot backend debugging patterns, common issues, and resolution workflows
license: Apache-2.0
compatibility: opencode
---

## 1. Debug Workflow

```
1. Reproduce the issue via API client (curl, Postman, Swagger)
2. Check application logs for exceptions
3. Enable debug logging for specific packages
4. Use Spring Boot Actuator for health/metrics
5. Debug with IDE breakpoints or remote debug
6. Write a failing test, fix, verify
```

## 2. Common Issues & Solutions

### App Won't Start
```bash
# Check for port conflicts
lsof -i :8080

# Run with debug logging
./mvnw spring-boot:run -Dspring-boot.run.profiles=dev -Dspring-boot.run.jvmArguments="-Ddebug=true"

# Check MongoDB connection
./mvnw spring-boot:run -Dlogging.level.org.mongodb.driver=DEBUG

# Common startup failures:
# - MongoDB not running: Start mongod or use Docker
# - Port already in use: Kill process or change port
# - Missing @SpringBootApplication: Check main class
```

### MongoDB Connection Issues
```java
// application.yml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/nutrition
      auto-index-creation: true

// Debug connection
logging:
  level:
    org.mongodb.driver: DEBUG
    org.springframework.data.mongodb: DEBUG
```

### JWT Authentication Failures
```java
// Enable security debug logging
logging:
  level:
    org.springframework.security: DEBUG

// Common JWT issues:
// - Token expired: Check expiration time in JwtUtil
// - Invalid signature: Verify secret key matches
// - Missing Bearer prefix: Check Authorization header format
// - Refresh token not rotating: Ensure old token invalidated

// Debug filter chain
@Bean
public SecurityFilterChain filterChain(HttpSecurity http) {
    http.addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);
    // Add logging filter for debugging
    http.addFilterBefore(new LoggingFilter(), JwtAuthenticationFilter.class);
    return http.build();
}
```

### Cross-Module Repository Access Violation
```java
// ❌ WRONG: Direct repository access across modules
@Service
public class MealServiceImpl {
    @Autowired
    private UserProfileRepository userProfileRepository; // VIOLATION!
}

// ✅ CORRECT: Use service interface
@Service
public class MealServiceImpl {
    @Autowired
    private UserProfileService userProfileService; // Interface only
}

// Detect violations: Search for @Autowired with Repository from other packages
```

### N+1 Query Problems
```java
// ❌ WRONG: N+1 queries
public List<MealLog> getUserMeals(String userId) {
    List<MealLog> meals = mealRepository.findByUserId(userId);
    for (MealLog meal : meals) {
        meal.setFoodItems(foodRepository.findByMealId(meal.getId())); // N+1!
    }
    return meals;
}

// ✅ CORRECT: Use MongoDB aggregation or $lookup
public List<MealLog> getUserMeals(String userId) {
    Aggregation agg = Aggregation.newAggregation(
        Aggregation.match(Criteria.where("userId").is(userId)),
        Aggregation.lookup("foods", "foodItems._id", "_id", "foodDetails")
    );
    return mongoTemplate.aggregate(agg, "mealLogs", MealLog.class).getMappedResults();
}

// Enable query logging
logging:
  level:
    org.springframework.data.mongodb.core.MongoTemplate: DEBUG
```

## 3. Debug Logging Configuration

```yaml
# application-dev.yml
logging:
  level:
    root: INFO
    com.nutrition: DEBUG
    org.springframework.web: DEBUG
    org.springframework.security: DEBUG
    org.springframework.data.mongodb: DEBUG
    org.mongodb.driver: WARN
  file:
    name: logs/application.log
```

## 4. Spring Boot Actuator

```yaml
# application.yml
management:
  endpoints:
    web:
      exposure:
        include: health,info,metrics,env,beans,mappings
  endpoint:
    health:
      show-details: always
```

**Useful endpoints:**
- `/actuator/health` – Application health status
- `/actuator/metrics` – JVM, HTTP, MongoDB metrics
- `/actuator/env` – Environment properties
- `/actuator/beans` – All Spring beans
- `/actuator/mappings` – All REST endpoints

## 5. IDE Debugging

### IntelliJ IDEA
```
1. Set breakpoint in controller/service
2. Run with Debug: ./mvnw spring-boot:run -Dspring-boot.run.jvmArguments="-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005"
3. Attach debugger: Run → Attach to Process → port 5005
4. Inspect variables, evaluate expressions
```

### VS Code
```json
// .vscode/launch.json
{
  "type": "java",
  "name": "Debug Spring Boot",
  "request": "launch",
  "mainClass": "com.nutrition.NutritionApplication",
  "args": "--spring.profiles.active=dev"
}
```

## 6. Debugging REST Controllers

```java
// Add request/response logging
@RestControllerAdvice
public class LoggingControllerAdvice {
    @ModelAttribute
    public void logRequest(HttpServletRequest request) {
        log.debug("[Request] {} {} from {}", request.getMethod(), request.getRequestURI(), request.getRemoteAddr());
    }
}

// Common controller issues:
// - @RequestBody not deserializing: Check DTO has no-arg constructor
// - @Valid not working: Ensure @Validated on class or method
// - 415 Unsupported Media Type: Check Content-Type header
// - 400 Bad Request: Check DTO field types match JSON
```

## 7. Debugging MongoDB Queries

```java
// Enable query logging
logging:
  level:
    org.springframework.data.mongodb.core.MongoTemplate: DEBUG

// Common MongoDB issues:
// - Document not found: Check field names (snake_case vs camelCase)
// - Index not used: Run explain() on query
// - Aggregation failing: Check stage order and field references

// Debug aggregation pipeline
AggregationResults<Document> result = mongoTemplate.aggregate(
    agg, "collection", Document.class
);
log.debug("Aggregation result: {}", result.getMappedResults());
```

## 8. Debugging Async Tasks

```java
// Enable async logging
logging:
  level:
    org.springframework.scheduling: DEBUG

// Common async issues:
// - @Async not working: Ensure @EnableAsync on config class
// - Exception swallowed: Use AsyncUncaughtExceptionHandler
// - Thread pool exhausted: Configure task executor

@Bean
public TaskExecutor taskExecutor() {
    ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
    executor.setCorePoolSize(5);
    executor.setMaxPoolSize(10);
    executor.setQueueCapacity(25);
    executor.setThreadNamePrefix("nutrition-async-");
    executor.initialize();
    return executor;
}
```

## 9. Quick Debug Checklist

- [ ] MongoDB is running and accessible
- [ ] Application starts without errors
- [ ] Security filter chain configured correctly
- [ ] JWT tokens generated and validated
- [ ] No cross-module repository access
- [ ] MongoDB queries use indexes
- [ ] @Async tasks have proper error handling
- [ ] Actuator endpoints accessible (dev only)
- [ ] Logs show DEBUG level for relevant packages
