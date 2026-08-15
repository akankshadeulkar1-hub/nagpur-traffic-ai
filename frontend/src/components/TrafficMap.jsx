import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Navigation, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

/**
 * Custom Helper to update Leaflet view centered on active selected node
 */
function RecenterMap({ center }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.flyTo(center, 13.5, { duration: 1.2 });
    }
  }, [center, map]);
  return null;
}

// Function to generate custom glowing div icon with pulse ring for Leaflet map
const createTacticalIcon = (riskScore, isSelected, isIncidentNode) => {
  let colorClass = "bg-emerald-500 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.8)]";
  let pulseClass = "border-emerald-500/40";
  if (riskScore >= 70) {
    colorClass = "bg-red-500 border-red-400 shadow-[0_0_25px_rgba(239,68,68,0.9)] animate-pulse";
    pulseClass = "border-red-500/60 animate-ping";
  } else if (riskScore >= 40) {
    colorClass = "bg-amber-500 border-amber-400 shadow-[0_0_18px_rgba(245,158,11,0.8)]";
    pulseClass = "border-amber-500/50";
  }

  const selectedRing = isSelected ? "ring-4 ring-cyan-400 ring-offset-2 ring-offset-black scale-125" : "";

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div class="relative flex items-center justify-center w-8 h-8">
        <div class="absolute w-10 h-10 rounded-full border-2 ${pulseClass} pointer-events-none"></div>
        <div class="w-6 h-6 rounded-full ${colorClass} ${selectedRing} flex items-center justify-center text-[10px] font-mono font-bold text-black border-2 transition-all">
          ${Math.round(riskScore)}
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

export default function TrafficMap({ junctions, selectedJunction, onSelectJunction }) {
  const nagpurCenter = [21.1458, 79.0882];
  const mapCenter = selectedJunction ? [selectedJunction.latitude, selectedJunction.longitude] : nagpurCenter;

  return (
    <div className="relative w-full h-[520px] rounded-2xl border border-[#232F42] bg-[#0D1117] overflow-hidden shadow-2xl">
      
      {/* Top Map Overlay Banner */}
      <div className="absolute top-4 left-4 z-[1000] flex items-center gap-3 px-4 py-2 rounded-xl bg-[#151B26]/90 border border-[#232F42] backdrop-blur-md shadow-lg">
        <Navigation className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
        <div className="text-left">
          <div className="text-xs font-mono font-bold text-slate-100 uppercase tracking-wider">
            Nagpur Urban Telemetry Map
          </div>
          <div className="text-[10px] font-mono text-cyan-400">
            {junctions.length} JUNCTION NODES ACTIVE • REAL-TIME RADAR
          </div>
        </div>
      </div>

      {/* Map Legend Floating Bottom Right */}
      <div className="absolute bottom-4 right-4 z-[1000] flex items-center gap-3 px-3.5 py-2 rounded-xl bg-[#151B26]/90 border border-[#232F42] backdrop-blur-md text-[11px] font-mono text-slate-300 shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>Clear (0-39)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
          <span>Moderate (40-69)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
          <span>Critical (70-100)</span>
        </div>
      </div>

      {/* React Leaflet Container with Dark Tile Theme */}
      <MapContainer
        center={nagpurCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
        style={{ background: '#0B0E14' }}
      >
        <RecenterMap center={mapCenter} />

        {/* Dark Matter / Tactical Map Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          maxZoom={19}
        />

        {/* Junction Pulse Markers */}
        {junctions.map((j) => {
          const isSelected = selectedJunction?.junction_id === j.junction_id;
          const icon = createTacticalIcon(j.risk_score * 100, isSelected, j.risk_score >= 0.7);

          return (
            <React.Fragment key={j.junction_id}>
              {/* Coverage Circle */}
              <CircleMarker
                center={[j.latitude, j.longitude]}
                radius={j.risk_score >= 0.7 ? 35 : 20}
                pathOptions={{
                  color: j.risk_score >= 0.7 ? '#EF4444' : j.risk_score >= 0.4 ? '#F59E0B' : '#10B981',
                  fillColor: j.risk_score >= 0.7 ? '#EF4444' : j.risk_score >= 0.4 ? '#F59E0B' : '#10B981',
                  fillOpacity: isSelected ? 0.35 : 0.15,
                  weight: isSelected ? 2 : 1,
                }}
              />

              <Marker
                position={[j.latitude, j.longitude]}
                icon={icon}
                eventHandlers={{
                  click: () => onSelectJunction(j),
                }}
              >
                <Popup className="tactical-leaflet-popup">
                  <div className="p-1 bg-[#151B26] text-slate-100 rounded-lg text-left font-mono">
                    <div className="font-bold text-xs text-cyan-400 uppercase tracking-wide border-b border-[#232F42] pb-1 mb-1.5 flex items-center justify-between">
                      <span>{j.junction_name}</span>
                      <span className="text-[10px] text-slate-400">ID: {j.junction_id}</span>
                    </div>
                    <div className="text-[11px] space-y-1">
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-400">Risk Score:</span>
                        <span className={`font-bold ${
                          j.risk_score >= 0.7 ? 'text-red-400' : j.risk_score >= 0.4 ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          {Math.round(j.risk_score * 100)} / 100
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-400">Vehicle Count:</span>
                        <span className="text-slate-100">{j.vehicle_count} veh/hr</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-400">Avg Speed:</span>
                        <span className="text-slate-100">{j.average_speed_kmh} km/h</span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-slate-400">Congestion:</span>
                        <span className="text-slate-100 uppercase">{j.congestion_level}</span>
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
