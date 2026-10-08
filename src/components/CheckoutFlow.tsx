import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  ExternalLink, 
  AlertCircle,
  QrCode,
  Sparkles,
  Smartphone,
  Maximize2,
  Download,
  Upload,
  RotateCcw,
  Copy,
  CheckCheck
} from 'lucide-react';
import QRCode from 'qrcode';
import { generateValidQRCode, buildStandardUpiUri } from '../utils/qrGenerator';
import { useStore } from '../context/StoreContext';
import { CartItem } from '../types';

export const CheckoutFlow: React.FC = () => {
  const { 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cart, 
    checkoutDirectItem, 
    products, 
    shippingSettings, 
    qrSettings, 
    updateQRSettings,
    createOrder,
    setIsTermsOpen,
    showToast
  } = useStore();

  // Active step: 1 = SELECT PRODUCT, 2 = CUSTOMER DETAILS, 3 = PAYMENT
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Active items for this checkout session
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);

  // Customer Form State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagramId, setInstagramId] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('Maharashtra');
  const [pincode, setPincode] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Step 3 Payment State
  const [utrNumber, setUtrNumber] = useState('');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const [upiPaymentUri, setUpiPaymentUri] = useState<string>('');
  const [isQrZoomed, setIsQrZoomed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);
  const [qrAmountMode, setQrAmountMode] = useState<'with_amount' | 'open'>('with_amount');

  // Copy helpers
  const handleCopyUpi = () => {
    const id = qrSettings.upiId?.trim() || 'anuchoudhary4m@okicici';
    navigator.clipboard.writeText(id);
    setCopiedUpi(true);
    showToast(`Copied UPI ID: ${id}`);
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleCopyAmount = () => {
    navigator.clipboard.writeText(totalPayable.toString());
    setCopiedAmount(true);
    showToast(`Copied Amount: ₹${totalPayable}`);
    setTimeout(() => setCopiedAmount(false), 2500);
  };

  // Initialize items when modal opens
  useEffect(() => {
    if (isCheckoutOpen) {
      if (checkoutDirectItem) {
        setCheckoutItems([checkoutDirectItem]);
      } else if (cart.length > 0) {
        setCheckoutItems([...cart]);
      } else if (products.length > 0) {
        // Fallback default: select first product if cart was empty
        setCheckoutItems([{ product: products[0], quantity: 1 }]);
      }
      setCurrentStep(1);
      setErrorMessage(null);
    }
  }, [isCheckoutOpen, checkoutDirectItem, cart, products]);

  // Calculations
  const subtotal = checkoutItems.reduce(
    (sum, item) => sum + item.product.finalPrice * item.quantity,
    0
  );

  const deliveryFee =
    shippingSettings.standardDeliveryFee === 0 ||
    subtotal >= shippingSettings.freeShippingThreshold ||
    subtotal === 0
      ? 0
      : shippingSettings.standardDeliveryFee;

  const totalPayable = subtotal + deliveryFee;

  // Generate 100% valid, standard NPCI compliant UPI QR Code
  useEffect(() => {
    if (currentStep === 3) {
      const activeUpiId = qrSettings.upiId?.trim() || 'anuchoudhary4m@okicici';
      const merchant = qrSettings.merchantName?.trim() || 'Anu Choudhary';
      const amountToUse = qrAmountMode === 'with_amount' ? totalPayable : undefined;
      const upiUri = buildStandardUpiUri(activeUpiId, merchant, amountToUse);
      
      setUpiPaymentUri(upiUri);

      // Clean, un-corrupted QR generation for 100% scanning success
      generateValidQRCode(upiUri, 420)
        .then((url: string) => {
          setQrDataUrl(url);
        })
        .catch((err: Error) => {
          console.error('QR generation error:', err);
        });
    }
  }, [currentStep, qrSettings, totalPayable, qrAmountMode]);

  if (!isCheckoutOpen) return null;

  // Step 1: Change quantity of checkout item
  const handleUpdateQuantity = (productId: string, newQty: number) => {
    if (newQty <= 0) {
      // Remove item
      const updated = checkoutItems.filter(i => i.product.id !== productId);
      if (updated.length === 0) {
        setErrorMessage('At least one product must be selected to proceed.');
      }
      setCheckoutItems(updated);
      return;
    }
    setCheckoutItems(prev =>
      prev.map(i => (i.product.id === productId ? { ...i, quantity: newQty } : i))
    );
  };

  // Step 1 to Step 2 Validation
  const handleContinueToCustomerDetails = () => {
    setErrorMessage(null);
    if (!checkoutItems || checkoutItems.length === 0) {
      setErrorMessage('Please select at least one product before continuing.');
      return;
    }
    setCurrentStep(2);
  };

  // Step 2 to Step 3 Validation
  const handleContinueToPayment = () => {
    setErrorMessage(null);

    // Required fields: Name *, Email ID *, Address *, Phone *, Pincode *
    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!phone.trim() || phone.trim().length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number for order delivery updates.');
      return;
    }

    if (!address.trim() || !city.trim() || !pincode.trim()) {
      setErrorMessage('Please fill in complete delivery address details (street, city, pincode).');
      return;
    }

    // MANDATORY TERMS & CONDITIONS CHECKBOX
    if (!termsAccepted) {
      setErrorMessage('You must agree to the Terms & Conditions to proceed to payment.');
      return;
    }

    setCurrentStep(3);
  };

  // Step 3 Submit Order
  const handleSubmitOrder = async () => {
    setErrorMessage(null);

    const cleanUtr = utrNumber.trim();
    if (!cleanUtr || cleanUtr.length < 6) {
      setErrorMessage('Please enter your valid UPI Transaction ID or 12-digit UTR Number from your payment app.');
      return;
    }

    setIsSubmitting(true);

    try {
      await createOrder({
        items: checkoutItems,
        customer: {
          name: name.trim(),
          email: email.trim(),
          instagramId: instagramId.trim() || undefined,
          phone: phone.trim(),
          address: address.trim(),
          city: city.trim(),
          state: state.trim(),
          pincode: pincode.trim(),
          termsAccepted: true,
          notes: customerNotes.trim() || undefined
        },
        utrNumber: cleanUtr,
        customerNotes: customerNotes.trim() || undefined
      });

      // Close checkout modal (OrderConfirmation will open via confirmedOrder state)
      setIsCheckoutOpen(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to submit order.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Title and Close */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/70">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
              LuckyDrawWin Verified Checkout
            </span>
            <h2 className="text-base sm:text-lg font-black text-neutral-900 font-display">
              SECURE 3-STEP ORDER CHECKOUT
            </h2>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PROGRESS INDICATOR */}
        <div className="bg-neutral-900 text-white px-6 py-3.5 border-b border-neutral-800">
          <div className="flex items-center justify-between max-w-md mx-auto">
            
            {/* Step 1 Indicator */}
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep > 1 
                  ? 'bg-emerald-500 text-neutral-950' 
                  : currentStep === 1 
                  ? 'bg-amber-400 text-neutral-950 ring-2 ring-amber-400/30' 
                  : 'bg-neutral-800 text-neutral-400'
              }`}>
                {currentStep > 1 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '1'}
              </div>
              <span className={`text-xs font-bold ${currentStep === 1 ? 'text-amber-300' : 'text-neutral-400'}`}>
                SELECT PRODUCT
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-3 ${currentStep >= 2 ? 'bg-amber-500' : 'bg-neutral-800'}`} />

            {/* Step 2 Indicator */}
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep > 2 
                  ? 'bg-emerald-500 text-neutral-950' 
                  : currentStep === 2 
                  ? 'bg-amber-400 text-neutral-950 ring-2 ring-amber-400/30' 
                  : 'bg-neutral-800 text-neutral-400'
              }`}>
                {currentStep > 2 ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : '2'}
              </div>
              <span className={`text-xs font-bold ${currentStep === 2 ? 'text-amber-300' : 'text-neutral-400'}`}>
                CUSTOMER DETAILS
              </span>
            </div>

            <div className={`flex-1 h-0.5 mx-3 ${currentStep >= 3 ? 'bg-amber-500' : 'bg-neutral-800'}`} />

            {/* Step 3 Indicator */}
            <div className="flex items-center gap-2">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                currentStep === 3 
                  ? 'bg-amber-400 text-neutral-950 ring-2 ring-amber-400/30' 
                  : 'bg-neutral-800 text-neutral-400'
              }`}>
                3
              </div>
              <span className={`text-xs font-bold ${currentStep === 3 ? 'text-amber-300' : 'text-neutral-400'}`}>
                PAYMENT
              </span>
            </div>

          </div>
        </div>

        {/* Error Alert Banner */}
        {errorMessage && (
          <div className="m-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* STEP CONTENT BODY */}
        <div className="p-6">
          
          {/* ======================================================
              STEP 1 — SELECT PRODUCT
             ====================================================== */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-1">
                  1. Verify Selected Products & Quantity
                </h3>
                <p className="text-xs text-neutral-500">
                  Every product is priced strictly between ₹9 and ₹99. Adjust quantities before proceeding.
                </p>
              </div>

              {/* Items List */}
              <div className="border border-neutral-200 rounded-2xl divide-y divide-neutral-100 overflow-hidden bg-neutral-50/40">
                {checkoutItems.length > 0 ? (
                  checkoutItems.map((item) => (
                    <div key={item.product.id} className="p-4 flex items-center justify-between gap-3">
                      
                      <div className="flex items-center gap-3 min-w-0">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-14 h-14 rounded-xl object-cover bg-neutral-100 border border-neutral-200 shrink-0"
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] text-amber-600 font-bold block mt-0.5">
                            ₹{item.product.finalPrice} each
                          </span>
                        </div>
                      </div>

                      {/* Quantity & Item Subtotal */}
                      <div className="flex items-center gap-4 shrink-0">
                        <div className="flex items-center border border-neutral-300 rounded-lg bg-white">
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-100 font-bold text-xs cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-2.5 text-xs font-bold text-neutral-900 tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-neutral-600 hover:bg-neutral-100 font-bold text-xs cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        <span className="text-sm font-extrabold text-neutral-950 font-display tabular-nums w-14 text-right">
                          ₹{item.product.finalPrice * item.quantity}
                        </span>
                      </div>

                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-xs text-neutral-500">
                    No products currently selected.
                  </div>
                )}
              </div>

              {/* Order Cost Breakdown */}
              <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-600">
                  <span>Selected Products Subtotal:</span>
                  <span className="font-bold text-neutral-900 tabular-nums">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-neutral-600">
                  <span>PAN-India Delivery:</span>
                  <span className="tabular-nums">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-700 font-bold">FREE DELIVERY (₹0)</span>
                    ) : (
                      `₹${deliveryFee}`
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-neutral-950 pt-2 border-t border-neutral-200">
                  <span>Total Amount:</span>
                  <span className="text-base text-amber-600 font-display tabular-nums">₹{totalPayable}</span>
                </div>
              </div>

              {/* Step 1 Actions */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleContinueToCustomerDetails}
                  disabled={checkoutItems.length === 0}
                  className="px-8 py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 disabled:opacity-50 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>CONTINUE</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>
            </div>
          )}

          {/* ======================================================
              STEP 2 — CUSTOMER DETAILS
             ====================================================== */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-900 mb-1">
                  2. Customer & Delivery Information
                </h3>
                <p className="text-xs text-neutral-500">
                  Enter delivery details for dispatching your physical package across India.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 1. Name * */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 block">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ramesh Kumar"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* 2. Email ID * */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 block">
                    Email ID <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. ramesh@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* 3. Instagram ID (Optional — यदि हो तो) */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-neutral-800 flex items-center justify-between">
                    <span>Instagram ID (Optional — यदि हो तो)</span>
                    <span className="text-[10px] text-neutral-400 font-normal">Optional</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. @ramesh_insta (यदि हो तो)"
                    value={instagramId}
                    onChange={(e) => setInstagramId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* Phone Number * */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 block">
                    Contact Mobile Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* PIN Code * */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 block">
                    Postal PIN Code <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 110001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* Street Address * */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-neutral-800 block">
                    Complete Street Address / House No. <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Flat / House No., Building Name, Street / Locality"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* City * */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 block">
                    City <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mumbai"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* State */}
                <div className="space-y-1">
                  <label className="text-xs font-bold text-neutral-800 block">
                    State <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maharashtra"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

                {/* Customer Notes (Optional) */}
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-xs font-bold text-neutral-800 flex items-center justify-between">
                    <span>Customer Notes & Delivery Instructions</span>
                    <span className="text-[10px] text-neutral-400 font-normal">Optional</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Call before delivery, landmark near temple, etc."
                    value={customerNotes}
                    onChange={(e) => setCustomerNotes(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-xs focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                  />
                </div>

              </div>

              {/* MANDATORY CHECKBOX: TERMS & CONDITIONS */}
              <div className="pt-2">
                <label className="flex items-start gap-3 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                    className="mt-0.5 h-4 w-4 rounded text-amber-600 focus:ring-amber-500 border-neutral-300 cursor-pointer"
                  />
                  <div className="text-xs text-neutral-800 select-none">
                    <span>I agree to the </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        setIsTermsOpen(true);
                      }}
                      className="font-bold text-amber-800 underline hover:text-amber-950 inline cursor-pointer"
                    >
                      Terms & Conditions
                    </button>
                    <span> of LuckyDrawWin.</span>
                  </div>
                </label>
              </div>

              {/* Step 2 Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2.5 rounded-xl text-neutral-600 hover:text-neutral-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Products</span>
                </button>

                <button
                  type="button"
                  onClick={handleContinueToPayment}
                  className="px-8 py-3.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>CONTINUE TO PAYMENT</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </button>
              </div>

            </div>
          )}

          {/* ======================================================
              STEP 3 — PAYMENT (UPI / QR PAYMENT)
             ====================================================== */}
          {currentStep === 3 && (
            <div className="space-y-6">
              
              {/* Order Summary at top of step 3 */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
                    Order Summary ({checkoutItems.length} items)
                  </h4>
                  <span className="text-xs text-neutral-500 font-medium">
                    Customer: <strong className="text-neutral-900">{name}</strong>
                  </span>
                </div>

                <div className="max-h-28 overflow-y-auto divide-y divide-neutral-200/60 pr-1">
                  {checkoutItems.map((item) => (
                    <div key={item.product.id} className="py-1.5 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 truncate mr-2">
                        <img
                          src={item.product.images[0]}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded object-cover shrink-0"
                        />
                        <span className="truncate text-neutral-700">{item.product.name} (x{item.quantity})</span>
                      </div>
                      <span className="font-bold text-neutral-900 tabular-nums shrink-0">
                        ₹{item.product.finalPrice * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs font-extrabold">
                  <span className="text-neutral-700">Total Payable Amount (incl. delivery):</span>
                  <span className="text-base text-neutral-950 font-display tabular-nums">
                    ₹{totalPayable}
                  </span>
                </div>
              </div>

              {/* PAYMENT METHOD: UPI / QR PAYMENT */}
              <div className="border-2 border-amber-400/90 rounded-3xl p-5 sm:p-6 bg-gradient-to-b from-amber-50/70 via-white to-amber-50/30 shadow-md">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-3 pb-3 border-b border-amber-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500 text-neutral-950 flex items-center justify-center shadow-xs">
                      <QrCode className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded-md">
                          INSTANT UPI QR
                        </span>
                        <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse"></span>
                          VERIFIED
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-black text-neutral-950 uppercase tracking-tight font-display mt-0.5">
                        SCAN QR CODE TO PAY
                      </h3>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider block">
                      Payable Total
                    </span>
                    <span className="text-lg sm:text-xl font-black text-amber-600 font-display tabular-nums">
                      ₹{totalPayable}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-neutral-600 mb-4">
                  Scan this official dynamic QR code using Google Pay, PhonePe, Paytm, BHIM, or any UPI app to complete your order payment.
                </p>

                {/* VERIFIED GOOGLE PAY UPI CARD BANNER */}
                <div className="bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/80 border-2 border-blue-200 rounded-2xl p-3.5 mb-4 shadow-xs">
                  <div className="flex items-center justify-between gap-2 mb-2 pb-2 border-b border-blue-100">
                    <div className="flex items-center gap-2">
                      <div className="flex -space-x-1">
                        <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
                      </div>
                      <span className="text-xs font-black text-blue-900 tracking-tight">
                        Google Pay UPI Account
                      </span>
                    </div>
                    <span className="text-[10px] font-black tracking-wide uppercase px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-emerald-600" />
                      100% Active Account
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {/* UPI ID with 1-click copy */}
                    <div className="bg-white rounded-xl p-2.5 border border-blue-200 flex items-center justify-between gap-2 shadow-2xs">
                      <div className="min-w-0">
                        <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider block">
                          Official UPI ID
                        </span>
                        <span className="font-mono font-black text-neutral-900 text-xs sm:text-sm select-all truncate block">
                          {qrSettings.upiId || 'anuchoudhary4m@okicici'}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-[11px] font-bold transition-all shadow-xs cursor-pointer"
                        title="Copy UPI ID"
                      >
                        {copiedUpi ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-200" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Payee Name & Amount copy */}
                    <div className="bg-white rounded-xl p-2.5 border border-blue-200 flex items-center justify-between gap-2 shadow-2xs">
                      <div className="min-w-0">
                        <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider block">
                          Payee & Amount
                        </span>
                        <span className="font-black text-neutral-900 text-xs truncate block">
                          {qrSettings.merchantName || 'Anu Choudhary'} • <strong className="text-amber-600 font-display">₹{totalPayable}</strong>
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyAmount}
                        className="shrink-0 flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 active:scale-95 text-white text-[11px] font-bold transition-all shadow-xs cursor-pointer"
                        title="Copy Amount"
                      >
                        {copiedAmount ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-200" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>₹{totalPayable}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* QR Amount Mode Selector */}
                <div className="flex items-center justify-center gap-2 mb-3">
                  <span className="text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                    QR Format:
                  </span>
                  <div className="inline-flex rounded-xl p-0.5 bg-neutral-100 border border-neutral-300">
                    <button
                      type="button"
                      onClick={() => setQrAmountMode('with_amount')}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        qrAmountMode === 'with_amount'
                          ? 'bg-neutral-950 text-white shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Preset ₹{totalPayable}
                    </button>
                    <button
                      type="button"
                      onClick={() => setQrAmountMode('open')}
                      className={`px-3 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        qrAmountMode === 'open'
                          ? 'bg-neutral-950 text-white shadow-xs'
                          : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      Open QR (Standard)
                    </button>
                  </div>
                </div>

                {/* QR Code Container with Scanner Frame */}
                <div className="flex flex-col items-center justify-center p-5 bg-white rounded-2xl border-2 border-neutral-300 shadow-inner max-w-sm mx-auto">
                  <div className="relative p-3 bg-neutral-950 rounded-2xl shadow-xl">
                    {/* Scanner Target Corners */}
                    <div className="absolute top-1.5 left-1.5 w-4 h-4 border-t-2 border-l-2 border-amber-400 rounded-tl-sm pointer-events-none" />
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 border-t-2 border-r-2 border-amber-400 rounded-tr-sm pointer-events-none" />
                    <div className="absolute bottom-1.5 left-1.5 w-4 h-4 border-b-2 border-l-2 border-amber-400 rounded-bl-sm pointer-events-none" />
                    <div className="absolute bottom-1.5 right-1.5 w-4 h-4 border-b-2 border-r-2 border-amber-400 rounded-br-sm pointer-events-none" />

                    <div className="bg-white p-2 rounded-xl">
                      {qrSettings.customQrImageUrl ? (
                        <img
                          src={qrSettings.customQrImageUrl}
                          alt="UPI QR Code"
                          className="w-56 h-56 object-contain"
                        />
                      ) : qrDataUrl ? (
                        <img
                          src={qrDataUrl}
                          alt="UPI QR Code"
                          className="w-56 h-56 object-contain"
                        />
                      ) : (
                        <div className="w-56 h-56 flex flex-col items-center justify-center text-xs text-neutral-400 gap-2">
                          <QrCode className="w-8 h-8 text-neutral-300 animate-pulse" />
                          <span>Generating Payment QR...</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Ready to scan badge */}
                  <div className="flex items-center gap-1.5 mt-3 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>
                      {qrAmountMode === 'with_amount'
                        ? `Scan with Any UPI App • Exact Amount ₹${totalPayable}`
                        : `Scan with Any UPI App • Enter ₹${totalPayable}`}
                    </span>
                  </div>

                  <div className="text-[11px] text-neutral-600 font-medium mt-1.5 text-center">
                    Pay securely to <strong className="text-neutral-900">{qrSettings.merchantName || 'Anu Choudhary'}</strong> (<span className="font-mono text-neutral-700">{qrSettings.upiId || 'anuchoudhary4m@okicici'}</span>)
                  </div>

                  {/* QR Action Buttons */}
                  <div className="flex items-center justify-center gap-2 mt-3.5 w-full flex-wrap">
                    {/* Mobile Pay Link */}
                    {upiPaymentUri && (
                      <a
                        href={upiPaymentUri}
                        className="flex-1 min-w-[120px] py-2 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-[11px] font-extrabold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                      >
                        <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                        <span>Pay in UPI App</span>
                      </a>
                    )}

                    {/* Enlarge QR Button */}
                    <button
                      type="button"
                      onClick={() => setIsQrZoomed(true)}
                      className="py-2 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-bold flex items-center justify-center gap-1.5 border border-neutral-300 transition-all cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5 text-neutral-600" />
                      <span>Enlarge QR</span>
                    </button>

                    {/* Download QR Button */}
                    {(qrSettings.customQrImageUrl || qrDataUrl) && (
                      <a
                        href={qrSettings.customQrImageUrl || qrDataUrl}
                        download={`Payment_QR_Anu_Choudhary_Rs${totalPayable}.png`}
                        className="py-2 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-[11px] font-bold flex items-center justify-center gap-1.5 border border-neutral-300 transition-all"
                      >
                        <Download className="w-3.5 h-3.5 text-neutral-600" />
                        <span>Save QR</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Direct App Launch Links for Mobile Shoppers */}
                <div className="mt-4 pt-3 border-t border-amber-200">
                  <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider text-center mb-2">
                    Pay directly using your installed UPI App:
                  </div>
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <a
                      href={upiPaymentUri}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-blue-50 border border-blue-200 text-blue-700 text-xs font-black shadow-2xs transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      Google Pay
                    </a>
                    <a
                      href={upiPaymentUri}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-purple-50 border border-purple-200 text-purple-700 text-xs font-black shadow-2xs transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-purple-600"></span>
                      PhonePe
                    </a>
                    <a
                      href={upiPaymentUri}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-sky-50 border border-sky-200 text-sky-700 text-xs font-black shadow-2xs transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-sky-500"></span>
                      Paytm
                    </a>
                    <a
                      href={upiPaymentUri}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-black shadow-2xs transition-colors"
                    >
                      <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      BHIM / Any Bank
                    </a>
                  </div>
                </div>

                {/* 4-Step Instructions */}
                <div className="mt-4 p-3.5 bg-white/90 rounded-2xl border border-amber-200 text-[11px] text-neutral-700 space-y-1.5 shadow-2xs">
                  <div className="font-extrabold text-neutral-900 uppercase text-[10px] tracking-wider mb-1 text-amber-900 flex items-center justify-between">
                    <span>How to complete payment:</span>
                    <span className="text-[10px] text-emerald-700 font-bold">100% Instant & Secure</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">1</span>
                    <span>Open <strong>Google Pay</strong>, <strong>PhonePe</strong>, <strong>Paytm</strong>, or any UPI app on your smartphone.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">2</span>
                    <span>Scan the QR code above OR transfer to UPI ID: <strong className="font-mono text-neutral-900">{qrSettings.upiId || 'anuchoudhary4m@okicici'}</strong>.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">3</span>
                    <span>Verify the amount (<strong>₹{totalPayable}</strong>) to <strong>{qrSettings.merchantName || 'Anu Choudhary'}</strong>, enter your UPI PIN, and copy the 12-digit <strong>UTR / UPI Transaction ID</strong>.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 text-[10px] font-black flex items-center justify-center shrink-0 mt-0.5">4</span>
                    <span>Paste your 12-digit UTR number below and click <strong>"Payment Done & Submit Order"</strong>.</span>
                  </div>
                </div>
              </div>

              {/* Transaction ID / UTR Number input */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-neutral-900 block">
                  12-Digit Transaction ID / UTR Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter 12-digit UTR (e.g. 408271829104) from payment app"
                  value={utrNumber}
                  onChange={(e) => setUtrNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border-2 border-neutral-300 focus:border-amber-500 text-xs font-mono font-bold tracking-wider focus:outline-none"
                />
                <p className="text-[11px] text-neutral-500 leading-normal">
                  ⚠️ <em>Note:</em> The transaction / UTR reference number is submitted for order processing and verification. Payment is marked as <strong>Payment Details Submitted</strong> until manual review.
                </p>
              </div>

              {/* QR ZOOM MODAL OVERLAY */}
              {isQrZoomed && (
                <div 
                  className="fixed inset-0 z-50 bg-neutral-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200"
                  onClick={() => setIsQrZoomed(false)}
                >
                  <div 
                    className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl border border-neutral-200 animate-in zoom-in-95 duration-200"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => setIsQrZoomed(false)}
                      className="absolute top-4 right-4 p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-xs font-black uppercase text-amber-600 mb-1 tracking-wider">
                      <QrCode className="w-4 h-4" />
                      <span>Scan & Pay</span>
                    </div>

                    <h4 className="text-lg font-black text-neutral-950 font-display uppercase mb-0.5">
                      Pay ₹{totalPayable}
                    </h4>
                    <p className="text-xs text-neutral-600 mb-1">
                      Payee: <strong>{qrSettings.merchantName || 'Anu Choudhary'}</strong>
                    </p>
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <span className="font-mono text-xs font-bold text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-lg border border-neutral-300">
                        {qrSettings.upiId || 'anuchoudhary4m@okicici'}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="px-2 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-[10px] font-bold transition-all cursor-pointer"
                      >
                        {copiedUpi ? 'Copied!' : 'Copy'}
                      </button>
                    </div>

                    <div className="p-4 bg-neutral-950 rounded-2xl shadow-xl inline-block mx-auto">
                      <div className="bg-white p-2 rounded-xl">
                        {qrSettings.customQrImageUrl ? (
                          <img
                            src={qrSettings.customQrImageUrl}
                            alt="UPI QR Code"
                            className="w-64 h-64 object-contain mx-auto"
                          />
                        ) : qrDataUrl ? (
                          <img
                            src={qrDataUrl}
                            alt="UPI QR Code"
                            className="w-64 h-64 object-contain mx-auto"
                          />
                        ) : null}
                      </div>
                    </div>

                    <p className="text-xs text-neutral-600 mt-4">
                      Scan with any camera or UPI app to transfer ₹{totalPayable}.
                    </p>

                    <button
                      type="button"
                      onClick={() => setIsQrZoomed(false)}
                      className="w-full mt-4 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3 Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2.5 rounded-xl text-neutral-600 hover:text-neutral-900 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Customer Details</span>
                </button>

                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting || !utrNumber.trim()}
                  className="px-8 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-98 disabled:opacity-50 text-neutral-950 font-black text-xs tracking-wider uppercase transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>PROCESSING...</span>
                  ) : (
                    <>
                      <span>PAYMENT DONE & SUBMIT ORDER</span>
                      <Check className="w-4 h-4 stroke-[3]" />
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
