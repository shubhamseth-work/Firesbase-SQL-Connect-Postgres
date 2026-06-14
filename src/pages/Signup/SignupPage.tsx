// ============================================
// SIGNUP PAGE
// Redirects to login (Google SSO handles
// account creation automatically)
// ============================================

import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Alert,
} from '@mui/material';
import { ArrowBack as BackIcon } from '@mui/icons-material';
import { ROUTES } from '../../config/navigation';

const SignupPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card elevation={2}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Create Account
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Account creation is managed through Google SSO
          </Typography>
        </Box>

        <Alert severity="info" sx={{ mb: 3, borderRadius: 2 }}>
          This application uses Google Single Sign-On. Your account
          is created automatically when you sign in with your
          company Google account for the first time.
        </Alert>

        <Button
          fullWidth
          variant="contained"
          size="large"
          startIcon={<BackIcon />}
          onClick={() => navigate(ROUTES.LOGIN)}
          sx={{ py: 1.5, borderRadius: 2 }}
        >
          Go to Sign In
        </Button>
      </CardContent>
    </Card>
  );
};

export default SignupPage;