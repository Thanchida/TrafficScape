"use client";
import { Poppins } from "next/font/google";
import Navbar from "../components/Navbar";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function Page() {
  return (
    <main className={`${poppins.className}`}>
        <Navbar/>
        <div className="grid grid-cols-5 py-15">
            <div className="col-span-2 px-10">
                <div className="card bg-base-100 w-96 shadow-xl w-full">
                    <div className="card-body flex items-center">
                        <h2 className="card-title">Enter Data for Traffic Forecasting</h2>
                        <div className="join mt-8 space-x-2 flex items-center gap-4 mb-6">
                            <div>
                                <label className="w-full">
                                    <input type="number" 
                                           placeholder="Light" 
                                           required className="w-full p-4 text-lg text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-[#FF6B6B]"/>
                                </label>
                            </div>
                            <button className="btn bg-[#FF6B6B] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#FF4757] transition-all join-item">Enter</button>
                        </div>
                        <div className="join mt-8 space-x-2 flex items-center gap-4 mb-6">
                            <div>
                                <label className="w-full">
                                    <input type="number" 
                                           placeholder="Temperature" 
                                           required className="w-full p-4 text-lg text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-[#FF6B6B]"/>
                                </label>
                            </div>
                            <button className="btn bg-[#FF6B6B] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#FF4757] transition-all join-item">Enter</button>
                        </div>
                        <div className="join mt-8 space-x-2 flex items-center gap-4 mb-6">
                            <div>
                                <label className="w-full">
                                    <input type="number" 
                                           placeholder="Humidity" 
                                           required className="w-full p-4 text-lg text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-[#FF6B6B]"/>
                                </label>
                            </div>
                            <button className="btn bg-[#FF6B6B] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#FF4757] transition-all join-item">Enter</button>
                        </div>
                        <div className="join mt-8 space-x-2 flex items-center gap-4 mb-6">
                            <div>
                                <label className="w-full">
                                    <input type="number" 
                                           placeholder="pm2.5"
                                           required className="w-full p-4 text-lg text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-[#FF6B6B]"/>
                                </label>
                            </div>
                            <button className="btn bg-[#FF6B6B] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#FF4757] transition-all join-item">Enter</button>
                        </div>
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
