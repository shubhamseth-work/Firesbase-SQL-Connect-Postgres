import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { Add as AddIcon, FolderSpecial as ProjectIcon } from '@mui/icons-material';
import { ROUTES } from '../../config/navigation';

const ProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Projects
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Manage and track company projects
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate(ROUTES.PROJECT_NEW)}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Create Project
        </Button>
      </Box>
      <Card elevation={1}>
        <CardContent sx={{ py: 6, textAlign: 'center' }}>
          <ProjectIcon sx={{ fontSize: 56, color: 'text.disabled', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            No projects yet
          </Typography>
          <Typography variant="body2" color="text.disabled" sx={{ mb: 2 }}>
            Full implementation in Phase 11
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate(ROUTES.PROJECT_NEW)}
            sx={{ borderRadius: 2 }}
          >
            Create First Project
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
export default ProjectsPage;