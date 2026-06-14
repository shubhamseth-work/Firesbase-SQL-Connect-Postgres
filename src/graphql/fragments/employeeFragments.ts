// ============================================
// EMPLOYEE FRAGMENTS
// ============================================

export const EMPLOYEE_BASIC_FIELDS = `
  fragment EmployeeBasicFields on Employee {
    id
    employeeNumber
    firstName
    lastName
    email
    jobTitle
    employmentStatus
    employmentType
    profilePicture
    isActive
  }
`;

export const EMPLOYEE_SUMMARY_FIELDS = `
  fragment EmployeeSummaryFields on Employee {
    id
    employeeNumber
    firstName
    lastName
    middleName
    email
    phone
    jobTitle
    employmentStatus
    employmentType
    hireDate
    salary
    currency
    profilePicture
    isActive
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
    manager {
      id
      firstName
      lastName
      email
      profilePicture
    }
  }
`;

export const EMPLOYEE_FULL_FIELDS = `
  fragment EmployeeFullFields on Employee {
    id
    employeeNumber
    firstName
    lastName
    middleName
    email
    personalEmail
    phone
    dateOfBirth
    gender
    nationality
    hireDate
    terminationDate
    employmentStatus
    employmentType
    jobTitle
    salary
    currency
    profilePicture
    firebaseUid
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
    role {
      id
      name
      code
      level
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
    }
  }
`;

export const EMPLOYEE_ADDRESS_FIELDS = `
  fragment EmployeeAddressFields on EmployeeAddress {
    id
    addressType
    addressLine1
    addressLine2
    city
    state
    postalCode
    country
    isPrimary
    isActive
    createdAt
    updatedAt
  }
`;

export const EMPLOYEE_CONTACT_FIELDS = `
  fragment EmployeeContactFields on EmployeeContact {
    id
    contactType
    firstName
    lastName
    relationship
    phone
    alternatePhone
    email
    isPrimary
    isActive
    notes
    createdAt
    updatedAt
  }
`;