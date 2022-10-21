import { createTheme, Color } from '@mui/material';
import { dataDisplayTheme } from './data-display-theme';
import { inputsTheme } from './inputs-theme';
declare module '@mui/material/styles' {
  interface PaletteColor extends Color {}
  interface SimplePaletteColorOptions {}
}

const baseTheme = createTheme({
  typography: {
    fontFamily: [
      'Jost',
      'ui-sans-serif',
      'system-ui',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      '"Noto Sans"',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
      '"Noto Color Emoji"',
    ].join(','),
    fontWeightRegular: 400,
    fontWeightBold: 500,
    button: {
      fontWeight: 400,
      textTransform: 'none',
      fontSize: '1rem',
    },
  },

  shape: {
    borderRadius: 6,
  },

  palette: {
    background: {
      default: '#060101',
      paper: '#060101',
    },

    primary: {
      main: '#dc2626',
      light: '#fecaca',
      dark: '#991b1b',
      contrastText: '#ffffff',
      50: '#fef2f2',
      100: '#fee2e2',
      200: '#fecaca',
      300: '#fca5a5',
      400: '#f87171',
      500: '#ef4444',
      600: '#dc2626',
      700: '#b91c1c',
      800: '#991b1b',
      900: '#7f1d1d',
    },

    secondary: {
      main: '#9333ea',
      light: '#e9d5ff',
      dark: '#6b21a8',
      contrastText: '#ffffff',
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#581c87',
    },

    grey: {
      50: '#f8fafc',
      100: '#f1f5f9',
      200: '#e2e8f0',
      300: '#cbd5e1',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },

    success: {
      main: '#059669',
      light: '#a7f3d0',
      dark: '#065f46',
      contrastText: '#fff',
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },

    warning: {
      main: '#fcd34d',
      light: '#fffbeb',
      dark: '#d97706',
      contrastText: '#000',
      50: '#fffbeb',
      100: '#fef3c7',
      200: '#fde68a',
      300: '#fcd34d',
      400: '#fbbf24',
      500: '#f59e0b',
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },
    divider: '#e2e8f0',
  },
});

export const theme = createTheme(baseTheme, inputsTheme(baseTheme), dataDisplayTheme(baseTheme));
