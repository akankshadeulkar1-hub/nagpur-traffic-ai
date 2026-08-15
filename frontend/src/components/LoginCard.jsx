import React, { useState } from 'react';
import { Lock, Fingerprint, Key, Smartphone, MapPin, ShieldCheck, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

/**
 * LoginCard Component - Phase 3
 * Protected login card embedded on the right side of the landing page.
 */
export default function LoginCard({ onAuthenticate, authError, isAuthenticating }) {
  const [badgeId, setBadgeId] = useState('NGP-TP-8841');
  const [password, setPassword] = useState('••••••••••••');
  const [otp, setOtp] = useState('884102');
  const [sector, setSector] = useState('Sitabuldi Zone');
  const [showPassword, setShowPassword] = useState(false);
  const [otpNotice, setOtpNotice] = useState('');

  const handleSendOtp = (e) => {
    e.preventDefault();
    setOtpNotice('OTP token dispatched to registered Gov Phone (+91 98*** **841)');
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
    <div className="relative w-full max-w-md mx-auto tactical-card rounded-2xl border border-[#232F42] p-6 sm:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-xl">
      
      {/* 0.5s Authenticating Token Loader Overlay */}
      {isAuthenticating && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#0D1117]/95 rounded-2xl backdrop-blur-md transition-all duration-300">
          <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mb-4" />
          <div className="text-sm font-mono text-cyan-400 text-glow-cyan animate-pulse font-semibold">
            AUTHENTICATING TOKEN...
          </div>
          <div className="text-xs font-mono text-slate-400 mt-1">
            Verifying Badge {badgeId || 'NGP-TP-8841'} with Control HQ
          </div>
        </div>
      )}

      {/* Card Header */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-[#232F42]">
        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/40 text-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.2)]">
          <Lock className="w-6 h-6 stroke-[2.5]" />
        </div>
        <div className="text-left">
          <h2 className="text-lg sm:text-xl font-bold text-slate-100 uppercase tracking-wide">
            Authorized Personnel Login
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Restricted to Nagpur Police & Command Center Staff
          </p>
        </div>
      </div>

      {/* Form Container */}
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        
        {/* Field 1: Badge Number / Service ID */}
        <div>
          <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Fingerprint className="w-3.5 h-3.5 text-cyan-400" />
            Official Police Badge Number / Service ID
          </label>
          <div className="relative">
            <input
              type="text"
              value={badgeId}
              onChange={(e) => setBadgeId(e.target.value)}
              placeholder="NGP-TP-8841"
              required
              className="w-full bg-[#0B0E14] border border-[#232F42] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-4 py-2.5 text-slate-100 text-sm font-mono placeholder:text-slate-600 transition-all outline-none"
            />
          </div>
        </div>

        {/* Field 2: Password / Passkey */}
        <div>
          <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <Key className="w-3.5 h-3.5 text-cyan-400" />
            Password / Passkey
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              required
              className="w-full bg-[#0B0E14] border border-[#232F42] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-4 py-2.5 text-slate-100 text-sm font-mono placeholder:text-slate-600 transition-all outline-none pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Field 3: MFA Token / OTP Code */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-mono font-medium text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-cyan-400" />
              MFA Token / OTP Code
            </label>
            <button
              type="button"
              onClick={handleSendOtp}
              className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 hover:underline transition-all"
            >
              Send OTP to Registered Gov Phone
            </button>
          </div>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="0 0 0 0 0 0"
            required
            className="w-full bg-[#0B0E14] border border-[#232F42] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-4 py-2.5 text-slate-100 text-sm font-mono placeholder:text-slate-600 transition-all outline-none"
          />
          {otpNotice && (
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-mono mt-1.5 animate-fadeIn">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
              <span>{otpNotice}</span>
            </div>
          )}
        </div>

        {/* Field 4: Jurisdiction / Sector Dropdown */}
        <div>
          <label className="block text-xs font-mono font-medium text-slate-300 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-cyan-400" />
            Assigned Jurisdiction / Sector
          </label>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className="w-full bg-[#0B0E14] border border-[#232F42] focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-4 py-2.5 text-slate-100 text-sm font-mono transition-all outline-none cursor-pointer"
          >
            <option value="Sitabuldi Zone">Sitabuldi Zone</option>
            <option value="Sadar Division">Sadar Division</option>
            <option value="Automotive Square Ward">Automotive Square Ward</option>
            <option value="Central Control Hub">Central Control Hub</option>
          </select>
        </div>

        {/* Auth Error Banner */}
        {authError && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-950/60 border border-red-500/50 text-red-400 text-xs font-mono">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{authError}</span>
          </div>
        )}

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#38BDF8] hover:bg-cyan-300 text-[#0B0E14] font-extrabold text-xs sm:text-sm font-mono tracking-wider uppercase py-3.5 px-4 rounded-xl shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:shadow-[0_0_35px_rgba(56,189,248,0.7)] transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            <Lock className="w-4 h-4 stroke-[2.5]" />
            <span>VERIFY & ENTER COMMAND CENTER</span>
          </button>
        </div>

        {/* Divider */}
        <div className="relative flex items-center justify-center my-4">
          <div className="border-t border-[#232F42] w-full"></div>
          <span className="bg-[#151B26] px-3 text-[11px] font-mono text-slate-500 uppercase tracking-widest absolute">
            — OR —
          </span>
        </div>

        {/* Secondary e-Gov SSO Button */}
        <button
          type="button"
          onClick={() => onAuthenticate({ badgeId: 'SSO-GOV-9901', sector })}
          className="w-full flex items-center justify-center gap-2 bg-[#161D2B] hover:bg-[#1f293a] border border-emerald-500/40 hover:border-emerald-500 text-emerald-400 font-mono text-xs font-semibold py-3 px-4 rounded-xl transition-all shadow-sm cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Login with National e-Gov SSO (Jan Parichay / DigiLocker)</span>
        </button>

      </form>

      {/* Micro-text Disclaimer */}
      <div className="mt-6 pt-4 border-t border-[#232F42]/60 text-center">
        <p className="text-[10px] font-mono text-slate-400">
          Unauthorized access is strictly prohibited and logged under the IT Act.
        </p>
      </div>

    </div>
  );
}
