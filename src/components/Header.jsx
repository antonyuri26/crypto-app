import React, { useContext } from "react";

import Carousel from "./Carousel";
import ThemeContext from "../store/theme-ctx";
import { darkTheme } from "../util/theme";

import { Typography, Container, Box } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

import AI from "../assets/AI.jpg";

//AI Image background switch depending on theme selection
const stylesDark = {
  aibackground: {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),url(${AI})`,
  },
};

const stylesLight = {
  aibackground: {
    backgroundColor: "#fff",
    // backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3), rgba(189, 189, 189, 0.9)),url(${AI})`,
  },
};

const Header = (props) => {
  const tablet = useMediaQuery("(min-width:700px)");
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
              variant={tablet ? "h1" : "h2"}
              sx={{ fontWeight: 500, color: "text.terciary" }}
              textAlign={tablet ? "" : "center"}
            >
              Crypto Tracker
            </Typography>
            <Typography
              variant={tablet ? "h4" : "h5"}
              sx={{ color: "text.primary" }}
              textAlign={tablet ? "" : "center"}
            >
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
