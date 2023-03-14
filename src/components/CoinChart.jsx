import React, { useState, useEffect, useContext } from "react";
import { darkTheme } from "../util/theme";
import ThemeContext from "../store/theme-ctx";

import Chart from "react-apexcharts";

import Progress from "./Progress";

//adjusting prices format
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

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

        coinData.prices.forEach((element) => {
          data.push({
            x: new Date(element[0]).toLocaleString(),
            y: Number(element[1].toFixed(2)),
          });
        });

        setChart(data);

        setcartLoading(false);
      } catch (err) {
        console.log(err);
        setcartLoading(false);
      }
    };
    fetchCoinDataChart();
  }, [props.currency, props.coin]);

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
      yaxis: {
        labels: {
          formatter: function (val, index) {
            return `$${numberWithCommas(val.toFixed(2))}`;
          },
        },
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
        name: "Price",
        data: chart,
      },
    ],
  };

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
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CandleChart;
