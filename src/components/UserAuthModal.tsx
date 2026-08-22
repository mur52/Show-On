import React, { useState } from 'react';
import { X, Mail, Phone, Lock, User, MapPin, ArrowRight, ShieldCheck, Sparkles, Eye, EyeOff } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const UserAuthModal: React.FC = () => {
  const {
    isUserAuthModalOpen,
    setIsUserAuthModalOpen,
    userAuthModalTab,
    setUserAuthModalTab,
    loginUser,
    signUpUser,
    showToast,
  } = useShop();

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Sign up form state
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPhone, setSignUpPhone] = useState('');
  const [signUpAddress, setSignUpAddress] = useState('');
  const [signUpCity, setSignUpCity] = useState<'Dhaka' | 'Chittagong' | 'Sylhet' | 'Rajshahi' | 'Khulna' | 'Other'>('Dhaka');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpConfirmPassword, setSignUpConfirmPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  if (!isUserAuthModalOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      showToast('Please enter your email or phone number', 'error');
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      loginUser(loginIdentifier, loginPassword);
      setIsLoading(false);
    }, 400);
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signUpName.trim()) {
      showToast('Please enter your full name', 'error');
      return;
    }
    if (!signUpPhone.trim()) {
      showToast('Please enter your phone number', 'error');
      return;
    }
    if (!signUpEmail.trim() || !signUpEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    if (signUpPassword && signUpConfirmPassword && signUpPassword !== signUpConfirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      signUpUser({
        fullName: signUpName,
        email: signUpEmail,
        phoneNumber: signUpPhone,
        password: signUpPassword,
        address: signUpAddress,
        city: signUpCity,
      });
      setIsLoading(false);
    }, 450);
  };

  const fillDemoCustomer = () => {
    setLoginIdentifier('raihan52760@gmail.com');
    setLoginPassword('showon2026');
  };

  return (
    <div
      id="user-auth-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      onClick={() => setIsUserAuthModalOpen(false)}
    >
      <div
        className="relative w-full max-w-md bg-[#FCFAF7] border border-[#DED7D0] rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-[#292725] text-[#FCFAF7] px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#FCFAF7]/10 flex items-center justify-center border border-[#FCFAF7]/20">
              <User className="w-4 h-4 text-[#D8CEC3]" />
            </div>
            <div>
              <h3 className="font-serif-editorial text-lg font-bold tracking-wide">
                SHOW ON MEMBER ACCESS
              </h3>
              <p className="text-[11px] text-[#B8ACA1] font-sans-body tracking-wider uppercase">
                {userAuthModalTab === 'login' ? 'Sign In to Your Account' : 'Create Exclusive Profile'}
              </p>
            </div>
          </div>
          <button
            id="close-auth-modal-btn"
            onClick={() => setIsUserAuthModalOpen(false)}
            className="p-1.5 text-[#B8ACA1] hover:text-[#FCFAF7] hover:bg-[#FCFAF7]/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#DED7D0] bg-[#F7F3EE]">
          <button
            id="auth-tab-login-btn"
            type="button"
            onClick={() => setUserAuthModalTab('login')}
            className={`flex-1 py-3 text-xs uppercase tracking-widest font-semibold text-center transition-all cursor-pointer ${
              userAuthModalTab === 'login'
                ? 'bg-[#FCFAF7] text-[#292725] border-b-2 border-[#292725] shadow-xs'
                : 'text-[#817870] hover:text-[#292725]'
            }`}
          >
            Sign In
          </button>
          <button
            id="auth-tab-signup-btn"
            type="button"
            onClick={() => setUserAuthModalTab('signup')}
            className={`flex-1 py-3 text-xs uppercase tracking-widest font-semibold text-center transition-all cursor-pointer ${
              userAuthModalTab === 'signup'
                ? 'bg-[#FCFAF7] text-[#292725] border-b-2 border-[#292725] shadow-xs'
                : 'text-[#817870] hover:text-[#292725]'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 sm:p-7 max-h-[80vh] overflow-y-auto">
          {userAuthModalTab === 'login' ? (
            /* ================= SIGN IN FORM ================= */
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-1.5">
                  Email or Phone Number
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#817870]" />
                  <input
                    id="login-identifier-input"
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="e.g. raihan@gmail.com or 01711000888"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DED7D0] rounded-xl text-sm text-[#292725] placeholder:text-[#A89E94] focus:outline-hidden focus:border-[#292725] focus:ring-1 focus:ring-[#292725] transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => showToast('Password reset link will be sent to your phone/email.', 'info')}
                    className="text-[11px] text-[#817870] hover:text-[#292725] underline cursor-pointer"
                  >
                    Forgot?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#817870]" />
                  <input
                    id="login-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-white border border-[#DED7D0] rounded-xl text-sm text-[#292725] placeholder:text-[#A89E94] focus:outline-hidden focus:border-[#292725] focus:ring-1 focus:ring-[#292725] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#817870] hover:text-[#292725] cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quick 1-Click Demo Fill */}
              <div className="pt-1">
                <button
                  type="button"
                  id="fill-demo-customer-btn"
                  onClick={fillDemoCustomer}
                  className="w-full py-2 px-3 bg-[#F7F3EE] hover:bg-[#EAE3D9] border border-dashed border-[#DED7D0] rounded-xl text-xs text-[#5C554E] flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>One-Click Demo Customer Autofill</span>
                </button>
              </div>

              <button
                id="submit-login-btn"
                type="submit"
                disabled={isLoading}
                className="w-full mt-3 py-3 px-4 bg-[#292725] hover:bg-[#1F1D1B] text-[#FCFAF7] text-xs uppercase tracking-widest font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-[#FCFAF7] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Sign In to Show On</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-2">
                <p className="text-xs text-[#817870]">
                  Don't have an account yet?{' '}
                  <button
                    type="button"
                    onClick={() => setUserAuthModalTab('signup')}
                    className="font-semibold text-[#292725] underline cursor-pointer hover:text-black"
                  >
                    Create one here
                  </button>
                </p>
              </div>
            </form>
          ) : (
            /* ================= SIGN UP FORM ================= */
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-1">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#817870]" />
                  <input
                    id="signup-fullname-input"
                    type="text"
                    required
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    placeholder="e.g. Raihan Chowdhury"
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DED7D0] rounded-xl text-sm text-[#292725] placeholder:text-[#A89E94] focus:outline-hidden focus:border-[#292725] focus:ring-1 focus:ring-[#292725] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-1">
                    Phone (Bangladesh) <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#817870]" />
                    <input
                      id="signup-phone-input"
                      type="tel"
                      required
                      value={signUpPhone}
                      onChange={(e) => setSignUpPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DED7D0] rounded-xl text-sm text-[#292725] placeholder:text-[#A89E94] focus:outline-hidden focus:border-[#292725] focus:ring-1 focus:ring-[#292725] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#817870]" />
                    <input
                      id="signup-email-input"
                      type="email"
                      required
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="name@email.com"
                      className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#DED7D0] rounded-xl text-sm text-[#292725] placeholder:text-[#A89E94] focus:outline-hidden focus:border-[#292725] focus:ring-1 focus:ring-[#292725] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-1">
                    Delivery City
                  </label>
                  <select
                    id="signup-city-select"
                    value={signUpCity}
                    onChange={(e) => setSignUpCity(e.target.value as any)}
                    className="w-full px-3 py-2.5 bg-white border border-[#DED7D0] rounded-xl text-sm text-[#292725] focus:outline-hidden focus:border-[#292725] focus:ring-1 focus:ring-[#292725] transition-all"
                  >
                    <option value="Dhaka">Dhaka (Inside 24-48h)</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Other">Other Nationwide</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-1">
                    Street Address (Optional)
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#817870]" />
                    <input
                      id="signup-address-input"
                      type="text"
                      value={signUpAddress}
                      onChange={(e) => setSignUpAddress(e.target.value)}
                      placeholder="House / Road / Area"
                      className="w-full pl-9 pr-3 py-2.5 bg-white border border-[#DED7D0] rounded-xl text-sm text-[#292725] placeholder:text-[#A89E94] focus:outline-hidden focus:border-[#292725] focus:ring-1 focus:ring-[#292725] transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-1">
                    Password
                  </label>
                  <input
                    id="signup-password-input"
                    type="password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    placeholder="Create password"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#DED7D0] rounded-xl text-sm text-[#292725] placeholder:text-[#A89E94] focus:outline-hidden focus:border-[#292725] focus:ring-1 focus:ring-[#292725] transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="signup-confirmpassword-input"
                    type="password"
                    value={signUpConfirmPassword}
                    onChange={(e) => setSignUpConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full px-3.5 py-2.5 bg-white border border-[#DED7D0] rounded-xl text-sm text-[#292725] placeholder:text-[#A89E94] focus:outline-hidden focus:border-[#292725] focus:ring-1 focus:ring-[#292725] transition-all"
                  />
                </div>
              </div>

              <button
                id="submit-signup-btn"
                type="submit"
                disabled={isLoading}
                className="w-full mt-3 py-3 px-4 bg-[#292725] hover:bg-[#1F1D1B] text-[#FCFAF7] text-xs uppercase tracking-widest font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-[#FCFAF7] border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Register & Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#817870] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                <span>Encrypted Bangladesh customer security guaranteed</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
