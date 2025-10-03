"use client";

import { MapPin } from "lucide-react";
import dynamic from "next/dynamic";
import Skeleton from "@/components/ui/Skeleton";

const VenueMap = dynamic(() => import("@/components/maps/VenueMap"), { ssr: false });

export default function VenueMapSection({ coords, venueName, city }) {
  return (
    <div className="rounded-xl border bg-card text-card-foreground p-4 md:p-5">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4">Live Map</h2>
      
      {coords ? (
        <VenueMap 
          center={[coords.latitude, coords.longitude]} 
          zoom={12} 
          venueName={venueName} 
          city={city} 
          className="h-72 w-full rounded-lg overflow-hidden" 
        />
      ) : (
        <Skeleton className="h-72 w-full" />
      )}
      
      <div className="text-xs text-muted-foreground mt-2">
        Switch layers (top-right) between OSM and NASA GIBS (TrueColor).
      </div>
      
      <a
        href={coords
          ? `https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`
          : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([venueName, city].filter(Boolean).join(', '))}`}
        target="_blank"
        rel="noreferrer"
        className="mb-3 mt-4 w-full flex justify-center items-center gap-2 rounded-lg bg-primary px-4 py-2 text-black text-base md:text-lg hover:opacity-90"
      >
        <MapPin className="h-5 w-5 md:h-6 md:w-6" />
        Open in Google Maps
      </a>
    </div>
  );
}
