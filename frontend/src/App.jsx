/**
 * App.jsx - Main Dashboard Layout
 * ------------------------------
 * Purpose: Main dashboard layout container bringing together TrafficMap, Alerts, and Metrics components
 * for the Nagpur AI-Based Traffic Command System.
 */

import React from 'react';
import TrafficMap from './components/TrafficMap';
import Alerts from './components/Alerts';
import Metrics from './components/Metrics';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Nagpur AI Traffic Command System</h1>
        <p>Real-Time Traffic Monitoring, Risk Scoring & Police Dispatch Optimization</p>
      </header>
      <main className="app-main">
        <section className="map-section">
          <TrafficMap />
        </section>
        <section className="side-section">
          <Alerts />
          <Metrics />
        </section>
      </main>
    </div>
  );
}

export default App;
