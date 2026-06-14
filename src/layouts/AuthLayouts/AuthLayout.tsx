// ============================================
// AUTH LAYOUT
// Wraps login and signup pages
// Centered card with branding
// ============================================

import React from 'react';
import { Outlet } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  useTheme,
} from '@mui/material';

const AuthLayout: React.FC = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        minHeight:       '100vh',
        display:         'flex',
        flexDirection:   'column',
        alignItems:      'center',
        justifyContent:  'center',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #0A0E1A 0%, #121829 50%, #1A2035 100%)'
          : 'linear-gradient(135deg, #E3F2FD 0%, #F5F7FA 50%, #E8EAF6 100%)',
        px: 2,
        py: 4,
      }}
    >
      {/* Logo / Brand */}
      <Box
        sx={{
          mb: 4,
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            width:        56,
            height:       56,
            borderRadius: 3,
            background:   'linear-gradient(135deg, #1976D2, #9C27B0)',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            mx:           'auto',
            mb:           2,
            boxShadow:    '0 8px 24px rgba(25, 118, 210, 0.4)',
          }}
        >
          <Typography
            variant="h5"
            sx={{ color: '#fff', fontWeight: 800 }}
          >
            C
          </Typography>
        </Box>
        <Typography
          variant="h5"
          fontWeight={700}
          color="primary"
        >
          CLSQL React App
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mt: 0.5 }}
        >
          Enterprise Employee Management System
        </Typography>
      </Box>

      {/* Page Content */}
      <Container maxWidth="sm">
        <Outlet />
      </Container>

      {/* Footer */}
      <Typography
        variant="caption"
        color="text.secondary"
        sx={{ mt: 4 }}
      >
        © {new Date().getFullYear()} CLSQL React App. All rights reserved.
      </Typography>
    </Box>
  );
};

export default AuthLayout;