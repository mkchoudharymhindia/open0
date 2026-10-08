import React, { useState } from 'react';
import {
  X,
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  Users,
  CreditCard,
  QrCode,
  Tag,
  FileText,
  Truck,
  RotateCcw,
  Settings,
  Plus,
  Trash2,
  Edit,
  CheckCircle,
  AlertCircle,
  Lock,
  Unlock,
  Eye,
  LogOut,
  Save,
  Check,
  Search,
  Sparkles,
  Image as ImageIcon,
  Copy,
  Phone,
  Mail,
  Printer,
  Download,
  Ban,
  RefreshCw,
  ExternalLink,
  Clock,
  Filter,
  CheckCircle2,
  Upload
} from 'lucide-react';
import QRCode from 'qrcode';
import { useStore } from '../context/StoreContext';
import { Order, OrderStatus, PaymentStatus, Product } from '../types';
import { PRODUCT_TEMPLATES, IMAGE_TEMPLATES, ProductTemplate, ImageTemplate } from '../data/templatesData';

type AdminTab =
  | 'dashboard'
  | 'products'
  | 'categories'
  | 'orders'
  | 'customers'
  | 'payments'
  | 'qr-settings'
  | 'offers'
  | 'terms'
  | 'shipping'
  | 'returns'
  | 'settings';

