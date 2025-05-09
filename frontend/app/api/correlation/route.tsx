"use server";
import { NextResponse } from "next/server";

const DJANGO_API_CORRELATION_URL = "http://127.0.0.1:8000/api/statistic/correlation"

export async function GET() {
    try {
        const response = await fetch(DJANGO_API_CORRELATION_URL);

        if (!response.ok) {
            return NextResponse.json({ error: "Failed to fetch data from Django API" }, { status: response.status });
        }

        const responseData = await response.json();

        return NextResponse.json(responseData, { status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}