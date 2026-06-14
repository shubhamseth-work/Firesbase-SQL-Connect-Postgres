import React from 'react';
import { Box, Typography, Card, CardContent, Avatar, Divider } from '@mui/material';
import { useAuth } from '../../contexts/AuthContext';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  return (
    <Box>
      <Typography variant="h4" fontWeight={700} gutterBottom>My Profile</Typography>
      <Card elevation={1} sx={{ maxWidth: 600 }}>
        <CardContent sx={{ p: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
            <Avatar
              src={user?.photoURL || undefined}
              sx={{ width: 72, height: 72, fontSize: '1.5rem' }}
            >
              {user?.displayName?.[0]}
            </Avatar>
            <Box>
              <Typography variant="h6" fontWeight={700}>{user?.displayName}</Typography>
              <Typography variant="body2" color="text.secondary">{user?.email}</Typography>
            </Box>
          </Box>
          <Divider />
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            Full profile management in Phase 11.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};
export default ProfilePage;