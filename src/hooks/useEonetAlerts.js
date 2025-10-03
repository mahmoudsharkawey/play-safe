"use client";

import { useEffect, useState } from "react";

// Fetch EONET events near a point (rough bounding box radius in km)
export function useEonetAlerts({ latitude, longitude, radiusKm = 200, limit = 10 }) {
  const [state, setState] = useState({ isLoading: false, error: null, events: [] });

  useEffect(() => {
    if (typeof latitude !== "number" || typeof longitude !== "number") return;
    const ctrl = new AbortController();
    (async () => {
      try {
        setState((s) => ({ ...s, isLoading: true, error: null }));
        // Build a small bbox around the point (approx conversion deg per km ~ 1/111)
        const d = radiusKm / 111;
        const minLon = longitude - d;
        const minLat = latitude - d;
        const maxLon = longitude + d;
        const maxLat = latitude + d;
        const bbox = `${minLon},${minLat},${maxLon},${maxLat}`;
        const url = `https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=${limit}&bbox=${bbox}`;
        const res = await fetch(url, { signal: ctrl.signal });
        if (!res.ok) throw new Error("Failed to fetch EONET alerts");
        const data = await res.json();
        console.log(data)
        setState({ isLoading: false, error: null, events: data?.events || [] });
      } catch (err) {
        if (ctrl.signal.aborted) return;
        setState({ isLoading: false, error: err?.message || String(err), events: [] });
      }
    })();
    return () => ctrl.abort();
  }, [latitude, longitude, radiusKm, limit]);

  return state;
}


