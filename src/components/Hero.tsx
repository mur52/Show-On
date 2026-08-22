import React from 'react';
import { ArrowRight, Truck, ShieldCheck, Compass } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Hero: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const handleShopNow = () => {
    setCurrentView('shop');
    setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreCollection = () => {
    const categorySection = document.getElementById('categories-section');
    if (categorySection) {
      categorySection.scrollIntoView({ behavior: 'smooth' });
    } else {
      setCurrentView('shop');
    }
  };

  return (
    <section id="hero-section" className="relative w-full overflow-hidden bg-[#F7F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 lg:py-12">
        {/* Main Editorial Hero Card */}
        <div className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden bg-[#EAE3D9] min-h-[580px] sm:min-h-[640px] lg:min-h-[700px] flex flex-col justify-end lg:justify-center border border-[#DED7D0] shadow-sm">
          {/* Background & Model Photography */}
          <div className="absolute inset-0 w-full h-full">
            <img
              src="https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&w=2000&q=85"
              alt="Show On Modern Menswear Campaign"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-top sm:object-right-top lg:object-right transition-transform duration-1000 scale-[1.01]"
            />
            {/* Gradient Overlays for High-Contrast Editorial Typography */}
            {/* Desktop Left Fade */}
            <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-[#F7F3EE]/95 via-[#F7F3EE]/75 to-transparent w-3/5 pointer-events-none" />
            {/* Mobile Bottom Fade */}
            <div className="block lg:hidden absolute inset-0 bg-gradient-to-t from-[#292725]/90 via-[#292725]/50 to-transparent pointer-events-none" />
          </div>

          {/* Hero Content Overlay */}
          <div className="relative z-10 p-6 sm:p-10 lg:p-16 max-w-xl lg:max-w-2xl">
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCFAF7]/90 lg:bg-[#FCFAF7] backdrop-blur-xs border border-[#DED7D0] mb-4 sm:mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#817870] animate-pulse" />
              <span className="text-[11px] sm:text-xs font-semibold tracking-[0.2em] uppercase text-[#292725]">
                Modern Men's Collection
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif-editorial text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white lg:text-[#1F1D1B] leading-[1.08] mb-4 sm:mb-6 drop-shadow-xs lg:drop-shadow-none">
              Style That Speaks <br />
              <span className="italic font-normal text-[#D8CEC3] lg:text-[#817870]">For You.</span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base lg:text-lg text-[#FCFAF7]/90 lg:text-[#817870] max-w-lg mb-8 leading-relaxed font-sans-body">
              Discover refined menswear designed for everyday confidence, comfort, and effortless style. Tailored cuts, breathable fabrics, and timeless silhouettes.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
              <button
                id="hero-shop-now-btn"
                onClick={handleShopNow}
                className="group inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#292725] text-[#FCFAF7] hover:bg-[#1F1D1B] font-medium text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                id="hero-explore-collection-btn"
                onClick={handleExploreCollection}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-[#FCFAF7]/90 lg:bg-transparent text-[#292725] border border-[#292725]/30 lg:border-[#292725] hover:bg-[#292725] hover:text-[#FCFAF7] font-medium text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all duration-300 cursor-pointer"
              >
                <Compass className="w-4 h-4" />
                <span>Explore Collection</span>
              </button>
            </div>

            {/* Trust Micro Indicators on Hero */}
            <div className="mt-8 pt-6 border-t border-white/20 lg:border-[#DED7D0] flex flex-wrap items-center gap-y-2 gap-x-6 text-[12px] text-white/80 lg:text-[#817870]">
              <div className="flex items-center gap-2">
                <Truck className="w-3.5 h-3.5 text-[#D8CEC3] lg:text-[#292725]" />
                <span>Delivery across 64 districts</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#D8CEC3] lg:text-[#292725]" />
                <span>Cash on Delivery & Easy Exchange</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
