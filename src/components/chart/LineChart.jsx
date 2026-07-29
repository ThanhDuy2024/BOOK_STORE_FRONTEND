import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const LineChart = () => {
  const data = {
    labels: [
      "10:00",
      "10:05",
      "10:10",
      "10:15",
      "10:20",
      "10:25",
      "10:30",
    ],

    datasets: [
      {
        label: "Voltage",

        data: [450, 455, 453, 460, 458, 465, 462],

        borderWidth: 3,

        // Đường cong
        tension: 0.4,

        // Điểm trên line
        pointRadius: 0,
        pointHoverRadius: 6,

        // Màu line
        borderColor: "#2563eb",

        // Màu khi hover
        pointHoverBackgroundColor: "#2563eb",
        pointHoverBorderColor: "#ffffff",
        pointHoverBorderWidth: 3,

        // Fill phía dưới line
        backgroundColor: "rgba(37, 99, 235, 0.12)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,

    maintainAspectRatio: false,

    interaction: {
      mode: "index",
      intersect: false,
    },

    plugins: {
      legend: {
        display: false,
      },

      tooltip: {
        backgroundColor: "#111827",

        titleColor: "#ffffff",
        bodyColor: "#ffffff",

        padding: 12,

        displayColors: false,

        callbacks: {
          label: function (context) {
            return `Voltage: ${context.parsed.y} V`;
          },
        },
      },
    },

    scales: {
      x: {
        grid: {
          display: false,
        },

        border: {
          display: false,
        },

        ticks: {
          color: "#6b7280",
        },
      },

      y: {
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },

        border: {
          display: false,
        },

        ticks: {
          color: "#6b7280",

          callback: function (value) {
            return `${value} V`;
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[350px]">
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;