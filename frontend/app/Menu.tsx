"use client"
import React, { useState } from 'react'

const TRAFFIC_URL = "/api/traffic/"

export const Menu = () => {
    const [Latitude, setLatitude] = useState('');
    const [Longitude, setLongitude] = useState('');
    const [trafficFlowData, setTrafficFlowData] = useState<any>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        
        try {
            const response = await fetch(TRAFFIC_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    latitude: Latitude,
                    longitude: Longitude
                })
            });

            const data = await response.json();

            if (data && data.data) {
                const parsedData = JSON.parse(data.data);

                if (parsedData.flowSegmentData) {
                    const trafficData = {
                        frc: parsedData.flowSegmentData.frc,
                        currentSpeed: parsedData.flowSegmentData.currentSpeed,
                        freeFlowSpeed: parsedData.flowSegmentData.freeFlowSpeed,
                        currentTravelTime: parsedData.flowSegmentData.currentTravelTime,
                        freeFlowTravelTime: parsedData.flowSegmentData.freeFlowTravelTime,
                        confidence: parsedData.flowSegmentData.confidence,
                    };

                    setTrafficFlowData(trafficData);
                } else {
                    console.error("flowSegmentData not found in the parsed data:", parsedData);
                }
            } else {
                console.error("Data not found or invalid:", data);
            }
        } catch (error) {
            console.error('Error during request: ', error);
        }
    }

    return (
        <div>
            <div className="card bg-base-100 shadow-xl w-full">
                <div className="card-body flex items-center">
                    <div className="flex justify-center">
                        <form onSubmit={handleSubmit}>
                                <div className="join">
                                    <label className="w-full">
                                        <input type="text" 
                                            placeholder="Latitude" 
                                            className="input join-item w-full p-4 text-lg text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-[#FF6B6B]"
                                            onChange={(e) => setLatitude(e.target.value)}
                                            />
                                    </label>
                                    <label className="w-full">
                                        <input type="text" 
                                            placeholder="Longitude" 
                                            className="input join-item w-full p-4 text-lg text-gray-700 rounded-lg shadow-md focus:ring-2 focus:ring-[#FF6B6B]"
                                            onChange={(e) => setLongitude(e.target.value)}
                                            />
                                    </label>
                                </div>
                                <button type="submit" className="btn join-item bg-[#FF6B6B] text-white px-6 py-2 rounded-lg shadow-md hover:bg-[#FF4757] transition-all join-item">Enter</button>
                        </form>
                    </div>
    
                    {trafficFlowData && (
                        <div className="traffic-info">
                            <h3>Traffic Flow Data:</h3>
                            <p>
                                <strong>FRC: </strong>
                                {trafficFlowData.frc}
                            </p>
                            <p>
                                <strong>Current Speed: </strong>
                                {trafficFlowData.currentSpeed} km/h
                            </p>
                            <p>
                                <strong>Free Flow Speed: </strong>
                                {trafficFlowData.freeFlowSpeed} km/h
                            </p>
                            <p>
                                <strong>Current Travel Time: </strong>
                                {trafficFlowData.currentTravelTime} min
                            </p>
                            <p>
                                <strong>Free Flow Travel Time: </strong>
                                {trafficFlowData.freeFlowTravelTime} min
                            </p>
                            <p>
                                <strong>Confidence: </strong>
                                {trafficFlowData.confidence}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );    
}
