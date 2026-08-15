import React, { useState, useEffect } from 'react';
import TrafficMap from './TrafficMap';
import { 
  Shield, Clock, CloudRain, Users, Flame, Zap, Sparkles, 
  ArrowRight, Check, X, Layers, Layers3, Radio, RefreshCw, AlertTriangle
} from 'lucide-react';

export default function CommandDashboard({ userSector, badgeId, onLogout }) {
  // Live Clock State
  const [timeString, setTimeString] = useState('');
  const [dateString, setDateString] = useState('');

  // Active Layer State
  const [activeLayer, setActiveLayer] = useState('Heatmap');

  // Hovered Recommendation Card State (for map highlighting)
  const [hoveredCardId, setHoveredCardId] = useState(null);

  // Recommendations Stack State
  const [recommendations, setRecommendations] = useState([
    {
      id: 'REC-SITABULDI',
      junction: 'Sitabuldi Junction',
      priority: 'HIGH PRIORITY ALERT',
      type: 'Dispatch Request',
      badge: 'Badge #204',
      officer: 'Constable Verma',
      fromJunction: 'Law College Square',
      fromRisk: 12,
      toJunction: 'Sitabuldi',
      toRisk: 89,
      status: 'PENDING',
      coords: [21.1458, 79.0882],
    },
    {
      id: 'REC-AUTOMOTIVE',
      junction: 'Automotive Square',
      priority: 'HIGH PRIORITY ALERT',
      type: 'Dispatch Request',
      badge: 'Badge #076',
      officer: 'Constable Khan',
      fromJunction: 'Panchsheel Square',
      fromRisk: 18,
      toJunction: 'Automotive',
      toRisk: 76,
      status: 'PENDING',
      coords: [21.1850, 79.0950],
    },
  ]);

  // High Risk Node Count
  const [highRiskCount, setHighRiskCount] = useState(3);
  const [incidentSimulated, setIncidentSimulated] = useState(false);

  // Junction Data for Map
  const [mapJunctions, setMapJunctions] = useState([
    { junction_id: 'J01', junction_name: 'Sitabuldi Junction', latitude: 21.1458, longitude: 79.0882, vehicle_count: 520, average_speed_kmh: 11, congestion_level: 'Critical', risk_score: 0.89 },
    { junction_id: 'J02', junction_name: 'Automotive Square', latitude: 21.1850, longitude: 79.0950, vehicle_count: 460, average_speed_kmh: 14, congestion_level: 'Critical', risk_score: 0.76 },
    { junction_id: 'J03', junction_name: 'Rahate Colony Square', latitude: 21.1242, longitude: 79.0763, vehicle_count: 380, average_speed_kmh: 22, congestion_level: 'Medium', risk_score: 0.55 },
    { junction_id: 'J06', junction_name: 'Law College Square (Officer Station)', latitude: 21.1430, longitude: 79.0570, vehicle_count: 140, average_speed_kmh: 42, congestion_level: 'Low', risk_score: 0.12, officer: 'Badge #204 (Verma)' },
    { junction_id: 'J07', junction_name: 'Panchsheel Square (Officer Station)', latitude: 21.1380, longitude: 79.0820, vehicle_count: 160, average_speed_kmh: 38, congestion_level: 'Low', risk_score: 0.18, officer: 'Badge #076 (Khan)' },
  ]);

  // Selected Junction on Map
  const [selectedJunction, setSelectedJunction] = useState(mapJunctions[0]);

  // Clock Update Effect (every second)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
      const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase();
      setTimeString(timeStr);
      setDateString(dateStr);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Simulate Incident Handler
  const handleSimulateIncident = () => {
    if (incidentSimulated) return;

    setIncidentSimulated(true);
    setHighRiskCount((prev) => prev + 1);

    // Add new emergency node to map
    const newEmergencyNode = {
      junction_id: 'J-EMERGENCY',
      junction_name: 'Medical Sq Corridor (Incident)',
      latitude: 21.1347,
      longitude: 79.0984,
      vehicle_count: 610,
      average_speed_kmh: 6,
      congestion_level: 'Critical',
      risk_score: 0.96,
    };

    setMapJunctions((prev) => [newEmergencyNode, ...prev]);
    setSelectedJunction(newEmergencyNode);

    // Spawn 3rd Critical Alert Card in Right Panel
    const newRecommendation = {
      id: `REC-INCIDENT-${Date.now()}`,
      junction: 'Medical Sq Corridor',
      priority: 'CRITICAL EMERGENCY INCIDENT',
      type: 'Immediate Reroute & Dispatch',
      badge: 'Badge #112',
      officer: 'Constable Patil',
      fromJunction: 'Sadar Division',
      fromRisk: 15,
      toJunction: 'Medical Sq',
      toRisk: 96,
      status: 'PENDING',
      coords: [21.1347, 79.0984],
    };

    setRecommendations((prev) => [newRecommendation, ...prev]);
  };

  // Reset Incident Simulation
  const handleResetIncident = () => {
    setIncidentSimulated(false);
    setHighRiskCount(3);
    setMapJunctions([
      { junction_id: 'J01', junction_name: 'Sitabuldi Junction', latitude: 21.1458, longitude: 79.0882, vehicle_count: 520, average_speed_kmh: 11, congestion_level: 'Critical', risk_score: 0.89 },
      { junction_id: 'J02', junction_name: 'Automotive Square', latitude: 21.1850, longitude: 79.0950, vehicle_count: 460, average_speed_kmh: 14, congestion_level: 'Critical', risk_score: 0.76 },
      { junction_id: 'J03', junction_name: 'Rahate Colony Square', latitude: 21.1242, longitude: 79.0763, vehicle_count: 380, average_speed_kmh: 22, congestion_level: 'Medium', risk_score: 0.55 },
      { junction_id: 'J06', junction_name: 'Law College Square (Officer Station)', latitude: 21.1430, longitude: 79.0570, vehicle_count: 140, average_speed_kmh: 42, congestion_level: 'Low', risk_score: 0.12, officer: 'Badge #204 (Verma)' },
      { junction_id: 'J07', junction_name: 'Panchsheel Square (Officer Station)', latitude: 21.1380, longitude: 79.0820, vehicle_count: 160, average_speed_kmh: 38, congestion_level: 'Low', risk_score: 0.18, officer: 'Badge #076 (Khan)' },
    ]);
    setRecommendations([
      {
        id: 'REC-SITABULDI',
        junction: 'Sitabuldi Junction',
        priority: 'HIGH PRIORITY ALERT',
        type: 'Dispatch Request',
        badge: 'Badge #204',
        officer: 'Constable Verma',
        fromJunction: 'Law College Square',
        fromRisk: 12,
        toJunction: 'Sitabuldi',
        toRisk: 89,
        status: 'PENDING',
        coords: [21.1458, 79.0882],
      },
      {
        id: 'REC-AUTOMOTIVE',
        junction: 'Automotive Square',
        priority: 'HIGH PRIORITY ALERT',
        type: 'Dispatch Request',
        badge: 'Badge #076',
        officer: 'Constable Khan',
        fromJunction: 'Panchsheel Square',
        fromRisk: 18,
        toJunction: 'Automotive',
        toRisk: 76,
        status: 'PENDING',
        coords: [21.1850, 79.0950],
      },
    ]);
  };

  const handleAcceptRecommendation = (id) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'ACCEPTED' } : r))
    );
  };

  const handleDismissRecommendation = (id) => {
    setRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'DISMISSED' } : r))
    );
  };

  const pendingCount = recommendations.filter((r) => r.status === 'PENDING').length;

  return (
    <div className="w-full min-h-screen bg-[#0B0E14] text-white p-3 sm:p-5 space-y-4 selection:bg-[#22D3EE] selection:text-black">
      
      {/* 1. Header Bar (Full Width) */}
      <header className="w-full bg-[#151922] border border-[#212936] rounded-xl p-3 sm:p-4 shadow-2xl text-left space-y-3">
        
        {/* Top Row: Emblem + Title + Green AI Pill Badge */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          
          <div className="flex items-center gap-3">
            {/* Emblem Placeholder */}
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#10141D] border border-[#22D3EE]/40 text-[#22D3EE] shadow-[0_0_15px_rgba(34,211,238,0.25)] shrink-0">
              <Shield className="w-5 h-5 text-[#22D3EE]" />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-black text-white uppercase tracking-wide">
                  NAGPUR SMART TRAFFIC COMMAND CENTER
                </h1>
                
                {/* AI SYSTEM ACTIVE Green Badge */}
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] text-[11px] font-mono font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
                  <span>● AI SYSTEM ACTIVE</span>
                </div>
              </div>

              <div className="text-xs text-slate-400 font-mono mt-0.5">
                TRAFFIC CONTROL WING · GOVT. OF MAHARASHTRA
              </div>
            </div>
          </div>

          {/* User Sector & Logout Button */}
          <div className="flex items-center gap-3 self-end md:self-auto">
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">
              Sector: <strong className="text-[#22D3EE]">{userSector || 'Sitabuldi Zone'}</strong>
            </span>
            <button
              onClick={onLogout}
              className="text-xs font-mono font-bold text-red-400 hover:text-white bg-[#10141D] hover:bg-red-950/60 border border-red-500/40 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              LOCK GATEWAY
            </button>
          </div>

        </div>

        {/* Bottom Metrics & Action Row (Grid of Dark Capsules) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 pt-1">
          
          {/* Widget 1: Clock */}
          <div className="bg-[#10141D] border border-[#1D2433] rounded-xl px-3 py-2 flex items-center gap-2.5">
            <Clock className="w-4 h-4 text-[#22D3EE] shrink-0" />
            <div className="text-left font-mono">
              <div className="text-sm font-bold text-white leading-tight">
                {timeString || '14:14:56'}
              </div>
              <div className="text-[10px] text-slate-400 uppercase">
                {dateString || 'SAT, 15 AUG'}
              </div>
            </div>
          </div>

          {/* Widget 2: Weather */}
          <div className="bg-[#10141D] border border-[#1D2433] rounded-xl px-3 py-2 flex items-center gap-2.5">
            <CloudRain className="w-4 h-4 text-[#FAB005] shrink-0" />
            <div className="text-left font-mono">
              <div className="text-sm font-bold text-[#FAB005] leading-tight">
                34°C
              </div>
              <div className="text-[10px] text-[#FAB005] font-semibold uppercase">
                HEAVY RAIN ALERT
              </div>
            </div>
          </div>

          {/* Widget 3: Active Officers */}
          <div className="bg-[#10141D] border border-[#1D2433] rounded-xl px-3 py-2 flex items-center gap-2.5">
            <Users className="w-4 h-4 text-[#22D3EE] shrink-0" />
            <div className="text-left font-mono">
              <div className="text-sm font-bold text-[#22D3EE] leading-tight">
                3/50
              </div>
              <div className="text-[10px] text-slate-400 uppercase">
                OFFICERS DEPLOYED
              </div>
            </div>
          </div>

          {/* Widget 4: High-Risk Nodes */}
          <div className="bg-[#10141D] border border-[#1D2433] rounded-xl px-3 py-2 flex items-center gap-2.5">
            <Flame className="w-4 h-4 text-[#FA5252] fill-[#FA5252] shrink-0 animate-bounce" />
            <div className="text-left font-mono">
              <div className="text-sm font-bold text-[#FA5252] leading-tight">
                {highRiskCount}
              </div>
              <div className="text-[10px] text-slate-400 uppercase">
                HIGH-RISK NODES
              </div>
            </div>
          </div>

          {/* Widget 5: Primary Action Button (Right Aligned) */}
          <div className="col-span-2 sm:col-span-1 flex items-center justify-end">
            {incidentSimulated ? (
              <button
                onClick={handleResetIncident}
                className="w-full h-full flex items-center justify-center gap-2 bg-[#151922] hover:bg-slate-800 border border-slate-600 text-white font-mono text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer"
              >
                <RefreshCw className="w-4 h-4" />
                <span>RESET INCIDENT</span>
              </button>
            ) : (
              <button
                onClick={handleSimulateIncident}
                className="w-full h-full flex items-center justify-center gap-2 bg-[#FA5252] hover:bg-red-400 text-white font-mono text-xs font-black tracking-wider uppercase px-4 py-2.5 rounded-xl shadow-[0_0_20px_rgba(250,82,82,0.35)] hover:shadow-[0_0_30px_rgba(250,82,82,0.7)] transition-all duration-200 cursor-pointer active:scale-95"
              >
                <Zap className="w-4 h-4 fill-white" />
                <span>⚡ SIMULATE INCIDENT</span>
              </button>
            )}
          </div>

        </div>

      </header>

      {/* 2. Main Grid View (Split Screen: 65% Left / 35% Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
        
        {/* A. Left Panel: Live Tactical Map — Nagpur (65% Width / lg:col-span-8) */}
        <div className="lg:col-span-8 relative bg-[#151922] border border-[#212936] rounded-xl overflow-hidden shadow-2xl flex flex-col h-[640px]">
          
          {/* Panel Header Bar */}
          <div className="bg-[#10141D] border-b border-[#212936] px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
            
            {/* Title */}
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping"></span>
              <span className="text-xs sm:text-sm font-mono font-bold text-white uppercase tracking-wider">
                ● LIVE TACTICAL MAP — NAGPUR
              </span>
            </div>

            {/* Right Layer Controls (Capsule Button Group) */}
            <div className="flex items-center gap-1 bg-[#151922] p-1 rounded-lg border border-[#212936] text-xs font-mono">
              <button
                onClick={() => setActiveLayer('Heatmap')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeLayer === 'Heatmap'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Heatmap
              </button>
              <button
                onClick={() => setActiveLayer('Officers')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeLayer === 'Officers'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Officers
              </button>
              <button
                onClick={() => setActiveLayer('Incidents')}
                className={`px-3 py-1 rounded-md transition-all cursor-pointer ${
                  activeLayer === 'Incidents'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Incidents
              </button>
              <button
                onClick={() => setActiveLayer('Baseline')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  activeLayer === 'Baseline'
                    ? 'bg-white text-black font-bold shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                ⧉ Baseline Split
              </button>
            </div>

          </div>

          {/* Interactive Dark Map Canvas (Leaflet Map) */}
          <div className="relative flex-grow w-full h-full">
            <TrafficMap
              junctions={mapJunctions}
              selectedJunction={selectedJunction}
              onSelectJunction={setSelectedJunction}
            />

            {/* Bottom-Left Floating Legend ("RISK INDEX") */}
            <div className="absolute bottom-4 left-4 z-[1000] bg-[#10141D]/90 backdrop-blur-md border border-[#212936] rounded-xl p-3 text-left text-xs font-mono space-y-2 shadow-2xl max-w-[200px]">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest border-b border-[#212936] pb-1">
                RISK INDEX
              </div>
              <div className="space-y-1.5 text-[11px]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FA5252] animate-pulse"></span>
                  <span className="text-white font-medium">Critical (70–100)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FAB005]"></span>
                  <span className="text-slate-300">Warning (40–69)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></span>
                  <span className="text-slate-300">Clear (0–39)</span>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* B. Right Panel: AI Smart Recommendations (35% Width / lg:col-span-4) */}
        <div className="lg:col-span-4 bg-[#151922] border border-[#212936] rounded-xl p-4 text-left shadow-2xl flex flex-col h-[640px]">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#212936]">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-[#22D3EE]" />
              <h2 className="text-base font-bold text-white">
                AI Smart Recommendations
              </h2>
            </div>

            {/* Amber Badge */}
            <div className="bg-[#FAB005]/20 text-[#FAB005] border border-[#FAB005]/30 rounded-full px-2.5 py-0.5 text-xs font-mono font-bold">
              {pendingCount} Pending
            </div>
          </div>

          {/* Recommendations Cards Stack */}
          <div className="space-y-3.5 overflow-y-auto pr-1 flex-grow">
            {recommendations.map((rec) => {
              const isPending = rec.status === 'PENDING';
              const isAccepted = rec.status === 'ACCEPTED';
              const isDismissed = rec.status === 'DISMISSED';
              const isHovered = hoveredCardId === rec.id;

              return (
                <div
                  key={rec.id}
                  onMouseEnter={() => {
                    setHoveredCardId(rec.id);
                    setSelectedJunction({
                      junction_id: rec.id,
                      junction_name: rec.junction,
                      latitude: rec.coords[0],
                      longitude: rec.coords[1],
                      risk_score: rec.toRisk / 100,
                    });
                  }}
                  onMouseLeave={() => setHoveredCardId(null)}
                  className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                    isHovered
                      ? 'border-[#22D3EE] shadow-[0_0_20px_rgba(34,211,238,0.25)] bg-[#10141D]'
                      : isAccepted
                      ? 'bg-[#10B981]/10 border-[#10B981]/40'
                      : isDismissed
                      ? 'bg-slate-900/40 border-slate-800 opacity-60'
                      : 'bg-[#151922] border-[#212936] hover:border-[#22D3EE]/50'
                  }`}
                >
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-xs font-mono mb-1.5">
                    <div className="flex items-center gap-1.5 text-[#FA5252] font-bold">
                      <span className="w-2 h-2 rounded-full bg-[#FA5252] animate-ping"></span>
                      <span>{rec.priority}</span>
                    </div>
                    <span className="text-[#8B949E] text-[11px]">{rec.type}</span>
                  </div>

                  {/* Heading */}
                  <h3 className="text-base font-bold text-white mb-0.5">
                    {rec.junction}
                  </h3>

                  {/* Subtitle */}
                  <div className="text-[10px] font-mono text-[#8B949E] uppercase tracking-wider mb-3">
                    SUGGESTED ACTION
                  </div>

                  {/* Action Container */}
                  <div className="bg-[#10141D] rounded-lg p-3 flex items-center justify-between border border-[#1D2433] gap-2 mb-3">
                    
                    {/* Left: Officer Badge */}
                    <div className="text-left font-mono">
                      <div className="inline-block bg-[#002B49] text-[#22D3EE] border border-[#22D3EE]/40 px-2 py-0.5 rounded text-[11px] font-bold mb-1">
                        {rec.badge}
                      </div>
                      <div className="text-xs text-white font-medium">
                        {rec.officer}
                      </div>
                    </div>

                    {/* Middle: Arrow */}
                    <ArrowRight className="w-4 h-4 text-[#8B949E] shrink-0" />

                    {/* Right Column: Junction Risks */}
                    <div className="text-right font-mono text-[11px] space-y-1">
                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-[#8B949E]">{rec.fromJunction}</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/30 font-bold">
                          {rec.fromRisk}
                        </span>
                      </div>

                      <div className="flex items-center justify-end gap-1.5">
                        <span className="text-white font-bold">{rec.toJunction}</span>
                        <span className="px-1.5 py-0.5 rounded bg-[#FA5252]/20 text-[#FA5252] border border-[#FA5252]/30 font-bold">
                          {rec.toRisk}
                        </span>
                      </div>
                    </div>

                  </div>

                  {/* Action Buttons */}
                  {isPending && (
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDismissRecommendation(rec.id)}
                        className="flex items-center gap-1 text-xs font-mono text-[#8B949E] hover:text-red-400 px-3 py-1.5 rounded-lg border border-[#212936] bg-[#10141D] hover:bg-slate-900 transition-all cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" /> Dismiss
                      </button>
                      <button
                        onClick={() => handleAcceptRecommendation(rec.id)}
                        className="flex items-center gap-1.5 text-xs font-mono font-bold text-black bg-[#10B981] hover:bg-emerald-400 px-4 py-1.5 rounded-lg shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all cursor-pointer active:scale-95"
                      >
                        <Check className="w-4 h-4 stroke-[3]" /> Accept & Dispatch
                      </button>
                    </div>
                  )}

                  {isAccepted && (
                    <div className="text-[11px] font-mono font-bold text-[#10B981] text-right">
                      ✓ EXECUTED & DISPATCHED
                    </div>
                  )}

                  {isDismissed && (
                    <div className="text-[11px] font-mono text-[#8B949E] text-right">
                      ✕ DISMISSED
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </div>

      </div>

    </div>
  );
}
