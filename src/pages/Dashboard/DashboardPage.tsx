// ============================================
// DASHBOARD PAGE
// Summary stats, recent activity
// ============================================

import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Button,
  Skeleton,
  useTheme,
} from '@mui/material';
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  FolderSpecial as ProjectIcon,
  TrendingUp as TrendingIcon,
  ArrowForward as ArrowIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth }     from '../../contexts/AuthContext';
import { ROUTES }      from '../../config/navigation';

// -----------------------------------------------
// STAT CARD
// -----------------------------------------------
interface StatCardProps {
  title:      string;
  value:      string | number;
  subtitle:   string;
  icon:       React.ReactNode;
  color:      string;
  trend?:     string;
  onClick?:   () => void;
}

const StatCard: React.FC<StatCardProps> = ({
  title, value, subtitle, icon, color, trend, onClick,
}) => {
  const theme = useTheme();
  return (
    <Card
      elevation={1}
      onClick={onClick}
      sx={{
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': onClick ? {
          transform:  'translateY(-2px)',
          boxShadow:  theme.shadows[4],
        } : {},
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Box
            sx={{
              width:           48,
              height:          48,
              borderRadius:    2,
              backgroundColor: `${color}20`,
              display:         'flex',
              alignItems:      'center',
              justifyContent:  'center',
              color,
            }}
          >
            {icon}
          </Box>
          {trend && (
            <Chip
              label={trend}
              size="small"
              color="success"
              sx={{ fontWeight: 600, height: 24 }}
            />
          )}
        </Box>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          {value}
        </Typography>
        <Typography variant="subtitle2" fontWeight={600} gutterBottom>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {subtitle}
        </Typography>
      </CardContent>
    </Card>
  );
};

// -----------------------------------------------
// DASHBOARD PAGE
// -----------------------------------------------
const DashboardPage: React.FC = () => {
  const navigate    = useNavigate();
  const theme       = useTheme();
  const { user }    = useAuth();

  const stats = [
    {
      title:    'Total Employees',
      value:    '—',
      subtitle: 'Active employees',
      icon:     <PeopleIcon />,
      color:    theme.palette.primary.main,
      trend:    '+12%',
      route:    ROUTES.EMPLOYEES,
    },
    {
      title:    'Departments',
      value:    '—',
      subtitle: 'Active departments',
      icon:     <BusinessIcon />,
      color:    theme.palette.secondary.main,
      route:    ROUTES.DEPARTMENTS,
    },
    {
      title:    'Active Projects',
      value:    '—',
      subtitle: 'In progress projects',
      icon:     <ProjectIcon />,
      color:    theme.palette.success.main,
      trend:    '+5%',
      route:    ROUTES.PROJECTS,
    },
    {
      title:    'Reports',
      value:    '3',
      subtitle: 'Available report types',
      icon:     <TrendingIcon />,
      color:    theme.palette.warning.main,
      route:    ROUTES.REPORTS,
    },
  ];

  const quickActions = [
    {
      label:  'Add Employee',
      route:  ROUTES.EMPLOYEE_NEW,
      color:  'primary' as const,
    },
    {
      label:  'New Department',
      route:  ROUTES.DEPARTMENT_NEW,
      color:  'secondary' as const,
    },
    {
      label:  'Create Project',
      route:  ROUTES.PROJECT_NEW,
      color:  'success' as const,
    },
    {
      label:  'View Reports',
      route:  ROUTES.REPORTS,
      color:  'warning' as const,
    },
  ];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Good {getGreeting()}, {user?.displayName?.split(' ')[0] || 'there'} 👋
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening with your organization today.
        </Typography>
      </Box>

      {/* Stats Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} lg={3} key={stat.title}>
            <StatCard
              {...stat}
              onClick={() => navigate(stat.route)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Quick Actions + Recent Activity */}
      <Grid container spacing={3}>

        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card elevation={1}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Quick Actions
              </Typography>
              <Box
                sx={{
                  display:       'flex',
                  flexDirection: 'column',
                  gap:           1.5,
                  mt:            2,
                }}
              >
                {quickActions.map((action) => (
                  <Button
                    key={action.label}
                    variant="outlined"
                    color={action.color}
                    endIcon={<ArrowIcon />}
                    onClick={() => navigate(action.route)}
                    sx={{
                      justifyContent: 'space-between',
                      py:             1.25,
                      borderRadius:   2,
                    }}
                  >
                    {action.label}
                  </Button>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={8}>
          <Card elevation={1}>
            <CardContent sx={{ p: 3 }}>
              <Box
                sx={{
                  display:        'flex',
                  justifyContent: 'space-between',
                  alignItems:     'center',
                  mb:             2,
                }}
              >
                <Typography variant="h6" fontWeight={700}>
                  Recent Activity
                </Typography>
                <Button
                  size="small"
                  endIcon={<ArrowIcon />}
                  onClick={() => navigate(ROUTES.EMPLOYEES)}
                >
                  View All
                </Button>
              </Box>

              {/* Skeleton loading state */}
              <List disablePadding>
                {[1, 2, 3, 4, 5].map((i) => (
                  <ListItem key={i} disablePadding sx={{ py: 1 }}>
                    <ListItemAvatar>
                      <Skeleton variant="circular" width={40} height={40} />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Skeleton width="60%" />}
                      secondary={<Skeleton width="40%" />}
                    />
                  </ListItem>
                ))}
              </List>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ textAlign: 'center', py: 2 }}
              >
                Connect your data to see recent activity here.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

// Helper
const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
};

export default DashboardPage;