"use client";
import { Poppins } from "next/font/google";
import { useState, useEffect } from "react";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const STATISTIC_URL = '/api/descriptive/';


interface descriptiveData {
  avg: number;
  stddev: number;
  min: number;
  max: number;
}

export default function Descriptive() {
  const [descriptiveLightData, setDescriptiveLightData] = useState<descriptiveData | null>(null);
  const [descriptiveTemperatureData, setDescriptiveTemperatureData] = useState<descriptiveData | null>(null);
  const [descriptiveHumidityData, setDescriptiveHumidityData] = useState<descriptiveData | null>(null);
  const [descriptivePMData, setDescriptivePMData] = useState<descriptiveData | null>(null);

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
            <div id="light-descriptive-card"
                 className="card bg-[#C3EAFD] shadow-xl mb-20 mt-7">
              <div className="card-body flex flex-col">
                <h2 className="text-xl font-bold">Light</h2>
                {descriptiveLightData ? (
                <div>
                  <p>Average Light: {descriptiveLightData.avg}</p>
                  <p>Standard Deviation Light: {descriptiveLightData.stddev}</p>
                  <p>Min Light: {descriptiveLightData.min}</p>
                  <p>Max Light: {descriptiveLightData.max}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
              </div>
            </div>

            <div id="temperature-descriptive-card"
                 className="card bg-[#EFFDFF] shadow-xl">
              <div className="card-body flex flex-col">
                <h2 className="text-xl font-bold">Temperature</h2>
                {descriptiveTemperatureData ? (
                <div>
                  <p>Average Temperature: {descriptiveTemperatureData.avg}</p>
                  <p>Standard Deviation Temperature: {descriptiveTemperatureData.stddev}</p>
                  <p>Min Temperature: {descriptiveTemperatureData.min}</p>
                  <p>Max Temperature: {descriptiveTemperatureData.max}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
              </div>
            </div>
          </div>

          <div>
            <div id="humidity-descriptive-card"
                 className="card bg-[#EFFDFF] shadow-xl mb-20 mt-7">
              <div className="card-body flex flex-col">
              <h2 className="text-xl font-bold">Humidity</h2>
              {descriptiveHumidityData ? (
                <div>
                  <p>Average Humidity: {descriptiveHumidityData.avg}</p>
                  <p>Standard Deviation Humidity: {descriptiveHumidityData.stddev}</p>
                  <p>Min Humidity: {descriptiveHumidityData.min}</p>
                  <p>Max Humidity: {descriptiveHumidityData.max}</p>
                </div>
              ) : (
                <p>Loading...</p>
              )}
              </div>
            </div>

            <div id="pm-descriptive-card"
                 className="card bg-[#C3EAFD] shadow-xl">
              <div className="card-body flex flex-col">
              <h2 className="text-xl font-bold">Pm 2.5</h2>
              {descriptivePMData ? (
                <div>
                  <p>Average PM2.5: {descriptivePMData.avg}</p>
                  <p>Standard Deviation PM2.5: {descriptivePMData.stddev}</p>
                  <p>Min PM2.5: {descriptivePMData.min}</p>
                  <p>Max PM2.5: {descriptivePMData.max}</p>
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
