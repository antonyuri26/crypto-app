import React from "react";
import Chart from "react-apexcharts";
import { useState, useEffect, useContext } from "react";
import Progress from "./Progress";
import { darkTheme } from "../util/theme";
import ThemeContext from "../store/theme-ctx";

const CandleChart = (props) => {
  const ctx = useContext(ThemeContext);
  const [chart, setChart] = useState([]);
  const [chartLoading, setcartLoading] = useState("false");

  useEffect(() => {
    const fetchCoinDataChart = async () => {
      setcartLoading(true);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/${props.coin}/market_chart?vs_currency=${props.currency}&days=366`
        );

        if (!response.ok) {
          throw new Error("Something went Wrong");
        }

        const coinData = await response.json();

        let data = [];
        let y = [];

        coinData.prices.forEach((element) => {
          data.push({
            x: new Date(element[0]).toLocaleString(),
            y: Number(element[1].toFixed(2)), //add , to number later
          });
        });

        setChart(data);

        // setChart(state);
        setcartLoading(false);
      } catch (err) {
        console.log(err);
        setcartLoading(false);
      }
    };
    fetchCoinDataChart();
  }, [props.currency]);

  const state = {
    options: {
      chart: {
        id: "basic-canddle",
        foreColor: ctx.theme === darkTheme ? "white" : "black",
      },
      dataLabels: {
        enabled: false,
      },
      title: {
        text: "Prices",
        align: "left",
      },
      markers: {
        colors: ["#F44336", "#E91E63", "#9C27B0"],
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
        data: chart,
      },
    ],
  };

  // console.log(chart);
  return (
    <>
      {chartLoading ? (
        <Progress />
      ) : (
        <div className="app">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={state.options}
                series={state.series}
                type="area"
                height={650}
                // className={classes.graphic}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CandleChart;
