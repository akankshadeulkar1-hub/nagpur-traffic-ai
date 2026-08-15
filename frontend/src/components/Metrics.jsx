import React from 'react';
import { TrendingDown, ShieldCheck, Activity, Users, Zap, Clock } from 'lucide-react';

/**
 * Metrics Component - Traffic Analytics & Comparison Panel
 * Compares baseline unassisted traffic against AI-optimized deployment impact across Nagpur sectors.
 */
export default function Metrics({ activeIncidentCount }) {
  const comparisonData = [
    { sector: 'Sitabuldi Zone', baselineDelay: 24, aiDelay: 11, reduction: '54%' },
    { sector: 'Sadar Division', baselineDelay: 18, aiDelay: 8, reduction: '55%' },
    { sector: 'Rahate Corridor', baselineDelay: 35, aiDelay: 19, reduction: '45%' },
    { sector: 'Medical Sq Ward', baselineDelay: 28, aiDelay: 14, reduction: '50%' },
  ];

  return (
    <div className="tactical-card rounded-2xl border border-[#232F42] p-5 shadow-xl text-left">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#232F42]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-emerald-950/70 border border-emerald-500/40 text-emerald-400">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 uppercase tracking-wide">
              System Analytics & AI Impact
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Baseline Congestion vs. AI Tactical Dispatch
            </p>
          </div>
        </div>

        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-500/30">
          -38.4% AVG DELAY
        </span>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="p-3.5 rounded-xl bg-[#161D2B] border border-[#232F42]">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>AVG DISPATCH TIME</span>
          </div>
          <div className="text-xl font-extrabold font-mono text-slate-100">
            3.2 Mins
          </div>
          <div className="text-[10px] font-mono text-emerald-400 mt-1">
            ↓ 4.8m faster than manual
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#161D2B] border border-[#232F42]">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
            <Users className="w-3.5 h-3.5 text-emerald-400" />
            <span>OFFICERS ON FIELD</span>
          </div>
          <div className="text-xl font-extrabold font-mono text-slate-100">
            28 Units
          </div>
          <div className="text-[10px] font-mono text-cyan-400 mt-1">
            100% Signal Synced
          </div>
        </div>
      </div>

      {/* Baseline vs AI Sector Comparison Bar Chart */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>SECTOR DELAY COMPARISON (MINS)</span>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-red-500/60"></span> Baseline
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded bg-cyan-400"></span> AI Optimized
            </span>
          </div>
        </div>

        {comparisonData.map((item) => (
          <div key={item.sector} className="space-y-1">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-300 font-semibold">{item.sector}</span>
              <span className="text-emerald-400 text-[10px] font-bold">-{item.reduction}</span>
            </div>

            <div className="relative space-y-1">
              {/* Baseline Bar */}
              <div className="w-full bg-[#0B0E14] h-2 rounded-full overflow-hidden border border-[#232F42]">
                <div
                  className="bg-red-500/70 h-full rounded-full"
                  style={{ width: `${(item.baselineDelay / 40) * 100}%` }}
                  title={`Baseline: ${item.baselineDelay} mins`}
                ></div>
              </div>

              {/* AI Optimized Bar */}
              <div className="w-full bg-[#0B0E14] h-2 rounded-full overflow-hidden border border-[#232F42]">
                <div
                  className="bg-cyan-400 h-full rounded-full shadow-[0_0_8px_rgba(56,189,248,0.6)]"
                  style={{ width: `${(item.aiDelay / 40) * 100}%` }}
                  title={`AI Optimized: ${item.aiDelay} mins`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-3 border-t border-[#232F42] flex items-center justify-between text-[10px] font-mono text-slate-400">
        <span className="flex items-center gap-1">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          Nagpur Police Defense Protocol v4.2
        </span>
        <span>UPDATED LIVE</span>
      </div>

    </div>
  );
}
