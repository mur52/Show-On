import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    openProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatBDT,
  } = useShop();

  const [isHovered, setIsHovered] = useState(false);
  const [selectedQuickSize, setSelectedQuickSize] = useState<string>(product.sizes[0] || 'M');
  const [showQuickSizes, setShowQuickSizes] = useState(false);

  const isSaved = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedQuickSize);
    setShowQuickSizes(false);
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowQuickSizes(false);
      }}
      onClick={() => openProductDetail(product)}
      className="group relative flex flex-col bg-[#FCFAF7] rounded-xl sm:rounded-2xl overflow-hidden border border-[#DED7D0] shadow-2xs hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] overflow-hidden bg-[#EAE3D9]">
        {/* Primary Image */}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          loading="lazy"
          className={`w-full h-full object-cover object-center transition-all duration-700 ${
            isHovered && product.secondaryImage ? 'opacity-0 scale-105' : 'opacity-100 scale-100'
          }`}
        />

        {/* Secondary Angle Image on Hover */}
        {product.secondaryImage && (
          <img
            src={product.secondaryImage}
            alt={`${product.name} alternate angle`}
            referrerPolicy="no-referrer"
            loading="lazy"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-700 ${
              isHovered ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
            }`}
          />
        )}

        {/* Tasteful Badges (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1 z-10 pointer-events-none">
          {product.badge && (
            <span
              className={`px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest rounded-md ${
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

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlistToggle}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 cursor-pointer shadow-xs ${
            isSaved
              ? 'bg-[#292725] text-[#FCFAF7]'
              : 'bg-[#FCFAF7]/90 text-[#292725] hover:bg-[#FCFAF7] hover:scale-110'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View & Quick Add Action Bar (Desktop Hover & Mobile Accessible) */}
        <div className="absolute bottom-3 inset-x-3 z-10 transition-all duration-300">
          {!showQuickSizes ? (
            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowQuickSizes(true);
                }}
                className="flex-1 py-2.5 bg-[#292725] text-[#FCFAF7] hover:bg-[#1F1D1B] rounded-lg text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  openProductDetail(product);
                }}
                aria-label="Quick View"
                className="p-2.5 bg-[#FCFAF7] text-[#292725] hover:bg-[#F7F3EE] rounded-lg border border-[#DED7D0] shadow-sm transition-colors cursor-pointer"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          ) : (
            /* Quick Size Selector Bar */
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FCFAF7] p-2 rounded-lg border border-[#DED7D0] shadow-lg animate-in fade-in zoom-in-95 duration-200"
            >
              <div className="text-[10px] font-semibold text-[#817870] uppercase tracking-wider mb-1.5 text-center">
                Select Size
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedQuickSize(s)}
                    className={`px-2 py-1 text-[11px] font-semibold rounded ${
                      selectedQuickSize === s
                        ? 'bg-[#292725] text-[#FCFAF7]'
                        : 'bg-[#F7F3EE] text-[#292725] hover:bg-[#D8CEC3]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <button
                onClick={handleQuickAdd}
                className="w-full py-1.5 bg-[#292725] text-[#FCFAF7] text-[11px] font-bold uppercase tracking-wider rounded flex items-center justify-center gap-1"
              >
                <span>Add {selectedQuickSize}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-[#FCFAF7]">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-[11px] text-[#817870] mb-1">
            <span className="uppercase tracking-wider font-medium">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 fill-[#817870] text-[#817870]" />
              <span className="font-semibold text-[#292725]">{product.rating}</span>
              <span className="text-[#B8ACA1]">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-serif-editorial text-base sm:text-lg font-bold text-[#292725] group-hover:text-[#1F1D1B] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          {/* Short Descriptor */}
          <p className="text-xs text-[#817870] mt-0.5 line-clamp-1 font-sans-body">
            {product.descriptor}
          </p>
        </div>

        {/* Price & Mobile Add CTA */}
        <div className="mt-3 pt-2.5 border-t border-[#DED7D0]/60 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-sans-body text-sm sm:text-base font-bold text-[#292725]">
              {formatBDT(product.price)}
            </span>
            {product.oldPrice && (
              <span className="font-sans-body text-xs text-[#817870] line-through">
                {formatBDT(product.oldPrice)}
              </span>
            )}
          </div>

          {/* Color Dots */}
          <div className="flex items-center -space-x-1">
            {product.colors.slice(0, 3).map((col, cIdx) => (
              <span
                key={cIdx}
                title={col.name}
                className="w-3 h-3 rounded-full border border-[#DED7D0]"
                style={{ backgroundColor: col.hex }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
