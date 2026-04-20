import React from "react";

interface MoistureMeterProps {
  value: number; // 0-100
  size?: number;
}

const MoistureMeter: React.FC<MoistureMeterProps> = ({ value, size = 200 }) => {
  const radius = (size - 20) / 2;
  const centerX = size / 2;
  const centerY = size / 2 + radius; // Move center down for semicircle
  const semicircumference = Math.PI * radius;
  const strokeDasharray = `${(value / 100) * semicircumference} ${semicircumference}`;

  // Determine status
  let status: string;
  let statusColor: string;
  let message: string;
  let messageColor: string;

  if (value < 30) {
    status = "Too Dry";
    statusColor = "text-red-400";
    message = "Water your plant now";
    messageColor = "text-red-300";
  } else if (value > 80) {
    status = "Too Wet";
    statusColor = "text-blue-400";
    message = "Reduce watering frequency";
    messageColor = "text-blue-300";
  } else {
    status = "Optimal";
    statusColor = "text-green-400";
    message = "Plant is healthy & happy";
    messageColor = "text-green-300";
  }

  return (
    <div className="flex flex-col items-center w-full">
      <svg
        width={size}
        height={size / 2 + 20}
        className="overflow-visible drop-shadow-lg"
      >
        <defs>
          <linearGradient
            id="moistureGradient"
            x1="0%"
            x2="100%"
            y1="0%"
            y2="100%"
          >
            <stop
              offset="0%"
              style={{ stopColor: "#8b5cf6", stopOpacity: 1 }}
            />
            <stop
              offset="100%"
              style={{ stopColor: "#06b6d4", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        {/* Background semicircle */}
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
          stroke="#475569"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
        />
        {/* Progress semicircle */}
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
          stroke="url(#moistureGradient)"
          strokeWidth="12"
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeLinecap="round"
        />
      </svg>
      <div className="text-center mt-6 w-full">
        <div className="text-5xl font-bold bg-gradient-to-r from-purple-300 to-cyan-300 bg-clip-text text-transparent">
          {value}%
        </div>
        <div className="text-sm text-white mt-2">Soil Moisture Level</div>
        <div
          className={`text-lg font-semibold mt-3 px-4 py-2 rounded-lg inline-block ${statusColor} ${statusColor === "text-green-400" ? "bg-green-400/10" : statusColor === "text-red-400" ? "bg-red-400/10" : "bg-blue-400/10"}`}
        >
          {status}
        </div>
        <div className={`text-sm font-medium mt-3 ${messageColor}`}>
          {message}
        </div>
      </div>
    </div>
  );
};

export default MoistureMeter;
