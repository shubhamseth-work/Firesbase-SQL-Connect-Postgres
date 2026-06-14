-- ============================================
-- V001: Create departments table
-- ============================================

CREATE TABLE IF NOT EXISTS departments (
    id            UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
    name          VARCHAR(100)  NOT NULL,
    code          VARCHAR(20)   NOT NULL,
    description   TEXT,
    is_active     BOOLEAN       NOT NULL DEFAULT true,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    created_by    VARCHAR(255)  NOT NULL DEFAULT 'system',
    updated_by    VARCHAR(255)  NOT NULL DEFAULT 'system',

    CONSTRAINT uq_departments_code UNIQUE (code),
    CONSTRAINT uq_departments_name UNIQUE (name),
    CONSTRAINT chk_departments_code CHECK (code = UPPER(code))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_departments_code
    ON departments (code);

CREATE INDEX IF NOT EXISTS idx_departments_is_active
    ON departments (is_active);

CREATE INDEX IF NOT EXISTS idx_departments_created_at
    ON departments (created_at DESC);

-- Auto-update updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach trigger to departments
CREATE TRIGGER trg_departments_updated_at
    BEFORE UPDATE ON departments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed default departments
INSERT INTO departments (name, code, description, created_by, updated_by)
VALUES
    ('Engineering',       'ENG',    'Software Engineering Department',    'system', 'system'),
    ('Human Resources',   'HR',     'Human Resources Department',         'system', 'system'),
    ('Finance',           'FIN',    'Finance and Accounting Department',  'system', 'system'),
    ('Marketing',         'MKT',    'Marketing and Growth Department',    'system', 'system'),
    ('Operations',        'OPS',    'Operations Department',              'system', 'system'),
    ('Sales',             'SAL',    'Sales Department',                   'system', 'system'),
    ('Product',           'PRD',    'Product Management Department',      'system', 'system'),
    ('Design',            'DES',    'UX and Design Department',           'system', 'system')
ON CONFLICT (code) DO NOTHING;