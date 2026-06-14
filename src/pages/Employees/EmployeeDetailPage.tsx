// ============================================
// EMPLOYEE DETAIL PAGE
// ============================================

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Breadcrumbs,
  Link,
  Card,
  CardContent,
  Skeleton,
  Chip,
  Grid,
  Avatar,
  Divider,
  Tab,
  Tabs,
} from '@mui/material';
import {
  Edit as EditIcon,
  ArrowBack as BackIcon,
  NavigateNext as BreadcrumbIcon,
} from '@mui/icons-material';

import { ROUTES } from '../../config/navigation';

const EmployeeDetailPage: React.FC = () => {
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState(0);

  return (
    <Box>
      {/* Breadcrumbs */}
      <Breadcrumbs
        separator={<BreadcrumbIcon fontSize="small" />}
        sx={{ mb: 3 }}
      >
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate(ROUTES.EMPLOYEES)}
          underline="hover"
          color="text.secondary"
        >
          Employees
        </Link>
        <Typography variant="body2" color="text.primary" fontWeight={600}>
          Employee Detail
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box
        sx={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          mb:             3,
          gap:            2,
          flexWrap:       'wrap',
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Button
            startIcon={<BackIcon />}
            onClick={() => navigate(ROUTES.EMPLOYEES)}
            variant="outlined"
            size="small"
            sx={{ borderRadius: 2 }}
          >
            Back
          </Button>
          <Typography variant="h5" fontWeight={700}>
            Employee Profile
          </Typography>
        </Box>
        <Button
          startIcon={<EditIcon />}
          variant="contained"
          onClick={() =>
            navigate(ROUTES.EMPLOYEE_EDIT.replace(':id', id || ''))
          }
          sx={{ borderRadius: 2 }}
        >
          Edit Employee
        </Button>
      </Box>

      {/* Profile Card */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
            <Avatar
              sx={{
                width:  96,
                height: 96,
                fontSize: '2rem',
                bgcolor:  'primary.main',
              }}
            >
              <Skeleton variant="circular" width={96} height={96} />
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Skeleton width="40%" height={32} sx={{ mb: 1 }} />
              <Skeleton width="25%" height={20} sx={{ mb: 1 }} />
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                <Chip label="ACTIVE"    color="success" size="small" sx={{ fontWeight: 600 }} />
                <Chip label="FULL_TIME" variant="outlined" size="small" />
                <Chip label="ENG"       variant="outlined" size="small" />
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Tabs */}
      <Card elevation={1}>
        <Tabs
          value={activeTab}
          onChange={(_, v) => setActiveTab(v)}
          sx={{
            borderBottom: 1,
            borderColor:  'divider',
            px:           2,
          }}
        >
          <Tab label="Overview"  />
          <Tab label="Addresses" />
          <Tab label="Contacts"  />
          <Tab label="Projects"  />
        </Tabs>
        <CardContent sx={{ p: 3 }}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              {[
                'Employee Number', 'First Name', 'Last Name',
                'Email', 'Phone', 'Job Title',
                'Department', 'Role', 'Manager',
                'Hire Date', 'Employment Status', 'Employment Type',
              ].map((label) => (
                <Grid item xs={12} sm={6} md={4} key={label}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    fontWeight={600}
                    textTransform="uppercase"
                    letterSpacing="0.05em"
                  >
                    {label}
                  </Typography>
                  <Skeleton width="80%" height={24} sx={{ mt: 0.5 }} />
                </Grid>
              ))}
            </Grid>
          )}
          {activeTab === 1 && (
            <Typography color="text.secondary">
              Address information will load here.
            </Typography>
          )}
          {activeTab === 2 && (
            <Typography color="text.secondary">
              Contact information will load here.
            </Typography>
          )}
          {activeTab === 3 && (
            <Typography color="text.secondary">
              Project assignments will load here.
            </Typography>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeeDetailPage;