import React, { useState, useEffect } from 'react';
import { Shield, Clock, Lock, UserCheck, AlertTriangle, Radio } from 'lucide-react';

/**
 * Header Component
 * Top Navigation Bar with Govt Insignia, Live HH:MM:SS clock, AI Status indicator, and Sign In trigger.
 */
export default function Header({ isAuthenticated, onSignInClick, onLogout, onResetToSplash }) {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString('en-US', { hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0D1117]/90 backdrop-blur-md border-b border-[#232F42] px-4 md:px-8 py-3.5 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
        
        {/* Left Side: Police Badge & Insignia */}
        <div 
          onClick={onResetToSplash}
          className="flex items-center gap-3 cursor-pointer group"
          title="Click to replay Splash Gateway"
        >
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#151B26] border border-cyan-500/40 text-cyan-400 group-hover:border-cyan-400 group-hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all">
            <Shield className="w-5 h-5 text-cyan-400" />
            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              <span>GOVERNMENT OF MAHARASHTRA</span>
              <span className="text-slate-600">|</span>
              <span className="text-cyan-400">NAGPUR POLICE</span>
            </div>
            <div className="text-sm md:text-base font-extrabold tracking-wide text-slate-100 uppercase group-hover:text-cyan-300 transition-colors">
              Nagpur Traffic Command
            </div>
          </div>
        </div>

        {/* Right Side: Status Badges, Live Clock & Auth Button */}
        <div className="flex items-center gap-3 md:gap-5 flex-wrap justify-center">
          
          {/* Green AI System Active Pill Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-medium shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="tracking-wide">AI SYSTEM ACTIVE</span>
          </div>

          {/* Live Clock Badge */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#151B26] border border-[#232F42] text-slate-300 text-xs font-mono">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>{timeString || '13:40:00'} IST</span>
          </div>

          {/* Connection Latency */}
          <div className="hidden lg:flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
            <Radio className="w-3.5 h-3.5 text-emerald-400" />
            <span>24ms LATENCY</span>
          </div>

          {/* Sign In / Log Out Action Button */}
          {isAuthenticated ? (
            <button
              onClick={onLogout}
              className="flex items-center gap-2 bg-[#151B26] hover:bg-red-950/40 border border-red-500/40 hover:border-red-500 text-red-400 text-xs font-mono font-semibold px-4 py-2 rounded-lg transition-all shadow-sm"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>OFFICER LOGOUT</span>
            </button>
          ) : (
            <button
              onClick={onSignInClick}
              className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-mono font-bold px-4 py-2 rounded-lg transition-all duration-200 shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:shadow-[0_0_22px_rgba(56,189,248,0.6)] active:scale-95"
            >
              <Lock className="w-4 h-4 stroke-[2.5]" />
              <span>SECURE SIGN IN</span>
            </button>
          )}

        </div>

      </div>
    </header>
  );
}
