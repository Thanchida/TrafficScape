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
  getHumidityVsSpeed,
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
  const [humidityData, setHumidityData] = useState<any[]>([]);
  const [lightData, setLightData] = useState<any[]>([]);
  const [corrMatrix, setCorrMatrix] = useState<Record<string, Record<string, number>>>({});

  useEffect(() => {
    getPm25VsSpeed().then((res) => setPmData(res.data));
    getHumidityVsSpeed().then((res) => setHumidityData(res.data));
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

  // Bar: humidity vs speed
  const humidityGroups = humidityData.reduce((acc, d) => {
    const group = Math.round(d.humidity / 5) * 5;
    acc[group] = acc[group] || [];
    acc[group].push(d.current_speed);
    return acc;
  }, {} as Record<number, number[]>);

  const humidityLabels = Object.keys(humidityGroups).sort((a, b) => +a - +b);
  const humidityChartData = {
    labels: humidityLabels,
    datasets: [
      {
        label: "Average Speed by Humidity %",
        data: humidityLabels.map((label) => {
          const speeds = humidityGroups[+label];
          return speeds.reduce((a: any, b: any) => a + b, 0) / speeds.length;
        }),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
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
    <main className={`min-h-screen px-10 py-10 ${poppins.className}`}>
      <Navbar />
      <div className="space-y-14 mt-10">

        {/* Correlation Matrix */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Correlation Matrix</h2>
          <div className="overflow-x-auto">
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="border-3 border-white p-2 bg-gray-300">Var</th>
                  {variableList.map((v) => (
                    <th key={v} className="border-3 border-white p-2 bg-gray-200 text-sm">{v}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {correlationAsArray.map((row, i) => (
                  <tr key={i}>
                    <td className="border-3 border-white p-2 font-semibold bg-gray-200 text-sm">
                      {variableList[i]}
                    </td>
                    {row.map((val, j) => (
                      <td
                        key={j}
                        className="border-3 border-white p-2 text-sm text-center"
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
          <Scatter
            data={pmChartData}
            options={{
              scales: {
                x: { title: { display: true, text: "PM2.5 (μg/m³)" } },
                y: { title: { display: true, text: "Speed (km/h)" } },
              },
            }}
          />
        </section>

        {/* Humidity Histogram */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Humidity vs Avg Speed</h2>
          <Bar
            data={humidityChartData}
            options={{
              scales: {
                x: { title: { display: true, text: "Humidity (%)" } },
                y: { title: { display: true, text: "Avg Speed (km/h)" } },
              },
            }}
          />
        </section>

        {/* Light Scatter */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Light vs Speed</h2>
          <Scatter
            data={lightChartData}
            options={{
              scales: {
                x: { title: { display: true, text: "Light (lux)" } },
                y: { title: { display: true, text: "Speed (km/h)" } },
              },
            }}
          />
        </section>
      </div>
    </main>
  );
}
