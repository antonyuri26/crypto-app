import React, { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lightTheme, darkTheme } from "./util/theme";
import ThemeContext, { CurrencyContext } from "./store/theme-ctx";

import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Paper } from "@mui/material";

import RootLayout from "./layout/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import Exchanges from "./pages/Exchanges";
import Portfolio from "./pages/Portfolio";
import CoinPage from "./pages/CoinPage";

function App() {
  const [theme, setTheme] = useState(darkTheme);
  const [currency, setCurrency] = useState("USD");

  //creating routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout setCurrency={setCurrency} />,
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
      <CurrencyContext.Provider value={{ currency: currency }}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Paper>
            <RouterProvider router={router} />
          </Paper>
        </ThemeProvider>
      </CurrencyContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
