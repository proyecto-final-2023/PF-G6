import React, { useMemo } from "react";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

import {
  DoughnutController,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler,
} from "chart.js";

Chart.register(
  DoughnutController,
  ArcElement,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler
);
const nombres = ["besuvio", "cortijo", "perenne"];

function GraficUTT(props: any) {
  const { labels, scores, label } = props;
  const data = useMemo(
    () => ({
      datasets: [
        {
          label: label,
          data: scores,
          backgroundColor: [
            "rgba(255, 99, 132, 0.6)",
            "rgba(54, 162, 235, 0.6)",
            "rgba(255, 206, 86, 0.6)",
            "rgba(75, 192, 192, 0.6)",
            "rgba(0, 0, 255, 0.6)",
            "rgba(127, 255, 0, 0.6)",
            "rgba(255, 0, 255, 0.6)",
            "rgba(0, 128, 128, 0.6)",
          ],
        },
      ],
      labels,
    }),
    [labels, scores, nombres]
  );

  return (
    <div className=""> 
        <Doughnut
        data={data}
        options={{ responsive: true }}
        
      />
    </div>
  );
}

export default GraficUTT;
