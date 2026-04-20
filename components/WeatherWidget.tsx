import React from "react";

interface WeatherData {
  temperature: number;
  humidity: number;
  description: string;
  icon: string;
}

interface WeatherWidgetProps {
  weather: WeatherData;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ weather }) => {
  return (
    <div className="bg-white/5 backdrop-blur-xl p-8 rounded-2xl shadow-2xl border border-white/10 hover:border-purple-500/40 transition-all duration-300">
      <h3 className="text-2xl font-bold text-white mb-6">
        Environment Conditions
      </h3>
      <div className="grid grid-cols-3 gap-6">
        {/* Temperature */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all">
          <div className="text-white/80 text-sm mb-2">Temperature</div>
          <div className="text-3xl font-bold text-cyan-300">
            {weather.temperature}°C
          </div>
        </div>

        {/* Humidity */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-purple-400/50 transition-all">
          <div className="text-white/80 text-sm mb-2">Humidity</div>
          <div className="text-3xl font-bold text-purple-300">
            {weather.humidity}%
          </div>
        </div>

        {/* Weather Icon */}
        <div className="bg-white/5 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-purple-400/50 transition-all flex items-center justify-center">
          <span className="text-5xl">{weather.icon}</span>
        </div>
      </div>
      <div className="mt-6 p-4 bg-white/5 backdrop-blur-md rounded-xl border border-white/10">
        <div className="text-white/80 text-sm">Forecast</div>
        <div className="text-lg font-semibold text-purple-200 mt-1">
          {weather.description}
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
