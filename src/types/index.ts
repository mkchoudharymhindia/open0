export interface ProductColor {
  name: string;
  hex: string;
  image?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  originalPrice: number;
  finalPrice: number;
  rating: number;
  reviewCount: number;
  images: string[];
  inStock: boolean;
  isNew?: boolean;
  isTrending?: boolean;
  isFeatured?: boolean;
  badge?: string;
  variant?: string;
  storage?: string;
  features: string[];
  specs: Record<string, string>;
  colors?: ProductColor[];
  energyBadge?: string; // e.g. "5 Star"
  boughtInPastMonth?: string; // e.g. "800+ bought in past month"
}

export interface Category {
  id: string;
  name: string;
  iconName: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  name?: string;
  image?: string;
  price?: number;
  category?: string;
}

export interface CustomerDetails {
  name: string;
  email: string;
  instagramId?: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  termsAccepted: boolean;
  notes?: string;
}

export type PaymentStatus = 
  | 'Payment Details Submitted'
  | 'Payment Verified'
  | 'Payment Failed'
  | 'Refund Initiated'
  | 'Refunded';

export type OrderStatus =
  | 'Payment Details Submitted'
  | 'Pending Verification'
  | 'Confirmed'
  | 'Processing'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled';

export interface Order {
  id: string; // e.g. "LDW-ORD-849215"
  orderId?: string; // Optional alias for id
  createdAt: string; // Order Date & Time (ISO string)
  items: CartItem[];
  customer: CustomerDetails;
  customerName?: string;
  phoneNumber?: string;
  email?: string;
  deliveryAddress?: string;
  city?: string;
  state?: string;
  pincode?: string;
  subtotal: number;
  discount: number;
  deliveryCharges: number;
  totalAmount: number;
  paymentMethod: string; // e.g. "UPI / QR Code Scan"
  utrNumber: string; // UTR / Transaction Reference Number
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  customerNotes?: string;
}

export interface QRPaymentSettings {
  enabled: boolean;
  upiId: string;
  merchantName: string;
  customQrImageUrl?: string;
  instructions: string;
}

export interface ShippingSettings {
  standardDeliveryFee: number;
  freeShippingThreshold: number;
  estimatedDeliveryDays: string;
}

export interface WebsiteSettings {
  storeName: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroSupportingText: string;
  megaDealBanner: string;
  supportEmail: string;
  supportPhone: string;
  supportHours: string;
  instagramHandle: string;
}
