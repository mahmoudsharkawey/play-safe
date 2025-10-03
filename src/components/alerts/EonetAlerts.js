"use client";

import { AlertTriangle, ExternalLink } from "lucide-react";

export default function EonetAlerts({ isLoading, error, events }) {
  if (isLoading) return <div className="text-sm text-muted-foreground">Loading alerts…</div>;
  if (error) return <div className="text-sm text-red-500">{error}</div>;
  if (!events || events.length === 0) return <div className="text-sm text-muted-foreground">No active alerts nearby.</div>;

  return (
    <div className="space-y-3">
      {events.map((e) => (
        <a
          key={e.id}
          href={e?.sources?.[0]?.url || `https://eonet.gsfc.nasa.gov/api/v3/events/${e.id}`}
          target="_blank"
          rel="noreferrer"
          className="flex items-start gap-3 rounded-lg border p-3 hover:bg-muted/40"
        >
          <AlertTriangle className="h-5 w-5 text-yellow-400 shrink-0" />
          <div className="min-w-0">
            <div className="text-sm font-semibold truncate">{e.title}</div>
            <div className="text-xs text-muted-foreground truncate">{e?.categories?.[0]?.title || "EONET"}</div>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground ml-auto" />
        </a>
      ))}
    </div>
  );
}


