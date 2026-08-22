import React, { useState } from 'react';
import {
  X,
  Heart,
  ShoppingBag,
  Truck,
  ShieldCheck,
  RotateCcw,
  Ruler,
  Star,
  Check,
  ChevronRight,
  Share2,
  MessageSquare,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { Product } from '../types';
import { ProductReviewsSection } from './ProductReviewsSection';

export const ProductDetailModal: React.FC = () => {
  const {
    selectedProduct,
    closeProductDetail,
    addToCart,
    toggleWishlist,
    isInWishlist,
    formatBDT,
    setIsCartOpen,
    setIsCheckoutOpen,
    setIsSizeGuideOpen,
    showToast,
    openProductDetail,
    getProductRatingStats,
    getProductReviews,
  } = useShop();

  if (!selectedProduct) return null;

  const product = selectedProduct;
  const isSaved = isInWishlist(product.id);
  const ratingStats = getProductRatingStats(product.id);
  const reviews = getProductReviews(product.id);

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || { name: 'Standard', hex: '#292725' });
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'fabric' | 'shipping'>('details');

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    closeProductDetail();
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} | Show On`,
        text: product.descriptor,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('Product link copied to clipboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-2 sm:p-4 lg:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292725]/70 backdrop-blur-xs transition-opacity"
        onClick={closeProductDetail}
      />

      {/* Modal Card */}
      <div
        id="product-detail-modal"
        className="relative bg-[#FCFAF7] rounded-2xl md:rounded-3xl border border-[#DED7D0] shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Sticky close & action button header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FCFAF7]/95 backdrop-blur-md border-b border-[#DED7D0]">
          <div className="flex items-center gap-2 text-xs text-[#817870]">
            <span className="uppercase tracking-wider font-semibold">{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#B8ACA1]" />
            <span className="text-[#292725] font-medium truncate max-w-[200px] sm:max-w-none">
              {product.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              aria-label="Share product"
              className="p-2 text-[#817870] hover:text-[#292725] hover:bg-[#F7F3EE] rounded-full transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={closeProductDetail}
              aria-label="Close product view"
              className="p-2 text-[#292725] hover:bg-[#F7F3EE] rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="p-6 sm:p-8 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Multi-Image Gallery */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image */}
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#EAE3D9] border border-[#DED7D0]">
              <img
                src={activeImage}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-all duration-300"
              />

              {product.badge && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-[#292725] text-[#FCFAF7] text-xs font-bold uppercase tracking-widest rounded-md shadow-xs">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail Selector */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {[product.image, ...(product.gallery || [])].map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(imgUrl)}
                  className={`relative w-20 h-24 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImage === imgUrl
                      ? 'border-[#292725] ring-2 ring-[#292725]/20'
                      : 'border-[#DED7D0] opacity-70 hover:opacity-100'
                  }`}
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} angle ${idx + 1}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Product Meta & Purchase Matrix */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Reviews & SKU */}
              <div className="flex items-center justify-between text-xs text-[#817870] mb-2">
                <a
                  href="#product-reviews-section"
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('product-reviews-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="flex items-center gap-1.5 hover:underline cursor-pointer"
                >
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(ratingStats.averageRating)
                            ? 'fill-amber-500 text-amber-500'
                            : 'text-[#B8ACA1]'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-[#292725]">{ratingStats.averageRating.toFixed(1)}</span>
                  <span>({reviews.length} reviews)</span>
                </a>
                <span className="font-mono text-[11px]">SKU: {product.sku}</span>
              </div>

              {/* Title */}
              <h1 className="font-serif-editorial text-2xl sm:text-3xl lg:text-4xl font-bold text-[#292725] leading-tight mb-2">
                {product.name}
              </h1>

              {/* Descriptor */}
              <p className="text-xs sm:text-sm text-[#817870] mb-4 font-sans-body">
                {product.descriptor}
              </p>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pb-6 border-b border-[#DED7D0]">
                <span className="font-sans-body text-2xl sm:text-3xl font-bold text-[#292725]">
                  {formatBDT(product.price)}
                </span>
                {product.oldPrice && (
                  <span className="font-sans-body text-base text-[#817870] line-through">
                    {formatBDT(product.oldPrice)}
                  </span>
                )}
                {product.oldPrice && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    SAVE {formatBDT(product.oldPrice - product.price)}
                  </span>
                )}
              </div>

              {/* Color Swatches */}
              <div className="mt-6 mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#292725]">
                    Color: <span className="font-normal text-[#817870]">{selectedColor.name}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  {product.colors.map((color, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => setSelectedColor(color)}
                      title={color.name}
                      className={`relative w-8 h-8 rounded-full border-2 transition-all cursor-pointer flex items-center justify-center ${
                        selectedColor.name === color.name
                          ? 'border-[#292725] scale-110 shadow-xs'
                          : 'border-[#DED7D0] hover:scale-105'
                      }`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor.name === color.name && (
                        <Check
                          className={`w-4 h-4 ${
                            color.hex === '#FFFFFF' || color.hex === '#FCFAF7' || color.hex === '#F7F3EE'
                              ? 'text-[#292725]'
                              : 'text-white'
                          }`}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector + Size Guide Modal Trigger */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#292725]">
                    Select Size
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="inline-flex items-center gap-1 text-xs text-[#817870] hover:text-[#292725] underline cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5" />
                    <span>Size Guide</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-3 text-xs font-bold uppercase rounded-xl border transition-all cursor-pointer ${
                        selectedSize === sz
                          ? 'bg-[#292725] text-[#FCFAF7] border-[#292725] shadow-xs'
                          : 'bg-[#F7F3EE] text-[#292725] border-[#DED7D0] hover:border-[#817870]'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Counter */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#292725]">
                  Quantity
                </span>
                <div className="inline-flex items-center border border-[#DED7D0] rounded-xl bg-[#F7F3EE]">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 py-2 text-[#292725] hover:bg-[#D8CEC3] rounded-l-xl transition-colors font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-bold text-[#292725] select-none">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-2 text-[#292725] hover:bg-[#D8CEC3] rounded-r-xl transition-colors font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Purchase Buttons + Try On Studio Trigger */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3">
                  <button
                    id="detail-add-to-cart-btn"
                    onClick={handleAddToCart}
                    className="flex-1 py-4 bg-[#292725] text-[#FCFAF7] hover:bg-[#1F1D1B] rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-widest flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                    className={`p-4 rounded-xl border border-[#DED7D0] transition-colors cursor-pointer ${
                      isSaved
                        ? 'bg-[#292725] text-[#FCFAF7] border-[#292725]'
                        : 'bg-[#FCFAF7] text-[#292725] hover:bg-[#F7F3EE]'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
                  </button>
                </div>

                <button
                  id="detail-buy-now-btn"
                  onClick={handleBuyNow}
                  className="w-full py-3.5 bg-[#FCFAF7] text-[#292725] border-2 border-[#292725] hover:bg-[#292725] hover:text-[#FCFAF7] rounded-xl text-xs sm:text-sm font-semibold uppercase tracking-widest transition-all cursor-pointer"
                >
                  Buy Now (Instant Checkout)
                </button>
              </div>

              {/* Bangladesh Delivery Badges */}
              <div className="bg-[#F7F3EE] p-4 rounded-xl border border-[#DED7D0] space-y-2 text-xs text-[#817870]">
                <div className="flex items-center gap-2 text-[#292725] font-medium">
                  <Truck className="w-4 h-4 text-[#817870] shrink-0" />
                  <span>Nationwide Express Delivery (24–48 hrs Dhaka, 3–4 days All BD)</span>
                </div>
                <div className="flex items-center gap-2 text-[#292725] font-medium">
                  <RotateCcw className="w-4 h-4 text-[#817870] shrink-0" />
                  <span>7-Day Hassle-Free Exchange Guarantee</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Info: Description, Fabric & Shipping */}
        <div className="px-6 sm:px-8 lg:px-10 pb-10 border-t border-[#DED7D0] pt-8">
          <div className="flex items-center gap-6 border-b border-[#DED7D0] pb-3 mb-6">
            <button
              onClick={() => setActiveTab('details')}
              className={`text-xs uppercase tracking-widest font-bold pb-2 transition-colors cursor-pointer ${
                activeTab === 'details'
                  ? 'text-[#292725] border-b-2 border-[#292725]'
                  : 'text-[#817870] hover:text-[#292725]'
              }`}
            >
              Description & Fit
            </button>
            <button
              onClick={() => setActiveTab('fabric')}
              className={`text-xs uppercase tracking-widest font-bold pb-2 transition-colors cursor-pointer ${
                activeTab === 'fabric'
                  ? 'text-[#292725] border-b-2 border-[#292725]'
                  : 'text-[#817870] hover:text-[#292725]'
              }`}
            >
              Fabric & Care
            </button>
            <button
              onClick={() => setActiveTab('shipping')}
              className={`text-xs uppercase tracking-widest font-bold pb-2 transition-colors cursor-pointer ${
                activeTab === 'shipping'
                  ? 'text-[#292725] border-b-2 border-[#292725]'
                  : 'text-[#817870] hover:text-[#292725]'
              }`}
            >
              Bangladesh Delivery
            </button>
          </div>

          <div className="text-xs sm:text-sm text-[#817870] leading-relaxed max-w-3xl">
            {activeTab === 'details' && (
              <div className="space-y-3">
                <p>{product.description}</p>
                <div className="pt-2">
                  <strong className="text-[#292725]">Fit Profile: </strong>
                  <span>{product.fit}</span>
                </div>
              </div>
            )}

            {activeTab === 'fabric' && (
              <div className="space-y-3">
                <div>
                  <strong className="text-[#292725]">Fabric Composition: </strong>
                  <span>{product.fabricDetails}</span>
                </div>
                <div>
                  <strong className="text-[#292725]">Garment Care: </strong>
                  <span>{product.careInstructions}</span>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-2">
                <p>
                  <strong className="text-[#292725]">Inside Dhaka: </strong>
                  <span>Delivery within 24–48 hours for ৳60. Cash on delivery available.</span>
                </p>
                <p>
                  <strong className="text-[#292725]">Outside Dhaka: </strong>
                  <span>Courier delivery across 64 districts within 3–4 business days for ৳120 via Steadfast/Paperfly.</span>
                </p>
                <p>
                  <strong className="text-[#292725]">Free Shipping: </strong>
                  <span>All orders over ৳3,000 qualify for free nationwide delivery.</span>
                </p>
              </div>
            )}
          </div>

          {/* Related Products Recommendation */}
          {relatedProducts.length > 0 && (
            <div className="mt-12 pt-8 border-t border-[#DED7D0]">
              <h3 className="font-serif-editorial text-2xl font-bold text-[#292725] mb-6">
                Complete The Look
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => openProductDetail(rel)}
                    className="flex items-center gap-4 p-3 bg-[#F7F3EE] rounded-xl border border-[#DED7D0] hover:border-[#292725] transition-all cursor-pointer group"
                  >
                    <img
                      src={rel.image}
                      alt={rel.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <h4 className="font-serif-editorial text-base font-bold text-[#292725] group-hover:text-[#1F1D1B] line-clamp-1">
                        {rel.name}
                      </h4>
                      <p className="text-xs text-[#817870]">{rel.category}</p>
                      <p className="text-xs font-bold text-[#292725] mt-1">
                        {formatBDT(rel.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Product Reviews Section */}
          <ProductReviewsSection product={product} />
        </div>
      </div>
    </div>
  );
};

