import React, { useState, useEffect } from 'react';
import { Target, Cpu, Clock, Lock, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import LoginCard from './LoginCard';

/**
 * Hero Component - Phase 2 & Phase 3
 * Split layout with typewriter title effect, anti-gravity metric showcase, and embedded protected login card.
 */
export default function Hero({ onAuthenticate, authError, isAuthenticating }) {
  const fullTitle = "Predictive Dispatch & Real-Time Traffic Defense System";
  const [typedTitle, setTypedTitle] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

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
    }, 35);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section className="relative w-full min-h-[calc(100vh-73px)] flex items-center justify-center bg-[#0B0E14] bg-tactical-grid bg-tactical-radial py-10 px-4 md:px-8">
      
      {/* Background Accent Grid & Light Rays */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Side: 55% Width (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Top Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#151B26] border border-cyan-500/30 text-cyan-400 text-xs font-mono tracking-wider shadow-sm">
            <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
            <span>NAGPUR URBAN TRAFFIC CONTROL NETWORK</span>
          </div>

          {/* Headline with Typewriter Animation Effect */}
          <div className="space-y-4 min-h-[120px] sm:min-h-[140px]">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-100 tracking-tight leading-tight">
              <span>{typedTitle}</span>
              {!isTypingComplete && <span className="typewriter-cursor"></span>}
            </h1>
            
            {/* Description Fade-in after title completes typing */}
            <p className={`text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl transition-opacity duration-700 ${
              isTypingComplete ? 'opacity-100' : 'opacity-0'
            }`}>
              Automated congestion risk-scoring, real-time officer dispatch, and explainable incident response engineered for the Nagpur Urban Traffic Control Network.
            </p>
          </div>

          {/* 2x2 Floating Metric Cards Grid (With subtle anti-gravity bobbing) */}
          <div className="grid grid-cols-2 gap-4 sm:gap-5 pt-2">
            
            {/* Metric Card 1 */}
            <div className="tactical-card tactical-card-hover p-4 rounded-xl border border-[#232F42] animate-float-bob">
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30 text-cyan-400">
                  <Target className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-500/30">
                  LIVE
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100 tracking-wide text-glow-cyan">
                42
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                Active Nodes Monitored
              </div>
            </div>

            {/* Metric Card 2 */}
            <div className="tactical-card tactical-card-hover p-4 rounded-xl border border-[#232F42] animate-float-bob-delayed">
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                  <Cpu className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
                  SLA 99.9%
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100 tracking-wide">
                99.98%
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                System Uptime
              </div>
            </div>

            {/* Metric Card 3 */}
            <div className="tactical-card tactical-card-hover p-4 rounded-xl border border-[#232F42] animate-float-bob-delayed">
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-lg bg-amber-950/60 border border-amber-500/30 text-amber-400">
                  <Clock className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded border border-amber-500/30">
                  REAL-TIME
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100 tracking-wide">
                Sub-second
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                Dispatch Latency
              </div>
            </div>

            {/* Metric Card 4 */}
            <div className="tactical-card tactical-card-hover p-4 rounded-xl border border-[#232F42] animate-float-bob">
              <div className="flex items-center justify-between mb-2">
                <span className="p-2 rounded-lg bg-blue-950/60 border border-blue-500/30 text-blue-400">
                  <Lock className="w-5 h-5" />
                </span>
                <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/30">
                  AES-256
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-100 tracking-wide">
                100%
              </div>
              <div className="text-xs text-slate-400 font-medium mt-1">
                End-to-End Encrypted Telemetry
              </div>
            </div>

          </div>

          {/* Quick Notice */}
          <div className="flex items-center gap-3 p-3.5 rounded-lg bg-[#151B26]/60 border border-[#232F42] text-xs text-slate-400 font-mono">
            <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>Operational deployment verified for Sitabuldi, Sadar, Variety Sq & Automotive Ward sectors.</span>
          </div>

        </div>

        {/* Right Side: 45% Width (lg:col-span-5) */}
        <div className="lg:col-span-5 w-full">
          <LoginCard 
            onAuthenticate={onAuthenticate} 
            authError={authError} 
            isAuthenticating={isAuthenticating} 
          />
        </div>

      </div>
    </section>
  );
}
