---
name: database
description: MongoDB collection schemas, compound indexes, aggregation pipelines, and naming conventions
license: Apache-2.0
compatibility: opencode
---
## 1. Collection Schemas

### users
```json
{
  "_id": "ObjectId",
  "email": "string (unique, sparse)",
  "phone": "string (unique, sparse)",
  "password_hash": "string (bcrypt)",
  "full_name": "string",
  "role": "USER | ADMIN",
  "status": "ACTIVE | LOCKED",
  "failed_attempts": "number (default 0)",
  "locked_until": "ISODate | null",
  "social_providers": [{"provider": "google", "social_id": "string"}],
  "created_at": "ISODate",
  "updated_at": "ISODate"
}
```

### user_profiles
```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId (ref: users)",
  "dob": "ISODate",
  "gender": "MALE | FEMALE | OTHER",
  "height_cm": "number",
  "weight_kg": "number",
  "activity_level": "SEDENTARY | LIGHT | MODERATE | ACTIVE | VERY_ACTIVE",
  "goal_type": "LOSE | MAINTAIN | GAIN",
  "target_weight_kg": "number",
  "bmi": "number",
  "bmr": "number",
  "tdee": "number",
  "updated_at": "ISODate"
}
```

### weight_logs
```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId",
  "weight_kg": "number",
  "date": "ISODate (date only, no time)",
  "created_at": "ISODate"
}
```

### food_items
```json
{
  "_id": "ObjectId",
  "name": "string",
  "name_vi": "string (Vietnamese name)",
  "category": "string",
  "calories_per_100g": "number",
  "protein_g": "number",
  "carbs_g": "number",
  "fat_g": "number",
  "serving_size_g": "number",
  "image_url": "string | null",
  "is_verified": "boolean"
}
```

### meal_logs
```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId",
  "meal_type": "BREAKFAST | LUNCH | DINNER | SNACK",
  "items": [{"food_id": "ObjectId", "quantity_g": "number", "calories": "number"}],
  "total_calories": "number",
  "source": "MANUAL | AI_VISION",
  "image_url": "string | null",
  "date": "ISODate (date only)",
  "created_at": "ISODate"
}
```

### meal_plans
```json
{
  "_id": "ObjectId",
  "user_id": "ObjectId",
  "date": "ISODate (date only)",
  "meals": [{"meal_type": "BREAKFAST", "items": ["food_id"], "target_calories": "number"}],
  "total_target_calories": "number",
  "status": "ACTIVE | COMPLETED"
}
```

### audit_logs
```json
{
  "_id": "ObjectId",
  "admin_id": "ObjectId",
  "target_user_id": "ObjectId | null",
  "action": "string (e.g. LOCK_USER, EDIT_PROFILE)",
  "description": "string",
  "ip_address": "string",
  "created_at": "ISODate"
}
```

## 2. Required Indexes
| Collection | Index | Type |
|------------|-------|------|
| users | `{email: 1}` | unique, sparse |
| users | `{phone: 1}` | unique, sparse |
| user_profiles | `{user_id: 1}` | unique |
| weight_logs | `{user_id: 1, date: -1}` | compound |
| food_items | `{name: "text", name_vi: "text"}` | text |
| food_items | `{category: 1}` | single |
| meal_logs | `{user_id: 1, date: -1}` | compound |
| meal_logs | `{user_id: 1, meal_type: 1, date: -1}` | compound |
| meal_plans | `{user_id: 1, date: -1}` | compound |
| audit_logs | `{created_at: -1}` | single |
| audit_logs | `{target_user_id: 1, created_at: -1}` | compound |

## 3. Aggregation Pipelines (Examples)
- **Daily calorie summary**: `$match {user_id, date} → $group {meal_type → $sum: total_calories}`
- **Weekly weight trend**: `$match {user_id, date: {$gte: week_ago}} → $sort {date: -1} → $limit 7`
- **Top foods by frequency**: `$unwind items → $group {food_id → $count} → $sort {count: -1} → $limit 10`

## 4. Naming Convention

All field names in `snake_case` (consistent with Java `@Field("snake_case")` mapping).

## 5. Building the Database

The project uses **MongoDB** running locally via Docker Compose. Follow these steps to spin up the database and apply the required indexes.

### 5.1 Docker Compose
Create (or verify) a `docker-compose.yml` at the repository root with the following service definition:

```yaml
version: "3.9"
services:
  mongodb:
    image: mongo:7.0
    container_name: nutrition_mongo
    restart: unless-stopped
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_DATABASE: nutrition_db
    volumes:
      - mongo_data:/data/db
volumes:
  mongo_data:
```

Run:
```
docker compose up -d mongodb
```
The database will be reachable at `mongodb://localhost:27017/nutrition_db` which matches the `mongodb.url` entry in `opencode.json`.

### 5.2 Index Creation Script
Create a script `scripts/init_indexes.js` (executed with `mongosh`) that creates all indexes defined in **Section 2** of this skill:

```js
use nutrition_db;

// users indexes
db.users.createIndex({email: 1}, {unique: true, sparse: true});
db.users.createIndex({phone: 1}, {unique: true, sparse: true});

// user_profiles
db.user_profiles.createIndex({user_id: 1}, {unique: true});

// weight_logs
db.weight_logs.createIndex({user_id: 1, date: -1});

// food_items
db.food_items.createIndex({name: "text", name_vi: "text"});
db.food_items.createIndex({category: 1});

// meal_logs
db.meal_logs.createIndex({user_id: 1, date: -1});
db.meal_logs.createIndex({user_id: 1, meal_type: 1, date: -1});

// meal_plans
db.meal_plans.createIndex({user_id: 1, date: -1});

// audit_logs
db.audit_logs.createIndex({created_at: -1});
db.audit_logs.createIndex({target_user_id: 1, created_at: -1});
```
Run the script after the container starts:
```
mongosh "mongodb://localhost:27017" scripts/init_indexes.js
```

### 5.3 Integration with Backend
The Spring Boot backend reads the connection string from `opencode.json` (`mongodb.url`). Ensure the `application.yml` contains:
```yaml
spring:
  data:
    mongodb:
      uri: ${MONGODB_URL:mongodb://localhost:27017/nutrition_db}
```
The backend will automatically map the collections defined above using Spring Data MongoDB repositories.

### 5.4 Testing the Connection
Run a quick sanity check from the backend module:
```bash
./mvnw test -Dtest=MongoConnectionTest
```
Create a simple JUnit test that injects `MongoTemplate` and performs a `countDocuments` on any collection. It should pass when the Docker container is up.

---
```
```

All field names in `snake_case` (consistent with Java `@Field("snake_case")` mapping)
