import React, { useState } from 'react';
import { ArrowUp, Lock, Fingerprint, Key, Smartphone, MapPin, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';

/**
 * Refactored Compact Officer Login Screen (Screen 3)
 * Perfectly centered max-w-[420px] tactical authentication modal with strict color harmonization.
 */
export default function LoginPage({ isOpen, onBackToLanding, onAuthenticate, authError, isAuthenticating }) {
  const [badgeId, setBadgeId] = useState('NGP-TP-8841');
  const [password, setPassword] = useState('••••••••••••');
  const [otp, setOtp] = useState('884102');
  const [sector, setSector] = useState('Sitabuldi Zone');
  const [showPassword, setShowPassword] = useState(false);
  const [otpNotice, setOtpNotice] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    setOtpNotice('OTP token sent to registered Gov Phone (+91 98*** **841)');
    setTimeout(() => {
      setOtpNotice('');
    }, 4000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAuthenticate({
      badgeId,
      sector,
    });
  };

  return (
    <div
      className={`fixed inset-0 bg-[#0B0E14] z-50 flex flex-col justify-between p-4 sm:p-6 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isOpen ? 'translate-y-0 opacity-100 pointer-events-auto' : '-translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      
      {/* 1. Top Utility Bar (Compact Header) */}
      <header className="w-full flex items-center justify-between">
        <button
          onClick={onBackToLanding}
          className="bg-[#151922] border border-[#212936] text-slate-300 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:border-slate-600 transition-all cursor-pointer"
        >
          <ArrowUp className="w-3.5 h-3.5 text-[#22D3EE]" />
          <span>↑ Return to System Overview</span>
        </button>

        <div className="bg-[#151922] border border-[#212936] text-cyan-400 text-xs font-mono px-3 py-1.5 rounded-lg flex items-center gap-1.5">
          <span>🛡️ ZERO-TRUST 256-BIT ENCRYPTION</span>
        </div>
      </header>

      {/* 2. Centered Compact Authentication Card (max-w-[420px] mx-auto) */}
      <main className="flex-grow flex items-center justify-center my-auto">
        <div className="relative w-full max-w-[420px] mx-auto bg-[#151922] border border-[#212936] rounded-2xl p-6 shadow-2xl space-y-4 text-left">
          
          {/* 0.5s Authenticating Loader Overlay */}
          {isAuthenticating && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#151922]/95 rounded-2xl backdrop-blur-md transition-all duration-300">
              <Loader2 className="w-10 h-10 text-[#22D3EE] animate-spin mb-3" />
              <div className="text-xs font-mono text-[#22D3EE] text-glow-cyan-v3 animate-pulse font-bold">
                AUTHENTICATING TOKEN...
              </div>
              <div className="text-[11px] font-mono text-slate-400 mt-1">
                Verifying Badge {badgeId || 'NGP-TP-8841'}
              </div>
            </div>
          )}

          {/* Card Header */}
          <div className="text-left space-y-1">
            <div className="w-10 h-10 rounded-xl bg-[#10141D] flex items-center justify-center border border-cyan-500/30 text-cyan-400 mb-2">
              <Lock className="w-5 h-5 stroke-[2.5]" />
            </div>
            <h2 className="text-xl font-bold tracking-wider text-white">
              OFFICER LOGIN
            </h2>
            <p className="text-xs text-slate-400 font-mono">
              Restricted to Nagpur Police & Command Staff
            </p>
          </div>

          {/* Form Fields (Compact space-y-3 layout with h-9 input height) */}
          <form onSubmit={handleSubmit} className="space-y-3 pt-1">
            
            {/* Field 1: Official Badge / Service ID */}
            <div>
              <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1.5 mb-1">
                <Fingerprint className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span>OFFICIAL BADGE / SERVICE ID</span>
              </label>
              <input
                type="text"
                value={badgeId}
                onChange={(e) => setBadgeId(e.target.value)}
                placeholder="NGP-TP-8841"
                required
                className="w-full h-9 bg-[#0D1117] border border-[#1F2633] rounded-lg px-3 text-xs text-white font-mono placeholder:text-slate-600 focus:border-[#22D3EE] focus:outline-none transition-all"
              />
            </div>

            {/* Field 2: Password / Passkey */}
            <div>
              <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1.5 mb-1">
                <Key className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span>PASSWORD / PASSKEY</span>
              </label>
              <div className="relative w-full h-9">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                  className="w-full h-9 bg-[#0D1117] border border-[#1F2633] rounded-lg px-3 pr-9 text-xs text-white font-mono placeholder:text-slate-600 focus:border-[#22D3EE] focus:outline-none transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Field 3: MFA Token / OTP Code */}
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1.5">
                  <Smartphone className="w-3.5 h-3.5 text-[#22D3EE]" />
                  <span>MFA TOKEN / OTP CODE</span>
                </label>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-[10px] font-mono text-[#22D3EE] hover:underline cursor-pointer"
                >
                  Send OTP
                </button>
              </div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="0 0 0 0 0 0"
                required
                className="w-full h-9 bg-[#0D1117] border border-[#1F2633] rounded-lg px-3 text-xs text-white font-mono placeholder:text-slate-600 focus:border-[#22D3EE] focus:outline-none transition-all"
              />
              {otpNotice && (
                <div className="flex items-center gap-1.5 text-[#10B981] text-[10px] font-mono mt-1">
                  <CheckCircle2 className="w-3 h-3 shrink-0" />
                  <span>{otpNotice}</span>
                </div>
              )}
            </div>

            {/* Field 4: Jurisdiction / Sector Select */}
            <div>
              <label className="text-[10px] font-mono tracking-wider text-slate-400 uppercase flex items-center gap-1.5 mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#22D3EE]" />
                <span>ASSIGNED SECTOR</span>
              </label>
              <select
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="w-full h-9 bg-[#0D1117] border border-[#1F2633] rounded-lg px-3 text-xs text-white font-mono focus:border-[#22D3EE] focus:outline-none cursor-pointer transition-all"
              >
                <option value="Sitabuldi Zone">Sitabuldi Zone</option>
                <option value="Sadar Division">Sadar Division</option>
                <option value="Automotive Square">Automotive Square</option>
                <option value="Central Command Hub">Central Command Hub</option>
              </select>
            </div>

            {/* Error Banner */}
            {authError && (
              <div className="flex items-center gap-1.5 p-2 rounded-lg bg-red-950/70 border border-red-500/50 text-[#FA5252] text-[11px] font-mono">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* Primary Action Button */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full bg-[#22D3EE] hover:bg-[#38BDF8] text-[#0B0E14] font-bold text-xs tracking-wider py-2.5 rounded-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(34,211,238,0.25)] transition-all cursor-pointer active:scale-95"
              >
                <Lock className="w-4 h-4 stroke-[2.5]" />
                <span>🔒 VERIFY & ENTER COMMAND CENTER</span>
              </button>
            </div>

            {/* Divider */}
            <div className="text-[10px] text-slate-600 font-mono text-center my-2">
              —— OR ——
            </div>

            {/* Secondary e-Gov SSO Button */}
            <button
              type="button"
              onClick={() => onAuthenticate({ badgeId: 'SSO-GOV-9901', sector })}
              className="w-full bg-[#10141D] hover:bg-[#161B26] border border-[#1F2633] text-slate-300 text-xs py-2 rounded-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4 text-[#10B981]" />
              <span>Login with Jan Parichay / DigiLocker</span>
            </button>

          </form>

        </div>
      </main>

      {/* 3. Bottom Legal Monospace Strip */}
      <footer className="w-full text-center text-[10px] font-mono text-slate-600 tracking-widest uppercase py-1">
        NAGPUR TRAFFIC POLICE GATEWAY • RESTRICTED ACCESS LEVEL-3 • IT ACT COMPLIANT
      </footer>

    </div>
  );
}
