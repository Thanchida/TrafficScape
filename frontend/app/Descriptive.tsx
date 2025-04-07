"use client";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const STATISTIC_URL = '/api/descriptive/';

interface DescriptiveLight {
  avg_light: number;
  stddev_light: number;
  min_light: number;
  max_light: number;
}

interface descriptiveTemperature {
  avg_temperature: number;
  stddev_temperature: number;
  min_temperature: number;
  max_temperature: number;
}

interface descriptiveHumidity{
  avg_humidity: number;
  stddev_humidity: number;
  min_humidity: number;
  max_humidity: number;
}

interface descriptivePM{
  avg_pm2_5: number;
  stddev_pm2_5: number;
  min_pm2_5: number;
  max_pm2_5: number;
}
export default function Descriptive() {
  const [descriptiveTrafficData, setDescriptiveTrafficData] = useState([]);
  const [descriptiveLightData, setDescriptiveLightData] = useState<DescriptiveLight | null>(null);
  const [descriptiveTemperatureData, setDescriptiveTemperatureData] = useState<descriptiveTemperature | null>(null);
  const [descriptiveHumidityData, setDescriptiveHumidityData] = useState<descriptiveHumidity | null>(null);
  const [descriptivePMData, setDescriptivePMData] = useState<descriptivePM | null>(null);

  useEffect(() => {
    console.log('fetch');
    fetchDescriptiveData();
  }, []);

  useEffect(() => {
    console.log('traffic descriptive data updated!');
  }, [descriptiveLightData])

  useEffect(() => {
    console.log('weather descriptive data updated!');
  }, [descriptiveLightData, descriptiveTemperatureData, descriptiveHumidityData, descriptivePMData])

  const fetchDescriptiveData = async () => {
    const res = await fetch(STATISTIC_URL, {
      method: 'GET'
    });

    if (!res.ok) {
      console.log("Failed to fetch traffic descriptive data")
      return
    }

    const data = await res.json();
    setDescriptiveLightData(data.data.light);
    setDescriptiveTemperatureData(data.data.temperature);
    setDescriptiveHumidityData(data.data.humidity);
    setDescriptivePMData(data.data.pm2_5)
  }
  return (
    <div className={`${poppins.className}`}>
        <h1 className="text-3xl font-bold mb-6">Sensor Data Descriptive</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
          <div>
            <div className="card bg-[#C3EAFD] shadow-xl mb-20 mt-7">
              <div className="card-body flex flex-col">
                <h2 className="text-xl font-bold">Light</h2>
                {descriptiveLightData ? (
                <div>
                  <p>Average Light: {descriptiveLightData.avg_light}</p>
                  <p>Standard Deviation Light: {descriptiveLightData.stddev_light}</p>
                  <p>Min Light: {descriptiveLightData.min_light}</p>
                  <p>Max Light: {descriptiveLightData.max_light}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
              </div>
            </div>

            <div className="card bg-[#EFFDFF] shadow-xl">
              <div className="card-body flex flex-col">
                <h2 className="text-xl font-bold">Temperature</h2>
                {descriptiveTemperatureData ? (
                <div>
                  <p>Average Temperature: {descriptiveTemperatureData.avg_temperature}</p>
                  <p>Standard Deviation Temperature: {descriptiveTemperatureData.stddev_temperature}</p>
                  <p>Min Temperature: {descriptiveTemperatureData.min_temperature}</p>
                  <p>Max Temperature: {descriptiveTemperatureData.max_temperature}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
              </div>
            </div>
          </div>

          <div>
            <div className="card bg-[#EFFDFF] shadow-xl mb-20 mt-7">
              <div className="card-body flex flex-col">
              <h2 className="text-xl font-bold">Humidity</h2>
              {descriptiveHumidityData ? (
                <div>
                  <p>Average Humidity: {descriptiveHumidityData.avg_humidity}</p>
                  <p>Standard Deviation Humidity: {descriptiveHumidityData.stddev_humidity}</p>
                  <p>Min Humidity: {descriptiveHumidityData.min_humidity}</p>
                  <p>Max Humidity: {descriptiveHumidityData.max_humidity}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
              </div>
            </div>

            <div className="card bg-[#C3EAFD] shadow-xl">
              <div className="card-body flex flex-col">
              <h2 className="text-xl font-bold">Pm 2.5</h2>
              {descriptivePMData ? (
                <div>
                  <p>Average PM2.5: {descriptivePMData.avg_pm2_5}</p>
                  <p>Standard Deviation PM2.5: {descriptivePMData.stddev_pm2_5}</p>
                  <p>Min PM2.5: {descriptivePMData.min_pm2_5}</p>
                  <p>Max PM2.5: {descriptivePMData.max_pm2_5}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
}
