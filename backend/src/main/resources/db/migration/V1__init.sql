CREATE TYPE bmi_status_enum AS ENUM (
    'UNDERWEIGHT',
    'NORMAL',
    'OVERWEIGHT',
    'OBESITY_LEVEL_1',
    'OBESITY_LEVEL_2'
);

CREATE TYPE activity_level_enum AS ENUM (
    'SEDENTARY',
    'LIGHT_ACTIVE',
    'ACTIVE',
    'VERY_ACTIVE'
);

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    dob DATE,

    username VARCHAR(100) NOT NULL UNIQUE,

    hash_password VARCHAR(255) NOT NULL,

    current_weight NUMERIC(5,2),

    target_weight NUMERIC(5,2),

    height NUMERIC(5,2),

    gender VARCHAR(20),

    goal_calories INTEGER,

    activity_level activity_level_enum,

    bmi NUMERIC(4,2),

    bmi_status bmi_status_enum
);

CREATE TABLE foods (
    id BIGSERIAL PRIMARY KEY,

    name VARCHAR(255) NOT NULL,

    protein NUMERIC(6,2) NOT NULL,

    carbs NUMERIC(6,2) NOT NULL,

    fats NUMERIC(6,2) NOT NULL,

    fiber NUMERIC(6,2) NOT NULL,

    calories_per_100g NUMERIC(6,2) NOT NULL,

    user_id BIGINT,

    CONSTRAINT fk_food_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);

CREATE TABLE logs (
    id BIGSERIAL PRIMARY KEY,

    user_id BIGINT NOT NULL,

    logged_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP,

    gram NUMERIC(6,2) NOT NULL,

    total_calories NUMERIC(8,2) NOT NULL,

    CONSTRAINT fk_log_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE log_foods (
    log_id BIGINT NOT NULL,

    food_id BIGINT NOT NULL,

    PRIMARY KEY (log_id, food_id),

    CONSTRAINT fk_log_food_log
        FOREIGN KEY (log_id)
        REFERENCES logs(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_log_food_food
        FOREIGN KEY (food_id)
        REFERENCES foods(id)
        ON DELETE CASCADE
);