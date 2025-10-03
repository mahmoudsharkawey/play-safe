"use client";

import { useEffect, useState } from "react";
import { Thermometer, Droplets, Wind, Calendar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HistoricalInsights({ lat, lon, cityName = "Selected City" }) {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchHistoricalData() {
      if (!lat || !lon) {
        setError("City coordinates not available");
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

        const url = `https://power.larc.nasa.gov/api/temporal/climatology/point?parameters=${params}&community=RE&longitude=${lon}&latitude=${lat}&start=${start}&end=${end}&format=JSON`;

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
  }, [lat, lon]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Historical Weather Data
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <Calendar className="h-5 w-5" />
            Historical Data Error
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive text-sm">{error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!insights) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-sm">No historical data available</p>
        </CardContent>
      </Card>
    );
  }

  // Calculate annual averages
  const getAnnualAverage = (monthlyData) => {
    if (!monthlyData) return 0;
    const values = Object.values(monthlyData).filter(val => val !== null && val !== undefined);
    return values.length > 0 ? values.reduce((sum, val) => sum + val, 0) / values.length : 0;
  };

  // Calculate summer average (June, July, August)
  const getSummerAverage = (monthlyData) => {
    if (!monthlyData) return 0;
    const summerMonths = ["06", "07", "08"];
    const summerValues = summerMonths.map(month => monthlyData[month]).filter(val => val !== null && val !== undefined);
    return summerValues.length > 0 ? summerValues.reduce((sum, val) => sum + val, 0) / summerValues.length : 0;
  };

  // Calculate winter average (December, January, February)
  const getWinterAverage = (monthlyData) => {
    if (!monthlyData) return 0;
    const winterMonths = ["12", "01", "02"];
    const winterValues = winterMonths.map(month => monthlyData[month]).filter(val => val !== null && val !== undefined);
    return winterValues.length > 0 ? winterValues.reduce((sum, val) => sum + val, 0) / winterValues.length : 0;
  };

  const annualMaxTemp = getAnnualAverage(insights.T2M_MAX);
  const annualMinTemp = getAnnualAverage(insights.T2M_MIN);
  const annualRainfall = getAnnualAverage(insights.PRECTOTCORR);
  const annualWindSpeed = getAnnualAverage(insights.WS2M);

  const summerMaxTemp = getSummerAverage(insights.T2M_MAX);
  const winterMinTemp = getWinterAverage(insights.T2M_MIN);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Historical Weather Data - {cityName}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">Average data over the last 10 years (2014-2023)</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Temperature */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-chart-1" />
              <span className="text-sm font-medium">Temperature</span>
            </div>
            <div className="pl-6 space-y-2 text-sm">
              <p className="flex justify-between">
                <span>🔥 Annual Max Temp:</span>
                <span className="font-semibold">{annualMaxTemp.toFixed(1)}°C</span>
              </p>
              <p className="flex justify-between">
                <span>❄️ Annual Min Temp:</span>
                <span className="font-semibold">{annualMinTemp.toFixed(1)}°C</span>
              </p>
              <p className="flex justify-between">
                <span>☀️ Summer Max Temp:</span>
                <span className="font-semibold">{summerMaxTemp.toFixed(1)}°C</span>
              </p>
              <p className="flex justify-between">
                <span>🧊 Winter Min Temp:</span>
                <span className="font-semibold">{winterMinTemp.toFixed(1)}°C</span>
              </p>
            </div>
          </div>

          {/* Precipitation and Wind */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Droplets className="h-4 w-4 text-chart-2" />
              <span className="text-sm font-medium">Precipitation & Wind</span>
            </div>
            <div className="pl-6 space-y-2 text-sm">
              <p className="flex justify-between">
                <span>🌧️ Annual Rainfall:</span>
                <span className="font-semibold">{annualRainfall.toFixed(1)} mm</span>
              </p>
              <p className="flex justify-between">
                <span>💨 Wind Speed:</span>
                <span className="font-semibold">{annualWindSpeed.toFixed(1)} m/s</span>
              </p>
              <p className="flex justify-between">
                <span>📊 Rainy Days:</span>
                <span className="font-semibold">{annualRainfall > 0 ? ((annualRainfall / 30) * 100).toFixed(1) : 0}%</span>
              </p>
            </div>
          </div>
        </div>

        {/* Additional info */}
        <div className="mt-4 p-3 bg-muted/50 rounded-md">
          <p className="text-xs text-muted-foreground">
            📡 Data provided by NASA POWER API - Free historical weather data service
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
