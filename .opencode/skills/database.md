# Skill: Database Management (MongoDB)

Skills to design and optimize NoSQL databases to achieve high performance and support scalability.

## 1. Data Modeling
- **Document Design**: Design collection structures (User, MealLog, FoodItem) optimized for data retrieval following the Modular Monolith architecture.
- **Data Consistency**: Manage data integrity at the Application layer since MongoDB lacks strict Foreign Keys, designing Schemas that meet read/write performance requirements.

## 2. Performance Tuning
- **Indexing Strategy**: Build `Text Indexes` or `Compound Indexes` for frequent search queries (e.g., searching for foods, filtering users).
- **Aggregation Pipeline**: Optimize complex statistical queries (e.g., calculating total calories per week/month) directly at the Database layer to reduce Backend load.

## 3. Database Administration
- **MongoDB Atlas**: Manage clusters on the cloud, configure access controls, and set up Network Peering.
- **Data Retention & Archiving**: Formulate strategies to store and clean up long-term historical data without degrading the performance of current queries.
