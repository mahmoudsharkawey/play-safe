"use client";

import { useEffect, useState } from "react";
import { Thermometer, Droplets, Wind, Calendar, MapPin } from "lucide-react";
import Skeleton from "@/components/ui/Skeleton";

export default function HistoricalWeatherCard({ coords, city, venueName }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHistoricalData() {
      if (!coords?.latitude || !coords?.longitude) {
        setError("Venue coordinates not available");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Using data from last 10 years (2014-2023)
        const start = "2014";
        const end = "2023";
        const params = "T2M_MAX,T2M_MIN,PRECTOTCORR,WS2M";

        const url = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=${params}&community=RE&longitude=${coords.longitude}&latitude=${coords.latitude}&start=${start}&end=${end}&format=JSON`;

        const res = await fetch(url);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        
        if (data.properties && data.properties.parameter) {
          setInsights(data.properties.parameter);
        } else {
          throw new Error("Invalid data from NASA API");
        }
      } catch (err) {
        console.error("Error fetching historical data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchHistoricalData();
  }, [coords]);

  // Calculate averages
  const getAnnualAverage = (monthlyData) => {
    if (!monthlyData) return 0;
    const values = Object.values(monthlyData).filter(val => val !== null && val !== undefined);
    return values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;
  };

  const getSummerAverage = (monthlyData) => {
    if (!monthlyData) return 0;
    const summerMonths = ["06", "07", "08"];
    const summerValues = summerMonths.map(month => monthlyData[month]).filter(val => val !== null && val !== undefined);
    return summerValues.length > 0 ? summerValues.reduce((sum, val) => sum + val, 0) / summerValues.length : 0;
  };

  const getWinterAverage = (monthlyData) => {
    if (!monthlyData) return 0;
    const winterMonths = ["12", "01", "02"];
    const winterValues = winterMonths.map(month => monthlyData[month]).filter(val => val !== null && val !== undefined);
    return winterValues.length > 0 ? winterValues.reduce((sum, val) => sum + val, 0) / winterValues.length : 0;
  };

  const annualMaxTemp = getAnnualAverage(insights?.T2M_MAX);
  const annualMinTemp = getAnnualAverage(insights?.T2M_MIN);
  const annualRainfall = getAnnualAverage(insights?.PRECTOTCORR);
  const annualWindSpeed = getAnnualAverage(insights?.WS2M);

  const summerMaxTemp = getSummerAverage(insights?.T2M_MAX);
  const winterMinTemp = getWinterAverage(insights?.T2M_MIN);

  return (
    <div className="rounded-xl border bg-card text-card-foreground p-4 md:p-5">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="h-5 w-5" />
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">Historical Weather</h2>
      </div>
      
      {loading ? (
        <div className="space-y-3">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-40" />
          <Skeleton className="h-4 w-36" />
          <Skeleton className="h-4 w-44" />
        </div>
      ) : error ? (
        <div className="text-sm text-destructive">{error}</div>
      ) : insights ? (
        <div className="space-y-4">
          {/* Location Info */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{venueName || "Stadium"}{city ? ` • ${city}` : ""}</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">
            Average data over the last 10 years (2014-2023)
          </p>
          
          {/* Temperature Data */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-chart-1" />
              <span className="text-sm font-medium">Temperature</span>
            </div>
            <div className="pl-6 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>🔥 Annual Max:</span>
                <span className="font-semibold">{annualMaxTemp.toFixed(1)}°C</span>
              </div>
              <div className="flex justify-between">
                <span>❄️ Annual Min:</span>
                <span className="font-semibold">{annualMinTemp.toFixed(1)}°C</span>
              </div>
              <div className="flex justify-between">
                <span>☀️ Summer Max:</span>
                <span className="font-semibold">{summerMaxTemp.toFixed(1)}°C</span>
              </div>
              <div className="flex justify-between">
                <span>🧊 Winter Min:</span>
                <span className="font-semibold">{winterMinTemp.toFixed(1)}°C</span>
              </div>
            </div>
          </div>

          {/* Precipitation and Wind */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-chart-2" />
              <span className="text-sm font-medium">Precipitation & Wind</span>
            </div>
            <div className="pl-6 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>🌧️ Annual Rainfall:</span>
                <span className="font-semibold">{annualRainfall.toFixed(1)} mm</span>
              </div>
              <div className="flex justify-between">
                <span>💨 Wind Speed:</span>
                <span className="font-semibold">{annualWindSpeed.toFixed(1)} m/s</span>
              </div>
              <div className="flex justify-between">
                <span>📊 Rainy Days:</span>
                <span className="font-semibold">{annualRainfall > 0 ? ((annualRainfall / 30) * 100).toFixed(1) : 0}%</span>
              </div>
            </div>
          </div>

          {/* Data Source */}
          <div className="pt-2 border-t border-border">
            <p className="text-xs text-muted-foreground">
              📡 Data from NASA POWER API
            </p>
          </div>
        </div>
      ) : (
        <div className="text-sm text-muted-foreground">No historical data available</div>
      )}
    </div>
  );
}
