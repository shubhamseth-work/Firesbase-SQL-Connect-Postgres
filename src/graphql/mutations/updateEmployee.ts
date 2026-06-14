// ============================================
// UPDATE EMPLOYEE MUTATION
// ============================================

export const UPDATE_EMPLOYEE = `
  mutation UpdateEmployee(
    $id:               UUID!
    $firstName:        String
    $lastName:         String
    $middleName:       String
    $phone:            String
    $personalEmail:    String
    $dateOfBirth:      Date
    $gender:           String
    $nationality:      String
    $employmentStatus: String
    $employmentType:   String
    $jobTitle:         String
    $salary:           Float
    $currency:         String
    $departmentId:     UUID
    $roleId:           UUID
    $managerId:        UUID
    $terminationDate:  Date
    $profilePicture:   String
    $updatedBy:        String!
  ) {
    employee_update(
      id: $id
      data: {
        firstName:        $firstName
        lastName:         $lastName
        middleName:       $middleName
        phone:            $phone
        personalEmail:    $personalEmail
        dateOfBirth:      $dateOfBirth
        gender:           $gender
        nationality:      $nationality
        employmentStatus: $employmentStatus
        employmentType:   $employmentType
        jobTitle:         $jobTitle
        salary:           $salary
        currency:         $currency
        departmentId:     $departmentId
        roleId:           $roleId
        managerId:        $managerId
        terminationDate:  $terminationDate
        profilePicture:   $profilePicture
        updatedBy:        $updatedBy
      }
    ) {
      id
      employeeNumber
      firstName
      lastName
      email
      employmentStatus
      employmentType
      jobTitle
      salary
      updatedAt
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
`;

// -----------------------------------------------
// UPDATE PROFILE PICTURE ONLY
// -----------------------------------------------
export const UPDATE_EMPLOYEE_PROFILE_PICTURE = `
  mutation UpdateEmployeeProfilePicture(
    $id:             UUID!
    $profilePicture: String!
    $updatedBy:      String!
  ) {
    employee_update(
      id: $id
      data: {
        profilePicture: $profilePicture
        updatedBy:      $updatedBy
      }
    ) {
      id
      profilePicture
      updatedAt
    }
  }
`;

// -----------------------------------------------
// UPDATE EMPLOYEE STATUS
// -----------------------------------------------
export const UPDATE_EMPLOYEE_STATUS = `
  mutation UpdateEmployeeStatus(
    $id:               UUID!
    $employmentStatus: String!
    $terminationDate:  Date
    $updatedBy:        String!
  ) {
    employee_update(
      id: $id
      data: {
        employmentStatus: $employmentStatus
        terminationDate:  $terminationDate
        updatedBy:        $updatedBy
      }
    ) {
      id
      employeeNumber
      employmentStatus
      terminationDate
      updatedAt
    }
  }
`;