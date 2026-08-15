/**
 * main.jsx - React Entry Point
 * ----------------------------
 * Purpose: Entry point script for the Vite + React frontend dashboard, rendering the root App component.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
