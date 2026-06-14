// ============================================
// PROJECT QUERIES
// ============================================

// -----------------------------------------------
// LIST PROJECTS
// -----------------------------------------------
export const LIST_PROJECTS = `
  query ListProjects(
    $isActive: Boolean = true
    $limit:    Int     = 20
    $offset:   Int     = 0
  ) {
    projects(
      where:   { isActive: { eq: $isActive } }
      limit:   $limit
      offset:  $offset
      orderBy: [{ priority: ASC }, { name: ASC }]
    ) {
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
      assignments(
        where: { isActive: { eq: true } }
      ) {
        id
        role
        allocation
        employee {
          id
          firstName
          lastName
          profilePicture
        }
      }
    }
  }
`;

// -----------------------------------------------
// GET PROJECT BY ID — full detail
// -----------------------------------------------
export const GET_PROJECT_BY_ID = `
  query GetProjectById($id: UUID!) {
    project(id: $id) {
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
        description
      }
      manager {
        id
        employeeNumber
        firstName
        lastName
        email
        jobTitle
        profilePicture
        department {
          id
          name
          code
        }
      }
      assignments(
        where:   { isActive: { eq: true } }
        orderBy: [{ startDate: DESC }]
      ) {
        id
        role
        allocation
        startDate
        endDate
        isActive
        notes
        createdAt
        employee {
          id
          employeeNumber
          firstName
          lastName
          email
          jobTitle
          profilePicture
          employmentStatus
          department {
            id
            name
            code
          }
          role {
            id
            name
            code
            level
          }
        }
      }
    }
  }
`;

// -----------------------------------------------
// GET PROJECTS BY STATUS
// -----------------------------------------------
export const GET_PROJECTS_BY_STATUS = `
  query GetProjectsByStatus(
    $status: String!
    $limit:  Int = 20
    $offset: Int = 0
  ) {
    projects(
      where: {
        status:   { eq: $status }
        isActive: { eq: true }
      }
      limit:   $limit
      offset:  $offset
      orderBy: [{ priority: ASC }, { startDate: ASC }]
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
      isActive
      department {
        id
        name
        code
      }
      manager {
        id
        firstName
        lastName
        profilePicture
      }
      assignments(
        where: { isActive: { eq: true } }
      ) {
        id
        role
        allocation
        employee {
          id
          firstName
          lastName
          profilePicture
        }
      }
    }
  }
`;

// -----------------------------------------------
// GET PROJECTS BY DEPARTMENT
// -----------------------------------------------
export const GET_PROJECTS_BY_DEPARTMENT = `
  query GetProjectsByDepartment(
    $departmentId: UUID!
    $limit:        Int = 20
    $offset:       Int = 0
  ) {
    projects(
      where: {
        departmentId: { eq: $departmentId }
        isActive:     { eq: true }
      }
      limit:   $limit
      offset:  $offset
      orderBy: [{ status: ASC }, { priority: ASC }]
    ) {
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
      manager {
        id
        firstName
        lastName
        email
      }
      assignments(
        where: { isActive: { eq: true } }
      ) {
        id
        role
        allocation
        employee {
          id
          firstName
          lastName
          jobTitle
          profilePicture
        }
      }
    }
  }
`;

// -----------------------------------------------
// GET PROJECT REPORT DATA
// -----------------------------------------------
export const GET_PROJECT_REPORT_DATA = `
  query GetProjectReportData {
    projects(
      where:   { isActive: { eq: true } }
      orderBy: [
        { status: ASC }
        { priority: ASC }
        { name: ASC }
      ]
    ) {
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
      }
      assignments(
        where: { isActive: { eq: true } }
      ) {
        id
        role
        allocation
        startDate
        endDate
        employee {
          id
          employeeNumber
          firstName
          lastName
          email
          jobTitle
          department {
            id
            name
            code
          }
        }
      }
    }
  }
`;