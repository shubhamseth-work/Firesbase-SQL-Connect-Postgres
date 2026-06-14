-- ============================================
-- V005: Create employee_contacts table
-- ============================================

CREATE TABLE IF NOT EXISTS employee_contacts (
    id              UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id     UUID          NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    contact_type    VARCHAR(50)   NOT NULL DEFAULT 'EMERGENCY',
    first_name      VARCHAR(100)  NOT NULL,
    last_name       VARCHAR(100)  NOT NULL,
    relationship    VARCHAR(100),
    phone           VARCHAR(20)   NOT NULL,
    alternate_phone VARCHAR(20),
    email           VARCHAR(255),
    is_primary      BOOLEAN       NOT NULL DEFAULT false,
    is_active       BOOLEAN       NOT NULL DEFAULT true,
    notes           TEXT,
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    created_by      VARCHAR(255)  NOT NULL DEFAULT 'system',
    updated_by      VARCHAR(255)  NOT NULL DEFAULT 'system',

    CONSTRAINT chk_contact_type CHECK (
        contact_type IN ('EMERGENCY', 'PERSONAL', 'PROFESSIONAL', 'OTHER')
    )
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_employee_contacts_employee_id
    ON employee_contacts (employee_id);

CREATE INDEX IF NOT EXISTS idx_employee_contacts_type
    ON employee_contacts (contact_type);

CREATE INDEX IF NOT EXISTS idx_employee_contacts_is_primary
    ON employee_contacts (is_primary);

-- Trigger
CREATE TRIGGER trg_employee_contacts_updated_at
    BEFORE UPDATE ON employee_contacts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Ensure only one primary contact per type per employee
CREATE UNIQUE INDEX IF NOT EXISTS uq_employee_primary_contact
    ON employee_contacts (employee_id, contact_type)
    WHERE is_primary = true;