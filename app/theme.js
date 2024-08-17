// app/theme.js
'use client'

import { createTheme } from '@mui/material/styles';

// Define light theme
const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2', // Example primary color
    },
    background: {
      default: '#f5f5f5', // Background color for light mode
      paper: '#ffffff',   // Paper color for light mode
    },
    text: {
      primary: '#000000', // Primary text color for light mode
      secondary: '#333333', // Secondary text color for light mode
    },
  },
});

// Define dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9', // Example primary color
    },
    background: {
      default: '#121212', // Background color for dark mode
      paper: '#1e1e1e',   // Paper color for dark mode
    },
    text: {
      primary: '#ffffff', // Primary text color for dark mode
      secondary: '#b0bec5', // Secondary text color for dark mode
    },
  },
});

export { lightTheme, darkTheme };
