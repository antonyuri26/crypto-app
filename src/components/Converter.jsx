import React, { useContext, useState, useRef } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import ThemeContext from "../store/theme-ctx";

import styled from "styled-components";
import { lightTheme, darkTheme } from "../util/theme";
import { red } from "@mui/material/colors";

//adjusting prices format
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Converter = (props) => {
  const ctx = useContext(ThemeContext);
  const [input, setInput] = useState(props.symbol);
  const [value, setValue] = useState();

  let style;

  if (ctx.theme === darkTheme) {
    style = darkTheme;
  } else {
    style = lightTheme;
  }

  const CssTextField = styled(TextField)({
    "& label": {
      color: style.palette.secondary.main,
    },
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
      "& .MuiOutlinedInput-input": {
        color: "text.terciary",
      },
      "& .MuiInputBase-input": {
        color: "black",
      },
    },
  });

  let total;
  let enteredInput;
  const inputHandler = (evt) => {
    enteredInput = evt.target.value;
    total = evt.target.value * props.currentPrice.toFixed(2);
  };

  const convertHandler = () => {
    setValue(total);
    setInput(enteredInput);
  };

  return (
    <>
      <Box
        backgroundColor="primary.main"
        width={"100%"}
        // height="400px"
      ></Box>
      {/* Converter */}
      <Box mt={"3rem"}>
        <Typography variant="h5" mb={"1rem"}>
          Crypto Converter
        </Typography>
        <form>
          <CssTextField
            id="outlined-basic"
            label={input ? input : props.symbol}
            variant="outlined"
            sx={{
              marginBottom: "1rem",
              backgroundColor: "extra.main",
            }}
            onChange={inputHandler}
          />
          <CssTextField
            id="outlined-basic"
            label={value ? `$${numberWithCommas(value)}` : props.currency}
            variant="outlined"
            sx={{
              backgroundColor: "extra.main",
            }}
          />
          <Typography
            variant="subtitle2"
            sx={{ color: "secondary.main", marginTop: "0.8rem" }}
          >
            {props.currecy === "aud"
              ? `1 ${props.symbol} = $${numberWithCommas(
                  props.currentPrice.toFixed(2) * 1.5
                )}`
              : `1 ${props.symbol} = $${numberWithCommas(
                  props.currentPrice.toFixed(2)
                )}`}
          </Typography>
          <Button
            sx={{
              marginTop: "0.5rem",
              backgroundColor: "secondary.main",
              color: "text.extra",
              ":hover": {
                bgcolor: "terciary.main",
              },
            }}
            onClick={convertHandler}
          >
            Convert
          </Button>
        </form>
      </Box>
    </>
  );
};

export default Converter;
