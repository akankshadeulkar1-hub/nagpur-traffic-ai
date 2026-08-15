import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

/**
 * TrafficMap.jsx - Leaflet Heatmap Component
 * -----------------------------------------
 * Purpose: Interactive map component powered by React-Leaflet to visualize real-time traffic density,
 * junction congestion alerts, and heatmaps across Nagpur city.
 */

const NAGPUR_CENTER = [21.1458, 79.0882];

const DEFAULT_JUNCTIONS = [
  { junction_id: 'J01', junction_name: 'Sitabuldi Junction', latitude: 21.1458, longitude: 79.0882, vehicle_count: 520, average_speed_kmh: 11, congestion_level: 'Critical', risk_score: 0.89 },
  { junction_id: 'J02', junction_name: 'Automotive Square', latitude: 21.1850, longitude: 79.0950, vehicle_count: 460, average_speed_kmh: 14, congestion_level: 'Critical', risk_score: 0.76 },
  { junction_id: 'J03', junction_name: 'Rahate Colony Square', latitude: 21.1242, longitude: 79.0763, vehicle_count: 380, average_speed_kmh: 22, congestion_level: 'Medium', risk_score: 0.55 },
];

function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center && Array.isArray(center) && center.length === 2) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);
  return null;
}

function createTacticalIcon(risk, isSelected, isCritical) {
  const colorClass = isCritical ? 'text-red-500 border-red-500' : risk >= 40 ? 'text-amber-500 border-amber-500' : 'text-emerald-500 border-emerald-500';
  return L.divIcon({
    className: 'tactical-custom-marker',
    html: `<div class="flex items-center justify-center w-7 h-7 rounded-full bg-[#151B26] border ${isSelected ? 'border-cyan-400 scale-125 shadow-[0_0_15px_rgba(34,211,238,0.6)]' : colorClass} text-xs font-bold font-mono">${Math.round(risk)}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

export default function TrafficMap({ junctions = DEFAULT_JUNCTIONS, selectedJunction = null, onSelectJunction = () => {} }) {
  const mapJunctions = junctions && junctions.length > 0 ? junctions : DEFAULT_JUNCTIONS;
  const mapCenter = selectedJunction?.latitude && selectedJunction?.longitude
    ? [selectedJunction.latitude, selectedJunction.longitude]
    : NAGPUR_CENTER;

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden min-h-[300px]">
      <MapContainer
        center={NAGPUR_CENTER}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
        style={{ background: '#0B0E14', height: '100%', width: '100%' }}
      >
        <RecenterMap center={mapCenter} />

        {/* Dark Matter / Tactical Map Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {/* Junction Pulse Markers */}
        {mapJunctions.map((j) => {
          const isSelected = selectedJunction?.junction_id === j.junction_id;
          const riskScoreVal = j.risk_score != null ? j.risk_score : 0.5;
          const icon = createTacticalIcon(riskScoreVal * 100, isSelected, riskScoreVal >= 0.7);

          return (
            <React.Fragment key={j.junction_id || j.id || Math.random()}>
              {/* Coverage Circle */}
              <CircleMarker
                center={[j.latitude || j.lat || NAGPUR_CENTER[0], j.longitude || j.lng || NAGPUR_CENTER[1]]}
                radius={riskScoreVal >= 0.7 ? 35 : 20}
                pathOptions={{
                  color: riskScoreVal >= 0.7 ? '#EF4444' : riskScoreVal >= 0.4 ? '#F59E0B' : '#10B981',
                  fillColor: riskScoreVal >= 0.7 ? '#EF4444' : riskScoreVal >= 0.4 ? '#F59E0B' : '#10B981',
                  fillOpacity: isSelected ? 0.35 : 0.15,
                  weight: isSelected ? 2 : 1,
                }}
              />

              <Marker
                position={[j.latitude || j.lat || NAGPUR_CENTER[0], j.longitude || j.lng || NAGPUR_CENTER[1]]}
                icon={icon}
                eventHandlers={{
                  click: () => onSelectJunction(j),
                }}
              >
                <Popup className="tactical-leaflet-popup">
                  <div className="p-1 bg-[#151B26] text-slate-100 rounded-lg text-left font-mono">
                    <div className="font-bold text-xs text-cyan-400 uppercase tracking-wide border-b border-[#232F42] pb-1 mb-1.5 flex items-center justify-between">
                      <span>{j.junction_name || j.name}</span>
                      <span className="text-[10px] text-slate-400">ID: {j.junction_id || j.id}</span>
                    </div>
                    <div className="text-[11px] space-y-1">
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-400">Risk Score:</span>
                        <span className={`font-bold ${riskScoreVal >= 0.7 ? 'text-red-400' : riskScoreVal >= 0.4 ? 'text-amber-400' : 'text-emerald-400'}`}>
                          {Math.round(riskScoreVal * 100)} / 100
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-400">Vehicle Count:</span>
                        <span className="text-slate-100">{j.vehicle_count || j.traffic_volume || 300} veh/hr</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-400">Avg Speed:</span>
                        <span className="text-slate-100">{j.average_speed_kmh || 18} km/h</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-400">Congestion:</span>
                        <span className="text-slate-100 uppercase">{j.congestion_level || (riskScoreVal >= 0.7 ? 'Critical' : 'Moderate')}</span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </React.Fragment>
          );
        })}
      </MapContainer>
    </div>
  );
}
