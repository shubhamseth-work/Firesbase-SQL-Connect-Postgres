// ============================================
// EMPLOYEE FORM PAGE
// Create and Edit — same component
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
  CardHeader,
  Divider,
  Grid,
  TextField,
  MenuItem,
  Stack,
} from '@mui/material';
import {
  Save as SaveIcon,
  Cancel as CancelIcon,
  NavigateNext as BreadcrumbIcon,
} from '@mui/icons-material';
import { ROUTES } from '../../config/navigation';

const EmployeeFormPage: React.FC = () => {
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit   = Boolean(id);

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
          {isEdit ? 'Edit Employee' : 'New Employee'}
        </Typography>
      </Breadcrumbs>

      {/* Header */}
      <Box
        sx={{
          display:        'flex',
          justifyContent: 'space-between',
          alignItems:     'center',
          mb:             3,
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          {isEdit ? 'Edit Employee' : 'Add New Employee'}
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            startIcon={<CancelIcon />}
            variant="outlined"
            onClick={() => navigate(ROUTES.EMPLOYEES)}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            {isEdit ? 'Save Changes' : 'Create Employee'}
          </Button>
        </Stack>
      </Box>

      {/* Personal Information */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <CardHeader
          title="Personal Information"
          titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
        />
        <Divider />
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                label="First Name"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Middle Name"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Last Name"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Work Email"
                type="email"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Personal Email"
                type="email"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Date of Birth"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Gender"
                select
                fullWidth
              >
                <MenuItem value="MALE">Male</MenuItem>
                <MenuItem value="FEMALE">Female</MenuItem>
                <MenuItem value="NON_BINARY">Non-Binary</MenuItem>
                <MenuItem value="PREFER_NOT_TO_SAY">Prefer Not To Say</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nationality"
                fullWidth
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Employment Information */}
      <Card elevation={1} sx={{ mb: 3 }}>
        <CardHeader
          title="Employment Information"
          titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
        />
        <Divider />
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Job Title"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Hire Date"
                type="date"
                fullWidth
                required
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Employment Status"
                select
                fullWidth
                required
                defaultValue="ACTIVE"
              >
                <MenuItem value="ACTIVE">Active</MenuItem>
                <MenuItem value="INACTIVE">Inactive</MenuItem>
                <MenuItem value="ON_LEAVE">On Leave</MenuItem>
                <MenuItem value="TERMINATED">Terminated</MenuItem>
                <MenuItem value="SUSPENDED">Suspended</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Employment Type"
                select
                fullWidth
                required
                defaultValue="FULL_TIME"
              >
                <MenuItem value="FULL_TIME">Full Time</MenuItem>
                <MenuItem value="PART_TIME">Part Time</MenuItem>
                <MenuItem value="CONTRACT">Contract</MenuItem>
                <MenuItem value="INTERN">Intern</MenuItem>
                <MenuItem value="CONSULTANT">Consultant</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Department"
                select
                fullWidth
              >
                <MenuItem value="">Select Department</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Role"
                select
                fullWidth
              >
                <MenuItem value="">Select Role</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Manager"
                select
                fullWidth
              >
                <MenuItem value="">Select Manager</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Compensation */}
      <Card elevation={1}>
        <CardHeader
          title="Compensation"
          titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
        />
        <Divider />
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <TextField
                label="Salary"
                type="number"
                fullWidth
                InputProps={{ inputProps: { min: 0 } }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Currency"
                select
                fullWidth
                defaultValue="USD"
              >
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="GBP">GBP</MenuItem>
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="CAD">CAD</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EmployeeFormPage;