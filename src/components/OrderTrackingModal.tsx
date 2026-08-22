import React, { useState, useEffect } from 'react';
import {
  X,
  Search,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ArrowRight,
  Printer,
  Copy,
  ExternalLink,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderDetails, OrderStatus } from '../types';

export const OrderTrackingModal: React.FC = () => {
  const {
    isTrackingModalOpen,
    setIsTrackingModalOpen,
    trackingSearchId,
    setTrackingSearchId,
    getOrderById,
    orders,
    formatBDT,
    showToast,
  } = useShop();

  const [searchInput, setSearchInput] = useState(trackingSearchId || '');
  const [activeOrder, setActiveOrder] = useState<OrderDetails | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isTrackingModalOpen) {
      if (trackingSearchId) {
        setSearchInput(trackingSearchId);
        const found = getOrderById(trackingSearchId);
        if (found) {
          setActiveOrder(found);
          setHasSearched(true);
        } else if (orders.length > 0) {
          setActiveOrder(orders[0]);
        }
      } else if (orders.length > 0 && !activeOrder) {
        setActiveOrder(orders[0]);
      }
    }
  }, [isTrackingModalOpen, trackingSearchId, orders]);

  if (!isTrackingModalOpen) return null;

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = searchInput.trim();
    if (!query) {
      showToast('Please enter an Order ID or Phone Number', 'info');
      return;
    }
    const found = getOrderById(query);
    setHasSearched(true);
    if (found) {
      setActiveOrder(found);
      setTrackingSearchId(found.orderId);
      showToast(`Order ${found.orderId} retrieved`, 'success');
    } else {
      setActiveOrder(null);
      showToast('No matching order found. Check ID or phone number.', 'error');
    }
  };

  const handleSelectSampleOrder = (sampleId: string) => {
    setSearchInput(sampleId);
    setTrackingSearchId(sampleId);
    const found = getOrderById(sampleId);
    if (found) {
      setActiveOrder(found);
      setHasSearched(true);
    }
  };

  const copyTrackingId = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    showToast('Tracking ID copied to clipboard');
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return {
          label: 'Order Placed',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          dot: 'bg-amber-500',
        };
      case 'processing':
        return {
          label: 'Atelier Processing & QC',
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          dot: 'bg-blue-500',
        };
      case 'dispatched':
        return {
          label: 'Dispatched to Courier Hub',
          bg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          dot: 'bg-indigo-500',
        };
      case 'out_for_delivery':
        return {
          label: 'Out for Delivery Today',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
          dot: 'bg-emerald-500 animate-pulse',
        };
      case 'delivered':
        return {
          label: 'Successfully Delivered',
          bg: 'bg-stone-100 text-stone-800 border-stone-300',
          dot: 'bg-stone-600',
        };
      case 'cancelled':
        return {
          label: 'Order Cancelled',
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          dot: 'bg-rose-500',
        };
      default:
        return {
          label: 'In Progress',
          bg: 'bg-stone-100 text-stone-800 border-stone-200',
          dot: 'bg-stone-500',
        };
    }
  };

  const getStatusStepIndex = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'processing':
        return 1;
      case 'dispatched':
        return 2;
      case 'out_for_delivery':
        return 3;
      case 'delivered':
        return 4;
      case 'cancelled':
        return -1;
      default:
        return 0;
    }
  };

  const steps = [
    { title: 'Order Confirmed', desc: 'Payment & cart verified' },
    { title: 'Atelier Tailoring & QC', desc: 'Finishing & inspection' },
    { title: 'Courier Dispatched', desc: 'Handed to express hub' },
    { title: 'Out for Delivery', desc: 'Rider on route' },
    { title: 'Delivered', desc: 'Signed & complete' },
  ];

  return (
    <div
      id="order-tracking-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) setIsTrackingModalOpen(false);
      }}
    >
      <div
        id="order-tracking-modal-content"
        className="bg-[#FCFAF7] border border-[#DED7D0] w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] my-auto animate-scaleUp"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#DED7D0] bg-[#FAF6F0]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#292725] text-white flex items-center justify-center shadow-sm">
              <Truck className="w-5 h-5 text-[#FCFAF7]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-serif tracking-tight text-[#292725]">
                  Order Tracking Dispatch
                </h2>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-stone-200/80 text-stone-700">
                  Live Status
                </span>
              </div>
              <p className="text-xs text-stone-500 font-sans">
                Real-time delivery progress across Bangladesh
              </p>
            </div>
          </div>
          <button
            id="close-order-tracking-modal-btn"
            onClick={() => setIsTrackingModalOpen(false)}
            className="p-2 rounded-lg text-stone-500 hover:text-stone-900 hover:bg-stone-200/50 transition-colors"
            aria-label="Close tracking modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar & Sample Tags */}
        <div className="p-6 border-b border-[#DED7D0] bg-white">
          <form onSubmit={handleSearch} className="flex gap-2 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                id="order-tracking-search-input"
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Enter Order ID (e.g. SO-BD-892410) or phone number..."
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAF6F0] border border-[#DED7D0] rounded-lg text-sm text-[#292725] placeholder:text-stone-400 focus:outline-none focus:border-[#292725] transition-all font-sans"
              />
            </div>
            <button
              id="order-tracking-search-btn"
              type="submit"
              className="px-5 py-2.5 bg-[#292725] text-white text-xs uppercase tracking-widest font-medium rounded-lg hover:bg-stone-800 transition-colors flex items-center gap-2 shrink-0"
            >
              <span>Track</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Sample quick filter chips */}
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-stone-400 flex items-center gap-1 font-sans">
              <Sparkles className="w-3 h-3 text-amber-600" /> Quick lookup:
            </span>
            {orders.slice(0, 4).map((sample) => (
              <button
                key={sample.orderId}
                type="button"
                onClick={() => handleSelectSampleOrder(sample.orderId)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono border transition-all ${
                  activeOrder?.orderId === sample.orderId
                    ? 'bg-[#292725] text-white border-[#292725]'
                    : 'bg-[#FAF6F0] text-stone-700 border-[#DED7D0] hover:border-stone-400'
                }`}
              >
                {sample.orderId} ({sample.status.replace('_', ' ')})
              </button>
            ))}
          </div>
        </div>

        {/* Tracking Details Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeOrder ? (
            <>
              {/* Order Status Hero Card */}
              <div className="bg-white border border-[#DED7D0] rounded-xl p-5 sm:p-6 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-stone-100">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono uppercase tracking-wider text-stone-500">
                        Consignment ID:
                      </span>
                      <span className="text-sm font-mono font-bold text-[#292725]">
                        {activeOrder.orderId}
                      </span>
                      <button
                        onClick={() => copyTrackingId(activeOrder.orderId)}
                        title="Copy Order ID"
                        className="text-stone-400 hover:text-stone-700 transition-colors p-1"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="text-xs text-stone-500 font-sans">
                      Placed on{' '}
                      <span className="text-stone-800 font-medium">
                        {new Date(activeOrder.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${
                        getStatusBadge(activeOrder.status).bg
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          getStatusBadge(activeOrder.status).dot
                        }`}
                      />
                      {getStatusBadge(activeOrder.status).label}
                    </span>

                    <button
                      id="print-order-invoice-btn"
                      onClick={handlePrintReceipt}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-stone-200 rounded-lg text-xs text-stone-700 hover:bg-stone-50 transition-colors font-sans"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Slip</span>
                    </button>
                  </div>
                </div>

                {/* Estimated Delivery & Courier Banner */}
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div className="bg-[#FAF6F0] p-3.5 rounded-lg border border-[#E8E1D8]">
                    <div className="text-[11px] uppercase tracking-wider text-stone-500 font-sans font-medium mb-1">
                      Estimated Delivery
                    </div>
                    <div className="text-sm font-semibold text-[#292725] flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-stone-600" />
                      {activeOrder.estimatedDelivery || 'Within 2-3 Business Days'}
                    </div>
                  </div>

                  <div className="bg-[#FAF6F0] p-3.5 rounded-lg border border-[#E8E1D8]">
                    <div className="text-[11px] uppercase tracking-wider text-stone-500 font-sans font-medium mb-1">
                      Courier Partner
                    </div>
                    <div className="text-sm font-semibold text-[#292725] flex items-center gap-1.5">
                      <Truck className="w-4 h-4 text-stone-600" />
                      {activeOrder.courierName || 'Steadfast Express BD'}
                    </div>
                    {activeOrder.courierTrackingCode && (
                      <div className="text-[11px] font-mono text-stone-500 mt-1">
                        Tracking: {activeOrder.courierTrackingCode}
                      </div>
                    )}
                  </div>

                  <div className="bg-[#FAF6F0] p-3.5 rounded-lg border border-[#E8E1D8]">
                    <div className="text-[11px] uppercase tracking-wider text-stone-500 font-sans font-medium mb-1">
                      Destination City
                    </div>
                    <div className="text-sm font-semibold text-[#292725] flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-stone-600" />
                      {activeOrder.city}, Bangladesh
                    </div>
                  </div>
                </div>
              </div>

              {/* Progress Stepper Bar */}
              {activeOrder.status !== 'cancelled' && (
                <div className="bg-white border border-[#DED7D0] rounded-xl p-5 sm:p-6 shadow-sm">
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-stone-500 mb-6 font-sans">
                    Shipment Journey
                  </h3>

                  {/* Visual Stepper */}
                  <div className="relative">
                    {/* Line behind steps */}
                    <div className="hidden md:block absolute top-4 left-6 right-6 h-0.5 bg-stone-200 -z-0" />
                    
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-2 relative z-10">
                      {steps.map((step, idx) => {
                        const currentStepIdx = getStatusStepIndex(activeOrder.status);
                        const isDone = idx <= currentStepIdx;
                        const isCurrent = idx === currentStepIdx;

                        return (
                          <div
                            key={idx}
                            className="flex md:flex-col items-start md:items-center text-left md:text-center gap-3 md:gap-2"
                          >
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-all ${
                                isDone
                                  ? 'bg-[#292725] text-white ring-4 ring-stone-100'
                                  : 'bg-stone-200 text-stone-500'
                              } ${isCurrent ? 'ring-4 ring-stone-300 scale-110' : ''}`}
                            >
                              {isDone ? (
                                <CheckCircle2 className="w-4 h-4 text-[#FCFAF7]" />
                              ) : (
                                idx + 1
                              )}
                            </div>
                            <div>
                              <div
                                className={`text-xs font-semibold ${
                                  isDone ? 'text-[#292725]' : 'text-stone-400'
                                }`}
                              >
                                {step.title}
                              </div>
                              <div className="text-[11px] text-stone-400 mt-0.5 leading-snug">
                                {step.desc}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Detailed Live Status Logs / Event History */}
              {activeOrder.statusHistory && activeOrder.statusHistory.length > 0 && (
                <div className="bg-white border border-[#DED7D0] rounded-xl p-5 sm:p-6 shadow-sm">
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-stone-500 mb-4 font-sans flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-stone-500" />
                    Live Activity Logs
                  </h3>
                  <div className="space-y-4 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-stone-200">
                    {activeOrder.statusHistory.map((event, idx) => (
                      <div key={idx} className="relative flex items-start gap-4 pl-8">
                        <div
                          className={`absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-white -translate-x-1/2 ${
                            event.completed ? 'bg-[#292725]' : 'bg-stone-300'
                          }`}
                        />
                        <div className="flex-1 bg-[#FAF6F0]/60 p-3 rounded-lg border border-[#EAE3DA]">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                            <span className="text-xs font-bold text-[#292725]">
                              {event.title}
                            </span>
                            <span className="text-[11px] font-mono text-stone-500">
                              {event.timestamp}
                            </span>
                          </div>
                          <p className="text-xs text-stone-600 font-sans leading-relaxed">
                            {event.description}
                          </p>
                          {event.location && (
                            <div className="mt-1 text-[10px] text-stone-400 font-mono flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {event.location}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itemized Order Summary & Customer Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Items */}
                <div className="bg-white border border-[#DED7D0] rounded-xl p-5 shadow-sm">
                  <h3 className="text-xs uppercase tracking-widest font-semibold text-stone-500 mb-3 font-sans">
                    Package Contents ({activeOrder.items.length}{' '}
                    {activeOrder.items.length === 1 ? 'item' : 'items'})
                  </h3>
                  <div className="divide-y divide-stone-100 space-y-3">
                    {activeOrder.items.map((item, idx) => (
                      <div key={idx} className="pt-3 first:pt-0 flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-14 h-16 object-cover rounded bg-stone-100 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-semibold text-[#292725] truncate">
                            {item.product.name}
                          </h4>
                          <div className="text-[11px] text-stone-500 font-sans mt-0.5 flex items-center gap-2">
                            <span>Size: {item.selectedSize}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <span
                                className="w-2.5 h-2.5 rounded-full border border-stone-300"
                                style={{ backgroundColor: item.selectedColor.hex }}
                              />
                              {item.selectedColor.name}
                            </span>
                            <span>•</span>
                            <span>Qty: {item.quantity}</span>
                          </div>
                          <div className="text-xs font-mono font-medium text-stone-800 mt-1">
                            {formatBDT(item.product.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recipient & Payment Breakdown */}
                <div className="bg-white border border-[#DED7D0] rounded-xl p-5 shadow-sm flex flex-col justify-between">
                  <div>
                    <h3 className="text-xs uppercase tracking-widest font-semibold text-stone-500 mb-3 font-sans">
                      Delivery Recipient
                    </h3>
                    <div className="space-y-1.5 text-xs text-stone-600 font-sans mb-4 bg-[#FAF6F0] p-3 rounded-lg border border-[#EAE3DA]">
                      <div className="font-semibold text-stone-900">
                        {activeOrder.customerName}
                      </div>
                      <div>{activeOrder.deliveryAddress}</div>
                      <div>
                        {activeOrder.city}, Bangladesh • {activeOrder.customerPhone}
                      </div>
                      {activeOrder.notes && (
                        <div className="text-[11px] text-stone-500 italic mt-1 pt-1 border-t border-stone-200">
                          Note: "{activeOrder.notes}"
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="border-t border-stone-100 pt-3 space-y-1.5 text-xs font-sans">
                    <div className="flex justify-between text-stone-500">
                      <span>Subtotal</span>
                      <span className="font-mono">{formatBDT(activeOrder.subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-stone-500">
                      <span>Delivery ({activeOrder.city})</span>
                      <span className="font-mono">{formatBDT(activeOrder.deliveryFee)}</span>
                    </div>
                    {activeOrder.discount > 0 && (
                      <div className="flex justify-between text-emerald-700">
                        <span>Discount Applied</span>
                        <span className="font-mono">-{formatBDT(activeOrder.discount)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-bold text-[#292725] pt-2 border-t border-stone-200">
                      <span>
                        Total Payable (
                        <span className="uppercase text-[11px]">
                          {activeOrder.paymentMethod}
                        </span>
                        )
                      </span>
                      <span className="font-mono">{formatBDT(activeOrder.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Need Assistance Banner */}
              <div className="bg-[#FAF6F0] border border-[#DED7D0] rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <HelpCircle className="w-4 h-4 text-stone-600 shrink-0" />
                  <span className="text-stone-700 font-sans">
                    Have questions about this consignment or want to adjust your delivery time?
                  </span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href="https://wa.me/8801700000000"
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 bg-[#292725] text-white rounded-md hover:bg-stone-800 transition-colors font-medium flex items-center gap-1.5"
                  >
                    <Phone className="w-3 h-3" />
                    <span>WhatsApp Concierge</span>
                  </a>
                </div>
              </div>
            </>
          ) : (
            <div className="py-16 text-center">
              <div className="w-16 h-16 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-serif text-stone-800 mb-1">
                No Consignment Selected
              </h3>
              <p className="text-xs text-stone-500 max-w-sm mx-auto mb-5 font-sans">
                Enter your Show On Order ID (e.g. SO-BD-892410) or recipient phone number above to trace your garment dispatch.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {orders.map((sample) => (
                  <button
                    key={sample.orderId}
                    onClick={() => handleSelectSampleOrder(sample.orderId)}
                    className="px-3 py-1.5 bg-white border border-[#DED7D0] hover:border-stone-900 rounded-lg text-xs font-mono text-stone-700 transition-colors"
                  >
                    Track {sample.orderId}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-[#DED7D0] bg-[#FAF6F0] flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-2 font-sans">
            <ShieldCheck className="w-4 h-4 text-stone-700" />
            <span>Show On Guaranteed Safe Transit • Dhaka • Chittagong • Nationwide</span>
          </div>
          <button
            onClick={() => setIsTrackingModalOpen(false)}
            className="px-4 py-2 bg-stone-200 text-stone-800 rounded-lg hover:bg-stone-300 transition-colors font-medium"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
