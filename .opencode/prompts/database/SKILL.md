---
name: database
description: PostgreSQL table schemas, indexes, queries, and naming conventions
license: Apache-2.0
compatibility: opencode
---

## 1. Table Schemas

### ENUMS
- **bmi_status_enum**: `UNDERWEIGHT`, `NORMAL`, `OVERWEIGHT`, `OBESITY_LEVEL_1`, `OBESITY_LEVEL_2`
- **activity_level_enum**: `SEDENTARY`, `LIGHT_ACTIVE`, `ACTIVE`, `VERY_ACTIVE`

### users
```sql
CREATE TABLE users (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  dob DATE,
  username VARCHAR(100) UNIQUE,
  hash_password VARCHAR(255),
  current_weight VARCHAR(255),
  target_weight VARCHAR(255),
  height VARCHAR(255),
  gender VARCHAR(20),
  goal_calories INTEGER,
  activity_level activity_level_enum,
  bmi VARCHAR(255),
  bmi_status bmi_status_enum
);
```

### foods
```sql
CREATE TABLE foods (
  id BIGSERIAL PRIMARY KEY,
  name VARCHAR(255),
  protein VARCHAR(255),
  carbs VARCHAR(255),
  fats VARCHAR(255),
  calories_per_100g VARCHAR(255),
  user_id BIGINT REFERENCES users(id)
);
```

### logs
```sql
CREATE TABLE logs (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT REFERENCES users(id),
  logged_at TIMESTAMP WITH TIME ZONE,
  gram DECIMAL(6,2),
  total_calories DECIMAL(8,2)
);
```

### log_foods
```sql
CREATE TABLE log_foods (
  log_id BIGINT REFERENCES logs(id),
  food_id BIGINT REFERENCES foods(id),
  PRIMARY KEY (log_id, food_id)
);
```

## 2. Required Indexes
| Table | Index | Type |
|-------|-------|------|
| users | `username` | UNIQUE |
| foods | `name` | B-TREE |
| logs | `user_id, logged_at` | B-TREE (Compound) |
| foods | `user_id` | B-TREE |

## 3. Query Examples
- **Daily calorie summary**:
  ```sql
  SELECT DATE(logged_at) as date, SUM(total_calories) as total
  FROM logs 
  WHERE user_id = :userId 
  GROUP BY DATE(logged_at);
  ```
- **Weekly weight trend** (requires casting since current_weight is varchar in this schema):
  ```sql
  -- Assuming target is to track weight changes over time if weight logs were separate.
  -- In this schema, users table holds the current_weight.
  SELECT current_weight, target_weight FROM users WHERE id = :userId;
  ```

## 4. Naming Convention
All table and column names in `snake_case`. Consistent with JPA `@Column(name = "snake_case")` and `@Table(name = "table_name")` mapping.

## 5. Building the Database

The project uses **PostgreSQL** running locally via Docker Compose. Follow these steps to spin up the database.

### 5.1 Docker Compose
Create (or verify) a `docker-compose.yml` at the repository root:

```yaml
version: "3.9"
services:
  postgres:
    image: postgres:15
    container_name: nutrition_postgres
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: password
      POSTGRES_DB: nutrition_db
    volumes:
      - pg_data:/var/lib/postgresql/data
volumes:
  pg_data:
```

Run:
```bash
docker compose up -d postgres
```
The database will be reachable at `jdbc:postgresql://localhost:5432/nutrition_db`.

### 5.2 Integration with Backend
Ensure the `application.yml` contains:
```yaml
spring:
  datasource:
    url: ${POSTGRES_URL:jdbc:postgresql://localhost:5432/nutrition_db}
    username: ${POSTGRES_USER:admin}
    password: ${POSTGRES_PASSWORD:password}
    driver-class-name: org.postgresql.Driver
  jpa:
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        dialect: org.hibernate.dialect.PostgreSQLDialect
```
The backend will automatically map the entities defined above using Spring Data JPA.
