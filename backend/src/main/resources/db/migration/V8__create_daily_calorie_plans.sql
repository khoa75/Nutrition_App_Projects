CREATE TABLE IF NOT EXISTS daily_calorie_plans (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT NOT NULL,
    plan_date DATE NOT NULL,
    base_target_calories INTEGER NOT NULL,
    target_calories INTEGER NOT NULL,
    consumed_calories NUMERIC(10,2) NOT NULL DEFAULT 0,
    remaining_calories NUMERIC(10,2) NOT NULL DEFAULT 0,
    CONSTRAINT fk_daily_calorie_plans_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT uq_daily_plan_user_date UNIQUE (user_id, plan_date)
);

CREATE INDEX IF NOT EXISTS idx_daily_plan_user_date
    ON daily_calorie_plans (user_id, plan_date);
