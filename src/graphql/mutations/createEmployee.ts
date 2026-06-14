// ============================================
// CREATE EMPLOYEE MUTATION
// ============================================

export const CREATE_EMPLOYEE = `
  mutation CreateEmployee(
    $firstName:        String!
    $lastName:         String!
    $middleName:       String
    $email:            String!
    $personalEmail:    String
    $phone:            String
    $dateOfBirth:      Date
    $gender:           String
    $nationality:      String
    $hireDate:         Date!
    $employmentStatus: String!
    $employmentType:   String!
    $jobTitle:         String
    $salary:           Float
    $currency:         String
    $departmentId:     UUID
    $roleId:           UUID
    $managerId:        UUID
    $firebaseUid:      String
    $createdBy:        String!
  ) {
    employee_insert(data: {
      firstName:        $firstName
      lastName:         $lastName
      middleName:       $middleName
      email:            $email
      personalEmail:    $personalEmail
      phone:            $phone
      dateOfBirth:      $dateOfBirth
      gender:           $gender
      nationality:      $nationality
      hireDate:         $hireDate
      employmentStatus: $employmentStatus
      employmentType:   $employmentType
      jobTitle:         $jobTitle
      salary:           $salary
      currency:         $currency
      departmentId:     $departmentId
      roleId:           $roleId
      managerId:        $managerId
      firebaseUid:      $firebaseUid
      createdBy:        $createdBy
      updatedBy:        $createdBy
    }) {
      id
      employeeNumber
      firstName
      lastName
      email
      employmentStatus
      employmentType
      hireDate
      isActive
      createdAt
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