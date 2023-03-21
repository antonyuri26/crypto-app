import * as React from "react";
import { useState, useEffect } from "react";

import styled from "styled-components";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

const Img = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 1rem;
`;

export default function Trending() {
  const [isLoading, setIsLoading] = useState("false");
  const [error, setError] = useState("");
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrendingCoins = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/search/trending",
          {
            method: "GET",
            mode: "cors",
            headers: {
              "User-Agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Something went Wrong");
        }

        const trendingData = await response.json();

        const trendingCOins = trendingData.coins.map((coin) => {
          return {
            id: coin.item.id,
            symbol: coin.item.symbol,
            title: coin.item.name,
            mrkCap: coin.item.market_cap_rank,
            image: coin.item.thumb,
            price_btc: coin.item.price_btc,
          };
        });

        setTrending(trendingCOins);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchTrendingCoins();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        paddingTop: "5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography variant="h4" mb="2rem" sx={{ color: "text.terciary" }}>
        Top Searched Cryptos
      </Typography>
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "primary.main", mb: "3rem" }}
      >
        <Grid container spacing={4}>
          {trending.map((trend) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={trend.title}>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Box display={"flex"} justifyContent={"space-between"}>
                    <Img src={trend.image} />
                    <Box
                      display={"flex"}
                      flex={"1"}
                      justifyContent={"space-between"}
                    >
                      <Typography
                        sx={{ fontSize: 14 }}
                        color="text.secondary"
                        gutterBottom
                      >
                        {trend.title}
                      </Typography>
                      <Typography variant="h6" component="div">
                        ${trend.price_btc ? trend.price_btc.toFixed(7) : "N/A"}
                      </Typography>
                    </Box>
                    <Box alignContent={"end"}>
                      <Typography variant="caption" ml={"1rem"}>
                        {trend.mrkCap}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
                <CardActions>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
