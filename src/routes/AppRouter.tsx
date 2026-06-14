// ============================================
// APP ROUTER
// Central route definitions
// ============================================

import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';

import ProtectedRoute from './ProtectedRoute';
import PublicRoute    from './PublicRoute';
import MainLayout     from '../layouts/MainLayout/MainLayout';
import AuthLayout     from '../layouts/AuthLayout/AuthLayout';
import { ROUTES }     from '../config/navigation';

// -----------------------------------------------
// LAZY LOADED PAGES
// -----------------------------------------------
const LoginPage      = lazy(() => import('../pages/Login/LoginPage'));
const SignupPage     = lazy(() => import('../pages/Signup/SignupPage'));
const DashboardPage  = lazy(() => import('../pages/Dashboard/DashboardPage'));

const EmployeesPage      = lazy(() => import('../pages/Employees/EmployeesPage'));
const EmployeeDetailPage = lazy(() => import('../pages/Employees/EmployeeDetailPage'));
const EmployeeFormPage   = lazy(() => import('../pages/Employees/EmployeeFormPage'));

const DepartmentsPage      = lazy(() => import('../pages/Departments/DepartmentsPage'));
const DepartmentDetailPage = lazy(() => import('../pages/Departments/DepartmentDetailPage'));
const DepartmentFormPage   = lazy(() => import('../pages/Departments/DepartmentFormPage'));

const ProjectsPage      = lazy(() => import('../pages/Projects/ProjectsPage'));
const ProjectDetailPage = lazy(() => import('../pages/Projects/ProjectDetailPage'));
const ProjectFormPage   = lazy(() => import('../pages/Projects/ProjectFormPage'));

const ReportsPage            = lazy(() => import('../pages/Reports/ReportsPage'));
const EmployeeReportPage     = lazy(() => import('../pages/Reports/EmployeeReportPage'));
const DepartmentReportPage   = lazy(() => import('../pages/Reports/DepartmentReportPage'));
const ProjectReportPage      = lazy(() => import('../pages/Reports/ProjectReportPage'));

const ProfilePage  = lazy(() => import('../pages/Profile/ProfilePage'));
const SettingsPage = lazy(() => import('../pages/Settings/SettingsPage'));
const NotFoundPage = lazy(() => import('../pages/NotFound/NotFoundPage'));

// -----------------------------------------------
// PAGE LOADER
// -----------------------------------------------
const PageLoader: React.FC = () => (
  <Box
    sx={{
      display:        'flex',
      alignItems:     'center',
      justifyContent: 'center',
      minHeight:      '60vh',
    }}
  >
    <CircularProgress />
  </Box>
);

// -----------------------------------------------
// ROUTER
// -----------------------------------------------
const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>

        {/* ---- PUBLIC ROUTES ---- */}
        <Route element={<AuthLayout />}>
          <Route
            path={ROUTES.LOGIN}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path={ROUTES.SIGNUP}
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />
        </Route>

        {/* ---- PROTECTED ROUTES ---- */}
        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          {/* Dashboard */}
          <Route index element={<DashboardPage />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />

          {/* Employees */}
          <Route path={ROUTES.EMPLOYEES}       element={<EmployeesPage />} />
          <Route path={ROUTES.EMPLOYEE_NEW}    element={<EmployeeFormPage />} />
          <Route path={ROUTES.EMPLOYEE_DETAIL} element={<EmployeeDetailPage />} />
          <Route path={ROUTES.EMPLOYEE_EDIT}   element={<EmployeeFormPage />} />

          {/* Departments */}
          <Route path={ROUTES.DEPARTMENTS}       element={<DepartmentsPage />} />
          <Route path={ROUTES.DEPARTMENT_NEW}    element={<DepartmentFormPage />} />
          <Route path={ROUTES.DEPARTMENT_DETAIL} element={<DepartmentDetailPage />} />
          <Route path={ROUTES.DEPARTMENT_EDIT}   element={<DepartmentFormPage />} />

          {/* Projects */}
          <Route path={ROUTES.PROJECTS}       element={<ProjectsPage />} />
          <Route path={ROUTES.PROJECT_NEW}    element={<ProjectFormPage />} />
          <Route path={ROUTES.PROJECT_DETAIL} element={<ProjectDetailPage />} />
          <Route path={ROUTES.PROJECT_EDIT}   element={<ProjectFormPage />} />

          {/* Reports */}
          <Route path={ROUTES.REPORTS}              element={<ReportsPage />} />
          <Route path={ROUTES.REPORTS_EMPLOYEES}    element={<EmployeeReportPage />} />
          <Route path={ROUTES.REPORTS_DEPARTMENTS}  element={<DepartmentReportPage />} />
          <Route path={ROUTES.REPORTS_PROJECTS}     element={<ProjectReportPage />} />

          {/* Profile & Settings */}
          <Route path={ROUTES.PROFILE}  element={<ProfilePage />} />
          <Route path={ROUTES.SETTINGS} element={<SettingsPage />} />
        </Route>

        {/* ---- 404 ---- */}
        <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />

      </Routes>
    </Suspense>
  );
};

export default AppRouter;