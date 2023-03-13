import React, { useContext, useEffect, useState } from "react";
import { CurrencyContext } from "../store/theme-ctx";
import { useNavigate } from "react-router-dom";

import { Typography, Box } from "@mui/material";

import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import styled from "styled-components";
import Progress from "./Progress";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 3 },
  1324: { items: 4 },
  1824: { items: 5 },
};

const Div = styled.div`
  width: 250px;
  height: 250px;
  text-align: center;
  margin-top: 1rem;
`;

const Img = styled.img`
  width: 100px;
  height: 100px;
`;

//adjusting prices format
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Carousel = () => {
  const [isLoading, setIsLoading] = useState("false");
  const [error, setError] = useState("");
  const [coins, setCoins] = useState([]);
  const navigate = useNavigate();

  const currencyCtx = useContext(CurrencyContext);
  const currencySelected = currencyCtx.currency;

  useEffect(() => {
    const fetchTopHandler = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencySelected}&order=gecko_desc&per_page=5&page=1&sparkline=false&price_change_percentage=24h`
        );

        if (!response.ok) {
          throw new Error("Something went Wrong");
        }

        const coinData = await response.json();

        const trendingCoins = coinData.map((coinData) => {
          return {
            id: coinData.id,
            symbol: coinData.symbol.toUpperCase(),
            coinName: coinData.name,
            image: coinData.image,
            price: coinData.current_price,
            price_percentage_24h:
              coinData.price_change_percentage_24h_in_currency,
          };
        });

        const coinClickHandler = (id) => {
          navigate(`/coin/${id}`);
        };

        const transformedCoins = trendingCoins.map((coin) => {
          return (
            <Div
              className="Carousel_item-box"
              data-value="1"
              onClick={() => coinClickHandler(coin.id)}
            >
              <Box sx={{ cursor: "pointer" }}>
                <Img src={coin.image} />
                <Typography
                  variant="h5"
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  {coin.symbol}
                  <Typography
                    level="h5"
                    component="p"
                    color={coin.price_percentage_24h > 0 ? "green" : "red"}
                    display={"inline-block"}
                    ml={"0.3rem"}
                  >
                    {coin.price_percentage_24h.toFixed(2)}%
                  </Typography>
                </Typography>
                <Typography variant="h5">
                  ${numberWithCommas(coin.price.toFixed(2))}
                </Typography>
              </Box>
            </Div>
          );
        });

        setCoins(transformedCoins);
        setIsLoading(false);
      } catch (err) {
        setError(err.message); //message here is the msg set when throw error.
        setIsLoading(false); //done loading with error
        console.log(error);
      }
    };
    fetchTopHandler();
  }, [currencySelected]);

  return (
    <>
      {isLoading ? (
        <Progress />
      ) : (
        <AliceCarousel
          autoPlay
          autoPlayStrategy="none"
          autoPlayInterval={1000}
          animationDuration={1000}
          animationType="fadeout"
          infinite
          touchTracking={false}
          disableDotsControls
          disableButtonsControls
          items={coins}
          responsive={responsive}
          controlsStrategy="alternate"
        />
      )}
    </>
  );
};

export default Carousel;
