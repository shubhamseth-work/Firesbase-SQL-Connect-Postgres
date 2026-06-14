// ============================================
// ROLE QUERIES
// ============================================

// -----------------------------------------------
// LIST ROLES
// -----------------------------------------------
export const LIST_ROLES = `
  query ListRoles($isActive: Boolean = true) {
    roles(
      where:   { isActive: { eq: $isActive } }
      orderBy: [{ level: DESC }, { name: ASC }]
    ) {
      id
      name
      code
      description
      level
      isActive
      createdAt
      updatedAt
    }
  }
`;

// -----------------------------------------------
// GET ROLE BY ID — with employees
// -----------------------------------------------
export const GET_ROLE_BY_ID = `
  query GetRoleById($id: UUID!) {
    role(id: $id) {
      id
      name
      code
      description
      level
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
        profilePicture
        department {
          id
          name
          code
        }
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
// GET ROLES WITH EMPLOYEE COUNT
// -----------------------------------------------
export const GET_ROLES_SUMMARY = `
  query GetRolesSummary {
    roles(
      where:   { isActive: { eq: true } }
      orderBy: [{ level: DESC }]
    ) {
      id
      name
      code
      description
      level
      isActive
      employees(
        where: { isActive: { eq: true } }
      ) {
        id
        employmentStatus
        employmentType
      }
    }
  }
`;