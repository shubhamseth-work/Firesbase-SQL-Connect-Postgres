import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Typography, Button, Card, CardContent,
  CardHeader, Divider, Grid, TextField,
} from '@mui/material';
import { Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { ROUTES } from '../../config/navigation';

const DepartmentFormPage: React.FC = () => {
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEdit   = Boolean(id);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" fontWeight={700}>
          {isEdit ? 'Edit Department' : 'New Department'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            startIcon={<CancelIcon />}
            variant="outlined"
            onClick={() => navigate(ROUTES.DEPARTMENTS)}
            sx={{ borderRadius: 2 }}
          >
            Cancel
          </Button>
          <Button
            startIcon={<SaveIcon />}
            variant="contained"
            sx={{ borderRadius: 2 }}
          >
            {isEdit ? 'Save Changes' : 'Create Department'}
          </Button>
        </Box>
      </Box>
      <Card elevation={1}>
        <CardHeader
          title="Department Information"
          titleTypographyProps={{ variant: 'h6', fontWeight: 700 }}
        />
        <Divider />
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <TextField label="Department Name" fullWidth required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Department Code" fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Description" fullWidth multiline rows={3} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default DepartmentFormPage;