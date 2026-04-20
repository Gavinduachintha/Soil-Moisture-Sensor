import { NextRequest, NextResponse } from "next/server";

// In-memory storage for sensor data
let sensorHistory: Array<{ time: string; moisture: number }> = [];
let currentMoisture = 0;

// Initialize with mock data
function initializeMockData() {
  const now = new Date();
  for (let i = 5; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 4 * 60 * 60 * 1000);
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    sensorHistory.push({
      time: `${hours}:${minutes}`,
      moisture: Math.floor(Math.random() * 50 + 40), // Random between 40-90
    });
  }
}

// Initialize mock data on first load
if (sensorHistory.length === 0) {
  initializeMockData();
  currentMoisture = sensorHistory[sensorHistory.length - 1].moisture;
}

// POST handler - Receives data from ESP32
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { moisture } = body;

    // Validate moisture value
    if (typeof moisture !== "number" || moisture < 0 || moisture > 100) {
      return NextResponse.json(
        { error: "Invalid moisture value. Must be between 0-100." },
        { status: 400 },
      );
    }

    // Update current moisture
    currentMoisture = moisture;

    // Add to history with current time
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");

    sensorHistory.push({
      time: `${hours}:${minutes}`,
      moisture,
    });

    // Keep only last 24 data points (6 hours with 15-min intervals, or 24 hours with 1-hour intervals)
    if (sensorHistory.length > 24) {
      sensorHistory.shift();
    }

    console.log(`Moisture data received: ${moisture}%`);

    return NextResponse.json(
      {
        success: true,
        message: "Moisture data received successfully",
        data: { moisture, timestamp: now.toISOString() },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 },
    );
  }
}

// GET handler - Returns current and historical data for frontend
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json(
      {
        currentMoisture,
        history: sensorHistory,
        lastUpdate: new Date().toISOString(),
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
