"use client";
import { Poppins } from "next/font/google";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const WEATHER_URL = "/api/prediction/"

export default function Page() {
    const [Light, setLight] = useState('');
    const [Temp, setTemp] = useState('');
    const [Humidity, setHumidity] = useState('');
    const [PM2_5, setPM2_5] = useState('');
    const [predictionData, setPredictionData] = useState([]);

    useEffect(() => {
        console.log('prediction result updated');
    }, [predictionData])

    function isValidNumber(value: string) {
        return value.trim() !== "" && !isNaN(Number(value));
    }
    

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
    
        if (
            !isValidNumber(Light) ||
            !isValidNumber(Temp) ||
            !isValidNumber(Humidity) ||
            !isValidNumber(PM2_5)
        ) {
            alert("⚠️ Please enter valid numeric values for all fields.");
            return;
        }        
    
        console.log(Light, Temp, Humidity, PM2_5);
    
        try {
            const response = await fetch(WEATHER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    light: Light,
                    temperature: Temp,
                    humidity: Humidity,
                    pm2_5: PM2_5
                })
            });
    
            const prediction_data = await response.json();
            console.log(prediction_data);
            setPredictionData(prediction_data.data);
        } catch (error) {
            console.error('Error during request: ', error);
        }
    }    

    const predictionArray = Object.entries(predictionData);
    const Colors = ['#FFF9B0', '#FFE7AF', '#FFED7D', '#FFD370'];

  return (
    <main className={`${poppins.className}`}>
        <Navbar/>
        <div className="grid grid-cols-5 py-10">
            <div className="col-span-2 px-10">
                <div className="card bg-base-100 shadow-xl w-full">
                    <div className="card-body flex flex-col w-full">
                        <h2 className="card-title">Enter Data for Traffic Forecasting</h2>
                        <form onSubmit={handleSubmit} className="space-y-10 w-full">
                        <div className="mt-8 space-x-2 gap-4 mb-6 p-2">
                            <div className="relative w-full">
                                <input
                                id="light-input"
                                type="text"
                                required
                                value={Light}
                                onChange={(e) => setLight(e.target.value)}
                                placeholder=" "
                                className="peer w-full p-4 pt-6 pb-2 text-lg text-gray-700 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                                />
                                <label
                                htmlFor="light-input"
                                className={`
                                    absolute left-4 text-gray-500 transition-all duration-200 ease-in-out
                                    ${Light ? 'top-2 text-sm' : 'top-4 text-lg'}
                                    peer-focus:top-2 peer-focus:text-sm
                                `}
                                >
                                Light
                                </label>
                            </div>
                        </div>
                        <div className="mt-8 space-x-2 gap-4 mb-6 p-2">
                            <div className="relative w-full">
                                <input
                                id="temperature-input"
                                type="text"
                                required
                                value={Temp}
                                onChange={(e) => setTemp(e.target.value)}
                                placeholder=" "
                                className="peer w-full p-4 pt-6 pb-2 text-lg text-gray-700 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                                />
                                <label
                                htmlFor="temperature-input"
                                className={`
                                    absolute left-4 text-gray-500 transition-all duration-200 ease-in-out
                                    ${Temp ? 'top-2 text-sm' : 'top-4 text-lg'}
                                    peer-focus:top-2 peer-focus:text-sm
                                `}
                                >
                                Temperature
                                </label>
                            </div>
                        </div>
                        <div className="mt-8 space-x-2 gap-4 mb-6 p-2">
                            <div className="relative w-full">
                                <input
                                id="humidity-input"
                                type="text"
                                required
                                value={Humidity}
                                onChange={(e) => setHumidity(e.target.value)}
                                placeholder=" "
                                className="peer w-full p-4 pt-6 pb-2 text-lg text-gray-700 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                                />
                                <label
                                htmlFor="humidity-input"
                                className={`
                                    absolute left-4 text-gray-500 transition-all duration-200 ease-in-out
                                    ${Humidity ? 'top-2 text-sm' : 'top-4 text-lg'}
                                    peer-focus:top-2 peer-focus:text-sm
                                `}
                                >
                                Humidity
                                </label>
                            </div>
                        </div>
                        <div className="mt-8 space-x-2 gap-4 mb-6 p-2">
                            <div className="relative w-full">
                                <input
                                id="pm-input"
                                type="text"
                                required
                                value={PM2_5}
                                onChange={(e) => setPM2_5(e.target.value)}
                                placeholder=" "
                                className="peer w-full p-4 pt-6 pb-2 text-lg text-gray-700 bg-white rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
                                />
                                <label
                                htmlFor="pm-input"
                                className={`
                                    absolute left-4 text-gray-500 transition-all duration-200 ease-in-out
                                    ${PM2_5 ? 'top-2 text-sm' : 'top-4 text-lg'}
                                    peer-focus:top-2 peer-focus:text-sm
                                `}
                                >
                                pm2.5
                                </label>
                            </div>
                        </div>
                        <button id="predict-button"
                                type="submit" 
                                className="btn bg-[#FF6B6B] w-full text-white px-20 py-2 rounded-lg shadow-md hover:bg-[#FF4757] transition-all mb-1">Predict</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-span-3 flex justify-center">
                {predictionData && predictionArray.length > 0 ? (
                    <div id="prediction-card"
                         className="card shadow-xl p-6 w-full max-w-4xl bg-white rounded-2xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4">
                            {predictionArray.map(([key, value], index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl shadow-md flex flex-col justify-center items-center p-6 mb-10 mt-15"
                                    style={{
                                        backgroundColor: Colors[index % Colors.length],
                                    }}
                                >
                                    <p className="text-md font-semibold text-gray-800">{key}</p>
                                    <p className="text-lg font-bold text-gray-900 mt-2">{value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <h1 className="text-lg text-gray-500 mt-10">Traffic flow result will appear here</h1>
                )}
            </div>
        </div>
    </main>
  );
}