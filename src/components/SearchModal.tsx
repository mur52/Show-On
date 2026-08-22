import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, TrendingUp, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, CATEGORIES } from '../data/products';

export const SearchModal: React.FC = () => {
  const {
    isSearchOpen,
    setIsSearchOpen,
    searchQuery,
    setSearchQuery,
    openProductDetail,
    setCurrentView,
    setSelectedCategory,
    formatBDT,
  } = useShop();

  const [inputVal, setInputVal] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularSearches = [
    'Beige Overshirt',
    'Tailored Blazer',
    'Pure Linen Shirt',
    'Knit Polo',
    'Utility Jacket',
    'Leather Weekender',
  ];

  const searchResults = inputVal.trim()
    ? PRODUCTS.filter((p) => {
        const q = inputVal.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.descriptor.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        );
      })
    : [];

  const handleSelectProduct = (prod: any) => {
    setIsSearchOpen(false);
    openProductDetail(prod);
  };

  const handleSelectCategory = (catName: string) => {
    setIsSearchOpen(false);
    setSelectedCategory(catName);
    setCurrentView('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center p-3 sm:p-6 bg-[#292725]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        id="search-modal-container"
        className="relative bg-[#FCFAF7] rounded-2xl md:rounded-3xl border border-[#DED7D0] shadow-2xl max-w-3xl w-full mt-8 sm:mt-16 overflow-hidden z-10"
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-[#DED7D0] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#817870] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Search tailored blazers, linen shirts, bombers, leather goods..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            className="w-full bg-transparent text-base sm:text-lg text-[#292725] placeholder-[#817870] focus:outline-none font-serif-editorial font-bold"
          />
          {inputVal && (
            <button
              onClick={() => setInputVal('')}
              className="p-1 text-[#817870] hover:text-[#292725]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            aria-label="Close search"
            className="p-2 text-[#292725] hover:bg-[#F7F3EE] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
          {inputVal.trim() ? (
            <div>
              <div className="flex items-center justify-between text-xs text-[#817870] mb-4">
                <span>Matching Styles ({searchResults.length})</span>
                {searchResults.length > 0 && (
                  <button
                    onClick={() => {
                      setIsSearchOpen(false);
                      setCurrentView('shop');
                    }}
                    className="text-[#292725] hover:underline"
                  >
                    View in Shop Catalog
                  </button>
                )}
              </div>

              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {searchResults.map((prod) => (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod)}
                      className="flex items-center gap-3.5 p-3 bg-[#F7F3EE] hover:bg-[#EAE3D9] rounded-xl border border-[#DED7D0] transition-colors cursor-pointer group"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-20 object-cover rounded-lg bg-[#D8CEC3] shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#817870] font-semibold">
                          {prod.category}
                        </span>
                        <h4 className="font-serif-editorial text-base font-bold text-[#292725] truncate group-hover:text-[#1F1D1B]">
                          {prod.name}
                        </h4>
                        <p className="text-xs font-bold text-[#292725] mt-1">
                          {formatBDT(prod.price)}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#B8ACA1] group-hover:text-[#292725] transition-transform group-hover:translate-x-1 shrink-0" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center text-[#817870]">
                  <p className="font-serif-editorial text-xl font-bold text-[#292725]">
                    No pieces found for "{inputVal}"
                  </p>
                  <p className="text-xs mt-1">
                    Try searching for "Overshirt", "Blazer", "Polo", "Linen", or "Jacket".
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Popular Searches */}
              <div>
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#817870] mb-3">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {popularSearches.map((term) => (
                    <button
                      key={term}
                      onClick={() => setInputVal(term)}
                      className="px-3.5 py-1.5 bg-[#F7F3EE] hover:bg-[#D8CEC3] text-[#292725] text-xs font-medium rounded-full border border-[#DED7D0] transition-colors cursor-pointer"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse by Categories */}
              <div>
                <div className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-bold text-[#817870] mb-3">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Shop By Collection</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat.name)}
                      className="flex items-center justify-between p-3 bg-[#F7F3EE] hover:bg-[#D8CEC3] rounded-xl border border-[#DED7D0] text-xs font-semibold text-[#292725] transition-colors cursor-pointer text-left"
                    >
                      <span>{cat.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#817870]" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
