import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Tag, Plus, Minus } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    cartSubtotal,
    cartTotalCount,
    formatBDT,
    setIsCheckoutOpen,
    setCurrentView,
    showToast,
  } = useShop();

  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 3000;
  const progressPercent = Math.min(100, (cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);

  const discountAmount = Math.round((cartSubtotal * discountPercent) / 100);
  const finalSubtotal = cartSubtotal - discountAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCode.trim().toUpperCase() === 'SHOWON10') {
      setDiscountPercent(10);
      showToast('Promo code SHOWON10 applied! (10% OFF)');
    } else {
      showToast('Invalid promo code. Use SHOWON10', 'info');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292725]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-out Drawer */}
      <div
        id="cart-drawer-panel"
        className="relative w-full max-w-md bg-[#FCFAF7] h-full shadow-2xl z-10 flex flex-col justify-between border-l border-[#DED7D0] animate-in slide-in-from-right duration-300"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#DED7D0] flex items-center justify-between bg-[#FCFAF7]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#292725]" />
            <h2 className="font-serif-editorial text-2xl font-bold text-[#292725]">
              Shopping Bag ({cartTotalCount})
            </h2>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close Bag"
            className="p-1.5 text-[#292725] hover:bg-[#F7F3EE] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#F7F3EE] p-4 border-b border-[#DED7D0]">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-[#292725]">
              {remainingForFreeShipping === 0
                ? '🎉 You unlocked Free Delivery Across Bangladesh!'
                : `Add ${formatBDT(remainingForFreeShipping)} more for Free Nationwide Delivery`}
            </span>
          </div>
          <div className="w-full bg-[#DED7D0] h-2 rounded-full overflow-hidden">
            <div
              className="bg-[#292725] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F7F3EE] border border-[#DED7D0] flex items-center justify-center mx-auto text-[#817870]">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#292725]">
                Your bag is empty
              </h3>
              <p className="text-xs text-[#817870] max-w-xs mx-auto">
                Explore our curated modern collection of tailored blazers, linen shirts, and outerwear.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  setCurrentView('shop');
                }}
                className="px-6 py-3 bg-[#292725] text-[#FCFAF7] text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-[#1F1D1B] cursor-pointer"
              >
                Browse Shop
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.selectedSize}-${item.selectedColor.name}-${idx}`}
                className="flex items-start gap-3.5 p-3.5 bg-[#F7F3EE] rounded-xl border border-[#DED7D0]/80 relative group"
              >
                {/* Image */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  referrerPolicy="no-referrer"
                  className="w-20 h-24 object-cover rounded-lg bg-[#EAE3D9] shrink-0"
                />

                {/* Details */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="font-serif-editorial text-base font-bold text-[#292725] truncate">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() =>
                          removeFromCart(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor.name
                          )
                        }
                        aria-label="Remove item"
                        className="text-[#817870] hover:text-red-600 transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-[#817870] mt-0.5">
                      <span>Size: <strong className="text-[#292725]">{item.selectedSize}</strong></span>
                      <span>•</span>
                      <span>Color: <strong className="text-[#292725]">{item.selectedColor.name}</strong></span>
                    </div>

                    <p className="text-xs font-bold text-[#292725] mt-1.5">
                      {formatBDT(item.product.price)}
                    </p>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#DED7D0]">
                    <div className="inline-flex items-center border border-[#DED7D0] rounded-lg bg-[#FCFAF7]">
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor.name,
                            item.quantity - 1
                          )
                        }
                        className="p-1 hover:bg-[#D8CEC3] rounded-l-lg transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5 text-[#292725]" />
                      </button>
                      <span className="px-3 text-xs font-bold text-[#292725]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product.id,
                            item.selectedSize,
                            item.selectedColor.name,
                            item.quantity + 1
                          )
                        }
                        className="p-1 hover:bg-[#D8CEC3] rounded-r-lg transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 text-[#292725]" />
                      </button>
                    </div>

                    <span className="text-xs font-bold text-[#292725]">
                      {formatBDT(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Area with Promo Code & Checkout Button */}
        {cart.length > 0 && (
          <div className="p-5 bg-[#FCFAF7] border-t border-[#DED7D0] space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-4 h-4 text-[#817870] absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Coupon code (SHOWON10)"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#F7F3EE] border border-[#DED7D0] rounded-lg text-xs uppercase font-medium placeholder-[#817870] focus:outline-none focus:border-[#292725]"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-[#F7F3EE] border border-[#DED7D0] hover:bg-[#D8CEC3] text-[#292725] text-xs font-bold uppercase rounded-lg transition-colors cursor-pointer"
              >
                Apply
              </button>
            </form>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#817870] pt-2 border-t border-[#DED7D0]">
              <div className="flex justify-between">
                <span>Bag Subtotal</span>
                <span className="font-semibold text-[#292725]">{formatBDT(cartSubtotal)}</span>
              </div>
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>VIP Discount (10%)</span>
                  <span>-{formatBDT(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Delivery (Dhaka / All BD)</span>
                <span className="text-[#292725]">
                  {remainingForFreeShipping === 0 ? 'FREE' : 'Calculated at checkout'}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#292725] pt-2 border-t border-[#DED7D0]">
                <span>Total</span>
                <span>{formatBDT(finalSubtotal)}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              id="cart-checkout-btn"
              onClick={handleProceedToCheckout}
              className="w-full py-4 bg-[#292725] text-[#FCFAF7] hover:bg-[#1F1D1B] font-semibold text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#817870]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#292725]" />
              <span>Cash on Delivery, bKash, Nagad & Cards Accepted</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
