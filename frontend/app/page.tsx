"use client";
import { useEffect, useState } from "react";
import { Poppins } from "next/font/google";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import { Scatter } from "react-chartjs-2";

// 🔧 Register Chart.js components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
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

  const pmChartData = {
    datasets: [
      {
        label: "PM2.5 vs Speed",
        data: pmData.map((d) => ({ x: d.pm2_5, y: d.current_speed })),
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const humidityChartData = {
    datasets: [
      {
        label: "Humidity vs Speed",
        data: humidityData.map((d) => ({ x: d.humidity, y: d.current_speed })),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const lightChartData = {
    datasets: [
      {
        label: "Light vs Speed",
        data: lightData.map((d) => ({ x: d.light, y: d.current_speed })),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
    ],
  };

  const variableList = Object.keys(corrMatrix);
  const correlationAsArray = variableList.map((row) =>
    variableList.map((col) => corrMatrix[row]?.[col] ?? 0)
  );

  return (
    <main className={`min-h-screen px-10 py-10 ${poppins.className}`}>
      <Navbar />
      <div className="space-y-14 mt-10">
        {/* PM2.5 */}
        <section>
          <h2 className="text-2xl font-bold mb-4">PM2.5 vs Speed</h2>
          <Scatter data={pmChartData} />
        </section>

        {/* Humidity */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Humidity vs Speed</h2>
          <Scatter data={humidityChartData} />
        </section>

        {/* Light */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Light vs Speed</h2>
          <Scatter data={lightChartData} />
        </section>

        {/* Correlation Matrix */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Correlation Matrix</h2>
          <div className="overflow-x-auto">
            <table className="table-auto border border-gray-300">
              <thead>
                <tr>
                  <th className="border p-2 bg-gray-100">Var</th>
                  {variableList.map((v) => (
                    <th key={v} className="border p-2 bg-gray-100 text-sm">
                      {v}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {correlationAsArray.map((row, i) => (
                  <tr key={i}>
                    <td className="border p-2 font-semibold bg-gray-50 text-sm">
                      {variableList[i]}
                    </td>
                    {row.map((val, j) => (
                      <td key={j} className="border p-2 text-sm text-center">
                        {val.toFixed(2)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}
