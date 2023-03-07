import * as React from "react";
import { useState } from "react";

import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Pagination, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";

import Progress from "../components/Progress";

//adjusting prices format
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
`;

export default function CoinsTable(props) {
  const [page, setPage] = useState(1);

  //search handler
  const searchCoinHandler = () => {
    if (props.search) {
      return props.coins.filter(
        (coin) =>
          coin.coinName.toLowerCase().includes(props.search) ||
          coin.symbol.toLowerCase().includes(props.search)
      );
    } else {
      return props.coins;
    }
  };

  //visit specific coin page
  const coinClickHandler = (coin) => {
    console.log(coin.coinName);
  };

  return (
    <>
      {props.isLoading ? (
        <Progress />
      ) : (
        <Box
          bgcolor="primary.main"
          sx={{ width: "100%" }}
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
        >
          <TableContainer component={Paper} sx={{ width: "80%" }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "secondary.main" }}>
                <TableRow>
                  <TableCell sx={{ color: "text.secondary" }}>#</TableCell>
                  <TableCell
                    sx={{ color: "text.secondary", pr: "12rem" }}
                    align="left"
                  >
                    Coin
                  </TableCell>
                  <TableCell align="right" sx={{ color: "text.secondary" }}>
                    Price
                  </TableCell>
                  <TableCell align="right" sx={{ color: "text.secondary" }}>
                    1h
                  </TableCell>
                  <TableCell align="right" sx={{ color: "text.secondary" }}>
                    24h
                  </TableCell>
                  <TableCell align="right" sx={{ color: "text.secondary" }}>
                    7D
                  </TableCell>
                  <TableCell align="right" sx={{ color: "text.secondary" }}>
                    24h Vol
                  </TableCell>
                  <TableCell align="right" sx={{ color: "text.secondary" }}>
                    Mrkt Cap
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody sx={{ backgroundColor: "primary.main" }}>
                {searchCoinHandler()
                  .slice((page - 1) * 10, (page - 1) * 10 + 50)
                  .map((coin) => {
                    return (
                      <TableRow
                        key={coin.id}
                        onClick={() => coinClickHandler(coin)}
                      >
                        <TableCell align="left">
                          <Checkbox
                            icon={<StarBorderIcon />}
                            checkedIcon={<StarIcon />}
                            sx={{
                              color: "text.terciary",
                              "&.Mui-checked": {
                                color: "text.terciary",
                              },
                            }}
                          />
                        </TableCell>
                        <TableCell align="left">
                          <Box display={"flex"}>
                            <Img src={coin.image} />
                            <Typography
                              display={"flex"}
                              flexDirection={"column"}
                            >
                              {coin.symbol}
                              <Typography component="span">
                                {coin.coinName}
                              </Typography>
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell align="right">
                          ${numberWithCommas(coin.price.toFixed(2))}
                        </TableCell>
                        <TableCell align="right">
                          {/* USD stable coin was an object type with 0 value */}
                          {typeof coin.price_percentage_1h == Object
                            ? 0
                            : coin.price_percentage_1h.toFixed(2)}
                          %
                        </TableCell>
                        <TableCell align="right">
                          {typeof coin.price_percentage_24h == Object
                            ? 0
                            : coin.price_percentage_24h.toFixed(2)}
                          %
                        </TableCell>
                        <TableCell align="right">
                          {typeof coin.price_percentage_7dh == Object
                            ? 0
                            : coin.price_percentage_7d.toFixed(2)}
                          %
                        </TableCell>
                        <TableCell align="right">
                          ${numberWithCommas(coin.totalVolume.toFixed(2))}
                        </TableCell>
                        <TableCell align="right">
                          ${numberWithCommas(coin.market_cap.toFixed(2))}
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <Box
            display={"flex"}
            justifyContent={"center"}
            bgcolor="primary.main"
            mt={"1rem"}
            component="span"
          >
            <Pagination
              count={Number((searchCoinHandler().length / 50).toFixed(0))}
              shape="rounded"
              onChange={(_, value) => {
                setPage(value);
                window.scroll(0, 650);
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
}
