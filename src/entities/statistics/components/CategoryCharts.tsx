import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
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

export function CategoryCharts({ data }: CategoryChartsProps) {
  const total = data.data.reduce((sum, val) => sum + val, 0);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        // data: data.data,  // 기본 숫자대로 막대바 올림
        data: data.data.map((val) =>
          parseFloat(((val / total) * 100).toFixed(1)),
        ), // % 단위로 막대바 올림
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
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const percent = context.parsed.y; // % 로 변환된 값
            const value = data.data[context.dataIndex]; // 실제 횟수
            return `[${total}/${value}] (${percent}%)`; // [카테고리 전체/해당 태그](%정도) 커서 출력
          },
        },
      },
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
        ticks: {
          stepSize: 20, // y축 단위 0%, 20%, 40%, ... 20씩
          color: "#ffecef",
          callback: (value: number | string) => `${value}%`,
        },
      },
      x: {
        grid: { display: false },
        ticks: { color: "#ffecef" },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
}
