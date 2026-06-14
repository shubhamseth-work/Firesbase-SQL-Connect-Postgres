// ============================================
// GRAPHQL RESPONSE TYPES
// TypeScript interfaces matching schema.gql
// ============================================

// ============================================
// BASE TYPES
// ============================================
export interface AuditFields {
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

// ============================================
// DEPARTMENT
// ============================================
export interface Department extends AuditFields {
  id:          string;
  name:        string;
  code:        string;
  description: string | null;
  isActive:    boolean;
  employees?:  Employee[];
  projects?:   Project[];
}

export interface DepartmentBasic {
  id:       string;
  name:     string;
  code:     string;
  isActive: boolean;
}

export interface DepartmentSummary extends DepartmentBasic {
  description: string | null;
  employees?:  { id: string; employmentStatus: string }[];
  projects?:   { id: string; status: string }[];
}

// ============================================
// ROLE
// ============================================
export interface Role extends AuditFields {
  id:          string;
  name:        string;
  code:        string;
  description: string | null;
  level:       number;
  isActive:    boolean;
  employees?:  Employee[];
}

export interface RoleBasic {
  id:      string;
  name:    string;
  code:    string;
  level:   number;
  isActive: boolean;
}

// ============================================
// EMPLOYEE
// ============================================
export interface Employee extends AuditFields {
  id:               string;
  employeeNumber:   string;
  firstName:        string;
  lastName:         string;
  middleName:       string | null;
  email:            string;
  personalEmail:    string | null;
  phone:            string | null;
  dateOfBirth:      string | null;
  gender:           string | null;
  nationality:      string | null;
  hireDate:         string;
  terminationDate:  string | null;
  employmentStatus: EmploymentStatus;
  employmentType:   EmploymentType;
  jobTitle:         string | null;
  salary:           number | null;
  currency:         string;
  profilePicture:   string | null;
  firebaseUid:      string | null;
  isActive:         boolean;
  department?:      DepartmentBasic | null;
  departmentId?:    string | null;
  role?:            RoleBasic | null;
  roleId?:          string | null;
  manager?:         EmployeeBasic | null;
  managerId?:       string | null;
  directReports?:   EmployeeBasic[];
  addresses?:       EmployeeAddress[];
  contacts?:        EmployeeContact[];
  projectAssignments?: EmployeeProject[];
  managedProjects?: Project[];
}

export interface EmployeeBasic {
  id:             string;
  employeeNumber: string;
  firstName:      string;
  lastName:       string;
  email:          string;
  jobTitle:       string | null;
  profilePicture: string | null;
}

export type EmploymentStatus =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'ON_LEAVE'
  | 'TERMINATED'
  | 'SUSPENDED';

export type EmploymentType =
  | 'FULL_TIME'
  | 'PART_TIME'
  | 'CONTRACT'
  | 'INTERN'
  | 'CONSULTANT';

export type Gender =
  | 'MALE'
  | 'FEMALE'
  | 'NON_BINARY'
  | 'PREFER_NOT_TO_SAY';

// ============================================
// EMPLOYEE ADDRESS
// ============================================
export interface EmployeeAddress extends AuditFields {
  id:           string;
  employeeId:   string;
  addressType:  AddressType;
  addressLine1: string;
  addressLine2: string | null;
  city:         string;
  state:        string | null;
  postalCode:   string | null;
  country:      string;
  isPrimary:    boolean;
  isActive:     boolean;
  employee?:    EmployeeBasic;
}

export type AddressType =
  | 'HOME'
  | 'WORK'
  | 'MAILING'
  | 'TEMPORARY'
  | 'OTHER';

// ============================================
// EMPLOYEE CONTACT
// ============================================
export interface EmployeeContact extends AuditFields {
  id:             string;
  employeeId:     string;
  contactType:    ContactType;
  firstName:      string;
  lastName:       string;
  relationship:   string | null;
  phone:          string;
  alternatePhone: string | null;
  email:          string | null;
  isPrimary:      boolean;
  isActive:       boolean;
  notes:          string | null;
  employee?:      EmployeeBasic;
}

export type ContactType =
  | 'EMERGENCY'
  | 'PERSONAL'
  | 'PROFESSIONAL'
  | 'OTHER';

// ============================================
// PROJECT
// ============================================
export interface Project extends AuditFields {
  id:           string;
  name:         string;
  code:         string;
  description:  string | null;
  status:       ProjectStatus;
  priority:     ProjectPriority;
  startDate:    string | null;
  endDate:      string | null;
  budget:       number | null;
  currency:     string;
  isActive:     boolean;
  department?:  DepartmentBasic | null;
  departmentId?: string | null;
  manager?:     EmployeeBasic | null;
  managerId?:   string | null;
  assignments?: EmployeeProject[];
}

export type ProjectStatus =
  | 'PLANNING'
  | 'IN_PROGRESS'
  | 'ON_HOLD'
  | 'COMPLETED'
  | 'CANCELLED'
  | 'ARCHIVED';

export type ProjectPriority =
  | 'CRITICAL'
  | 'HIGH'
  | 'MEDIUM'
  | 'LOW';

// ============================================
// EMPLOYEE PROJECT
// ============================================
export interface EmployeeProject extends AuditFields {
  id:         string;
  employeeId: string;
  projectId:  string;
  role:       ProjectRole;
  allocation: number;
  startDate:  string;
  endDate:    string | null;
  isActive:   boolean;
  notes:      string | null;
  employee?:  Employee;
  project?:   Project;
}

export type ProjectRole =
  | 'LEAD'
  | 'SENIOR_CONTRIBUTOR'
  | 'CONTRIBUTOR'
  | 'REVIEWER'
  | 'STAKEHOLDER'
  | 'OBSERVER';

// ============================================
// PAGINATION
// ============================================
export interface PaginationInput {
  limit:  number;
  offset: number;
}

export interface PaginatedResponse<T> {
  data:       T[];
  total:      number;
  limit:      number;
  offset:     number;
  hasMore:    boolean;
  totalPages: number;
}

// ============================================
// FILTER TYPES
// ============================================
export interface EmployeeFilters {
  searchTerm?:       string;
  departmentId?:     string;
  roleId?:           string;
  employmentStatus?: EmploymentStatus;
  employmentType?:   EmploymentType;
  isActive?:         boolean;
  managerId?:        string;
}

export interface ProjectFilters {
  searchTerm?:   string;
  status?:       ProjectStatus;
  priority?:     ProjectPriority;
  departmentId?: string;
  managerId?:    string;
  isActive?:     boolean;
}

export interface DepartmentFilters {
  searchTerm?: string;
  isActive?:   boolean;
}

// ============================================
// SORT TYPES
// ============================================
export type SortDirection = 'ASC' | 'DESC';

export interface SortInput {
  field:     string;
  direction: SortDirection;
}

// ============================================
// MUTATION INPUT TYPES
// ============================================
export interface CreateEmployeeInput {
  firstName:        string;
  lastName:         string;
  middleName?:      string;
  email:            string;
  personalEmail?:   string;
  phone?:           string;
  dateOfBirth?:     string;
  gender?:          Gender;
  nationality?:     string;
  hireDate:         string;
  employmentStatus: EmploymentStatus;
  employmentType:   EmploymentType;
  jobTitle?:        string;
  salary?:          number;
  currency?:        string;
  departmentId?:    string;
  roleId?:          string;
  managerId?:       string;
  firebaseUid?:     string;
  createdBy:        string;
}

export interface UpdateEmployeeInput {
  id:               string;
  firstName?:       string;
  lastName?:        string;
  middleName?:      string;
  phone?:           string;
  personalEmail?:   string;
  dateOfBirth?:     string;
  gender?:          Gender;
  nationality?:     string;
  employmentStatus?: EmploymentStatus;
  employmentType?:  EmploymentType;
  jobTitle?:        string;
  salary?:          number;
  currency?:        string;
  departmentId?:    string;
  roleId?:          string;
  managerId?:       string;
  terminationDate?: string;
  profilePicture?:  string;
  updatedBy:        string;
}

export interface CreateDepartmentInput {
  name:         string;
  code:         string;
  description?: string;
  createdBy:    string;
}

export interface UpdateDepartmentInput {
  id:           string;
  name?:        string;
  code?:        string;
  description?: string;
  isActive?:    boolean;
  updatedBy:    string;
}

export interface CreateProjectInput {
  name:          string;
  code:          string;
  description?:  string;
  status:        ProjectStatus;
  priority:      ProjectPriority;
  startDate?:    string;
  endDate?:      string;
  budget?:       number;
  currency?:     string;
  departmentId?: string;
  managerId?:    string;
  createdBy:     string;
}

export interface UpdateProjectInput {
  id:            string;
  name?:         string;
  description?:  string;
  status?:       ProjectStatus;
  priority?:     ProjectPriority;
  startDate?:    string;
  endDate?:      string;
  budget?:       number;
  currency?:     string;
  departmentId?: string;
  managerId?:    string;
  isActive?:     boolean;
  updatedBy:     string;
}

export interface AssignProjectInput {
  employeeId:  string;
  projectId:   string;
  role:        ProjectRole;
  allocation:  number;
  startDate:   string;
  endDate?:    string;
  notes?:      string;
  createdBy:   string;
}

export interface AddAddressInput {
  employeeId:    string;
  addressType:   AddressType;
  addressLine1:  string;
  addressLine2?: string;
  city:          string;
  state?:        string;
  postalCode?:   string;
  country:       string;
  isPrimary:     boolean;
  createdBy:     string;
}

export interface AddContactInput {
  employeeId:      string;
  contactType:     ContactType;
  firstName:       string;
  lastName:        string;
  relationship?:   string;
  phone:           string;
  alternatePhone?: string;
  email?:          string;
  isPrimary:       boolean;
  notes?:          string;
  createdBy:       string;
}

// ============================================
// API RESPONSE WRAPPER
// ============================================
export interface GraphQLResponse<T> {
  data:    T | null;
  errors?: GraphQLError[];
}

export interface GraphQLError {
  message:   string;
  locations?: { line: number; column: number }[];
  path?:     string[];
  extensions?: Record<string, unknown>;
}