import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';
import { ProductCategory } from '../types';

export const BestsellersSection: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();
  const [activeTab, setActiveTab] = useState<'all' | ProductCategory>('all');

  const bestsellers = PRODUCTS.filter((p) => p.isBestseller);

  const filteredProducts = activeTab === 'all'
    ? bestsellers
    : bestsellers.filter((p) => p.category === activeTab);

  return (
    <section id="bestsellers-section" className="py-12 sm:py-16 lg:py-20 bg-[#F7F3EE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] font-semibold text-[#817870] mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#292725]">
              BESTSELLERS
            </h2>
            <p className="text-sm text-[#817870] mt-1 font-sans-body">
              Signature menswear engineered for modern silhouettes, effortless drape, and lasting comfort.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {[
              { key: 'all', label: 'All Favorites' },
              { key: 'Baggy Pants', label: 'Baggy Pants' },
              { key: 'Low Cut Pants', label: 'Low Cut Pants' },
              { key: 'Drop Shoulder', label: 'Drop Shoulder' },
              { key: 'Jeans', label: 'Jeans' },
              { key: 'T-Shirts', label: 'T-Shirts' },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-[#292725] text-[#FCFAF7] shadow-xs'
                    : 'bg-[#FCFAF7] text-[#817870] hover:text-[#292725] border border-[#DED7D0]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Discover More Banner CTA */}
        <div className="mt-12 text-center">
          <button
            id="bestsellers-view-all-btn"
            onClick={() => {
              setSelectedCategory(null);
              setCurrentView('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-transparent border border-[#292725] text-[#292725] hover:bg-[#292725] hover:text-[#FCFAF7] rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-widest transition-all duration-300 cursor-pointer shadow-2xs"
          >
            <span>Explore All 65 Styles</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};

