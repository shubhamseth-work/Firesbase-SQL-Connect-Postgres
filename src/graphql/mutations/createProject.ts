// ============================================
// CREATE PROJECT MUTATION
// ============================================

export const CREATE_PROJECT = `
  mutation CreateProject(
    $name:         String!
    $code:         String!
    $description:  String
    $status:       String!
    $priority:     String!
    $startDate:    Date
    $endDate:      Date
    $budget:       Float
    $currency:     String
    $departmentId: UUID
    $managerId:    UUID
    $createdBy:    String!
  ) {
    project_insert(data: {
      name:         $name
      code:         $code
      description:  $description
      status:       $status
      priority:     $priority
      startDate:    $startDate
      endDate:      $endDate
      budget:       $budget
      currency:     $currency
      departmentId: $departmentId
      managerId:    $managerId
      createdBy:    $createdBy
      updatedBy:    $createdBy
    }) {
      id
      name
      code
      status
      priority
      startDate
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
      }
    }
  }
`;

// -----------------------------------------------
// UPDATE PROJECT
// -----------------------------------------------
export const UPDATE_PROJECT = `
  mutation UpdateProject(
    $id:           UUID!
    $name:         String
    $description:  String
    $status:       String
    $priority:     String
    $startDate:    Date
    $endDate:      Date
    $budget:       Float
    $currency:     String
    $departmentId: UUID
    $managerId:    UUID
    $isActive:     Boolean
    $updatedBy:    String!
  ) {
    project_update(
      id: $id
      data: {
        name:         $name
        description:  $description
        status:       $status
        priority:     $priority
        startDate:    $startDate
        endDate:      $endDate
        budget:       $budget
        currency:     $currency
        departmentId: $departmentId
        managerId:    $managerId
        isActive:     $isActive
        updatedBy:    $updatedBy
      }
    ) {
      id
      name
      code
      status
      priority
      updatedAt
    }
  }
`;

// -----------------------------------------------
// DELETE PROJECT (soft)
// -----------------------------------------------
export const DELETE_PROJECT = `
  mutation DeleteProject(
    $id:        UUID!
    $updatedBy: String!
  ) {
    project_update(
      id: $id
      data: {
        isActive:  false
        status:    "ARCHIVED"
        updatedBy: $updatedBy
      }
    ) {
      id
      isActive
      status
      updatedAt
    }
  }
`;