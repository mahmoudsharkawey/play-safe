"use client";

import { useEffect, useState } from "react";

export function useWeatherTips({ temperatureC, windKmh, city, venueName, apiKey, streaming = true }) {
  const [state, setState] = useState({ isLoading: false, error: null, tips: [], streamText: "" });

  useEffect(() => {
    if (typeof temperatureC !== "number" && typeof windKmh !== "number") return;
    const ctrl = new AbortController();
    (async () => {
      try {
        // Build a stable cache key per conditions and location for the day
        const day = new Date().toISOString().split("T")[0];
        const cacheKey = `ps.tips:${city || ""}:${venueName || ""}:${Math.round(temperatureC ?? -999)}:${Math.round(windKmh ?? -999)}:${day}`;

        // Read from localStorage first
        try {
          const cachedRaw = localStorage.getItem(cacheKey);
          if (cachedRaw) {
            const cached = JSON.parse(cachedRaw);
            if (Array.isArray(cached?.tips) && cached.tips.length) {
              setState({ isLoading: false, error: null, tips: cached.tips, streamText: cached.streamText || "" });
              return; // Skip calling API if we have cached tips for today
            }
          }
        } catch (_) {}

        setState((s) => ({ ...s, isLoading: true, error: null }));
        if (streaming) {
          const res = await fetch("/api", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ temperatureC, windKmh, city, venueName }),
            signal: ctrl.signal,
          });
          if (!res.ok || !res.body) throw new Error("Failed to stream AI tips");
          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          const tips = [];
          let streamText = "";
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            const chunk = decoder.decode(value, { stream: true });
            // Parse SSE: lines starting with 'data: '
            chunk.split("\n\n").forEach((block) => {
              const line = block.trim();
              if (!line.startsWith("data:")) return;
              const payload = line.slice(5).trim();
              try {
                const obj = JSON.parse(payload);
                const piece = obj?.candidates?.[0]?.content?.parts?.[0]?.text || obj?.text || "";
                if (piece) {
                  streamText += piece;
                  piece.split(/\n+/).forEach((p) => {
                    const cleaned = p.replace(/^[-*•]\s*/, "").trim();
                    if (cleaned) tips.push(cleaned);
                  });
                  setState((s) => ({ ...s, tips: [...tips], streamText }));
                }
              } catch (_) {
                // ignore non-JSON SSE frames
              }
            });
          }
          if (tips.length === 0 && streamText) {
            streamText.split(/\n+/).forEach((p) => {
              const cleaned = p.replace(/^[-*•]\s*/, "").trim();
              if (cleaned) tips.push(cleaned);
            });
          }
          setState((s) => ({ ...s, isLoading: false, tips: [...tips], streamText }));
          // Persist to localStorage
          try { localStorage.setItem(cacheKey, JSON.stringify({ tips, streamText, ts: Date.now() })); } catch (_) {}
        } else {
          const res = await fetch("/api/ai-tips", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ temperatureC, windKmh, city, venueName }),
            signal: ctrl.signal,
          });
          if (!res.ok) throw new Error("Failed to fetch AI tips");
          const data = await res.json();
          const tips = Array.isArray(data?.tips) ? data.tips : [];
          setState({ isLoading: false, error: null, tips, streamText: tips.join("\n") });
          try { localStorage.setItem(cacheKey, JSON.stringify({ tips, streamText: tips.join("\n"), ts: Date.now() })); } catch (_) {}
        }
      } catch (err) {
        if (ctrl.signal.aborted) return;
        setState({ isLoading: false, error: err?.message || String(err), tips: [] });
      }
    })();
    return () => ctrl.abort();
  }, [temperatureC, windKmh, city, venueName, apiKey, streaming]);

  return state;
}


