ALTER TABLE audit_logs
    ADD COLUMN IF NOT EXISTS ip_address VARCHAR(64);

UPDATE audit_logs
SET ip_address = 'unknown'
WHERE ip_address IS NULL;

ALTER TABLE audit_logs
    ALTER COLUMN ip_address SET NOT NULL;
