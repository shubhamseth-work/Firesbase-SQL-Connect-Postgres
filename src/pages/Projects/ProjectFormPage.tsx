import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { ROUTES } from '../../config/navigation';

const ProjectFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {id ? 'Edit Project' : 'New Project'}
      </Typography>
      <Button variant="outlined" onClick={() => navigate(ROUTES.PROJECTS)} sx={{ borderRadius: 2 }}>
        Cancel
      </Button>
    </Box>
  );
};
export default ProjectFormPage;