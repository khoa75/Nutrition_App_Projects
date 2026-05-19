CREATE TABLE user_weight_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    log_date DATE NOT NULL,
    weight NUMERIC(5,2) NOT NULL,
    CONSTRAINT fk_user_weight_logs_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE,
    CONSTRAINT uk_user_weight_logs_user_id_log_date
        UNIQUE (user_id, log_date)
);

CREATE INDEX idx_user_weight_logs_user_date ON user_weight_logs(user_id, log_date);
