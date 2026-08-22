import React from 'react';
import { X, Search, Heart, ShoppingBag, ArrowRight, ShieldCheck, MapPin, Phone, Truck, Lock, User, LogIn, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCategory } from '../types';

export const MobileMenu: React.FC = () => {
  const {
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setCurrentView,
    setSelectedCategory,
    setIsWishlistOpen,
    setIsCartOpen,
    setIsSearchOpen,
    setIsContactOpen,
    setIsAboutOpen,
    openOrderTracking,
    openAdminPortal,
    isAdminLoggedIn,
    wishlist,
    cartTotalCount,
    currentUser,
    openUserAuth,
    openUserProfile,
    setIsTryOnModalOpen,
  } = useShop();

  if (!isMobileMenuOpen) return null;

  const navigateTo = (view: 'home' | 'shop', category?: ProductCategory | string) => {
    setCurrentView(view);
    if (category) {
      setSelectedCategory(category as ProductCategory);
    } else {
      setSelectedCategory(null);
    }
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292725]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Slide-out Menu Panel */}
      <div className="relative w-full max-w-sm bg-[#FCFAF7] h-full shadow-2xl flex flex-col justify-between overflow-y-auto z-10 border-r border-[#DED7D0]">
        <div>
          {/* Header in Drawer */}
          <div className="p-5 border-b border-[#DED7D0] flex items-center justify-between">
            <div className="flex flex-col">
              <span className="font-serif-editorial text-2xl font-bold tracking-[0.2em] text-[#292725]">
                SHOW ON
              </span>
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#817870]">
                Modern Menswear
              </span>
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-2 text-[#292725] hover:bg-[#F7F3EE] rounded-full transition-colors cursor-pointer"
              aria-label="Close Menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* User Account Card */}
          <div className="p-4 bg-[#F7F3EE] border-b border-[#DED7D0]">
            {currentUser ? (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  openUserProfile();
                }}
                className="w-full flex items-center justify-between p-3 bg-white rounded-xl border border-[#DED7D0] hover:border-[#292725] transition-colors cursor-pointer text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#292725] text-[#FCFAF7] font-serif-editorial text-sm font-bold flex items-center justify-center">
                    {currentUser.avatarInitials || 'SO'}
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#292725]">{currentUser.fullName}</p>
                    <p className="text-[11px] text-[#817870]">{currentUser.phoneNumber}</p>
                  </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Account
                </span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openUserAuth('login');
                  }}
                  className="flex-1 py-2.5 px-3 bg-[#292725] text-[#FCFAF7] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-black transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    openUserAuth('signup');
                  }}
                  className="flex-1 py-2.5 px-3 bg-white border border-[#DED7D0] text-[#292725] text-xs font-semibold uppercase tracking-wider rounded-xl hover:bg-[#EAE3D9] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Search Bar */}
          <div className="p-4 border-b border-[#DED7D0]/60">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center gap-3 px-4 py-2.5 bg-[#F7F3EE] rounded-lg text-sm text-[#817870] border border-[#DED7D0] cursor-pointer"
            >
              <Search className="w-4 h-4 text-[#817870]" />
              <span>Search baggy pants, t-shirts, jeans...</span>
            </button>
          </div>

          {/* Navigation Items */}
          <div className="px-5 py-4 space-y-1">
            <button
              onClick={() => navigateTo('home')}
              className="w-full flex items-center justify-between py-2.5 text-left font-serif-editorial text-lg font-medium text-[#292725] border-b border-[#DED7D0]/40 cursor-pointer"
            >
              <span>Home</span>
              <ArrowRight className="w-4 h-4 text-[#B8ACA1]" />
            </button>

            <button
              onClick={() => navigateTo('shop')}
              className="w-full flex items-center justify-between py-2.5 text-left font-serif-editorial text-lg font-medium text-[#292725] border-b border-[#DED7D0]/40 cursor-pointer"
            >
              <span>All Apparel (65 items)</span>
              <ArrowRight className="w-4 h-4 text-[#B8ACA1]" />
            </button>

            <div className="py-2 pl-3 space-y-1.5 text-sm text-[#817870] font-sans-body">
              <button
                onClick={() => navigateTo('shop', 'Baggy Pants')}
                className="w-full text-left py-1.5 hover:text-[#292725] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Baggy Pants</span>
                <span className="text-xs bg-[#F7F3EE] px-2 py-0.5 rounded text-[#292725] font-mono">15</span>
              </button>
              <button
                onClick={() => navigateTo('shop', 'Low Cut Pants')}
                className="w-full text-left py-1.5 hover:text-[#292725] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Low Cut Pants</span>
                <span className="text-xs bg-[#F7F3EE] px-2 py-0.5 rounded text-[#292725] font-mono">10</span>
              </button>
              <button
                onClick={() => navigateTo('shop', 'T-Shirts')}
                className="w-full text-left py-1.5 hover:text-[#292725] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>T-Shirts</span>
                <span className="text-xs bg-[#F7F3EE] px-2 py-0.5 rounded text-[#292725] font-mono">10</span>
              </button>
              <button
                onClick={() => navigateTo('shop', 'Drop Shoulder')}
                className="w-full text-left py-1.5 hover:text-[#292725] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Drop Shoulder</span>
                <span className="text-xs bg-[#F7F3EE] px-2 py-0.5 rounded text-[#292725] font-mono">10</span>
              </button>
              <button
                onClick={() => navigateTo('shop', 'Jeans')}
                className="w-full text-left py-1.5 hover:text-[#292725] transition-colors flex items-center justify-between cursor-pointer"
              >
                <span>Jeans</span>
                <span className="text-xs bg-[#F7F3EE] px-2 py-0.5 rounded text-[#292725] font-mono">20</span>
              </button>
            </div>

            {/* Track Consignment */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openOrderTracking();
              }}
              className="w-full flex items-center justify-between py-3 text-left font-serif-editorial text-lg text-[#292725] border-b border-[#DED7D0]/40 cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-stone-700" />
                <span>Track My Order</span>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-stone-200 text-stone-800">
                Live
              </span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsWishlistOpen(true);
              }}
              className="w-full flex items-center justify-between py-3 text-left font-serif-editorial text-lg text-[#292725] border-b border-[#DED7D0]/40 cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#817870]" />
                <span>My Saved Wishlist</span>
              </div>
              <span className="text-xs bg-[#F7F3EE] px-2 py-0.5 rounded-full text-[#292725]">
                {wishlist.length}
              </span>
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsAboutOpen(true);
              }}
              className="w-full flex items-center justify-between py-3 text-left font-serif-editorial text-lg text-[#292725] border-b border-[#DED7D0]/40 cursor-pointer"
            >
              <span>Our Story & Craft</span>
              <ArrowRight className="w-4 h-4 text-[#B8ACA1]" />
            </button>

            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsContactOpen(true);
              }}
              className="w-full flex items-center justify-between py-3 text-left font-serif-editorial text-lg text-[#292725] border-b border-[#DED7D0]/40 cursor-pointer"
            >
              <span>Customer Support</span>
              <ArrowRight className="w-4 h-4 text-[#B8ACA1]" />
            </button>

            {/* Admin Console */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                openAdminPortal();
              }}
              className="w-full flex items-center justify-between py-3 text-left font-serif-editorial text-lg text-[#292725] cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-stone-500" />
                <span>Admin Operations</span>
              </div>
              {isAdminLoggedIn && (
                <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  Logged In
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Bottom Contact / Location Info */}
        <div className="p-5 bg-[#F7F3EE] border-t border-[#DED7D0] space-y-3">
          <div className="flex items-center gap-2 text-xs text-[#817870]">
            <MapPin className="w-4 h-4 shrink-0 text-[#292725]" />
            <span>Showroom: Banani Road 11 & Dhanmondi, Dhaka</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#817870]">
            <Phone className="w-4 h-4 shrink-0 text-[#292725]" />
            <span>Hotline: +880 1711 000 888 (10AM - 10PM)</span>
          </div>
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsCartOpen(true);
            }}
            className="w-full py-3 bg-[#292725] text-[#FCFAF7] font-medium text-sm uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 cursor-pointer shadow-xs hover:bg-[#1F1D1B]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>View Shopping Bag ({cartTotalCount})</span>
          </button>
        </div>
      </div>
    </div>
  );
};

