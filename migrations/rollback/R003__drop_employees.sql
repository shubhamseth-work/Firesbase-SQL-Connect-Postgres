-- ROLLBACK V003
DROP TRIGGER IF EXISTS trg_employees_generate_number ON employees;
DROP FUNCTION IF EXISTS generate_employee_number();
DROP TABLE IF EXISTS employees CASCADE;