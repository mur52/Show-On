import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle2,
  Truck,
  CreditCard,
  ShieldCheck,
  Smartphone,
  Banknote,
  ArrowRight,
  Package,
  MapPin,
  Phone,
  UserCheck,
  LogIn,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderDetails } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    cartSubtotal,
    clearCart,
    formatBDT,
    showToast,
    createNewOrder,
    openOrderTracking,
    currentUser,
    openUserAuth,
  } = useShop();

  const [deliveryCity, setDeliveryCity] = useState<'Dhaka' | 'Chittagong' | 'Sylhet' | 'Rajshahi' | 'Khulna' | 'Other'>('Dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'card'>('cod');
  const [formData, setFormData] = useState({
    name: 'Raihan Chowdhury',
    phone: '1711000888',
    email: 'raihan52760@gmail.com',
    address: 'House 14, Road 7, Sector 3, Uttara',
    notes: 'Please call before arrival.',
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);

  // Sync with logged-in user if available
  useEffect(() => {
    if (currentUser) {
      setFormData({
        name: currentUser.fullName || '',
        phone: currentUser.phoneNumber.replace('+880', '') || '',
        email: currentUser.email || '',
        address: currentUser.address || '',
        notes: 'Please call before arrival.',
      });
      if (currentUser.city) {
        setDeliveryCity(currentUser.city);
      }
    }
  }, [currentUser, isCheckoutOpen]);

  if (!isCheckoutOpen) return null;

  const deliveryFee = cartSubtotal >= 3000 ? 0 : deliveryCity === 'Dhaka' ? 60 : 120;
  const grandTotal = cartSubtotal + deliveryFee;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      showToast('Please complete required shipping fields', 'info');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const cleanPhone = formData.phone.startsWith('+880')
        ? formData.phone
        : `+880${formData.phone.replace(/^0+/, '')}`;

      const newOrder: OrderDetails = {
        orderId: `SO-BD-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cart],
        subtotal: cartSubtotal,
        deliveryFee,
        discount: 0,
        total: grandTotal,
        customerName: formData.name,
        customerPhone: cleanPhone,
        customerEmail: formData.email,
        deliveryAddress: formData.address,
        city: deliveryCity,
        paymentMethod,
        status: 'processing',
        estimatedDelivery: deliveryCity === 'Dhaka' ? 'Tomorrow by 8 PM' : '2-3 Business Days',
        createdAt: new Date().toISOString(),
      };

      createNewOrder(newOrder);
      setCompletedOrder(newOrder);
      setIsProcessing(false);
      clearCart();
      showToast('Order confirmed! SMS & tracking code generated.');
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-3 sm:p-6 bg-[#292725]/75 backdrop-blur-xs">
      <div
        id="checkout-modal-container"
        className="relative bg-[#FCFAF7] rounded-2xl md:rounded-3xl border border-[#DED7D0] shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto z-10 animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-[#FCFAF7]/95 backdrop-blur-md border-b border-[#DED7D0]">
          <div>
            <span className="font-serif-editorial text-2xl font-bold tracking-wider text-[#292725]">
              SHOW ON
            </span>
            <span className="text-xs text-[#817870] ml-2">Checkout & Delivery</span>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            aria-label="Close Checkout"
            className="p-1.5 text-[#292725] hover:bg-[#F7F3EE] rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8">
          {!completedOrder ? (
            <form onSubmit={handlePlaceOrder} className="space-y-8">
              {/* Member Status / Guest Notice */}
              {currentUser ? (
                <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between gap-3 text-xs text-emerald-900">
                  <div className="flex items-center gap-2.5">
                    <UserCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                    <span>
                      Logged in as <strong>{currentUser.fullName}</strong> — shipping info auto-filled.
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-emerald-100 rounded text-emerald-800">
                    Active Member
                  </span>
                </div>
              ) : (
                <div className="p-3.5 bg-[#F7F3EE] border border-[#DED7D0] rounded-xl flex items-center justify-between gap-3 text-xs text-[#5C554E]">
                  <div className="flex items-center gap-2">
                    <LogIn className="w-4 h-4 text-[#817870]" />
                    <span>Have a Show On account? Sign in for instant 1-click address autofill.</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => openUserAuth('login')}
                    className="font-bold text-[#292725] underline hover:text-black cursor-pointer text-xs"
                  >
                    Sign In
                  </button>
                </div>
              )}

              {/* Order Summary Ribbon */}
              <div className="bg-[#F7F3EE] p-4 rounded-xl border border-[#DED7D0] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#292725]" />
                  <span className="font-semibold text-[#292725]">
                    {cart.length} item(s) in bag
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span>Subtotal: <strong className="text-[#292725]">{formatBDT(cartSubtotal)}</strong></span>
                  <span>Delivery: <strong className="text-[#292725]">{deliveryFee === 0 ? 'FREE' : formatBDT(deliveryFee)}</strong></span>
                  <span>Total: <strong className="text-sm text-[#292725]">{formatBDT(grandTotal)}</strong></span>
                </div>
              </div>

              {/* Step 1: Delivery Information */}
              <div>
                <h3 className="font-serif-editorial text-xl font-bold text-[#292725] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#292725] text-[#FCFAF7] text-xs flex items-center justify-center font-mono">
                    1
                  </span>
                  <span>Delivery Address (Bangladesh)</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F7F3EE] border border-[#DED7D0] rounded-xl text-xs sm:text-sm text-[#292725] focus:outline-hidden focus:border-[#292725]"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1">
                      Phone Number (+880) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs text-[#817870] font-sans-body select-none">
                        +880
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="1711-000888"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full pl-13 pr-3.5 py-2.5 bg-[#F7F3EE] border border-[#DED7D0] rounded-xl text-xs sm:text-sm text-[#292725] focus:outline-hidden focus:border-[#292725]"
                      />
                    </div>
                  </div>

                  {/* City Selection */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1">
                      Division / City *
                    </label>
                    <select
                      value={deliveryCity}
                      onChange={(e) => setDeliveryCity(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 bg-[#F7F3EE] border border-[#DED7D0] rounded-xl text-xs sm:text-sm text-[#292725] focus:outline-hidden focus:border-[#292725]"
                    >
                      <option value="Dhaka">Dhaka (৳60 Delivery - 24-48 Hours)</option>
                      <option value="Chittagong">Chittagong (৳120 Delivery - 2-3 Days)</option>
                      <option value="Sylhet">Sylhet (৳120 Delivery - 2-3 Days)</option>
                      <option value="Rajshahi">Rajshahi (৳120 Delivery - 3 Days)</option>
                      <option value="Khulna">Khulna (৳120 Delivery - 3 Days)</option>
                      <option value="Other">Other District (৳120 Delivery - 3-4 Days)</option>
                    </select>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1">
                      Email Address (for order tracking SMS/Email)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F7F3EE] border border-[#DED7D0] rounded-xl text-xs sm:text-sm text-[#292725] focus:outline-hidden focus:border-[#292725]"
                    />
                  </div>

                  {/* Full Street Address */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#292725] mb-1">
                      Detailed Delivery Address (House, Road, Area, Landmark) *
                    </label>
                    <textarea
                      required
                      rows={2}
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#F7F3EE] border border-[#DED7D0] rounded-xl text-xs sm:text-sm text-[#292725] focus:outline-hidden focus:border-[#292725]"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Payment Method */}
              <div>
                <h3 className="font-serif-editorial text-xl font-bold text-[#292725] mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#292725] text-[#FCFAF7] text-xs flex items-center justify-center font-mono">
                    2
                  </span>
                  <span>Payment Gateway</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* COD */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'cod'
                        ? 'border-[#292725] bg-[#F7F3EE]'
                        : 'border-[#DED7D0] bg-[#FCFAF7] hover:border-[#817870]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'cod'}
                      onChange={() => setPaymentMethod('cod')}
                      className="mt-1 accent-[#292725]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#292725]" />
                        <span className="font-bold text-xs sm:text-sm text-[#292725]">
                          Cash on Delivery (COD)
                        </span>
                      </div>
                      <p className="text-[11px] text-[#817870] mt-1">
                        Pay in cash to courier agent after verifying your package.
                      </p>
                    </div>
                  </label>

                  {/* bKash */}
                  <label
                    onClick={() => setPaymentMethod('bkash')}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'bkash'
                        ? 'border-[#292725] bg-[#F7F3EE]'
                        : 'border-[#DED7D0] bg-[#FCFAF7] hover:border-[#817870]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'bkash'}
                      onChange={() => setPaymentMethod('bkash')}
                      className="mt-1 accent-[#292725]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-pink-700" />
                        <span className="font-bold text-xs sm:text-sm text-[#292725]">
                          bKash Online Payment
                        </span>
                      </div>
                      <p className="text-[11px] text-[#817870] mt-1">
                        Fast and secure payment with your bKash digital wallet.
                      </p>
                    </div>
                  </label>

                  {/* Nagad */}
                  <label
                    onClick={() => setPaymentMethod('nagad')}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'nagad'
                        ? 'border-[#292725] bg-[#F7F3EE]'
                        : 'border-[#DED7D0] bg-[#FCFAF7] hover:border-[#817870]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'nagad'}
                      onChange={() => setPaymentMethod('nagad')}
                      className="mt-1 accent-[#292725]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="w-4 h-4 text-orange-600" />
                        <span className="font-bold text-xs sm:text-sm text-[#292725]">
                          Nagad Payment
                        </span>
                      </div>
                      <p className="text-[11px] text-[#817870] mt-1">
                        Direct merchant payment via Nagad gateway.
                      </p>
                    </div>
                  </label>

                  {/* Cards */}
                  <label
                    onClick={() => setPaymentMethod('card')}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 transition-all cursor-pointer ${
                      paymentMethod === 'card'
                        ? 'border-[#292725] bg-[#F7F3EE]'
                        : 'border-[#DED7D0] bg-[#FCFAF7] hover:border-[#817870]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'card'}
                      onChange={() => setPaymentMethod('card')}
                      className="mt-1 accent-[#292725]"
                    />
                    <div>
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-[#292725]" />
                        <span className="font-bold text-xs sm:text-sm text-[#292725]">
                          Visa / Mastercard / Amex
                        </span>
                      </div>
                      <p className="text-[11px] text-[#817870] mt-1">
                        Encrypted 3D secure SSLCommerz card payment.
                      </p>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit & Summary Button */}
              <div className="pt-4 border-t border-[#DED7D0] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#817870]">
                  <span>Total Payable: </span>
                  <span className="font-serif-editorial text-2xl font-bold text-[#292725]">
                    {formatBDT(grandTotal)}
                  </span>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full sm:w-auto px-10 py-4 bg-[#292725] text-[#FCFAF7] hover:bg-[#1F1D1B] font-semibold text-xs sm:text-sm uppercase tracking-widest rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  {isProcessing ? (
                    <span>Confirming Order...</span>
                  ) : (
                    <>
                      <span>Place Order ({formatBDT(grandTotal)})</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          ) : (
            /* Order Completed Success View */
            <div className="py-6 text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="font-serif-editorial text-3xl font-bold text-[#292725]">
                  Order Placed Successfully!
                </h3>
                <p className="text-xs sm:text-sm text-[#817870] mt-1 font-sans-body">
                  Thank you, <strong className="text-[#292725]">{completedOrder.customerName}</strong>. Your order is now being tailored and packed.
                </p>
              </div>

              {/* Order Info Card */}
              <div className="bg-[#F7F3EE] border border-[#DED7D0] rounded-2xl p-6 text-left max-w-md mx-auto space-y-3 text-xs">
                <div className="flex justify-between pb-2 border-b border-[#DED7D0]">
                  <span className="text-[#817870]">Order Tracking Code:</span>
                  <span className="font-mono font-bold text-[#292725]">{completedOrder.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#817870]">Delivery Address:</span>
                  <span className="font-medium text-[#292725] text-right">{completedOrder.deliveryAddress}, {completedOrder.city}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#817870]">Contact Phone:</span>
                  <span className="font-medium text-[#292725]">{completedOrder.customerPhone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#817870]">Payment Mode:</span>
                  <span className="font-bold text-[#292725] uppercase">{completedOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#DED7D0] text-sm font-bold text-[#292725]">
                  <span>Total Amount:</span>
                  <span>{formatBDT(completedOrder.total)}</span>
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <p className="text-xs text-[#817870]">
                  Need modifications? Contact our hotline: <strong className="text-[#292725]">+880 1711 000 888</strong> (WhatsApp available).
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    id="track-new-order-btn"
                    onClick={() => {
                      const id = completedOrder.orderId;
                      setCompletedOrder(null);
                      setIsCheckoutOpen(false);
                      openOrderTracking(id);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 text-stone-900 text-xs font-bold uppercase tracking-widest rounded-xl hover:bg-amber-300 flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
                  >
                    <Truck className="w-4 h-4" />
                    <span>Track Order Real-Time</span>
                  </button>

                  <button
                    onClick={() => {
                      setCompletedOrder(null);
                      setIsCheckoutOpen(false);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 bg-[#292725] text-[#FCFAF7] text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-[#1F1D1B] cursor-pointer transition-all"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
