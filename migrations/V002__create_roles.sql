-- ============================================
-- V002: Create roles table
-- ============================================

CREATE TABLE IF NOT EXISTS roles (
    id            UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
    name          VARCHAR(100)  NOT NULL,
    code          VARCHAR(50)   NOT NULL,
    description   TEXT,
    level         INTEGER       NOT NULL DEFAULT 1,
    is_active     BOOLEAN       NOT NULL DEFAULT true,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    created_by    VARCHAR(255)  NOT NULL DEFAULT 'system',
    updated_by    VARCHAR(255)  NOT NULL DEFAULT 'system',

    CONSTRAINT uq_roles_code  UNIQUE (code),
    CONSTRAINT uq_roles_name  UNIQUE (name),
    CONSTRAINT chk_roles_level CHECK (level BETWEEN 1 AND 10),
    CONSTRAINT chk_roles_code CHECK (code = UPPER(code))
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_roles_code
    ON roles (code);

CREATE INDEX IF NOT EXISTS idx_roles_level
    ON roles (level);

CREATE INDEX IF NOT EXISTS idx_roles_is_active
    ON roles (is_active);

-- Attach trigger
CREATE TRIGGER trg_roles_updated_at
    BEFORE UPDATE ON roles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed default roles
INSERT INTO roles (name, code, description, level, created_by, updated_by)
VALUES
    ('Super Admin',       'SUPER_ADMIN',   'Full system access',                     10, 'system', 'system'),
    ('Admin',             'ADMIN',         'Administrative access',                  8,  'system', 'system'),
    ('Manager',           'MANAGER',       'Team and department management access',  6,  'system', 'system'),
    ('Senior Engineer',   'SR_ENGINEER',   'Senior level engineer access',           5,  'system', 'system'),
    ('Engineer',          'ENGINEER',      'Standard engineer access',               4,  'system', 'system'),
    ('Analyst',           'ANALYST',       'Analyst level access',                   3,  'system', 'system'),
    ('Intern',            'INTERN',        'Intern level access',                    2,  'system', 'system'),
    ('Viewer',            'VIEWER',        'Read only access',                       1,  'system', 'system')
ON CONFLICT (code) DO NOTHING;