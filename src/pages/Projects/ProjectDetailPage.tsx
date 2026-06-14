import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { ROUTES } from '../../config/navigation';

const ProjectDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  return (
    <Box>
      <Button startIcon={<BackIcon />} onClick={() => navigate(ROUTES.PROJECTS)} sx={{ mb: 3 }}>
        Back to Projects
      </Button>
      <Typography variant="h4" fontWeight={700}>Project Detail</Typography>
      <Typography color="text.secondary" sx={{ mt: 1 }}>ID: {id} — Full implementation in Phase 11.</Typography>
    </Box>
  );
};
export default ProjectDetailPage;