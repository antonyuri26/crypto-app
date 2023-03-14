import React, { useContext } from "react";

import Carousel from "./Carousel";
import ThemeContext from "../store/theme-ctx";
import { darkTheme } from "../util/theme";

import { Typography, Container, Box } from "@mui/material";

import AI from "../assets/AI.jpg";

//AI Image background switch depending on theme selection
const stylesDark = {
  aibackground: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(${AI})`,
  },
};

const stylesLight = {
  aibackground: {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(189, 189, 189, 0.9)),url(${AI})`,
    // backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(189, 189, 189, 0.9)),url(${AI})`,
  },
};

const Header = (props) => {
  const ctx = useContext(ThemeContext);
  return (
    <Container
      maxWidth="100%"
      style={
        ctx.theme === darkTheme
          ? stylesDark.aibackground
          : stylesLight.aibackground
      }
    >
      <Container maxWidth="xl">
        <Box sx={{ bgcolor: "transparent", height: "57vh" }}>
          {/* header content */}
          <Box
            sx={{
              height: "30vh",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{ fontWeight: 500, color: "text.terciary" }}
            >
              Crypto Tracker
            </Typography>
            <Typography variant="h4" sx={{ color: "text.primary" }}>
              The World's Best Crypto APP Available!
            </Typography>
          </Box>
          <Box>
            <Carousel coins={props.coins} />
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Header;
