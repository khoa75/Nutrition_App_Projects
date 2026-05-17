// foods.indexes.js
// Indexes for the foods collection

const db = db.getSiblingDB('nutrition_app');

db.foods.createIndex({ slug: 1 }, { unique: true });
db.foods.createIndex({ fdc_id: 1 }, { unique: true });
db.foods.createIndex({ category: 1, subcategory: 1 });
db.foods.createIndex({ tags: 1 });
db.foods.createIndex({ calories: 1 });
db.foods.createIndex({ protein: -1, carbs: 1, fat: -1 });
