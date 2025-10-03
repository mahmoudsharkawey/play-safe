"use client";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function NasaGibsMap({ center = [20, 0], zoom = 2, className = "h-64 w-full rounded-lg overflow-hidden", layer = "BlueMarble_ShadedRelief" }) {
  const time = new Date().toISOString().split("T")[0];
  const tileMatrixSet = "GoogleMapsCompatible_Level9"; // per GIBS WMTS for EPSG:3857
  return (
    <div className={className}>
      <MapContainer center={center} zoom={zoom} minZoom={1} maxZoom={8} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          url={`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/${layer}/default/${time}/${tileMatrixSet}/{z}/{y}/{x}.jpg`}
          attribution="NASA GIBS"
          tileSize={256}
          noWrap
        />
      </MapContainer>
    </div>
  );
}


