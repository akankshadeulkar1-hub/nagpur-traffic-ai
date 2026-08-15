/**
 * App.jsx - Nagpur Traffic Control Room Dashboard
 * ------------------------------------------------
 * Purpose: Real-time control room dashboard layout pairing live Nagpur city traffic map
 * telemetry with Explainable AI (XAI) dispatch recommendations.
 */

import React from 'react';
import TrafficMap from './components/TrafficMap';
import Alerts from './components/Alerts';

function App() {
  return (
    <div className="flex h-screen w-screen bg-slate-900 text-white overflow-hidden font-sans">
      {/* Left Main Section (75% Width): Header & Traffic Map */}
      <div className="w-[75%] h-full flex flex-col p-4 border-r border-slate-700/80 box-border gap-4">
        {/* Command Center Header */}
        <header className="bg-slate-800/90 backdrop-blur-md border border-slate-700/80 px-6 py-4 rounded-xl flex items-center justify-between shadow-lg shrink-0">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100">
              Nagpur Traffic Command Center
            </h1>
            <span className="hidden sm:inline-block bg-slate-700/60 text-slate-300 text-xs font-semibold px-2.5 py-1 rounded-md border border-slate-600/50">
              AI Monitoring System
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs md:text-sm text-slate-400 font-medium">
            <div className="flex items-center gap-2 bg-slate-900/60 px-3 py-1.5 rounded-lg border border-slate-700/50">
              <span className="text-slate-400">Region:</span>
              <span className="text-slate-200 font-semibold">Nagpur Urban (MH-31)</span>
            </div>
          </div>
        </header>

        {/* Live Traffic Map Container */}
        <div className="flex-1 w-full relative min-h-0">
          <TrafficMap />
        </div>
      </div>

      {/* Right Sidebar Section (25% Width): XAI Recommendations */}
      <div className="w-[25%] h-full p-4 box-border min-h-0">
        <Alerts />
      </div>
    </div>
  );
}

export default App;
