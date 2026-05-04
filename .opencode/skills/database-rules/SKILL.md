---
name: database-rules
description: Quy tắc thiết kế database MongoDB
---

# Database Design Rules (MongoDB)

- **Mapping**: Use Spring Data MongoDB annotations (`@Document`, `@Field`, `@Id`).
- **Naming**: Use `snake_case` for database collections and fields.
- **Relationships**: Prefer embedding for small, related data; use DBRefs or manual references for large/shared datasets.
- **Indexing**: Always define indexes for frequently queried fields.
- **Audit**: Use `@CreatedDate` and `@LastModifiedDate`.