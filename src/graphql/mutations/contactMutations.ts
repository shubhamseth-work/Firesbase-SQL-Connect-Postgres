// ============================================
// CONTACT MUTATIONS
// ============================================

export const ADD_EMPLOYEE_CONTACT = `
  mutation AddEmployeeContact(
    $employeeId:     UUID!
    $contactType:    String!
    $firstName:      String!
    $lastName:       String!
    $relationship:   String
    $phone:          String!
    $alternatePhone: String
    $email:          String
    $isPrimary:      Boolean!
    $notes:          String
    $createdBy:      String!
  ) {
    employeeContact_insert(data: {
      employeeId:     $employeeId
      contactType:    $contactType
      firstName:      $firstName
      lastName:       $lastName
      relationship:   $relationship
      phone:          $phone
      alternatePhone: $alternatePhone
      email:          $email
      isPrimary:      $isPrimary
      notes:          $notes
      createdBy:      $createdBy
      updatedBy:      $createdBy
    }) {
      id
      contactType
      firstName
      lastName
      phone
      isPrimary
      isActive
      createdAt
    }
  }
`;

export const UPDATE_EMPLOYEE_CONTACT = `
  mutation UpdateEmployeeContact(
    $id:             UUID!
    $firstName:      String
    $lastName:       String
    $relationship:   String
    $phone:          String
    $alternatePhone: String
    $email:          String
    $isPrimary:      Boolean
    $isActive:       Boolean
    $notes:          String
    $updatedBy:      String!
  ) {
    employeeContact_update(
      id: $id
      data: {
        firstName:      $firstName
        lastName:       $lastName
        relationship:   $relationship
        phone:          $phone
        alternatePhone: $alternatePhone
        email:          $email
        isPrimary:      $isPrimary
        isActive:       $isActive
        notes:          $notes
        updatedBy:      $updatedBy
      }
    ) {
      id
      firstName
      lastName
      phone
      isPrimary
      isActive
      updatedAt
    }
  }
`;

export const DELETE_EMPLOYEE_CONTACT = `
  mutation DeleteEmployeeContact(
    $id:        UUID!
    $updatedBy: String!
  ) {
    employeeContact_update(
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