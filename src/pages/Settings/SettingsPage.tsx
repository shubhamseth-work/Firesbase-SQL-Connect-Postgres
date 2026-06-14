import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useThemeMode } from '../../contexts/ThemeContext';

const SettingsPage: React.FC = () => {
  const { mode, toggleMode } = useThemeMode();
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>Settings</Typography>
      <Card elevation={1} sx={{ maxWidth: 600 }}>
        <CardContent sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={700} gutterBottom>Appearance</Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Current theme: <strong>{mode}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Use the theme toggle in the top bar to switch between light and dark mode.
            Full settings management in Phase 11.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
export default SettingsPage;