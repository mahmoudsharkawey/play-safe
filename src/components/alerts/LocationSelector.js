"use client";

import { useState } from "react";
import { MapPin, Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function LocationSelector({ onLocationChange }) {
  const [selectedCity, setSelectedCity] = useState("Cairo");
  const [customLocation, setCustomLocation] = useState("");

  // List of common cities with their coordinates
  const cities = [
    { name: "Cairo", lat: 30.0444, lon: 31.2357 },
    { name: "Alexandria", lat: 31.2001, lon: 29.9187 },
    { name: "Riyadh", lat: 24.7136, lon: 46.6753 },
    { name: "Jeddah", lat: 21.4858, lon: 39.1925 },
    { name: "Dubai", lat: 25.2048, lon: 55.2708 },
    { name: "Abu Dhabi", lat: 24.4539, lon: 54.3773 },
    { name: "Kuwait City", lat: 29.3759, lon: 47.9774 },
    { name: "Doha", lat: 25.2854, lon: 51.5310 },
    { name: "Muscat", lat: 23.5880, lon: 58.3829 },
    { name: "Beirut", lat: 33.8938, lon: 35.5018 },
    { name: "Amman", lat: 31.9454, lon: 35.9284 },
    { name: "Damascus", lat: 33.5138, lon: 36.2765 },
    { name: "Baghdad", lat: 33.3152, lon: 44.3661 },
    { name: "Tehran", lat: 35.6892, lon: 51.3890 },
    { name: "Istanbul", lat: 41.0082, lon: 28.9784 },
    { name: "Ankara", lat: 39.9334, lon: 32.8597 },
    { name: "London", lat: 51.5074, lon: -0.1278 },
    { name: "Paris", lat: 48.8566, lon: 2.3522 },
    { name: "New York", lat: 40.7128, lon: -74.0060 },
    { name: "Tokyo", lat: 35.6762, lon: 139.6503 }
  ];

  const handleCityChange = (cityName) => {
    setSelectedCity(cityName);
    const city = cities.find(c => c.name === cityName);
    if (city && onLocationChange) {
      onLocationChange({
        lat: city.lat,
        lon: city.lon,
        cityName: city.name
      });
    }
  };

  const handleCustomLocation = () => {
    if (customLocation.trim()) {
      // Can add geocoding service here later
      alert("Custom city search will be added soon!");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Select City
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* City list */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Available Cities:
            </label>
            <select
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full p-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-ring"
            >
              {cities.map((city) => (
                <option key={city.name} value={city.name}>
                  {city.name}
                </option>
              ))}
            </select>
          </div>

          {/* Custom search */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Or search for another city:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={customLocation}
                onChange={(e) => setCustomLocation(e.target.value)}
                placeholder="Enter city name..."
                className="flex-1 p-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-ring"
              />
              <Button
                onClick={handleCustomLocation}
                className="flex items-center gap-1"
              >
                <Search className="h-4 w-4" />
                Search
              </Button>
            </div>
          </div>

          {/* Selected city info */}
          <div className="p-3 bg-muted/50 rounded-md">
            <p className="text-sm">
              <strong>Selected City:</strong> {selectedCity}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Historical weather data will be displayed for this city
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
