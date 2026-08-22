import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    openProductDetail,
    formatBDT,
    setCurrentView,
  } = useShop();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292725]/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsWishlistOpen(false)}
      />

      {/* Drawer */}
      <div
        id="wishlist-drawer-panel"
        className="relative w-full max-w-md bg-[#FCFAF7] h-full shadow-2xl z-10 flex flex-col justify-between border-l border-[#DED7D0] animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#DED7D0] flex items-center justify-between bg-[#FCFAF7]">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#292725] fill-[#292725]" />
            <h2 className="font-serif-editorial text-2xl font-bold text-[#292725]">
              Saved Wishlist ({wishlist.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            aria-label="Close Wishlist"
            className="p-1.5 text-[#292725] hover:bg-[#F7F3EE] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F7F3EE] border border-[#DED7D0] flex items-center justify-center mx-auto text-[#817870]">
                <Heart className="w-8 h-8 stroke-[1.5]" />
              </div>
              <h3 className="font-serif-editorial text-2xl font-bold text-[#292725]">
                Your wishlist is empty
              </h3>
              <p className="text-xs text-[#817870] max-w-xs mx-auto">
                Save your favorite tailored blazers, textured knits, and outerwear to review anytime.
              </p>
              <button
                onClick={() => {
                  setIsWishlistOpen(false);
                  setCurrentView('shop');
                }}
                className="px-6 py-3 bg-[#292725] text-[#FCFAF7] text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-[#1F1D1B] cursor-pointer"
              >
                Explore Products
              </button>
            </div>
          ) : (
            wishlist.map((prod) => (
              <div
                key={prod.id}
                className="flex items-start gap-3.5 p-3.5 bg-[#F7F3EE] rounded-xl border border-[#DED7D0]/80 relative group"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  referrerPolicy="no-referrer"
                  onClick={() => {
                    setIsWishlistOpen(false);
                    openProductDetail(prod);
                  }}
                  className="w-20 h-24 object-cover rounded-lg bg-[#EAE3D9] shrink-0 cursor-pointer"
                />

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4
                        onClick={() => {
                          setIsWishlistOpen(false);
                          openProductDetail(prod);
                        }}
                        className="font-serif-editorial text-base font-bold text-[#292725] truncate cursor-pointer hover:underline"
                      >
                        {prod.name}
                      </h4>
                      <button
                        onClick={() => toggleWishlist(prod)}
                        aria-label="Remove from wishlist"
                        className="text-[#817870] hover:text-red-600 transition-colors p-1 cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-xs text-[#817870]">{prod.category}</span>
                    <p className="text-xs font-bold text-[#292725] mt-1">
                      {formatBDT(prod.price)}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#DED7D0]">
                    <button
                      onClick={() => {
                        addToCart(prod, prod.sizes[0]);
                      }}
                      className="w-full py-2 bg-[#292725] text-[#FCFAF7] text-[11px] font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-1.5 hover:bg-[#1F1D1B] transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {wishlist.length > 0 && (
          <div className="p-5 bg-[#FCFAF7] border-t border-[#DED7D0]">
            <button
              onClick={() => {
                wishlist.forEach((p) => addToCart(p, p.sizes[0]));
                setIsWishlistOpen(false);
              }}
              className="w-full py-3.5 bg-[#292725] text-[#FCFAF7] font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-[#1F1D1B] transition-colors cursor-pointer"
            >
              Add All to Shopping Bag
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
