"use client";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import { Scatter, Bar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import trendline from "chartjs-plugin-trendline";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  trendline
);

import {
  getPm25VsSpeed,
  getPm25VsTravelTime,
  getLightVsSpeed,
  getCorrelationMatrix,
} from "./api/overview/route";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function Home() {
  const pathname = usePathname();

  const [pmData, setPmData] = useState<any[]>([]);
  const [pmTimeData, setPmTimeData] = useState<any[]>([]);
  const [lightData, setLightData] = useState<any[]>([]);
  const [corrMatrix, setCorrMatrix] = useState<Record<string, Record<string, number>>>({});

  useEffect(() => {
    getPm25VsSpeed().then((res) => setPmData(res.data));
    getPm25VsTravelTime().then((res) => setPmTimeData(res.data));
    getLightVsSpeed().then((res) => setLightData(res.data));
    getCorrelationMatrix().then((res) => setCorrMatrix(res.correlation));
  }, []);

   // Scatter: pm2.5 vs speed
  const pmChartData = {
    datasets: [
      {
        label: "PM2.5 vs Speed",
        data: pmData.map((d) => ({ x: d.pm2_5, y: d.current_speed })),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        trendlineLinear: {
          style: "rgba(255,105,180,0.8)",
          lineStyle: "solid",
          width: 2,
        },
      },
    ],
  };

  // Scatter: pm2.5 vs travel time
  const pmTimeChartData = {
    datasets: [
      {
        label: "PM2.5 vs Travel Time",
        data: pmTimeData.map((d) => ({ x: d.pm2_5, y: d.current_travel_time })),
        backgroundColor: "rgba(144, 238, 144, 0.6)",
        trendlineLinear: {
          style: "rgba(255,105,180,0.8)",
          lineStyle: "solid",
          width: 2,
        },
      },
    ],
  };

  // Scatter: light vs speed
  const lightChartData = {
    datasets: [
      {
        label: "Light vs Speed",
        data: lightData.map((d) => ({ x: d.light, y: d.current_speed })),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        trendlineLinear: {
          style: "rgba(255, 165, 0, 0.8)",
          lineStyle: "solid",
          width: 2,
        },
      },
    ],
  };

  // correlation heatmap
  console.log(corrMatrix);
  const variableList = Object.keys(corrMatrix);
  const correlationAsArray = variableList.map((row) =>
    variableList.map((col) => corrMatrix[row]?.[col] ?? 0)
  );

  const getColor = (val: number) => {
    if (val > 0.5) return "#BCEECA";
    if (val < -0.5) return "#F5C1AF";
    if (val > 0.2) return "#DBEDC7";
    if (val < -0.2) return "#F5DBC3";
    return "#F3F3D5";
  };

  return (
    <main className={`min-h-screen ${poppins.className}`}>
      <Navbar />
      <div className="space-y-20 mt-10 max-w-6xl mx-auto px-6 md:px-12 text-center">

        {/* Correlation Matrix */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Correlation Matrix</h2>
          <div className="overflow-x-auto">
            <table id="traffic-weather-correlation" className="table-auto mx-auto border-collapse">
              <thead>
                <tr>
                  <th className="border-2 border-white p-2 bg-gray-300">Var</th>
                  {variableList.map((v) => (
                    <th key={v} className="border-2 border-white p-2 bg-gray-200 text-sm">{v}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {correlationAsArray.map((row, i) => (
                  <tr key={i}>
                    <td className="border-2 border-white p-2 font-semibold bg-gray-200 text-sm">
                      {variableList[i]}
                    </td>
                    {row.map((val, j) => (
                      <td
                        key={j}
                        className="border-2 border-white p-2 text-sm text-center"
                        style={{ backgroundColor: getColor(val) }}
                      >
                        {val.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* PM2.5 Scatter */}
        <section>
          <h2 className="text-2xl font-bold mb-4">PM2.5 vs Speed</h2>
          <div className="w-full max-w-5xl mx-auto px-20">
            <Scatter
              id="pm-speed-chart"
              data={pmChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: { title: { display: true, text: "PM2.5 (μg/m³)" } },
                  y: { title: { display: true, text: "Speed (km/h)" } },
                },
              }}
              height={600}
            />
          </div>
          <p className="text-black text-base mt-4">
            From the PM2.5 vs Speed graph, we observe a negative correlation. When PM2.5 increases, speed tends to decrease.
          </p>
        </section>

        {/* PM2.5 Vs Travel Time Scatter */}
        <section>
          <h2 className="text-2xl font-bold mb-4">PM2.5 vs Travel Time</h2>
          <div className="w-full max-w-5xl mx-auto px-20">
            <Scatter
              id="pm-time-chart"
              data={pmTimeChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: { title: { display: true, text: "PM2.5 (μg/m³)" } },
                  y: { title: { display: true, text: "Travel Time (seconds)" } },
                },
              }}
              height={600}
            />
          </div>
          <p className="text-black text-base mt-4">
          From the PM2.5 vs Travel Time graph, we observe a positve correlation. When PM2.5 increases, Travel Time tends to increase too.
          </p>
        </section>

        {/* Light Scatter */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Light vs Speed</h2>
          <div className="w-full max-w-5xl mx-auto px-20">
            <Scatter
              id="light-speed-chart"
              data={lightChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: { title: { display: true, text: "Light (lux)" } },
                  y: { title: { display: true, text: "Speed (km/h)" } },
                },
              }}
              height={600}
            />
          </div>
          <p className="text-black text-base mt-4">
            The graph shows a weak negative correlation. Speed slightly decreases as light intensity increases.
          </p>
        </section>
      </div>
    </main>
  );
}
