import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import { People, Business, FolderSpecial } from '@mui/icons-material';
import { ROUTES } from '../../config/navigation';

const reports = [
  { title: 'Employee Report',   icon: <People />,       route: ROUTES.REPORTS_EMPLOYEES,   color: '#1976D2' },
  { title: 'Department Report', icon: <Business />,     route: ROUTES.REPORTS_DEPARTMENTS, color: '#9C27B0' },
  { title: 'Project Report',    icon: <FolderSpecial />,route: ROUTES.REPORTS_PROJECTS,    color: '#2E7D32' },
];

const ReportsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>Reports</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
        Generate and export reports for your organization
      </Typography>
      <Grid container spacing={3}>
        {reports.map(r => (
          <Grid item xs={12} sm={4} key={r.title}>
            <Card elevation={1} sx={{ cursor: 'pointer', '&:hover': { boxShadow: 4 } }}
              onClick={() => navigate(r.route)}>
              <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box sx={{ color: r.color, mb: 2, '& svg': { fontSize: 48 } }}>{r.icon}</Box>
                <Typography variant="h6" fontWeight={700}>{r.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 2 }}>
                  Export PDF, CSV, or print
                </Typography>
                <Button variant="outlined" size="small" sx={{ borderRadius: 2 }}>
                  View Report
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
export default ReportsPage;