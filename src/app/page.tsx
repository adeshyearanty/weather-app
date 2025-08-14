"use client";

import type React from "react";

import { useState } from "react";
import {
  Search,
  Cloud,
  Sun,
  CloudRain,
  CloudSnow,
  Wind,
  Droplets,
  Thermometer,
  Gauge,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

interface WeatherData {
  name: string;
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
  };
  visibility: number;
  sys: {
    country: string;
  };
}

const getWeatherIcon = (weatherMain: string) => {
  switch (weatherMain.toLowerCase()) {
    case "clear":
      return <Sun className="w-16 h-16 text-yellow-400" />;
    case "clouds":
      return <Cloud className="w-16 h-16 text-gray-400" />;
    case "rain":
      return <CloudRain className="w-16 h-16 text-blue-400" />;
    case "snow":
      return <CloudSnow className="w-16 h-16 text-blue-200" />;
    default:
      return <Cloud className="w-16 h-16 text-gray-400" />;
  }
};

export default function WeatherPage() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!location.trim()) {
      setError("Please enter a location");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const apiKey = "14d2a6eeac807c762555d2c958bc0f12";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
      );

      if (!response.ok) {
        throw new Error("Location not found");
      }

      const data = await response.json();
      setWeatherData(data);
      setLocation("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch weather data"
      );
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Custom Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-10 left-1/2 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full opacity-30 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-serif">
              Weather App
            </h1>
            <p className="text-blue-100 text-lg">
              Get real-time weather information for any location
            </p>
          </div>

          {/* Search Section */}
          <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
            <CardContent className="p-6">
              <div className="flex gap-3">
                <Input
                  type="text"
                  placeholder="Enter city name..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white/50"
                  disabled={loading}
                />
                <Button
                  onClick={fetchWeather}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                </Button>
              </div>

              {error && (
                <p className="text-red-300 text-sm mt-3 flex items-center gap-2">
                  <span className="w-4 h-4 rounded-full bg-red-400 flex-shrink-0" />
                  {error}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Weather Display */}
          {weatherData && (
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-8">
                {/* Location and Main Weather */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-white mb-2">
                    {weatherData.name}, {weatherData.sys.country}
                  </h2>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    {getWeatherIcon(weatherData.weather[0].main)}
                    <div>
                      <div className="text-5xl font-bold text-white">
                        {Math.round(weatherData.main.temp)}°C
                      </div>
                      <div className="text-blue-100 capitalize">
                        {weatherData.weather[0].description}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Weather Details Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <Thermometer className="w-6 h-6 text-orange-400 mx-auto mb-2" />
                    <div className="text-white/70 text-sm">Feels Like</div>
                    <div className="text-white font-semibold">
                      {Math.round(weatherData.main.feels_like)}°C
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <Droplets className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-white/70 text-sm">Humidity</div>
                    <div className="text-white font-semibold">
                      {weatherData.main.humidity}%
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <Wind className="w-6 h-6 text-green-400 mx-auto mb-2" />
                    <div className="text-white/70 text-sm">Wind Speed</div>
                    <div className="text-white font-semibold">
                      {Math.round(weatherData.wind.speed * 3.6)} km/h
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4 text-center">
                    <Gauge className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-white/70 text-sm">Pressure</div>
                    <div className="text-white font-semibold">
                      {weatherData.main.pressure} hPa
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Footer */}
          <div className="text-center mt-8">
            <p className="text-white/60 text-sm">
              © 2024 Weather App. Powered by OpenWeatherMap
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
