// ============================================
// MATERIAL UI THEME CONFIGURATION
// Light and Dark themes
// ============================================

import { createTheme, Theme, PaletteMode } from '@mui/material';

// -----------------------------------------------
// COLOR PALETTE
// -----------------------------------------------
const COLORS = {
  primary: {
    main:        '#1976D2',
    light:       '#42A5F5',
    dark:        '#1565C0',
    contrastText:'#FFFFFF',
  },
  secondary: {
    main:        '#9C27B0',
    light:       '#BA68C8',
    dark:        '#7B1FA2',
    contrastText:'#FFFFFF',
  },
  success: {
    main:  '#2E7D32',
    light: '#4CAF50',
    dark:  '#1B5E20',
  },
  warning: {
    main:  '#ED6C02',
    light: '#FF9800',
    dark:  '#E65100',
  },
  error: {
    main:  '#D32F2F',
    light: '#EF5350',
    dark:  '#C62828',
  },
  info: {
    main:  '#0288D1',
    light: '#03A9F4',
    dark:  '#01579B',
  },
};

// -----------------------------------------------
// BUILD THEME BY MODE
// -----------------------------------------------
export const buildTheme = (mode: PaletteMode): Theme => {
  const isLight = mode === 'light';

  return createTheme({
    palette: {
      mode,
      primary:   COLORS.primary,
      secondary: COLORS.secondary,
      success:   COLORS.success,
      warning:   COLORS.warning,
      error:     COLORS.error,
      info:      COLORS.info,
      background: {
        default: isLight ? '#F5F7FA' : '#0A0E1A',
        paper:   isLight ? '#FFFFFF' : '#121829',
      },
      text: {
        primary:   isLight ? '#1A2035' : '#E8EAED',
        secondary: isLight ? '#5F6B7C' : '#9AA0AB',
      },
      divider: isLight ? '#E0E4EA' : '#2A3045',
    },

    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: { fontSize: '2.5rem',  fontWeight: 700, lineHeight: 1.2 },
      h2: { fontSize: '2rem',    fontWeight: 700, lineHeight: 1.3 },
      h3: { fontSize: '1.75rem', fontWeight: 600, lineHeight: 1.3 },
      h4: { fontSize: '1.5rem',  fontWeight: 600, lineHeight: 1.4 },
      h5: { fontSize: '1.25rem', fontWeight: 600, lineHeight: 1.4 },
      h6: { fontSize: '1rem',    fontWeight: 600, lineHeight: 1.5 },
      subtitle1: { fontSize: '1rem',    fontWeight: 500 },
      subtitle2: { fontSize: '0.875rem',fontWeight: 500 },
      body1:     { fontSize: '0.875rem',fontWeight: 400, lineHeight: 1.6 },
      body2:     { fontSize: '0.8125rem',fontWeight:400, lineHeight: 1.6 },
      caption:   { fontSize: '0.75rem', fontWeight: 400 },
      overline:  { fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.08em' },
      button:    { fontSize: '0.875rem',fontWeight: 600, letterSpacing: '0.02em' },
    },

    shape: {
      borderRadius: 10,
    },

    shadows: [
      'none',
      isLight
        ? '0px 1px 3px rgba(0,0,0,0.08), 0px 1px 2px rgba(0,0,0,0.06)'
        : '0px 1px 3px rgba(0,0,0,0.3), 0px 1px 2px rgba(0,0,0,0.2)',
      isLight
        ? '0px 4px 6px rgba(0,0,0,0.07), 0px 2px 4px rgba(0,0,0,0.06)'
        : '0px 4px 6px rgba(0,0,0,0.4), 0px 2px 4px rgba(0,0,0,0.3)',
      isLight
        ? '0px 10px 15px rgba(0,0,0,0.07), 0px 4px 6px rgba(0,0,0,0.05)'
        : '0px 10px 15px rgba(0,0,0,0.4), 0px 4px 6px rgba(0,0,0,0.3)',
      isLight
        ? '0px 20px 25px rgba(0,0,0,0.07), 0px 10px 10px rgba(0,0,0,0.04)'
        : '0px 20px 25px rgba(0,0,0,0.4), 0px 10px 10px rgba(0,0,0,0.3)',
      ...Array(20).fill(
        isLight
          ? '0px 25px 50px rgba(0,0,0,0.1)'
          : '0px 25px 50px rgba(0,0,0,0.5)'
      ),
    ] as Theme['shadows'],

    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius:  8,
            textTransform: 'none',
            fontWeight:    600,
            padding:       '8px 20px',
          },
          containedPrimary: {
            boxShadow: '0 2px 8px rgba(25, 118, 210, 0.35)',
            '&:hover': {
              boxShadow: '0 4px 12px rgba(25, 118, 210, 0.45)',
            },
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: isLight
              ? '0px 2px 8px rgba(0,0,0,0.08)'
              : '0px 2px 8px rgba(0,0,0,0.4)',
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 12,
          },
          elevation1: {
            boxShadow: isLight
              ? '0px 2px 8px rgba(0,0,0,0.08)'
              : '0px 2px 8px rgba(0,0,0,0.4)',
          },
        },
      },

      MuiTextField: {
        defaultProps: {
          variant: 'outlined',
          size:    'small',
        },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: 8,
            },
          },
        },
      },

      MuiTableHead: {
        styleOverrides: {
          root: {
            '& .MuiTableCell-head': {
              fontWeight:      600,
              backgroundColor: isLight ? '#F5F7FA' : '#1A2035',
              color:           isLight ? '#1A2035' : '#E8EAED',
            },
          },
        },
      },

      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:hover': {
              backgroundColor: isLight
                ? 'rgba(25, 118, 210, 0.04)'
                : 'rgba(25, 118, 210, 0.08)',
            },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight:   600,
          },
        },
      },

      MuiDrawer: {
        styleOverrides: {
          paper: {
            borderRight: 'none',
            boxShadow: isLight
              ? '2px 0 8px rgba(0,0,0,0.08)'
              : '2px 0 8px rgba(0,0,0,0.4)',
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            boxShadow: isLight
              ? '0 1px 4px rgba(0,0,0,0.08)'
              : '0 1px 4px rgba(0,0,0,0.4)',
          },
        },
      },

      MuiListItemButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            marginBottom:  2,
            '&.Mui-selected': {
              backgroundColor: isLight
                ? 'rgba(25, 118, 210, 0.12)'
                : 'rgba(25, 118, 210, 0.20)',
              '&:hover': {
                backgroundColor: isLight
                  ? 'rgba(25, 118, 210, 0.16)'
                  : 'rgba(25, 118, 210, 0.24)',
              },
            },
          },
        },
      },

      MuiDataGrid: {
        styleOverrides: {
          root: {
            borderRadius:  12,
            border: 'none',
            '& .MuiDataGrid-columnHeaders': {
              backgroundColor: isLight ? '#F5F7FA' : '#1A2035',
              borderRadius:    '12px 12px 0 0',
              fontWeight:      600,
            },
            '& .MuiDataGrid-row:hover': {
              backgroundColor: isLight
                ? 'rgba(25, 118, 210, 0.04)'
                : 'rgba(25, 118, 210, 0.08)',
            },
            '& .MuiDataGrid-cell:focus': {
              outline: 'none',
            },
          },
        },
      },
    },
  });
};

export const lightTheme = buildTheme('light');
export const darkTheme  = buildTheme('dark');
export default lightTheme;