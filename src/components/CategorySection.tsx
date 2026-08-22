import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES } from '../data/products';
import { useShop } from '../context/ShopContext';

export const CategorySection: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="categories-section" className="py-12 sm:py-16 lg:py-20 bg-[#F7F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Decorative Line */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#817870]">
              Curated Wardrobes
            </span>
            <div className="flex items-center gap-4">
              <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#292725]">
                EXPLORE THE COLLECTION
              </h2>
            </div>
          </div>
          <div className="hidden md:flex items-center flex-1 max-w-xs mx-6">
            <div className="h-[1px] w-full bg-[#DED7D0]" />
          </div>
          <button
            id="view-all-categories-btn"
            onClick={() => {
              setSelectedCategory(null);
              setCurrentView('shop');
            }}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#292725] hover:text-[#817870] transition-colors pb-1 border-b border-[#292725] cursor-pointer self-start sm:self-auto"
          >
            <span>View All Styles</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* 5 Category Cards Grid (Responsive 2-col on mobile, 3-col on tablet, 5-col on desktop) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {CATEGORIES.map((cat, idx) => (
            <div
              key={cat.id}
              id={`category-card-${cat.id}`}
              onClick={() => handleCategorySelect(cat.name)}
              className="group relative flex flex-col bg-[#FCFAF7] rounded-xl sm:rounded-2xl overflow-hidden border border-[#DED7D0] shadow-2xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1.5 cursor-pointer"
            >
              {/* Image Container with Controlled Aspect Ratio */}
              <div className="relative aspect-[4/5] sm:aspect-[3/4] overflow-hidden bg-[#EAE3D9]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#292725]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating Explore Indicator on Hover */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FCFAF7] text-[#292725] flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-sm">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Category Details */}
              <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 bg-[#FCFAF7]">
                <div>
                  <h3 className="font-serif-editorial text-lg sm:text-xl font-bold text-[#292725] group-hover:text-[#1F1D1B] transition-colors leading-snug">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#817870] mt-1 font-sans-body line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-[#DED7D0]/60 flex items-center justify-between text-[11px] uppercase tracking-wider text-[#817870] font-medium">
                  <span>Explore</span>
                  <span className="text-[#292725] font-semibold">{cat.itemCount}+ Items</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
