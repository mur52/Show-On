export type ProductCategory =
  | 'Baggy Pants'
  | 'Low Cut Pants'
  | 'T-Shirts'
  | 'Drop Shoulder'
  | 'Jeans';

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  descriptor: string;
  price: number; // in BDT
  oldPrice?: number;
  badge?: 'NEW' | 'SALE' | 'TRENDING' | 'BESTSELLER';
  rating: number;
  reviewsCount: number;
  image: string;
  secondaryImage: string;
  gallery: string[];
  sizes: ('S' | 'M' | 'L' | 'XL' | 'XXL' | '28' | '30' | '32' | '34' | '36' | 'One Size')[];
  colors: { name: string; hex: string }[];
  inStock: boolean;
  stockCount?: number;
  description: string;
  fabricDetails: string;
  careInstructions: string;
  fit: string;
  sku: string;
  isBestseller?: boolean;
  isTrending?: boolean;
}

export interface CartItem {
  product: Product;
  selectedSize: string;
  selectedColor: { name: string; hex: string };
  quantity: number;
}

export type ViewMode = 'home' | 'shop' | 'about' | 'contact' | 'bestsellers' | 'trending' | 'admin' | 'tracking' | 'tryon';

export interface ProductReview {
  id: string;
  productId: string;
  author: string;
  rating: number; // 1 to 5
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
  location: string;
  fitFeedback: 'Runs Small' | 'True to Size' | 'Runs Large' | 'Perfect Oversized Fit';
  sizePurchased: string;
  helpfulCount: number;
  likedByCurrentUser?: boolean;
  images?: string[];
}

export interface TryOnRequest {
  userImageBase64?: string;
  userImageUrl?: string;
  modelPresetId?: string;
  selectedProductIds: string[];
  userHeightFt?: string;
  userWeightKg?: string;
  fitPreference?: 'Tailored' | 'Relaxed' | 'Oversized' | 'Baggy Drape';
  occasionNotes?: string;
}

export interface TryOnAnalysis {
  fitVerdict: string;
  silhouetteRating: number; // 1-100
  styleAdvice: string;
  sizeRecommendations: { [productId: string]: string };
  colorHarmonyScore: number;
  occasionSuitability: string[];
  fabricDrapeNotes: string;
  aiLookSummary: string;
}

export interface TryOnResult {
  compositeImageUrl: string;
  generatedAt: string;
  analysis: TryOnAnalysis;
  selectedProducts: Product[];
}

export interface CategoryInfo {
  id: string;
  name: ProductCategory;
  tagline: string;
  itemCount: number;
  image: string;
}

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address?: string;
  city?: 'Dhaka' | 'Chittagong' | 'Sylhet' | 'Rajshahi' | 'Khulna' | 'Other';
  createdAt: string;
  avatarInitials?: string;
}

export interface LeadFormData {
  fullName: string;
  phoneNumber: string;
  email: string;
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'dispatched'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface OrderStatusEvent {
  status: OrderStatus;
  title: string;
  description: string;
  timestamp: string;
  location: string;
  completed: boolean;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  deliveryAddress: string;
  city: 'Dhaka' | 'Chittagong' | 'Sylhet' | 'Rajshahi' | 'Khulna' | 'Other';
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
  createdAt: string;
  status: OrderStatus;
  courierName?: 'Steadfast Courier' | 'Paperfly Express' | 'Pathao Courier' | 'Show On Dedicated Express';
  courierTrackingCode?: string;
  estimatedDelivery?: string;
  statusHistory?: OrderStatusEvent[];
  notes?: string;
}

