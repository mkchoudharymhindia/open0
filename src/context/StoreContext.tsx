import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  CartItem,
  Category,
  CustomerDetails,
  Order,
  OrderStatus,
  PaymentStatus,
  Product,
  QRPaymentSettings,
  ShippingSettings,
  WebsiteSettings
} from '../types';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_QR_SETTINGS,
  INITIAL_SHIPPING_SETTINGS,
  INITIAL_WEBSITE_SETTINGS
} from '../data/initialData';

interface StoreContextType {
  // Products
  products: Product[];
  addProduct: (product: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  resetProductsToDefault: () => void;
  getProductById: (id: string) => Product | undefined;

  // Categories
  categories: Category[];
  activeCategory: string;
  setActiveCategory: (cat: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedColor?: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  deliveryFee: number;
  cartGrandTotal: number;
  cartItemCount: number;

  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  // Orders
  orders: Order[];
  createOrder: (data: {
    items: CartItem[];
    customer: CustomerDetails;
    utrNumber: string;
    customerNotes?: string;
  }) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<void>;
  updatePaymentStatus: (orderId: string, status: PaymentStatus) => Promise<void>;
  cancelOrder: (orderId: string) => Promise<void>;
  deleteOrder: (orderId: string) => Promise<void>;
  refreshOrders: () => Promise<void>;
  getOrderById: (orderId: string) => Order | undefined;

  // Settings
  qrSettings: QRPaymentSettings;
  updateQRSettings: (settings: Partial<QRPaymentSettings>) => void;
  shippingSettings: ShippingSettings;
  updateShippingSettings: (settings: Partial<ShippingSettings>) => void;
  websiteSettings: WebsiteSettings;
  updateWebsiteSettings: (settings: Partial<WebsiteSettings>) => void;

  // UI Modals & Navigation
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  checkoutDirectItem: CartItem | null;
  startDirectCheckout: (product: Product, quantity?: number, selectedColor?: string) => void;
  confirmedOrder: Order | null;
  setConfirmedOrder: (order: Order | null) => void;
  invoiceOrder: Order | null;
  setInvoiceOrder: (order: Order | null) => void;
  storefrontLayout: 'grid' | 'compact' | 'catalog';
  setStorefrontLayout: (layout: 'grid' | 'compact' | 'catalog') => void;
  isTermsOpen: boolean;
  setIsTermsOpen: (open: boolean) => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  
  // Toast
  toast: string | null;
  showToast: (message: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const SEED_ORDERS: Order[] = [
  {
    id: 'LDW-ORD-839201',
    createdAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    items: [
      { product: INITIAL_PRODUCTS[3], quantity: 2, selectedColor: 'Midnight Black' }
    ],
    customer: {
      name: 'Rahul Sharma',
      email: 'rahul.s@example.com',
      instagramId: '@rahul_tech',
      phone: '+91 98234 11223',
      address: 'Flat 402, Lotus Residency, MG Road',
      city: 'Pune',
      state: 'Maharashtra',
      pincode: '411001',
      termsAccepted: true,
      notes: 'Call before delivery'
    },
    subtotal: 58,
    discount: 0,
    deliveryCharges: 0,
    totalAmount: 58,
    paymentMethod: 'UPI / QR Code Scan',
    utrNumber: '328491829482',
    paymentStatus: 'Payment Details Submitted',
    orderStatus: 'Payment Details Submitted',
    customerNotes: 'Please ring bell'
  },
  {
    id: 'LDW-ORD-724108',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    items: [
      { product: INITIAL_PRODUCTS[0], quantity: 1, selectedColor: 'Natural Titanium' }
    ],
    customer: {
      name: 'Pooja Verma',
      email: 'pooja.v@example.com',
      instagramId: '@pooja_apple',
      phone: '+91 99100 44556',
      address: 'House 14, Sector 21',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      termsAccepted: true,
      notes: 'Fragile delivery requested'
    },
    subtotal: 1100,
    discount: 0,
    deliveryCharges: 0,
    totalAmount: 1100,
    paymentMethod: 'UPI / QR Code Scan',
    utrNumber: '328104829105',
    paymentStatus: 'Payment Verified',
    orderStatus: 'Processing',
    customerNotes: 'Deliver between 10am - 5pm'
  }
];

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Products
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      // Clear obsolete catalog caches
      localStorage.removeItem('ldw_products_catalog_v22');
      localStorage.removeItem('ldw_products_catalog_v25');
      localStorage.removeItem('ldw_products_catalog_v30');
      localStorage.removeItem('ldw_products_catalog_v35');
      localStorage.removeItem('ldw_products_catalog_v40');
      localStorage.removeItem('ldw_products_catalog_v45');
      localStorage.removeItem('ldw_products_catalog_v50');
      localStorage.removeItem('ldw_products_catalog_v55');
      const saved = localStorage.getItem('ldw_products_catalog_v60');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge any newly introduced default products not yet in cache
          const existingIds = new Set(parsed.map((p: Product) => p.id));
          const missingDefaults = INITIAL_PRODUCTS.filter(p => !existingIds.has(p.id));
          return [...missingDefaults, ...parsed];
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('ldw_products_catalog_v60', JSON.stringify(products));
  }, [products]);

  // Wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('ldw_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('ldw_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to Wishlist ❤️');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Categories
  const [categories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // 2. Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ldw_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('ldw_cart', JSON.stringify(cart));
  }, [cart]);

