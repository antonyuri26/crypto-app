import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { CurrencyContext } from "../store/theme-ctx";
import { lightTheme, darkTheme } from "../util/theme";
import ThemeContext from "../store/theme-ctx";
import Progress from "../components/Progress";

import styled from "styled-components";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import { Container, Grid, Box, Typography, TableRow } from "@mui/material";

import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

import CandleChart from "../components/CandleChart";

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

  const [isLoading, setIsLoading] = useState("false");
  const [chartLoading, setcartLoading] = useState("false");
  const [error, setError] = useState("");
  const [chart, setChart] = useState([]);
  const [coin, setCoin] = useState();

  const currencyCtx = useContext(CurrencyContext);
  const currencySelected = currencyCtx.currency;
  console.log(currencySelected);

  useEffect(() => {
    const fetchCoinDataChart = async () => {
      setcartLoading(true);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${params.id}/market_chart?vs_currency=${currencySelected}&days=365`
        );

        if (!response.ok) {
          throw new Error("Something went Wrong");
        }

        const coinData = await response.json();

        let data = [];
        let y = [];

        coinData.prices.forEach((element) => {
          data.push({
            x: new Date(element[0]).toLocaleDateString(),
            y: Number(element[1].toFixed(2)), //add , to number later
          });
        });

        const state = {
          options: {
            chart: {
              id: "basic-canddle",
            },
            dataLabels: {
              enabled: false,
            },
            title: {
              text: "Prices",
              align: "left",
            },
          },
          responsive: [
            {
              breakpoint: 1000,
              options: {
                chart: {
                  width: "700px",
                },
              },
            },
          ],
          series: [
            {
              data: data,
            },
          ],
        };

        setChart(state);
        setcartLoading(false);
      } catch (err) {
        console.log(err);
        setcartLoading(false);
      }
    };
    fetchCoinDataChart();
  }, [currencyCtx]);

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
        setError(err.message); //message here is the msg set when throw error.
        setIsLoading(false); //done loading with error
        console.log(error);
      }
    };
    fetchCoinById();
  }, []);

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
                  <Typography variant="h5">
                    $
                    {coin.market_data.current_price.usd
                      ? numberWithCommas(
                          coin.market_data.current_price.usd.toFixed(2)
                        )
                      : "N/A"}
                  </Typography>
                  <Box alignSelf={"center"}>
                    {coin.market_data.price_change_percentage_24h > 0 ? (
                      <ArrowDropUpIcon />
                    ) : (
                      <ArrowDropDownIcon sx={{ fontSize: "2rem" }} />
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

          <Grid item xs={12} md={9} lg={9}>
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
                      <TableCell>
                        $
                        {coin.market_data.market_cap.usd
                          ? numberWithCommas(
                              coin.market_data.market_cap.usd.toFixed(2)
                            )
                          : "N/A"}
                      </TableCell>
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
                      <TableCell>
                        $
                        {coin.market_data.total_volume.usd
                          ? numberWithCommas(
                              coin.market_data.total_volume.usd.toFixed(2)
                            )
                          : "N/A"}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} md={3} lg={3}>
            {/* Coin MrkData2 */}
            <Box backgroundColor="primary.main" width={"100%"}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell>Home Page</TableCell>
                    <TableCell>{coin.links.homepage[0] || "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Block Chain Site</TableCell>
                    <TableCell>
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
            {/* <Box backgroundColor="gray" width={"100%"} height="100px"></Box> */}
          </Grid>

          <Grid item xs={12} md={9} lg={9}>
            <Box backgroundColor="primary.main" width={"100%"} mt={"4rem"}>
              {chartLoading ? <Progress /> : <CandleChart data={chart} />}
            </Box>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
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
              <CssTextField
                id="outlined-basic"
                label="BTC"
                variant="outlined"
                sx={{
                  marginBottom: "1rem",
                  backgroundColor: "terciary.main",
                }}
              />
              <CssTextField
                id="outlined-basic"
                label="USD"
                variant="outlined"
                sx={{
                  backgroundColor: "white",
                }}
              />
            </Box>
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
