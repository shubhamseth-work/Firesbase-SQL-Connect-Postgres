// ============================================
// DEPARTMENT FRAGMENTS
// Reusable field sets for department queries
// ============================================

export const DEPARTMENT_BASIC_FIELDS = `
  fragment DepartmentBasicFields on Department {
    id
    name
    code
    description
    isActive
  }
`;

export const DEPARTMENT_FULL_FIELDS = `
  fragment DepartmentFullFields on Department {
    id
    name
    code
    description
    isActive
    createdAt
    updatedAt
    createdBy
    updatedBy
  }
`;