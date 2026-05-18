CREATE TYPE user_status_enum AS ENUM ('LOCK', 'ACTIVE');


ALTER TABLE users
ADD COLUMN status user_status_enum NOT NULL DEFAULT 'ACTIVE';

ALTER TABLE users RENAME COLUMN username TO email;

ALTER TABLE foods DROP COLUMN fiber;

CREATE TYPE weight_goal_enum AS ENUM ('MAINTAIN', 'GAIN', 'LOSE');

ALTER TABLE users
ADD COLUMN goal_type weight_goal_enum;

ALTER TABLE users
ADD COLUMN kg_per_week NUMERIC(3,2);