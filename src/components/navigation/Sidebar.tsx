// ============================================
// SIDEBAR NAVIGATION
// Responsive drawer with collapsible menu
// ============================================

import React, { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
  Divider,
  Collapse,
  useTheme,
  Avatar,
} from '@mui/material';
import {
  ExpandLess,
  ExpandMore,
  ChevronLeft as CollapseIcon,
} from '@mui/icons-material';

import { NAV_ITEMS, BOTTOM_NAV_ITEMS, NavItem } from '../../config/navigation';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  drawerWidth:    number;
  collapsedWidth: number;
  mobileOpen:     boolean;
  collapsed:      boolean;
  onMobileClose:  () => void;
}

// -----------------------------------------------
// NAV ITEM COMPONENT
// -----------------------------------------------
interface NavItemProps {
  item:      NavItem;
  collapsed: boolean;
  depth?:    number;
}

const NavItemComponent: React.FC<NavItemProps> = ({
  item,
  collapsed,
  depth = 0,
}) => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const theme     = useTheme();
  const [open, setOpen] = useState(false);

  const hasChildren = item.children && item.children.length > 0;
  const isActive    = location.pathname === item.path ||
    (item.path !== '/' && location.pathname.startsWith(item.path));

  const handleClick = useCallback(() => {
    if (hasChildren) {
      setOpen(prev => !prev);
    } else {
      navigate(item.path);
    }
  }, [hasChildren, item.path, navigate]);

  return (
    <>
      <ListItem
        disablePadding
        sx={{ display: 'block', mb: 0.25 }}
      >
        <Tooltip
          title={collapsed ? item.label : ''}
          placement="right"
          arrow
        >
          <ListItemButton
            onClick={handleClick}
            selected={isActive}
            sx={{
              minHeight:    44,
              px:           collapsed ? 1.5 : 2,
              pl:           collapsed ? 1.5 : 2 + depth * 2,
              borderRadius: 2,
              mx:           1,
              justifyContent: collapsed ? 'center' : 'flex-start',
              '&.Mui-selected': {
                backgroundColor: theme.palette.mode === 'dark'
                  ? 'rgba(25,118,210,0.25)'
                  : 'rgba(25,118,210,0.12)',
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
                '& .MuiListItemText-primary': {
                  color:      theme.palette.primary.main,
                  fontWeight: 700,
                },
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: collapsed ? 0 : 36,
                color: isActive
                  ? theme.palette.primary.main
                  : theme.palette.text.secondary,
                justifyContent: 'center',
              }}
            >
              <item.icon fontSize="small" />
            </ListItemIcon>

            {!collapsed && (
              <>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    variant:    'body2',
                    fontWeight: isActive ? 700 : 500,
                    noWrap:     true,
                  }}
                />
                {hasChildren && (
                  open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />
                )}
              </>
            )}
          </ListItemButton>
        </Tooltip>
      </ListItem>

      {/* Children */}
      {hasChildren && !collapsed && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List disablePadding>
            {item.children!.map(child => (
              <NavItemComponent
                key={child.path}
                item={child}
                collapsed={collapsed}
                depth={depth + 1}
              />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
};

// -----------------------------------------------
// SIDEBAR DRAWER CONTENT
// -----------------------------------------------
interface DrawerContentProps {
  collapsed: boolean;
  width:     number;
}

const DrawerContent: React.FC<DrawerContentProps> = ({
  collapsed,
  width,
}) => {
  const theme = useTheme();
  const { user } = useAuth();

  return (
    <Box
      sx={{
        width,
        height:         '100%',
        display:        'flex',
        flexDirection:  'column',
        backgroundColor: theme.palette.background.paper,
        overflowX:      'hidden',
        transition:     theme.transitions.create('width', {
          easing:   theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      }}
    >
      {/* Brand Header */}
      <Box
        sx={{
          height:         64,
          display:        'flex',
          alignItems:     'center',
          px:             collapsed ? 1.5 : 2.5,
          justifyContent: collapsed ? 'center' : 'flex-start',
          borderBottom:   `1px solid ${theme.palette.divider}`,
          flexShrink:     0,
        }}
      >
        <Box
          sx={{
            width:        36,
            height:       36,
            borderRadius: 2,
            background:   'linear-gradient(135deg, #1976D2, #9C27B0)',
            display:      'flex',
            alignItems:   'center',
            justifyContent: 'center',
            flexShrink:   0,
            boxShadow:    '0 4px 12px rgba(25,118,210,0.35)',
          }}
        >
          <Typography
            sx={{ color: '#fff', fontWeight: 800, fontSize: '1rem' }}
          >
            C
          </Typography>
        </Box>
        {!collapsed && (
          <Box sx={{ ml: 1.5, overflow: 'hidden' }}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              noWrap
              color="primary"
            >
              CLSQL App
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              noWrap
            >
              Employee Management
            </Typography>
          </Box>
        )}
      </Box>

      {/* Main Navigation */}
      <Box sx={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', py: 1 }}>
        {!collapsed && (
          <Typography
            variant="overline"
            color="text.secondary"
            sx={{ px: 3, mb: 0.5, display: 'block', fontSize: '0.65rem' }}
          >
            Main Menu
          </Typography>
        )}
        <List disablePadding>
          {NAV_ITEMS.map(item => (
            <NavItemComponent
              key={item.path}
              item={item}
              collapsed={collapsed}
            />
          ))}
        </List>
      </Box>

      <Divider />

      {/* Bottom Navigation */}
      <Box sx={{ py: 1 }}>
        <List disablePadding>
          {BOTTOM_NAV_ITEMS.map(item => (
            <NavItemComponent
              key={item.path}
              item={item}
              collapsed={collapsed}
            />
          ))}
        </List>
      </Box>

      {/* User Avatar */}
      {user && (
        <>
          <Divider />
          <Box
            sx={{
              p:              collapsed ? 1 : 2,
              display:        'flex',
              alignItems:     'center',
              gap:            1.5,
              justifyContent: collapsed ? 'center' : 'flex-start',
            }}
          >
            <Avatar
              src={user.photoURL || undefined}
              alt={user.displayName || 'User'}
              sx={{ width: 36, height: 36, flexShrink: 0 }}
            />
            {!collapsed && (
              <Box sx={{ overflow: 'hidden' }}>
                <Typography
                  variant="body2"
                  fontWeight={600}
                  noWrap
                >
                  {user.displayName || 'User'}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  noWrap
                >
                  {user.email}
                </Typography>
              </Box>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

// -----------------------------------------------
// MAIN SIDEBAR COMPONENT
// -----------------------------------------------
const Sidebar: React.FC<SidebarProps> = ({
  drawerWidth,
  collapsedWidth,
  mobileOpen,
  collapsed,
  onMobileClose,
}) => {
  const theme = useTheme();
  const effectiveWidth = collapsed ? collapsedWidth : drawerWidth;

  return (
    <>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display:          { xs: 'block', lg: 'none' },
          '& .MuiDrawer-paper': {
            width:     drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <DrawerContent collapsed={false} width={drawerWidth} />
      </Drawer>

      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', lg: 'block' },
          '& .MuiDrawer-paper': {
            width:      effectiveWidth,
            boxSizing:  'border-box',
            overflowX:  'hidden',
            transition: theme.transitions.create('width', {
              easing:   theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
          },
        }}
        open
      >
        <DrawerContent collapsed={collapsed} width={effectiveWidth} />
      </Drawer>
    </>
  );
};

export default Sidebar;