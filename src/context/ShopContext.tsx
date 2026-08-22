import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { CartItem, LeadFormData, OrderDetails, OrderStatus, Product, ProductCategory, ProductReview, UserProfile, ViewMode } from '../types';
import { PRODUCTS } from '../data/products';
import { INITIAL_ORDERS } from '../data/orders';
import { INITIAL_REVIEWS } from '../data/reviews';

interface ShopContextType {
  cart: CartItem[];
  wishlist: Product[];
  currentView: ViewMode;
  setCurrentView: (view: ViewMode) => void;
  selectedCategory: ProductCategory | string | null;
  setSelectedCategory: (category: ProductCategory | string | null) => void;
  selectedProduct: Product | null;
  openProductDetail: (product: Product) => void;
  closeProductDetail: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isAboutOpen: boolean;
  setIsAboutOpen: (open: boolean) => void;
  isContactOpen: boolean;
  setIsContactOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addToCart: (product: Product, size?: string, color?: { name: string; hex: string }, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, colorName: string) => void;
  updateCartQuantity: (productId: string, size: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  cartTotalCount: number;
  cartSubtotal: number;
  toast: { message: string; type: 'success' | 'info' | 'error'; id: number } | null;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  formatBDT: (amount: number) => string;

  // AI Virtual Try-On Fitting Room
  isTryOnModalOpen: boolean;
  setIsTryOnModalOpen: (open: boolean) => void;
  tryOnSelectedProducts: Product[];
  setTryOnSelectedProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  openTryOnWithProduct: (product: Product) => void;
  toggleProductInTryOn: (product: Product) => void;

  // Product Reviews System
  reviews: ProductReview[];
  getProductReviews: (productId: string) => ProductReview[];
  getProductRatingStats: (productId: string) => {
    averageRating: number;
    totalReviews: number;
    starCounts: { [key: number]: number };
    fitSummary: { trueToSizePct: number; oversizedPct: number; runsSmallPct: number };
  };
  addReview: (reviewData: {
    productId: string;
    author: string;
    rating: number;
    title: string;
    comment: string;
    location?: string;
    fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Large' | 'Perfect Oversized Fit';
    sizePurchased: string;
    images?: string[];
  }) => void;
  likeReview: (reviewId: string) => void;

  // User Authentication & Customer Account
  currentUser: UserProfile | null;
  isUserAuthModalOpen: boolean;
  setIsUserAuthModalOpen: (open: boolean) => void;
  userAuthModalTab: 'login' | 'signup';
  setUserAuthModalTab: (tab: 'login' | 'signup') => void;
  openUserAuth: (tab?: 'login' | 'signup') => void;
  isUserProfileModalOpen: boolean;
  setIsUserProfileModalOpen: (open: boolean) => void;
  openUserProfile: () => void;
  loginUser: (emailOrPhone: string, password?: string) => boolean;
  signUpUser: (data: {
    fullName: string;
    email: string;
    phoneNumber: string;
    password?: string;
    address?: string;
    city?: 'Dhaka' | 'Chittagong' | 'Sylhet' | 'Rajshahi' | 'Khulna' | 'Other';
  }) => boolean;
  logoutUser: () => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  currentUserOrders: OrderDetails[];

  // Order Tracking System
  orders: OrderDetails[];
  isTrackingModalOpen: boolean;
  setIsTrackingModalOpen: (open: boolean) => void;
  trackingSearchId: string;
  setTrackingSearchId: (id: string) => void;
  openOrderTracking: (orderId?: string) => void;
  addOrder: (order: OrderDetails) => void;
  createNewOrder: (order: OrderDetails) => void;
  updateOrderStatus: (orderId: string, status: OrderStatus, eventDescription?: string) => void;
  updateOrderCourier: (
    orderId: string,
    courierName: OrderDetails['courierName'],
    trackingCode: string,
    estimatedDelivery?: string
  ) => void;
  deleteOrder: (orderId: string) => void;
  getOrderById: (query: string) => OrderDetails | undefined;

  // Admin Dashboard
  isAdminLoggedIn: boolean;
  isAdminAuthModalOpen: boolean;
  setIsAdminAuthModalOpen: (open: boolean) => void;
  adminLogin: (passcode: string) => boolean;
  adminLogout: () => void;
  openAdminPortal: () => void;

  // Product Catalog & Inventory (Admin Editable)
  products: Product[];
  updateProduct: (product: Product) => void;
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;

  // Leads
  leads: LeadFormData[];
  addLead: (lead: LeadFormData) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const SEED_USERS: UserProfile[] = [
  {
    id: 'usr-001',
    fullName: 'Raihan Chowdhury',
    email: 'raihan52760@gmail.com',
    phoneNumber: '+8801711000888',
    address: 'House 14, Road 7, Sector 3, Uttara',
    city: 'Dhaka',
    createdAt: '2026-08-10',
    avatarInitials: 'RC',
  },
  {
    id: 'usr-002',
    fullName: 'Tanvir Ahmed',
    email: 'tanvir.chowdhury@gmail.com',
    phoneNumber: '+8801712345678',
    address: 'House 42, Road 11, Block D, Banani',
    city: 'Dhaka',
    createdAt: '2026-08-15',
    avatarInitials: 'TA',
  },
];

export const ShopProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Modals & Panels
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isTrackingModalOpen, setIsTrackingModalOpen] = useState(false);
  const [trackingSearchId, setTrackingSearchId] = useState('');
  const [isAdminAuthModalOpen, setIsAdminAuthModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // User Auth & Profile Modal
  const [isUserAuthModalOpen, setIsUserAuthModalOpen] = useState(false);
  const [userAuthModalTab, setUserAuthModalTab] = useState<'login' | 'signup'>('login');
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false);

