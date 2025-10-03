"use client";

import { MapContainer, TileLayer, LayersControl, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function VenueMap({
  center,
  zoom = 12,
  venueName,
  city,
  className = "h-64 w-full rounded-lg overflow-hidden",
}) {
  const time = new Date().toISOString().split("T")[0];
  const tileMatrixSet = "GoogleMapsCompatible_Level9";
  const position = center || [20, 0];

  return (
    <div className={className}>
      <MapContainer center={position} zoom={zoom} scrollWheelZoom={false} style={{ height: "100%", width: "100%" }}>
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="&copy; OpenStreetMap contributors" />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="NASA GIBS (TrueColor)">
            <TileLayer
              url={`https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/MODIS_Terra_CorrectedReflectance_TrueColor/default/${time}/${tileMatrixSet}/{z}/{y}/{x}.jpg`}
              attribution="NASA GIBS"
              tileSize={256}
              noWrap
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {center ? (
          <CircleMarker center={center} radius={10} pathOptions={{ color: "#22c55e", fillColor: "#22c55e", fillOpacity: 0.9 }}>
            <Tooltip direction="top" offset={[0, -8]} opacity={1} permanent>
              <div className="text-xs font-semibold">{venueName || "Stadium"}{city ? ` • ${city}` : ""}</div>
            </Tooltip>
          </CircleMarker>
        ) : null}
      </MapContainer>
    </div>
  );
}


