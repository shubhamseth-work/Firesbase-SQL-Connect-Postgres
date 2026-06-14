-- ============================================
-- V004: Create employee_addresses table
-- ============================================

CREATE TABLE IF NOT EXISTS employee_addresses (
    id             UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id    UUID          NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    address_type   VARCHAR(50)   NOT NULL DEFAULT 'HOME',
    address_line1  VARCHAR(255)  NOT NULL,
    address_line2  VARCHAR(255),
    city           VARCHAR(100)  NOT NULL,
    state          VARCHAR(100),
    postal_code    VARCHAR(20),
    country        VARCHAR(100)  NOT NULL DEFAULT 'United States',
    is_primary     BOOLEAN       NOT NULL DEFAULT false,
    is_active      BOOLEAN       NOT NULL DEFAULT true,
    created_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    created_by     VARCHAR(255)  NOT NULL DEFAULT 'system',
    updated_by     VARCHAR(255)  NOT NULL DEFAULT 'system',

    CONSTRAINT chk_address_type CHECK (
        address_type IN ('HOME', 'WORK', 'MAILING', 'TEMPORARY', 'OTHER')
    )
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_employee_addresses_employee_id
    ON employee_addresses (employee_id);

CREATE INDEX IF NOT EXISTS idx_employee_addresses_type
    ON employee_addresses (address_type);

CREATE INDEX IF NOT EXISTS idx_employee_addresses_is_primary
    ON employee_addresses (is_primary);

-- Trigger
CREATE TRIGGER trg_employee_addresses_updated_at
    BEFORE UPDATE ON employee_addresses
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Ensure only one primary address per employee per type
CREATE UNIQUE INDEX IF NOT EXISTS uq_employee_primary_address
    ON employee_addresses (employee_id, address_type)
    WHERE is_primary = true;