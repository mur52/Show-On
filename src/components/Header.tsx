import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, X, Truck, ShieldCheck, Lock, LogIn, UserCheck, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ProductCategory } from '../types';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    selectedCategory,
    setSelectedCategory,
    cartTotalCount,
    wishlist,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsMobileMenuOpen,
    openOrderTracking,
    openAdminPortal,
    isAdminLoggedIn,
    currentUser,
    openUserAuth,
    openUserProfile,
    setIsTryOnModalOpen,
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: 'home' | 'shop' | 'bestsellers' | 'trending', category?: ProductCategory | string) => {
    setCurrentView(view);
    if (category) {
      setSelectedCategory(category as ProductCategory);
    } else {
      setSelectedCategory(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FCFAF7]/95 backdrop-blur-md shadow-xs border-b border-[#DED7D0]'
          : 'bg-[#FCFAF7] border-b border-[#DED7D0]/60'
      }`}
    >
      {/* Top micro announcement bar with quick track order & auth status */}
      <div className="bg-[#292725] text-[#FCFAF7] text-[11px] tracking-widest uppercase font-medium py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-3 text-[10px] text-stone-400 font-sans tracking-wider">
            <span>Dhaka Atelier & Nationwide Delivery</span>
            <span>•</span>
            <span className="text-emerald-400">Cash on Delivery & bKash Available</span>
          </div>
          <div className="mx-auto sm:mx-0 text-center">
            <span>Free express delivery on orders over ৳3,000</span>
          </div>
          <div className="flex items-center gap-3">
            {/* Live Order Tracker */}
            <button
              id="topbar-track-order-btn"
              onClick={() => openOrderTracking()}
              className="text-[10px] uppercase font-bold text-amber-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
            >
              <Truck className="w-3 h-3" />
              <span>Track Order</span>
            </button>

            <span className="text-stone-600 hidden sm:inline">•</span>

            {/* Customer Account / Sign In */}
            {currentUser ? (
              <button
                id="topbar-user-profile-btn"
                onClick={openUserProfile}
                className="text-[10px] uppercase font-bold text-emerald-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <UserCheck className="w-3 h-3" />
                <span className="truncate max-w-[110px]">Hi, {currentUser.fullName.split(' ')[0]}</span>
              </button>
            ) : (
              <button
                id="topbar-login-btn"
                onClick={() => openUserAuth('login')}
                className="text-[10px] uppercase font-bold text-stone-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
              >
                <LogIn className="w-3 h-3" />
                <span>Sign In / Register</span>
              </button>
            )}

            <span className="text-stone-600 hidden sm:inline">•</span>

            {/* Admin Portal */}
            <button
              id="topbar-admin-btn"
              onClick={openAdminPortal}
              className={`text-[10px] uppercase font-bold transition-colors hidden sm:flex items-center gap-1 cursor-pointer ${
                isAdminLoggedIn ? 'text-emerald-400 hover:text-emerald-300' : 'text-stone-400 hover:text-white'
              }`}
            >
              {isAdminLoggedIn ? (
                <>
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  <span>Admin</span>
                </>
              ) : (
                <>
                  <Lock className="w-3 h-3 text-stone-400" />
                  <span>Admin</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Wordmark (Left) */}
        <div className="flex items-center">
          <button
            id="brand-logo-btn"
            onClick={() => handleNavClick('home')}
            className="group flex flex-col items-start focus:outline-none text-left cursor-pointer"
          >
            <span className="font-serif-editorial text-2xl sm:text-3xl font-bold tracking-[0.2em] text-[#292725] transition-colors">
              SHOW ON
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-[#817870] -mt-1 font-sans-body">
              Modern Menswear
            </span>
          </button>
        </div>

        {/* Center Desktop Navigation - Categories: Baggy Pants, Low Cut Pants, T-Shirts, Drop Shoulder, Jeans */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-7 text-[12px] xl:text-[13px] font-medium tracking-wider uppercase text-[#292725]">
          <button
            id="nav-home-btn"
            onClick={() => handleNavClick('home')}
            className={`relative py-1 transition-colors hover:text-[#1F1D1B] cursor-pointer ${
              currentView === 'home' ? 'text-[#1F1D1B] font-semibold' : 'text-[#817870]'
            }`}
          >
            Home
            {currentView === 'home' && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#292725]" />
            )}
          </button>

          <button
            id="nav-shop-btn"
            onClick={() => handleNavClick('shop')}
            className={`relative py-1 transition-colors hover:text-[#1F1D1B] cursor-pointer ${
              currentView === 'shop' && !selectedCategory ? 'text-[#1F1D1B] font-semibold' : 'text-[#817870]'
            }`}
          >
            All Apparel
            {currentView === 'shop' && !selectedCategory && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#292725]" />
            )}
          </button>

          <button
            id="nav-baggy-pants-btn"
            onClick={() => handleNavClick('shop', 'Baggy Pants')}
            className={`relative py-1 transition-colors hover:text-[#1F1D1B] cursor-pointer ${
              currentView === 'shop' && selectedCategory === 'Baggy Pants' ? 'text-[#1F1D1B] font-semibold' : 'text-[#817870]'
            }`}
          >
            Baggy Pants (15)
            {currentView === 'shop' && selectedCategory === 'Baggy Pants' && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#292725]" />
            )}
          </button>

          <button
            id="nav-lowcut-pants-btn"
            onClick={() => handleNavClick('shop', 'Low Cut Pants')}
            className={`relative py-1 transition-colors hover:text-[#1F1D1B] cursor-pointer ${
              currentView === 'shop' && selectedCategory === 'Low Cut Pants' ? 'text-[#1F1D1B] font-semibold' : 'text-[#817870]'
            }`}
          >
            Low Cut Pants (10)
            {currentView === 'shop' && selectedCategory === 'Low Cut Pants' && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#292725]" />
            )}
          </button>

          <button
            id="nav-tshirts-btn"
            onClick={() => handleNavClick('shop', 'T-Shirts')}
            className={`relative py-1 transition-colors hover:text-[#1F1D1B] cursor-pointer ${
              currentView === 'shop' && selectedCategory === 'T-Shirts' ? 'text-[#1F1D1B] font-semibold' : 'text-[#817870]'
            }`}
          >
            T-Shirts (10)
            {currentView === 'shop' && selectedCategory === 'T-Shirts' && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#292725]" />
            )}
          </button>

          <button
            id="nav-drop-shoulder-btn"
            onClick={() => handleNavClick('shop', 'Drop Shoulder')}
            className={`relative py-1 transition-colors hover:text-[#1F1D1B] cursor-pointer ${
              currentView === 'shop' && selectedCategory === 'Drop Shoulder' ? 'text-[#1F1D1B] font-semibold' : 'text-[#817870]'
            }`}
          >
            Drop Shoulder (10)
            {currentView === 'shop' && selectedCategory === 'Drop Shoulder' && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#292725]" />
            )}
          </button>

          <button
            id="nav-jeans-btn"
            onClick={() => handleNavClick('shop', 'Jeans')}
            className={`relative py-1 transition-colors hover:text-[#1F1D1B] cursor-pointer ${
              currentView === 'shop' && selectedCategory === 'Jeans' ? 'text-[#1F1D1B] font-semibold' : 'text-[#817870]'
            }`}
          >
            Jeans (20)
            {currentView === 'shop' && selectedCategory === 'Jeans' && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#292725]" />
            )}
          </button>
        </nav>

        {/* Right Desktop / Mobile Actions */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          {/* Order Tracking Button */}
          <button
            id="header-track-order-btn"
            onClick={() => openOrderTracking()}
            aria-label="Track Order"
            title="Track Order Dispatch"
            className="p-2 text-[#292725] hover:text-[#817870] hover:bg-[#F7F3EE] rounded-full transition-colors cursor-pointer hidden md:inline-flex"
          >
            <Truck className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Search Trigger */}
          <button
            id="header-search-btn"
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search"
            className="p-2 text-[#292725] hover:text-[#817870] hover:bg-[#F7F3EE] rounded-full transition-colors cursor-pointer"
          >
            <Search className="w-5 h-5 stroke-[1.75]" />
          </button>

          {/* Wishlist */}
          <button
            id="header-wishlist-btn"
            onClick={() => setIsWishlistOpen(true)}
            aria-label="Wishlist"
            className="relative p-2 text-[#292725] hover:text-[#817870] hover:bg-[#F7F3EE] rounded-full transition-colors cursor-pointer"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#292725] text-[#FCFAF7] text-[10px] font-bold rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* User Profile / Auth Button */}
          {currentUser ? (
            <button
              id="header-profile-btn"
              onClick={openUserProfile}
              aria-label="My Account"
              title={`Logged in as ${currentUser.fullName}`}
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 bg-[#F7F3EE] hover:bg-[#EAE3D9] border border-[#DED7D0] rounded-full transition-colors cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#292725] text-[#FCFAF7] text-[10px] font-bold flex items-center justify-center font-serif-editorial">
                {currentUser.avatarInitials || 'SO'}
              </div>
              <span className="hidden xl:inline text-xs font-semibold text-[#292725] max-w-[90px] truncate">
                {currentUser.fullName.split(' ')[0]}
              </span>
            </button>
          ) : (
            <button
              id="header-auth-btn"
              onClick={() => openUserAuth('login')}
              aria-label="Sign In or Register"
              title="Sign In / Register"
              className="p-2 text-[#292725] hover:text-[#817870] hover:bg-[#F7F3EE] rounded-full transition-colors cursor-pointer"
            >
              <User className="w-5 h-5 stroke-[1.75]" />
            </button>
          )}

          {/* Admin Portal Quick Lock Icon */}
          <button
            id="header-admin-btn"
            onClick={openAdminPortal}
            aria-label="Admin Dashboard"
            className="hidden sm:inline-flex p-2 text-[#292725] hover:text-[#817870] hover:bg-[#F7F3EE] rounded-full transition-colors cursor-pointer"
            title={isAdminLoggedIn ? "Open Admin Operations Dashboard" : "Admin Operations Login"}
          >
            {isAdminLoggedIn ? (
              <ShieldCheck className="w-5 h-5 stroke-[1.75] text-emerald-700" />
            ) : (
              <Lock className="w-5 h-5 stroke-[1.75]" />
            )}
          </button>

          {/* Cart Bag */}
          <button
            id="header-cart-btn"
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Bag"
            className="relative flex items-center gap-2 px-3 py-2 bg-[#292725] text-[#FCFAF7] hover:bg-[#1F1D1B] rounded-full transition-all cursor-pointer shadow-xs"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2]" />
            <span className="text-xs font-semibold tracking-wider font-sans-body">
              {cartTotalCount}
            </span>
          </button>

          {/* Mobile Hamburger Menu */}
          <button
            id="header-mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
            className="lg:hidden p-2 text-[#292725] hover:bg-[#F7F3EE] rounded-lg transition-colors cursor-pointer"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>
    </header>
  );
};


