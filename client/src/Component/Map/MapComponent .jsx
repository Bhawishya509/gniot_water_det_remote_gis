import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = ({ location }) => {
  return (
    <MapContainer
      center={location || [0, 0]} // Default center
      zoom={location ? 13 : 2}   // Default zoom level
      style={{ height: "600px", width: "100%", marginTop: "20px" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {location && <Marker position={location} />}
    </MapContainer>
  );
};

export default MapComponent;
