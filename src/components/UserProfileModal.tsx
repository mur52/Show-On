import React, { useState } from 'react';
import { X, User, Package, MapPin, Phone, Mail, LogOut, ArrowRight, Truck, CheckCircle2, Clock, Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const UserProfileModal: React.FC = () => {
  const {
    currentUser,
    isUserProfileModalOpen,
    setIsUserProfileModalOpen,
    logoutUser,
    updateUserProfile,
    currentUserOrders,
    openOrderTracking,
    formatBDT,
    setIsWishlistOpen,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'profile'>('orders');
  const [editName, setEditName] = useState(currentUser?.fullName || '');
  const [editPhone, setEditPhone] = useState(currentUser?.phoneNumber || '');
  const [editAddress, setEditAddress] = useState(currentUser?.address || '');
  const [editCity, setEditCity] = useState(currentUser?.city || 'Dhaka');

  if (!isUserProfileModalOpen || !currentUser) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      fullName: editName,
      phoneNumber: editPhone,
      address: editAddress,
      city: editCity as any,
    });
  };

  return (
    <div
      id="user-profile-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs transition-opacity duration-300 animate-in fade-in"
      onClick={() => setIsUserProfileModalOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl bg-[#FCFAF7] border border-[#DED7D0] rounded-2xl shadow-2xl overflow-hidden transform transition-all animate-in zoom-in-95 duration-200 flex flex-col max-h-[88vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Profile Summary */}
        <div className="bg-[#292725] text-[#FCFAF7] p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#FCFAF7]/15 border border-[#FCFAF7]/20 flex items-center justify-center text-xl font-bold tracking-wider font-serif-editorial text-[#FCFAF7]">
              {currentUser.avatarInitials || 'SO'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif-editorial text-xl sm:text-2xl font-bold text-[#FCFAF7]">
                  {currentUser.fullName}
                </h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-[10px] uppercase font-semibold tracking-wider">
                  Member
                </span>
              </div>
              <p className="text-xs text-[#B8ACA1] mt-0.5 flex items-center gap-3">
                <span>{currentUser.email}</span>
                <span>•</span>
                <span>{currentUser.phoneNumber}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              id="profile-logout-btn"
              onClick={logoutUser}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#FCFAF7]/10 hover:bg-red-500/20 text-[#B8ACA1] hover:text-red-300 border border-[#FCFAF7]/20 rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
            <button
              id="close-profile-modal-btn"
              onClick={() => setIsUserProfileModalOpen(false)}
              className="p-1.5 text-[#B8ACA1] hover:text-[#FCFAF7] hover:bg-[#FCFAF7]/10 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#DED7D0] bg-[#F7F3EE] px-6">
          <button
            id="tab-my-orders-btn"
            onClick={() => setActiveTab('orders')}
            className={`py-3 px-4 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'orders'
                ? 'border-[#292725] text-[#292725] bg-[#FCFAF7]'
                : 'border-transparent text-[#817870] hover:text-[#292725]'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>My Orders ({currentUserOrders.length})</span>
          </button>

          <button
            id="tab-profile-settings-btn"
            onClick={() => setActiveTab('profile')}
            className={`py-3 px-4 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'border-[#292725] text-[#292725] bg-[#FCFAF7]'
                : 'border-transparent text-[#817870] hover:text-[#292725]'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Delivery & Profile</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#FCFAF7]">
          {activeTab === 'orders' ? (
            /* ================= MY ORDERS TAB ================= */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-serif-editorial text-lg font-bold text-[#292725]">
                    Consignment History & Live Tracking
                  </h3>
                  <p className="text-xs text-[#817870]">
                    Track your tailoring and courier dispatches across Bangladesh in real-time.
                  </p>
                </div>
                <button
                  id="open-tracker-from-profile-btn"
                  onClick={() => {
                    setIsUserProfileModalOpen(false);
                    openOrderTracking();
                  }}
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#292725] font-semibold underline hover:text-[#817870] cursor-pointer"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Open Live Order Tracker</span>
                </button>
              </div>

              {currentUserOrders.length === 0 ? (
                <div className="text-center py-10 px-4 border border-dashed border-[#DED7D0] rounded-2xl bg-[#F7F3EE]/50">
                  <Package className="w-10 h-10 text-[#817870] mx-auto mb-3 opacity-60" />
                  <h4 className="font-serif-editorial text-base font-semibold text-[#292725]">
                    No Orders Recorded Yet
                  </h4>
                  <p className="text-xs text-[#817870] max-w-sm mx-auto mt-1 mb-4">
                    Items you purchase while logged in with this account will automatically sync here with live parcel updates.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setIsUserProfileModalOpen(false);
                        setIsWishlistOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#292725] text-[#FCFAF7] text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-black transition-colors cursor-pointer"
                    >
                      <Heart className="w-3.5 h-3.5" />
                      <span>View Saved Wishlist</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3.5">
                  {currentUserOrders.map((order) => (
                    <div
                      key={order.orderId}
                      className="bg-white border border-[#DED7D0] rounded-xl p-4 sm:p-5 shadow-2xs hover:border-[#292725]/40 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#DED7D0]/60">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-sm font-bold text-[#292725]">
                              {order.orderId}
                            </span>
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                                order.status === 'delivered'
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : order.status === 'out_for_delivery'
                                  ? 'bg-blue-100 text-blue-800'
                                  : order.status === 'dispatched'
                                  ? 'bg-purple-100 text-purple-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}
                            >
                              {order.status.replace('_', ' ')}
                            </span>
                          </div>
                          <p className="text-xs text-[#817870] mt-0.5">
                            Placed on {new Date(order.createdAt).toLocaleDateString('en-BD', { month: 'short', day: 'numeric', year: 'numeric' })} • {order.items.length} item(s)
                          </p>
                        </div>

                        <div className="text-left sm:text-right">
                          <p className="text-sm font-bold text-[#292725]">
                            {formatBDT(order.total)}
                          </p>
                          <p className="text-[11px] text-[#817870] uppercase font-mono">
                            {order.paymentMethod.toUpperCase()}
                          </p>
                        </div>
                      </div>

                      {/* Items Preview */}
                      <div className="py-3 flex flex-wrap gap-2">
                        {order.items.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 px-2.5 py-1.5 bg-[#F7F3EE] rounded-lg border border-[#DED7D0]/60 text-xs text-[#292725]"
                          >
                            <span className="font-semibold">{item.quantity}x</span>
                            <span className="truncate max-w-[150px]">{item.product.name}</span>
                            <span className="text-[#817870] font-mono">({item.selectedSize})</span>
                          </div>
                        ))}
                      </div>

                      {/* Footer Actions */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="text-xs text-[#817870] flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          <span>
                            Est. Delivery: <strong className="text-[#292725]">{order.estimatedDelivery || '2-3 Business Days'}</strong>
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            setIsUserProfileModalOpen(false);
                            openOrderTracking(order.orderId);
                          }}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 bg-[#292725] hover:bg-[#1F1D1B] text-[#FCFAF7] rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer self-start sm:self-auto"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>Track Live Dispatch</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* ================= PROFILE SETTINGS TAB ================= */
            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <h3 className="font-serif-editorial text-lg font-bold text-[#292725]">
                  Personal & Delivery Settings
                </h3>
                <p className="text-xs text-[#817870]">
                  Saved information will automatically autofill during your checkout.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#817870]" />
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#DED7D0] rounded-xl text-sm text-[#292725] focus:outline-hidden focus:border-[#292725]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-1">
                    Email (Primary)
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#817870]" />
                    <input
                      type="email"
                      disabled
                      value={currentUser.email}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-[#F7F3EE] border border-[#DED7D0] rounded-xl text-sm text-[#817870] cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-1">
                    Phone (Bangladesh)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#817870]" />
                    <input
                      type="tel"
                      value={editPhone}
                      onChange={(e) => setEditPhone(e.target.value)}
                      className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#DED7D0] rounded-xl text-sm text-[#292725] focus:outline-hidden focus:border-[#292725]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-1">
                    Default Delivery City
                  </label>
                  <select
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-white border border-[#DED7D0] rounded-xl text-sm text-[#292725] focus:outline-hidden focus:border-[#292725]"
                  >
                    <option value="Dhaka">Dhaka City (৳60 Delivery)</option>
                    <option value="Chittagong">Chittagong (৳120 Delivery)</option>
                    <option value="Sylhet">Sylhet (৳120 Delivery)</option>
                    <option value="Rajshahi">Rajshahi (৳120 Delivery)</option>
                    <option value="Khulna">Khulna (৳120 Delivery)</option>
                    <option value="Other">Other Nationwide (৳120 Delivery)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A4642] mb-1">
                  Default Street Address
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-[#817870]" />
                  <textarea
                    rows={2}
                    value={editAddress}
                    onChange={(e) => setEditAddress(e.target.value)}
                    placeholder="House / Flat / Road / Area Details"
                    className="w-full pl-10 pr-3.5 py-2.5 bg-white border border-[#DED7D0] rounded-xl text-sm text-[#292725] focus:outline-hidden focus:border-[#292725]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-[#292725] hover:bg-[#1F1D1B] text-[#FCFAF7] text-xs uppercase tracking-widest font-semibold rounded-xl transition-all shadow-xs cursor-pointer flex items-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
