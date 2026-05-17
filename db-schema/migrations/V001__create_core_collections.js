// V001__create_core_collections.js
// Create collections with JSON schema validation

function loadSchema(path) {
  const fs = require('fs');
  return JSON.parse(fs.readFileSync(path, 'utf8'));
}

// Helper to create collection if it does not exist
function ensureCollection(name, schemaPath) {
  const db = db.getSiblingDB('nutrition_app'); // use a dedicated DB name
  const collNames = db.getCollectionNames();
  if (!collNames.includes(name)) {
    db.createCollection(name, { validator: { $jsonSchema: loadSchema(schemaPath) } });
    print(`Created collection ${name}`);
  } else {
    // Update validator if schema changed
    db.runCommand({ collMod: name, validator: { $jsonSchema: loadSchema(schemaPath) } });
    print(`Updated validator for ${name}`);
  }
}

ensureCollection('foods', 'db-schema/schema/foods.schema.json');
ensureCollection('ingredients', 'db-schema/schema/ingredients.schema.json');
ensureCollection('dishes', 'db-schema/schema/dishes.schema.json');
ensureCollection('users', 'db-schema/schema/users.schema.json');
ensureCollection('meal_plans', 'db-schema/schema/meal_plans.schema.json');
ensureCollection('nutrition_logs', 'db-schema/schema/nutrition_logs.schema.json');
ensureCollection('recommendation_logs', 'db-schema/schema/recommendation_logs.schema.json');
