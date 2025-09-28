// src/app/view/dashboard/DoughnutChart.jsx
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Đăng ký 1 lần (ok để đặt ngay trong file component)
ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = React.memo(function DoughnutChart({ data, loading }) {
  // fallback khi data rỗng hoặc cấu trúc chưa sẵn sàng
  const safeData =
    data?.datasets?.length
      ? data
      : {
          labels: ["Incoming", "Outgoing"],
          datasets: [
            {
              label: "Percent of transaction",
              data: [0, 0],
              backgroundColor: ["rgb(136,165,225)", "rgb(56,88,152)"],
              borderWidth: 1,
            },
          ],
        };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%", // donut dày mỏng
    plugins: {
      legend: { position: "bottom" },
      tooltip: {
        callbacks: {
          label: (ctx) => {
            const value = ctx.parsed;
            return `${ctx.label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {loading ? (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
          Loading…
        </div>
      ) : (
        <Doughnut data={safeData} options={options} />
      )}
    </div>
  );
});

export default DoughnutChart;
