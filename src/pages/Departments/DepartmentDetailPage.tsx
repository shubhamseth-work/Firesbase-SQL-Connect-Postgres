import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { ROUTES } from '../../config/navigation';

const DepartmentDetailPage: React.FC = () => {
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();

  return (
    <Box>
      <Button
        startIcon={<BackIcon />}
        onClick={() => navigate(ROUTES.DEPARTMENTS)}
        sx={{ mb: 3 }}
      >
        Back to Departments
      </Button>
      <Typography variant="h4" fontWeight={700}>
        Department Detail
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>
        Department ID: {id} — Full implementation in Phase 11.
      </Typography>
    </Box>
  );
};

export default DepartmentDetailPage;