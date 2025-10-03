"use client";

import { useState } from "react";
import alerts from "@/data/alerts.json";
import AlertsGrid from "@/components/alerts/AlertsGrid";
import HistoricalInsights from "@/components/alerts/HistoricalInsights";
import LocationSelector from "@/components/alerts/LocationSelector";

export default function InsightsPage() {
  // Cairo coordinates as default
  const [selectedLocation, setSelectedLocation] = useState({
    lat: 30.0444,
    lon: 31.2357,
    cityName: "Cairo"
  });

  const handleLocationChange = (newLocation) => {
    setSelectedLocation(newLocation);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Insights</h1>
      </div>
      
      {/* Location Selection */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium">📍 Location Selection</h2>
        <LocationSelector onLocationChange={handleLocationChange} />
      </div>
      
      {/* Insights Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium">📊 Historical Data & Insights</h2>
        <HistoricalInsights 
          lat={selectedLocation.lat} 
          lon={selectedLocation.lon} 
          cityName={selectedLocation.cityName}
        />
      </div>

      {/* Optional: previous alerts grid if needed later */}
      {/* <div className="space-y-4">
        <h2 className="text-xl font-medium">🚨 Current Alerts</h2>
        <AlertsGrid alerts={alerts} />
      </div> */}
    </div>
  );
}


