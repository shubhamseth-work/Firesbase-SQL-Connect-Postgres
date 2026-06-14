-- ROLLBACK V001
DROP TRIGGER IF EXISTS trg_departments_updated_at ON departments;
DROP FUNCTION IF EXISTS update_updated_at_column();
DROP TABLE IF EXISTS departments CASCADE;