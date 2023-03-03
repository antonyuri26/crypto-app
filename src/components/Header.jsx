import React, { useContext } from "react";
import { Typography, Container, Box } from "@mui/material";
import AI from "../assets/AI.jpg";
import ThemeContext from "../store/theme-ctx";
import { darkTheme } from "../util/theme";

import Carousel from "./Carousel";

//AI Image background switch depending on theme selection
const stylesDark = {
  aibackground: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.9)),url(${AI})`,
  },
};

const stylesLight = {
  aibackground: {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.7)),url(${AI})`,
  },
};

const Header = () => {
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
        <Box sx={{ bgcolor: "transparent", height: "60vh" }}>
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
            <Carousel />
          </Box>
        </Box>
      </Container>
    </Container>
  );
};

export default Header;
