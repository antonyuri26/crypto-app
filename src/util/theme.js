import { createTheme } from "@mui/material/styles";

export const darkTheme = createTheme({
  palette: {
    // mode: "dark",
    primary: {
      main: "#000",
      contrastText: "#fff",
    },
    secondary: {
      main: "#ffce2b",
      contrastText: "#000",
    },
    terciary: {
      main: "#bdbdbd",
      contrastText: "#fff",
    },
    text: {
      primary: "#bdbdbd",
      secondary: "#000",
      terciary: "#fff",
    },
  },
});

export const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#fff", //background colour
    },
    secondary: {
      main: "#000",
      contrastText: "#fff",
    },
    terciary: {
      main: "#bdbdbd",
      contrastText: "#fff",
    },
    text: {
      primary: "#000", //text for white background
      secondary: "#fff",
      terciary: "#202652",
    },
  },
});

//styling components directly
/* <Button sx={{ color: "primary.main" }}>Button</Button> */

//Applying main color
/* <Button variant="contained" color="secondary">  */

//COLORS
//   textPrimary: "white",
//   textSecondary: "#bdbcb1",
//   backgroundPrimary: "#000000",
//   backgroundSecondary: "#ffce2b",
//   darkBlue: "#202652",
//   extras: "#d68b5c",

// const styles = {
//   aibackground: {
//     backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)),url(${AI})`,
//   },
// };
// style={styles.aibackground}