  // Registered Users & Current User
  const [registeredUsers, setRegisteredUsers] = useState<UserProfile[]>(() => {
    try {
      const saved = localStorage.getItem('showon_registered_users');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return SEED_USERS;
  });

  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem('showon_current_user');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return null;
  });

  // Toast
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' | 'error'; id: number } | null>(null);

  // Products Catalog (always syncs with updated PRODUCTS)
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('showon_products_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return PRODUCTS;
  });

  // Orders State (loaded from storage or seeded)
  const [orders, setOrders] = useState<OrderDetails[]>(() => {
    try {
      const saved = localStorage.getItem('showon_orders_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_ORDERS;
  });

  // Admin Auth State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    try {
      return localStorage.getItem('showon_admin_session') === 'active';
    } catch {
      return false;
    }
  });

  // AI Virtual Try-On Fitting Room State
  const [isTryOnModalOpen, setIsTryOnModalOpen] = useState(false);
  const [tryOnSelectedProducts, setTryOnSelectedProducts] = useState<Product[]>(() => [PRODUCTS[0], PRODUCTS[30]]);

  // Product Reviews State
  const [reviews, setReviews] = useState<ProductReview[]>(() => {
    try {
      const saved = localStorage.getItem('showon_product_reviews_v2');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_REVIEWS;
  });

  useEffect(() => {
    try {
      localStorage.setItem('showon_product_reviews_v2', JSON.stringify(reviews));
    } catch {
      // ignore
    }
  }, [reviews]);

  const openTryOnWithProduct = (product: Product) => {
    setTryOnSelectedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) return prev;
      // Keep up to 3 items in try-on (e.g. 1 top, 1 bottom)
      return [product, ...prev.filter((p) => p.category !== product.category)].slice(0, 3);
    });
    setIsTryOnModalOpen(true);
  };

  const toggleProductInTryOn = (product: Product) => {
    setTryOnSelectedProducts((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      } else {
        return [product, ...prev.slice(0, 2)];
      }
    });
  };

  const getProductReviews = (productId: string): ProductReview[] => {
    const existing = reviews.filter((r) => r.productId === productId);
    if (existing.length > 0) return existing;

    const prod = products.find((p) => p.id === productId);
    if (!prod) return [];

    // Fallback seed review for any newly viewed product without explicit seed
    const defaultReview1: ProductReview = {
      id: `rev-${productId}-1`,
      productId: productId,
      author: 'Tanvir Hossain',
      rating: 5,
      title: `Superb quality ${prod.name}`,
      comment: `The fabric quality and fit on this ${prod.category} is top notch. Delivered promptly in Dhaka. Exactly as pictured.`,
      date: '2026-08-14',
      verifiedPurchase: true,
      location: 'Dhaka, Bangladesh',
      fitFeedback: 'True to Size',
      sizePurchased: prod.sizes[0] || 'L',
      helpfulCount: 16,
    };

    const defaultReview2: ProductReview = {
      id: `rev-${productId}-2`,
      productId: productId,
      author: 'Shahriar Kabir',
      rating: 5,
      title: 'Drapes effortlessly',
      comment: `Stitching and hem finishing are great. Fits comfortable and breathes well in warm weather. Highly recommended!`,
      date: '2026-08-08',
      verifiedPurchase: true,
      location: 'Chittagong, Bangladesh',
      fitFeedback: 'Perfect Oversized Fit',
      sizePurchased: prod.sizes[1] || 'M',
      helpfulCount: 9,
    };

    return [defaultReview1, defaultReview2];
  };

  const getProductRatingStats = (productId: string) => {
    const productReviews = getProductReviews(productId);
    const totalReviews = productReviews.length;
    if (totalReviews === 0) {
      return {
        averageRating: 5.0,
        totalReviews: 2,
        starCounts: { 5: 2, 4: 0, 3: 0, 2: 0, 1: 0 },
        fitSummary: { trueToSizePct: 85, oversizedPct: 15, runsSmallPct: 0 },
      };
    }

    const sum = productReviews.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = Number((sum / totalReviews).toFixed(1));

    const starCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } as Record<number, number>;
    let trueToSizeCount = 0;
    let oversizedCount = 0;
    let runsSmallCount = 0;

    productReviews.forEach((r) => {
      starCounts[r.rating] = (starCounts[r.rating] || 0) + 1;
      if (r.fitFeedback === 'True to Size') trueToSizeCount++;
      else if (r.fitFeedback === 'Perfect Oversized Fit' || r.fitFeedback === 'Runs Large') oversizedCount++;
      else if (r.fitFeedback === 'Runs Small') runsSmallCount++;
    });

    return {
      averageRating,
      totalReviews,
      starCounts,
      fitSummary: {
        trueToSizePct: Math.round((trueToSizeCount / totalReviews) * 100) || 85,
        oversizedPct: Math.round((oversizedCount / totalReviews) * 100) || 12,
        runsSmallPct: Math.round((runsSmallCount / totalReviews) * 100) || 3,
      },
    };
  };

  const addReview = (reviewData: {
    productId: string;
    author: string;
    rating: number;
    title: string;
    comment: string;
    location?: string;
    fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Large' | 'Perfect Oversized Fit';
    sizePurchased: string;
    images?: string[];
  }) => {
    const newRev: ProductReview = {
      id: `rev-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      productId: reviewData.productId,
      author: reviewData.author.trim() || 'Verified Customer',
      rating: reviewData.rating,
      title: reviewData.title.trim() || 'Great Quality',
      comment: reviewData.comment.trim(),
      date: new Date().toISOString().split('T')[0],
      verifiedPurchase: true,
      location: reviewData.location?.trim() || 'Dhaka, Bangladesh',
      fitFeedback: reviewData.fitFeedback,
      sizePurchased: reviewData.sizePurchased,
      helpfulCount: 0,
      images: reviewData.images,
    };

    setReviews((prev) => [newRev, ...prev]);
    showToast('Thank you! Your verified review has been published.', 'success');
  };

  const likeReview = (reviewId: string) => {
    setReviews((prev) =>
      prev.map((r) => {
        if (r.id === reviewId) {
          const isLiked = r.likedByCurrentUser;
          return {
            ...r,
            helpfulCount: isLiked ? r.helpfulCount - 1 : r.helpfulCount + 1,
            likedByCurrentUser: !isLiked,
          };
        }
        return r;
      })
    );
  };

  // Leads State
  const [leads, setLeads] = useState<LeadFormData[]>(() => {
    try {
      const saved = localStorage.getItem('showon_leads');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [
      { fullName: 'Rafid Al Mahfuz', phoneNumber: '+8801755123456', email: 'rafid.mahfuz@gmail.com' },
      { fullName: 'Sadia Tasnim', phoneNumber: '+8801822987654', email: 'sadia.tasnim@live.com' },
    ];
  });

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('showon_cart');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    const defaultProduct = PRODUCTS[0];
    return [
      {
        product: defaultProduct,
        selectedSize: defaultProduct.sizes[0] || 'M',
        selectedColor: defaultProduct.colors[0],
        quantity: 1,
      },
    ];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('showon_wishlist');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return [PRODUCTS[0], PRODUCTS[15]];
  });

  useEffect(() => {
    try {
      localStorage.setItem('showon_cart', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('showon_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('showon_orders_v2', JSON.stringify(orders));
    } catch {
      // ignore
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('showon_products_v2', JSON.stringify(products));
    } catch {
      // ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('showon_leads', JSON.stringify(leads));
    } catch {
      // ignore
    }
  }, [leads]);

  useEffect(() => {
    try {
      localStorage.setItem('showon_registered_users', JSON.stringify(registeredUsers));
    } catch {
      // ignore
    }
  }, [registeredUsers]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem('showon_current_user', JSON.stringify(currentUser));
      } else {
        localStorage.removeItem('showon_current_user');
      }
    } catch {
      // ignore
    }
  }, [currentUser]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now();
    setToast({ message, type, id });
    setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3400);
  };

  // Auth Functions
  const openUserAuth = (tab: 'login' | 'signup' = 'login') => {
    setUserAuthModalTab(tab);
    setIsUserAuthModalOpen(true);
  };

  const openUserProfile = () => {
    if (currentUser) {
      setIsUserProfileModalOpen(true);
    } else {
      openUserAuth('login');
    }
  };

  const loginUser = (emailOrPhone: string, _pass?: string): boolean => {
    const cleanQuery = emailOrPhone.trim().toLowerCase();
    const cleanPhoneDigits = emailOrPhone.replace(/\D/g, '');

    const found = registeredUsers.find((u) => {
      const uEmail = u.email.toLowerCase();
      const uPhoneDigits = u.phoneNumber.replace(/\D/g, '');
      return (
        uEmail === cleanQuery ||
        u.phoneNumber === emailOrPhone ||
        (cleanPhoneDigits.length >= 10 && uPhoneDigits.includes(cleanPhoneDigits))
      );
    });

    if (found) {
      setCurrentUser(found);
      setIsUserAuthModalOpen(false);
      showToast(`Welcome back, ${found.fullName}!`, 'success');
      return true;
    }

    // Auto-create friendly guest session if unknown
    const isEmail = cleanQuery.includes('@');
    const autoUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: isEmail ? cleanQuery.split('@')[0].replace('.', ' ') : 'Valued Customer',
      email: isEmail ? cleanQuery : `${cleanPhoneDigits || 'client'}@showon.com`,
      phoneNumber: !isEmail ? emailOrPhone : '+8801700000000',
      createdAt: new Date().toISOString().split('T')[0],
      avatarInitials: 'SC',
    };

    setRegisteredUsers((prev) => [...prev, autoUser]);
    setCurrentUser(autoUser);
    setIsUserAuthModalOpen(false);
    showToast(`Welcome to Show On, ${autoUser.fullName}!`, 'success');
    return true;
  };

  const signUpUser = (data: {
    fullName: string;
    email: string;
    phoneNumber: string;
    password?: string;
    address?: string;
    city?: 'Dhaka' | 'Chittagong' | 'Sylhet' | 'Rajshahi' | 'Khulna' | 'Other';
  }): boolean => {
    const initials = data.fullName
      .split(' ')
      .map((w) => w[0])
      .filter(Boolean)
      .slice(0, 2)
      .join('')
      .toUpperCase() || 'SO';

    const formattedPhone = data.phoneNumber.startsWith('+880')
      ? data.phoneNumber
      : `+880${data.phoneNumber.replace(/^0+/, '')}`;

    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      fullName: data.fullName.trim(),
      email: data.email.trim().toLowerCase(),
      phoneNumber: formattedPhone,
      address: data.address?.trim(),
      city: data.city || 'Dhaka',
      createdAt: new Date().toISOString().split('T')[0],
      avatarInitials: initials,
    };

    setRegisteredUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    setIsUserAuthModalOpen(false);
    showToast(`Account created! Welcome, ${newUser.fullName}.`, 'success');
    return true;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    setIsUserProfileModalOpen(false);
    showToast('You have been signed out.', 'info');
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    setRegisteredUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    showToast('Profile updated successfully.', 'success');
  };

  const currentUserOrders = orders.filter((o) => {
    if (!currentUser) return false;
    const userPhoneDigits = currentUser.phoneNumber.replace(/\D/g, '');
    const orderPhoneDigits = o.customerPhone.replace(/\D/g, '');
    return (
      (o.customerEmail && o.customerEmail.toLowerCase() === currentUser.email.toLowerCase()) ||
      (userPhoneDigits && orderPhoneDigits && (userPhoneDigits === orderPhoneDigits || userPhoneDigits.includes(orderPhoneDigits) || orderPhoneDigits.includes(userPhoneDigits)))
    );
  });

  const openProductDetail = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeProductDetail = () => {
    setSelectedProduct(null);
  };

  const addToCart = (
    product: Product,
    size?: string,
    color?: { name: string; hex: string },
    quantity: number = 1
  ) => {
    const chosenSize = size || product.sizes[0] || 'M';
    const chosenColor = color || product.colors[0] || { name: 'Default', hex: '#292725' };

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === chosenSize &&
          item.selectedColor.name === chosenColor.name
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevCart,
          {
            product,
            selectedSize: chosenSize,
            selectedColor: chosenColor,
            quantity,
          },
        ];
      }
    });

    showToast(`Added "${product.name}" (${chosenSize}) to your bag`);
  };

  const removeFromCart = (productId: string, size: string, colorName: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor.name === colorName
          )
      )
    );
    showToast('Item removed from your bag', 'info');
  };

  const updateCartQuantity = (
    productId: string,
    size: string,
    colorName: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, colorName);
      return;
    }
    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedSize === size &&
          item.selectedColor.name === colorName
        ) {
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Removed "${product.name}" from wishlist`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name}" to wishlist`);
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((p) => p.id === productId);
  };

  // Order Tracking Actions
  const openOrderTracking = (orderId?: string) => {
    if (orderId) {
      setTrackingSearchId(orderId);
    }
    setIsTrackingModalOpen(true);
  };

  const addOrder = (newOrder: OrderDetails) => {
    setOrders((prev) => [newOrder, ...prev]);
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus, eventDescription?: string) => {
    const nowStr = new Date().toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    const statusTitleMap: Record<OrderStatus, string> = {
      pending: 'Order Received & Pending Verification',
      processing: 'Garment Finishing & QC Atelier',
      dispatched: 'Dispatched to Courier Line Hub',
      out_for_delivery: 'Out for Delivery with Assigned Rider',
      delivered: 'Delivered to Customer',
      cancelled: 'Order Cancelled',
    };

    setOrders((prev) =>
      prev.map((order) => {
        if (order.orderId === orderId) {
          const currentHistory = order.statusHistory || [];
          const newEvent = {
            status: newStatus,
            title: statusTitleMap[newStatus],
            description:
              eventDescription ||
              `Status updated to ${newStatus.replace('_', ' ').toUpperCase()} by Show On Logistics Dispatch.`,
            timestamp: nowStr,
            location: order.city + ' Dispatch Terminal',
            completed: true,
          };

          return {
            ...order,
            status: newStatus,
            statusHistory: [...currentHistory, newEvent],
          };
        }
        return order;
      })
    );

    showToast(`Order ${orderId} updated to ${newStatus.replace('_', ' ')}`, 'success');
  };

  const updateOrderCourier = (
    orderId: string,
    courierName: OrderDetails['courierName'],
    trackingCode: string,
    estimatedDelivery?: string
  ) => {
    setOrders((prev) =>
      prev.map((order) => {
        if (order.orderId === orderId) {
          return {
            ...order,
            courierName,
            courierTrackingCode: trackingCode,
            estimatedDelivery: estimatedDelivery || order.estimatedDelivery,
          };
        }
        return order;
      })
    );
    showToast(`Courier details updated for order ${orderId}`, 'success');
  };

  const deleteOrder = (orderId: string) => {
    setOrders((prev) => prev.filter((o) => o.orderId !== orderId));
    showToast(`Order ${orderId} archived`, 'info');
  };

  const getOrderById = (query: string): OrderDetails | undefined => {
    const clean = query.trim().toLowerCase();
    if (!clean) return undefined;
    return orders.find(
      (o) =>
        o.orderId.toLowerCase() === clean ||
        o.customerPhone.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, '')) ||
        (o.courierTrackingCode && o.courierTrackingCode.toLowerCase() === clean)
    );
  };

  // Admin Auth
  const adminLogin = (passcode: string): boolean => {
    // Accepts demo pass showon2026 or admin or admin123
    const validCodes = ['showon2026', 'admin', 'admin123', 'showon'];
    if (validCodes.includes(passcode.trim().toLowerCase())) {
      setIsAdminLoggedIn(true);
      try {
        localStorage.setItem('showon_admin_session', 'active');
      } catch {
        // ignore
      }
      setIsAdminAuthModalOpen(false);
      setCurrentView('admin');
      showToast('Welcome to Show On Admin Operations Dashboard', 'success');
      return true;
    }
    showToast('Invalid Access Code. Try: showon2026', 'error');
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    try {
      localStorage.removeItem('showon_admin_session');
    } catch {
      // ignore
    }
    if (currentView === 'admin') {
      setCurrentView('home');
    }
    showToast('Admin session closed', 'info');
  };

  const openAdminPortal = () => {
    if (isAdminLoggedIn) {
      setCurrentView('admin');
    } else {
      setIsAdminAuthModalOpen(true);
    }
  };

  // Product Catalog Updates
  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    showToast(`Updated "${updated.name}" details & stock`, 'success');
  };

  const addProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
    showToast(`Added "${newProd.name}" to catalog`, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    showToast(`Product removed from catalog`, 'info');
  };

  const addLead = (lead: LeadFormData) => {
    setLeads((prev) => [lead, ...prev]);
  };

  const cartTotalCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const formatBDT = (amount: number) => {
    return `৳${amount.toLocaleString('en-BD')}`;
  };

  return (
    <ShopContext.Provider
      value={{
        cart,
        wishlist,
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        openProductDetail,
        closeProductDetail,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isAboutOpen,
        setIsAboutOpen,
        isContactOpen,
        setIsContactOpen,
        searchQuery,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartTotalCount,
        cartSubtotal,
        toast,
        showToast,
        formatBDT,

        // AI Virtual Try-On Fitting Room
        isTryOnModalOpen,
        setIsTryOnModalOpen,
        tryOnSelectedProducts,
        setTryOnSelectedProducts,
        openTryOnWithProduct,
        toggleProductInTryOn,

        // Product Reviews System
        reviews,
        getProductReviews,
        getProductRatingStats,
        addReview,
        likeReview,

        // User Authentication & Profile
        currentUser,
        isUserAuthModalOpen,
        setIsUserAuthModalOpen,
        userAuthModalTab,
        setUserAuthModalTab,
        openUserAuth,
        isUserProfileModalOpen,
        setIsUserProfileModalOpen,
        openUserProfile,
        loginUser,
        signUpUser,
        logoutUser,
        updateUserProfile,
        currentUserOrders,

        // Order Tracking
        orders,
        isTrackingModalOpen,
        setIsTrackingModalOpen,
        trackingSearchId,
        setTrackingSearchId,
        openOrderTracking,
        addOrder,
        createNewOrder: addOrder,
        updateOrderStatus,
        updateOrderCourier,
        deleteOrder,
        getOrderById,

        // Admin
        isAdminLoggedIn,
        isAdminAuthModalOpen,
        setIsAdminAuthModalOpen,
        adminLogin,
        adminLogout,
        openAdminPortal,

        // Product management
        products,
        updateProduct,
        addProduct,
        deleteProduct,

        // Leads
        leads,
        addLead,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

