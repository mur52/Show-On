import React from 'react';
import { ArrowRight, Flame } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const TrendingSection: React.FC = () => {
  const { setCurrentView, setSelectedCategory } = useShop();

  const trendingProducts = PRODUCTS.filter((p) => p.isTrending || p.badge === 'TRENDING' || p.badge === 'NEW').slice(0, 5);

  const handleViewAllTrending = () => {
    setSelectedCategory(null);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section id="trending-section" className="py-12 sm:py-16 lg:py-20 bg-[#F7F3EE] border-t border-[#DED7D0]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.25em] font-semibold text-[#817870] mb-2">
              <Flame className="w-3.5 h-3.5 text-[#292725]" />
              <span>In High Demand This Week</span>
            </div>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#292725]">
              TRENDING NOW
            </h2>
            <p className="text-sm text-[#817870] mt-1 font-sans-body">
              The latest silhouettes setting the tone across Dhaka and modern menswear circles.
            </p>
          </div>

          <button
            id="trending-view-all-link"
            onClick={handleViewAllTrending}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-[#292725] hover:text-[#817870] transition-colors pb-1 border-b border-[#292725] cursor-pointer self-start sm:self-auto"
          >
            <span>View All Trending</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
