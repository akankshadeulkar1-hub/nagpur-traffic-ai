import React, { useState } from 'react';
import {
  Bot,
  Brain,
  Check,
  X,
  ShieldAlert,
  Zap,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  CheckCircle2,
  Clock,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

/**
 * Alerts.jsx - Explainable AI (XAI) & AI Smart Recommendations Component
 * ----------------------------------------------------------------------
 * Purpose: Real-time decision support panel for Nagpur Traffic Command Center.
 * Displays AI-generated officer redeployment and signal timing recommendations
 * with transparent XAI reasoning, allowing control room operators to Accept or Reject actions.
 */

const INITIAL_RECOMMENDATIONS = [
  {
    id: 'rec-101',
    junction: 'Medical Square',
    targetLocation: 'Medical Square',
    sourceLocation: 'Variety Square',
    xaiReason:
      'Risk Score 92: Critical bottleneck detected near Hospital Gate. Re-route nearest available officer from Variety Square (Risk: 35) to clear emergency corridor.',
    rationale:
      'Risk Score 92: Critical bottleneck near Hospital Gate. Re-route officer from Variety Square to clear emergency corridor.',
    priority: 'CRITICAL',
    actionType: 'Dispatch Request',
    confidence: 94,
    suggestedAction: 'Dispatch Traffic Officer',
    status: 'PENDING',
    timestamp: 'Just now',
  },
  {
    id: 'rec-102',
    junction: 'Sitabuldi Square',
    targetLocation: 'Sitabuldi Square',
    sourceLocation: 'RBI Square',
    xaiReason:
      'Risk Score 85: Sudden surge in vehicle density (+45% in 5 min). Extend green phase by 25s for Northbound traffic and alert standby patrol at RBI Square.',
    rationale:
      'Risk Score 85: Vehicle density surge (+45% in 5 min). Extend green phase by 25s for Northbound traffic.',
    priority: 'HIGH',
    actionType: 'Signal Optimization',
    confidence: 88,
    suggestedAction: 'Adjust Signal Timing & Patrol Alert',
    status: 'PENDING',
    timestamp: '2 mins ago',
  },
  {
    id: 'rec-103',
    junction: 'RBI Square',
    targetLocation: 'RBI Square',
    sourceLocation: 'Laxmi Nagar Square',
    xaiReason:
      'Risk Score 65: Moderate queue buildup anticipated due to Metro station outlet traffic. Pre-emptively assign auxiliary officer from Laxmi Nagar.',
    rationale:
      'Risk Score 65: Moderate queue buildup anticipated due to Metro outlet traffic. Assign auxiliary officer.',
    priority: 'MEDIUM',
    actionType: 'Auxiliary Deployment',
    confidence: 81,
    suggestedAction: 'Pre-emptive Auxiliary Deployment',
    status: 'PENDING',
    timestamp: '5 mins ago',
  },
];

export default function Alerts({
  recommendations: externalRecommendations,
  onAcceptRecommendation,
  onRejectRecommendation,
}) {
  const [internalRecommendations, setInternalRecommendations] = useState(INITIAL_RECOMMENDATIONS);
  const [actionHistory, setActionHistory] = useState([]);
  const [filter, setFilter] = useState('ALL');

  // Use external recommendations if passed and non-empty, otherwise use internal state
  const activeRecommendations =
    externalRecommendations && externalRecommendations.length > 0
      ? externalRecommendations
      : internalRecommendations;

  // Handle Accept Action
  const handleAccept = (id) => {
    if (onAcceptRecommendation) {
      onAcceptRecommendation(id);
    }

    setInternalRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'ACCEPTED' } : r))
    );

    const item = activeRecommendations.find((r) => r.id === id);
    if (item) {
      setActionHistory((prev) => [
        { ...item, action: 'Accepted', actionTime: new Date().toLocaleTimeString() },
        ...prev,
      ]);
    }
  };

  // Handle Reject Action
  const handleReject = (id) => {
    if (onRejectRecommendation) {
      onRejectRecommendation(id);
    }

    setInternalRecommendations((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: 'REJECTED' } : r))
    );

    const item = activeRecommendations.find((r) => r.id === id);
    if (item) {
      setActionHistory((prev) => [
        { ...item, action: 'Rejected', actionTime: new Date().toLocaleTimeString() },
        ...prev,
      ]);
    }
  };

  // Reset Mock Data for Demo
  const handleReset = () => {
    setInternalRecommendations(INITIAL_RECOMMENDATIONS);
    setActionHistory([]);
  };

  const filteredItems = activeRecommendations.filter((item) => {
    if (filter === 'PENDING') return item.status === 'PENDING';
    if (filter === 'ACCEPTED') return item.status === 'ACCEPTED';
    return true;
  });

  return (
    <div className="bg-[#151922] border border-[#212936] rounded-xl p-4 sm:p-5 shadow-2xl text-left flex flex-col h-full font-sans text-white">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-[#212936]">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-cyan-950/70 border border-cyan-500/40 text-cyan-400">
            <Brain className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-100 uppercase tracking-wide flex items-center gap-2 flex-wrap">
              <span>AI Smart Recommendations</span>
              <span className="text-[10px] font-mono font-extrabold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                XAI DECISION SUPPORT
              </span>
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Explainable dispatch & signal optimization actions
            </p>
          </div>
        </div>

        {/* Filter Pills & Reset */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1 bg-[#0B0E14] p-1 rounded-lg border border-[#212936] text-[11px] font-mono">
            <button
              onClick={() => setFilter('ALL')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${filter === 'ALL' ? 'bg-cyan-500 text-black font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              ALL ({activeRecommendations.length})
            </button>
            <button
              onClick={() => setFilter('PENDING')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${filter === 'PENDING' ? 'bg-amber-500 text-black font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              PENDING
            </button>
            <button
              onClick={() => setFilter('ACCEPTED')}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${filter === 'ACCEPTED' ? 'bg-emerald-500 text-black font-bold' : 'text-slate-400 hover:text-slate-200'
                }`}
            >
              ACCEPTED
            </button>
          </div>

          <button
            onClick={handleReset}
            title="Reset Mock Alerts for Demo"
            className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 bg-[#0B0E14] hover:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-[#212936] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset
          </button>
        </div>
      </div>

      {/* Recommendation Cards List */}
      <div className="flex-1 overflow-y-auto pr-1 space-y-3.5 custom-scrollbar max-h-[440px]">
        {filteredItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center p-6 bg-[#0B0E14] border border-dashed border-[#212936] rounded-xl">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-2 opacity-80" />
            <h3 className="text-sm font-semibold text-slate-200">No Recommendations Found</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs font-mono">
              No recommendations match the selected filter tab.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-300 bg-amber-950/50 hover:bg-amber-900/60 border border-amber-500/40 px-3.5 py-1.5 rounded-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reload Recommendations
            </button>
          </div>
        ) : (
          filteredItems.map((rec) => {
            const isPending = rec.status === 'PENDING' || rec.status === 'pending';
            const isAccepted = rec.status === 'ACCEPTED' || rec.status === 'Accepted';
            const isRejected = rec.status === 'REJECTED' || rec.status === 'Rejected' || rec.status === 'DISMISSED';

            const isCritical = rec.priority === 'CRITICAL';
            const isHigh = rec.priority === 'HIGH';

            const priorityBadgeStyle = isCritical
              ? 'bg-rose-500/20 text-rose-300 border-rose-500/40'
              : isHigh
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-blue-500/20 text-blue-300 border-blue-500/40';

            return (
              <div
                key={rec.id}
                className={`p-4 rounded-xl border transition-all duration-200 flex flex-col gap-3 ${isAccepted
                    ? 'bg-emerald-950/20 border-emerald-500/40'
                    : isRejected
                      ? 'bg-slate-900/40 border-slate-800 opacity-60'
                      : 'bg-[#10141D] border-[#212936] hover:border-cyan-500/40'
                  }`}
              >
                {/* Top Row: Action / Junction & Badges */}
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-2">
                    <AlertTriangle
                      className={`w-4 h-4 shrink-0 ${isCritical ? 'text-rose-400' : isHigh ? 'text-amber-400' : 'text-cyan-400'
                        }`}
                    />
                    <span className="font-semibold text-sm text-slate-100 font-mono">
                      {rec.suggestedAction || rec.junction || rec.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {rec.priority && (
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${priorityBadgeStyle}`}>
                        {rec.priority}
                      </span>
                    )}

                    {rec.confidence && (
                      <span className="text-[10px] font-mono text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30">
                        ⚡ {rec.confidence}%
                      </span>
                    )}

                    {/* Status Badge */}
                    {isAccepted && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/50">
                        <CheckCircle className="w-3 h-3" /> EXECUTED
                      </span>
                    )}
                    {isRejected && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded-full border border-slate-800">
                        <X className="w-3 h-3" /> DISMISSED
                      </span>
                    )}
                    {isPending && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded-full border border-amber-500/50 animate-pulse">
                        <Clock className="w-3 h-3" /> ACTION REQ
                      </span>
                    )}
                  </div>
                </div>

                {/* Location / Route Path */}
                {(rec.sourceLocation || rec.targetLocation) && (
                  <div className="flex items-center gap-2 text-xs bg-[#0B0E14] p-2 rounded-lg border border-[#212936] text-slate-300 font-mono">
                    <span className="text-slate-400">From:</span>
                    <span className="font-medium text-slate-200">{rec.sourceLocation || rec.fromJunction || 'Surplus Sector'}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="text-slate-400">To:</span>
                    <span className="font-semibold text-amber-300">{rec.targetLocation || rec.toJunction || rec.junction}</span>
                  </div>
                )}

                {/* Highlighted Explainable AI (XAI) Reasoning Section */}
                <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-3 text-amber-100 flex flex-col gap-1.5">
                  <div className="flex items-center gap-1.5 text-amber-400 text-[11px] font-mono font-bold tracking-wide uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Explainable AI (XAI) Reasoning</span>
                  </div>
                  <p className="text-xs leading-relaxed text-amber-200/90 font-mono font-medium">
                    {rec.xaiReason || rec.rationale || rec.explanation}
                  </p>
                </div>

                {/* Action Buttons for Pending Items */}
                {isPending && (
                  <div className="flex items-center justify-end gap-2.5 pt-1">
                    <button
                      onClick={() => handleReject(rec.id)}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1 text-xs font-mono text-slate-400 hover:text-red-400 px-3 py-1.5 rounded-lg border border-slate-800 hover:border-red-500/40 bg-[#0B0E14] transition-all cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5 text-rose-400" /> REJECT
                    </button>
                    <button
                      onClick={() => handleAccept(rec.id)}
                      className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 text-xs font-mono font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 px-4 py-1.5 rounded-lg shadow-[0_0_12px_rgba(16,185,129,0.3)] transition-all cursor-pointer active:scale-95"
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

      {/* Operator Resolution History Summary */}
      {actionHistory.length > 0 && (
        <div className="mt-4 pt-3 border-t border-[#212936] text-xs font-mono">
          <div className="text-slate-400 font-semibold mb-1.5 flex items-center justify-between">
            <span>Operator Resolution History</span>
            <span className="text-[10px] text-slate-500">{actionHistory.length} actions</span>
          </div>
          <div className="max-h-20 overflow-y-auto space-y-1 pr-1 custom-scrollbar">
            {actionHistory.slice(0, 3).map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between text-[11px] p-1.5 rounded bg-[#0B0E14] border border-[#212936]"
              >
                <span className="text-slate-300 truncate max-w-[190px]">
                  {item.targetLocation || item.junction}: {item.suggestedAction || item.priority}
                </span>
                <span
                  className={`font-semibold text-[10px] ${item.action === 'Accepted' ? 'text-emerald-400' : 'text-rose-400'
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
