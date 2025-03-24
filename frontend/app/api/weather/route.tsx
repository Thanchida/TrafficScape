"use server";
import { NextResponse } from "next/server";

const DJANGO_API_WEATHER_URL = "http://127.0.0.1:8000/api/weather/"

export async function POST(request: Request) {
    try {
        const requestData = await request.json();
        console.log("Request Data:", requestData);

        const response = await fetch(DJANGO_API_WEATHER_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(requestData),
        });

        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch data from Django API" }, { status: response.status });
        }

        const responseData = await response.json();
        console.log("Response Data:", responseData);

        return NextResponse.json(responseData, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
