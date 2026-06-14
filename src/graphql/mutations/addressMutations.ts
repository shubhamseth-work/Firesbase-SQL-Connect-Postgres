// ============================================
// ADDRESS MUTATIONS
// ============================================

export const ADD_EMPLOYEE_ADDRESS = `
  mutation AddEmployeeAddress(
    $employeeId:   UUID!
    $addressType:  String!
    $addressLine1: String!
    $addressLine2: String
    $city:         String!
    $state:        String
    $postalCode:   String
    $country:      String!
    $isPrimary:    Boolean!
    $createdBy:    String!
  ) {
    employeeAddress_insert(data: {
      employeeId:   $employeeId
      addressType:  $addressType
      addressLine1: $addressLine1
      addressLine2: $addressLine2
      city:         $city
      state:        $state
      postalCode:   $postalCode
      country:      $country
      isPrimary:    $isPrimary
      createdBy:    $createdBy
      updatedBy:    $createdBy
    }) {
      id
      addressType
      addressLine1
      city
      country
      isPrimary
      isActive
      createdAt
    }
  }
`;

export const UPDATE_EMPLOYEE_ADDRESS = `
  mutation UpdateEmployeeAddress(
    $id:           UUID!
    $addressLine1: String
    $addressLine2: String
    $city:         String
    $state:        String
    $postalCode:   String
    $country:      String
    $isPrimary:    Boolean
    $isActive:     Boolean
    $updatedBy:    String!
  ) {
    employeeAddress_update(
      id: $id
      data: {
        addressLine1: $addressLine1
        addressLine2: $addressLine2
        city:         $city
        state:        $state
        postalCode:   $postalCode
        country:      $country
        isPrimary:    $isPrimary
        isActive:     $isActive
        updatedBy:    $updatedBy
      }
    ) {
      id
      addressLine1
      city
      isPrimary
      isActive
      updatedAt
    }
  }
`;

export const DELETE_EMPLOYEE_ADDRESS = `
  mutation DeleteEmployeeAddress(
    $id:        UUID!
    $updatedBy: String!
  ) {
    employeeAddress_update(
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