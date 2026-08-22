import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Shield, Sparkles, Gift } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const LeadCaptureSection: React.FC = () => {
  const { showToast } = useShop();
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    email: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phoneNumber || !formData.email) {
      showToast('Please complete all fields', 'info');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setIsSubmitted(true);
      showToast('Welcome to the Show On VIP Club! Check your SMS & Email.');
    }, 600);
  };

  return (
    <section id="lead-generation-section" className="py-14 sm:py-20 bg-[#292725] text-[#FCFAF7] relative overflow-hidden">
      {/* Subtle architectural background glow */}
      <div className="absolute inset-0 bg-radial from-[#817870]/10 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1F1D1B] border border-[#817870]/40 text-[#D8CEC3] text-[11px] font-semibold uppercase tracking-[0.25em] mb-4">
            <Gift className="w-3.5 h-3.5 text-[#D8CEC3]" />
            <span>VIP Style Club</span>
          </div>

          <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FCFAF7] leading-tight">
            Find Your Next Signature Look
          </h2>

          <p className="text-sm sm:text-base text-[#D8CEC3]/80 mt-3 font-sans-body leading-relaxed">
            Get exclusive early access to new seasonal drops, private VIP previews, and a <span className="text-[#FCFAF7] font-semibold">10% welcome privilege</span> on your first order.
          </p>
        </div>

        {!isSubmitted ? (
          <form
            id="lead-capture-form"
            onSubmit={handleSubmit}
            className="bg-[#1F1D1B]/90 backdrop-blur-xs p-6 sm:p-8 rounded-2xl border border-[#817870]/30 shadow-xl"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
              {/* Full Name */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D8CEC3] mb-1.5 font-sans-body">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanvir Rahman"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-[#292725] border border-[#817870]/50 rounded-xl text-sm text-[#FCFAF7] placeholder-[#817870] focus:outline-none focus:border-[#FCFAF7] transition-colors"
                />
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D8CEC3] mb-1.5 font-sans-body">
                  Phone (+880)
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-3.5 text-xs text-[#817870] font-sans-body select-none">
                    +880
                  </span>
                  <input
                    type="tel"
                    required
                    placeholder="1712-345678"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="w-full pl-14 pr-4 py-3 bg-[#292725] border border-[#817870]/50 rounded-xl text-sm text-[#FCFAF7] placeholder-[#817870] focus:outline-none focus:border-[#FCFAF7] transition-colors"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#D8CEC3] mb-1.5 font-sans-body">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="tanvir@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-[#292725] border border-[#817870]/50 rounded-xl text-sm text-[#FCFAF7] placeholder-[#817870] focus:outline-none focus:border-[#FCFAF7] transition-colors"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6 pt-4 border-t border-[#817870]/20">
              <div className="flex items-center gap-2 text-xs text-[#B8ACA1]">
                <Shield className="w-4 h-4 text-[#D8CEC3] shrink-0" />
                <span>No spam. Just new arrivals, offers, and style updates. Unsubscribe anytime.</span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#FCFAF7] text-[#292725] hover:bg-[#D8CEC3] font-semibold text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer shadow-sm shrink-0"
              >
                {loading ? (
                  <span>Processing...</span>
                ) : (
                  <>
                    <span>GET ACCESS</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        ) : (
          /* Submission Success Card */
          <div className="bg-[#1F1D1B] p-8 rounded-2xl border border-[#DED7D0]/30 text-center max-w-lg mx-auto animate-in fade-in zoom-in-95">
            <div className="w-14 h-14 rounded-full bg-[#FCFAF7] text-[#292725] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-[#292725]" />
            </div>
            <h3 className="font-serif-editorial text-2xl font-bold text-[#FCFAF7] mb-2">
              You're On The List, {formData.fullName}!
            </h3>
            <p className="text-xs sm:text-sm text-[#D8CEC3] mb-4">
              Use your exclusive welcome voucher code at checkout:
            </p>
            <div className="inline-block px-6 py-2.5 bg-[#292725] border-2 border-dashed border-[#D8CEC3] rounded-lg font-mono text-base font-bold tracking-widest text-[#FCFAF7] mb-4">
              SHOWON10
            </div>
            <p className="text-xs text-[#817870]">
              We have dispatched your style guide to {formData.email} and SMS alert to +880 {formData.phoneNumber}.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