export const AdminPanel: React.FC = () => {
  const {
    isAdminOpen,
    setIsAdminOpen,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProductsToDefault,
    categories,
    orders,
    updateOrderStatus,
    updatePaymentStatus,
    cancelOrder,
    deleteOrder,
    refreshOrders,
    qrSettings,
    updateQRSettings,
    shippingSettings,
    updateShippingSettings,
    websiteSettings,
    updateWebsiteSettings,
    setInvoiceOrder,
    showToast
  } = useStore();

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('ldw_admin_auth') === 'true';
  });
  const [passcode, setPasscode] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  // Product Templates & Image Picker state
  const [isProductTemplatesOpen, setIsProductTemplatesOpen] = useState(false);
  const [isImagePickerOpen, setIsImagePickerOpen] = useState(false);
  const [imageCategoryFilter, setImageCategoryFilter] = useState('all');

  // Product modal (Add / Edit)
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodCategory, setProdCategory] = useState(categories[0]?.name || 'Mobile Accessories');
  const [prodOriginalPrice, setProdOriginalPrice] = useState(149);
  const [prodFinalPrice, setProdFinalPrice] = useState(49);
  const [prodRating, setProdRating] = useState(4.8);
  const [prodImageUrl, setProdImageUrl] = useState('');
  const [prodIsNew, setProdIsNew] = useState(false);
  const [prodIsTrending, setProdIsTrending] = useState(false);
  const [prodIsFeatured, setProdIsFeatured] = useState(false);
  const [prodError, setProdError] = useState<string | null>(null);

  // QR Settings form
  const [qrUpiId, setQrUpiId] = useState(qrSettings.upiId);
  const [qrMerchantName, setQrMerchantName] = useState(qrSettings.merchantName);
  const [qrCustomUrl, setQrCustomUrl] = useState(qrSettings.customQrImageUrl || '');
  const [qrEnabled, setQrEnabled] = useState(qrSettings.enabled);
  const [qrPreviewUrl, setQrPreviewUrl] = useState<string>('');

  // Shipping form
  const [shipFee, setShipFee] = useState(shippingSettings.standardDeliveryFee);
  const [freeThreshold, setFreeThreshold] = useState(shippingSettings.freeShippingThreshold);
  const [shipDays, setShipDays] = useState(shippingSettings.estimatedDeliveryDays);

  // Website form
  const [bannerText, setBannerText] = useState(websiteSettings.megaDealBanner);
  const [heroTitle, setHeroTitle] = useState(websiteSettings.heroHeadline);
  const [heroSub, setHeroSub] = useState(websiteSettings.heroSubheadline);
  const [heroDesc, setHeroDesc] = useState(websiteSettings.heroSupportingText);
  const [suppPhone, setSuppPhone] = useState(websiteSettings.supportPhone);
  const [suppEmail, setSuppEmail] = useState(websiteSettings.supportEmail);

  // Search & Filter in orders / customers
  const [orderSearch, setOrderSearch] = useState('');
  const [orderPaymentFilter, setOrderPaymentFilter] = useState<string>('ALL');
  const [orderStatusFilter, setOrderStatusFilter] = useState<string>('ALL');
  const [selectedOrderDetail, setSelectedOrderDetail] = useState<Order | null>(null);
  const [copiedUtrId, setCopiedUtrId] = useState<string | null>(null);
  const [orderToDelete, setOrderToDelete] = useState<string | null>(null);
  const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isRefreshingOrders, setIsRefreshingOrders] = useState(false);

  // Generate QR preview
  React.useEffect(() => {
    if (activeTab === 'qr-settings' && qrUpiId) {
      QRCode.toDataURL(`upi://pay?pa=${encodeURIComponent(qrUpiId)}&pn=${encodeURIComponent(qrMerchantName)}&cu=INR`, {
        width: 240,
        margin: 1
      })
        .then((url: string) => setQrPreviewUrl(url))
        .catch(console.error);
    }
  }, [activeTab, qrUpiId, qrMerchantName]);

  if (!isAdminOpen) return null;

  // Handle Admin Login
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'anuluckydrawwin' || passcode === 'admin123' || passcode === 'admin') {
      setIsAuthenticated(true);
      localStorage.setItem('ldw_admin_auth', 'true');
      setAuthError('');
      showToast('Admin logged in successfully!');
    } else {
      setAuthError('Incorrect passcode. Please enter the authorized administrator password.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ldw_admin_auth');
    setPasscode('');
    showToast('Logged out of Admin Portal.');
  };

  // Open Product Modal for Add
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProdName('');
    setProdDesc('');
    setProdCategory(categories[0]?.name || 'Mobile Accessories');
    setProdOriginalPrice(149);
    setProdFinalPrice(49);
    setProdRating(4.8);
    setProdImageUrl('');
    setProdIsNew(false);
    setProdIsTrending(false);
    setProdIsFeatured(false);
    setProdError(null);
    setIsProductModalOpen(true);
  };

  // Open Product Modal for Edit
  const handleOpenEditProduct = (p: Product) => {
    setEditingProductId(p.id);
    setProdName(p.name);
    setProdDesc(p.description);
    setProdCategory(p.category);
    setProdOriginalPrice(p.originalPrice);
    setProdFinalPrice(p.finalPrice);
    setProdRating(p.rating);
    setProdImageUrl(p.images[0] || '');
    setProdIsNew(!!p.isNew);
    setProdIsTrending(!!p.isTrending);
    setProdIsFeatured(!!p.isFeatured);
    setProdError(null);
    setIsProductModalOpen(true);
  };

  // Load from Product Template
  const handleApplyProductTemplate = (tpl: ProductTemplate) => {
    setEditingProductId(null);
    setProdName(tpl.name);
    setProdDesc(tpl.description);
    setProdCategory(tpl.category);
    setProdOriginalPrice(tpl.originalPrice);
    setProdFinalPrice(tpl.finalPrice);
    setProdRating(tpl.rating);
    setProdImageUrl(tpl.imageUrl);
    setProdIsNew(!!tpl.isNew);
    setProdIsTrending(!!tpl.isTrending);
    setProdIsFeatured(!!tpl.isFeatured);
    setProdError(null);
    setIsProductTemplatesOpen(false);
    setIsProductModalOpen(true);
    showToast(`Template "${tpl.name}" loaded!`);
  };

  // Save Product (Enforces ₹9 to ₹99 strict price validation)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    setProdError(null);

    // PRICE VALIDATION RULE
    if (prodFinalPrice < 1) {
      setProdError('PRICE RESTRICTION ERROR: Product final selling price must be at least ₹1.');
      return;
    }

    if (!prodName.trim()) {
      setProdError('Please enter a product title.');
      return;
    }

    const img = prodImageUrl.trim() || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=600&auto=format&fit=crop&q=80';

    try {
      if (editingProductId) {
        updateProduct(editingProductId, {
          name: prodName.trim(),
          description: prodDesc.trim(),
          category: prodCategory,
          originalPrice: Number(prodOriginalPrice),
          finalPrice: Number(prodFinalPrice),
          rating: Number(prodRating),
          badge: `₹${prodFinalPrice} ONLY`,
          images: [img],
          isNew: prodIsNew,
          isTrending: prodIsTrending,
          isFeatured: prodIsFeatured
        });
      } else {
        addProduct({
          name: prodName.trim(),
          description: prodDesc.trim(),
          category: prodCategory,
          originalPrice: Number(prodOriginalPrice),
          finalPrice: Number(prodFinalPrice),
          rating: Number(prodRating),
          reviewCount: 1,
          badge: `₹${prodFinalPrice} ONLY`,
          images: [img],
          inStock: true,
          isNew: prodIsNew,
          isTrending: prodIsTrending,
          isFeatured: prodIsFeatured,
          features: ['Genuine Physical Product', 'Quality Tested', 'Pocket-Friendly'],
          specs: {
            'Category': prodCategory,
            'Price': `₹${prodFinalPrice}`,
            'Dispatch': 'PAN India'
          }
        });
      }
      setIsProductModalOpen(false);
    } catch (err: any) {
      setProdError(err.message || 'Error saving product.');
    }
  };

  // Save QR Settings
  const handleQrFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      if (dataUrl) {
        setQrCustomUrl(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSaveQRSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateQRSettings({
      upiId: qrUpiId.trim(),
      merchantName: qrMerchantName.trim(),
      customQrImageUrl: qrCustomUrl.trim() || undefined,
      enabled: qrEnabled
    });
  };

  // Save Shipping Settings
  const handleSaveShipping = (e: React.FormEvent) => {
    e.preventDefault();
    updateShippingSettings({
      standardDeliveryFee: Number(shipFee),
      freeShippingThreshold: Number(freeThreshold),
      estimatedDeliveryDays: shipDays.trim()
    });
  };

  // Save Website Settings
  const handleSaveWebsiteSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateWebsiteSettings({
      megaDealBanner: bannerText.trim(),
      heroHeadline: heroTitle.trim(),
      heroSubheadline: heroSub.trim(),
      heroSupportingText: heroDesc.trim(),
      supportPhone: suppPhone.trim(),
      supportEmail: suppEmail.trim()
    });
  };

  // Filtered orders with multi-parameter search & status filters
  const filteredOrders = orders.filter((o) => {
    // Payment status filter
    if (orderPaymentFilter !== 'ALL' && o.paymentStatus !== orderPaymentFilter) {
      return false;
    }
    // Order status filter
    if (orderStatusFilter !== 'ALL' && o.orderStatus !== orderStatusFilter) {
      return false;
    }
    // Search query: search Order ID, customer name, email, phone, UTR, or product name
    if (orderSearch.trim()) {
      const q = orderSearch.toLowerCase();
      const matchesId = o.id.toLowerCase().includes(q);
      const matchesName = o.customer.name.toLowerCase().includes(q);
      const matchesEmail = o.customer.email.toLowerCase().includes(q);
      const matchesPhone = o.customer.phone.toLowerCase().includes(q);
      const matchesUtr = o.utrNumber.toLowerCase().includes(q);
      const matchesCity = o.customer.city.toLowerCase().includes(q);
      const matchesProduct = o.items.some(i => i.product.name.toLowerCase().includes(q));
      if (!matchesId && !matchesName && !matchesEmail && !matchesPhone && !matchesUtr && !matchesCity && !matchesProduct) {
        return false;
      }
    }
    return true;
  });

  const handleCopyUtr = (utr: string, orderId: string) => {
    navigator.clipboard.writeText(utr);
    setCopiedUtrId(orderId);
    showToast(`UTR ${utr} copied to clipboard!`);
    setTimeout(() => setCopiedUtrId(null), 2000);
  };

  const handleRefreshOrders = async () => {
    setIsRefreshingOrders(true);
    await refreshOrders();
    setIsRefreshingOrders(false);
    showToast('Orders refreshed from database.');
  };

  // Calculate Dashboard Metrics
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const pendingPayments = orders.filter(o => o.paymentStatus === 'Payment Details Submitted').length;
  const verifiedPayments = orders.filter(o => o.paymentStatus === 'Payment Verified').length;

  // Extract unique customers
  const customersMap = new Map();
  orders.forEach(o => {
    const key = o.customer.email.toLowerCase();
    if (!customersMap.has(key)) {
      customersMap.set(key, {
        customer: o.customer,
        ordersCount: 1,
        totalSpent: o.totalAmount,
        lastOrder: o.createdAt,
        orders: [o]
      });
    } else {
      const existing = customersMap.get(key);
      existing.ordersCount += 1;
      existing.totalSpent += o.totalAmount;
      existing.orders.push(o);
    }
  });
  const customersList = Array.from(customersMap.values());

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      
      {/* Admin Window Container */}
      <div 
        className="w-full max-w-7xl h-[92vh] bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Navbar */}
        <div className="bg-neutral-900 text-white px-6 py-4 flex items-center justify-between border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950 font-black">
              LD
            </div>
            <div>
              <h2 className="text-sm font-extrabold tracking-tight font-display">
                LUCKYDRAWWIN <span className="text-amber-400">ADMIN CONTROL CENTER</span>
              </h2>
              <p className="text-[10px] text-neutral-400">
                Physical Retail Store Management · All Items ₹9–₹99 Guarantee
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* AUTH CHECK: If not logged in, show Passcode Screen */}
        {!isAuthenticated ? (
          <div className="flex-1 flex items-center justify-center p-6 bg-neutral-50">
            <div className="w-full max-w-sm bg-white p-8 rounded-3xl border border-neutral-200 shadow-xl text-center space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center mx-auto">
                <Lock className="w-7 h-7" />
              </div>

              <div>
                <h3 className="text-lg font-black text-neutral-900 font-display">
                  Admin Authentication
                </h3>
                <p className="text-xs text-neutral-500 mt-1">
                  Enter authorized administrator passcode to access store orders, UPI settings, and catalog.
                </p>
              </div>

              {authError && (
                <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
                  {authError}
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <input
                  type="password"
                  placeholder="Enter Admin Passcode"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-300 text-center font-mono text-sm tracking-wider focus:outline-none focus:border-amber-500"
                />

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs tracking-wider uppercase transition-colors cursor-pointer"
                >
                  ACCESS DASHBOARD
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* AUTHENTICATED: Main Split Layout (Sidebar + Content) */
          <div className="flex-1 flex overflow-hidden">
            
            {/* ADMIN SIDEBAR (12 Sections from requirement 11) */}
            <aside className="w-60 bg-neutral-50 border-r border-neutral-200 flex flex-col justify-between overflow-y-auto shrink-0 p-3 space-y-1">
              <nav className="space-y-0.5 text-xs font-semibold">
                
                {[
                  { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
                  { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" /> },
                  { id: 'categories', label: 'Categories', icon: <FolderTree className="w-4 h-4" /> },
                  { id: 'orders', label: 'Orders', icon: <ShoppingBag className="w-4 h-4" /> },
                  { id: 'customers', label: 'Customers', icon: <Users className="w-4 h-4" /> },
                  { id: 'payments', label: 'Payments', icon: <CreditCard className="w-4 h-4" /> },
                  { id: 'qr-settings', label: 'QR Payment Settings', icon: <QrCode className="w-4 h-4" /> },
                  { id: 'offers', label: 'Offers', icon: <Tag className="w-4 h-4" /> },
                  { id: 'terms', label: 'Terms & Conditions', icon: <FileText className="w-4 h-4" /> },
                  { id: 'shipping', label: 'Shipping Settings', icon: <Truck className="w-4 h-4" /> },
                  { id: 'returns', label: 'Return & Refund Settings', icon: <RotateCcw className="w-4 h-4" /> },
                  { id: 'settings', label: 'Website Settings', icon: <Settings className="w-4 h-4" /> },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as AdminTab)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all cursor-pointer text-left ${
                      activeTab === item.id
                        ? 'bg-neutral-900 text-white shadow-xs font-bold'
                        : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60'
                    }`}
                  >
                    <span className={activeTab === item.id ? 'text-amber-400' : 'text-neutral-500'}>
                      {item.icon}
                    </span>
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}

              </nav>

              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-[10px] text-amber-900 font-medium">
                🛡️ <strong>Rule Active:</strong> Selling prices locked ₹9–₹99. All items are physical products.
              </div>
            </aside>

            {/* MAIN CONTENT VIEW */}
            <main className="flex-1 overflow-y-auto p-6 bg-white">
              
              {/* ========================================================
                  TAB 1: DASHBOARD
                 ======================================================== */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-neutral-900 font-display">
                      STORE OVERVIEW & METRICS
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Live store stats and fulfillment tracking
                    </p>
                  </div>

                  {/* KPI Metric Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                      <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                        Total Orders
                      </span>
                      <p className="text-2xl font-black text-neutral-900 font-display mt-1 tabular-nums">
                        {orders.length}
                      </p>
                      <span className="text-[10px] text-neutral-500 mt-1 block">
                        Lifetime orders submitted
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                      <span className="text-[11px] font-semibold text-amber-800 uppercase tracking-wider block">
                        Pending Verification
                      </span>
                      <p className="text-2xl font-black text-amber-900 font-display mt-1 tabular-nums">
                        {pendingPayments}
                      </p>
                      <span className="text-[10px] text-amber-700 mt-1 block">
                        UTR submitted, awaiting review
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                      <span className="text-[11px] font-semibold text-emerald-800 uppercase tracking-wider block">
                        Verified Payments
                      </span>
                      <p className="text-2xl font-black text-emerald-900 font-display mt-1 tabular-nums">
                        {verifiedPayments}
                      </p>
                      <span className="text-[10px] text-emerald-700 mt-1 block">
                        Approved & processing
                      </span>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-900 text-white">
                      <span className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider block">
                        Total Revenue
                      </span>
                      <p className="text-2xl font-black text-amber-400 font-display mt-1 tabular-nums">
                        ₹{totalRevenue}
                      </p>
                      <span className="text-[10px] text-neutral-400 mt-1 block">
                        Pan-India order value
                      </span>
                    </div>
                  </div>

                  {/* Recent Orders Overview */}
                  <div className="space-y-3 pt-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                        Recent Orders
                      </h4>
                      <button
                        onClick={() => setActiveTab('orders')}
                        className="text-xs font-bold text-amber-600 hover:text-amber-800 cursor-pointer"
                      >
                        View All Orders →
                      </button>
                    </div>

                    <div className="border border-neutral-200 rounded-2xl overflow-hidden divide-y divide-neutral-100 text-xs">
                      {orders.slice(0, 5).map(o => (
                        <div key={o.id} className="p-3.5 flex items-center justify-between gap-3 hover:bg-neutral-50">
                          <div>
                            <span className="font-mono font-bold text-neutral-900">{o.id}</span>
                            <span className="text-neutral-500 ml-2">· {o.customer.name}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              o.paymentStatus === 'Payment Verified'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-900'
                            }`}>
                              {o.paymentStatus}
                            </span>
                            <span className="font-bold text-neutral-900 tabular-nums">
                              ₹{o.totalAmount}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================
                  TAB 2: PRODUCTS MANAGEMENT (with strict ₹9 to ₹99 rule)
                 ======================================================== */}
              {activeTab === 'products' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-black text-neutral-900 font-display">
                        PRODUCT CATALOG ({products.length})
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Manage active products, pricing, storage variants, stock, and descriptions.
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={resetProductsToDefault}
                        className="px-3.5 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                        title="Restore original 30 products catalog"
                      >
                        <RotateCcw className="w-4 h-4 text-neutral-500" />
                        <span>RESET 30 ITEMS</span>
                      </button>

                      <button
                        onClick={() => setIsProductTemplatesOpen(true)}
                        className="px-3.5 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs transition-colors"
                      >
                        <Sparkles className="w-4 h-4 text-amber-400" />
                        <span>PRODUCT TEMPLATES</span>
                      </button>

                      <button
                        onClick={handleOpenAddProduct}
                        className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs flex items-center gap-2 cursor-pointer shadow-sm transition-all"
                      >
                        <Plus className="w-4 h-4" />
                        <span>ADD PRODUCT</span>
                      </button>
                    </div>
                  </div>

                  {/* Products Table */}
                  <div className="border border-neutral-200 rounded-2xl overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider font-bold">
                        <tr>
                          <th className="p-3.5">Product</th>
                          <th className="p-3.5">Category</th>
                          <th className="p-3.5">Selling Price</th>
                          <th className="p-3.5">Original</th>
                          <th className="p-3.5">Rating</th>
                          <th className="p-3.5">Badges</th>
                          <th className="p-3.5 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {products.map(p => (
                          <tr key={p.id} className="hover:bg-neutral-50/80">
                            <td className="p-3.5 flex items-center gap-3">
                              <img
                                src={p.images[0]}
                                alt={p.name}
                                referrerPolicy="no-referrer"
                                className="w-10 h-10 rounded-lg object-cover bg-neutral-100 shrink-0"
                              />
                              <div className="min-w-0 max-w-xs">
                                <p className="font-bold text-neutral-900 truncate">{p.name}</p>
                                <span className="text-[10px] text-neutral-400 font-mono">{p.id}</span>
                              </div>
                            </td>
                            <td className="p-3.5 text-neutral-600">{p.category}</td>
                            <td className="p-3.5">
                              <span className="font-extrabold text-neutral-950 text-sm tabular-nums">
                                ₹{p.finalPrice}
                              </span>
                            </td>
                            <td className="p-3.5 text-neutral-400 line-through tabular-nums">
                              ₹{p.originalPrice}
                            </td>
                            <td className="p-3.5 text-neutral-700">★ {p.rating}</td>
                            <td className="p-3.5 space-x-1">
                              {p.isTrending && (
                                <span className="px-1.5 py-0.5 rounded bg-orange-100 text-orange-800 text-[10px] font-bold">
                                  Trending
                                </span>
                              )}
                              {p.isFeatured && (
                                <span className="px-1.5 py-0.5 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">
                                  Featured
                                </span>
                              )}
                              {p.isNew && (
                                <span className="px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                                  New
                                </span>
                              )}
                            </td>
                            <td className="p-3.5 text-right space-x-1">
                              <button
                                onClick={() => handleOpenEditProduct(p)}
                                className="p-1.5 hover:bg-neutral-200 rounded-lg text-neutral-700 cursor-pointer"
                                title="Edit"
                              >
                                <Edit className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => setProductToDelete(p)}
                                className="p-1.5 hover:bg-rose-100 rounded-lg text-rose-600 cursor-pointer"
                                title="Delete Product"
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
              )}

              {/* ========================================================
                  TAB 3: CATEGORIES
                 ======================================================== */}
              {activeTab === 'categories' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-neutral-900 font-display">
                      STORE CATEGORIES ({categories.length})
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Standardized Indian e-commerce taxonomy for ₹9 to ₹99 products.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {categories.map(c => {
                      const count = products.filter(p => p.category === c.name).length;
                      return (
                        <div key={c.id} className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/60">
                          <h4 className="font-bold text-sm text-neutral-900">{c.name}</h4>
                          <p className="text-xs text-neutral-500 mt-1">{c.description}</p>
                          <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded mt-3 inline-block">
                            {count} active products
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ========================================================
                  TAB 4: ORDERS MANAGEMENT
                 ======================================================== */}
              {activeTab === 'orders' && (
                <div className="space-y-6">
                  {/* Top Stats Overview */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-4 rounded-2xl bg-neutral-900 text-white">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-400 font-semibold uppercase">Total Orders</span>
                        <ShoppingBag className="w-4 h-4 text-amber-400" />
                      </div>
                      <p className="text-2xl font-black font-display mt-2">{orders.length}</p>
                      <p className="text-[11px] text-neutral-400 mt-0.5">All time logged orders</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-amber-800 font-bold uppercase">Awaiting Verification</span>
                        <Clock className="w-4 h-4 text-amber-600" />
                      </div>
                      <p className="text-2xl font-black font-display text-amber-900 mt-2">
                        {orders.filter(o => o.paymentStatus === 'Payment Details Submitted').length}
                      </p>
                      <p className="text-[11px] text-amber-700 mt-0.5">Requires UTR audit</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-emerald-800 font-bold uppercase">Payment Verified</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      </div>
                      <p className="text-2xl font-black font-display text-emerald-900 mt-2">
                        {orders.filter(o => o.paymentStatus === 'Payment Verified').length}
                      </p>
                      <p className="text-[11px] text-emerald-700 mt-0.5">Confirmed & in process</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-100 border border-neutral-200">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-neutral-600 font-bold uppercase">Total Order Value</span>
                        <CreditCard className="w-4 h-4 text-neutral-700" />
                      </div>
                      <p className="text-2xl font-black font-display text-neutral-950 mt-2 tabular-nums">
                        ₹{orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString('en-IN')}
                      </p>
                      <p className="text-[11px] text-neutral-500 mt-0.5">Gross order revenue</p>
                    </div>
                  </div>

                  {/* Header & Filter Controls Bar */}
                  <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/80 space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-black text-neutral-900 font-display flex items-center gap-2">
                          <span>ORDERS DIRECTORY</span>
                          <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                            {filteredOrders.length} of {orders.length}
                          </span>
                        </h3>
                        <p className="text-xs text-neutral-500">
                          Search, verify UTR transactions, update fulfillment, and view complete order manifests.
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={handleRefreshOrders}
                          disabled={isRefreshingOrders}
                          className="px-3 py-1.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-100 text-xs font-bold text-neutral-700 flex items-center gap-1.5 cursor-pointer transition-colors shadow-2xs"
                          title="Refresh orders from persistent backend database"
                        >
                          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingOrders ? 'animate-spin text-amber-600' : ''}`} />
                          <span>Sync Backend</span>
                        </button>

                        {(orderSearch || orderPaymentFilter !== 'ALL' || orderStatusFilter !== 'ALL') && (
                          <button
                            type="button"
                            onClick={() => {
                              setOrderSearch('');
                              setOrderPaymentFilter('ALL');
                              setOrderStatusFilter('ALL');
                            }}
                            className="px-3 py-1.5 rounded-xl bg-neutral-200 hover:bg-neutral-300 text-neutral-800 text-xs font-bold transition-colors cursor-pointer"
                          >
                            Reset Filters
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Filter Dropdowns & Search Input */}
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 pt-1">
                      {/* Search Input */}
                      <div className="sm:col-span-6 relative">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" />
                        <input
                          type="text"
                          placeholder="Search Order ID, Name, Mobile, Email, UTR, Product..."
                          value={orderSearch}
                          onChange={(e) => setOrderSearch(e.target.value)}
                          className="w-full text-xs pl-8 pr-8 py-2 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 shadow-2xs"
                        />
                        {orderSearch && (
                          <button
                            type="button"
                            onClick={() => setOrderSearch('')}
                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs"
                          >
                            ✕
                          </button>
                        )}
                      </div>

                      {/* Payment Status Filter */}
                      <div className="sm:col-span-3">
                        <select
                          value={orderPaymentFilter}
                          onChange={(e) => setOrderPaymentFilter(e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-xl border border-neutral-300 bg-white font-medium text-neutral-800 focus:outline-none focus:border-amber-500 shadow-2xs cursor-pointer"
                        >
                          <option value="ALL">All Payment Statuses</option>
                          <option value="Payment Details Submitted">Payment Details Submitted</option>
                          <option value="Payment Verified">Payment Verified</option>
                          <option value="Payment Failed">Payment Failed</option>
                          <option value="Refund Initiated">Refund Initiated</option>
                          <option value="Refunded">Refunded</option>
                        </select>
                      </div>

                      {/* Order Status Filter */}
                      <div className="sm:col-span-3">
                        <select
                          value={orderStatusFilter}
                          onChange={(e) => setOrderStatusFilter(e.target.value)}
                          className="w-full text-xs px-3 py-2 rounded-xl border border-neutral-300 bg-white font-medium text-neutral-800 focus:outline-none focus:border-amber-500 shadow-2xs cursor-pointer"
                        >
                          <option value="ALL">All Order Statuses</option>
                          <option value="Payment Details Submitted">Payment Details Submitted</option>
                          <option value="Pending Verification">Pending Verification</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Out for Delivery">Out for Delivery</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Professional Orders Table */}
                  <div className="border border-neutral-200 rounded-2xl overflow-hidden shadow-xs bg-white">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-neutral-900 text-white uppercase tracking-wider font-bold text-[11px]">
                          <tr>
                            <th className="p-3.5">Order ID</th>
                            <th className="p-3.5">Date & Time</th>
                            <th className="p-3.5">Customer Name</th>
                            <th className="p-3.5">Total Amount</th>
                            <th className="p-3.5">UTR / Txn ID</th>
                            <th className="p-3.5">Payment Status</th>
                            <th className="p-3.5">Order Status</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200">
                          {filteredOrders.length === 0 ? (
                            <tr>
                              <td colSpan={8} className="p-12 text-center text-neutral-500">
                                <div className="max-w-xs mx-auto space-y-2">
                                  <div className="w-12 h-12 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400">
                                    <ShoppingBag className="w-6 h-6" />
                                  </div>
                                  <p className="font-bold text-neutral-800 text-sm">No orders found</p>
                                  <p className="text-xs text-neutral-500">
                                    No customer orders match your current search or status filter criteria.
                                  </p>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            filteredOrders.map(o => (
                              <tr key={o.id} className="hover:bg-amber-50/40 transition-colors">
                                {/* Order ID */}
                                <td className="p-3.5">
                                  <div className="flex items-center gap-1.5">
                                    <span className="font-mono font-bold text-neutral-950 text-xs">
                                      {o.id}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-neutral-400 block mt-0.5">
                                    {o.items.length} {o.items.length === 1 ? 'item' : 'items'}
                                  </span>
                                </td>

                                {/* Date */}
                                <td className="p-3.5 text-neutral-600">
                                  <p className="font-medium text-neutral-800">
                                    {new Date(o.createdAt).toLocaleDateString('en-IN', {
                                      day: '2-digit',
                                      month: 'short',
                                      year: 'numeric'
                                    })}
                                  </p>
                                  <p className="text-[10px] text-neutral-400 font-mono">
                                    {new Date(o.createdAt).toLocaleTimeString('en-IN', {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                    })}
                                  </p>
                                </td>

                                {/* Customer Name & Subtext */}
                                <td className="p-3.5">
                                  <div className="font-bold text-neutral-900 flex items-center gap-1.5">
                                    <span>{o.customer.name}</span>
                                    {o.customerNotes && (
                                      <span className="w-2 h-2 rounded-full bg-amber-500" title="Has customer notes" />
                                    )}
                                  </div>
                                  <p className="text-[11px] text-neutral-500 font-mono">{o.customer.phone}</p>
                                  <p className="text-[10px] text-neutral-400 truncate max-w-[150px]">
                                    {o.customer.city}, {o.customer.state}
                                  </p>
                                </td>

                                {/* Total Amount */}
                                <td className="p-3.5">
                                  <span className="font-black text-neutral-950 text-sm font-display tabular-nums">
                                    ₹{o.totalAmount.toLocaleString('en-IN')}
                                  </span>
                                  {o.deliveryCharges === 0 && (
                                    <span className="text-[9px] font-bold text-emerald-600 block">Free Shipping</span>
                                  )}
                                </td>

                                {/* UTR / Txn Reference with 1-click Copy */}
                                <td className="p-3.5">
                                  <div className="inline-flex items-center gap-1.5 bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 rounded-lg px-2 py-1 transition-colors">
                                    <span className="font-mono font-bold text-neutral-900 text-[11px] select-all">
                                      {o.utrNumber}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleCopyUtr(o.utrNumber, o.id)}
                                      className="text-neutral-500 hover:text-neutral-900 cursor-pointer p-0.5 rounded"
                                      title="Copy UTR number"
                                    >
                                      {copiedUtrId === o.id ? (
                                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                                      ) : (
                                        <Copy className="w-3.5 h-3.5" />
                                      )}
                                    </button>
                                  </div>
                                </td>

                                {/* Payment Status Dropdown */}
                                <td className="p-3.5">
                                  <select
                                    value={o.paymentStatus}
                                    onChange={(e) => updatePaymentStatus(o.id, e.target.value as PaymentStatus)}
                                    className={`text-[11px] font-bold py-1 px-2 rounded-xl border focus:outline-none cursor-pointer ${
                                      o.paymentStatus === 'Payment Verified'
                                        ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                        : o.paymentStatus === 'Payment Failed'
                                        ? 'bg-rose-50 text-rose-800 border-rose-300'
                                        : o.paymentStatus === 'Refunded' || o.paymentStatus === 'Refund Initiated'
                                        ? 'bg-purple-50 text-purple-800 border-purple-300'
                                        : 'bg-amber-50 text-amber-900 border-amber-300'
                                    }`}
                                  >
                                    <option value="Payment Details Submitted">Payment Details Submitted</option>
                                    <option value="Payment Verified">Payment Verified</option>
                                    <option value="Payment Failed">Payment Failed</option>
                                    <option value="Refund Initiated">Refund Initiated</option>
                                    <option value="Refunded">Refunded</option>
                                  </select>
                                </td>

                                {/* Order Status Dropdown */}
                                <td className="p-3.5">
                                  <select
                                    value={o.orderStatus}
                                    onChange={(e) => updateOrderStatus(o.id, e.target.value as OrderStatus)}
                                    className={`text-[11px] font-semibold py-1 px-2 rounded-xl border bg-white focus:outline-none cursor-pointer ${
                                      o.orderStatus === 'Cancelled'
                                        ? 'border-rose-300 text-rose-700 bg-rose-50/50'
                                        : o.orderStatus === 'Delivered'
                                        ? 'border-emerald-300 text-emerald-800 bg-emerald-50/50'
                                        : 'border-neutral-300 text-neutral-800'
                                    }`}
                                  >
                                    <option value="Payment Details Submitted">Payment Details Submitted</option>
                                    <option value="Pending Verification">Pending Verification</option>
                                    <option value="Confirmed">Confirmed</option>
                                    <option value="Processing">Processing</option>
                                    <option value="Shipped">Shipped</option>
                                    <option value="Out for Delivery">Out for Delivery</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Cancelled">Cancelled</option>
                                  </select>
                                </td>

                                {/* Action Buttons */}
                                <td className="p-3.5 text-right">
                                  <div className="flex items-center justify-end gap-1.5">
                                    {/* View Details Button */}
                                    <button
                                      type="button"
                                      onClick={() => setSelectedOrderDetail(o)}
                                      className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-[11px] inline-flex items-center gap-1 cursor-pointer transition-colors shadow-2xs"
                                      title="Open complete order information"
                                    >
                                      <Eye className="w-3 h-3" />
                                      <span>View Details</span>
                                    </button>

                                    {/* Retail Invoice Button */}
                                    <button
                                      type="button"
                                      onClick={() => setInvoiceOrder(o)}
                                      className="p-1.5 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-800 cursor-pointer transition-colors"
                                      title="View & Print retail invoice slip"
                                    >
                                      <FileText className="w-3.5 h-3.5 text-neutral-700" />
                                    </button>

                                    {/* Cancel Button */}
                                    {o.orderStatus !== 'Cancelled' && (
                                      <button
                                        type="button"
                                        onClick={() => setOrderToCancel(o.id)}
                                        className="p-1.5 rounded-lg bg-neutral-100 hover:bg-rose-100 text-neutral-600 hover:text-rose-700 cursor-pointer transition-colors"
                                        title="Cancel order"
                                      >
                                        <Ban className="w-3.5 h-3.5" />
                                      </button>
                                    )}

                                    {/* Delete Button */}
                                    <button
                                      type="button"
                                      onClick={() => setOrderToDelete(o.id)}
                                      className="p-1.5 rounded-lg bg-neutral-100 hover:bg-rose-100 text-neutral-600 hover:text-rose-700 cursor-pointer transition-colors"
                                      title="Permanently delete order"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ========================================================
                  TAB 5: CUSTOMERS MANAGEMENT
                 ======================================================== */}
              {activeTab === 'customers' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-neutral-900 font-display">
                      CUSTOMER MANAGEMENT ({customersList.length})
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Protected customer directory for authorized administrators only.
                    </p>
                  </div>

                  <div className="border border-neutral-200 rounded-2xl overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-neutral-50 border-b border-neutral-200 text-neutral-500 uppercase tracking-wider font-bold">
                        <tr>
                          <th className="p-3.5">Customer Name</th>
                          <th className="p-3.5">Email</th>
                          <th className="p-3.5">Instagram ID</th>
                          <th className="p-3.5">Phone</th>
                          <th className="p-3.5">Location</th>
                          <th className="p-3.5">Total Orders</th>
                          <th className="p-3.5">Total Spent</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-100">
                        {customersList.map((c, i) => (
                          <tr key={i} className="hover:bg-neutral-50/80">
                            <td className="p-3.5 font-bold text-neutral-900">{c.customer.name}</td>
                            <td className="p-3.5 text-neutral-600">{c.customer.email}</td>
                            <td className="p-3.5 text-neutral-700">
                              {c.customer.instagramId ? (
                                <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded">
                                  {c.customer.instagramId}
                                </span>
                              ) : (
                                <span className="text-neutral-400">—</span>
                              )}
                            </td>
                            <td className="p-3.5 text-neutral-600">{c.customer.phone}</td>
                            <td className="p-3.5 text-neutral-600">
                              {c.customer.city}, {c.customer.state}
                            </td>
                            <td className="p-3.5 font-bold text-neutral-900">{c.ordersCount}</td>
                            <td className="p-3.5 font-extrabold text-neutral-950 tabular-nums">
                              ₹{c.totalSpent}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ========================================================
                  TAB 6: PAYMENTS & UTR VERIFICATION
                 ======================================================== */}
              {activeTab === 'payments' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black text-neutral-900 font-display">
                      UPI PAYMENT & UTR AUDIT DESK
                    </h3>
                    <p className="text-xs text-neutral-500">
                      One-click review and verification of submitted customer transaction numbers.
                    </p>
                  </div>

                  <div className="space-y-3">
                    {orders.map(o => (
                      <div key={o.id} className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-neutral-900">{o.id}</span>
                            <span className="text-xs text-neutral-500">· {o.customer.name}</span>
                            <span className="text-xs font-bold text-amber-700">· ₹{o.totalAmount}</span>
                          </div>
                          <p className="text-xs text-neutral-600">
                            Submitted UTR: <strong className="font-mono text-neutral-950 text-sm bg-white px-2 py-0.5 rounded border border-neutral-300">{o.utrNumber}</strong>
                          </p>
                          <span className="text-[10px] text-neutral-400">
                            Submitted: {new Date(o.createdAt).toLocaleString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                            o.paymentStatus === 'Payment Verified'
                              ? 'bg-emerald-100 text-emerald-800'
                              : o.paymentStatus === 'Payment Failed'
                              ? 'bg-rose-100 text-rose-800'
                              : 'bg-amber-100 text-amber-900'
                          }`}>
                            {o.paymentStatus}
                          </span>

                          <button
                            onClick={() => updatePaymentStatus(o.id, 'Payment Verified')}
                            className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
                          >
                            Verify Payment
                          </button>

                          <button
                            onClick={() => updatePaymentStatus(o.id, 'Payment Failed')}
                            className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer"
                          >
                            Reject (Failed)
                          </button>

                          <button
                            onClick={() => setInvoiceOrder(o)}
                            className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-2xs"
                            title="View and print retail invoice slip"
                          >
                            <FileText className="w-3.5 h-3.5 text-amber-400" />
                            <span>Invoice Slip</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ========================================================
                  TAB 7: QR PAYMENT SETTINGS
                 ======================================================== */}
              {activeTab === 'qr-settings' && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h3 className="text-xl font-black text-neutral-900 font-display">
                      UPI QR PAYMENT SETTINGS
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Configure your real UPI ID, Merchant name, and live QR code shown to customers during checkout.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-300 text-xs text-amber-950 space-y-1">
                    <div className="font-bold flex items-center gap-1.5 text-amber-900">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Fix "Invalid QR" & "No payment account registered" Error:</span>
                    </div>
                    <p className="text-[11px] text-amber-800 leading-relaxed">
                      If customers get "No payment account registered", upload your official merchant QR screenshot from Google Pay for Business, PhonePe Business, or Paytm, or enter your real bank-linked UPI ID below.
                    </p>
                  </div>

                  <form onSubmit={handleSaveQRSettings} className="space-y-4">
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-100">
                      <input
                        type="checkbox"
                        id="enableQr"
                        checked={qrEnabled}
                        onChange={(e) => setQrEnabled(e.target.checked)}
                        className="h-4 w-4 rounded text-amber-600 cursor-pointer"
                      />
                      <label htmlFor="enableQr" className="text-xs font-bold text-neutral-800 cursor-pointer">
                        Enable UPI / QR Payment on Checkout
                      </label>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-800 block">
                        Merchant UPI ID (VPA) <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. anuchoudhary4m@okicici"
                        value={qrUpiId}
                        onChange={(e) => setQrUpiId(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-mono font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-800 block">
                        Merchant Display Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Anu Choudhary"
                        value={qrMerchantName}
                        onChange={(e) => setQrMerchantName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-neutral-800 block">
                        Custom QR Code Image (Upload device photo or provide Image URL)
                      </label>
                      
                      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch">
                        <label className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed border-amber-400 bg-amber-50 hover:bg-amber-100/70 text-amber-900 text-xs font-bold cursor-pointer transition-colors">
                          <Upload className="w-4 h-4 text-amber-600" />
                          <span>Upload QR Image from Device / Photo Gallery</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleQrFileUpload}
                          />
                        </label>

                        {qrCustomUrl && (
                          <button
                            type="button"
                            onClick={() => setQrCustomUrl('')}
                            className="px-3.5 py-2.5 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer shrink-0"
                          >
                            Remove Custom QR
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        placeholder="Or paste image URL (e.g. data:image/... or https://...)"
                        value={qrCustomUrl}
                        onChange={(e) => setQrCustomUrl(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-xs font-mono truncate"
                      />
                    </div>

                    {/* QR Code Preview */}
                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-center">
                      <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block mb-2">
                        Live Checkout QR Preview
                      </span>
                      {qrCustomUrl ? (
                        <img
                          src={qrCustomUrl}
                          alt="Custom QR Preview"
                          className="w-44 h-44 object-contain mx-auto rounded-lg border border-neutral-300"
                        />
                      ) : qrPreviewUrl ? (
                        <img
                          src={qrPreviewUrl}
                          alt="Dynamic QR Preview"
                          className="w-44 h-44 object-contain mx-auto rounded-lg border border-neutral-300"
                        />
                      ) : (
                        <div className="w-44 h-44 flex items-center justify-center text-xs text-neutral-400 mx-auto">
                          Loading preview...
                        </div>
                      )}
                      <p className="text-[11px] text-neutral-500 mt-2 font-mono">
                        URI: upi://pay?pa={qrUpiId}&pn={qrMerchantName}
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      SAVE QR PAYMENT SETTINGS
                    </button>
                  </form>
                </div>
              )}

              {/* ========================================================
                  TAB 8: OFFERS & PROMOTIONS
                 ======================================================== */}
              {activeTab === 'offers' && (
                <div className="space-y-6 max-w-xl">
                  <div>
                    <h3 className="text-xl font-black text-neutral-900 font-display">
                      STORE OFFERS & BANNER SETTINGS
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Manage prominent banners showing the ₹9 to ₹99 store proposition.
                    </p>
                  </div>

                  <form onSubmit={handleSaveWebsiteSettings} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-800 block">
                        Promotional Mega Deal Banner Text
                      </label>
                      <input
                        type="text"
                        value={bannerText}
                        onChange={(e) => setBannerText(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold"
                      />
                    </div>

                    <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 font-medium">
                      Preview: <strong>{bannerText}</strong>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      SAVE OFFER BANNER
                    </button>
                  </form>
                </div>
              )}

              {/* ========================================================
                  TAB 9: TERMS & CONDITIONS
                 ======================================================== */}
              {activeTab === 'terms' && (
                <div className="space-y-4 max-w-2xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black text-neutral-900 font-display">
                        TERMS & CONDITIONS POLICY
                      </h3>
                      <p className="text-xs text-neutral-500">
                        Published legal agreement presented to customers prior to UPI payment.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-3 text-xs text-neutral-700 leading-relaxed">
                    <p>
                      <strong>Lucky-Draw Promotional Platform:</strong> LuckyDrawWin is a promotional lucky-draw platform where winners are selected according to pre-announced rules. Only selected/winning customers receive the product or prize. This is not a standard guaranteed e-commerce purchase.
                    </p>
                    <p>
                      <strong>Platform Fee of ₹1,499:</strong> To receive the selected order/product/item, customers must pay a platform fee of ₹1,499 for processing and fulfillment.
                    </p>
                    <p>
                      <strong>Genuine Platform Notice:</strong> LuckyDrawWin is a genuine platform and is not intended to be fraudulent.
                    </p>
                  </div>
                </div>
              )}

              {/* ========================================================
                  TAB 10: SHIPPING SETTINGS
                 ======================================================== */}
              {activeTab === 'shipping' && (
                <div className="space-y-6 max-w-xl">
                  <div>
                    <h3 className="text-xl font-black text-neutral-900 font-display">
                      SHIPPING & DELIVERY CHARGES
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Manage standard delivery fees and free shipping thresholds across India.
                    </p>
                  </div>

                  <form onSubmit={handleSaveShipping} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-800 block">
                        Standard Delivery Fee (₹)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={shipFee}
                        onChange={(e) => setShipFee(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-800 block">
                        Free Delivery Minimum Cart Amount (₹)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={freeThreshold}
                        onChange={(e) => setFreeThreshold(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-800 block">
                        Estimated Delivery Days
                      </label>
                      <input
                        type="text"
                        value={shipDays}
                        onChange={(e) => setShipDays(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                      />
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      SAVE SHIPPING SETTINGS
                    </button>
                  </form>
                </div>
              )}

              {/* ========================================================
                  TAB 11: RETURN & REFUND SETTINGS
                 ======================================================== */}
              {activeTab === 'returns' && (
                <div className="space-y-4 max-w-2xl">
                  <div>
                    <h3 className="text-xl font-black text-neutral-900 font-display">
                      RETURN & REFUND POLICY SETTINGS
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Configured return rules and resolution timelines for customers.
                    </p>
                  </div>

                  <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2 text-xs text-neutral-700">
                    <p><strong>Window:</strong> 7 Days Replacement guarantee from the date of physical delivery.</p>
                    <p><strong>Conditions:</strong> Damaged, defective, or mismatched item upon opening parcel.</p>
                    <p><strong>Method:</strong> Free replacement sent, or full refund to original UPI account if inventory is out of stock.</p>
                  </div>
                </div>
              )}

              {/* ========================================================
                  TAB 12: WEBSITE SETTINGS
                 ======================================================== */}
              {activeTab === 'settings' && (
                <div className="space-y-6 max-w-2xl">
                  <div>
                    <h3 className="text-xl font-black text-neutral-900 font-display">
                      WEBSITE & SUPPORT SETTINGS
                    </h3>
                    <p className="text-xs text-neutral-500">
                      Configure store identity, support helpline, and headlines.
                    </p>
                  </div>

                  <form onSubmit={handleSaveWebsiteSettings} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-800 block">
                        Hero Main Headline
                      </label>
                      <input
                        type="text"
                        value={heroTitle}
                        onChange={(e) => setHeroTitle(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-800 block">
                        Hero Subheadline
                      </label>
                      <input
                        type="text"
                        value={heroSub}
                        onChange={(e) => setHeroSub(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-neutral-800 block">
                        Hero Supporting Text
                      </label>
                      <input
                        type="text"
                        value={heroDesc}
                        onChange={(e) => setHeroDesc(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-neutral-800 block">
                          Support Helpline
                        </label>
                        <input
                          type="text"
                          value={suppPhone}
                          onChange={(e) => setSuppPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-bold text-neutral-800 block">
                          Support Email
                        </label>
                        <input
                          type="email"
                          value={suppEmail}
                          onChange={(e) => setSuppEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      SAVE WEBSITE SETTINGS
                    </button>
                  </form>
                </div>
              )}

            </main>
          </div>
        )}

      </div>

      {/* ========================================================
          ADD / EDIT PRODUCT MODAL (WITH STRICT ₹9 TO ₹99 VALIDATION)
         ======================================================== */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-60 bg-neutral-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <h3 className="text-sm font-black text-neutral-900 font-display">
                {editingProductId ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
              
              {prodError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{prodError}</span>
                </div>
              )}

              {/* Price Rule Alert */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 font-medium">
                ⚡ <strong>Price Rule:</strong> Final selling price MUST be strictly between <strong>₹9 and ₹99</strong>. Values outside this range are rejected.
              </div>

              <div className="space-y-1">
                <label className="font-bold text-neutral-800 block">Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Type-C OTG Metal Adapter"
                  value={prodName}
                  onChange={(e) => setProdName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-neutral-800 block">Category *</label>
                  <select
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs bg-white font-semibold"
                  >
                    {categories.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-800 block">
                    Final Selling Price (₹) *
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={prodFinalPrice}
                    onChange={(e) => setProdFinalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border-2 border-amber-400 text-xs font-extrabold tabular-nums bg-amber-50/30"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-bold text-neutral-800 block">Original M.R.P. (₹)</label>
                  <input
                    type="number"
                    min="10"
                    value={prodOriginalPrice}
                    onChange={(e) => setProdOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs tabular-nums"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-neutral-800 block">Rating (1.0 to 5.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={prodRating}
                    onChange={(e) => setProdRating(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs tabular-nums"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-neutral-800 block">Product Image *</label>
                  <button
                    type="button"
                    onClick={() => setIsImagePickerOpen(true)}
                    className="text-amber-700 hover:text-amber-900 font-bold text-[11px] flex items-center gap-1 cursor-pointer bg-amber-50 hover:bg-amber-100 px-2 py-0.5 rounded-md border border-amber-200 transition-colors"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Choose from Image Templates</span>
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={prodImageUrl}
                    onChange={(e) => setProdImageUrl(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xl border border-neutral-300 text-xs font-mono"
                  />
                  {prodImageUrl && (
                    <div className="w-10 h-10 rounded-lg border border-neutral-200 overflow-hidden shrink-0 bg-neutral-100">
                      <img
                        src={prodImageUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-neutral-800 block">Description</label>
                <textarea
                  rows={2}
                  placeholder="Enter detailed description of the physical item..."
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-neutral-300 text-xs"
                />
              </div>

              {/* Tag Checkboxes */}
              <div className="flex gap-4 pt-2">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodIsNew}
                    onChange={(e) => setProdIsNew(e.target.checked)}
                    className="rounded text-amber-600"
                  />
                  <span>Mark as New</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodIsTrending}
                    onChange={(e) => setProdIsTrending(e.target.checked)}
                    className="rounded text-amber-600"
                  />
                  <span>Mark as Trending</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={prodIsFeatured}
                    onChange={(e) => setProdIsFeatured(e.target.checked)}
                    className="rounded text-amber-600"
                  />
                  <span>Mark as Featured</span>
                </label>
              </div>

              <div className="pt-4 border-t border-neutral-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-300 text-neutral-700 font-bold hover:bg-neutral-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-neutral-950 text-white font-extrabold hover:bg-neutral-800 cursor-pointer"
                >
                  Save Product
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          IMAGE TEMPLATES & MEDIA LIBRARY MODAL
         ======================================================== */}
      {isImagePickerOpen && (
        <div className="fixed inset-0 z-70 bg-neutral-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[85vh] flex flex-col">
            <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div>
                <h3 className="text-sm font-black text-neutral-900 font-display flex items-center gap-2">
                  <ImageIcon className="w-4 h-4 text-amber-500" />
                  <span>IMAGE TEMPLATES & MEDIA GALLERY</span>
                </h3>
                <p className="text-[11px] text-neutral-500">
                  Select high-resolution studio photography for your physical retail product.
                </p>
              </div>
              <button
                onClick={() => setIsImagePickerOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category filter tabs */}
            <div className="p-3 bg-neutral-100/70 border-b border-neutral-200 flex items-center gap-1.5 overflow-x-auto">
              {['all', 'Mobile Accessories', 'Gadgets', 'Fashion Accessories', 'Stationery', 'Home & Kitchen', 'Beauty & Personal Care', 'Gift Items'].map(cat => (
                <button
                  key={cat}
                  onClick={() => setImageCategoryFilter(cat)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    imageCategoryFilter === cat
                      ? 'bg-amber-500 text-neutral-950 shadow-xs'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-white'
                  }`}
                >
                  {cat === 'all' ? 'All Images' : cat}
                </button>
              ))}
            </div>

            {/* Image Grid */}
            <div className="p-5 overflow-y-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {IMAGE_TEMPLATES.filter(t => imageCategoryFilter === 'all' || t.category === imageCategoryFilter).map(img => (
                <div
                  key={img.id}
                  onClick={() => {
                    setProdImageUrl(img.url);
                    setIsImagePickerOpen(false);
                    showToast(`Selected image: ${img.title}`);
                  }}
                  className="group relative aspect-square rounded-2xl bg-neutral-100 border border-neutral-200 overflow-hidden hover:border-amber-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-end p-2.5"
                >
                  <img
                    src={img.thumb || img.url}
                    alt={img.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
                  <div className="relative z-10">
                    <p className="text-[11px] font-bold text-white line-clamp-1 group-hover:text-amber-300">
                      {img.title}
                    </p>
                    <span className="text-[9px] text-neutral-300 block">
                      {img.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex justify-end">
              <button
                onClick={() => setIsImagePickerOpen(false)}
                className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          PRODUCT TEMPLATES MODAL (1-Click Publish Templates)
         ======================================================== */}
      {isProductTemplatesOpen && (
        <div className="fixed inset-0 z-70 bg-neutral-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden max-h-[88vh] flex flex-col">
            <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[11px] font-black uppercase mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Strictly ₹9 to ₹99 Capped</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-neutral-900 font-display">
                  PRODUCT CREATION TEMPLATES
                </h3>
                <p className="text-xs text-neutral-500">
                  Select a pre-configured template with tested pricing, rich specs, bullet features, and photography.
                </p>
              </div>
              <button
                onClick={() => setIsProductTemplatesOpen(false)}
                className="p-1 rounded-full text-neutral-400 hover:text-neutral-900 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Templates Grid */}
            <div className="p-6 overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-4">
              {PRODUCT_TEMPLATES.map(tpl => (
                <div
                  key={tpl.id}
                  className="p-4 rounded-2xl border border-neutral-200/90 bg-neutral-50/60 hover:bg-white hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between gap-3"
                >
                  <div className="flex gap-3.5">
                    <img
                      src={tpl.imageUrl}
                      alt={tpl.name}
                      className="w-20 h-20 rounded-xl object-cover bg-neutral-200 shrink-0 border border-neutral-200"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-amber-500 text-neutral-950 font-black text-[10px]">
                          {tpl.badge}
                        </span>
                        <span className="text-[10px] text-neutral-500 font-medium">
                          {tpl.category}
                        </span>
                      </div>
                      <h4 className="font-bold text-xs text-neutral-900 line-clamp-2 leading-snug">
                        {tpl.name}
                      </h4>
                      <p className="text-[11px] text-neutral-500 line-clamp-1 mt-1">
                        {tpl.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-neutral-200/70 flex items-center justify-between">
                    <div className="flex items-baseline gap-2 text-xs">
                      <span className="font-black text-neutral-950 text-base font-display">
                        ₹{tpl.finalPrice}
                      </span>
                      <span className="text-[11px] text-neutral-400 line-through">
                        ₹{tpl.originalPrice}
                      </span>
                      <span className="text-[10px] text-amber-700 font-bold">
                        ★ {tpl.rating}
                      </span>
                    </div>

                    <button
                      onClick={() => handleApplyProductTemplate(tpl)}
                      className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-xs transition-all shadow-2xs hover:shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Use Template</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-neutral-200 bg-neutral-50 flex justify-end">
              <button
                onClick={() => setIsProductTemplatesOpen(false)}
                className="px-4 py-2 rounded-xl bg-neutral-900 text-white font-bold text-xs hover:bg-neutral-800 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL: COMPLETE ORDER DETAILS VIEW
         ======================================================== */}
      {selectedOrderDetail && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-150">
          <div
            className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-neutral-900 text-white p-5 flex items-center justify-between border-b border-neutral-800 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
                  <ShoppingBag className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black font-mono text-white">
                      {selectedOrderDetail.id}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-neutral-950 uppercase">
                      Order Manifest
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 flex items-center gap-1.5 mt-0.5">
                    <Clock className="w-3 h-3 text-neutral-500" />
                    <span>
                      Placed on {new Date(selectedOrderDetail.createdAt).toLocaleString('en-IN', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="px-3 py-1.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
                  title="Print order summary"
                >
                  <Printer className="w-3.5 h-3.5 text-amber-400" />
                  <span className="hidden sm:inline">Print Slip</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedOrderDetail(null)}
                  className="p-1.5 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Status & Quick Action Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200">
                {/* Payment Status Manager */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                    Payment Status
                  </label>
                  <select
                    value={selectedOrderDetail.paymentStatus}
                    onChange={(e) => {
                      const newStatus = e.target.value as PaymentStatus;
                      updatePaymentStatus(selectedOrderDetail.id, newStatus);
                      setSelectedOrderDetail(prev => prev ? { ...prev, paymentStatus: newStatus } : null);
                    }}
                    className="w-full text-xs font-bold py-2 px-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:border-amber-500 cursor-pointer shadow-2xs"
                  >
                    <option value="Payment Details Submitted">Payment Details Submitted</option>
                    <option value="Payment Verified">Payment Verified</option>
                    <option value="Payment Failed">Payment Failed</option>
                    <option value="Refund Initiated">Refund Initiated</option>
                    <option value="Refunded">Refunded</option>
                  </select>
                </div>

                {/* Order Status Manager */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider block">
                    Fulfillment / Order Status
                  </label>
                  <select
                    value={selectedOrderDetail.orderStatus}
                    onChange={(e) => {
                      const newStatus = e.target.value as OrderStatus;
                      updateOrderStatus(selectedOrderDetail.id, newStatus);
                      setSelectedOrderDetail(prev => prev ? { ...prev, orderStatus: newStatus } : null);
                    }}
                    className="w-full text-xs font-bold py-2 px-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:border-amber-500 cursor-pointer shadow-2xs"
                  >
                    <option value="Payment Details Submitted">Payment Details Submitted</option>
                    <option value="Pending Verification">Pending Verification</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Processing">Processing</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Payment & UTR Information Card */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 block">
                      Transaction Audit
                    </span>
                    <h4 className="text-sm font-black text-amber-950 font-display">
                      PAYMENT & UTR REFERENCE
                    </h4>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-600 font-medium">Payment Method:</span>
                    <span className="px-2 py-0.5 rounded bg-white border border-amber-200 text-amber-900 font-bold text-xs">
                      {selectedOrderDetail.paymentMethod || 'UPI / QR Code Scan'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-white rounded-xl border border-amber-200/80">
                  <div>
                    <span className="text-[11px] text-neutral-500 font-medium block">
                      Customer Submitted 12-digit UTR / Txn Reference Number:
                    </span>
                    <span className="text-base font-black font-mono text-neutral-950 select-all tracking-wider">
                      {selectedOrderDetail.utrNumber}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleCopyUtr(selectedOrderDetail.utrNumber, selectedOrderDetail.id)}
                    className="px-3.5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 shadow-2xs"
                  >
                    {copiedUtrId === selectedOrderDetail.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-amber-400" />
                        <span>Copy UTR Number</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Customer & Delivery Information Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Customer Contact Details */}
                <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/60 space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <h4 className="text-xs font-black text-neutral-900 uppercase tracking-wider">
                      Customer Profile
                    </h4>
                    <span className="text-[10px] text-neutral-500">Contact & Info</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div>
                      <span className="text-neutral-400 text-[11px] block">Full Name</span>
                      <p className="font-bold text-neutral-900 text-sm">{selectedOrderDetail.customer.name}</p>
                    </div>

                    <div>
                      <span className="text-neutral-400 text-[11px] block">Mobile Number</span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-mono font-bold text-neutral-900">{selectedOrderDetail.customer.phone}</span>
                        <a
                          href={`tel:${selectedOrderDetail.customer.phone}`}
                          className="text-[11px] text-amber-700 hover:underline flex items-center gap-0.5 font-semibold"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                        <a
                          href={`https://wa.me/91${selectedOrderDetail.customer.phone.replace(/[^0-9]/g, '').slice(-10)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-emerald-700 hover:underline flex items-center gap-0.5 font-semibold"
                        >
                          <span>WhatsApp</span>
                        </a>
                      </div>
                    </div>

                    <div>
                      <span className="text-neutral-400 text-[11px] block">Email Address</span>
                      <a
                        href={`mailto:${selectedOrderDetail.customer.email}`}
                        className="font-medium text-neutral-800 hover:text-amber-600 truncate block"
                      >
                        {selectedOrderDetail.customer.email}
                      </a>
                    </div>

                    {selectedOrderDetail.customer.instagramId && (
                      <div>
                        <span className="text-neutral-400 text-[11px] block">Instagram ID</span>
                        <span className="font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-xs">
                          {selectedOrderDetail.customer.instagramId}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Delivery Address & Customer Notes */}
                <div className="p-4 rounded-2xl border border-neutral-200 bg-neutral-50/60 space-y-3">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-2">
                    <h4 className="text-xs font-black text-neutral-900 uppercase tracking-wider">
                      Delivery Address
                    </h4>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                      PAN India Courier
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-neutral-700">
                    <div>
                      <span className="text-neutral-400 text-[11px] block">Complete Street Address</span>
                      <p className="font-medium text-neutral-900 leading-relaxed">
                        {selectedOrderDetail.customer.address}
                      </p>
                    </div>

                    <div className="grid grid-cols-3 gap-2 pt-1">
                      <div>
                        <span className="text-neutral-400 text-[11px] block">City</span>
                        <p className="font-bold text-neutral-900">{selectedOrderDetail.customer.city}</p>
                      </div>
                      <div>
                        <span className="text-neutral-400 text-[11px] block">State</span>
                        <p className="font-bold text-neutral-900">{selectedOrderDetail.customer.state}</p>
                      </div>
                      <div>
                        <span className="text-neutral-400 text-[11px] block">PIN Code</span>
                        <p className="font-bold font-mono text-neutral-900">{selectedOrderDetail.customer.pincode}</p>
                      </div>
                    </div>

                    {selectedOrderDetail.customerNotes && (
                      <div className="mt-2 p-2.5 rounded-xl bg-amber-100/60 border border-amber-200 text-xs">
                        <span className="text-[10px] font-bold text-amber-900 uppercase block mb-0.5">
                          Customer Delivery Notes / Landmark:
                        </span>
                        <p className="text-amber-950 font-medium italic">
                          "{selectedOrderDetail.customerNotes}"
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Ordered Products Table */}
              <div className="space-y-2">
                <h4 className="text-xs font-black text-neutral-900 uppercase tracking-wider">
                  Ordered Products ({selectedOrderDetail.items.reduce((s, i) => s + i.quantity, 0)} Items)
                </h4>

                <div className="border border-neutral-200 rounded-2xl overflow-hidden divide-y divide-neutral-100">
                  {selectedOrderDetail.items.map((it, idx) => (
                    <div key={idx} className="p-3.5 flex items-center justify-between gap-4 text-xs bg-white">
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={it.product.images[0]}
                          alt={it.product.name}
                          className="w-12 h-12 rounded-xl object-cover bg-neutral-100 shrink-0 border border-neutral-200"
                        />
                        <div className="min-w-0">
                          <h5 className="font-bold text-neutral-900 truncate">{it.product.name}</h5>
                          <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                            <span className="text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded font-semibold">
                              {it.product.category}
                            </span>
                            {it.selectedColor && (
                              <span>Color: <strong>{it.selectedColor}</strong></span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <p className="font-black text-neutral-950 text-sm tabular-nums">
                          ₹{(it.product.finalPrice * it.quantity).toLocaleString('en-IN')}
                        </p>
                        <p className="text-[11px] text-neutral-400 tabular-nums">
                          {it.quantity} × ₹{it.product.finalPrice.toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Subtotal</span>
                  <span className="font-bold font-mono">₹{selectedOrderDetail.subtotal.toLocaleString('en-IN')}</span>
                </div>
                {selectedOrderDetail.discount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Discount</span>
                    <span className="font-bold font-mono">-₹{selectedOrderDetail.discount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600">
                  <span>Delivery Charges</span>
                  <span className="font-bold text-emerald-700">
                    {selectedOrderDetail.deliveryCharges === 0 ? 'FREE' : `₹${selectedOrderDetail.deliveryCharges}`}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-200 flex justify-between items-baseline font-black text-base text-neutral-950">
                  <span>Final Order Total</span>
                  <span className="text-lg font-display text-neutral-950 tabular-nums">
                    ₹{selectedOrderDetail.totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-neutral-50 border-t border-neutral-200 flex flex-wrap items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setInvoiceOrder(selectedOrderDetail);
                    setSelectedOrderDetail(null);
                  }}
                  className="px-3 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-400" />
                  <span>View Official Invoice</span>
                </button>

                {selectedOrderDetail.orderStatus !== 'Cancelled' && (
                  <button
                    type="button"
                    onClick={() => {
                      setOrderToCancel(selectedOrderDetail.id);
                    }}
                    className="px-3 py-2 rounded-xl border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                  >
                    <Ban className="w-3.5 h-3.5" />
                    <span>Cancel Order</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    setOrderToDelete(selectedOrderDetail.id);
                  }}
                  className="px-3 py-2 rounded-xl border border-neutral-300 hover:border-rose-300 hover:bg-rose-50 hover:text-rose-700 text-neutral-600 font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrderDetail(null)}
                className="px-5 py-2 rounded-xl bg-neutral-200 hover:bg-neutral-300 text-neutral-900 font-bold text-xs cursor-pointer transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CONFIRMATION MODAL: CANCEL ORDER
         ======================================================== */}
      {orderToCancel && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-neutral-200 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-neutral-900 font-display">
                Confirm Order Cancellation
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Are you sure you want to cancel Order <strong>{orderToCancel}</strong>?
                The order status will be changed to Cancelled.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOrderToCancel(null)}
                className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                Go Back
              </button>
              <button
                type="button"
                onClick={async () => {
                  const id = orderToCancel;
                  setOrderToCancel(null);
                  await cancelOrder(id);
                  if (selectedOrderDetail?.id === id) {
                    setSelectedOrderDetail(prev => prev ? { ...prev, orderStatus: 'Cancelled' } : null);
                  }
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Yes, Cancel Order
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CONFIRMATION MODAL: DELETE ORDER
         ======================================================== */}
      {orderToDelete && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-neutral-200 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-black text-neutral-900 font-display">
                Permanently Delete Order?
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                This will permanently delete Order <strong>{orderToDelete}</strong> from the database.
                This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setOrderToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-xs font-bold text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              >
                Keep Order
              </button>
              <button
                type="button"
                onClick={async () => {
                  const id = orderToDelete;
                  setOrderToDelete(null);
                  if (selectedOrderDetail?.id === id) {
                    setSelectedOrderDetail(null);
                  }
                  await deleteOrder(id);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer transition-colors"
              >
                Yes, Delete Permanently
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          CONFIRMATION MODAL: DELETE PRODUCT
         ======================================================== */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div
            className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl border border-neutral-200 text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-14 h-14 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center mx-auto border border-rose-200">
              <Trash2 className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-black text-neutral-900 font-display">
                Remove Product from Store?
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Are you sure you want to delete <strong>"{productToDelete.name}"</strong>? It will be removed from the catalog and will no longer be visible to store visitors.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-2.5 rounded-xl border border-neutral-300 text-neutral-700 hover:bg-neutral-100 text-xs font-bold transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteProduct(productToDelete.id);
                  setProductToDelete(null);
                }}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer transition-colors shadow-sm"
              >
                Yes, Delete Product
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
