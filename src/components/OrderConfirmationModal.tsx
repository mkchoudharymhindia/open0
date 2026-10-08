import React, { useEffect } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  Download, 
  Home, 
  Eye, 
  Package, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  FileText,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../context/StoreContext';

export const OrderConfirmationModal: React.FC = () => {
  const { confirmedOrder, setConfirmedOrder, setInvoiceOrder, setActiveCategory } = useStore();

  useEffect(() => {
    if (confirmedOrder) {
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Safe fallback
      }
    }
  }, [confirmedOrder]);

  if (!confirmedOrder) return null;

  const handleBackToHome = () => {
    setConfirmedOrder(null);
    setActiveCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Confirmation Card */}
      <div 
        className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-neutral-900 via-neutral-900 to-neutral-950 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
            <CheckCircle2 className="w-9 h-9 text-amber-400" />
          </div>

          <span className="text-[10px] font-bold tracking-widest uppercase text-amber-400 block mb-1">
            LuckyDrawWin Official Store
          </span>
          <h1 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white uppercase">
            Order Placed Successfully!
          </h1>
          <p className="text-xs text-neutral-300 mt-1 max-w-md mx-auto">
            Your order has been recorded in our system. Please keep your Order ID and transaction details for tracking.
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <div className="inline-flex items-center gap-2 bg-neutral-800/90 border border-neutral-700 px-4 py-1.5 rounded-full text-xs font-mono">
              <span className="text-neutral-400 font-sans">Order ID:</span>
              <span className="text-amber-400 font-bold tracking-wider">{confirmedOrder.id}</span>
            </div>
            <div className="inline-flex items-center gap-2 bg-amber-500/20 border border-amber-400/30 px-3.5 py-1.5 rounded-full text-xs">
              <span className="text-neutral-300">Payment Status:</span>
              <span className="text-amber-300 font-black">{confirmedOrder.paymentStatus}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
          
          {/* Status Badge Callout */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3">
            <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs">
              <div className="font-bold text-amber-900 flex items-center gap-2">
                <span>Payment Status:</span>
                <span className="px-2 py-0.5 rounded bg-amber-200/80 text-amber-950 font-black">
                  {confirmedOrder.paymentStatus}
                </span>
              </div>
              <p className="text-amber-800/90 text-[11px] mt-1 leading-relaxed">
                Your payment reference (UTR: <strong className="font-mono">{confirmedOrder.utrNumber}</strong>) has been recorded. Our team verifies payments before preparing dispatch. You will receive email/SMS notifications once verified.
              </p>
            </div>
          </div>

          {/* Customer & Shipping Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 text-xs">
            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                Customer Information
              </span>
              <p className="font-bold text-neutral-900">{confirmedOrder.customer.name}</p>
              <p className="text-neutral-600">{confirmedOrder.customer.email}</p>
              <p className="text-neutral-600">{confirmedOrder.customer.phone}</p>
              {confirmedOrder.customer.instagramId && (
                <p className="text-amber-700 font-semibold mt-1">
                  Instagram: {confirmedOrder.customer.instagramId}
                </p>
              )}
            </div>

            <div>
              <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block mb-1">
                Dispatch Destination
              </span>
              <p className="text-neutral-700">{confirmedOrder.customer.address}</p>
              <p className="text-neutral-700">
                {confirmedOrder.customer.city}, {confirmedOrder.customer.state} - {confirmedOrder.customer.pincode}
              </p>
              <p className="text-[11px] text-emerald-700 font-semibold mt-1">
                Delivery: 3–5 Business Days (PAN India)
              </p>
            </div>
          </div>

          {/* Ordered Products Table */}
          <div>
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-3">
              Purchased Physical Products
            </h4>

            <div className="border border-neutral-200 rounded-2xl divide-y divide-neutral-100 overflow-hidden">
              {confirmedOrder.items.map((item) => (
                <div key={item.product.id} className="p-3.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover bg-neutral-100 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-neutral-900 truncate">
                        {item.product.name}
                      </p>
                      <p className="text-[11px] text-neutral-500">
                        Qty: {item.quantity} × ₹{item.product.finalPrice}
                      </p>
                    </div>
                  </div>

                  <span className="font-bold text-neutral-900 font-display tabular-nums shrink-0">
                    ₹{item.product.finalPrice * item.quantity}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing & UTR Record */}
          <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2 text-xs">
            <div className="flex justify-between text-neutral-600">
              <span>Items Subtotal:</span>
              <span className="font-bold text-neutral-900 tabular-nums">₹{confirmedOrder.subtotal}</span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Delivery Charges:</span>
              <span className="tabular-nums">
                {confirmedOrder.deliveryCharges === 0 ? (
                  <span className="text-emerald-700 font-bold">FREE</span>
                ) : (
                  `₹${confirmedOrder.deliveryCharges}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-neutral-600">
              <span>Submitted UTR / Transaction ID:</span>
              <span className="font-mono font-bold text-neutral-900">{confirmedOrder.utrNumber}</span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-neutral-950 pt-2 border-t border-neutral-200">
              <span>Grand Total Amount:</span>
              <span className="text-base text-neutral-950 font-display tabular-nums">
                ₹{confirmedOrder.totalAmount}
              </span>
            </div>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-neutral-200 bg-neutral-50 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setInvoiceOrder(confirmedOrder)}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-black flex items-center gap-2 cursor-pointer shadow-sm transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>TAX INVOICE TEMPLATE</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2.5 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>PRINT RECEIPT</span>
            </button>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handleBackToHome}
              className="px-6 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-extrabold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Home className="w-4 h-4 text-amber-400" />
              <span>BACK TO HOME</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
