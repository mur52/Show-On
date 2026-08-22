import React, { useState } from 'react';
import {
  LayoutDashboard,
  Package,
  TrendingUp,
  ShoppingBag,
  Users,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  AlertCircle,
  Edit3,
  Trash2,
  Plus,
  ArrowUpRight,
  DollarSign,
  MapPin,
  Phone,
  Eye,
  LogOut,
  Store,
  ChevronDown,
  Sparkles,
  Download,
  Printer,
  ShieldAlert,
  Tag,
  Check,
  X,
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { OrderDetails, OrderStatus, Product } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    updateOrderCourier,
    deleteOrder,
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    leads,
    adminLogout,
    setCurrentView,
    openOrderTracking,
    formatBDT,
    showToast,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'analytics' | 'inventory' | 'leads'>('orders');
  
  // Orders Filter State
  const [orderSearch, setOrderSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [selectedOrderForDetail, setSelectedOrderForDetail] = useState<OrderDetails | null>(null);

  // Inventory Filter State
  const [inventorySearch, setInventorySearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  // Quick edit product modal
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // New Product Form State
  const [newProductForm, setNewProductForm] = useState({
    name: '',
    category: 'Casual Wear' as Product['category'],
    descriptor: 'Premium Garment',
    price: 2500,
    oldPrice: 3200,
    badge: 'NEW' as Product['badge'],
    sizes: ['S', 'M', 'L', 'XL'] as Product['sizes'],
    image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    description: 'Expertly crafted garment from high quality breathable fabric.',
    fabricDetails: '100% Organic Ring-Spun Cotton',
    inStock: true,
  });

  // Calculate Metrics
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'cancelled' ? sum + o.total : sum), 0);
  const totalOrdersCount = orders.length;
  const pendingOrdersCount = orders.filter((o) => o.status === 'pending' || o.status === 'processing').length;
  const inTransitOrdersCount = orders.filter((o) => o.status === 'dispatched' || o.status === 'out_for_delivery').length;
  const deliveredOrdersCount = orders.filter((o) => o.status === 'delivered').length;
  const averageOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;

  // Filtered Orders
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.orderId.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.customerName.toLowerCase().includes(orderSearch.toLowerCase()) ||
      order.customerPhone.includes(orderSearch) ||
      (order.courierTrackingCode && order.courierTrackingCode.toLowerCase().includes(orderSearch.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesCity = cityFilter === 'all' || order.city === cityFilter;

    return matchesSearch && matchesStatus && matchesCity;
  });

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(inventorySearch.toLowerCase()) || p.sku.toLowerCase().includes(inventorySearch.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Handle Add Product Submit
  const handleAddProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductForm.name.trim()) {
      showToast('Product name is required', 'error');
      return;
    }
    const newProd: Product = {
      id: 'prod-' + Date.now(),
      name: newProductForm.name,
      category: newProductForm.category,
      descriptor: newProductForm.descriptor,
      price: Number(newProductForm.price),
      oldPrice: newProductForm.oldPrice ? Number(newProductForm.oldPrice) : undefined,
      badge: newProductForm.badge,
      rating: 5.0,
      reviewsCount: 1,
      image: newProductForm.image,
      secondaryImage: newProductForm.image,
      gallery: [newProductForm.image],
      sizes: newProductForm.sizes,
      colors: [{ name: 'Default Onyx', hex: '#292725' }, { name: 'Raw Natural', hex: '#EAE3DA' }],
      inStock: newProductForm.inStock,
      description: newProductForm.description,
      fabricDetails: newProductForm.fabricDetails,
      careInstructions: 'Dry clean or gentle hand wash in cold water.',
      fit: 'Relaxed Tailored Silhouette',
      sku: 'SO-' + Math.floor(1000 + Math.random() * 9000),
    };

    addProduct(newProd);
    setIsAddProductModalOpen(false);
    setNewProductForm({
      name: '',
      category: 'Casual Wear',
      descriptor: 'Premium Garment',
      price: 2500,
      oldPrice: 3200,
      badge: 'NEW',
      sizes: ['S', 'M', 'L', 'XL'],
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      description: 'Expertly crafted garment from high quality breathable fabric.',
      fabricDetails: '100% Organic Ring-Spun Cotton',
      inStock: true,
    });
  };

  const getStatusBadgeStyle = (status: OrderStatus) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'processing':
        return 'bg-blue-100 text-blue-900 border-blue-300';
      case 'dispatched':
        return 'bg-purple-100 text-purple-900 border-purple-300';
      case 'out_for_delivery':
        return 'bg-emerald-100 text-emerald-900 border-emerald-300';
      case 'delivered':
        return 'bg-stone-200 text-stone-800 border-stone-400';
      case 'cancelled':
        return 'bg-rose-100 text-rose-900 border-rose-300';
      default:
        return 'bg-stone-100 text-stone-700 border-stone-300';
    }
  };

  return (
    <div id="admin-dashboard-root" className="min-h-screen bg-[#F7F3EE] text-[#292725] pb-24">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#FAF6F0] border-b border-[#DED7D0] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="font-serif text-xl tracking-tight font-bold text-[#292725]">
                SHOW ON
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest bg-[#292725] text-white">
                Admin Console
              </span>
            </div>
            <span className="hidden md:inline-block text-xs text-stone-400">|</span>
            <span className="hidden md:inline-block text-xs text-stone-500 font-sans">
              Operations & Order Fulfillment Hub
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="admin-return-store-btn"
              onClick={() => setCurrentView('home')}
              className="px-3.5 py-1.5 bg-white border border-[#DED7D0] rounded-lg text-xs font-medium text-stone-700 hover:bg-stone-50 transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Store className="w-3.5 h-3.5" />
              <span>View Storefront</span>
            </button>

            <button
              id="admin-logout-btn"
              onClick={adminLogout}
              className="px-3.5 py-1.5 bg-rose-50 border border-rose-200 rounded-lg text-xs font-medium text-rose-700 hover:bg-rose-100 transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* KPI Metrics Ribbon */}
        <section className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#DED7D0] shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-500">
                Gross Revenue
              </span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-[#292725]">
              {formatBDT(totalRevenue)}
            </div>
            <div className="text-[11px] text-emerald-700 flex items-center gap-1 mt-1 font-medium font-sans">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% this month</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DED7D0] shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-500">
                Total Orders
              </span>
              <Package className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-[#292725]">
              {totalOrdersCount}
            </div>
            <div className="text-[11px] text-stone-500 font-sans mt-1">
              Avg Value: <span className="font-mono font-medium">{formatBDT(averageOrderValue)}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DED7D0] shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-500">
                Pending Atelier
              </span>
              <Clock className="w-4 h-4 text-amber-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-amber-800">
              {pendingOrdersCount}
            </div>
            <div className="text-[11px] text-amber-700 font-sans mt-1">
              Requires QC & finishing
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DED7D0] shadow-sm">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-500">
                In Transit (Courier)
              </span>
              <Truck className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-purple-900">
              {inTransitOrdersCount}
            </div>
            <div className="text-[11px] text-purple-700 font-sans mt-1">
              Active courier consignments
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#DED7D0] shadow-sm col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between text-stone-400 mb-2">
              <span className="text-xs font-sans uppercase tracking-wider font-semibold text-stone-500">
                VIP Club Leads
              </span>
              <Users className="w-4 h-4 text-stone-600" />
            </div>
            <div className="text-2xl font-serif font-bold text-[#292725]">
              {leads.length}
            </div>
            <div className="text-[11px] text-stone-500 font-sans mt-1">
              Subscribers ready for outreach
            </div>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#DED7D0] gap-2 overflow-x-auto pb-px">
          <button
            onClick={() => setActiveTab('orders')}
            className={`px-5 py-3 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'border-[#292725] text-[#292725] bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Orders & Dispatch ({orders.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-5 py-3 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'analytics'
                ? 'border-[#292725] text-[#292725] bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Sales & Logistics Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`px-5 py-3 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'inventory'
                ? 'border-[#292725] text-[#292725] bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Product Catalog & Stock ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`px-5 py-3 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
              activeTab === 'leads'
                ? 'border-[#292725] text-[#292725] bg-white rounded-t-lg'
                : 'border-transparent text-stone-500 hover:text-stone-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>VIP Leads & Concierge ({leads.length})</span>
          </button>
        </div>

        {/* TAB 1: ORDERS & DISPATCH MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            {/* Search & Filter Toolbar */}
            <div className="bg-white p-4 rounded-xl border border-[#DED7D0] shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder="Search by ID, customer name, phone..."
                  className="w-full pl-10 pr-4 py-2 bg-[#FAF6F0] border border-[#DED7D0] rounded-lg text-xs text-[#292725] placeholder:text-stone-400 focus:outline-none focus:border-[#292725]"
                />
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-stone-500">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 bg-[#FAF6F0] border border-[#DED7D0] rounded-lg text-xs text-[#292725] focus:outline-none"
                  >
                    <option value="all">All Statuses ({orders.length})</option>
                    <option value="pending">Pending</option>
                    <option value="processing">Processing / QC</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span className="text-stone-500">City:</span>
                  <select
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    className="px-3 py-2 bg-[#FAF6F0] border border-[#DED7D0] rounded-lg text-xs text-[#292725] focus:outline-none"
                  >
                    <option value="all">All Locations</option>
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chittagong">Chittagong</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl border border-[#DED7D0] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF6F0] border-b border-[#DED7D0] text-stone-600 font-sans uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Order ID & Date</th>
                      <th className="py-3.5 px-4 font-semibold">Customer & Destination</th>
                      <th className="py-3.5 px-4 font-semibold">Items</th>
                      <th className="py-3.5 px-4 font-semibold">Amount & Pay Method</th>
                      <th className="py-3.5 px-4 font-semibold">Live Fulfillment Status</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-sans">
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <tr key={order.orderId} className="hover:bg-[#FAF6F0]/60 transition-colors">
                          {/* Order ID */}
                          <td className="py-4 px-4 align-top">
                            <div className="font-mono font-bold text-stone-900 flex items-center gap-1.5">
                              <span>{order.orderId}</span>
                            </div>
                            <div className="text-[11px] text-stone-400 mt-1">
                              {new Date(order.createdAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </div>
                            {order.courierTrackingCode && (
                              <div className="text-[10px] font-mono text-stone-500 mt-1 flex items-center gap-1">
                                <Truck className="w-3 h-3 text-stone-400" />
                                {order.courierTrackingCode}
                              </div>
                            )}
                          </td>

                          {/* Customer */}
                          <td className="py-4 px-4 align-top">
                            <div className="font-semibold text-stone-900">{order.customerName}</div>
                            <div className="text-stone-500 text-[11px] flex items-center gap-1 mt-0.5">
                              <Phone className="w-3 h-3 text-stone-400" />
                              {order.customerPhone}
                            </div>
                            <div className="text-stone-500 text-[11px] flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3 text-stone-400" />
                              {order.city} • {order.deliveryAddress}
                            </div>
                          </td>

                          {/* Items */}
                          <td className="py-4 px-4 align-top">
                            <div className="space-y-1">
                              {order.items.map((it, idx) => (
                                <div key={idx} className="text-[11px] text-stone-700 flex items-center gap-1.5">
                                  <span className="font-medium">{it.quantity}x</span>
                                  <span className="truncate max-w-[140px]">{it.product.name}</span>
                                  <span className="text-stone-400 font-mono">({it.selectedSize})</span>
                                </div>
                              ))}
                            </div>
                          </td>

                          {/* Amount */}
                          <td className="py-4 px-4 align-top">
                            <div className="font-mono font-bold text-stone-900">
                              {formatBDT(order.total)}
                            </div>
                            <div className="text-[10px] uppercase font-bold tracking-wider text-stone-500 mt-0.5">
                              {order.paymentMethod}
                            </div>
                          </td>

                          {/* Status Dropdown */}
                          <td className="py-4 px-4 align-top">
                            <select
                              value={order.status}
                              onChange={(e) => updateOrderStatus(order.orderId, e.target.value as OrderStatus)}
                              className={`px-2.5 py-1 rounded-md text-xs font-semibold border focus:outline-none transition-colors cursor-pointer ${getStatusBadgeStyle(
                                order.status
                              )}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="processing">Processing / QC</option>
                              <option value="dispatched">Dispatched</option>
                              <option value="out_for_delivery">Out for Delivery</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>

                          {/* Actions */}
                          <td className="py-4 px-4 align-top text-right space-x-1">
                            <button
                              onClick={() => {
                                setSelectedOrderForDetail(order);
                              }}
                              title="Inspect Full Details"
                              className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors inline-flex items-center"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => openOrderTracking(order.orderId)}
                              title="View Customer Tracking Page"
                              className="p-1.5 rounded-lg border border-stone-200 text-stone-600 hover:bg-stone-100 transition-colors inline-flex items-center"
                            >
                              <Truck className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => deleteOrder(order.orderId)}
                              title="Archive Order"
                              className="p-1.5 rounded-lg border border-rose-100 text-rose-500 hover:bg-rose-50 transition-colors inline-flex items-center"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-stone-400">
                          No matching orders found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ANALYTICS & LOGISTICS PERFORMANCE */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Sales By Region */}
              <div className="bg-white p-6 rounded-xl border border-[#DED7D0] shadow-sm space-y-4">
                <h3 className="text-sm font-serif font-bold text-[#292725] flex items-center justify-between">
                  <span>Geographic Distribution (Bangladesh)</span>
                  <MapPin className="w-4 h-4 text-stone-400" />
                </h3>
                <div className="space-y-3">
                  {[
                    { city: 'Dhaka Metropolitan (Gulshan, Banani, Dhanmondi)', pct: 64, ordersCount: 142 },
                    { city: 'Chittagong Division', pct: 18, ordersCount: 39 },
                    { city: 'Sylhet Division', pct: 10, ordersCount: 22 },
                    { city: 'Rajshahi & Khulna', pct: 8, ordersCount: 16 },
                  ].map((region, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-sans">
                        <span className="font-medium text-stone-700">{region.city}</span>
                        <span className="font-mono text-stone-500">{region.pct}% ({region.ordersCount} orders)</span>
                      </div>
                      <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#292725] rounded-full"
                          style={{ width: `${region.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white p-6 rounded-xl border border-[#DED7D0] shadow-sm space-y-4">
                <h3 className="text-sm font-serif font-bold text-[#292725] flex items-center justify-between">
                  <span>Payment Gateway Share</span>
                  <DollarSign className="w-4 h-4 text-stone-400" />
                </h3>
                <div className="space-y-3">
                  {[
                    { method: 'bKash Merchant Pay', share: '52%', count: 115, color: 'bg-pink-600' },
                    { method: 'Cash on Delivery (COD)', share: '28%', count: 62, color: 'bg-amber-600' },
                    { method: 'Nagad Direct', share: '12%', count: 26, color: 'bg-orange-600' },
                    { method: 'Visa / Mastercard SSLCommerz', share: '8%', count: 18, color: 'bg-indigo-600' },
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2.5 rounded-lg bg-[#FAF6F0] border border-[#EAE3DA]">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-3 h-3 rounded-full ${item.color}`} />
                        <span className="text-xs font-medium text-stone-800">{item.method}</span>
                      </div>
                      <div className="text-xs font-mono text-stone-600 font-semibold">
                        {item.share} <span className="text-stone-400 font-normal">({item.count})</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Courier Dispatch Performance */}
            <div className="bg-white p-6 rounded-xl border border-[#DED7D0] shadow-sm space-y-4">
              <h3 className="text-sm font-serif font-bold text-[#292725]">
                Logistics Partner SLA & On-Time Performance
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#EAE3DA]">
                  <div className="text-xs text-stone-500 font-sans uppercase tracking-wider font-semibold">
                    Steadfast Express BD
                  </div>
                  <div className="text-xl font-mono font-bold text-stone-900 mt-1">98.4%</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Avg delivery Dhaka: 24 Hours</div>
                </div>

                <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#EAE3DA]">
                  <div className="text-xs text-stone-500 font-sans uppercase tracking-wider font-semibold">
                    Paperfly Express
                  </div>
                  <div className="text-xl font-mono font-bold text-stone-900 mt-1">96.8%</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Avg Nationwide: 48-72 Hours</div>
                </div>

                <div className="bg-[#FAF6F0] p-4 rounded-xl border border-[#EAE3DA]">
                  <div className="text-xs text-stone-500 font-sans uppercase tracking-wider font-semibold">
                    Pathao Courier
                  </div>
                  <div className="text-xl font-mono font-bold text-stone-900 mt-1">99.1%</div>
                  <div className="text-[11px] text-stone-500 mt-0.5">Same-Day Priority Express</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PRODUCT CATALOG & INVENTORY */}
        {activeTab === 'inventory' && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-xl border border-[#DED7D0] shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="relative w-full md:w-80">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                <input
                  type="text"
                  value={inventorySearch}
                  onChange={(e) => setInventorySearch(e.target.value)}
                  placeholder="Search catalog by name or SKU..."
                  className="w-full pl-10 pr-4 py-2 bg-[#FAF6F0] border border-[#DED7D0] rounded-lg text-xs text-[#292725] placeholder:text-stone-400 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto">
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 bg-[#FAF6F0] border border-[#DED7D0] rounded-lg text-xs text-[#292725] focus:outline-none"
                >
                  <option value="all">All Categories</option>
                  <option value="Casual Wear">Casual Wear</option>
                  <option value="Formal Wear">Formal Wear</option>
                  <option value="Street Style">Street Style</option>
                  <option value="Outerwear">Outerwear</option>
                  <option value="Accessories">Accessories</option>
                </select>

                <button
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="px-4 py-2 bg-[#292725] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-stone-800 transition-colors flex items-center gap-1.5 shrink-0 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Garment</span>
                </button>
              </div>
            </div>

            {/* Products Grid / Table */}
            <div className="bg-white rounded-xl border border-[#DED7D0] shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF6F0] border-b border-[#DED7D0] text-stone-600 font-sans uppercase tracking-wider text-[11px]">
                    <tr>
                      <th className="py-3.5 px-4 font-semibold">Garment & SKU</th>
                      <th className="py-3.5 px-4 font-semibold">Category</th>
                      <th className="py-3.5 px-4 font-semibold">Price (BDT)</th>
                      <th className="py-3.5 px-4 font-semibold">Badge</th>
                      <th className="py-3.5 px-4 font-semibold">Stock Availability</th>
                      <th className="py-3.5 px-4 font-semibold text-right">Edit</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-100 font-sans">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-[#FAF6F0]/60 transition-colors">
                        <td className="py-3.5 px-4 flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-14 object-cover rounded bg-stone-100 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div>
                            <div className="font-semibold text-stone-900">{product.name}</div>
                            <div className="text-[11px] font-mono text-stone-400 mt-0.5">
                              SKU: {product.sku}
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-4 text-stone-600 font-medium">
                          {product.category}
                        </td>

                        <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                          {formatBDT(product.price)}
                          {product.oldPrice && (
                            <span className="text-[11px] text-stone-400 line-through block font-normal">
                              {formatBDT(product.oldPrice)}
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          {product.badge ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-[#292725] text-white">
                              {product.badge}
                            </span>
                          ) : (
                            <span className="text-stone-400 text-[11px]">—</span>
                          )}
                        </td>

                        <td className="py-3.5 px-4">
                          <button
                            onClick={() =>
                              updateProduct({ ...product, inStock: !product.inStock })
                            }
                            className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                              product.inStock
                                ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                                : 'bg-rose-50 text-rose-800 border-rose-300 hover:bg-rose-100'
                            }`}
                          >
                            {product.inStock ? '● In Stock' : '✕ Out of Stock'}
                          </button>
                        </td>

                        <td className="py-3.5 px-4 text-right space-x-1">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="p-1.5 rounded-lg border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors inline-flex items-center"
                            title="Edit Pricing & Badges"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => deleteProduct(product.id)}
                            className="p-1.5 rounded-lg border border-rose-100 text-rose-500 hover:bg-rose-50 transition-colors inline-flex items-center"
                            title="Remove Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VIP LEADS */}
        {activeTab === 'leads' && (
          <div className="bg-white rounded-xl border border-[#DED7D0] shadow-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
              <div>
                <h3 className="text-base font-serif font-bold text-[#292725]">
                  VIP Membership & Private Inquiries
                </h3>
                <p className="text-xs text-stone-500 font-sans mt-0.5">
                  Customers who requested concierge styling alerts and private collection access.
                </p>
              </div>

              <button
                onClick={() => {
                  const content = leads.map((l) => `${l.fullName},${l.phoneNumber},${l.email}`).join('\n');
                  navigator.clipboard.writeText(content);
                  showToast('Leads copied to clipboard in CSV format');
                }}
                className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-200 rounded-lg text-xs font-medium text-stone-800 transition-colors flex items-center gap-1.5 self-start"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export / Copy Leads</span>
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FAF6F0] border-b border-[#DED7D0] text-stone-600 font-sans uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="py-3 px-4 font-semibold">Full Name</th>
                    <th className="py-3 px-4 font-semibold">Phone Number</th>
                    <th className="py-3 px-4 font-semibold">Email Address</th>
                    <th className="py-3 px-4 font-semibold text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 font-sans">
                  {leads.map((lead, idx) => (
                    <tr key={idx} className="hover:bg-[#FAF6F0]/60">
                      <td className="py-3 px-4 font-semibold text-stone-900">{lead.fullName}</td>
                      <td className="py-3 px-4 font-mono text-stone-700">{lead.phoneNumber}</td>
                      <td className="py-3 px-4 text-stone-600">{lead.email}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Active Member
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* INSPECT ORDER DETAIL MODAL */}
      {selectedOrderForDetail && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedOrderForDetail(null);
          }}
        >
          <div className="bg-[#FCFAF7] border border-[#DED7D0] w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden animate-scaleUp">
            <div className="px-6 py-4 border-b border-[#DED7D0] bg-[#FAF6F0] flex items-center justify-between">
              <div>
                <h3 className="text-base font-serif font-bold text-[#292725]">
                  Order Inspection: {selectedOrderForDetail.orderId}
                </h3>
                <span className="text-xs text-stone-500 font-sans">
                  Fulfillment & Logistics Record
                </span>
              </div>
              <button
                onClick={() => setSelectedOrderForDetail(null)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto text-xs font-sans">
              {/* Status Update Quick Bar */}
              <div className="bg-white p-4 rounded-xl border border-[#DED7D0]">
                <label className="block text-[11px] uppercase tracking-wider font-semibold text-stone-500 mb-2">
                  Update Fulfillment Status:
                </label>
                <div className="flex flex-wrap gap-2">
                  {(['pending', 'processing', 'dispatched', 'out_for_delivery', 'delivered', 'cancelled'] as OrderStatus[]).map(
                    (st) => (
                      <button
                        key={st}
                        onClick={() => {
                          updateOrderStatus(selectedOrderForDetail.orderId, st);
                          setSelectedOrderForDetail((prev) => (prev ? { ...prev, status: st } : null));
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          selectedOrderForDetail.status === st
                            ? 'bg-[#292725] text-white border-[#292725]'
                            : 'bg-[#FAF6F0] text-stone-700 border-stone-300 hover:bg-stone-100'
                        }`}
                      >
                        {st.replace('_', ' ').toUpperCase()}
                      </button>
                    )
                  )}
                </div>
              </div>

              {/* Courier Consignment Info Editor */}
              <div className="bg-white p-4 rounded-xl border border-[#DED7D0] space-y-3">
                <h4 className="font-semibold text-stone-800 uppercase text-[11px] tracking-wider">
                  Courier Consignment Setup
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1">Courier Partner</label>
                    <select
                      value={selectedOrderForDetail.courierName || 'Steadfast Courier'}
                      onChange={(e) => {
                        const courier = e.target.value as OrderDetails['courierName'];
                        updateOrderCourier(
                          selectedOrderForDetail.orderId,
                          courier,
                          selectedOrderForDetail.courierTrackingCode || 'ST-DH-' + Math.floor(100000 + Math.random() * 900000)
                        );
                        setSelectedOrderForDetail((prev) => (prev ? { ...prev, courierName: courier } : null));
                      }}
                      className="w-full p-2 bg-[#FAF6F0] border border-[#DED7D0] rounded-lg text-xs"
                    >
                      <option value="Steadfast Courier">Steadfast Courier</option>
                      <option value="Paperfly Express">Paperfly Express</option>
                      <option value="Pathao Courier">Pathao Courier</option>
                      <option value="Show On Dedicated Express">Show On Dedicated Express</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] text-stone-500 mb-1">Consignment Tracking Code</label>
                    <input
                      type="text"
                      value={selectedOrderForDetail.courierTrackingCode || ''}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateOrderCourier(
                          selectedOrderForDetail.orderId,
                          selectedOrderForDetail.courierName || 'Steadfast Courier',
                          val
                        );
                        setSelectedOrderForDetail((prev) => (prev ? { ...prev, courierTrackingCode: val } : null));
                      }}
                      placeholder="e.g. ST-DH-892410"
                      className="w-full p-2 bg-[#FAF6F0] border border-[#DED7D0] rounded-lg text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Recipient & Items */}
              <div className="bg-white p-4 rounded-xl border border-[#DED7D0] space-y-3">
                <h4 className="font-semibold text-stone-800 uppercase text-[11px] tracking-wider">
                  Customer & Shipping Address
                </h4>
                <div className="grid grid-cols-2 gap-2 text-stone-600">
                  <div>
                    <span className="text-stone-400 block">Name:</span>
                    <span className="font-semibold text-stone-900">{selectedOrderForDetail.customerName}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Phone:</span>
                    <span className="font-mono text-stone-900">{selectedOrderForDetail.customerPhone}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">Email:</span>
                    <span>{selectedOrderForDetail.customerEmail}</span>
                  </div>
                  <div>
                    <span className="text-stone-400 block">City & Address:</span>
                    <span>{selectedOrderForDetail.city} • {selectedOrderForDetail.deliveryAddress}</span>
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="bg-white p-4 rounded-xl border border-[#DED7D0] space-y-2">
                <h4 className="font-semibold text-stone-800 uppercase text-[11px] tracking-wider mb-2">
                  Items Ordered
                </h4>
                {selectedOrderForDetail.items.map((it, i) => (
                  <div key={i} className="flex items-center justify-between py-1.5 border-b border-stone-100 last:border-none">
                    <div className="flex items-center gap-2.5">
                      <img src={it.product.image} alt={it.product.name} className="w-9 h-11 object-cover rounded" />
                      <div>
                        <div className="font-semibold text-stone-900">{it.product.name}</div>
                        <div className="text-[11px] text-stone-500">
                          Size: {it.selectedSize} • Color: {it.selectedColor.name} • Qty: {it.quantity}
                        </div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-stone-800">
                      {formatBDT(it.product.price * it.quantity)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 py-4 border-t border-[#DED7D0] bg-[#FAF6F0] flex items-center justify-between">
              <button
                onClick={() => {
                  openOrderTracking(selectedOrderForDetail.orderId);
                  setSelectedOrderForDetail(null);
                }}
                className="px-4 py-2 bg-[#292725] text-white rounded-lg text-xs font-semibold hover:bg-stone-800 transition-colors flex items-center gap-1.5"
              >
                <Truck className="w-3.5 h-3.5" />
                <span>Open Tracking Portal</span>
              </button>
              <button
                onClick={() => setSelectedOrderForDetail(null)}
                className="px-4 py-2 bg-stone-200 text-stone-800 rounded-lg text-xs font-medium hover:bg-stone-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD NEW PRODUCT MODAL */}
      {isAddProductModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsAddProductModalOpen(false);
          }}
        >
          <div className="bg-[#FCFAF7] border border-[#DED7D0] w-full max-w-xl rounded-xl shadow-2xl overflow-hidden animate-scaleUp">
            <div className="px-6 py-4 border-b border-[#DED7D0] bg-[#FAF6F0] flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-[#292725]">
                Add New Garment to Catalog
              </h3>
              <button onClick={() => setIsAddProductModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddProductSubmit} className="p-6 space-y-4 text-xs font-sans max-h-[75vh] overflow-y-auto">
              <div>
                <label className="block text-stone-600 font-medium mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={newProductForm.name}
                  onChange={(e) => setNewProductForm({ ...newProductForm, name: e.target.value })}
                  placeholder="e.g. Minimalist Linen Mandarin Collar Shirt"
                  className="w-full p-2.5 bg-white border border-[#DED7D0] rounded-lg text-xs focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Category</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) =>
                      setNewProductForm({
                        ...newProductForm,
                        category: e.target.value as Product['category'],
                      })
                    }
                    className="w-full p-2.5 bg-white border border-[#DED7D0] rounded-lg text-xs"
                  >
                    <option value="Casual Wear">Casual Wear</option>
                    <option value="Formal Wear">Formal Wear</option>
                    <option value="Street Style">Street Style</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Badge</label>
                  <select
                    value={newProductForm.badge || 'NEW'}
                    onChange={(e) =>
                      setNewProductForm({
                        ...newProductForm,
                        badge: e.target.value as Product['badge'],
                      })
                    }
                    className="w-full p-2.5 bg-white border border-[#DED7D0] rounded-lg text-xs"
                  >
                    <option value="NEW">NEW</option>
                    <option value="BESTSELLER">BESTSELLER</option>
                    <option value="TRENDING">TRENDING</option>
                    <option value="SALE">SALE</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-600 font-medium mb-1">Price (BDT ৳)</label>
                  <input
                    type="number"
                    required
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: Number(e.target.value) })}
                    className="w-full p-2.5 bg-white border border-[#DED7D0] rounded-lg text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-stone-600 font-medium mb-1">Original Price (Strike-through)</label>
                  <input
                    type="number"
                    value={newProductForm.oldPrice}
                    onChange={(e) => setNewProductForm({ ...newProductForm, oldPrice: Number(e.target.value) })}
                    className="w-full p-2.5 bg-white border border-[#DED7D0] rounded-lg text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Image URL</label>
                <input
                  type="text"
                  required
                  value={newProductForm.image}
                  onChange={(e) => setNewProductForm({ ...newProductForm, image: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#DED7D0] rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Fabric & Material Details</label>
                <input
                  type="text"
                  value={newProductForm.fabricDetails}
                  onChange={(e) => setNewProductForm({ ...newProductForm, fabricDetails: e.target.value })}
                  className="w-full p-2.5 bg-white border border-[#DED7D0] rounded-lg text-xs"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 bg-[#292725] text-white text-xs uppercase tracking-widest font-semibold rounded-lg hover:bg-stone-800 transition-colors shadow-md"
                >
                  Publish Product to Live Store
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* QUICK EDIT PRODUCT MODAL */}
      {editingProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/60 backdrop-blur-sm p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setEditingProduct(null);
          }}
        >
          <div className="bg-[#FCFAF7] border border-[#DED7D0] w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-scaleUp">
            <div className="px-6 py-4 border-b border-[#DED7D0] bg-[#FAF6F0] flex items-center justify-between">
              <h3 className="text-base font-serif font-bold text-[#292725]">
                Edit Product: {editingProduct.name}
              </h3>
              <button onClick={() => setEditingProduct(null)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 text-xs font-sans">
              <div>
                <label className="block text-stone-600 font-medium mb-1">Price (BDT ৳)</label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) => setEditingProduct({ ...editingProduct, price: Number(e.target.value) })}
                  className="w-full p-2.5 bg-white border border-[#DED7D0] rounded-lg text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-stone-600 font-medium mb-1">Badge</label>
                <select
                  value={editingProduct.badge || ''}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      badge: (e.target.value || undefined) as Product['badge'],
                    })
                  }
                  className="w-full p-2.5 bg-white border border-[#DED7D0] rounded-lg text-xs"
                >
                  <option value="">None</option>
                  <option value="NEW">NEW</option>
                  <option value="BESTSELLER">BESTSELLER</option>
                  <option value="TRENDING">TRENDING</option>
                  <option value="SALE">SALE</option>
                </select>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-medium text-stone-700">In Stock:</span>
                <input
                  type="checkbox"
                  checked={editingProduct.inStock}
                  onChange={(e) => setEditingProduct({ ...editingProduct, inStock: e.target.checked })}
                  className="w-4 h-4 accent-[#292725]"
                />
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  onClick={() => {
                    updateProduct(editingProduct);
                    setEditingProduct(null);
                  }}
                  className="flex-1 py-2.5 bg-[#292725] text-white rounded-lg text-xs uppercase tracking-wider font-semibold hover:bg-stone-800"
                >
                  Save Changes
                </button>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2.5 bg-stone-200 text-stone-800 rounded-lg text-xs"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
