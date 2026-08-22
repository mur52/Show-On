import React from 'react';
import { Facebook, Instagram, Phone, Mail, MapPin, ShieldCheck, CreditCard, Truck, Lock } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const {
    setCurrentView,
    setSelectedCategory,
    setIsAboutOpen,
    setIsContactOpen,
    setIsSizeGuideOpen,
    openOrderTracking,
    openAdminPortal,
  } = useShop();

  const handleNav = (view: 'home' | 'shop', category?: string) => {
    setCurrentView(view);
    if (category) setSelectedCategory(category);
    else setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#1F1D1B] text-[#D8CEC3] border-t border-[#817870]/30 font-sans-body">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        {/* Main 5 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#817870]/25">
          {/* Column 1: Brand Wordmark & Mission */}
          <div className="lg:col-span-1 space-y-4">
            <div>
              <span className="font-serif-editorial text-3xl font-bold tracking-[0.2em] text-[#FCFAF7]">
                SHOW ON
              </span>
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#817870] mt-0.5">
                Modern Menswear
              </p>
            </div>
            <p className="text-xs text-[#B8ACA1] leading-relaxed">
              Modern menswear for every moment. Engineered with bespoke fabrics and timeless tailoring for the discerning contemporary gentleman.
            </p>
            <div className="pt-2 text-xs text-[#817870] space-y-1.5">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D8CEC3]" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#D8CEC3]" />
                <span>+880 1711 000 888</span>
              </div>
            </div>
          </div>

          {/* Column 2: Shop */}
          <div>
            <h4 className="font-serif-editorial text-lg font-bold text-[#FCFAF7] tracking-wider uppercase mb-4">
              Shop
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer"
                >
                  New Arrivals
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop')}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer"
                >
                  Bestsellers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'Casual Wear')}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer"
                >
                  Casual Wear
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'Formal Wear')}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer"
                >
                  Formal Suits & Blazers
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'Outerwear')}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer"
                >
                  Jackets & Outerwear
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('shop', 'Accessories')}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer"
                >
                  Leather Accessories
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Help & Support */}
          <div>
            <h4 className="font-serif-editorial text-lg font-bold text-[#FCFAF7] tracking-wider uppercase mb-4">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  id="footer-track-order-btn"
                  onClick={() => openOrderTracking()}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer flex items-center gap-1.5 text-amber-300 font-semibold"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Track Consignment</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer"
                >
                  Contact Concierge
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer"
                >
                  Delivery Information (Bangladesh)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer"
                >
                  Returns & 7-Day Exchange
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <span>Size & Fitting Guide</span>
                  <span className="text-[10px] bg-[#292725] px-1.5 py-0.5 rounded text-[#FCFAF7]">New</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="font-serif-editorial text-lg font-bold text-[#FCFAF7] tracking-wider uppercase mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button
                  onClick={() => setIsAboutOpen(true)}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer"
                >
                  About Show On
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAboutOpen(true)}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer"
                >
                  Our Craft & Materials
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAboutOpen(true)}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer"
                >
                  Sustainability Manifesto
                </button>
              </li>
              <li>
                <button
                  id="footer-admin-btn"
                  onClick={openAdminPortal}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer flex items-center gap-1 text-[#D8CEC3] font-medium"
                >
                  <Lock className="w-3 h-3 text-stone-400" />
                  <span>Staff / Admin Portal</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsAboutOpen(true)}
                  className="hover:text-[#FCFAF7] transition-colors cursor-pointer text-stone-400"
                >
                  Terms & Privacy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Connect & Payment Support */}
          <div>
            <h4 className="font-serif-editorial text-lg font-bold text-[#FCFAF7] tracking-wider uppercase mb-4">
              Connect
            </h4>
            <div className="flex items-center space-x-3 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#292725] text-[#D8CEC3] hover:text-[#FCFAF7] hover:bg-[#817870] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-[#292725] text-[#D8CEC3] hover:text-[#FCFAF7] hover:bg-[#817870] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <button
                onClick={() => setIsContactOpen(true)}
                className="w-9 h-9 rounded-full bg-[#292725] text-[#D8CEC3] hover:text-[#FCFAF7] hover:bg-[#817870] flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-[#817870]">
              <span className="block font-semibold text-[#D8CEC3] mb-2 uppercase tracking-wider text-[10px]">
                Accepted Payment Gateways
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 bg-[#292725] rounded text-[10px] text-[#FCFAF7] border border-[#817870]/40">bKash</span>
                <span className="px-2 py-1 bg-[#292725] rounded text-[10px] text-[#FCFAF7] border border-[#817870]/40">Nagad</span>
                <span className="px-2 py-1 bg-[#292725] rounded text-[10px] text-[#FCFAF7] border border-[#817870]/40">Cash on Delivery</span>
                <span className="px-2 py-1 bg-[#292725] rounded text-[10px] text-[#FCFAF7] border border-[#817870]/40">Visa / MC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#817870]">
          <div>
            © 2026 Show On Menswear Ltd. All rights reserved. Designed for Bangladesh.
          </div>
          <div className="flex items-center gap-6">
            <span>Dhaka Showroom: Banani 11 & Dhanmondi 27</span>
            <span>Secured SSL Checkout</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

