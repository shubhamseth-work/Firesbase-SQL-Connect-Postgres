// ============================================
// ASSIGN PROJECT MUTATION
// ============================================

export const ASSIGN_EMPLOYEE_TO_PROJECT = `
  mutation AssignEmployeeToProject(
    $employeeId: UUID!
    $projectId:  UUID!
    $role:       String!
    $allocation: Int!
    $startDate:  Date!
    $endDate:    Date
    $notes:      String
    $createdBy:  String!
  ) {
    employeeProject_insert(data: {
      employeeId: $employeeId
      projectId:  $projectId
      role:       $role
      allocation: $allocation
      startDate:  $startDate
      endDate:    $endDate
      notes:      $notes
      createdBy:  $createdBy
      updatedBy:  $createdBy
    }) {
      id
      role
      allocation
      startDate
      endDate
      isActive
      createdAt
      employee {
        id
        employeeNumber
        firstName
        lastName
        email
        profilePicture
      }
      project {
        id
        name
        code
        status
        priority
      }
    }
  }
`;

// -----------------------------------------------
// UPDATE PROJECT ASSIGNMENT
// -----------------------------------------------
export const UPDATE_PROJECT_ASSIGNMENT = `
  mutation UpdateProjectAssignment(
    $id:         UUID!
    $role:       String
    $allocation: Int
    $startDate:  Date
    $endDate:    Date
    $isActive:   Boolean
    $notes:      String
    $updatedBy:  String!
  ) {
    employeeProject_update(
      id: $id
      data: {
        role:       $role
        allocation: $allocation
        startDate:  $startDate
        endDate:    $endDate
        isActive:   $isActive
        notes:      $notes
        updatedBy:  $updatedBy
      }
    ) {
      id
      role
      allocation
      startDate
      endDate
      isActive
      updatedAt
    }
  }
`;

// -----------------------------------------------
// REMOVE EMPLOYEE FROM PROJECT
// -----------------------------------------------
export const REMOVE_EMPLOYEE_FROM_PROJECT = `
  mutation RemoveEmployeeFromProject(
    $id:        UUID!
    $endDate:   Date!
    $updatedBy: String!
  ) {
    employeeProject_update(
      id: $id
      data: {
        isActive:  false
        endDate:   $endDate
        updatedBy: $updatedBy
      }
    ) {
      id
      isActive
      endDate
      updatedAt
    }
  }
`;