/**
 * Alerts.jsx - Explainable AI (XAI) & Decision Support Component
 * -------------------------------------------------------------
 * Purpose: Real-time decision support panel for Nagpur Traffic Command Center.
 * Displays AI-generated officer redeployment and signal timing recommendations
 * with transparent XAI reasoning, allowing control room operators to Accept or Reject actions.
 */

import React, { useState } from 'react';
import {
  AlertTriangle,
  Brain,
  Check,
  X,
  ArrowRight,
  Sparkles,
  ShieldAlert,
  RotateCcw,
  CheckCircle2,
} from 'lucide-react';

const INITIAL_RECOMMENDATIONS = [
  {
    id: 'rec-101',
    targetLocation: 'Medical Square',
    sourceLocation: 'Variety Square',
    xaiReason:
      'Risk Score 92: Critical bottleneck detected near Hospital Gate. Re-route nearest available officer from Variety Square (Risk: 35) to clear emergency corridor.',
    priority: 'CRITICAL',
    suggestedAction: 'Dispatch Traffic Officer',
    status: 'pending',
    timestamp: 'Just now',
  },
  {
    id: 'rec-102',
    targetLocation: 'Sitabuldi Square',
    sourceLocation: 'RBI Square',
    xaiReason:
      'Risk Score 85: Sudden surge in vehicle density (+45% in 5 min). Extend green phase by 25s for Northbound traffic and alert standby patrol at RBI Square.',
    priority: 'HIGH',
    suggestedAction: 'Adjust Signal Timing & Patrol Alert',
    status: 'pending',
    timestamp: '2 mins ago',
  },
  {
    id: 'rec-103',
    targetLocation: 'RBI Square',
    sourceLocation: 'Laxmi Nagar Square',
    xaiReason:
      'Risk Score 65: Moderate queue buildup anticipated due to Metro station outlet traffic. Pre-emptively assign auxiliary officer from Laxmi Nagar.',
    priority: 'MEDIUM',
    suggestedAction: 'Pre-emptive Auxiliary Deployment',
    status: 'pending',
    timestamp: '5 mins ago',
  },
];

function Alerts() {
  const [recommendations, setRecommendations] = useState(INITIAL_RECOMMENDATIONS);
  const [actionHistory, setActionHistory] = useState([]);

  // Handle Accept Action
  const handleAccept = (id) => {
    const item = recommendations.find((r) => r.id === id);
    if (item) {
      setActionHistory((prev) => [
        { ...item, action: 'Accepted', actionTime: new Date().toLocaleTimeString() },
        ...prev,
      ]);
      setRecommendations((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Handle Reject Action
  const handleReject = (id) => {
    const item = recommendations.find((r) => r.id === id);
    if (item) {
      setActionHistory((prev) => [
        { ...item, action: 'Rejected', actionTime: new Date().toLocaleTimeString() },
        ...prev,
      ]);
      setRecommendations((prev) => prev.filter((r) => r.id !== id));
    }
  };

  // Reset Mock Data for Demo Purposes
  const handleReset = () => {
    setRecommendations(INITIAL_RECOMMENDATIONS);
    setActionHistory([]);
  };

  return (
    <div className="bg-slate-800/90 backdrop-blur-md border border-slate-700/80 rounded-xl p-4 text-white shadow-xl flex flex-col h-full font-sans">
      {/* Sleek Header */}
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-700/80">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
              AI Recommendations
              <span className="bg-amber-500/20 text-amber-300 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded border border-amber-500/40">
                XAI Decision Support
              </span>
            </h2>
            <p className="text-xs text-slate-400">Explainable AI Dispatch & Optimization</p>
          </div>
        </div>

        {recommendations.length < INITIAL_RECOMMENDATIONS.length && (
          <button
            onClick={handleReset}
            title="Reset Mock Alerts for Demo"
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 bg-slate-700/50 hover:bg-slate-700 px-2.5 py-1.5 rounded-lg border border-slate-600/50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        )}
      </div>

      {/* Recommendation Cards List */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 custom-scrollbar">
        {recommendations.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center p-6 bg-slate-900/40 border border-dashed border-slate-700 rounded-xl">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-2 opacity-80" />
            <h3 className="text-sm font-semibold text-slate-200">All Alerts Resolved</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs">
              No pending AI deployment recommendations. Traffic flow is optimal across Nagpur grid.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/40 px-3.5 py-1.5 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reload Recommendations
            </button>
          </div>
        ) : (
          recommendations.map((rec) => {
            const isCritical = rec.priority === 'CRITICAL';
            const isHigh = rec.priority === 'HIGH';

            const badgeBg = isCritical
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              : isHigh
              ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
              : 'bg-blue-500/20 text-blue-300 border-blue-500/40';

            return (
              <div
                key={rec.id}
                className="bg-slate-900/80 border border-slate-700/80 rounded-xl p-4 shadow-md transition-all hover:border-slate-600 flex flex-col gap-3"
              >
                {/* Card Top: Target & Priority */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <AlertTriangle
                      className={`w-4 h-4 shrink-0 ${
                        isCritical ? 'text-rose-400' : isHigh ? 'text-amber-400' : 'text-blue-400'
                      }`}
                    />
                    <span className="font-semibold text-sm text-slate-100">
                      {rec.suggestedAction}
                    </span>
                  </div>
                  <span
                    className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded border ${badgeBg}`}
                  >
                    {rec.priority}
                  </span>
                </div>

                {/* Route Path */}
                <div className="flex items-center gap-2 text-xs bg-slate-950/60 p-2 rounded-lg border border-slate-800 text-slate-300">
                  <span className="text-slate-400">From:</span>
                  <span className="font-medium text-slate-200">{rec.sourceLocation}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span className="text-slate-400">To:</span>
                  <span className="font-semibold text-amber-300">{rec.targetLocation}</span>
                </div>

                {/* Highlighted Explainable AI (XAI) Section */}
                <div className="bg-amber-950/30 border border-amber-500/30 rounded-lg p-3 text-amber-100 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-bold tracking-wide uppercase">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Explainable AI (XAI) Reasoning</span>
                  </div>
                  <p className="text-xs leading-relaxed text-amber-200/90 font-medium">
                    {rec.xaiReason}
                  </p>
                </div>

                {/* Action Buttons: Accept & Reject */}
                <div className="flex items-center justify-end gap-2.5 pt-1">
                  <button
                    onClick={() => handleReject(rec.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-500/40 px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95"
                  >
                    <X className="w-4 h-4 text-rose-400" />
                    Reject
                  </button>
                  <button
                    onClick={() => handleAccept(rec.id)}
                    className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-900/30 px-3 py-2 rounded-lg text-xs font-semibold transition-all active:scale-95"
                  >
                    <Check className="w-4 h-4 text-white" />
                    Accept
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Operator Activity Log Summary */}
      {actionHistory.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-700/80 text-xs">
          <div className="text-slate-400 font-semibold mb-1.5 flex items-center justify-between">
            <span>Operator Resolution History</span>
            <span className="text-[10px] text-slate-500">{actionHistory.length} actions</span>
          </div>
          <div className="max-h-20 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {actionHistory.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-[11px] p-1.5 rounded bg-slate-900/50 border border-slate-800"
              >
                <span className="text-slate-300 truncate max-w-[170px]">
                  {item.targetLocation}: {item.suggestedAction}
                </span>
                <span
                  className={`font-semibold text-[10px] ${
                    item.action === 'Accepted' ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {item.action} ({item.actionTime})
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Alerts;
