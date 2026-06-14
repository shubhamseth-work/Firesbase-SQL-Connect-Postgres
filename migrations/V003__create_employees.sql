-- ============================================
-- V003: Create employees table
-- ============================================

CREATE TABLE IF NOT EXISTS employees (
    id                UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_number   VARCHAR(20)   NOT NULL,
    first_name        VARCHAR(100)  NOT NULL,
    last_name         VARCHAR(100)  NOT NULL,
    middle_name       VARCHAR(100),
    email             VARCHAR(255)  NOT NULL,
    personal_email    VARCHAR(255),
    phone             VARCHAR(20),
    date_of_birth     DATE,
    gender            VARCHAR(20),
    nationality       VARCHAR(100),
    hire_date         DATE          NOT NULL DEFAULT CURRENT_DATE,
    termination_date  DATE,
    employment_status VARCHAR(50)   NOT NULL DEFAULT 'ACTIVE',
    employment_type   VARCHAR(50)   NOT NULL DEFAULT 'FULL_TIME',
    job_title         VARCHAR(150),
    salary            NUMERIC(12,2),
    currency          VARCHAR(10)   NOT NULL DEFAULT 'USD',
    department_id     UUID          REFERENCES departments(id) ON DELETE SET NULL,
    role_id           UUID          REFERENCES roles(id) ON DELETE SET NULL,
    manager_id        UUID          REFERENCES employees(id) ON DELETE SET NULL,
    profile_picture   TEXT,
    firebase_uid      VARCHAR(255),
    is_active         BOOLEAN       NOT NULL DEFAULT true,
    created_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at        TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    created_by        VARCHAR(255)  NOT NULL DEFAULT 'system',
    updated_by        VARCHAR(255)  NOT NULL DEFAULT 'system',

    CONSTRAINT uq_employees_number  UNIQUE (employee_number),
    CONSTRAINT uq_employees_email   UNIQUE (email),
    CONSTRAINT chk_employees_status CHECK (
        employment_status IN ('ACTIVE', 'INACTIVE', 'ON_LEAVE', 'TERMINATED', 'SUSPENDED')
    ),
    CONSTRAINT chk_employees_type CHECK (
        employment_type IN ('FULL_TIME', 'PART_TIME', 'CONTRACT', 'INTERN', 'CONSULTANT')
    ),
    CONSTRAINT chk_employees_gender CHECK (
        gender IN ('MALE', 'FEMALE', 'NON_BINARY', 'PREFER_NOT_TO_SAY') OR gender IS NULL
    ),
    CONSTRAINT chk_employees_salary CHECK (salary >= 0 OR salary IS NULL),
    CONSTRAINT chk_employees_hire_date CHECK (
        termination_date IS NULL OR termination_date >= hire_date
    )
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_employees_employee_number
    ON employees (employee_number);

CREATE INDEX IF NOT EXISTS idx_employees_email
    ON employees (email);

CREATE INDEX IF NOT EXISTS idx_employees_department_id
    ON employees (department_id);

CREATE INDEX IF NOT EXISTS idx_employees_role_id
    ON employees (role_id);

CREATE INDEX IF NOT EXISTS idx_employees_manager_id
    ON employees (manager_id);

CREATE INDEX IF NOT EXISTS idx_employees_status
    ON employees (employment_status);

CREATE INDEX IF NOT EXISTS idx_employees_is_active
    ON employees (is_active);

CREATE INDEX IF NOT EXISTS idx_employees_firebase_uid
    ON employees (firebase_uid);

CREATE INDEX IF NOT EXISTS idx_employees_hire_date
    ON employees (hire_date DESC);

CREATE INDEX IF NOT EXISTS idx_employees_full_name
    ON employees (last_name, first_name);

-- Trigger
CREATE TRIGGER trg_employees_updated_at
    BEFORE UPDATE ON employees
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Auto generate employee number function
CREATE OR REPLACE FUNCTION generate_employee_number()
RETURNS TRIGGER AS $$
DECLARE
    v_year    VARCHAR(4);
    v_seq     INTEGER;
    v_number  VARCHAR(20);
BEGIN
    IF NEW.employee_number IS NULL OR NEW.employee_number = '' THEN
        v_year := TO_CHAR(NOW(), 'YYYY');
        SELECT COUNT(*) + 1
        INTO v_seq
        FROM employees
        WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW());

        v_number := 'EMP-' || v_year || '-' || LPAD(v_seq::TEXT, 4, '0');
        NEW.employee_number := v_number;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_employees_generate_number
    BEFORE INSERT ON employees
    FOR EACH ROW
    EXECUTE FUNCTION generate_employee_number();

-- Seed one default admin employee
INSERT INTO employees (
    employee_number,
    first_name,
    last_name,
    email,
    employment_status,
    employment_type,
    job_title,
    hire_date,
    created_by,
    updated_by
)
VALUES (
    'EMP-0001',
    'System',
    'Administrator',
    'admin@clsql.local',
    'ACTIVE',
    'FULL_TIME',
    'System Administrator',
    CURRENT_DATE,
    'system',
    'system'
)
ON CONFLICT (email) DO NOTHING;