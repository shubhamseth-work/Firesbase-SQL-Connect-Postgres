import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../config/navigation';

const ProjectReportPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Button startIcon={<BackIcon />} onClick={() => navigate(ROUTES.REPORTS)} sx={{ mb: 3 }}>
        Back to Reports
      </Button>
      <Typography variant="h4" fontWeight={700}>Project Report</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Full PDF/CSV export implementation in Phase 12.
      </Typography>
    </Box>
  );
};
export default ProjectReportPage;