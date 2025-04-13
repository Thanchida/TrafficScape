'use client';
import React, { useEffect, useState } from 'react';

const CORRELATION_URL = '/api/correlation/';

export const Correlation = () => {
  const [corrValue, setCorrValue] = useState<Record<string, Record<string, number>>>({});

  useEffect(() => {
    fetchCorrelationData();
  }, []);

  useEffect(() => {
    console.log(corrValue);
  }, [corrValue])

  const fetchCorrelationData = async () => {
    try {
      const res = await fetch(CORRELATION_URL, { method: 'GET' });

      if (res.ok) {
        const data = await res.json();
        setCorrValue(data.data || {});
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error fetching distribution data', error);
    }
  };

  const variableList = Object.keys(corrValue);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Sensor Data Correlation</h1>

      <section className='w-full'>
          <div className="overflow-x-auto w-full">
            <table id='weather-correlation'
                   className="table-auto w-full mt-10 min-h-[400px]">
              <thead>
                <tr>
                  <th className="border-3 border-white p-2 bg-[#FFD370] text-white">Correlation</th>
                  {variableList.map((v) => (
                    <th key={v} className="border-3 border-white p-2 bg-[#FFE7AF] text-sm">{v}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {variableList.map((rowKey, i) => (
                    <tr key={i}>
                    <td className="border-3 border-white p-2 font-semibold bg-[#FFE7AF] text-sm">
                        {rowKey}
                    </td>
                    {variableList.map((colKey, j) => (
                        <td
                        key={j}
                        className="border-3 border-white p-2 text-sm text-center"
                        >
                        {corrValue[rowKey]?.[colKey]?.toFixed(2)}
                        </td>
                    ))}
                    </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
    </div>
  );
};
