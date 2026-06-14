// ============================================
// PROJECT FRAGMENTS
// ============================================

export const PROJECT_BASIC_FIELDS = `
  fragment ProjectBasicFields on Project {
    id
    name
    code
    status
    priority
    startDate
    endDate
    isActive
  }
`;

export const PROJECT_FULL_FIELDS = `
  fragment ProjectFullFields on Project {
    id
    name
    code
    description
    status
    priority
    startDate
    endDate
    budget
    currency
    isActive
    createdAt
    updatedAt
    createdBy
    updatedBy
    department {
      id
      name
      code
    }
    manager {
      id
      firstName
      lastName
      email
      profilePicture
    }
  }
`;

export const EMPLOYEE_PROJECT_FIELDS = `
  fragment EmployeeProjectFields on EmployeeProject {
    id
    role
    allocation
    startDate
    endDate
    isActive
    notes
    createdAt
    updatedAt
  }
`;