/**
 * TrafficMap.jsx - AI Smart Traffic Command System Map Component
 * ---------------------------------------------------------------
 * Purpose: Real-time traffic visualization for Nagpur city featuring dark theme Leaflet tiles,
 * dynamic heat risk markers with red pulse urgency alerts, real-time polling to backend API,
 * and robust mock data fallback.
 */

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './TrafficMap.css';

// Fix default marker icon issues in Leaflet with React/Vite bundlers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Nagpur City Center Coordinates & Initial Zoom
const NAGPUR_COORDINATES = [21.1458, 79.0882];
const DEFAULT_ZOOM = 13;

// Mock Fallback Data for 4 Real Nagpur Junctions
const MOCK_NAGPUR_JUNCTIONS = [
  {
    id: 'j1',
    name: 'Sitabuldi Square',
    lat: 21.1460,
    lng: 79.0880,
    riskScore: 85,
    officerPresent: true,
    congestionLevel: 'High Congestion',
  },
  {
    id: 'j2',
    name: 'RBI Square',
    lat: 21.1530,
    lng: 79.0820,
    riskScore: 65,
    officerPresent: false,
    congestionLevel: 'Moderate Flow',
  },
  {
    id: 'j3',
    name: 'Medical Square',
    lat: 21.1280,
    lng: 79.0960,
    riskScore: 92,
    officerPresent: false,
    congestionLevel: 'Severe Bottleneck',
  },
  {
    id: 'j4',
    name: 'Variety Square',
    lat: 21.1445,
    lng: 79.0825,
    riskScore: 35,
    officerPresent: true,
    congestionLevel: 'Smooth Flow',
  },
];

/**
 * Custom Marker Icon Generator based on Risk Score
 * - riskScore > 80: Red (High Risk) with pulsing urgency animation
 * - 50 <= riskScore <= 80: Yellow/Orange (Warning)
 * - riskScore < 50: Green (Clear)
 */
const getCustomIcon = (riskScore) => {
  let markerColorClass = 'marker-green';
  let pulseElement = '';

  if (riskScore > 80) {
    markerColorClass = 'marker-red';
    pulseElement = '<div class="pulse-animation"></div>';
  } else if (riskScore >= 50) {
    markerColorClass = 'marker-yellow';
  }

  const iconHtml = `
    <div class="custom-traffic-marker ${markerColorClass}">
      ${pulseElement}
      <div class="marker-core">
        <span class="marker-score">${riskScore}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    className: 'custom-traffic-marker-wrapper',
    html: iconHtml,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  });
};

function TrafficMap() {
  const [junctions, setJunctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');

  // Fetch real-time traffic data from backend with fallback handling
  const fetchTrafficData = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/traffic-data');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      // Support array directly or wrapped response object
      const fetchedJunctions = Array.isArray(data)
        ? data
        : data.data || data.junctions || [];

      if (fetchedJunctions.length > 0) {
        setJunctions(fetchedJunctions);
        setIsBackendConnected(true);
      } else {
        throw new Error('Backend returned empty dataset');
      }
    } catch (error) {
      // Fallback mechanism when backend is unreachable or fails
      setJunctions(MOCK_NAGPUR_JUNCTIONS);
      setIsBackendConnected(false);
    } finally {
      setLoading(false);
      setLastUpdated(new Date().toLocaleTimeString());
    }
  };

  // Poll API every 5 seconds
  useEffect(() => {
    fetchTrafficData();
    const pollInterval = setInterval(() => {
      fetchTrafficData();
    }, 5000);

    return () => clearInterval(pollInterval);
  }, []);

  const highRiskCount = junctions.filter((j) => j.riskScore > 80).length;

  return (
    <div className="traffic-map-container">
      {/* Command Center Dashboard Header */}
      <header className="map-header">
        <h2>
          Nagpur Live Traffic Heatmap
          <span className={`live-badge ${isBackendConnected ? 'connected' : 'mock'}`}>
            <span className="dot-pulse"></span>
            {isBackendConnected ? 'LIVE API' : 'MOCK FALLBACK'}
          </span>
        </h2>
        <div className="map-stats-summary">
          <div className="stat-item">
            Junctions: <span>{junctions.length}</span>
          </div>
          <div className="stat-item">
            High Risk: <span style={{ color: '#ef4444' }}>{highRiskCount}</span>
          </div>
          {lastUpdated && (
            <div className="stat-item">
              Updated: <span>{lastUpdated}</span>
            </div>
          )}
        </div>
      </header>

      {/* Map View */}
      <div className="map-view-wrapper">
        {loading && (
          <div className="map-loading-overlay">
            <div className="spinner"></div>
            <p>Initializing Nagpur Traffic Grid...</p>
          </div>
        )}

        <MapContainer
          center={NAGPUR_COORDINATES}
          zoom={DEFAULT_ZOOM}
          scrollWheelZoom={true}
          style={{ width: '100%', height: '100%' }}
        >
          {/* CARTO Dark Matter Tile Layer */}
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            maxZoom={19}
          />

          {/* Dynamic Junction Heatmap Markers */}
          {junctions.map((junction) => {
            const riskClass =
              junction.riskScore > 80
                ? 'high'
                : junction.riskScore >= 50
                ? 'warning'
                : 'clear';

            const riskLabel =
              junction.riskScore > 80
                ? 'High Risk'
                : junction.riskScore >= 50
                ? 'Warning'
                : 'Clear';

            return (
              <Marker
                key={junction.id || junction.name}
                position={[junction.lat, junction.lng]}
                icon={getCustomIcon(junction.riskScore)}
              >
                <Popup>
                  <div className="traffic-popup-content">
                    <div className="popup-header">
                      <h3>{junction.name}</h3>
                      <span className={`risk-badge ${riskClass}`}>{riskLabel}</span>
                    </div>
                    <div className="popup-body">
                      <div className="popup-row">
                        <span className="popup-label">Risk Score:</span>
                        <span className="popup-value" style={{ fontSize: '1rem', fontWeight: '700' }}>
                          {junction.riskScore}/100
                        </span>
                      </div>
                      <div className="popup-row">
                        <span className="popup-label">Officer Deployed:</span>
                        <span className={`officer-badge ${junction.officerPresent ? 'deployed' : 'absent'}`}>
                          {junction.officerPresent ? '✓ Yes' : '✗ No'}
                        </span>
                      </div>
                      {junction.congestionLevel && (
                        <div className="popup-row">
                          <span className="popup-label">Status:</span>
                          <span className="popup-value">{junction.congestionLevel}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Legend Overlay */}
        <div className="map-legend">
          <div className="legend-title">Risk Levels</div>
          <div className="legend-item">
            <span className="legend-color red"></span>
            <span>High Risk (&gt; 80)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color yellow"></span>
            <span>Warning (50 - 80)</span>
          </div>
          <div className="legend-item">
            <span className="legend-color green"></span>
            <span>Clear (&lt; 50)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrafficMap;
