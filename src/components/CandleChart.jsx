import React from "react";
import Chart from "react-apexcharts";

const CandleChart = (props) => {
  // const state = {
  //   options: {
  //     chart: {
  //       id: "basic-canddle",
  //     },
  //     dataLabels: {
  //       enabled: false,
  //     },
  //     title: {
  //       text: "Prices",
  //       align: "left",
  //     },
  //   },
  //   responsive: [
  //     {
  //       breakpoint: 1000,
  //       options: {
  //         chart: {
  //           width: "700px",
  //         },
  //       },
  //     },
  //   ],
  //   series: [
  //     {
  //       data: props.data,
  //     },
  //   ],
  // };

  console.log(props.data);
  return (
    <div className="app">
      <div className="row">
        <div className="mixed-chart">
          <Chart
            options={props.data.options}
            series={props.data.series}
            type="area"
            height={450}
            // className={classes.graphic}
          />
        </div>
      </div>
    </div>
  );
};

export default CandleChart;
