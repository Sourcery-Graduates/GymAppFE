import { createTheme } from "@mui/material";
import variables from "../styles/base/export.module.scss";

const { primaryColor, secondaryColor, accentColor, fontFamilyPrimary } =
  variables;

declare module "@mui/material/styles" {
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
    primary: {
      main: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    accent: {
      main: accentColor,
    },
  },
  typography: {
    fontFamily: fontFamilyPrimary,
  },
});

export { GymTheme };
