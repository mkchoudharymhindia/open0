import React, { useState } from 'react';
import { 
  X, 
  Copy, 
  Check, 
  Printer, 
  FileText, 
  Phone, 
  Mail, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  Trash2, 
  AlertTriangle, 
  Ban, 
  ExternalLink,
  Clock,
  Package,
  CheckCircle2,
  AlertCircle,
  Truck
} from 'lucide-react';
import { Order, OrderStatus, PaymentStatus } from '../types';
import { useStore } from '../context/StoreContext';

interface AdminOrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
  onDeleteOrder?: (orderId: string) => void;
}

export const AdminOrderDetailModal: React.FC<AdminOrderDetailModalProps> = ({
  order,
  onClose,
  onDeleteOrder
}) => {
  const { 
    updatePaymentStatus, 
    updateOrderStatus, 
    cancelOrder, 
    deleteOrder, 
    setInvoiceOrder, 
    showToast 
  } = useStore();

  const [copiedUtr, setCopiedUtr] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  if (!order) return null;

  const orderId = order.orderId || order.id;
  const customerName = order.customerName || order.customer?.name || 'Customer';
  const phoneNumber = order.phoneNumber || order.customer?.phone || '—';
  const email = order.email || order.customer?.email || '—';
  const deliveryAddress = order.deliveryAddress || order.customer?.address || '—';
  const city = order.city || order.customer?.city || '—';
  const state = order.state || order.customer?.state || '—';
  const pincode = order.pincode || order.customer?.pincode || '—';
  const instagramId = order.customer?.instagramId;
  const utrNumber = order.utrNumber || 'N/A';

  const handleCopyUtr = () => {
    navigator.clipboard.writeText(utrNumber);
    setCopiedUtr(true);
    showToast('UTR Number copied to clipboard!');
    setTimeout(() => setCopiedUtr(false), 2000);
  };

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(phoneNumber);
    setCopiedPhone(true);
    showToast('Phone number copied to clipboard!');
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    showToast('Email copied to clipboard!');
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleOpenInvoice = () => {
    setInvoiceOrder(order);
  };

  const handleCancelOrder = () => {
    if (window.confirm(`Are you sure you want to cancel Order ${orderId}?`)) {
      cancelOrder(order.id);
      showToast(`Order ${orderId} has been cancelled.`);
    }
  };

  const handleDelete = () => {
    deleteOrder(order.id);
    if (onDeleteOrder) onDeleteOrder(order.id);
    showToast(`Order ${orderId} permanently deleted.`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 bg-neutral-50/80 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-1 rounded-lg bg-neutral-900 text-amber-400 font-mono font-bold text-xs">
                {orderId}
              </span>
              <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                order.paymentStatus === 'Payment Verified'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : order.paymentStatus === 'Payment Failed'
                  ? 'bg-rose-100 text-rose-800 border border-rose-300'
                  : order.paymentStatus === 'Refunded' || order.paymentStatus === 'Refund Initiated'
                  ? 'bg-purple-100 text-purple-800 border border-purple-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                ● {order.paymentStatus}
              </span>
              <span className="px-2.5 py-1 rounded-lg bg-neutral-200 text-neutral-800 text-xs font-semibold">
                Status: {order.orderStatus}
              </span>
            </div>
            <p className="text-xs text-neutral-500">
              Placed on: {new Date(order.createdAt).toLocaleString('en-IN', {
                dateStyle: 'full',
                timeStyle: 'medium'
              })}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl border border-neutral-300 hover:bg-neutral-100 text-neutral-700 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print Order Details"
            >
              <Printer className="w-3.5 h-3.5 text-neutral-500" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleOpenInvoice}
              className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-black flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
              title="View & Download Official Retail Invoice"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Invoice</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-7 space-y-6 max-h-[75vh] overflow-y-auto">
          
          {/* Top Status & Audit Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* 1. Payment Verification Control Card */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
                  <CreditCard className="w-4 h-4 text-amber-700" />
                  Payment Verification
                </span>
                <span className="text-[10px] font-mono text-neutral-400">UPI / QR</span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-amber-200 shadow-2xs space-y-2">
                <div className="text-[11px] text-neutral-500 flex justify-between items-center">
                  <span>Customer UTR / Txn:</span>
                  <button
                    onClick={handleCopyUtr}
                    className="text-[10px] text-amber-700 hover:text-amber-900 font-bold flex items-center gap-1 cursor-pointer"
                  >
                    {copiedUtr ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedUtr ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
                <p className="font-mono font-black text-sm text-neutral-950 bg-neutral-100 px-2 py-1 rounded select-all break-all">
                  {utrNumber}
                </p>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-neutral-700 block">
                  Update Payment Status:
                </label>
                <select
                  value={order.paymentStatus}
                  onChange={(e) => updatePaymentStatus(order.id, e.target.value as PaymentStatus)}
                  className="w-full text-xs font-bold py-2 px-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="Payment Details Submitted">Payment Details Submitted</option>
                  <option value="Payment Verified">Payment Verified</option>
                  <option value="Payment Failed">Payment Failed</option>
                  <option value="Refund Initiated">Refund Initiated</option>
                  <option value="Refunded">Refunded</option>
                </select>
              </div>

              {order.paymentStatus !== 'Payment Verified' && (
                <button
                  onClick={() => updatePaymentStatus(order.id, 'Payment Verified')}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verify Payment (Mark Paid)</span>
                </button>
              )}
            </div>

            {/* 2. Order Fulfillment Control Card */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Package className="w-4 h-4 text-neutral-600" />
                  Order Fulfillment
                </span>
                <span className="text-[10px] font-bold text-neutral-400">PAN India</span>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold text-neutral-700 block">
                  Update Order Status:
                </label>
                <select
                  value={order.orderStatus}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                  className="w-full text-xs font-semibold py-2 px-3 rounded-xl border border-neutral-300 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
                >
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>

              <div className="pt-2 border-t border-neutral-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs text-neutral-600">
                  <span>Shipping Mode:</span>
                  <span className="font-bold text-neutral-900">Direct Courier (PAN India)</span>
                </div>
                <div className="flex items-center justify-between text-xs text-neutral-600">
                  <span>Delivery Estimate:</span>
                  <span className="font-bold text-emerald-700">2–4 Business Days</span>
                </div>
              </div>

              {order.orderStatus !== 'Cancelled' && (
                <button
                  onClick={handleCancelOrder}
                  className="w-full py-1.5 border border-rose-300 hover:bg-rose-50 text-rose-700 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Ban className="w-3.5 h-3.5" />
                  <span>Cancel Order</span>
                </button>
              )}
            </div>

            {/* 3. Customer Quick Contact Card */}
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-3">
              <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-neutral-600" />
                Customer Contact
              </span>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-400 block">Name:</span>
                  <p className="font-bold text-neutral-950 text-sm">{customerName}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="min-w-0">
                    <span className="text-[10px] text-neutral-400 block">Mobile:</span>
                    <a href={`tel:${phoneNumber}`} className="font-semibold text-neutral-900 hover:text-amber-600">
                      {phoneNumber}
                    </a>
                  </div>
                  <button
                    onClick={handleCopyPhone}
                    className="p-1 rounded hover:bg-neutral-200 text-neutral-500 cursor-pointer"
                    title="Copy Phone"
                  >
                    {copiedPhone ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div className="min-w-0 truncate">
                    <span className="text-[10px] text-neutral-400 block">Email:</span>
                    <a href={`mailto:${email}`} className="font-semibold text-neutral-900 hover:text-amber-600 truncate block text-[11px]">
                      {email}
                    </a>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="p-1 rounded hover:bg-neutral-200 text-neutral-500 cursor-pointer shrink-0"
                    title="Copy Email"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                {instagramId && (
                  <div>
                    <span className="text-[10px] text-neutral-400 block">Instagram:</span>
                    <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                      {instagramId}
                    </span>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Delivery Address & Customer Notes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
              <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-neutral-600" />
                Complete Delivery Address
              </span>
              <div className="text-xs space-y-1 text-neutral-800 bg-white p-3 rounded-xl border border-neutral-200">
                <p className="font-bold text-neutral-900">{customerName}</p>
                <p className="text-neutral-700 leading-relaxed">{deliveryAddress}</p>
                <p className="font-semibold text-neutral-900">
                  {city}, {state} – <span className="font-mono font-bold text-neutral-950">{pincode}</span>
                </p>
                <p className="text-neutral-500 text-[11px]">India (PAN India Delivery)</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200 space-y-2">
              <span className="text-[11px] font-bold text-neutral-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-neutral-600" />
                Customer Notes / Instructions
              </span>
              <div className="text-xs text-neutral-700 bg-white p-3 rounded-xl border border-neutral-200 min-h-[90px] flex items-center">
                {order.customerNotes ? (
                  <p className="italic text-neutral-800">"{order.customerNotes}"</p>
                ) : (
                  <span className="text-neutral-400 italic">No special instructions or notes left by customer.</span>
                )}
              </div>
            </div>

          </div>

          {/* Ordered Products Table */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider flex items-center justify-between">
              <span>Ordered Products ({order.items.length})</span>
              <span className="text-neutral-400 text-[11px] font-normal">Physical E-Commerce Merchandise</span>
            </h4>

            <div className="border border-neutral-200 rounded-2xl overflow-hidden divide-y divide-neutral-100">
              <div className="bg-neutral-50 p-3 grid grid-cols-12 text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                <div className="col-span-6 sm:col-span-7">Product Details</div>
                <div className="col-span-2 text-right">Unit Price</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-2 sm:col-span-1 text-right">Total</div>
              </div>

              {order.items.map((item, idx) => {
                const itemName = item.name || (item as any).product?.name || 'Item';
                const itemImage = item.image || (item as any).product?.images?.[0] || '';
                const itemPrice = item.price || (item as any).product?.finalPrice || 0;
                const itemQty = item.quantity || 1;
                const itemColor = item.selectedColor || (item as any).selectedColor;
                const itemCategory = item.category || (item as any).product?.category;

                return (
                  <div key={idx} className="p-3.5 grid grid-cols-12 items-center text-xs gap-2">
                    <div className="col-span-6 sm:col-span-7 flex items-center gap-3 min-w-0">
                      {itemImage ? (
                        <img
                          src={itemImage}
                          alt={itemName}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-xl object-cover bg-neutral-100 border border-neutral-200 shrink-0"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center text-lg shrink-0">
                          📦
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-bold text-neutral-900 truncate">{itemName}</p>
                        <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                          {itemCategory && <span>{itemCategory}</span>}
                          {itemColor && (
                            <span className="font-semibold text-neutral-700 bg-neutral-100 px-1.5 py-0.5 rounded">
                              Color: {itemColor}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="col-span-2 text-right font-medium text-neutral-700 tabular-nums">
                      ₹{itemPrice}
                    </div>

                    <div className="col-span-2 text-center font-bold text-neutral-900">
                      ×{itemQty}
                    </div>

                    <div className="col-span-2 sm:col-span-1 text-right font-black text-neutral-950 tabular-nums">
                      ₹{itemPrice * itemQty}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pricing & Financial Summary */}
          <div className="p-4 bg-neutral-50 rounded-2xl border border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs space-y-1 text-neutral-600">
              <p>Payment Method: <strong className="text-neutral-900">{order.paymentMethod || 'UPI / QR Scan'}</strong></p>
              <p>Delivery Charges: <strong className="text-emerald-700">₹{order.deliveryCharges || 0} (Free Shipping)</strong></p>
              {order.discount ? <p>Discount Applied: <strong className="text-rose-600">-₹{order.discount}</strong></p> : null}
            </div>

            <div className="text-right">
              <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                Final Order Total
              </span>
              <span className="text-2xl font-black text-neutral-950 font-display tabular-nums">
                ₹{order.totalAmount}
              </span>
            </div>
          </div>

          {/* Danger Zone: Permanent Delete */}
          <div className="pt-4 border-t border-neutral-200 flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-neutral-800 block">Manage Order Record</span>
              <span className="text-[11px] text-neutral-400">Permanently delete from database if requested</span>
            </div>

            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={() => setShowDeleteConfirm(true)}
                className="px-3.5 py-2 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-700 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Order</span>
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <span className="text-xs text-rose-600 font-bold">Confirm delete?</span>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs rounded-lg cursor-pointer"
                >
                  Yes, Delete
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-semibold text-xs rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-neutral-100 border-t border-neutral-200 flex items-center justify-between">
          <span className="text-[11px] text-neutral-500 font-mono">
            ID: {orderId} · Stored in persistent database
          </span>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>

    </div>
  );
};
