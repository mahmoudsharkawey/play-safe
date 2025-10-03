"use client";

import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Skeleton from "@/components/ui/Skeleton";
import { useDailyForecast } from "@/hooks/useWeather";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const WIND_ALERT_THRESHOLD = 12; // m/s ~ 43 km/h
const RAIN_ALERT_THRESHOLD = 10; // mm/day

function formatDayLabel(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { weekday: "short" });
}

function getIconForDay({ rain, wind }) {
  if (wind >= WIND_ALERT_THRESHOLD) return "🌪️";
  if (rain >= RAIN_ALERT_THRESHOLD) return "🌧️";
  return "☀️";
}

export default function InsightsSection({ venueName, city, apiKey }) {
  const [geo, setGeo] = useState({ allowed: false, coords: null, denied: false });
  useEffect(() => {
    if (!navigator?.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords || {};
        if (typeof latitude === "number" && typeof longitude === "number") {
          setGeo({ allowed: true, coords: { latitude, longitude }, denied: false });
        }
      },
      () => setGeo({ allowed: false, coords: null, denied: true }),
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 300000 }
    );
  }, []);

  const { isLoading, error, data } = useDailyForecast({ venueName, city, apiKey, coords: geo.coords });

  const days = useMemo(() => {
    if (!data?.daily) return [];
    const { time = [], temperature_2m_max = [], temperature_2m_min = [], precipitation_sum = [], wind_speed_10m_max = [] } = data.daily;
    return time.map((t, idx) => ({
      date: t,
      tMax: temperature_2m_max[idx],
      tMin: temperature_2m_min[idx],
      rain: precipitation_sum[idx],
      wind: wind_speed_10m_max[idx],
    }));
  }, [data]);

  const avgTemp = useMemo(() => {
    if (!days.length) return null;
    const sum = days.reduce((acc, d) => acc + ((d.tMax + d.tMin) / 2), 0);
    return Math.round((sum / days.length) * 10) / 10;
  }, [days]);

  const chartData = useMemo(() => {
    const labels = days.map((d) => formatDayLabel(d.date));
    return {
      labels,
      datasets: [
        {
          label: "Max °C",
          data: days.map((d) => d.tMax),
          borderColor: "rgb(239, 68, 68)",
          backgroundColor: "rgba(239, 68, 68, 0.2)",
          tension: 0.3,
        },
        {
          label: "Min °C",
          data: days.map((d) => d.tMin),
          borderColor: "rgb(59, 130, 246)",
          backgroundColor: "rgba(59, 130, 246, 0.2)",
          tension: 0.3,
        },
      ],
    };
  }, [days]);

  const chartOptions = useMemo(() => ({
    responsive: true,
    plugins: {
      legend: { display: true, labels: { color: "#9ca3af" } },
      tooltip: { mode: "index", intersect: false },
    },
    interaction: { mode: "index", intersect: false },
    scales: {
      x: { ticks: { color: "#9ca3af" }, grid: { color: "rgba(156,163,175,0.15)" } },
      y: { title: { display: true, text: "°C", color: "#9ca3af" }, ticks: { color: "#9ca3af" }, grid: { color: "rgba(156,163,175,0.15)" } },
    },
  }), []);

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-2xl font-semibold">Insights</h2>
        {avgTemp != null && (
          <div className="text-sm text-muted-foreground">7‑day avg temp: <span className="text-foreground font-medium">{avgTemp}°C</span></div>
        )}
      </div>

      {!!days.length && (
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-rose-500/10">
            <CardTitle className="flex items-center gap-2">
              <span>Temperature next 7 days</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <Line data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>
      )}

      {isLoading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-28" />
          ))}
        </div>
      )}

      {error && (
        <Card>
          <CardHeader>
            <CardTitle>Could not load insights</CardTitle>
          </CardHeader>
          <CardContent>{String(error)}</CardContent>
        </Card>
      )}

      {!!days.length && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
            {days.slice(0, 7).map((d) => {
              const icon = getIconForDay({ rain: d.rain, wind: d.wind });
              const showAlert = d.wind >= WIND_ALERT_THRESHOLD || d.rain >= RAIN_ALERT_THRESHOLD;
              return (
                <Card key={d.date} className={`transition-all hover:shadow-md ${showAlert ? "border-amber-500" : ""}`}>
                  <CardHeader className="flex flex-row items-center justify-between pb-0">
                    <CardTitle className="text-base">{formatDayLabel(d.date)}</CardTitle>
                    <div className="text-2xl" aria-hidden>{icon}</div>
                  </CardHeader>
                  <CardContent className="space-y-1 pt-2">
                    <div className="text-sm flex items-center justify-between"><span>Max</span><span className="text-foreground font-medium">{Math.round(d.tMax)}°C</span></div>
                    <div className="text-sm flex items-center justify-between"><span>Min</span><span className="text-foreground font-medium">{Math.round(d.tMin)}°C</span></div>
                    <div className="text-sm flex items-center justify-between"><span>Rain</span><span className="text-foreground font-medium">{Math.round(d.rain)} mm</span></div>
                    <div className="text-sm flex items-center justify-between"><span>Wind</span><span className="text-foreground font-medium">{Math.round(d.wind)} m/s</span></div>
                    {showAlert && (
                      <div className="text-amber-600 text-xs mt-1">⚠️ Possible adverse conditions</div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}


