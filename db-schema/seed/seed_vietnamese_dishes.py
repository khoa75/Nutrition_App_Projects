#!/usr/bin/env python3
"""
Insert a small set of Vietnamese dishes with aggregated nutrition.

The script expects the `ingredients` collection to already contain the
referenced ingredients (populated by `seed_ingredients.py`).
If any referenced ingredient is missing, the dish is skipped and a warning
is logged – this keeps the script idempotent.
"""

import os
import sys
import logging
from datetime import datetime

from pymongo import MongoClient, InsertOne
from pymongo.errors import BulkWriteError

logging.basicConfig(level=logging.INFO, format="%(asctime)s %(levelname)s %(message)s")
logger = logging.getLogger(__name__)

MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017/nutrition")

# Hard‑coded sample dishes – in a real project this would be read from a CSV/JSON.
DISHES = [
    {
        "name": "Phở Bò",
        "cuisine": "vietnamese",
        "ingredients": [
            {"ingredient_name": "Beef broth", "quantity_g": 500},
            {"ingredient_name": "Rice noodles", "quantity_g": 200},
            {"ingredient_name": "Thinly sliced beef", "quantity_g": 100},
            {"ingredient_name": "Bean sprouts", "quantity_g": 50},
            {"ingredient_name": "Green onions", "quantity_g": 10},
            {"ingredient_name": "Cilantro", "quantity_g": 5},
        ],
    },
    {
        "name": "Gỏi Cuốn (Vietnamese Spring Rolls)",
        "cuisine": "vietnamese",
        "ingredients": [
            {"ingredient_name": "Rice paper", "quantity_g": 30},
            {"ingredient_name": "Shrimp", "quantity_g": 80},
            {"ingredient_name": "Rice vermicelli", "quantity_g": 40},
            {"ingredient_name": "Lettuce", "quantity_g": 20},
            {"ingredient_name": "Mint", "quantity_g": 5},
            {"ingredient_name": "Peanut sauce", "quantity_g": 30},
        ],
    },
    {
        "name": "Bánh Mì Thịt",
        "cuisine": "vietnamese",
        "ingredients": [
            {"ingredient_name": "Baguette", "quantity_g": 120},
            {"ingredient_name": "Grilled pork", "quantity_g": 80},
            {"ingredient_name": "Pickled carrots", "quantity_g": 20},
            {"ingredient_name": "Pickled daikon", "quantity_g": 20},
            {"ingredient_name": "Cilantro", "quantity_g": 5},
            {"ingredient_name": "Mayonnaise", "quantity_g": 10},
        ],
    },
]


def fetch_ingredient_doc(db, name):
    """Return the ingredient document (including its food reference) by name."""
    return db.ingredients.find_one({"name": name})


def compute_nutrition(db, ingredient_entries):
    """Aggregate nutrition based on ingredient quantity and the linked food.
    Returns a dict with total calories, protein_g, fat_g, carbohydrate_g, fiber_g, sugar_g.
    Returns None if any ingredient or its food cannot be resolved.
    """
    total = {
        "calories": 0,
        "protein_g": 0.0,
        "fat_g": 0.0,
        "carbohydrate_g": 0.0,
        "fiber_g": 0.0,
        "sugar_g": 0.0,
    }

    for entry in ingredient_entries:
        ing = fetch_ingredient_doc(db, entry["ingredient_name"])
        if not ing:
            logger.warning(f"Ingredient '{entry['ingredient_name']}' not found – skipping dish.")
            return None
        food = db.foods.find_one({"_id": ing["food_id"]}, {"nutrition_facts": 1, "serving_size_g": 1})
        if not food:
            logger.warning(f"Food for ingredient '{entry['ingredient_name']}' missing – skipping dish.")
            return None
        nf = food["nutrition_facts"]
        factor = entry["quantity_g"] / food["serving_size_g"]
        total["calories"] += int(nf["calories"] * factor)
        total["protein_g"] += nf["protein_g"] * factor
        total["fat_g"] += nf["fat_g"] * factor
        total["carbohydrate_g"] += nf["carbohydrate_g"] * factor
        total["fiber_g"] += nf.get("fiber_g", 0) * factor
        total["sugar_g"] += nf.get("sugar_g", 0) * factor

    # Round to two decimals for readability
    total["protein_g"] = round(total["protein_g"], 2)
    total["fat_g"] = round(total["fat_g"], 2)
    total["carbohydrate_g"] = round(total["carbohydrate_g"], 2)
    total["fiber_g"] = round(total["fiber_g"], 2)
    total["sugar_g"] = round(total["sugar_g"], 2)
    return total


def main() -> None:
    client = MongoClient(MONGODB_URI)
    db = client.get_default_database()
    dishes_coll = db.dishes

    ops = []
    for dish in DISHES:
        nutrition = compute_nutrition(db, dish["ingredients"])
        if nutrition is None:
            logger.info(f"Skipping dish '{dish['name']}' due to missing data.")
            continue

        # Build ingredient reference array for the dish document
        ingredient_refs = []
        for entry in dish["ingredients"]:
            ing_doc = fetch_ingredient_doc(db, entry["ingredient_name"])
            if not ing_doc:
                continue  # already logged earlier
            ingredient_refs.append({
                "ingredient_id": ing_doc["_id"],
                "quantity_g": entry["quantity_g"],
            })

        dish_doc = {
            "name": dish["name"],
            "cuisine": dish["cuisine"],
            "ingredients": ingredient_refs,
            "nutrition_facts": nutrition,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }
        ops.append(InsertOne(dish_doc))

    if not ops:
        logger.info("No dishes to insert.")
        return

    try:
        result = dishes_coll.bulk_write(ops, ordered=False)
        logger.info(f"Inserted {result.inserted_count} dishes.")
    except BulkWriteError as bwe:
        logger.error(f"Bulk write error: {bwe.details}")
        sys.exit(1)


if __name__ == "__main__":
    main()
