import React, { useContext, useState } from "react";
import ThemeContext from "../store/theme-ctx";
import { CurrencyContext } from "../store/theme-ctx";
import { lightTheme, darkTheme } from "../util/theme";

import { Box, Typography, TextField, Button } from "@mui/material";

import styled from "styled-components";

//adjusting prices format
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Converter = (props) => {
  const ctx = useContext(ThemeContext);
  const [input, setInput] = useState(props.symbol);
  const [value, setValue] = useState();
  const currencyCtx = useContext(CurrencyContext);
  const currencySelected = currencyCtx.currency;

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
    if (currencySelected === "USD") {
      total = evt.target.value * props.currentPriceUsd.toFixed(2);
    } else {
      total = evt.target.value * props.currentPriceAud.toFixed(2);
    }
  };

  const convertHandler = () => {
    setValue(total);
    setInput(enteredInput);
  };

  return (
    <>
      <Box backgroundColor="primary.main" width={"100%"}></Box>
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
          {currencySelected === "USD" ? (
            <Typography
              variant="subtitle2"
              sx={{ color: "secondary.main", marginTop: "0.8rem" }}
            >
              1 {props.symbol} = $
              {numberWithCommas(props.currentPriceUsd.toFixed(2))}
            </Typography>
          ) : (
            <Typography
              variant="subtitle2"
              sx={{ color: "secondary.main", marginTop: "0.8rem" }}
            >
              1 {props.symbol} = $
              {numberWithCommas(props.currentPriceAud.toFixed(2))}
            </Typography>
          )}

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
