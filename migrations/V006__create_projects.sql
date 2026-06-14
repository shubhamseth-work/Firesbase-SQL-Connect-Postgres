-- ============================================
-- V006: Create projects table
-- ============================================

CREATE TABLE IF NOT EXISTS projects (
    id              UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
    name            VARCHAR(200)  NOT NULL,
    code            VARCHAR(30)   NOT NULL,
    description     TEXT,
    status          VARCHAR(50)   NOT NULL DEFAULT 'PLANNING',
    priority        VARCHAR(20)   NOT NULL DEFAULT 'MEDIUM',
    start_date      DATE,
    end_date        DATE,
    budget          NUMERIC(15,2),
    currency        VARCHAR(10)   NOT NULL DEFAULT 'USD',
    department_id   UUID          REFERENCES departments(id) ON DELETE SET NULL,
    manager_id      UUID          REFERENCES employees(id) ON DELETE SET NULL,
    is_active       BOOLEAN       NOT NULL DEFAULT true,
    created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    created_by      VARCHAR(255)  NOT NULL DEFAULT 'system',
    updated_by      VARCHAR(255)  NOT NULL DEFAULT 'system',

    CONSTRAINT uq_projects_code UNIQUE (code),
    CONSTRAINT uq_projects_name UNIQUE (name),
    CONSTRAINT chk_projects_status CHECK (
        status IN (
            'PLANNING', 'IN_PROGRESS', 'ON_HOLD',
            'COMPLETED', 'CANCELLED', 'ARCHIVED'
        )
    ),
    CONSTRAINT chk_projects_priority CHECK (
        priority IN ('CRITICAL', 'HIGH', 'MEDIUM', 'LOW')
    ),
    CONSTRAINT chk_projects_dates CHECK (
        end_date IS NULL OR start_date IS NULL OR end_date >= start_date
    ),
    CONSTRAINT chk_projects_budget CHECK (
        budget IS NULL OR budget >= 0
    )
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_projects_code
    ON projects (code);

CREATE INDEX IF NOT EXISTS idx_projects_status
    ON projects (status);

CREATE INDEX IF NOT EXISTS idx_projects_priority
    ON projects (priority);

CREATE INDEX IF NOT EXISTS idx_projects_department_id
    ON projects (department_id);

CREATE INDEX IF NOT EXISTS idx_projects_manager_id
    ON projects (manager_id);

CREATE INDEX IF NOT EXISTS idx_projects_is_active
    ON projects (is_active);

CREATE INDEX IF NOT EXISTS idx_projects_start_date
    ON projects (start_date DESC);

-- Trigger
CREATE TRIGGER trg_projects_updated_at
    BEFORE UPDATE ON projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Seed sample projects
INSERT INTO projects (
    name, code, description, status, priority,
    start_date, created_by, updated_by
)
VALUES
    (
        'Employee Portal Launch',
        'EPL-001',
        'Internal employee self-service portal',
        'IN_PROGRESS',
        'HIGH',
        CURRENT_DATE,
        'system',
        'system'
    ),
    (
        'HR System Migration',
        'HRS-001',
        'Migration of legacy HR system to cloud',
        'PLANNING',
        'CRITICAL',
        CURRENT_DATE,
        'system',
        'system'
    ),
    (
        'Analytics Dashboard',
        'ANL-001',
        'Executive analytics and reporting dashboard',
        'PLANNING',
        'MEDIUM',
        CURRENT_DATE,
        'system',
        'system'
    )
ON CONFLICT (code) DO NOTHING;