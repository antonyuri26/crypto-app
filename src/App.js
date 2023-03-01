import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { CssBaseline, Paper } from "@mui/material";

import { lightTheme, darkTheme } from "./util/theme";

import RootLayout from "./layout/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Exchanges from "./pages/Exchanges";
import Portfolio from "./pages/Portfolio";
import CoinPage from "./pages/CoinPage";

function App() {
  const [theme, setTheme] = useState(darkTheme);

  //creating routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "/exchanges",
          element: <Exchanges />,
        },
        {
          path: "/portfoliotracker",
          element: <Portfolio />,
        },
        { path: "/coin/:id", element: <CoinPage /> },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Paper>
        <RouterProvider router={router} />
        {/* <h1>Hello World</h1>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setTheme(lightTheme)}
        >
          LightTheme
        </Button>
        <Button variant="contained" onClick={() => setTheme(darkTheme)}>
          DarkTheme
        </Button> */}
      </Paper>
    </ThemeProvider>
  );
}

export default App;
