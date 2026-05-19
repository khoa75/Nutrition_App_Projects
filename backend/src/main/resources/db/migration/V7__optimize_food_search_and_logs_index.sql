CREATE EXTENSION IF NOT EXISTS pg_trgm;

CREATE INDEX IF NOT EXISTS idx_foods_name_trgm
    ON foods USING GIN (name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_logs_user_logged_at
    ON logs (user_id, logged_at);
