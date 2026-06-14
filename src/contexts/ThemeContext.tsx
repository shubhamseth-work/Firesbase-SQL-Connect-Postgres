// ============================================
// THEME CONTEXT
// Manages light/dark mode toggle
// Persists preference to localStorage
// ============================================

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { PaletteMode } from '@mui/material';
import { buildTheme } from '../config/theme';

// -----------------------------------------------
// CONTEXT TYPE
// -----------------------------------------------
interface ThemeContextType {
  mode:       PaletteMode;
  toggleMode: () => void;
  isDark:     boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  mode:       'light',
  toggleMode: () => {},
  isDark:     false,
});

// -----------------------------------------------
// STORAGE KEY
// -----------------------------------------------
const THEME_KEY = 'clsql_theme_mode';

// -----------------------------------------------
// PROVIDER
// -----------------------------------------------
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<PaletteMode>(() => {
    const stored = localStorage.getItem(THEME_KEY);
    if (stored === 'dark' || stored === 'light') return stored;
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  });

  const theme = useMemo(() => buildTheme(mode), [mode]);

  const toggleMode = useCallback(() => {
    setMode(prev => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, next);
      return next;
    });
  }, []);

  // Sync with system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      const stored = localStorage.getItem(THEME_KEY);
      if (!stored) {
        setMode(e.matches ? 'dark' : 'light');
      }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const value = useMemo(
    () => ({ mode, toggleMode, isDark: mode === 'dark' }),
    [mode, toggleMode]
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

// -----------------------------------------------
// HOOK
// -----------------------------------------------
export const useThemeMode = (): ThemeContextType =>
  useContext(ThemeContext);

export default ThemeContext;