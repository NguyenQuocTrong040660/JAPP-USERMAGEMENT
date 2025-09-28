// src/app/view/dashboard/ComparisonChart.jsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

// Đăng ký Chart.js cho Bar chart
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend, Title);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { position: "bottom" },
    title: { display: false, text: "This year transactions" },
    tooltip: {
      callbacks: {
        label: (ctx) => {
          const v = ctx.parsed.y;
          return `${ctx.dataset.label}: ${v}`;
        },
      },
    },
  },
  scales: {
    x: { grid: { display: false } },
    y: {
      beginAtZero: true,
      ticks: { precision: 0 }, // tránh số thập phân nếu không cần
    },
  },
};

const ComparisonChart = React.memo(function ComparisonChart({ data, loading }) {
  // Fallback data để tránh crash nếu props.data chưa sẵn sàng
  const safeData =
    data?.datasets?.length
      ? data
      : {
          labels: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec"],
          datasets: [
            { label: "Incoming", backgroundColor: "rgb(136,165,225)", data: [] },
            { label: "Outgoing", backgroundColor: "rgb(56,88,152)", data: [] },
          ],
        };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      {loading ? (
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%' }}>
          Loading…
        </div>
      ) : (
        <Bar data={safeData} options={options} />
      )}
    </div>
  );
});

export default ComparisonChart;
