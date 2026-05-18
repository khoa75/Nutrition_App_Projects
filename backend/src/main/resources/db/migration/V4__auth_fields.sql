ALTER TABLE users
    ALTER COLUMN email DROP NOT NULL;

ALTER TABLE users
    ADD COLUMN phone VARCHAR(20) UNIQUE,
    ADD COLUMN social_provider VARCHAR(50),
    ADD COLUMN social_id VARCHAR(255) UNIQUE,
    ADD COLUMN failed_login_attempts INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN lock_until TIMESTAMP WITH TIME ZONE,
    ADD COLUMN refresh_token VARCHAR(512),
    ADD COLUMN refresh_token_expiry TIMESTAMP WITH TIME ZONE;

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);
