import React, { useEffect, useState, useContext } from "react";
import { CurrencyContext } from "../store/theme-ctx";

import Header from "../components/Header";
import MainContent from "../components/MainContent";
import News from "../components/news";
import Trending from "../components/Trending";

const HomePage = () => {
  const [isLoading, setIsLoading] = useState("false");
  const [error, setError] = useState("");
  const [coins, setCoins] = useState([]);

  const currencyCtx = useContext(CurrencyContext);
  const currencySelected = currencyCtx.currency;

  useEffect(() => {
    const fetchCoinHandler = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currencySelected}&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=1h%2C7d%2C24h`
        );

        if (!response.ok) {
          throw new Error("Something went Wrong");
        }

        const coinData = await response.json();

        const transformedCoins = coinData.map((coinData) => {
          return {
            id: coinData.id,
            symbol: coinData.symbol.toUpperCase(),
            coinName: coinData.name,
            image: coinData.image,
            price: coinData.current_price,
            totalVolume: coinData.total_volume,
            market_cap: coinData.market_cap,
            price_percentage_1h:
              coinData.price_change_percentage_1h_in_currency,
            price_percentage_24h:
              coinData.price_change_percentage_24h_in_currency,
            price_percentage_7d:
              coinData.price_change_percentage_7d_in_currency,
          };
        });

        setCoins(transformedCoins);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    };
    fetchCoinHandler();
  }, [currencySelected]);

  return (
    <>
      <Header coins={coins} />
      <MainContent coins={coins} isLoading={isLoading} />
      <Trending />
      <News />
    </>
  );
};

export default HomePage;
