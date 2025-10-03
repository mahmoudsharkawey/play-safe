"use client";

import { Wind, Thermometer } from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";

export default function WeatherCard({ 
  weatherLoading, 
  weatherError, 
  weather, 
  coords, 
  venueName, 
  city 
}) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground p-4 md:p-5">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Weather</h2>
      
      {weatherLoading ? (
        <div className="space-y-3">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
      ) : weatherError ? (
        <div className="text-sm text-red-500">{weatherError}</div>
      ) : weather?.current_weather ? (
        <div className="space-y-2">
          <div className="text-lg font-medium">
            {venueName || "Stadium"}{city ? ` • ${city}` : ""}
          </div>
          
          <div className="flex items-center gap-3 text-5xl font-extrabold">
            <Thermometer className="h-7 w-7 md:h-8 md:w-8" />
            {Math.round(weather.current_weather.temperature)}°C
          </div>
          
          <div className="flex items-center gap-3 text-lg md:text-xl text-muted-foreground">
            <Wind className="h-6 w-6 md:h-7 md:w-7" />
            <span className="font-semibold text-foreground">Wind</span> 
            {Math.round(weather.current_weather.windspeed)} km/h
          </div>
          
          {coords ? (
            <div className="text-xs text-muted-foreground">
              {coords.latitude.toFixed(3)}, {coords.longitude.toFixed(3)}
            </div>
          ) : null}
        </div>
      ) : (
        <div className="text-base text-muted-foreground">No weather data.</div>
      )}
    </div>
  );
}
