import React, { useContext } from "react";
import ThemeContext from "../store/theme-ctx";
import { lightTheme } from "../util/theme";

import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import cryptologo from "../assets/cryptologo.png";
import cryptologoblk from "../assets/cryptologoblk.png";

function Copyright() {
  const themeCtx = useContext(ThemeContext);
  return (
    <>
      <Box display={"flex"} justifyContent={"center"}>
        {themeCtx.theme === lightTheme ? (
          <img src={cryptologoblk} width={"30px"} alt="logo" />
        ) : (
          <img src={cryptologo} width={"30px"} alt="logo" />
        )}
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            ml: 1,
            display: { xs: "none", md: "flex" },
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "#ffce2b",
            textDecoration: "none",
          }}
        >
          CRYPTO
        </Typography>
      </Box>
      <Typography
        variant="body2"
        textAlign={"center"}
        sx={{ color: "text.terciary", marginTop: "1rem" }}
      >
        {"Copyright © "}
        <Link href="#" sx={{ color: "text.terciary" }}>
          Antonio Souza
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </>
  );
}

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // minHeight: "100vh",
      }}
    >
      <CssBaseline />

      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: "primary.main",
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
