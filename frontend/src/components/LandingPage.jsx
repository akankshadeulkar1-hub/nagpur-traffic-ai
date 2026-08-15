import React, { useState, useEffect } from 'react';
import { Shield, Clock, CloudRain, Users, ArrowDown, Radio } from 'lucide-react';

/**
 * Screen 2: Clean Introductory / Landing Page (No Metric Cards)
 * Clean, focused layout with top widgets (Live Clock, Weather 34°C, Active Officers 3/50),
 * typewriter title, fade-in subtext, and prominent button "AUTHORIZE & ENTER COMMAND PORTAL ↓".
 */
export default function LandingPage({ onProceedToAuth, onResetToSplash }) {
  const fullTitle = "Predictive Dispatch & Real-Time Traffic Defense System";
  const [typedTitle, setTypedTitle] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [timeString, setTimeString] = useState('');

  // Clock update
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const dateStr = now.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' }).toUpperCase();
      const timeStr = now.toLocaleTimeString('en-US', { hour12: false });
      setTimeString(`${timeStr} | ${dateStr}`);
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Typewriter effect
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullTitle.length) {
        setTypedTitle(fullTitle.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setIsTypingComplete(true);
      }
    }, 30);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between bg-[#0D1117] bg-tactical-grid bg-tactical-radial text-white overflow-hidden">
      
      {/* Background Subtle Accent Glows */}
      <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-[#22D3EE]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#FA5252]/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Header Bar */}
      <header className="sticky top-0 z-30 w-full bg-[#121620]/95 backdrop-blur-md border-b border-[#1F2633] px-4 md:px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Left: Police Emblem + Title */}
          <div 
            onClick={onResetToSplash}
            className="flex items-center gap-3.5 cursor-pointer group"
            title="Click to replay Splash Gateway"
          >
            <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-[#151922] border border-[#22D3EE]/50 text-[#22D3EE] group-hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all">
              <Shield className="w-6 h-6 text-[#22D3EE]" />
              <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#10B981] animate-ping"></div>
            </div>
            <div className="text-left">
              <div className="text-[10px] font-mono tracking-widest text-[#8B949E] uppercase">
                TRAFFIC CONTROL WING · GOVT. OF MAHARASHTRA
              </div>
              <div className="text-sm sm:text-base font-black tracking-wide text-white uppercase group-hover:text-[#22D3EE] transition-colors">
                NAGPUR SMART TRAFFIC COMMAND CENTER
              </div>
            </div>
          </div>

          {/* Center/Right Status Widgets */}
          <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-center">
            
            {/* AI SYSTEM ACTIVE Green Badge Pill */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#10B981]/15 border border-[#10B981]/40 text-[#10B981] text-xs font-mono font-bold shadow-[0_0_12px_rgba(16,185,129,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse"></span>
              <span className="tracking-wider">● AI SYSTEM ACTIVE</span>
            </div>

            {/* Live Clock Status Block */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#121620] border border-[#1F2633] text-[#8B949E] text-xs font-mono">
              <Clock className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span className="text-white font-medium">{timeString || '14:00:19 | SAT, 15 AUG'}</span>
            </div>

            {/* Weather Alert Widget */}
            <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-amber-950/40 border border-[#FAB005]/40 text-[#FAB005] text-xs font-mono font-medium">
              <CloudRain className="w-3.5 h-3.5 text-[#FAB005]" />
              <span>34°C HEAVY RAIN ALERT</span>
            </div>

            {/* Active Officers Widget */}
            <div className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#121620] border border-[#1F2633] text-[#8B949E] text-xs font-mono">
              <Users className="w-3.5 h-3.5 text-[#22D3EE]" />
              <span>OFFICERS: <strong className="text-white">3/50</strong></span>
            </div>

          </div>

        </div>
      </header>

      {/* Main Hero Content (Clean, Focused Layout without Metric Cards) */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 py-16 text-center space-y-8 flex-grow flex flex-col items-center justify-center">
        
        {/* Top Protocol Monospace Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#151922] border border-[#22D3EE]/40 text-[#22D3EE] text-xs font-mono tracking-widest uppercase shadow-md">
          <Radio className="w-3.5 h-3.5 text-[#22D3EE] animate-pulse" />
          <span>NAGPUR URBAN TRAFFIC CONTROL NETWORK · CLASSIFIED PROTOCOL</span>
        </div>

        {/* Main Headline with Typewriter Animation */}
        <div className="space-y-4 max-w-3xl mx-auto min-h-[120px] sm:min-h-[140px] flex items-center justify-center">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
            <span>{typedTitle}</span>
            {!isTypingComplete && <span className="typewriter-cursor"></span>}
          </h1>
        </div>

        {/* Subtext: Fade-in after headline typing completes */}
        <div className="min-h-[70px] max-w-2xl mx-auto">
          {isTypingComplete && (
            <p className="text-[#8B949E] text-base sm:text-lg leading-relaxed font-normal animate-fade-in-up">
              Automated congestion risk-scoring, real-time officer dispatch, and explainable incident response engineered for the Nagpur Urban Traffic Control Network.
            </p>
          )}
        </div>

        {/* Primary Action Button: AUTHORIZE & ENTER COMMAND PORTAL ↓ */}
        <div className="pt-6 w-full max-w-md mx-auto">
          <button
            onClick={onProceedToAuth}
            className="w-full flex items-center justify-center gap-3 bg-[#FA5252] hover:bg-red-400 text-white font-black text-base font-mono tracking-wider uppercase py-4.5 px-8 rounded-2xl shadow-[0_0_35px_rgba(250,82,82,0.5)] hover:shadow-[0_0_50px_rgba(250,82,82,0.8)] transition-all duration-300 active:scale-[0.98] cursor-pointer group"
          >
            <span>AUTHORIZE & ENTER COMMAND PORTAL</span>
            <ArrowDown className="w-6 h-6 stroke-[3] group-hover:translate-y-1 transition-transform" />
          </button>
        </div>

      </main>

      {/* Footer */}
      <footer className="w-full bg-[#121620] border-t border-[#1F2633] py-3.5 px-6 text-center text-xs font-mono text-[#8B949E]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© 2026 GOVERNMENT OF MAHARASHTRA | NAGPUR TRAFFIC POLICE</span>
          <span>IT ACT 2000 AUDITED • CLASSIFIED LEVEL-3 TELEMETRY</span>
        </div>
      </footer>

    </div>
  );
}
