import { createTheme } from '@mui/material';

import variables from '../styles/base/export.module.scss';
import { grey } from '@mui/material/colors';

const { textColor, primaryColor, secondaryColor, accentColor, fontFamilyPrimary, redDelete } = variables;

declare module '@mui/material/styles' {
  interface Palette {
    accent: {
      main: string;
    };
  }

  interface PaletteOptions {
    accent?: {
      main?: string;
    };
  }
}

const GymTheme = createTheme({
  palette: {
    text: {
      primary: textColor,
    },
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    accent: {
      main: accentColor,
    },
    error: {
      main: redDelete,
    },
  },
  typography: {
    fontFamily: fontFamilyPrimary,
  },
  components: {
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: grey[900], // Set background color for input fields in dark mode

          '&:hover': {
            backgroundColor: '#272727', // Background on hover
          },

          '&.Mui-focused': {
            backgroundColor: '#252525', // Background when focused
          },
        },

        input: {
          color: textColor, // Text color inside input
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: grey[500], // Label color in dark mode

          '&.Mui-focused': {
            color: grey[400], // Label color when focused
          },
        },
      },
    },

    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: grey[500], // Helper text color in dark mode
        },
      },
    },
  },
});

export { GymTheme };
