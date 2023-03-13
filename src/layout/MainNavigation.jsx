import React, { useContext, useState } from "react";
import ThemeContext, { CurrencyContext } from "../store/theme-ctx";
import { lightTheme } from "../util/theme";

import styled from "styled-components";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { Select } from "@mui/material";

import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";

import cryptologo from "../assets/cryptologo.png";
import cryptologoblk from "../assets/cryptologoblk.png";

import Modal from "./Modal";
import Register from "../components/Register";

const pages = ["Exchanges", "Portfolio Tracker", "Crypto News"];
const settings = ["Profile", "Account", "Dashboard", "Logout"];

const MainNavigation = (props) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = useState(false); //modal state

  const themeCtx = useContext(ThemeContext);
  const currencyCtx = useContext(CurrencyContext);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignupModalClose = () => {
    setOpen(false);
  };

  const handleSignupModalOpen = () => {
    setOpen(true);
  };

  const currencySelectHandler = (evt) => {
    props.setCurrency(evt.target.value);
  };

  return (
    <>
      {open && (
        <Modal onClose={handleSignupModalClose} theme={themeCtx.theme}>
          <Register />
        </Modal>
      )}
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {/* logo here */}
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

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "#ffce2b",
                textDecoration: "none",
              }}
            >
              CRYPTO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, display: "block", color: "text.primary" }}
                >
                  {page}
                </Button>
              ))}
            </Box>
            <Box
              sx={{
                flexGrow: 0.02,
                display: { xs: "none", md: "flex" },
                justifyContent: "space-around",
                alignItems: "center",
                mr: "7px",
                height: "40px",
              }}
            >
              <Tooltip>
                <LightModeIcon
                  fontSize={"large"}
                  onClick={() => themeCtx.switchTheme("light")}
                  sx={{ cursor: "pointer" }}
                />
              </Tooltip>
              <Tooltip>
                <DarkModeIcon
                  fontSize={"large"}
                  onClick={() => themeCtx.switchTheme("dark")}
                  sx={{ cursor: "pointer" }}
                />
              </Tooltip>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Select
                variant="outlined"
                labelId="currency-select"
                id="currency-select"
                value={currencyCtx.currency}
                sx={{
                  backgroundColor: "terciary.main",
                  color: "text.secondary",
                  marginLeft: "1rem",
                  fontSize: "14px",
                }}
                style={{ width: 80, height: 38, marginLeft: 15 }}
                onChange={currencySelectHandler}
              >
                <MenuItem value={"USD"} sx={{ fontSize: "14px" }}>
                  USD
                </MenuItem>
                <MenuItem value={"AUD"} sx={{ fontSize: "14px" }}>
                  AUD
                </MenuItem>
              </Select>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Button
                sx={{
                  ":hover": {
                    backgroundColor: "terciary.main",
                    color: "text.secondary",
                  },
                  backgroundColor: "secondary.main",
                  color: "text.secondary",
                  marginLeft: "1rem",
                }}
                onClick={handleSignupModalOpen}
              >
                Login
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default MainNavigation;
