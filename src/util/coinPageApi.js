export const fetchCoinById = async (id) => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/${id}`
    );

    if (!response.ok) {
      throw new Error("Something went Wrong");
    }

    const coinData = await response.json();

    // const transformedCoin = coinData.map((coinData) => {
    //   return {
    //     id: coinData.id,
    //     symbol: coinData.symbol,
    //     coinName: coinData.name,
    //     image: coinData.image,
    //     price: coinData.current_price,
    //     totalVolume: coinData.total_volume,
    //     market_cap: coinData.market_cap,
    //     price_percentage_1h: coinData.price_change_percentage_1h_in_currency,
    //     price_percentage_24h: coinData.price_change_percentage_24h_in_currency,
    //     price_percentage_7d: coinData.price_change_percentage_7d_in_currency,
    //   };
    // });
    return coinData;
  } catch (err) {
    console.log(err);
  }
};

export const fetchCoinDataChart = async () => {
  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=365`
    );

    if (!response.ok) {
      throw new Error("Something went Wrong");
    }

    const coinData = await response.json();
    console.log(coinData);

    const coinDataChart = coinData.prices;

    return coinDataChart;
  } catch (err) {
    console.log(err);
  }
};
