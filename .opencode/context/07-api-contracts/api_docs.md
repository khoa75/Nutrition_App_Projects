# Mock Data & API Contracts

This document contains JSON structures representing the data returned from APIs.
It serves as a "contract" between Backend and Frontend.

## Standard Backend Return Structure
The project uses a standard `ApiResponse<T>` format for all API responses. 
*Note: In the specific API examples below, fields like `success` (boolean) and `timestamp` (ISO string) are omitted for brevity, but they are always included in the actual response wrapper alongside `message` and `data`.*

---

## 1. AUTH 

### POST /auth/register
**Request:**
```json
{
  "name": "John Doe",
  "dob": "2003-05-20",
  "email": "john@gmail.com",
  "password": "123456"
}
```
**Response:**
```json
{
  "message": "Register success",
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@gmail.com",
    "status": "ACTIVE"
  }
}
```

### POST /auth/login
**Request:**
```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```
**Response:**
```json
{
  "message": "Login success",
  "data": {
    "accessToken": "jwt-token",
    "type": "Bearer"
  }
}
```

---

## 2. USERS 

### GET /users/me
**Response:**
```json
{
  "message": "Get profile success",
  "data": {
    "id": 1,
    "name": "John Doe",
    "dob": "2003-05-20",
    "email": "john@gmail.com",
    "currentWeight": 70,
    "targetWeight": 65,
    "height": 175,
    "gender": "MALE",
    "goalCalories": 2200,
    "activityLevel": "ACTIVE",
    "bmi": 22.9,
    "bmiStatus": "NORMAL",
    "status": "ACTIVE",
    "goalType": "LOSE",
    "kgPerWeek": 0.5
  }
}
```

### PUT /users/me/goal-calories
**Request:**
```json
{
  "currentWeight": 70,
  "targetWeight": 65,
  "height": 175,
  "gender": "MALE",
  "activityLevel": "ACTIVE",
  "goalType": "LOSE",
  "kgPerWeek": 0.5
}
```
**Response:**
```json
{
  "message": "Calculate goal calories success",
  "data": {
    "goalCalories": 2200
  }
}
```

---

## 3. FOODS

### POST /foods
**Request:**
```json
{
  "name": "White Rice",
  "protein": 2.7,
  "carbs": 28,
  "fats": 0.3,
  "caloriesPer100g": 130,
  "userId": null
}
```
*Notes: ADMIN tạo món thì `userId: null`, USER tạo món thì truyền `userId`.*

**Response:**
```json
{
  "message": "Create food success",
  "data": {
    "id": 1,
    "name": "White Rice",
    "protein": 2.7,
    "carbs": 28,
    "fats": 0.3,
    "caloriesPer100g": 130,
    "userId": null
  }
}
```

### GET /foods
*(Tìm kiếm tương đối theo name)*
**Query:** `/foods?name=rice&page=0&size=10`

**Response:**
```json
{
  "message": "Get foods success",
  "data": {
    "content": [
      {
        "id": 1,
        "name": "White Rice",
        "caloriesPer100g": 130,
        "userId": null
      },
      {
        "id": 2,
        "name": "Brown Rice",
        "caloriesPer100g": 120,
        "userId": 5
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 2
  }
}
```

### PUT /foods/{id}
*(Endpoint dùng để cập nhật thông tin món ăn, tương tự cấu trúc POST)*

---

## 4. LOGS

### POST /logs
**Request:**
```json
{
  "userId": 1,
  "foodId": 1,
  "gram": 250,
  "loggedAt": "2026-05-18T10:30:00"
}
```
**Response:**
```json
{
  "message": "Create log success",
  "data": {
    "id": 10,
    "userId": 1,
    "foodId": 1,
    "foodName": "White Rice",
    "gram": 250,
    "goalCalories": 2200,
    "totalCalories": 325,
    "loggedAt": "2026-05-18T10:30:00"
  }
}
```

### GET /logs
**Query:** `/logs?userId=1&from=2026-05-01&to=2026-05-31&page=0&size=10`

**Response:**
```json
{
  "message": "Get logs success",
  "data": {
    "content": [
      {
        "id": 1,
        "userId": 1,
        "foodId": 1,
        "foodName": "White Rice",
        "gram": 200,
        "goalCalories": 2200,
        "totalCalories": 260,
        "loggedAt": "2026-05-18T08:00:00"
      },
      {
        "id": 2,
        "userId": 1,
        "foodId": 2,
        "foodName": "Chicken Breast",
        "gram": 150,
        "goalCalories": 2200,
        "totalCalories": 247.5,
        "loggedAt": "2026-05-18T12:00:00"
      }
    ],
    "page": 0,
    "size": 10,
    "totalElements": 2
  }
}
```

### PUT /logs/{id}
**Request:**
```json
{
  "gram": 300
}
```
**Response:**
```json
{
  "message": "Update log success",
  "data": null
}
```

### DELETE /logs/{id}
**Response:**
```json
{
  "message": "Delete log success",
  "data": null
}
```

---

## 5. STATISTIC

### GET /statistics/weekly
**Query:** `?userId=1&start=2026-05-12`

**Response:**
```json
{
  "message": "Get weekly statistics success",
  "data": {
    "labels": ["5", "6", "...ngày"],
    "calories": [1800, 2100, 2200, 1900, 2400, 2000, 1750],
    "goals": [2100, 2100, 2100, 2100, 2100, 2100, 2100]
  }
}
```

### GET /statistics/monthly
**Query:** `?userId=1&year=2026&month=5`

**Response:**
```json
{
  "message": "Get monthly statistics success",
  "data": {
    "labels": ["5", "6", "...ngày"],
    "calories": [1800, 2100, 2200, 1900, 2400, 2000, 1750],
    "goals": [2100, 2100, 2100, 2100, 2100, 2100, 2100]
  }
}
```
