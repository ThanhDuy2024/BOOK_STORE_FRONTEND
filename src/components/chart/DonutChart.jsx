import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const DonutChart = () => {
  const data = {
    labels: [
      "Normal",
      "Warning",
      "Fault",
      "Offline",
    ],

    datasets: [
      {
        data: [8, 3, 1, 0],

        backgroundColor: [
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#9ca3af",
        ],

        borderWidth: 0,

        // khoảng cách giữa các phần
        spacing: 4,

        // bo góc
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    cutout: "70%",

    plugins: {
      legend: {
        position: "bottom",

        labels: {
          usePointStyle: true,
          padding: 20,
        },
      },

      tooltip: {
        padding: 12,
      },
    },
  };

  return (
    <div className="w-full h-[350px]">
      <Doughnut
        data={data}
        options={options}
      />
    </div>
  );
};

export default DonutChart;