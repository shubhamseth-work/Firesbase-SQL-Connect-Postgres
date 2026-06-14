-- ============================================
-- V007: Create employee_projects junction table
-- ============================================

CREATE TABLE IF NOT EXISTS employee_projects (
    id            UUID          DEFAULT gen_random_uuid() PRIMARY KEY,
    employee_id   UUID          NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
    project_id    UUID          NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    role          VARCHAR(100)  NOT NULL DEFAULT 'CONTRIBUTOR',
    allocation    INTEGER       NOT NULL DEFAULT 100,
    start_date    DATE          NOT NULL DEFAULT CURRENT_DATE,
    end_date      DATE,
    is_active     BOOLEAN       NOT NULL DEFAULT true,
    notes         TEXT,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
    created_by    VARCHAR(255)  NOT NULL DEFAULT 'system',
    updated_by    VARCHAR(255)  NOT NULL DEFAULT 'system',

    CONSTRAINT uq_employee_project  UNIQUE (employee_id, project_id),
    CONSTRAINT chk_ep_allocation    CHECK (allocation BETWEEN 1 AND 100),
    CONSTRAINT chk_ep_dates         CHECK (
        end_date IS NULL OR end_date >= start_date
    ),
    CONSTRAINT chk_ep_role CHECK (
        role IN (
            'LEAD', 'SENIOR_CONTRIBUTOR', 'CONTRIBUTOR',
            'REVIEWER', 'STAKEHOLDER', 'OBSERVER'
        )
    )
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_employee_projects_employee_id
    ON employee_projects (employee_id);

CREATE INDEX IF NOT EXISTS idx_employee_projects_project_id
    ON employee_projects (project_id);

CREATE INDEX IF NOT EXISTS idx_employee_projects_is_active
    ON employee_projects (is_active);

CREATE INDEX IF NOT EXISTS idx_employee_projects_start_date
    ON employee_projects (start_date DESC);

-- Trigger
CREATE TRIGGER trg_employee_projects_updated_at
    BEFORE UPDATE ON employee_projects
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();