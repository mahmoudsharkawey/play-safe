"use client";

import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function OsmMap({ center = [20, 0], zoom = 10, className = "h-56 w-full rounded-lg overflow-hidden" }) {
  return (
    <div className={className}>
      <MapContainer center={center} zoom={zoom} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <CircleMarker center={center} radius={8} pathOptions={{ color: "#22c55e", fillColor: "#22c55e", fillOpacity: 0.8 }} />
      </MapContainer>
    </div>
  );
}


