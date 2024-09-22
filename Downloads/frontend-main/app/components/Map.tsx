"use client";

import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents, Popup, useMap } from "react-leaflet";
import L from "leaflet";

interface MapComponentProps {
  setLocation?: (location: { lat: number; lng: number }) => void;
  defaultLocation?: { lat: number; lng: number };
  markers: { position: L.LatLng; title: string }[];
}
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";

const MapComponent: React.FC<MapComponentProps> = ({ setLocation, defaultLocation, markers }) => {
  const [position, setPosition] = useState<L.LatLng | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Ensure this runs only on the client
      setMounted(true);
      if (defaultLocation) {
        const { lat, lng } = defaultLocation;
        setPosition(new L.LatLng(lat, lng));
        setLocation && setLocation({ lat, lng });
      } else {
        global?.window?.navigator?.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPosition(new L.LatLng(latitude, longitude));
            setLocation && setLocation({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error getting geolocation:", error);
            const fallbackPosition = new L.LatLng(51.505, -0.09); // Example: London
            setPosition(fallbackPosition);
            setLocation && setLocation({ lat: 51.505, lng: -0.09 });
          }
        );
      }
    }
  }, [defaultLocation, setLocation]);

  return (
    mounted &&
    position && (
      <MapContainer center={position} zoom={13} style={{ height: "100%", width: "100%" }}>
   <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
/>

        {markers ? (
          markers.map((marker) => (
            <Marker key={marker.title} position={marker.position}>
              <Popup>{marker.title}</Popup>
            </Marker>
          ))
        ) : (
          <MapMarker position={position} setPosition={setPosition} setLocation={setLocation} />
        )}
      </MapContainer>
    )
  );
};

const MapMarker: React.FC<{
  position: L.LatLng;
  setPosition: React.Dispatch<React.SetStateAction<L.LatLng | null>>;
  setLocation?: (location: { lat: number; lng: number }) => void;
}> = ({ position, setPosition, setLocation }) => {
  const map = useMap();

  useEffect(() => {
    map.flyTo(position, map.getZoom());
  }, [position, map]);

  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      setPosition(e.latlng);
      setLocation && setLocation({ lat, lng });
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return <Marker position={position} />;
};

export default MapComponent;
