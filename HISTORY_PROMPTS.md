# User Prompt History

This file tracks the prompts provided by the user during the development of the Nutrition App.

| Date & Time | Prompt |
| :--- | :--- |
| 2026-05-15 14:46 | Hãy chỉnh file loading_state.md, glossary.md, core_test_cases thành tiếng Anh |
| 2026-05-15 15:00 | Hãy chỉ file /home/khoa/Projects/Nutrition_App/Nutrition_App_Projects/.opencode/context/07-api-contracts/README.md lại thành tiếng Anh giúp tôi |
| 2026-05-15 15:20 | Cập nhật vào một file gọi là HISTORY_PROMPTS.md với mục tiêu là lưu tất cả các prompts từ nay mà tôi sử dụng |
| 2026-05-15 15:21 | Cập nhật điều này vào trong file AGENTS.md giúp tôi |
| 2026-05-15 15:27 | Cập nhật điều này vào trong file AGENTS.md giúp tôi |
| 2026-05-15 20:08 | Trong phần context ui-ux có thể thêm cho tôi phần màu sắc chủ đạo không. Đây là các màu sắc chủ đạo mà tôi mong muốn: Bộ màu "Modern Mint" (Hiện đại & Thanh thoát)... Dựa vào user_stories.md có thể giúp tôi cập nhật lại các file trong thư mục ui-ux |
| 2026-05-15 20:22 | Primary (Chủ đạo): #76FF03 (Xanh chanh cực kỳ bắt mắt) Secondary (Phụ): #C6FF00 (Xanh vàng tạo sự tươi mới) Background (Nền): #FAFAFA (Trắng xám nhẹ để tông xanh nổi bật) Surface (Vùng chứa): #FFFFFF (Trắng thuần) Accent (Điểm nhấn): #303F9F (Xanh Indigo đậm để tạo độ sâu và sự chuyên nghiệp) Text (Chữ): #212121 (Đen xám cho độ tương phản cao nhất) Thêm cho tôi phần này vào trong file admin-dashboard.md |
| 2026-05-16 05:17 | Có thể dựa vào user_stories.md sau đó cập nhật lại giúp tôi phần ui-ux không |
| 2026-05-16 05:32 | Hãy cập nhật tất cả các files trong folder agents và folders skills thành format này giúp tôi |
<<<<<<< HEAD
| 2026-05-16 05:53 | Phần sub-agents có thể tổ chức lại theo vai trò của từng agents không |
| 2026-05-17 22:50 | Create or update `AGENTS.md` for this repository. |
=======
| 2026-05-16 05:53 | Phần sub-agents có thể tổ chức lại theo vai trò của từng agents không | 

Your task is to generate a complete, structured food dataset (~5900 items) for a Nutrition Management System.

The dataset must combine:
1. USDA food database style data
2. Vietnamese traditional dishes dataset
3. International common foods (fast food, snacks, drinks)
4. AI-ready metadata (tags + embeddings)
5. Cloud image pipeline integration

---

# OBJECTIVE

Generate a production-ready dataset of 5900 food items in JSON format, structured for MongoDB ingestion.

Each food item must be consistent, normalized, and suitable for:
- Nutrition tracking
- Meal recommendation system
- AI image recognition
- Semantic search (vector embeddings)

---

# DATA SOURCES SIMULATION

You must simulate and merge:
- USDA FoodData Central structure (nutrition breakdown per 100g)
- Vietnamese cuisine dataset (pho, com tam, bun bo, banh mi, etc.)
- Global food dataset (burger, pizza, sushi, pasta, drinks, desserts)

DO NOT copy real proprietary datasets. Instead, generate realistic synthetic but statistically plausible values.

---

# REQUIRED FOOD ITEM STRUCTURE

Each food must follow this schema:

{
  "name": string,                  // English name
  "nameVi": string,                // Vietnamese name (if applicable)
  "category": string,              // Vietnamese Dish | USDA | Fast Food | Snack | Drink | Dessert
  "baseCalories": number,          // per serving
  "protein": number,               // grams per serving
  "fat": number,
  "carbs": number,

  "servingSize": string,           // e.g. "1 bowl", "1 slice"
  "servingGrams": number,

  "ingredients": [
    {
      "name": string,
      "weight": number
    }
  ],

  "source": "USDA | VIETNAMESE | GLOBAL",

  "imagePrompt": string,           // prompt to generate food image (for AI pipeline)
  "imageUrl": string | null,       // initially null, later filled by Cloudinary upload pipeline

  "tags": [string],                // e.g. ["high-protein", "low-carb", "fried", "soup"]

  "embedding": number[]            // 384–1536 dimensional vector placeholder (random but consistent format)
}

---

# CLOUDINARY PIPELINE REQUIREMENTS

You must design an automated pipeline:

STEP 1:
- Use "imagePrompt" field to generate realistic food images using AI image generation model

STEP 2:
- Upload generated images to Cloudinary using:
  - folder: "nutrition-app/foods/"
  - public_id: slugified food name

STEP 3:
- Store returned Cloudinary URL into "imageUrl"

IMPORTANT:
- Do NOT embed images in dataset
- Only store URLs
- Ensure every food has a unique image prompt

---

# VIETNAMESE FOOD REQUIREMENTS

Include at least 1500 Vietnamese dishes such as:
- Phở bò
- Bún bò Huế
- Cơm tấm
- Bánh mì
- Gỏi cuốn
- Bún chả
- Cháo gà
- Hủ tiếu
- Bánh xèo

Ensure:
- realistic nutrition values
- culturally accurate naming
- region-based variations (North / Central / South)

---

# USDA / GLOBAL REQUIREMENTS

Include:
- meats (beef, chicken, pork, fish)
- vegetables
- fruits
- grains
- dairy
- fast food (burger, fries, pizza)
- drinks (coffee, tea, soda)

Ensure nutritional consistency per 100g scaling logic.

---

# EMBEDDING REQUIREMENTS

For each food:
- Generate a semantic embedding vector (length 768)
- Must encode:
  - food type
  - ingredients
  - cooking method
  - cuisine type

If true embedding model is not available:
- simulate deterministic pseudo-random vector based on hash of food name

---

# TAGGING RULES

Auto-generate tags:
- high-protein
- low-carb
- vegan
- fried
- grilled
- soup
- dessert
- spicy
- healthy
- fast-food

---

# OUTPUT REQUIREMENTS

Return:

1. JSON array of 5900 food objects
2. Grouped into batches of 500 items per chunk
3. Include metadata header:
   - total count
   - categories distribution
   - Vietnamese vs Global ratio

---

# QUALITY RULES

- No duplicate foods
- No missing fields
- Calories must be realistic
- Protein/fat/carb must sum logically
- Vietnamese foods must look authentic
- Global foods must reflect real-world nutrition patterns
- Embedding must always be present

---

# OPTIONAL BONUS (IF POSSIBLE)

Also generate:
- "ingredient master table"
- "food similarity mapping (top 5 similar foods per item)"
- "calorie normalization function"

---

Now generate the dataset.
>>>>>>> 16f94c8fe49fd7b5b2e00a9f04fd0532693564ea
