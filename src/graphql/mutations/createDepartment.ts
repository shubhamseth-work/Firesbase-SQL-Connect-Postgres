// ============================================
// CREATE DEPARTMENT MUTATION
// ============================================

export const CREATE_DEPARTMENT = `
  mutation CreateDepartment(
    $name:        String!
    $code:        String!
    $description: String
    $createdBy:   String!
  ) {
    department_insert(data: {
      name:        $name
      code:        $code
      description: $description
      createdBy:   $createdBy
      updatedBy:   $createdBy
    }) {
      id
      name
      code
      description
      isActive
      createdAt
    }
  }
`;

// -----------------------------------------------
// UPDATE DEPARTMENT
// -----------------------------------------------
export const UPDATE_DEPARTMENT = `
  mutation UpdateDepartment(
    $id:          UUID!
    $name:        String
    $code:        String
    $description: String
    $isActive:    Boolean
    $updatedBy:   String!
  ) {
    department_update(
      id: $id
      data: {
        name:        $name
        code:        $code
        description: $description
        isActive:    $isActive
        updatedBy:   $updatedBy
      }
    ) {
      id
      name
      code
      description
      isActive
      updatedAt
    }
  }
`;

// -----------------------------------------------
// DELETE DEPARTMENT (soft)
// -----------------------------------------------
export const DELETE_DEPARTMENT = `
  mutation DeleteDepartment(
    $id:        UUID!
    $updatedBy: String!
  ) {
    department_update(
      id: $id
      data: {
        isActive:  false
        updatedBy: $updatedBy
      }
    ) {
      id
      isActive
      updatedAt
    }
  }
`;