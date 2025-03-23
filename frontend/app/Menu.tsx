"use client"
import React, { useState } from 'react'
import Image from 'next/image'

const TRAFFIC_URL = "/api/traffic/"

export const Menu = () => {
    const [Latitude, setLatitude] = useState('');
    const [Longitude, setLongitude] = useState('');
    const [trafficFlowData, setTrafficFlowData] = useState<any>(null);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log(Latitude, Longitude);
        
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
            console.log("Data: ", data);

            if (data && data.data) {
                const parsedData = JSON.parse(data.data);
                console.log("Parsed Data: ", parsedData);

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
                    console.log("Traffic Data Set: ", trafficData);
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
            <div className="card card-dash bg-base-100 w-full h-full flex-grow py-1 px-6 rounded-lg overflow-hidden">
                <div className="card-body p-0 bg-[#FFFACB] rounded-lg h-full">
                    <div className="flex justify-center">
                        <form onSubmit={handleSubmit}>
                            <fieldset className="fieldset w-xs bg-base-200 border border-base-300 p-4 rounded-box">
                                <legend className="fieldset-legend">Address</legend>
                                <div className="join">
                                    <input
                                        type="text"
                                        className="input join-item"
                                        placeholder="Latitude"
                                        value={Latitude}
                                        onChange={(e) => setLatitude(e.target.value)}
                                    />
                                    <input
                                        type="text"
                                        className="input join-item"
                                        placeholder="Longitude"
                                        value={Longitude}
                                        onChange={(e) => setLongitude(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn join-item">
                                    Submit
                                </button>
                            </fieldset>
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
