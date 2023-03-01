import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#ffce2b",
      contrastText: "#000",
    },
    secondary: {
      main: "#202652",
      contrastText: "#fff",
    },
    text: {
      primary: "#ffffff",
      secondary: "#bdbcb1",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#ffce2b",
      contrastText: "#000",
    },
    secondary: {
      main: "#202652",
      light: "#64748B",
      contrastText: "#fff",
    },
  },
});

//COLORS
//   textPrimary: "white",
//   textSecondary: "#bdbcb1",
//   backgroundPrimary: "#000000",
//   backgroundSecondary: "#ffce2b",
//   darkBlue: "#202652",
//   extras: "#d68b5c",
