import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Paper } from "@mui/material";

import { lightTheme, darkTheme } from "./util/theme";

import RootLayout from "./layout/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Exchanges from "./pages/Exchanges";
import Portfolio from "./pages/Portfolio";
import CoinPage from "./pages/CoinPage";
import ThemeContext from "./store/theme-ctx";

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

  //switch theme handler
  const switchThemeHandler = (theme) => {
    if (theme === "light") {
      setTheme(lightTheme);
    } else {
      setTheme(darkTheme);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: theme,
        switchTheme: switchThemeHandler,
      }}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Paper>
          <RouterProvider router={router} />
        </Paper>
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}

export default App;
