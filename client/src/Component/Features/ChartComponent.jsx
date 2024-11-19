// frontend/src/components/ChartComponent.js

import React from "react";
import { Bar } from "react-chartjs-2";

const ChartComponent = ({ data }) => {
  const chartData = {
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: "Water Coverage (sq km)",
        data: data.map((d) => d.coverage),
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
      },
    ],
  };

  return <Bar data={chartData} />;
};

export default ChartComponent;
