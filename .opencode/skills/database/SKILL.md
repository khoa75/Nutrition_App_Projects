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
All field names in `snake_case` (consistent with Java `@Field("snake_case")` mapping)
