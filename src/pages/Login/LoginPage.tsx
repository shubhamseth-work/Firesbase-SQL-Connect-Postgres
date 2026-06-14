// ============================================
// LOGIN PAGE
// Google SSO only
// ============================================

import React, { useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Card,
  CardContent,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import { Google as GoogleIcon } from '@mui/icons-material';

import { useAuth }  from '../../contexts/AuthContext';
import { ROUTES }   from '../../config/navigation';

const LoginPage: React.FC = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { signInWithGoogle, isLoading, error, clearError } = useAuth();

  const from = (location.state as { from?: Location })?.from?.pathname
    || ROUTES.DASHBOARD;

  const handleGoogleSignIn = useCallback(async () => {
    clearError();
    await signInWithGoogle();
    navigate(from, { replace: true });
  }, [signInWithGoogle, navigate, from, clearError]);

  return (
    <Card elevation={2}>
      <CardContent sx={{ p: { xs: 3, sm: 4 } }}>

        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h5" fontWeight={700} gutterBottom>
            Welcome Back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to access your employee management dashboard
          </Typography>
        </Box>

        {/* Error */}
        {error && (
          <Alert
            severity="error"
            onClose={clearError}
            sx={{ mb: 3, borderRadius: 2 }}
          >
            {error}
          </Alert>
        )}

        {/* Google Sign In Button */}
        <Button
          fullWidth
          variant="outlined"
          size="large"
          startIcon={
            isLoading
              ? <CircularProgress size={18} />
              : <GoogleIcon />
          }
          onClick={handleGoogleSignIn}
          disabled={isLoading}
          sx={{
            py:           1.5,
            borderRadius: 2,
            borderColor:  'divider',
            color:        'text.primary',
            fontWeight:   600,
            fontSize:     '0.9375rem',
            '&:hover': {
              borderColor:     'primary.main',
              backgroundColor: 'action.hover',
            },
          }}
        >
          {isLoading ? 'Signing in...' : 'Continue with Google'}
        </Button>

        <Divider sx={{ my: 3 }}>
          <Typography variant="caption" color="text.secondary">
            Secure Authentication
          </Typography>
        </Divider>

        {/* Info */}
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="caption" color="text.secondary">
            By signing in, you agree to our Terms of Service
            and Privacy Policy. Access is restricted to
            authorized company accounts only.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LoginPage;