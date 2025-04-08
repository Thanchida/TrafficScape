'use client';
import React, { useEffect, useState } from 'react';
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DISTRIBUTION_URL = '/api/distribution/';

export const Distribution = () => {
  const [lightData, setLightData] = useState<number[]>([]);
  const [temperatureData, setTemperatureData] = useState<number[]>([]);
  const [humidityData, setHumidityData] = useState<number[]>([]);
  const [pmData, setPmData] = useState<number[]>([]);

  useEffect(() => {
    fetchDistributionData();
  }, []);

  const fetchDistributionData = async () => {
    try {
      const res = await fetch(DISTRIBUTION_URL, { method: 'GET' });

      if (res.ok) {
        const data = await res.json();
        setLightData(data.data.map((entry: any) => entry.light));
        setTemperatureData(data.data.map((entry: any) => entry.temperature));
        setHumidityData(data.data.map((entry: any) => entry.humidity));
        setPmData(data.data.map((entry: any) => entry.pm2_5));
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching distribution data', error);
    }
  };

  const createHistogramData = (inputData: number[], binSize: number = 100) => {
    const bins: { [key: string]: number } = {};
  
    inputData.forEach((value) => {
      const bin = Math.floor(value / binSize) * binSize;
      bins[bin] = (bins[bin] || 0) + 1;
    });
  
    const sortedBins = Object.keys(bins).sort((a, b) => parseInt(a) - parseInt(b));
    const labels = sortedBins.map((bin) => {
      const start = parseInt(bin);
      const end = start + binSize - 1;
      return `${start} - ${end}`;
    });
  
    const data = sortedBins.map((bin) => bins[bin]);
  
    return { labels, data };
  };
  

  const lightHistogram = createHistogramData(lightData);
  const tempHistogram = createHistogramData(temperatureData, 3);
  const humidityHistogram = createHistogramData(humidityData, 3);
  const pmHistogram = createHistogramData(pmData, 3);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Sensor Data Distribution</h1>

      <section>
        <h2 className="text-2xl font-bold mb-4">Light Distribution</h2>
        <Bar
          data={{
            labels: lightHistogram.labels,
            datasets: [
              {
                label: "Light (lux)",
                data: lightHistogram.data,
                backgroundColor: 'rgba(255, 206, 86, 0.5)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              x: { title: { display: true, text: "Light (lux)" } },
              y: { title: { display: true, text: "Frequency" } },
            },
          }}
        />
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Temperature Distribution</h2>
        <Bar
          data={{
            labels: tempHistogram.labels,
            datasets: [
              {
                label: "Temperature (°C)",
                data: tempHistogram.data,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              x: { title: { display: true, text: "Temperature (°C)" } },
              y: { title: { display: true, text: "Frequency" } },
            },
          }}
        />
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Humidity Distribution</h2>
        <Bar
          data={{
            labels: tempHistogram.labels,
            datasets: [
              {
                label: "Humidity (%)",
                data: humidityHistogram.data,
                backgroundColor: 'rgba(135, 206, 250, 0.5)',
                borderColor: 'rgba(135, 206, 250, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              x: { title: { display: true, text: "Humidity (%)" } },
              y: { title: { display: true, text: "Frequency" } },
            },
          }}
        />
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Pm2.5 Distribution</h2>
        <Bar
          data={{
            labels: tempHistogram.labels,
            datasets: [
              {
                label: "Pm2.5 (μg/m³)",
                data: pmHistogram.data,
                backgroundColor: 'rgba(144, 238, 144, 0.5)',
                borderColor: 'rgba(144, 238, 144, 1)',
                borderWidth: 1,
              },
            ],
          }}
          options={{
            scales: {
              x: { title: { display: true, text: "Pm2.5 (μg/m³)" } },
              y: { title: { display: true, text: "Frequency" } },
            },
          }}
        />
      </section>
    </div>
  );
};
