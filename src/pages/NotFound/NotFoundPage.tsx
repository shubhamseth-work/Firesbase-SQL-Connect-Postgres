import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import { ROUTES } from '../../config/navigation';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        minHeight:      '80vh',
        gap:            2,
        textAlign:      'center',
      }}
    >
      <Typography
        variant="h1"
        fontWeight={800}
        color="primary"
        sx={{ fontSize: { xs: '4rem', sm: '6rem' } }}
      >
        404
      </Typography>
      <Typography variant="h4" fontWeight={700}>
        Page Not Found
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 400 }}>
        The page you are looking for doesn't exist or has been moved.
      </Typography>
      <Button
        variant="contained"
        startIcon={<HomeIcon />}
        onClick={() => navigate(ROUTES.DASHBOARD)}
        sx={{ borderRadius: 2, px: 4, mt: 2 }}
        size="large"
      >
        Go to Dashboard
      </Button>
    </Box>
  );
};
export default NotFoundPage;