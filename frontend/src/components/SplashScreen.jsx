import React, { useEffect, useState } from 'react';
import { Shield, Lock } from 'lucide-react';

/**
 * Redesigned SplashScreen UI (Screen 1)
 * Matches exact dark tactical command center theme and color palette of Nagpur Traffic Dashboard.
 */
export default function SplashScreen({ onComplete }) {
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 4;
      });
    }, 40);

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 400);
    }, 2400);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0B0E14] transition-all duration-500 ease-in-out ${
        isExiting ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle Pure Neutral Dark Radial Backdrop (No Greenish Tint) */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.05)_0%,rgba(11,14,20,0.98)_75%)] pointer-events-none"></div>

      {/* Skip Button Top Right */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-8 z-20 text-xs font-mono text-[#8B949E] hover:text-[#38BDF8] border border-[#212936] hover:border-[#38BDF8]/50 bg-[#151922]/90 px-4 py-2 rounded-xl transition-all duration-200 backdrop-blur cursor-pointer"
      >
        SKIP INIT [ESC]
      </button>

      <div className="relative z-10 flex flex-col items-center max-w-lg px-6 text-center">
        
        {/* 1. Center Emblem & Tactical Radar Rings */}
        <div className="relative flex items-center justify-center w-48 h-48 mb-8">
          {/* Concentric Radar Rings with Thin Cyan/Emerald Borders */}
          <div className="absolute w-44 h-44 rounded-full border border-[#38BDF8]/15 animate-sonar-pulse pointer-events-none"></div>
          <div className="absolute w-44 h-44 rounded-full border border-[#10B981]/15 animate-sonar-pulse-delayed pointer-events-none"></div>
          <div className="absolute w-52 h-52 rounded-full border border-dashed border-[#38BDF8]/10 animate-spin pointer-events-none" style={{ animationDuration: '20s' }}></div>

          {/* Centered Floating Square Container: Matte Dark Slate #151922 with Sharp Border #212936 & rounded-2xl */}
          <div className="relative z-10 flex items-center justify-center w-32 h-32 rounded-2xl bg-[#151922] border border-[#212936] shadow-[0_0_30px_rgba(56,189,248,0.15)] text-[#38BDF8]">
            <div className="relative flex items-center justify-center">
              <Shield className="w-16 h-16 text-[#38BDF8] drop-shadow-[0_0_16px_rgba(56,189,248,0.7)] animate-pulse" style={{ animationDuration: '3s' }} />
              <Lock className="w-6 h-6 text-[#0B0E14] absolute top-5 stroke-[2.5]" />
            </div>
          </div>
        </div>

        {/* 2. Classification Badge */}
        <div className="mb-4">
          <div className="inline-flex items-center gap-2 bg-[#121620] border border-[#1F2633] text-[#10B981] text-[11px] font-mono tracking-widest px-4 py-1 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-ping"></span>
            <span>● GOVERNMENT OF MAHARASHTRA</span>
          </div>
        </div>

        {/* 3. Title & Subtitle */}
        <div className="space-y-1 mb-8">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-widest uppercase">
            NAGPUR TRAFFIC POLICE
          </h1>
          <p className="text-xs font-mono text-[#8B949E] tracking-[0.25em] mt-1 uppercase">
            AI-DRIVEN DEFENSE & TACTICAL COMMAND GATEWAY
          </p>
        </div>

        {/* 4. Status & Loading Telemetry Bar */}
        <div className="w-full space-y-3 max-w-md">
          {/* Terminal Status Text */}
          <div className="text-xs font-mono text-[#38BDF8] animate-pulse tracking-wider">
            INITIALIZING ZERO-TRUST SECURE GATEWAY...
          </div>

          {/* Progress Bar: 2px height bar with dark track #161B26 and active filler in #38BDF8 */}
          <div className="w-full bg-[#161B26] h-[2px] rounded-full overflow-hidden border border-[#212936]/40">
            <div
              className="bg-[#38BDF8] h-full transition-all duration-100 ease-out shadow-[0_0_10px_rgba(56,189,248,0.8)]"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Bottom Metadata Row */}
          <div className="text-[10px] font-mono text-[#64748B] flex justify-between px-0.5">
            <span>SEC_PROTO: TLS_1.3</span>
            <span>{progress}% GATEWAY ACTIVE</span>
            <span>NODE: NGP-HQ-01</span>
          </div>
        </div>

      </div>
    </div>
  );
}
