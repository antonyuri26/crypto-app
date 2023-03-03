import * as React from "react";
import { useContext, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Pagination, Typography } from "@mui/material";
import ThemeContext from "../store/theme-ctx";
import styled from "styled-components";

//adjusting prices format
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function CoinsTable(props) {
  //   const [search, setSearch] = useState();
  const ctx = useContext(ThemeContext);

  const Img = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 1rem;
  `;

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

  return (
    <Box
      bgcolor="primary.main"
      //   bgcolor={ctx.theme === darkTheme ? "black" : "white"}
      sx={{ width: "100%" }}
      display="flex"
      justifyContent={"center"}
    >
      <TableContainer component={Paper} sx={{ width: "80%" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "secondary.main" }}>
            <TableRow>
              <TableCell sx={{ color: "text.secondary" }}>#</TableCell>
              <TableCell
                sx={{ color: "text.secondary", pr: "12rem" }}
                align="left"
                // mr="35rem"
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
            {/* {props.coins.map((coin) => { */}
            {searchCoinHandler().map((coin) => {
              return (
                <TableRow key={coin.id}>
                  <TableCell>#</TableCell>
                  <TableCell>
                    <Box display={"flex"}>
                      <Img src={coin.image} />
                      <Typography>
                        {coin.symbol}
                        <Typography>{coin.coinName}</Typography>
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
        <Box
          display={"flex"}
          justifyContent={"center"}
          bgcolor="primary.main"
          pt={"1rem"}
        >
          <Pagination count={10} shape="rounded" />
        </Box>
      </TableContainer>
    </Box>
  );
}
// id: coinData.id,
//             symbol: coinData.symbol,
//             coinName: coinData.name,
//             image: coinData.image,
//             price: coinData.current_price,
//             market_cap: coinData.market_cap,
//             price_percentage_24h: coinData.price_change_percentage_24h,
