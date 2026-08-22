import React, { useState, useEffect, useRef } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ShoppingBag,
  Heart,
  Eye,
  Play,
  Pause,
  ArrowRight,
  Flame,
  Star,
  Layers,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { Product, ProductCategory } from '../types';
import { useShop } from '../context/ShopContext';

export const AnimatedProductCarousel: React.FC = () => {
  const {
    openProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setCurrentView,
    setSelectedCategory,
    formatBDT,
    showToast,
  } = useShop();

  const [activeCategory, setActiveCategory] = useState<'All' | ProductCategory>('All');
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [scrollSpeed, setScrollSpeed] = useState<'normal' | 'slow' | 'fast'>('normal');
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [selectedQuickSizes, setSelectedQuickSizes] = useState<{ [productId: string]: string }>({});

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Filter products based on selected tab
  const filteredProducts = PRODUCTS.filter((p) => {
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  // Duplicate list to achieve a seamless loop effect
  const displayProducts = [...filteredProducts, ...filteredProducts];

  // Auto-scroll animation effect
  useEffect(() => {
    let animationFrameId: number;
    let speedPixel = scrollSpeed === 'slow' ? 0.6 : scrollSpeed === 'fast' ? 1.8 : 1.0;

    const autoScroll = () => {
      if (isPlaying && scrollContainerRef.current && !hoveredProductId) {
        const container = scrollContainerRef.current;
        container.scrollLeft += speedPixel;

        // If reached halfway (the duplicated section), reset to start seamlessly
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(autoScroll);
    };

    animationFrameId = requestAnimationFrame(autoScroll);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, scrollSpeed, hoveredProductId]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      const scrollAmount = container.clientWidth * 0.75;
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleQuickAdd = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    const size = selectedQuickSizes[product.id] || product.sizes[0] || 'L';
    const color = product.colors[0] || { name: 'Default', hex: '#000000' };
    addToCart(product, size, color, 1);
    showToast(`Added ${product.name} (${size}) to your bag`, 'success');
  };

  const handleQuickSizeSelect = (e: React.MouseEvent, productId: string, size: string) => {
    e.stopPropagation();
    setSelectedQuickSizes((prev) => ({ ...prev, [productId]: size }));
  };

  return (
    <section
      id="animated-products-carousel-section"
      className="py-14 sm:py-20 bg-[#F4EFEA] border-y border-[#DED7D0]/70 relative overflow-hidden"
    >
      {/* Subtle background ambient accents */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-stone-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Live Status & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#292725] text-[#FCFAF7] rounded-full text-xs font-semibold uppercase tracking-widest mb-3 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Live Animated Showcase</span>
            </div>

            <h2 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#292725]">
              SIGNATURE ROTATION
            </h2>

            <p className="text-xs sm:text-sm text-[#817870] mt-1.5 max-w-xl font-sans-body leading-relaxed">
              Explore our contemporary silhouettes in continuous motion. Hover on any piece to inspect fabric textures, switch sizes, and quick-add to bag.
            </p>
          </div>

          {/* Carousel Control Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto">
            {/* Speed Selector */}
            <div className="flex items-center bg-[#FCFAF7] border border-[#DED7D0] rounded-xl p-1 shadow-2xs text-xs font-semibold">
              {(['slow', 'normal', 'fast'] as const).map((spd) => (
                <button
                  key={spd}
                  onClick={() => setScrollSpeed(spd)}
                  className={`px-2.5 py-1 rounded-lg capitalize transition-colors cursor-pointer ${
                    scrollSpeed === spd
                      ? 'bg-[#292725] text-[#FCFAF7]'
                      : 'text-[#817870] hover:text-[#292725]'
                  }`}
                >
                  {spd}
                </button>
              ))}
            </div>

            {/* Play / Pause Autoscroll Toggle */}
            <button
              id="btn-toggle-carousel-play"
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause auto-scroll' : 'Play auto-scroll'}
              className="p-2.5 bg-[#FCFAF7] hover:bg-[#292725] text-[#292725] hover:text-[#FCFAF7] border border-[#DED7D0] rounded-xl transition-all cursor-pointer shadow-2xs flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider"
              title={isPlaying ? 'Pause auto-scroll' : 'Resume auto-scroll'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              <span className="hidden sm:inline">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            {/* Previous / Next Arrow Controls */}
            <div className="flex items-center gap-1.5">
              <button
                id="btn-carousel-prev"
                onClick={() => handleManualScroll('left')}
                aria-label="Scroll left"
                className="p-2.5 bg-[#FCFAF7] hover:bg-[#292725] text-[#292725] hover:text-[#FCFAF7] border border-[#DED7D0] rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                id="btn-carousel-next"
                onClick={() => handleManualScroll('right')}
                aria-label="Scroll right"
                className="p-2.5 bg-[#FCFAF7] hover:bg-[#292725] text-[#292725] hover:text-[#FCFAF7] border border-[#DED7D0] rounded-xl transition-all cursor-pointer shadow-2xs"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {(['All', 'Drop Shoulder', 'Baggy Pants', 'Jeans', 'Low Cut Pants', 'T-Shirts'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#292725] text-[#FCFAF7] shadow-xs'
                  : 'bg-[#FCFAF7] text-[#817870] hover:text-[#292725] border border-[#DED7D0]'
              }`}
            >
              {cat === 'All' ? 'All Silhouettes' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Smooth Continuous Product Carousel Track */}
      <div className="w-full relative">
        {/* Soft edge gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-[#F4EFEA] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-[#F4EFEA] to-transparent z-10 pointer-events-none" />

        <div
          ref={scrollContainerRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-none px-4 sm:px-8 py-4 cursor-grab active:cursor-grabbing select-none"
          style={{ scrollBehavior: 'auto' }}
        >
          {displayProducts.map((product, index) => {
            const isHovered = hoveredProductId === `${product.id}-${index}`;
            const isSaved = isInWishlist(product.id);
            const currentSelectedSize = selectedQuickSizes[product.id] || product.sizes[0] || 'L';

            return (
              <div
                key={`${product.id}-${index}`}
                onMouseEnter={() => setHoveredProductId(`${product.id}-${index}`)}
                onMouseLeave={() => setHoveredProductId(null)}
                onClick={() => openProductDetail(product)}
                className="w-[260px] sm:w-[290px] shrink-0 flex flex-col bg-[#FCFAF7] rounded-2xl overflow-hidden border border-[#DED7D0] shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer"
              >
                {/* Product Image Stage */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#EAE3D9]">
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    loading="lazy"
                    className={`w-full h-full object-cover object-top transition-all duration-500 ${
                      isHovered && product.secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
                    }`}
                  />

                  {product.secondaryImage && (
                    <img
                      src={product.secondaryImage}
                      alt={`${product.name} look`}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover object-top transition-all duration-500 ${
                        isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
                      }`}
                    />
                  )}

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
                    {product.badge && (
                      <span
                        className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-md shadow-xs ${
                          product.badge === 'SALE'
                            ? 'bg-[#292725] text-[#FCFAF7]'
                            : product.badge === 'NEW'
                            ? 'bg-[#FCFAF7] text-[#292725] border border-[#DED7D0]'
                            : product.badge === 'BESTSELLER'
                            ? 'bg-[#D8CEC3] text-[#1F1D1B]'
                            : 'bg-[#817870] text-[#FCFAF7]'
                        }`}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 cursor-pointer shadow-xs ${
                      isSaved
                        ? 'bg-[#292725] text-[#FCFAF7]'
                        : 'bg-[#FCFAF7]/90 text-[#292725] hover:bg-[#FCFAF7] hover:scale-110'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>

                  {/* Floating Interactive Quick Bar (Appears on hover) */}
                  <div
                    className={`absolute inset-x-3 bottom-3 p-2.5 bg-[#292725]/95 backdrop-blur-md rounded-xl text-[#FCFAF7] transition-all duration-300 space-y-2 z-10 ${
                      isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3 pointer-events-none'
                    }`}
                  >
                    {/* Quick Sizes */}
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-stone-400 font-semibold uppercase tracking-wider">Size:</span>
                      <div className="flex items-center gap-1">
                        {product.sizes.slice(0, 4).map((sz) => (
                          <button
                            key={sz}
                            onClick={(e) => handleQuickSizeSelect(e, product.id, sz)}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer ${
                              currentSelectedSize === sz
                                ? 'bg-amber-400 text-stone-950 font-bold'
                                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                            }`}
                          >
                            {sz}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Quick Add Button */}
                    <button
                      onClick={(e) => handleQuickAdd(e, product)}
                      className="w-full py-1.5 bg-amber-400 hover:bg-amber-300 text-stone-950 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add ({currentSelectedSize})</span>
                    </button>
                  </div>
                </div>

                {/* Product Metadata Details */}
                <div className="p-4 flex-1 flex flex-col justify-between space-y-2">
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#817870] font-medium mb-1">
                      <span className="uppercase tracking-wider">{product.category}</span>
                      <div className="flex items-center gap-1 text-[#292725] font-semibold">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span>{product.rating.toFixed(1)}</span>
                        <span className="text-[#817870] text-[10px]">({product.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="font-serif-editorial text-base font-bold text-[#292725] line-clamp-1 group-hover:text-[#817870] transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-xs text-[#817870] line-clamp-1 font-sans-body mt-0.5">
                      {product.descriptor}
                    </p>
                  </div>

                  {/* Price & Swatches */}
                  <div className="flex items-center justify-between pt-2 border-t border-[#DED7D0]/60">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif-editorial font-bold text-base text-[#292725]">
                        {formatBDT(product.price)}
                      </span>
                      {product.oldPrice && (
                        <span className="text-xs text-[#817870] line-through font-mono">
                          {formatBDT(product.oldPrice)}
                        </span>
                      )}
                    </div>

                    {/* Color swatches preview */}
                    <div className="flex items-center gap-1">
                      {product.colors.slice(0, 3).map((col, cIdx) => (
                        <span
                          key={cIdx}
                          title={col.name}
                          className="w-2.5 h-2.5 rounded-full border border-stone-300 shadow-2xs"
                          style={{ backgroundColor: col.hex }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Action / View All Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-[#DED7D0]">
        <div className="flex items-center gap-2 text-xs text-[#817870] font-medium">
          <Layers className="w-4 h-4 text-[#292725]" />
          <span>Showing 65 curated streetwear styles with heavyweight 260+ GSM textiles</span>
        </div>

        <button
          id="btn-carousel-view-all-shop"
          onClick={() => {
            setSelectedCategory(null);
            setCurrentView('shop');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#292725] text-[#FCFAF7] hover:bg-[#403C38] rounded-xl text-xs font-semibold uppercase tracking-widest transition-all cursor-pointer shadow-xs"
        >
          <span>Explore All Products</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
};
