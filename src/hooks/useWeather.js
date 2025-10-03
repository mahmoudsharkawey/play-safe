"use client";

import { useEffect, useMemo, useState, useRef } from "react";

async function geocodeOpenCage(query, apiKey, signal) {
  const key = apiKey || process.env.NEXT_PUBLIC_OPENCAGE_KEY;
  if (!key) throw new Error("Missing OpenCage API key");
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${encodeURIComponent(key)}&limit=1&no_annotations=1`;
  const res = await fetch(url, { signal });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.status?.message || "Failed to geocode location";
    throw new Error(msg);
  }
  const g = data?.results?.[0]?.geometry;
  if (!g) throw new Error("Location not found");
  return { latitude: g.lat, longitude: g.lng };
}

async function geocodeNominatim(query, signal) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
  const res = await fetch(url, { signal, headers: { "User-Agent": "play-safe (educational)" } });
  const arr = await res.json().catch(() => []);
  const first = Array.isArray(arr) ? arr[0] : null;
  if (!first) throw new Error("Location not found");
  return { latitude: parseFloat(first.lat), longitude: parseFloat(first.lon) };
}

async function geocode(query, apiKey, signal) {
  // Try OpenCage if a key is available. Fallback to Nominatim on error or invalid key.
  if (apiKey || process.env.NEXT_PUBLIC_OPENCAGE_KEY) {
    try {
      return await geocodeOpenCage(query, apiKey, signal);
    } catch (_) {
      // fall through
    }
  }
  return await geocodeNominatim(query, signal);
}

async function fetchWeather({ latitude, longitude }, signal) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,precipitation,wind_speed_10m`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error("Failed to fetch weather");
  return await res.json();
}

const coordsCache = new Map();

export function useWeather({ venueName, city, apiKey }) {
  const [state, setState] = useState({ isLoading: false, error: null, data: null, coords: null });
  const lastQueryRef = useRef("");

  const query = useMemo(() => {
    const parts = [venueName, city].filter(Boolean);
    return parts.join(", ");
  }, [venueName, city]);

  useEffect(() => {
    if (!query) return;
    const ctrl = new AbortController();
    (async () => {
      try {
        setState((s) => ({ ...s, isLoading: true, error: null }));
        let coords = coordsCache.get(query);
        if (!coords) {
          // Try full query first (venue + city)
          try {
            coords = await geocode(query, apiKey, ctrl.signal);
          } catch (e1) {
            // Fallback: try city only if available
            if (city) {
              coords = await geocode(city, apiKey, ctrl.signal);
            } else {
              throw e1;
            }
          }
          if (coords) coordsCache.set(query, coords);
        }
        const data = await fetchWeather(coords, ctrl.signal);
        setState({ isLoading: false, error: null, data, coords });
      } catch (err) {
        if (ctrl.signal.aborted) return;
        const message = err?.message || String(err);
        setState({ isLoading: false, error: message, data: null, coords: null });
      }
    })();
    return () => ctrl.abort();
  }, [query, apiKey, city]);

  return state;
}


