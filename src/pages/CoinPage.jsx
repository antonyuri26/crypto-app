import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CurrencyContext } from "../store/theme-ctx";
import Progress from "../components/Progress";
import Converter from "../components/Converter";
import CoinChart from "../components/CoinChart";

import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import { Container, Grid, Box, Typography, TableRow } from "@mui/material";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

//adjusting prices format
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
`;

const CoinPage = () => {
  const params = useParams();
  const [isLoading, setIsLoading] = useState("false");
  const [error, setError] = useState("");
  const [coin, setCoin] = useState();

  const currencyCtx = useContext(CurrencyContext);
  const currencySelected = currencyCtx.currency;

  useEffect(() => {
    const fetchCoinById = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${params.id}`
        );

        if (!response.ok) {
          throw new Error("Something went Wrong");
        }

        const coinData = await response.json();

        setCoin(coinData);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchCoinById();
  }, []);

  console.log(isLoading);

  if (!coin) return <Progress />;

  return (
    <Box width={"100%"} sx={{ backgroundColor: "primary.main" }}>
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "primary.main", pb: "3rem" }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={12} lg={12}>
            <Grid item xs={12} md={12} lg={12}>
              {/* Header */}

              <Box
                backgroundColor="primary.main"
                width={"100%"}
                padding={"1rem"}
              >
                <Box display={"flex"} flexDirection={"row"}>
                  <Img src={coin.image.large} />
                  <Typography
                    alignSelf={"center"}
                    paddingRight={"1rem"}
                    variant="h4"
                  >
                    {coin.name}
                    <Typography component="span" marginLeft={"0.8em"}>
                      {coin.symbol.toUpperCase()}
                    </Typography>
                  </Typography>
                </Box>
                <Box display={"flex"} flexDirection={"row"}>
                  {currencySelected === "USD" ? (
                    <Typography variant="h5">
                      $
                      {coin.market_data.current_price.usd
                        ? numberWithCommas(
                            coin.market_data.current_price.usd.toFixed(2)
                          )
                        : "N/A"}
                    </Typography>
                  ) : (
                    <Typography variant="h5">
                      $
                      {coin.market_data.current_price.usd
                        ? numberWithCommas(
                            coin.market_data.current_price.aud.toFixed(2)
                          )
                        : "N/A"}
                    </Typography>
                  )}
                  <Box alignSelf={"center"}>
                    {coin.market_data.price_change_percentage_24h > 0 ? (
                      <ArrowDropUpIcon
                        color={"success"}
                        sx={{ fontSize: "2rem" }}
                      />
                    ) : (
                      <ArrowDropDownIcon
                        color={"warning"}
                        sx={{ fontSize: "2rem" }}
                      />
                    )}
                  </Box>
                  <Typography component="span" alignSelf={"center"}>
                    {coin.market_data.price_change_percentage_24h.toFixed(2) ||
                      "N/A"}
                    %
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Grid item xs={12} md={9} lg={9} borderBottom="1px solid gray">
            <Box
              backgroundColor="primary.main"
              width={"100%"}
              // height="200px"
              display={"flex"}
            >
              <Grid item xs={12} md={6} lg={6}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Market Cap</TableCell>
                      {currencySelected === "USD" ? (
                        <TableCell>
                          $
                          {coin.market_data.market_cap.usd
                            ? numberWithCommas(
                                coin.market_data.market_cap.usd.toFixed(2)
                              )
                            : "N/A"}
                        </TableCell>
                      ) : (
                        <TableCell>
                          $
                          {coin.market_data.market_cap.usd
                            ? numberWithCommas(
                                coin.market_data.market_cap.aud.toFixed(2)
                              )
                            : "N/A"}
                        </TableCell>
                      )}
                    </TableRow>
                    <TableRow>
                      <TableCell>Circulating Supply</TableCell>
                      <TableCell>
                        $
                        {coin.market_data.circulating_supply
                          ? numberWithCommas(
                              coin.market_data.circulating_supply.toFixed(2)
                            )
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Supply</TableCell>
                      <TableCell>
                        $
                        {coin.market_data.total_supply
                          ? numberWithCommas(
                              coin.market_data.total_supply.toFixed(2)
                            )
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>Max Supply</TableCell>
                      <TableCell>
                        $
                        {coin.market_data.max_supply
                          ? numberWithCommas(coin.market_data.max_supply)
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Total Volume</TableCell>
                      {currencySelected === "USD" ? (
                        <TableCell>
                          $
                          {coin.market_data.total_volume.usd
                            ? numberWithCommas(
                                coin.market_data.total_volume.usd.toFixed(2)
                              )
                            : "N/A"}
                        </TableCell>
                      ) : (
                        <TableCell>
                          $
                          {coin.market_data.total_volume.usd
                            ? numberWithCommas(
                                coin.market_data.total_volume.aud.toFixed(2)
                              )
                            : "N/A"}
                        </TableCell>
                      )}
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={3} lg={3}>
            {/* Coin MrkData2 */}
            <Box backgroundColor="primary.main" sx={{ overflow: "hidden" }}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Home Page</TableCell>
                    <TableCell>{coin.links.homepage[0] || "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Block Chain Site</TableCell>
                    <TableCell
                      style={{
                        whiteSpace: "normal",
                        wordBreak: "break-word",
                      }}
                    >
                      {coin.links.blockchain_site[0] || "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Official Forum</TableCell>
                    <TableCell>
                      {coin.links.official_forum_url[0] || "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell>
                      {coin.categories[0]} - {coin.categories[1]}{" "}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Grid>

          <Grid item xs={12} md={9} lg={9}>
            <Box backgroundColor="primary.main" width={"100%"} mt={"4rem"}>
              <CoinChart currency={currencySelected} coin={params.id} />
            </Box>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <Converter
              symbol={coin.symbol.toUpperCase()}
              currency={currencySelected}
              currentPriceUsd={coin.market_data.current_price.usd}
              currentPriceAud={coin.market_data.current_price.aud}
            />
          </Grid>

          <Grid item xs={12} md={12} lg={12}>
            <Box
              backgroundColor="primary.main"
              width={"100%"}
              padding={"1rem"}
              borderTop="1px solid gray"
              marginTop={"2rem"}
            >
              <Typography variant="h4" mt={"1rem"}>
                {coin.name}
              </Typography>
              <Typography variant="h5" marginY={"1rem"}>
                Description
              </Typography>
              <Typography variant="body1">{coin.description.en}</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default CoinPage;
