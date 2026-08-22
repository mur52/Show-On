import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const PromoBanner: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const handleShopPromo = () => {
    setCurrentView('shop');
    setSelectedCategory('Outerwear');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="promo-banner-section" className="py-8 sm:py-12 lg:py-16 bg-[#F7F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#D8CEC3]/40 border border-[#DED7D0] shadow-sm grid grid-cols-1 lg:grid-cols-2 min-h-[440px] lg:min-h-[480px]">
          {/* Left Column: Text & Editorial Content */}
          <div className="p-8 sm:p-12 lg:p-16 flex flex-col justify-center items-start bg-[#FCFAF7] z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7F3EE] border border-[#DED7D0] mb-4 sm:mb-6">
              <Sparkles className="w-3.5 h-3.5 text-[#817870]" />
              <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#292725]">
                New Season
              </span>
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#292725] leading-tight mb-4">
              Elevate Your Everyday
            </h2>

            <p className="text-sm sm:text-base text-[#817870] max-w-md mb-8 leading-relaxed font-sans-body">
              Timeless layers and modern essentials made for every occasion. Experience breathable natural cottons, structured silhouettes, and meticulous stitching.
            </p>

            <button
              id="promo-shop-collection-btn"
              onClick={handleShopPromo}
              className="group inline-flex items-center gap-3 px-8 py-3.5 bg-[#292725] text-[#FCFAF7] hover:bg-[#1F1D1B] font-medium text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-xs cursor-pointer"
            >
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right Column: High-Res Editorial Lifestyle Photography */}
          <div className="relative w-full h-[320px] lg:h-auto min-h-full overflow-hidden bg-[#B8ACA1]">
            <img
              src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1200&q=85"
              alt="Show On Seasonal Men's Collection Campaign"
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover object-center lg:object-top transition-transform duration-1000 hover:scale-105"
            />
            {/* Subtle Tonal Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#FCFAF7] via-transparent to-transparent opacity-40 lg:opacity-20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
};
