import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import { Star } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';
import 'leaflet/dist/leaflet.css';

// Custom Star Icon
const starIconMarkup = renderToStaticMarkup(
  <div className="relative flex items-center justify-center">
    <div className="absolute -top-10 bg-white/90 p-1.5 rounded shadow-lg border border-brand-orange whitespace-nowrap">
      <p className="text-[10px] font-black text-brand-dark uppercase tracking-widest">Imperial Air HQ</p>
    </div>
    <Star size={32} className="text-red-600 fill-red-600 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]" />
  </div>
);

const customStarIcon = L.divIcon({
  html: starIconMarkup,
  className: 'custom-star-marker',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

// Simple standard marker for other cities
const standardMarkerIcon = L.divIcon({
  html: renderToStaticMarkup(<div className="w-4 h-4 bg-brand-blue rounded-full border-2 border-white shadow-md" />),
  className: 'standard-marker',
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

interface MapComponentProps {
  center: [number, number];
  zoom?: number;
  cityName?: string;
  isRGV?: boolean;
}

export default function MapComponent({ center, zoom = 13, cityName, isRGV }: MapComponentProps) {
  // Edinburg coordinates
  const edinburgCoords: [number, number] = [26.3017, -98.1633];

  return (
    <div className="w-full h-full relative z-0">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Always show the HQ marker in Edinburg */}
        <Marker position={edinburgCoords} icon={customStarIcon}>
          <Popup>
            <div className="text-center">
              <p className="font-black text-brand-dark uppercase text-xs">Imperial Air LLC</p>
              <p className="text-[10px] text-brand-gray">Headquarters - Edinburg, TX</p>
            </div>
          </Popup>
        </Marker>

        {/* If it's a specific city (not RGV), show a standard marker there too if it's far from Edinburg */}
        {!isRGV && cityName && (
          <Marker position={center} icon={standardMarkerIcon}>
            <Popup>
              <p className="font-bold text-xs">{cityName} Service Area</p>
            </Popup>
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
