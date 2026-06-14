// ============================================
// ROLE FRAGMENTS
// ============================================

export const ROLE_BASIC_FIELDS = `
  fragment RoleBasicFields on Role {
    id
    name
    code
    level
    isActive
  }
`;

export const ROLE_FULL_FIELDS = `
  fragment RoleFullFields on Role {
    id
    name
    code
    description
    level
    isActive
    createdAt
    updatedAt
    createdBy
    updatedBy
  }
`;