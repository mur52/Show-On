import React, { useState, useMemo } from 'react';
import { Filter, X, SlidersHorizontal, ArrowUpDown, Search, Check } from 'lucide-react';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from './ProductCard';
import { useShop } from '../context/ShopContext';

export const ShopView: React.FC = () => {
  const { selectedCategory, setSelectedCategory, formatBDT } = useShop();

  // Local filter states
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [maxPrice, setMaxPrice] = useState<number>(5000);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [localSearch, setLocalSearch] = useState<string>('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const allSizes = ['S', 'M', 'L', 'XL', 'XXL', 'One Size'];
  const allColors = [
    { name: 'Warm Beige', hex: '#D8CEC3' },
    { name: 'Charcoal', hex: '#292725' },
    { name: 'Ivory Cream', hex: '#FCFAF7' },
    { name: 'Warm Taupe', hex: '#B8ACA1' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Deep Olive Charcoal', hex: '#292725' },
  ];

  const handleSizeToggle = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setSelectedSizes([]);
    setSelectedColor(null);
    setMaxPrice(5000);
    setLocalSearch('');
    setSortBy('featured');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      // Category filter
      if (selectedCategory && p.category !== selectedCategory) return false;

      // Size filter
      if (selectedSizes.length > 0) {
        const hasSize = p.sizes.some((s) => selectedSizes.includes(s));
        if (!hasSize) return false;
      }

      // Color filter
      if (selectedColor) {
        const hasColor = p.colors.some((c) => c.name.toLowerCase().includes(selectedColor.toLowerCase()));
        if (!hasColor) return false;
      }

      // Price filter
      if (p.price > maxPrice) return false;

      // Search term
      if (localSearch.trim()) {
        const query = localSearch.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCat = p.category.toLowerCase().includes(query);
        const matchesDesc = p.descriptor.toLowerCase().includes(query);
        if (!matchesName && !matchesCat && !matchesDesc) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, selectedSizes, selectedColor, maxPrice, localSearch, sortBy]);

  return (
    <div id="shop-catalog-view" className="bg-[#F7F3EE] min-h-screen py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Shop Page Banner / Header */}
        <div className="bg-[#FCFAF7] border border-[#DED7D0] rounded-2xl p-6 sm:p-10 mb-8 sm:mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xs">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#817870]">
              The Show On Wardrobe
            </span>
            <h1 className="font-serif-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#292725] mt-1">
              {selectedCategory || 'All Collections'}
            </h1>
            <p className="text-sm text-[#817870] mt-2 font-sans-body max-w-xl">
              Engineered with premium long-staple fabrics, clean tailoring, and relaxed contemporary drape. Designed for everyday confidence.
            </p>
          </div>

          {/* Quick Search within Shop */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-[#817870] absolute left-3.5 top-3.5" />
            <input
              type="text"
              placeholder="Filter by keyword (e.g. linen, blazer)..."
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#F7F3EE] border border-[#DED7D0] rounded-xl text-xs sm:text-sm text-[#292725] placeholder-[#817870] focus:outline-none focus:border-[#292725] transition-colors"
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch('')}
                className="absolute right-3 top-3 text-[#817870] hover:text-[#292725]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
              selectedCategory === null
                ? 'bg-[#292725] text-[#FCFAF7] shadow-xs'
                : 'bg-[#FCFAF7] text-[#817870] hover:text-[#292725] border border-[#DED7D0]'
            }`}
          >
            All Categories ({PRODUCTS.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat.name
                  ? 'bg-[#292725] text-[#FCFAF7] shadow-xs'
                  : 'bg-[#FCFAF7] text-[#817870] hover:text-[#292725] border border-[#DED7D0]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Active Filter Chips & Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DED7D0] mb-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-[#FCFAF7] border border-[#DED7D0] rounded-xl text-xs font-semibold text-[#292725]"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <span className="text-xs font-semibold text-[#817870] font-sans-body">
              Showing <span className="text-[#292725]">{filteredProducts.length}</span> results
            </span>

            {(selectedCategory || selectedSizes.length > 0 || selectedColor || localSearch) && (
              <button
                onClick={handleClearFilters}
                className="text-xs text-[#817870] hover:text-[#292725] underline cursor-pointer"
              >
                Reset all
              </button>
            )}
          </div>

          {/* Sort By Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#817870] uppercase tracking-wider font-semibold">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FCFAF7] border border-[#DED7D0] text-xs font-semibold text-[#292725] rounded-xl px-3 py-2 focus:outline-none focus:border-[#292725] cursor-pointer"
            >
              <option value="featured">Featured / Newest</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Main Content Layout: Sidebar + Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-1 space-y-8 bg-[#FCFAF7] p-6 rounded-2xl border border-[#DED7D0] h-fit sticky top-28 shadow-2xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#DED7D0]">
              <h3 className="font-serif-editorial text-xl font-bold text-[#292725]">
                Refine Wardrobe
              </h3>
              {(selectedSizes.length > 0 || selectedColor || maxPrice < 5000) && (
                <button
                  onClick={handleClearFilters}
                  className="text-[11px] uppercase tracking-wider text-[#817870] hover:text-[#292725]"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Sizes Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#292725] mb-3">
                Size
              </h4>
              <div className="grid grid-cols-3 gap-2">
                {allSizes.map((sz) => {
                  const active = selectedSizes.includes(sz);
                  return (
                    <button
                      key={sz}
                      onClick={() => handleSizeToggle(sz)}
                      className={`py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                        active
                          ? 'bg-[#292725] text-[#FCFAF7] border-[#292725]'
                          : 'bg-[#F7F3EE] text-[#292725] border-[#DED7D0] hover:border-[#817870]'
                      }`}
                    >
                      {sz}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Colors Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#292725] mb-3">
                Palette & Color
              </h4>
              <div className="space-y-2">
                {allColors.map((col) => {
                  const active = selectedColor === col.name;
                  return (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(active ? null : col.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                        active ? 'bg-[#292725] text-[#FCFAF7]' : 'hover:bg-[#F7F3EE] text-[#292725]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-[#DED7D0]"
                          style={{ backgroundColor: col.hex }}
                        />
                        <span className="font-medium">{col.name}</span>
                      </div>
                      {active && <Check className="w-3.5 h-3.5" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Price Slider Filter */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#292725]">
                  Max Price
                </h4>
                <span className="text-xs font-bold text-[#292725]">
                  {formatBDT(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="1000"
                max="5000"
                step="200"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#292725] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#817870] mt-1">
                <span>৳1,000</span>
                <span>৳5,000+</span>
              </div>
            </div>

            {/* Bangladesh Delivery Guarantee */}
            <div className="pt-4 border-t border-[#DED7D0] text-xs text-[#817870] space-y-1">
              <p className="font-semibold text-[#292725]">Delivery Across Bangladesh</p>
              <p>Dhaka: ৳60 (24-48 hrs)</p>
              <p>Outside Dhaka: ৳120 (3-4 days)</p>
            </div>
          </aside>

          {/* Product Grid Area */}
          <main className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="bg-[#FCFAF7] border border-[#DED7D0] rounded-2xl p-12 text-center">
                <p className="font-serif-editorial text-2xl text-[#292725] font-bold mb-2">
                  No styles matched your criteria
                </p>
                <p className="text-xs text-[#817870] mb-6">
                  Try clearing some filter tags or search terms to discover more pieces.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-6 py-2.5 bg-[#292725] text-[#FCFAF7] text-xs uppercase font-semibold tracking-wider rounded-xl cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-[#292725]/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-xs bg-[#FCFAF7] h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-[#DED7D0]">
                <h3 className="font-serif-editorial text-xl font-bold text-[#292725]">
                  Filter Wardrobe
                </h3>
                <button onClick={() => setIsMobileFilterOpen(false)}>
                  <X className="w-5 h-5 text-[#292725]" />
                </button>
              </div>

              {/* Sizes */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#292725] mb-2.5">
                  Size
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  {allSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => handleSizeToggle(sz)}
                      className={`py-2 text-xs font-semibold rounded-lg border ${
                        selectedSizes.includes(sz)
                          ? 'bg-[#292725] text-[#FCFAF7] border-[#292725]'
                          : 'bg-[#F7F3EE] text-[#292725] border-[#DED7D0]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#292725]">
                    Max Price
                  </h4>
                  <span className="text-xs font-bold text-[#292725]">
                    {formatBDT(maxPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="5000"
                  step="200"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#292725]"
                />
              </div>
            </div>

            <div className="pt-6 border-t border-[#DED7D0]">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-[#292725] text-[#FCFAF7] font-semibold text-xs uppercase tracking-widest rounded-xl"
              >
                Apply Filters ({filteredProducts.length} items)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
