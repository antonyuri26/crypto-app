import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
// import styled from "styled-components";
import { styled } from "@mui/material/styles";
import { useContext } from "react";
import ThemeContext from "../store/theme-ctx";
import { lightTheme, darkTheme } from "../util/theme";

const SearchBar = (props) => {
  const ctx = useContext(ThemeContext);
  let style;

  if (ctx.theme === darkTheme) {
    style = darkTheme;
  } else {
    style = lightTheme;
  }

  const CssTextField = styled(TextField)({
    "& label.Mui-focused": {
      color: style.palette.secondary.main,
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: style.palette.secondary.main,
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: style.palette.terciary.main,
      },
      "&:hover fieldset": {
        borderColor: style.palette.secondary.main,
      },
      "&.Mui-focused fieldset": {
        borderColor: style.palette.secondary.main,
      },
      "& .MuiInputBase-root": {
        color: "text.terciary",
      },
    },
  });

  const searchBoxHandler = (e) => {
    // e.preventDefault();
    props.searchHandler(e.target.value);
  };

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
        mt: "1.5rem",
        pb: "1.5rem",
      }}
    >
      <CssTextField
        fullWidth
        label="Search Crypto"
        id="fullWidth"
        variant="outlined"
        placeholder="Search"
        sx={{
          "& .MuiFormLabel-root": {
            color: "text.terciary",
          },
        }}
        onChange={searchBoxHandler}
        // value={search}
        // onChange={(e) => props.searchHandler(e.target.value)}
      />
    </Box>
  );
};

export default React.memo(SearchBar);