  // 3. Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('ldw_orders_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return SEED_ORDERS;
  });

  const refreshOrders = async () => {
    try {
      const res = await fetch('/api/orders');
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.orders)) {
          setOrders(data.orders);
          localStorage.setItem('ldw_orders_v3', JSON.stringify(data.orders));
        }
      }
    } catch (err) {
      // Offline fallback mode
    }
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  useEffect(() => {
    localStorage.setItem('ldw_orders_v3', JSON.stringify(orders));
  }, [orders]);

  // 4. Settings
  const [qrSettings, setQrSettings] = useState<QRPaymentSettings>(() => {
    try {
      localStorage.removeItem('ldw_qr_settings');
      localStorage.removeItem('ldw_qr_settings_v2');
      localStorage.removeItem('ldw_qr_settings_v3');
      const saved = localStorage.getItem('ldw_qr_settings_v4');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.upiId && parsed.upiId !== 'luckydrawwin@oksbi') {
          return {
            ...INITIAL_QR_SETTINGS,
            ...parsed,
            enabled: true, // Always ensure QR payment is active
            upiId: parsed.upiId.trim(),
            merchantName: parsed.merchantName?.trim() || INITIAL_QR_SETTINGS.merchantName
          };
        }
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_QR_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('ldw_qr_settings_v4', JSON.stringify(qrSettings));
  }, [qrSettings]);

  const [shippingSettings, setShippingSettings] = useState<ShippingSettings>(() => {
    try {
      const saved = localStorage.getItem('ldw_shipping_settings_v3');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SHIPPING_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('ldw_shipping_settings_v3', JSON.stringify(shippingSettings));
  }, [shippingSettings]);

  const [websiteSettings, setWebsiteSettings] = useState<WebsiteSettings>(() => {
    try {
      const saved = localStorage.getItem('ldw_website_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_WEBSITE_SETTINGS;
  });

  useEffect(() => {
    localStorage.setItem('ldw_website_settings', JSON.stringify(websiteSettings));
  }, [websiteSettings]);

  // UI state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [checkoutDirectItem, setCheckoutDirectItem] = useState<CartItem | null>(null);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [invoiceOrder, setInvoiceOrder] = useState<Order | null>(null);
  const [storefrontLayout, setStorefrontLayout] = useState<'grid' | 'compact' | 'catalog'>('grid');
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  // Product operations
  const addProduct = (item: Omit<Product, 'id'>): Product => {
    if (!item.finalPrice || item.finalPrice <= 0) {
      throw new Error('Price validation failed: Please enter a valid price.');
    }

    const newProd: Product = {
      ...item,
      id: `ldw-p${Date.now().toString().slice(-6)}`,
      badge: item.badge || `₹${item.finalPrice.toLocaleString('en-IN')} ONLY`
    };

    setProducts(prev => [newProd, ...prev]);
    showToast(`Product "${newProd.name}" added successfully!`);
    return newProd;
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    if (updates.finalPrice !== undefined && updates.finalPrice <= 0) {
      throw new Error('Price validation failed: Please enter a valid price.');
    }

    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
    showToast('Product updated successfully!');
  };

  const deleteProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast(target ? `"${target.name}" removed from store.` : 'Product removed from store.');
  };

  const resetProductsToDefault = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.setItem('ldw_products_catalog_v35', JSON.stringify(INITIAL_PRODUCTS));
    showToast('Catalog restored to all default items.');
  };

  const getProductById = (id: string) => {
    return products.find(p => p.id === id);
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedColor?: string) => {
    setCart(prev => {
      const existing = prev.find(
        item => item.product.id === product.id && item.selectedColor === selectedColor
      );
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, selectedColor }];
    });
    showToast(`Added "${product.name.slice(0, 20)}"${selectedColor ? ` (${selectedColor})` : ''} to cart`);
  };

  const removeFromCart = (productId: string, selectedColor?: string) => {
    setCart(prev =>
      prev.filter(
        item => !(item.product.id === productId && (selectedColor === undefined || item.selectedColor === selectedColor))
      )
    );
  };

  const updateCartQuantity = (productId: string, quantity: number, selectedColor?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId && (selectedColor === undefined || item.selectedColor === selectedColor)
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Cart totals
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.finalPrice * item.quantity,
    0
  );

  const deliveryFee =
    shippingSettings.standardDeliveryFee === 0 ||
    cartSubtotal >= shippingSettings.freeShippingThreshold ||
    cartSubtotal === 0
      ? 0
      : shippingSettings.standardDeliveryFee;

  const cartGrandTotal = cartSubtotal + deliveryFee;
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Direct checkout
  const startDirectCheckout = (product: Product, quantity = 1, selectedColor?: string) => {
    setCheckoutDirectItem({ product, quantity, selectedColor });
    setIsCheckoutOpen(true);
  };

  // Orders
  const createOrder = async (data: {
    items: CartItem[];
    customer: CustomerDetails;
    utrNumber: string;
    customerNotes?: string;
  }): Promise<Order> => {
    const subtotal = data.items.reduce(
      (sum, item) => sum + item.product.finalPrice * item.quantity,
      0
    );
    const delFee =
      shippingSettings.standardDeliveryFee === 0 ||
      subtotal >= shippingSettings.freeShippingThreshold
        ? 0
        : shippingSettings.standardDeliveryFee;
    const totalAmount = subtotal + delFee;

    const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const localOrderId = `LDW-ORD-${dateStr}-${randomSuffix}`;

    const fallbackOrder: Order = {
      id: localOrderId,
      createdAt: new Date().toISOString(),
      items: data.items,
      customer: {
        ...data.customer,
        notes: data.customerNotes || data.customer.notes || ''
      },
      subtotal,
      discount: 0,
      deliveryCharges: delFee,
      totalAmount,
      paymentMethod: 'UPI / QR Code Scan',
      utrNumber: data.utrNumber.trim(),
      paymentStatus: 'Payment Details Submitted',
      orderStatus: 'Pending Verification',
      customerNotes: data.customerNotes || data.customer.notes || ''
    };

    let resultOrder = fallbackOrder;

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: data.items,
          customer: data.customer,
          utrNumber: data.utrNumber.trim(),
          customerNotes: data.customerNotes || data.customer.notes || '',
          discount: 0,
          deliveryCharges: delFee
        })
      });

      if (response.ok) {
        const resData = await response.json();
        if (resData.success && resData.order) {
          resultOrder = resData.order;
        }
      }
    } catch (err) {
      console.warn('Backend API offline, saved in persistent local state:', err);
    }

    setOrders(prev => [resultOrder, ...prev.filter(o => o.id !== resultOrder.id)]);

    // If order was created from main cart, clear it
    if (!checkoutDirectItem) {
      clearCart();
    }
    setCheckoutDirectItem(null);
    setConfirmedOrder(resultOrder);

    return resultOrder;
  };

  const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, orderStatus: status } : o))
    );
    showToast(`Order status updated to "${status}"`);

    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: status })
      });
    } catch (err) {
      console.error('Failed to sync orderStatus to server:', err);
    }
  };

  const updatePaymentStatus = async (orderId: string, status: PaymentStatus) => {
    setOrders(prev =>
      prev.map(o => {
        if (o.id === orderId) {
          const newOrderStatus: OrderStatus =
            status === 'Payment Verified' && (o.orderStatus === 'Payment Details Submitted' || o.orderStatus === 'Pending Verification')
              ? 'Confirmed'
              : o.orderStatus;
          return { ...o, paymentStatus: status, orderStatus: newOrderStatus };
        }
        return o;
      })
    );
    showToast(`Payment status updated to "${status}"`);

    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus: status })
      });
    } catch (err) {
      console.error('Failed to sync paymentStatus to server:', err);
    }
  };

  const cancelOrder = async (orderId: string) => {
    setOrders(prev =>
      prev.map(o => (o.id === orderId ? { ...o, orderStatus: 'Cancelled' as OrderStatus } : o))
    );
    showToast(`Order ${orderId} has been cancelled.`);

    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderStatus: 'Cancelled' })
      });
    } catch (err) {
      console.error('Failed to sync cancelOrder to server:', err);
    }
  };

  const deleteOrder = async (orderId: string) => {
    setOrders(prev => prev.filter(o => o.id !== orderId));
    showToast(`Order ${orderId} permanently deleted.`);

    try {
      await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE'
      });
    } catch (err) {
      console.error('Failed to delete order from server:', err);
    }
  };

  const getOrderById = (orderId: string) => {
    return orders.find(o => o.id === orderId);
  };

  // Settings updates
  const updateQRSettings = (updates: Partial<QRPaymentSettings>) => {
    setQrSettings(prev => ({ ...prev, ...updates }));
    showToast('UPI QR payment settings updated.');
  };

  const updateShippingSettings = (updates: Partial<ShippingSettings>) => {
    setShippingSettings(prev => ({ ...prev, ...updates }));
    showToast('Shipping settings updated.');
  };

  const updateWebsiteSettings = (updates: Partial<WebsiteSettings>) => {
    setWebsiteSettings(prev => ({ ...prev, ...updates }));
    showToast('Website settings saved.');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        resetProductsToDefault,
        getProductById,
        categories,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartSubtotal,
        deliveryFee,
        cartGrandTotal,
        cartItemCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        createOrder,
        updateOrderStatus,
        updatePaymentStatus,
        cancelOrder,
        deleteOrder,
        refreshOrders,
        getOrderById,
        qrSettings,
        updateQRSettings,
        shippingSettings,
        updateShippingSettings,
        websiteSettings,
        updateWebsiteSettings,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        checkoutDirectItem,
        startDirectCheckout,
        confirmedOrder,
        setConfirmedOrder,
        invoiceOrder,
        setInvoiceOrder,
        storefrontLayout,
        setStorefrontLayout,
        isTermsOpen,
        setIsTermsOpen,
        isAdminOpen,
        setIsAdminOpen,
        toast,
        showToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
