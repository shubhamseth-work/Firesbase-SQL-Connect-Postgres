// ============================================
// DEPARTMENT QUERIES
// ============================================

// -----------------------------------------------
// LIST DEPARTMENTS
// -----------------------------------------------
export const LIST_DEPARTMENTS = `
  query ListDepartments($isActive: Boolean = true) {
    departments(
      where:   { isActive: { eq: $isActive } }
      orderBy: [{ name: ASC }]
    ) {
      id
      name
      code
      description
      isActive
      createdAt
      updatedAt
    }
  }
`;

// -----------------------------------------------
// GET DEPARTMENT BY ID — with employees
// and projects
// -----------------------------------------------
export const GET_DEPARTMENT_BY_ID = `
  query GetDepartmentById($id: UUID!) {
    department(id: $id) {
      id
      name
      code
      description
      isActive
      createdAt
      updatedAt
      createdBy
      updatedBy
      employees(
        where:   { isActive: { eq: true } }
        orderBy: [{ lastName: ASC }, { firstName: ASC }]
      ) {
        id
        employeeNumber
        firstName
        lastName
        email
        jobTitle
        employmentStatus
        employmentType
        hireDate
        profilePicture
        isActive
        role {
          id
          name
          code
          level
        }
        manager {
          id
          firstName
          lastName
        }
      }
      projects(
        where:   { isActive: { eq: true } }
        orderBy: [{ name: ASC }]
      ) {
        id
        name
        code
        status
        priority
        startDate
        endDate
        isActive
        manager {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

// -----------------------------------------------
// GET DEPARTMENT SUMMARY — with counts
// -----------------------------------------------
export const GET_DEPARTMENT_SUMMARY = `
  query GetDepartmentSummary {
    departments(
      where:   { isActive: { eq: true } }
      orderBy: [{ name: ASC }]
    ) {
      id
      name
      code
      description
      isActive
      employees(
        where: { isActive: { eq: true } }
      ) {
        id
        employmentStatus
        employmentType
      }
      projects(
        where: { isActive: { eq: true } }
      ) {
        id
        status
        priority
      }
    }
  }
`;

// -----------------------------------------------
// GET DEPARTMENT REPORT — export data
// -----------------------------------------------
export const GET_DEPARTMENT_REPORT_DATA = `
  query GetDepartmentReportData {
    departments(
      where:   { isActive: { eq: true } }
      orderBy: [{ name: ASC }]
    ) {
      id
      name
      code
      description
      isActive
      createdAt
      employees(
        where:   { isActive: { eq: true } }
        orderBy: [{ lastName: ASC }]
      ) {
        id
        employeeNumber
        firstName
        lastName
        email
        jobTitle
        employmentStatus
        employmentType
        hireDate
        salary
        currency
        role {
          id
          name
          code
          level
        }
      }
      projects(
        where: { isActive: { eq: true } }
      ) {
        id
        name
        code
        status
        priority
        startDate
        endDate
        budget
        currency
      }
    }
  }
`;