#!/usr/bin/env python3
"""
Nutrition App – MongoDB Seeding Script

Creates/updates the `nutrition_db` database with all required collections
and seeds the `food_items` collection from the transformed JSON data.

This script should be run AFTER `transform_usda_to_json.py` has generated
data/food_items.json.

Usage:
    python3 scripts/seed_mongodb.py                  # default: localhost:27017
    python3 scripts/seed_mongodb.py --uri mongodb://user:pass@host:27017
    python3 scripts/seed_mongodb.py --drop            # drop existing data first

Requires:
    pip install pymongo
    MongoDB server running (local or remote)
"""

import argparse
import json
import os
import sys

# ── Configuration ──────────────────────────────────────────────────────────
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FOOD_ITEMS_JSON = os.path.join(BASE_DIR, "data", "food_items.json")

DEFAULT_MONGO_URI = "mongodb://localhost:27017"
DB_NAME = "nutrition_db"
COLLECTION_NAME = "food_items"

BATCH_SIZE = 1000  # insert in batches to avoid excessive memory usage

# ── Index specifications ───────────────────────────────────────────────────
INDEXES = [
    # Unique index on source_id for deduplication
    {
        "keys": [("source_id", 1)],
        "name": "idx_source_id",
        "unique": True,
        "partialFilterExpression": {"source_id": {"$type": "string"}},
    },
    # Text index for full-text search on name and aliases
    {
        "keys": [("name.en", "text"), ("name.vi", "text"), ("aliases", "text")],
        "name": "idx_name_text",
    },
    # Index on categories for filtering
    {
        "keys": [("categories", 1)],
        "name": "idx_categories",
    },
    # Index on source for filtering
    {
        "keys": [("source", 1)],
        "name": "idx_source",
    },
]


# ── Seeder ─────────────────────────────────────────────────────────────────

def connect_mongo(uri: str):
    """Connect to MongoDB and return database handle."""
    try:
        from pymongo import MongoClient
        from pymongo.errors import ConnectionFailure
    except ImportError:
        print("[ERROR] pymongo is required. Install it with: pip install pymongo")
        sys.exit(1)

    try:
        client = MongoClient(uri, serverSelectionTimeoutMS=5000)
        # Verify connection
        client.admin.command("ping")
        print(f"  ✓ Connected to MongoDB at {uri}")
        return client[DB_NAME]
    except ConnectionFailure as e:
        print(f"[ERROR] Cannot connect to MongoDB: {e}")
        print("  Make sure MongoDB is running and reachable.")
        sys.exit(1)


def load_json_data(path: str):
    """Load food items from JSON file."""
    if not os.path.exists(path):
        print(f"[ERROR] JSON file not found: {path}")
        print("  Run `python3 scripts/transform_usda_to_json.py` first.")
        sys.exit(1)

    with open(path, "r", encoding="utf-8") as f:
        data = json.load(f)

    print(f"  ✓ Loaded {len(data)} food items from {path}")
    return data


def create_collection_with_indexes(db, drop_first: bool = False):
    """Create/clear the food_items collection and build indexes."""
    collection = db[COLLECTION_NAME]

    if drop_first:
        print(f"  Dropping existing collection '{COLLECTION_NAME}'...")
        collection.drop()
        # Re-create (will be created implicitly on first insert, but explicit is clear)
        db.create_collection(COLLECTION_NAME)
        print("  ✓ Collection dropped and re-created")

    # Ensure collection exists
    if COLLECTION_NAME not in db.list_collection_names():
        db.create_collection(COLLECTION_NAME)
        print(f"  ✓ Created collection '{COLLECTION_NAME}'")

    # Create indexes
    existing_indexes = [idx["name"] for idx in collection.list_indexes()]
    for idx_spec in INDEXES:
        name = idx_spec["name"]
        if name in existing_indexes:
            print(f"  ∼ Index '{name}' already exists, skipping")
            continue

        keys = idx_spec.pop("keys")
        collection.create_index(keys, **idx_spec)
        print(f"  ✓ Created index '{name}'")
        idx_spec["keys"] = keys  # restore for potential re-use

    return collection


def seed_food_items(collection, items, batch_size: int = BATCH_SIZE):
    """Insert food items in batches, skipping duplicates."""
    inserted = 0
    skipped = 0

    for i in range(0, len(items), batch_size):
        batch = items[i : i + batch_size]
        try:
            # Use ordered=False to continue on duplicate key errors
            result = collection.insert_many(batch, ordered=False)
            inserted += len(result.inserted_ids)
        except Exception as e:
            # pymongo throws BulkWriteError for duplicates; count successes
            from pymongo.errors import BulkWriteError
            if isinstance(e, BulkWriteError):
                inserted += e.details.get("nInserted", 0)
                skipped += len(batch) - e.details.get("nInserted", 0)
            else:
                print(f"  [WARN] Batch insert failed: {e}")
                # Fallback: insert one by one
                for doc in batch:
                    try:
                        collection.insert_one(doc)
                        inserted += 1
                    except Exception:
                        skipped += 1

    print(f"  ✓ Inserted: {inserted}")
    if skipped > 0:
        print(f"  ∼ Skipped (duplicates): {skipped}")
    return inserted


