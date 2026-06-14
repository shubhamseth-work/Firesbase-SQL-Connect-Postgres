// ============================================
// DELETE EMPLOYEE MUTATION
// Soft delete only — sets isActive = false
// ============================================

export const DELETE_EMPLOYEE = `
  mutation DeleteEmployee(
    $id:        UUID!
    $updatedBy: String!
  ) {
    employee_update(
      id: $id
      data: {
        isActive:         false
        employmentStatus: "TERMINATED"
        updatedBy:        $updatedBy
      }
    ) {
      id
      isActive
      employmentStatus
      updatedAt
    }
  }
`;