"use client";

import React, { Suspense, useState, useEffect } from "react";
import dynamic from "next/dynamic";
import MoistureMeter from "./MoistureMeter";
import WeatherWidget from "./WeatherWidget";

const MoistureChart = dynamic(() => import("./MoistureChart"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-64 bg-gray-800 rounded animate-pulse"></div>
  ),
});

interface DataPoint {
  time: string;
  moisture: number;
}

const Dashboard: React.FC = () => {
  const [currentMoisture, setCurrentMoisture] = useState<number>(75);
  const [chartData, setChartData] = useState<DataPoint[]>([
    { time: "00:00", moisture: 70 },
    { time: "04:00", moisture: 65 },
    { time: "08:00", moisture: 80 },
    { time: "12:00", moisture: 75 },
    { time: "16:00", moisture: 72 },
    { time: "20:00", moisture: 78 },
  ]);
  const [loading, setLoading] = useState(true);

  // Fetch sensor data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/data");
        if (response.ok) {
          const data = await response.json();
          setCurrentMoisture(data.currentMoisture);
          setChartData(data.history);
        }
      } catch (error) {
        console.error("Failed to fetch sensor data:", error);
      } finally {
        setLoading(false);
      }
    };

    // Fetch data immediately on mount
    fetchData();

    // Refresh data every 30 seconds
    const interval = setInterval(fetchData, 30000);

    return () => clearInterval(interval);
  }, []);

  const weatherData = {
    temperature: 22,
    humidity: 60,
    description: "Partly Cloudy",
    icon: "☁️",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-black p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-purple-300 to-blue-400 bg-clip-text text-transparent mb-2">
            IoT Soil Moisture Monitor
          </h1>
          <p className="text-white/80 text-lg">
            Real-time soil and environmental tracking
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Current Moisture Meter */}
          <div className="lg:col-span-1 flex justify-center">
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-300 w-full">
              <MoistureMeter value={currentMoisture} />
            </div>
          </div>

          {/* Moisture Chart */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-300">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent mb-6">
                Moisture History
              </h2>
              <Suspense
                fallback={
                  <div className="w-full h-64 bg-white/5 rounded-lg animate-pulse"></div>
                }
              >
                <MoistureChart data={chartData} />
              </Suspense>
            </div>
          </div>
        </div>

        {/* Weather Widget */}
        {/* <div className="mt-6">
          <WeatherWidget weather={weatherData} />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
