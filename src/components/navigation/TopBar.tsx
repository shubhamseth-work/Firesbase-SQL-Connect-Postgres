// ============================================
// TOP BAR / APP BAR
// Search, theme toggle, notifications, user
// ============================================

import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  InputBase,
  Badge,
  useTheme,
  alpha,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Person as ProfileIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';

import { useAuth }      from '../../contexts/AuthContext';
import { useThemeMode } from '../../contexts/ThemeContext';
import { ROUTES }       from '../../config/navigation';

interface TopBarProps {
  onMenuToggle: () => void;
  sidebarWidth: number;
}

const TopBar: React.FC<TopBarProps> = ({ onMenuToggle }) => {
  const theme        = useTheme();
  const navigate     = useNavigate();
  const { user, logout }   = useAuth();
  const { mode, toggleMode } = useThemeMode();

  const [anchorEl,    setAnchorEl]    = useState<null | HTMLElement>(null);
  const [searchValue, setSearchValue] = useState('');

  const handleMenuOpen  = useCallback((e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  }, []);
  const handleMenuClose = useCallback(() => setAnchorEl(null), []);

  const handleLogout = useCallback(async () => {
    handleMenuClose();
    await logout();
    navigate(ROUTES.LOGIN);
  }, [logout, navigate, handleMenuClose]);

  const handleProfile = useCallback(() => {
    handleMenuClose();
    navigate(ROUTES.PROFILE);
  }, [navigate, handleMenuClose]);

  const handleSettings = useCallback(() => {
    handleMenuClose();
    navigate(ROUTES.SETTINGS);
  }, [navigate, handleMenuClose]);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        zIndex:          theme.zIndex.drawer + 1,
        backgroundColor: theme.palette.background.paper,
        color:           theme.palette.text.primary,
        borderBottom:    `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar sx={{ gap: 1, minHeight: '64px !important' }}>

        {/* Menu Toggle */}
        <IconButton
          edge="start"
          onClick={onMenuToggle}
          size="small"
          sx={{ color: 'text.secondary' }}
        >
          <MenuIcon />
        </IconButton>

        {/* Page Title */}
        <Typography
          variant="h6"
          fontWeight={600}
          sx={{
            display: { xs: 'none', sm: 'block' },
            color:   'text.primary',
          }}
        >
          Employee Management
        </Typography>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Search Bar */}
        <Box
          sx={{
            display:         { xs: 'none', md: 'flex' },
            alignItems:      'center',
            backgroundColor: alpha(theme.palette.text.primary, 0.06),
            borderRadius:    2,
            px:              2,
            py:              0.5,
            gap:             1,
            width:           280,
            '&:hover': {
              backgroundColor: alpha(theme.palette.text.primary, 0.09),
            },
          }}
        >
          <SearchIcon
            fontSize="small"
            sx={{ color: 'text.secondary' }}
          />
          <InputBase
            placeholder="Search employees..."
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            sx={{
              flex:     1,
              fontSize: '0.875rem',
            }}
          />
        </Box>

        {/* Theme Toggle */}
        <Tooltip title={mode === 'dark' ? 'Light mode' : 'Dark mode'}>
          <IconButton
            onClick={toggleMode}
            size="small"
            sx={{ color: 'text.secondary' }}
          >
            {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
        </Tooltip>

        {/* Notifications */}
        <Tooltip title="Notifications">
          <IconButton size="small" sx={{ color: 'text.secondary' }}>
            <Badge badgeContent={3} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* User Avatar */}
        <Tooltip title={user?.displayName || 'Account'}>
          <IconButton onClick={handleMenuOpen} size="small" sx={{ p: 0.5 }}>
            <Avatar
              src={user?.photoURL || undefined}
              alt={user?.displayName || 'User'}
              sx={{ width: 34, height: 34 }}
            />
          </IconButton>
        </Tooltip>

        {/* User Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          PaperProps={{
            elevation: 3,
            sx: {
              mt:           1.5,
              minWidth:     220,
              borderRadius: 2,
              overflow:     'visible',
            },
          }}
        >
          {/* User Info */}
          <Box sx={{ px: 2, py: 1.5 }}>
            <Typography variant="subtitle2" fontWeight={700}>
              {user?.displayName || 'User'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email}
            </Typography>
          </Box>
          <Divider />

          <MenuItem onClick={handleProfile} sx={{ py: 1.25 }}>
            <ListItemIcon>
              <ProfileIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="My Profile" />
          </MenuItem>

          <MenuItem onClick={handleSettings} sx={{ py: 1.25 }}>
            <ListItemIcon>
              <SettingsIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText primary="Settings" />
          </MenuItem>

          <Divider />

          <MenuItem
            onClick={handleLogout}
            sx={{ py: 1.25, color: 'error.main' }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ color: 'error.main' }} />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;