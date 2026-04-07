import { createTheme } from '@mui/material/styles';

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#324f6b',
      light: '#5a7fa4',
      dark: '#1f3447',
    },
    secondary: {
      main: '#f57c00',
      light: '#ffb74d',
      dark: '#e65100',
    },
    success: {
      main: '#4caf50',
      light: '#81c784',
      dark: '#2e7d32',
    },
    warning: {
      main: '#ff9800',
      light: '#ffb74d',
      dark: '#f57c00',
    },
    error: {
      main: '#f44336',
      light: '#ef5350',
      dark: '#d32f2f',
    },
    info: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    background: {
      default: '#fafafa',
      paper: '#ffffff',
    },
    text: {
      primary: '#212121',
      secondary: '#757575',
    },
    divider: '#bdbdbd',
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
      light: '#bbdefb',
      dark: '#42a5f5',
    },
    secondary: {
      main: '#ffb74d',
      light: '#ffe082',
      dark: '#ffa726',
    },
    success: {
      main: '#66bb6a',
      light: '#81c784',
      dark: '#43a047',
    },
    warning: {
      main: '#ffb74d',
      light: '#ffe082',
      dark: '#ffa726',
    },
    error: {
      main: '#ef5350',
      light: '#e57373',
      dark: '#e53935',
    },
    info: {
      main: '#64b5f6',
      light: '#90caf9',
      dark: '#42a5f5',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    },
    divider: '#424242',
    action: {
      hover: 'rgba(255, 255, 255, 0.08)',
      selected: 'rgba(255, 255, 255, 0.16)',
      active: 'rgba(255, 255, 255, 0.24)',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      color: '#ffffff',
    },
    h5: {
      color: '#ffffff',
    },
    h6: {
      color: '#ffffff',
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: '#1e1e1e',
        },
        outlined: {
          borderColor: '#424242',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#1e1e1e',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          backgroundColor: '#2d2d2d',
          color: '#ffffff',
        },
        outlined: {
          borderColor: '#424242',
          color: '#b0bec5',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: '#2d2d2d',
            '& fieldset': {
              borderColor: '#424242',
            },
            '&:hover fieldset': {
              borderColor: '#616161',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#90caf9',
            },
          },
          '& .MuiInputBase-input': {
            color: '#ffffff',
          },
          '& .MuiInputLabel-root': {
            color: '#b0bec5',
          },
        },
      },
    },
    MuiListItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#2d2d2d',
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#2d2d2d',
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        contained: {
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        },
        outlined: {
          borderColor: '#424242',
          color: '#90caf9',
          '&:hover': {
            borderColor: '#90caf9',
            backgroundColor: 'rgba(144, 202, 249, 0.08)',
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: '#2d2d2d',
          color: '#ffffff',
        },
        standardSuccess: {
          backgroundColor: 'rgba(102, 187, 106, 0.15)',
          color: '#66bb6a',
        },
        standardError: {
          backgroundColor: 'rgba(239, 83, 80, 0.15)',
          color: '#ef5350',
        },
        standardWarning: {
          backgroundColor: 'rgba(255, 183, 77, 0.15)',
          color: '#ffb74d',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e1e1e',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#1e1e1e',
          borderRight: '1px solid #424242',
        },
      },
    },
  },
});
