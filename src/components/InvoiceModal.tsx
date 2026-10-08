import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Share2, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink,
  PackageCheck
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const InvoiceModal: React.FC = () => {
  const { invoiceOrder, setInvoiceOrder, showToast } = useStore();
  const [copied, setCopied] = useState(false);

  if (!invoiceOrder) return null;

  const custName = invoiceOrder.customerName || invoiceOrder.customer?.name || 'Customer';
  const custAddress = invoiceOrder.deliveryAddress || invoiceOrder.customer?.address || '';
  const custCity = invoiceOrder.city || invoiceOrder.customer?.city || '';
  const custState = invoiceOrder.state || invoiceOrder.customer?.state || '';
  const custPincode = invoiceOrder.pincode || invoiceOrder.customer?.pincode || '';
  const custPhone = invoiceOrder.phoneNumber || invoiceOrder.customer?.phone || '';
  const custEmail = invoiceOrder.email || invoiceOrder.customer?.email || '';
  const custInsta = invoiceOrder.customer?.instagramId;

  const handlePrint = () => {
    window.print();
  };

  const getWhatsAppMessage = () => {
    const itemsText = invoiceOrder.items.map(i => {
      const name = i.name || (i as any).product?.name || 'Product';
      const price = i.price || (i as any).product?.finalPrice || 0;
      const qty = i.quantity || 1;
      return `${name} (x${qty}) - ₹${price * qty}`;
    }).join(', ');

    return `*🛍️ LUCKYDRAWWIN ORDER CONFIRMATION*\n` +
      `--------------------------------\n` +
      `*Order ID:* ${invoiceOrder.orderId || invoiceOrder.id}\n` +
      `*Customer Name:* ${custName}\n` +
      `*Phone:* ${custPhone}\n` +
      (custInsta ? `*Instagram:* ${custInsta}\n` : '') +
      `*Items:* ${itemsText}\n` +
      `*Subtotal:* ₹${invoiceOrder.subtotal}\n` +
      `*Delivery:* ${invoiceOrder.deliveryCharges === 0 ? 'FREE' : `₹${invoiceOrder.deliveryCharges}`}\n` +
      `*Grand Total:* ₹${invoiceOrder.totalAmount}\n` +
      `*Payment Mode:* UPI / QR\n` +
      `*UTR / Ref No:* ${invoiceOrder.utrNumber}\n` +
      `*Payment Status:* ${invoiceOrder.paymentStatus}\n` +
      `--------------------------------\n` +
      `_Thank you for shopping with LuckyDrawWin!_`;
  };

  const handleCopyWhatsApp = () => {
    const text = getWhatsAppMessage();
    navigator.clipboard.writeText(text);
    setCopied(true);
    showToast('WhatsApp order template copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const whatsAppUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(getWhatsAppMessage())}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 print:p-0 print:bg-white print:fixed-none animate-in fade-in duration-200">
      
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-neutral-300 overflow-hidden my-auto print:border-none print:shadow-none print:rounded-none print:w-full print:max-w-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar (Hidden during print) */}
        <div className="print:hidden bg-neutral-900 text-white px-6 py-4 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-amber-500 rounded-lg text-neutral-950 font-black text-xs">
              LDW
            </div>
            <div>
              <h3 className="text-sm font-bold tracking-tight">Retail Invoice & Order Slip Template</h3>
              <p className="text-[11px] text-neutral-400">Order #{invoiceOrder.id} • All items ₹9 to ₹99 only</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-neutral-950 font-extrabold text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / PDF</span>
            </button>

            <button
              onClick={handleCopyWhatsApp}
              className="px-3 py-1.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'WhatsApp Slip'}</span>
            </button>

            <button
              onClick={() => setInvoiceOrder(null)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Invoice Document Body */}
        <div className="p-6 sm:p-10 text-neutral-900 bg-white max-h-[82vh] overflow-y-auto print:max-h-none print:overflow-visible">
          
          {/* Invoice Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-6 border-b-2 border-neutral-900 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black font-display tracking-tight text-neutral-950 uppercase">
                  LUCKYDRAW<span className="text-amber-500">WIN</span>
                </span>
                <span className="px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-800 text-[10px] font-bold rounded">
                  RETAIL STORE
                </span>
              </div>
              <p className="text-xs text-neutral-500 mt-1 font-medium">
                Official E-Commerce Store • Everything from ₹9 to ₹99 only
              </p>
              <p className="text-[11px] text-neutral-500">
                GSTIN / Trade ID: 27AABCL8291Q1ZZ • support@luckydrawwin.com
              </p>
            </div>

            <div className="text-left sm:text-right">
              <span className="inline-block px-3 py-1 bg-neutral-900 text-white text-xs font-black rounded uppercase tracking-wider mb-1">
                TAX INVOICE & DISPATCH MEMO
              </span>
              <p className="text-xs font-mono font-bold text-neutral-800">
                Invoice #: INV-{invoiceOrder.id}
              </p>
              <p className="text-[11px] text-neutral-500">
                Date: {new Date(invoiceOrder.createdAt).toLocaleDateString('en-IN', {
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          {/* Customer & Order Metadata */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-neutral-200 text-xs">
            <div>
              <h4 className="font-bold text-neutral-400 uppercase text-[10px] tracking-wider mb-2">
                Billed & Shipped To:
              </h4>
              <p className="font-extrabold text-sm text-neutral-950">{custName}</p>
              <p className="text-neutral-700 mt-0.5">{custAddress}</p>
              <p className="text-neutral-700">
                {custCity}{custCity && custState ? ', ' : ''}{custState}{custPincode ? ` - ${custPincode}` : ''}
              </p>
              <p className="text-neutral-600 mt-1">
                <strong>Phone:</strong> {custPhone}
              </p>
              <p className="text-neutral-600">
                <strong>Email:</strong> {custEmail}
              </p>
              {custInsta && (
                <p className="text-amber-800 font-semibold">
                  <strong>Instagram ID:</strong> {custInsta}
                </p>
              )}
            </div>

            <div className="sm:text-right space-y-1.5">
              <h4 className="font-bold text-neutral-400 uppercase text-[10px] tracking-wider mb-2">
                Payment & Dispatch Details:
              </h4>
              <p>
                <span className="text-neutral-500">Payment Mode: </span>
                <span className="font-bold text-neutral-900">UPI / QR Payment</span>
              </p>
              <p>
                <span className="text-neutral-500">UTR / Ref No: </span>
                <span className="font-mono font-bold text-neutral-950 bg-neutral-100 px-1.5 py-0.5 rounded">
                  {invoiceOrder.utrNumber}
                </span>
              </p>
              <p>
                <span className="text-neutral-500">Payment Status: </span>
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                  {invoiceOrder.paymentStatus}
                </span>
              </p>
              <p>
                <span className="text-neutral-500">Order Status: </span>
                <span className="font-semibold text-neutral-900">{invoiceOrder.orderStatus}</span>
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="py-6">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b-2 border-neutral-300 text-[11px] font-black uppercase text-neutral-600">
                  <th className="py-2.5">Item Description</th>
                  <th className="py-2.5 text-center">Category</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Price</th>
                  <th className="py-2.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-200">
                {invoiceOrder.items.map((item, idx) => {
                  const itemName = item.name || (item as any).product?.name || 'Item';
                  const itemPrice = item.price || (item as any).product?.finalPrice || 0;
                  const itemQty = item.quantity || 1;
                  const itemCategory = item.category || (item as any).product?.category || '';
                  const itemBadge = (item as any).product?.badge || `₹${itemPrice} ONLY`;

                  return (
                    <tr key={idx} className="hover:bg-neutral-50">
                      <td className="py-3 pr-2">
                        <div className="font-bold text-neutral-900 line-clamp-2">{itemName}</div>
                        <span className="text-[10px] text-amber-700 font-semibold">
                          {itemBadge}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-center text-neutral-500 text-[11px]">
                        {itemCategory}
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-neutral-800">
                        {itemQty}
                      </td>
                      <td className="py-3 px-2 text-right font-display text-neutral-800 tabular-nums">
                        ₹{itemPrice}
                      </td>
                      <td className="py-3 pl-2 text-right font-bold font-display text-neutral-950 tabular-nums">
                        ₹{itemPrice * itemQty}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pricing Totals */}
          <div className="border-t-2 border-neutral-900 pt-4 pb-6 flex flex-col sm:flex-row justify-between items-start gap-6">
            <div className="text-[11px] text-neutral-500 max-w-sm space-y-1">
              <p className="font-bold text-neutral-700 uppercase">Declaration & Terms:</p>
              <p>• All merchandise sold is authentic physical retail inventory priced strictly ₹9–₹99.</p>
              <p>• UTR verification is performed manually prior to shipping.</p>
              <p>• Hassle-free 7-day replacement for manufacturing transit defects.</p>
            </div>

            <div className="w-full sm:w-64 space-y-2 text-xs">
              <div className="flex justify-between text-neutral-600">
                <span>Subtotal:</span>
                <span className="font-semibold text-neutral-900 font-display tabular-nums">
                  ₹{invoiceOrder.subtotal}
                </span>
              </div>
              <div className="flex justify-between text-neutral-600">
                <span>Shipping & Handling:</span>
                <span className="font-semibold tabular-nums">
                  {invoiceOrder.deliveryCharges === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `₹${invoiceOrder.deliveryCharges}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-neutral-950 pt-2 border-t-2 border-neutral-900">
                <span>Total Amount:</span>
                <span className="font-display tabular-nums text-lg">
                  ₹{invoiceOrder.totalAmount}
                </span>
              </div>
              <p className="text-[10px] text-neutral-500 text-right">
                (Inclusive of all applicable Indian taxes)
              </p>
            </div>
          </div>

          {/* Official Verification Watermark / Seal */}
          <div className="mt-4 p-4 rounded-2xl bg-neutral-50 border border-neutral-200 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-600">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <p className="font-bold text-neutral-900">LuckyDrawWin Official Dispatch Note</p>
                <p className="text-[11px] text-neutral-500">Physical Products Retail Guarantee • No Random Draw</p>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 text-[11px] font-black uppercase text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <CheckCircle2 className="w-3.5 h-3.5" />
                VERIFIED SLIP
              </span>
            </div>
          </div>

        </div>

        {/* Modal Footer (Hidden in print) */}
        <div className="print:hidden p-4 bg-neutral-100 border-t border-neutral-300 flex flex-wrap items-center justify-between gap-3 text-xs">
          <a
            href={whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-2 cursor-pointer transition-all shadow-sm"
          >
            <Share2 className="w-4 h-4" />
            <span>Send to WhatsApp</span>
          </a>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <Printer className="w-4 h-4" />
              <span>Print Invoice</span>
            </button>
            <button
              onClick={() => setInvoiceOrder(null)}
              className="px-4 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white font-semibold cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
