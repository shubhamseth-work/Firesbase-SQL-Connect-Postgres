// ============================================
// EMPLOYEE QUERIES
// Complete query definitions with pagination,
// filtering, sorting, and nested relations
// ============================================

// -----------------------------------------------
// LIST EMPLOYEES — paginated with filters
// -----------------------------------------------
export const LIST_EMPLOYEES = `
  query ListEmployees(
    $limit:    Int     = 20
    $offset:   Int     = 0
    $isActive: Boolean = true
  ) {
    employees(
      where:   { isActive: { eq: $isActive } }
      limit:   $limit
      offset:  $offset
      orderBy: [{ lastName: ASC }, { firstName: ASC }]
    ) {
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
      manager {
        id
        firstName
        lastName
        email
        profilePicture
      }
    }
  }
`;

// -----------------------------------------------
// GET EMPLOYEE BY ID — full detail with all
// nested relations
// -----------------------------------------------
export const GET_EMPLOYEE_BY_ID = `
  query GetEmployeeById($id: UUID!) {
    employee(id: $id) {
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
        department {
          id
          name
          code
        }
      }
      directReports {
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
      addresses {
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
      contacts {
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
      projectAssignments {
        id
        role
        allocation
        startDate
        endDate
        isActive
        notes
        createdAt
        project {
          id
          name
          code
          status
          priority
          startDate
          endDate
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

// -----------------------------------------------
// SEARCH EMPLOYEES — by name, email, number,
// job title
// -----------------------------------------------
export const SEARCH_EMPLOYEES = `
  query SearchEmployees(
    $searchTerm: String!
    $limit:      Int = 20
    $offset:     Int = 0
  ) {
    employees(
      where: {
        _or: [
          { firstName:      { contains: $searchTerm } }
          { lastName:       { contains: $searchTerm } }
          { email:          { contains: $searchTerm } }
          { employeeNumber: { contains: $searchTerm } }
          { jobTitle:       { contains: $searchTerm } }
        ]
        isActive: { eq: true }
      }
      limit:   $limit
      offset:  $offset
      orderBy: [{ lastName: ASC }, { firstName: ASC }]
    ) {
      id
      employeeNumber
      firstName
      lastName
      email
      phone
      jobTitle
      employmentStatus
      employmentType
      profilePicture
      hireDate
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
    }
  }
`;

// -----------------------------------------------
// GET EMPLOYEES BY DEPARTMENT — filtered list
// -----------------------------------------------
export const GET_EMPLOYEES_BY_DEPARTMENT = `
  query GetEmployeesByDepartment(
    $departmentId: UUID!
    $limit:        Int = 50
    $offset:       Int = 0
  ) {
    employees(
      where: {
        departmentId: { eq: $departmentId }
        isActive:     { eq: true }
      }
      limit:   $limit
      offset:  $offset
      orderBy: [{ lastName: ASC }, { firstName: ASC }]
    ) {
      id
      employeeNumber
      firstName
      lastName
      email
      phone
      jobTitle
      employmentStatus
      employmentType
      hireDate
      profilePicture
      salary
      currency
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
      }
      projectAssignments(
        where: { isActive: { eq: true } }
      ) {
        id
        role
        allocation
        project {
          id
          name
          code
          status
        }
      }
    }
  }
`;

// -----------------------------------------------
// GET EMPLOYEES BY STATUS — filtered list
// -----------------------------------------------
export const GET_EMPLOYEES_BY_STATUS = `
  query GetEmployeesByStatus(
    $status: String!
    $limit:  Int = 50
    $offset: Int = 0
  ) {
    employees(
      where: {
        employmentStatus: { eq: $status }
        isActive:         { eq: true }
      }
      limit:   $limit
      offset:  $offset
      orderBy: [{ hireDate: DESC }]
    ) {
      id
      employeeNumber
      firstName
      lastName
      email
      jobTitle
      employmentStatus
      employmentType
      hireDate
      terminationDate
      profilePicture
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
// GET EMPLOYEES BY ROLE — filtered list
// -----------------------------------------------
export const GET_EMPLOYEES_BY_ROLE = `
  query GetEmployeesByRole(
    $roleId: UUID!
    $limit:  Int = 50
    $offset: Int = 0
  ) {
    employees(
      where: {
        roleId:   { eq: $roleId }
        isActive: { eq: true }
      }
      limit:   $limit
      offset:  $offset
      orderBy: [{ lastName: ASC }, { firstName: ASC }]
    ) {
      id
      employeeNumber
      firstName
      lastName
      email
      jobTitle
      employmentStatus
      hireDate
      profilePicture
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
// GET DIRECT REPORTS — org chart query
// -----------------------------------------------
export const GET_DIRECT_REPORTS = `
  query GetDirectReports($managerId: UUID!) {
    employees(
      where: {
        managerId: { eq: $managerId }
        isActive:  { eq: true }
      }
      orderBy: [{ lastName: ASC }, { firstName: ASC }]
    ) {
      id
      employeeNumber
      firstName
      lastName
      email
      jobTitle
      employmentStatus
      profilePicture
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
      directReports {
        id
        firstName
        lastName
        jobTitle
        profilePicture
      }
    }
  }
`;

// -----------------------------------------------
// GET EMPLOYEE BY FIREBASE UID — auth lookup
// -----------------------------------------------
export const GET_EMPLOYEE_BY_FIREBASE_UID = `
  query GetEmployeeByFirebaseUid($firebaseUid: String!) {
    employees(
      where: { firebaseUid: { eq: $firebaseUid } }
      limit: 1
    ) {
      id
      employeeNumber
      firstName
      lastName
      email
      jobTitle
      profilePicture
      isActive
      firebaseUid
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
`;

// -----------------------------------------------
// GET EMPLOYEE REPORT DATA — for PDF/CSV export
// Full data with all relations for reports
// -----------------------------------------------
export const GET_EMPLOYEE_REPORT_DATA = `
  query GetEmployeeReportData(
    $isActive:         Boolean = true
    $departmentId:     UUID
    $employmentStatus: String
    $employmentType:   String
    $limit:            Int = 1000
    $offset:           Int = 0
  ) {
    employees(
      where: {
        isActive: { eq: $isActive }
      }
      limit:   $limit
      offset:  $offset
      orderBy: [
        { department: { name: ASC } }
        { lastName:   ASC }
        { firstName:  ASC }
      ]
    ) {
      id
      employeeNumber
      firstName
      lastName
      email
      phone
      jobTitle
      employmentStatus
      employmentType
      hireDate
      terminationDate
      salary
      currency
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
      }
      addresses(
        where: {
          isPrimary: { eq: true }
          isActive:  { eq: true }
        }
      ) {
        addressType
        addressLine1
        addressLine2
        city
        state
        postalCode
        country
      }
    }
  }
`;