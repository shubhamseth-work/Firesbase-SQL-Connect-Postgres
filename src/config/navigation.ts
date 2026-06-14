// ============================================
// NAVIGATION CONFIGURATION
// Single source of truth for all routes
// and sidebar menu items
// ============================================

import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  BusinessCenter as DepartmentIcon,
  FolderSpecial as ProjectIcon,
  Assessment as ReportsIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

// -----------------------------------------------
// ROUTE PATHS
// -----------------------------------------------
export const ROUTES = {
  // Auth
  LOGIN:    '/login',
  SIGNUP:   '/signup',

  // App
  DASHBOARD:   '/',
  EMPLOYEES:   '/employees',
  EMPLOYEE_NEW:    '/employees/new',
  EMPLOYEE_DETAIL: '/employees/:id',
  EMPLOYEE_EDIT:   '/employees/:id/edit',

  DEPARTMENTS:     '/departments',
  DEPARTMENT_NEW:  '/departments/new',
  DEPARTMENT_DETAIL: '/departments/:id',
  DEPARTMENT_EDIT:   '/departments/:id/edit',

  PROJECTS:     '/projects',
  PROJECT_NEW:  '/projects/new',
  PROJECT_DETAIL: '/projects/:id',
  PROJECT_EDIT:   '/projects/:id/edit',

  REPORTS:          '/reports',
  REPORTS_EMPLOYEES: '/reports/employees',
  REPORTS_DEPARTMENTS: '/reports/departments',
  REPORTS_PROJECTS: '/reports/projects',

  PROFILE:  '/profile',
  SETTINGS: '/settings',

  NOT_FOUND: '*',
} as const;

// -----------------------------------------------
// SIDEBAR NAVIGATION ITEMS
// -----------------------------------------------
export interface NavItem {
  label:    string;
  path:     string;
  icon:     React.ElementType;
  children?: NavItem[];
  badge?:   number;
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Dashboard',
    path:  ROUTES.DASHBOARD,
    icon:  DashboardIcon,
  },
  {
    label: 'Employees',
    path:  ROUTES.EMPLOYEES,
    icon:  PeopleIcon,
  },
  {
    label: 'Departments',
    path:  ROUTES.DEPARTMENTS,
    icon:  DepartmentIcon,
  },
  {
    label: 'Projects',
    path:  ROUTES.PROJECTS,
    icon:  ProjectIcon,
  },
  {
    label: 'Reports',
    path:  ROUTES.REPORTS,
    icon:  ReportsIcon,
    children: [
      {
        label: 'Employee Report',
        path:  ROUTES.REPORTS_EMPLOYEES,
        icon:  PeopleIcon,
      },
      {
        label: 'Department Report',
        path:  ROUTES.REPORTS_DEPARTMENTS,
        icon:  DepartmentIcon,
      },
      {
        label: 'Project Report',
        path:  ROUTES.REPORTS_PROJECTS,
        icon:  ProjectIcon,
      },
    ],
  },
];

export const BOTTOM_NAV_ITEMS: NavItem[] = [
  {
    label: 'Profile',
    path:  ROUTES.PROFILE,
    icon:  ProfileIcon,
  },
  {
    label: 'Settings',
    path:  ROUTES.SETTINGS,
    icon:  SettingsIcon,
  },
];