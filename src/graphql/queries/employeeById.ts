// ============================================
// EMPLOYEE BY ID — dedicated file
// Deep nested query with all child records
// ============================================

export const GET_EMPLOYEE_FULL_PROFILE = `
  query GetEmployeeFullProfile($id: UUID!) {
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
        isActive
      }

      role {
        id
        name
        code
        description
        level
        isActive
      }

      manager {
        id
        employeeNumber
        firstName
        lastName
        email
        jobTitle
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
        createdBy
        updatedBy
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
        createdBy
        updatedBy
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
        updatedAt
        project {
          id
          name
          code
          description
          status
          priority
          startDate
          endDate
          budget
          currency
          isActive
          department {
            id
            name
            code
          }
          manager {
            id
            firstName
            lastName
            email
          }
        }
      }
    }
  }
`;