# ── Collection initialization (without seeding) ───────────────────────────

def init_collections(db, drop_first: bool = False):
    """
    Initialize ALL required collections for nutrition_db.
    
    This creates the empty collections and indexes defined in the database skill.
    Call this if you want just the schema without data.
    """
    collections_schema = {
        "users": [
            {"keys": [("email", 1)], "name": "idx_email", "unique": True, "sparse": True},
            {"keys": [("phone", 1)], "name": "idx_phone", "unique": True, "sparse": True},
        ],
        "user_profiles": [
            {"keys": [("user_id", 1)], "name": "idx_user_id", "unique": True},
        ],
        "weight_logs": [
            {"keys": [("user_id", 1), ("date", -1)], "name": "idx_user_date"},
        ],
        COLLECTION_NAME: [  # food_items – indexes already defined above
            {"keys": [("source_id", 1)], "name": "idx_source_id", "unique": True,
             "partialFilterExpression": {"source_id": {"$type": "string"}}},
            {"keys": [("name.en", "text"), ("name.vi", "text"), ("aliases", "text")],
             "name": "idx_name_text"},
            {"keys": [("categories", 1)], "name": "idx_categories"},
            {"keys": [("source", 1)], "name": "idx_source"},
        ],
        "meal_logs": [
            {"keys": [("user_id", 1), ("date", -1)], "name": "idx_user_date"},
            {"keys": [("user_id", 1), ("meal_type", 1), ("date", -1)], "name": "idx_user_meal_date"},
        ],
        "meal_plans": [
            {"keys": [("user_id", 1), ("date", -1)], "name": "idx_user_date"},
        ],
        "audit_logs": [
            {"keys": [("created_at", -1)], "name": "idx_created_at"},
            {"keys": [("target_user_id", 1), ("created_at", -1)], "name": "idx_target_date"},
        ],
    }

    for coll_name, idx_list in collections_schema.items():
        if drop_first and coll_name in db.list_collection_names():
            db[coll_name].drop()
            print(f"  Dropped existing collection '{coll_name}'")

        if coll_name not in db.list_collection_names():
            db.create_collection(coll_name)
            print(f"  ✓ Created collection '{coll_name}'")

        existing = [idx["name"] for idx in db[coll_name].list_indexes()]
        for idx_spec in idx_list:
            name = idx_spec["name"]
            if name in existing:
                continue
            keys = idx_spec.pop("keys")
            db[coll_name].create_index(keys, **idx_spec)
            print(f"  ✓ Created index '{name}' on '{coll_name}'")
            idx_spec["keys"] = keys


# ── Main ───────────────────────────────────────────────────────────────────

def main():
    parser = argparse.ArgumentParser(
        description="Seed MongoDB with Nutrition App data"
    )
    parser.add_argument(
        "--uri",
        default=os.environ.get("MONGO_URI", DEFAULT_MONGO_URI),
        help=f"MongoDB connection URI (default: {DEFAULT_MONGO_URI})",
    )
    parser.add_argument(
        "--drop",
        action="store_true",
        help="Drop existing food_items collection before seeding",
    )
    parser.add_argument(
        "--init-only",
        action="store_true",
        help="Only create collections and indexes (no data seeding)",
    )
    parser.add_argument(
        "--json",
        default=FOOD_ITEMS_JSON,
        help=f"Path to food items JSON file (default: {FOOD_ITEMS_JSON})",
    )
    args = parser.parse_args()

    print("=" * 60)
    print("Nutrition App – MongoDB Seeder")
    print("=" * 60)

    # 1. Connect
    db = connect_mongo(args.uri)

    # 2. Initialize all collections
    print("\nInitializing collections...")
    init_collections(db, drop_first=args.drop)

    # 3. Seed food items (skip if --init-only)
    if not args.init_only:
        print(f"\nSeeding '{COLLECTION_NAME}' collection...")
        items = load_json_data(args.json)
        collection = db[COLLECTION_NAME]
        seed_food_items(collection, items)

    print("\n" + "=" * 60)
    print("Done! Database summary:")
    print(f"  Database: {DB_NAME}")
    for name in db.list_collection_names():
        count = db[name].estimated_document_count()
        print(f"  Collection '{name}': ~{count} documents")
    print("=" * 60)


if __name__ == "__main__":
    main()
