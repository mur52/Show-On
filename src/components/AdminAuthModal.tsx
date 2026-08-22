import React, { useState } from 'react';
import { X, Lock, KeyRound, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AdminAuthModal: React.FC = () => {
  const { isAdminAuthModalOpen, setIsAdminAuthModalOpen, adminLogin } = useShop();
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);

  if (!isAdminAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(passcode);
    if (!success) {
      setError(true);
    } else {
      setPasscode('');
      setError(false);
    }
  };

  const handleDemoAccess = () => {
    adminLogin('showon2026');
  };

  return (
    <div
      id="admin-auth-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 backdrop-blur-sm p-4 overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsAdminAuthModalOpen(false);
      }}
    >
      <div
        id="admin-auth-modal-card"
        className="bg-[#FCFAF7] border border-[#DED7D0] w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-scaleUp"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#DED7D0] bg-[#FAF6F0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#292725] text-white flex items-center justify-center shadow-md">
              <Lock className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-serif font-bold text-[#292725]">
                Admin Operations Portal
              </h2>
              <p className="text-xs text-stone-500 font-sans">
                Restricted access for Show On store managers
              </p>
            </div>
          </div>
          <button
            onClick={() => setIsAdminAuthModalOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5 bg-white">
          <div className="bg-[#FAF6F0] p-3.5 rounded-xl border border-[#EAE3DA] flex items-center justify-between text-xs font-sans">
            <div className="flex items-center gap-2 text-stone-700">
              <KeyRound className="w-4 h-4 text-stone-600" />
              <span>Demo Passcode:</span>
              <code className="font-mono bg-stone-200/80 px-1.5 py-0.5 rounded font-bold text-stone-900">
                showon2026
              </code>
            </div>
            <button
              onClick={handleDemoAccess}
              className="text-[11px] font-bold text-[#292725] hover:underline flex items-center gap-1"
            >
              <Sparkles className="w-3 h-3 text-amber-600" />
              Auto-Fill & Enter
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="admin-passcode-input"
                className="block text-xs font-medium uppercase tracking-wider text-stone-600 mb-1.5 font-sans"
              >
                Enter Access Key / Passcode
              </label>
              <div className="relative">
                <input
                  id="admin-passcode-input"
                  type="password"
                  value={passcode}
                  onChange={(e) => {
                    setPasscode(e.target.value);
                    if (error) setError(false);
                  }}
                  placeholder="••••••••••••"
                  autoFocus
                  className={`w-full px-4 py-3 rounded-lg bg-[#FAF6F0] border text-sm text-[#292725] tracking-widest focus:outline-none transition-colors ${
                    error
                      ? 'border-rose-400 focus:border-rose-500 ring-1 ring-rose-300'
                      : 'border-[#DED7D0] focus:border-[#292725]'
                  }`}
                />
              </div>
              {error && (
                <p className="text-[11px] text-rose-600 mt-1.5 font-sans">
                  Invalid passcode. Use <span className="font-mono font-bold">showon2026</span>
                </p>
              )}
            </div>

            <button
              id="admin-submit-login-btn"
              type="submit"
              className="w-full py-3 bg-[#292725] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-stone-800 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <span>Unlock Admin Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="pt-2 text-center">
            <button
              onClick={handleDemoAccess}
              className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 border border-stone-200 text-stone-800 text-xs rounded-lg transition-colors font-medium flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>One-Click Instant Admin Access</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-[#DED7D0] bg-[#FAF6F0] flex items-center justify-center gap-2 text-[11px] text-stone-500 font-sans">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Role-Based Operations & Audit Controls Active</span>
        </div>
      </div>
    </div>
  );
};
