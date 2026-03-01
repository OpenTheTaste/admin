import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { CategoryStatistic } from "@shared/mocks/mockAdminCategoryStatistics";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface CategoryChartsProps {
  data: CategoryStatistic;
}

export default function CategoryCharts({ data }: CategoryChartsProps) {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        data: data.data,
        backgroundColor: "#ffd1d7",
        borderRadius: 4,
        barThickness: 50,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: { color: "#eff0f5" },
        border: {
          display: true,
          color: "#ffecef",
          width: 1,
        },
        ticks: { color: "#ffecef" },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#ffecef" },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
