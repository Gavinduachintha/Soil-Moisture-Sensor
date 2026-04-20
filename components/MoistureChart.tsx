"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface DataPoint {
  time: string;
  moisture: number;
}

interface MoistureChartProps {
  data: DataPoint[];
}

const MoistureChart: React.FC<MoistureChartProps> = ({ data }) => {
  return (
    <div className="w-full h-80 p-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <defs>
            <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} />
          <XAxis dataKey="time" stroke="#94a3b8" style={{ fontSize: "12px" }} />
          <YAxis
            stroke="#94a3b8"
            style={{ fontSize: "12px" }}
            domain={[0, 100]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1e293b",
              border: "1px solid #6b46c1",
              borderRadius: "10px",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(139, 92, 246, 0.2)",
            }}
            formatter={(value) => [`${value}%`, "Moisture"]}
          />
          <Line
            type="monotone"
            dataKey="moisture"
            stroke="#8b5cf6"
            strokeWidth={3}
            dot={{ fill: "#a78bfa", strokeWidth: 2, r: 5 }}
            activeDot={{ r: 7, fill: "#c4b5fd" }}
            isAnimationActive={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MoistureChart;
