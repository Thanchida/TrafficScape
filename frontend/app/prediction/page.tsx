"use client";
import { Poppins } from "next/font/google";
import Navbar from "../components/Navbar";
import { useState } from "react";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

const WEATHER_URL = "/api/weather/"

export default function Page() {
    const [Light, setLight] = useState('');
    const [Temp, setTemp] = useState('');
    const [Humidity, setHumidity] = useState('');
    const [PM2_5, setPM2_5] = useState('');

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(Light, Temp, Humidity, PM2_5);

        try {
            const response = await fetch(WEATHER_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    light: Light ? Light: null,
                    temperature: Temp ? Temp: null,
                    humidity: Humidity ? Humidity: null,
                    pm2_5: PM2_5 ? PM2_5: null,
                })
            });
        }catch (error) {
            console.error('Error during request: ', error);
        }
    }
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
                            <div>
                                <label className="w-full">
                                    <input type="text" 
                                           placeholder="Light" 
                                           required className="w-full p-4 text-lg text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-[#FF6B6B]"
                                           onChange={(e) => setLight(e.target.value)}/>
                                </label>
                            </div>
                            {/* <button className="btn bg-[#FF6B6B] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#FF4757] transition-all join-item">Enter</button> */}
                        </div>
                        <div className="mt-8 space-x-2 gap-4 mb-6 p-2">
                            <div>
                                <label className="w-full">
                                    <input type="text" 
                                           placeholder="Temperature" 
                                           required className="w-full p-4 text-lg text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-[#FF6B6B]"
                                           onChange={(e) => setTemp(e.target.value)}/>
                                </label>
                            </div>
                            {/* <button className="btn bg-[#FF6B6B] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#FF4757] transition-all join-item">Enter</button> */}
                        </div>
                        <div className="mt-8 space-x-2 gap-4 mb-6 p-2">
                            <div>
                                <label className="w-full">
                                    <input type="text" 
                                           placeholder="Humidity" 
                                           required className="w-full p-4 text-lg text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-[#FF6B6B]"
                                           onChange={(e) => setHumidity(e.target.value)}/>
                                </label>
                            </div>
                            {/* <button className="btn bg-[#FF6B6B] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#FF4757] transition-all join-item">Enter</button> */}
                        </div>
                        <div className="mt-8 space-x-2 gap-4 mb-6 p-2">
                            <div>
                                <label className="w-full">
                                    <input type="text" 
                                           placeholder="pm2.5"
                                           required className="w-full p-4 text-lg text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-[#FF6B6B]"
                                           onChange={(e) => setPM2_5(e.target.value)}/>
                                </label>
                            </div>
                            {/* <button className="btn bg-[#FF6B6B] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#FF4757] transition-all join-item">Enter</button> */}
                        </div>
                        <button type="submit" 
                                className="btn bg-[#FF6B6B] w-full text-white px-20 py-2 rounded-lg shadow-md hover:bg-[#FF4757] transition-all mb-1">Enter</button>
                        </form>
                    </div>
                </div>
            </div>
            <div className="col-span-3 flex justify-center items-center">
                <h1>Traffic flow result</h1>
            </div>
        </div>
    </main>
  );
}
