#!/usr/bin/env python3
"""
Nutrition App – USDA FoodData Central → JSON Transformer

Reads USDA FoodData Central CSV files (foundation + survey) and transforms them
into the standard food_items JSON format defined in data/food_items_format.json.

Output: data/food_items.json (JSON array of food item objects)

Usage:
    python3 scripts/transform_usda_to_json.py

Requires: Python 3.8+ (standard library only, no external deps)
"""

import csv
import json
import os
from collections import defaultdict

# ── Paths ──────────────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FOUNDATION_DIR = os.path.join(
    BASE_DIR, "data", "FoodData_Central",
    "FoodData_Central_foundation_food_csv_2026-04-30"
)
SURVEY_DIR = os.path.join(
    BASE_DIR, "data", "FoodData_Central_2",
    "FoodData_Central_survey_food_csv_2024-10-31"
)
OUTPUT_PATH = os.path.join(BASE_DIR, "data", "food_items.json")

# ── Nutrient IDs we care about ─────────────────────────────────────────────
# These map USDA nutrient_id → our internal field name (per 100g)
TARGET_NUTRIENTS = {
    "1008": "calories_per_100g",   # Energy (KCAL)
    "1003": "protein_g",           # Protein
    "1005": "carbs_g",             # Carbohydrate, by difference
    "1004": "fat_g",               # Total lipid (fat)
    "1079": "fiber_g",             # Fiber, total dietary
    "1063": "sugars_g",            # Sugars, Total
}

# ── Helpers ────────────────────────────────────────────────────────────────

def load_csv(filename, directory):
    """Load a CSV file and return a list of dicts."""
    path = os.path.join(directory, filename)
    if not os.path.exists(path):
        print(f"  [WARN] File not found: {path}")
        return []
    with open(path, newline="", encoding="utf-8") as f:
        return list(csv.DictReader(f))


def build_lookup(data, key_field="id"):
    """Convert a list of dicts into {key_value: row_dict} lookup."""
    return {row[key_field]: row for row in data}


def parse_float(value):
    """Parse a string to float; return 0.0 if empty/invalid."""
    if value is None or value.strip() == "":
        return 0.0
    try:
        return float(value)
    except ValueError:
        return 0.0


def normalize_food_description(desc):
    """Clean up food description: title-case, strip extra whitespace."""
    return " ".join(desc.split())


# ── Transform a single dataset (foundation or survey) ──────────────────────

