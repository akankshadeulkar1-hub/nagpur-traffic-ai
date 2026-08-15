import React, { useState } from 'react';
import { Bot, Check, X, ShieldAlert, Zap, ArrowUpRight, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

/**
 * Alerts Component - AI Smart Recommendations Panel
 * Interactive panel displaying AI recommendations with Accept/Reject triggers and rationale.
 */
export default function Alerts({ recommendations, onAcceptRecommendation, onRejectRecommendation }) {
  const [filter, setFilter] = useState('ALL');

  const filteredItems = recommendations.filter((item) => {
    if (filter === 'PENDING') return item.status === 'PENDING';
    if (filter === 'ACCEPTED') return item.status === 'ACCEPTED';
    return true;
  });

  return (
    <div className="tactical-card rounded-2xl border border-[#232F42] p-5 shadow-xl text-left">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#232F42]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-400">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2">
              <span>AI Smart Recommendations</span>
              <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-cyan-950 border border-cyan-500/30 text-cyan-400">
                ACTIVE INFERENCE
              </span>
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Explainable dispatch & signal optimization actions
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1 bg-[#0B0E14] p-1 rounded-lg border border-[#232F42] text-[11px] font-mono">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-2.5 py-1 rounded transition-colors ${
              filter === 'ALL' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ALL ({recommendations.length})
          </button>
          <button
            onClick={() => setFilter('PENDING')}
            className={`px-2.5 py-1 rounded transition-colors ${
              filter === 'PENDING' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            PENDING
          </button>
          <button
            onClick={() => setFilter('ACCEPTED')}
            className={`px-2.5 py-1 rounded transition-colors ${
              filter === 'ACCEPTED' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            ACCEPTED
          </button>
        </div>
      </div>

      {/* List Container */}
      <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
        {filteredItems.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-slate-500 border border-dashed border-[#232F42] rounded-xl">
            No recommendations match the selected filter.
          </div>
        ) : (
          filteredItems.map((rec) => {
            const isPending = rec.status === 'PENDING';
            const isAccepted = rec.status === 'ACCEPTED';
            const isRejected = rec.status === 'REJECTED';

            return (
              <div
                key={rec.id}
                className={`p-4 rounded-xl border transition-all duration-200 ${
                  isAccepted
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : isRejected
                    ? 'bg-slate-900/40 border-slate-800 opacity-60'
                    : 'bg-[#161D2B] border-[#232F42] hover:border-cyan-500/40'
                }`}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-mono font-bold text-slate-100 uppercase tracking-wide">
                        {rec.junction}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/60 text-cyan-400 border border-blue-500/30">
                        {rec.actionType}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400">
                        ⚡ {rec.confidence}% Confidence
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 font-medium leading-snug">
                      {rec.title}
                    </p>
                  </div>

                  {/* Status Badge */}
                  <div className="shrink-0">
                    {isAccepted && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-500/50">
                        <CheckCircle className="w-3 h-3" /> EXECUTED
                      </span>
                    )}
                    {isRejected && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
                        <X className="w-3 h-3" /> DISMISSED
                      </span>
                    )}
                    {isPending && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-500/50 animate-pulse">
                        <Clock className="w-3 h-3" /> ACTION REQ
                      </span>
                    )}
                  </div>
                </div>

                {/* Rationale Log */}
                <div className="text-[11px] font-mono text-slate-400 bg-[#0B0E14] p-2.5 rounded-lg border border-[#232F42] my-2">
                  <span className="text-cyan-400 font-bold">AI RATIONALE: </span>
                  {rec.rationale}
                </div>

                {/* Action Buttons for Pending Items */}
                {isPending && (
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => onRejectRecommendation(rec.id)}
                      className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-red-400 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-red-500/40 bg-[#0B0E14] transition-all cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" /> REJECT
                    </button>
                    <button
                      onClick={() => onAcceptRecommendation(rec.id)}
                      className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 px-4 py-1.5 rounded-lg shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all cursor-pointer active:scale-95"
                    >
                      <Check className="w-4 h-4 stroke-[3]" /> ACCEPT & DISPATCH
                    </button>
                  </div>
                )}

              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