def transform_dataset(source_label, directory, is_foundation):
    """
    Transform all food items from a USDA CSV dataset into our format.

    Args:
        source_label: "usda_foundation" or "usda_survey"
        directory: path to the CSV directory
        is_foundation: True for foundation foods, False for survey

    Returns:
        list of food item dicts in our standard format
    """
    print(f"\nProcessing {source_label} from {directory}...")

    # Load all reference CSVs
    foods = load_csv("food.csv", directory)
    nutrients = load_csv("nutrient.csv", directory)
    food_nutrients = load_csv("food_nutrient.csv", directory)
    portions = load_csv("food_portion.csv", directory)
    food_categories = load_csv("food_category.csv", directory)
    measure_units = load_csv("measure_unit.csv", directory)

    # Survey-specific
    wweia_categories = load_csv("wweia_food_category.csv", directory)

    # Build lookup maps
    nutrient_names = build_lookup(nutrients)        # id → {name, unit_name}
    cat_lookup = build_lookup(food_categories, "id") if food_categories else {}
    wweia_lookup = {}
    if wweia_categories:
        for row in wweia_categories:
            wweia_lookup[row["wweia_food_category"]] = row["wweia_food_category_description"]
    unit_lookup = build_lookup(measure_units, "id") if measure_units else {}

    # ── Nutrient ID mapping ────────────────────────────────────────────────
    # Survey dataset stores `nutrient_nbr` (legacy) in the `nutrient_id` column.
    # Build a reverse map: nutrient_nbr → nutrient.id for both datasets.
    nbr_to_id = {}
    for row in nutrients:
        nbr = row.get("nutrient_nbr", "").strip()
        nid = row["id"]
        if nbr and nbr != nid:      # only store when they differ
            nbr_to_id[nbr] = nid
        nbr_to_id[nid] = nid        # identity mapping for safety

    # Group food_nutrient rows by fdc_id → {target_nutrient_id: amount}
    nutrient_by_food = defaultdict(dict)
    for row in food_nutrients:
        fdc = row["fdc_id"]
        raw_nid = row["nutrient_id"]
        # Resolve to the canonical nutrient id (handles survey nbr→id mapping)
        canonical_nid = nbr_to_id.get(raw_nid, raw_nid)
        nutrient_by_food[fdc][canonical_nid] = row["amount"]

    # Group portion rows by fdc_id → list of portions
    portion_by_food = defaultdict(list)
    for row in portions:
        portion_by_food[row["fdc_id"]].append(row)

    # Filter to only data_type we care about
    valid_types = {"foundation_food"} if is_foundation else {"survey_fndds_food"}
    foods = [f for f in foods if f["data_type"] in valid_types]
    print(f"  Found {len(foods)} valid food items after filtering by data_type")

    output = []
    skipped = 0

    for food in foods:
        fdc_id = food["fdc_id"]
        desc = normalize_food_description(food["description"])
        if not desc:
            skipped += 1
            continue

        # ── Nutrition (per 100g) ───────────────────────────────────────────
        food_nut = nutrient_by_food.get(fdc_id, {})
        nutrition = {}
        for nid, field in TARGET_NUTRIENTS.items():
            raw = food_nut.get(nid, "0")
            nutrition[field] = parse_float(raw)

        # ── Serving ────────────────────────────────────────────────────────
        serving = {"amount": 1, "unit": "serving", "grams": 100.0}
        food_portions = portion_by_food.get(fdc_id, [])
        if food_portions:
            # Pick the first portion with a meaningful gram_weight
            for p in food_portions:
                gw = parse_float(p.get("gram_weight", "0"))
                if gw > 0:
                    unit_id = p.get("measure_unit_id", "")
                    unit_name = unit_lookup.get(unit_id, {}).get("name", "serving") if unit_id else "serving"
                    amt = parse_float(p.get("amount", "1"))
                    desc_text = p.get("portion_description", "").strip()
                    serving = {
                        "amount": amt if amt > 0 else 1,
                        "unit": desc_text if desc_text else unit_name,
                        "grams": gw,
                    }
                    break

        # ── Categories ─────────────────────────────────────────────────────
        cat_id = food.get("food_category_id", "")
        categories = []
        if cat_id and cat_id in cat_lookup:
            categories.append(cat_lookup[cat_id]["description"])
        elif cat_id and cat_id in wweia_lookup:
            categories.append(wweia_lookup[cat_id])

        # ── Build the output object ────────────────────────────────────────
        prefix = "fdc" if is_foundation else "srv"
        item = {
            "_id": f"{prefix}_{fdc_id}",
            "name": {
                "en": desc,
                "vi": None,
            },
            "aliases": [],
            "source": source_label,
            "source_id": fdc_id,
            "categories": categories,
            "ingredients": [],
            "nutrition": nutrition,
            "serving": serving,
            "meal_types": [],
            "tags": [],
            "embedding_id": None,
            "created_at": "2026-05-16",
        }
        output.append(item)

    print(f"  Transformed {len(output)} items ({skipped} skipped)")
    return output


# ── Main ───────────────────────────────────────────────────────────────────

def main():
    print("=" * 60)
    print("Nutrition App – USDA FoodData Central Transformer")
    print("=" * 60)

    all_items = []

    # 1. Foundation foods
    if os.path.isdir(FOUNDATION_DIR):
        items = transform_dataset("usda_foundation", FOUNDATION_DIR, is_foundation=True)
        all_items.extend(items)
    else:
        print(f"\n[WARN] Foundation directory not found: {FOUNDATION_DIR}")

    # 2. Survey foods
    if os.path.isdir(SURVEY_DIR):
        items = transform_dataset("usda_survey", SURVEY_DIR, is_foundation=False)
        all_items.extend(items)
    else:
        print(f"\n[WARN] Survey directory not found: {SURVEY_DIR}")

    # 3. Write output
    print(f"\nTotal items transformed: {len(all_items)}")
    with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
        json.dump(all_items, f, ensure_ascii=False, indent=2)
    print(f"Output written to: {OUTPUT_PATH}")
    print(f"File size: {os.path.getsize(OUTPUT_PATH) / 1024 / 1024:.2f} MB")


if __name__ == "__main__":
    main()
