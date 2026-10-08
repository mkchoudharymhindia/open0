import React from 'react';
import { X, ShieldCheck, Scale, FileText, CheckCircle2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const TermsModal: React.FC = () => {
  const { isTermsOpen, setIsTermsOpen } = useStore();

  if (!isTermsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog */}
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-neutral-200 flex items-center justify-between bg-neutral-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">
                LuckyDrawWin Policy
              </span>
              <h2 className="text-base sm:text-lg font-black text-neutral-900 font-display">
                TERMS & CONDITIONS OF SERVICE
              </h2>
            </div>
          </div>

          <button
            onClick={() => setIsTermsOpen(false)}
            className="p-1.5 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Legal Text Content */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto text-xs text-neutral-700 leading-relaxed">
          
          {/* Important Highlight Box with Mandatory Terms */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 text-amber-950 space-y-3.5 shadow-xs">
            <div className="font-black flex items-center gap-2 text-sm text-amber-900 tracking-wide uppercase font-display">
              <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0" />
              <span>OFFICIAL TERMS & CONDITIONS DISCLOSURE</span>
            </div>
            
            <div className="p-4 bg-white/95 rounded-xl border border-amber-200 shadow-2xs">
              <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-900 font-bold">
                LuckyDrawWin is a lucky-draw-based promotional platform. After a customer completes an order/entry, the winner is selected according to the pre-announced rules. Only selected/winning customers receive the relevant product or prize. This is not a standard e-commerce purchase where every paying customer is guaranteed to receive a product.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5 text-xs">
              <div className="p-3.5 bg-white/95 rounded-xl border border-amber-200">
                <span className="font-black text-amber-900 block mb-1 uppercase tracking-wider text-[11px]">
                  Genuine Platform Notice
                </span>
                <p className="text-neutral-800 leading-normal font-medium">
                  <strong>LuckyDrawWin is a genuine platform and is not intended to be fraudulent.</strong> All promotions, participant entries, and draw selections are conducted transparently in accordance with pre-announced rules.
                </p>
              </div>

              <div className="p-3.5 bg-amber-100/90 rounded-xl border border-amber-300">
                <span className="font-black text-amber-950 block mb-1 uppercase tracking-wider text-[11px]">
                  Platform Fee of ₹1,499
                </span>
                <p className="text-amber-950 leading-normal font-medium">
                  <strong>If you want to receive the selected order/product/item, you are required to pay a platform fee of ₹1,499. This platform fee is applicable for processing and fulfillment of the selected order.</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Section 1 */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center text-[11px] font-black">1</span>
              <span>Promotional Platform Mechanics & Winner Selection</span>
            </h3>
            <p>
              LuckyDrawWin operates strictly as a promotional, lucky-draw-based system. By submitting an order, the customer secures an official entry/ticket into the corresponding product draw. Winner selection is executed following pre-announced draw rules and timelines. Only customers who are selected/drawn as winners are eligible to receive the relevant product or promotional prize.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center text-[11px] font-black">2</span>
              <span>Not a Standard Guaranteed E-Commerce Purchase</span>
            </h3>
            <p>
              Participants expressly understand and agree that participation on LuckyDrawWin is <strong>not a standard e-commerce purchase</strong> where every paying customer is guaranteed to receive a product. Customers who are not selected in the promotional draw will not receive physical merchandise.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center text-[11px] font-black">3</span>
              <span>Platform Fee of ₹1,499 for Order Fulfillment</span>
            </h3>
            <p>
              In order to claim and receive a selected order, item, or promotional prize, the selected customer is required to pay a mandatory <strong>platform fee of ₹1,499</strong>. This platform fee covers administrative verification, courier logistics, packaging, and end-to-end fulfillment processing of the selected order. Failure to settle the ₹1,499 platform fee may forfeit the fulfillment of the selected order.
            </p>
          </div>

          {/* Section 4 */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center text-[11px] font-black">4</span>
              <span>Genuine Platform Commitment & Anti-Fraud Guarantee</span>
            </h3>
            <p>
              <strong>LuckyDrawWin is a genuine platform and is not intended to be fraudulent.</strong> The platform is dedicated to maintaining high standards of fairness, integrity, and operational authenticity. All draw protocols, participant registries, and fulfillment pipelines are maintained with utmost fidelity.
            </p>
          </div>

          {/* Section 5 */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center text-[11px] font-black">5</span>
              <span>Order & Entry Submission Process</span>
            </h3>
            <p>
              Upon placing an entry on LuckyDrawWin, an Order Reference ID (e.g. LDW-XXXXXX) is generated. Participants must furnish accurate contact details including Full Name, WhatsApp/Mobile Number, Email Address, and complete Delivery Address with State and PIN code. Providing inaccurate information will hinder winner notification and item dispatch.
            </p>
          </div>

          {/* Section 6 */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center text-[11px] font-black">6</span>
              <span>UPI Payment & UTR Reference Submission</span>
            </h3>
            <p>
              Any entry fee or platform fee payments must be remitted via valid UPI methods (Google Pay, PhonePe, Paytm, BHIM, or UPI QR). Participants must submit a legitimate 12-digit UPI Transaction ID (UTR number). Falsified or duplicate UTR numbers will lead to immediate disqualification and account blacklisting.
            </p>
          </div>

          {/* Section 7 */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center text-[11px] font-black">7</span>
              <span>Winner Notification & Dispatch Timeline</span>
            </h3>
            <p>
              Selected winners will be officially notified through SMS, WhatsApp, Email, or website notifications. Following successful settlement and verification of the ₹1,499 platform fee, the item is prepared, securely packaged, and dispatched via reliable PAN-India courier networks within 24 to 48 hours.
            </p>
          </div>

          {/* Section 8 */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center text-[11px] font-black">8</span>
              <span>Participant Eligibility & Legal Age</span>
            </h3>
            <p>
              Participants must be at least 18 years of age and residents of India to enter promotional draws on LuckyDrawWin. Participation is subject to all applicable local and national laws and regulations.
            </p>
          </div>

          {/* Section 9 */}
          <div className="space-y-1.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center text-[11px] font-black">9</span>
              <span>Official Support Desk & Inquiries</span>
            </h3>
            <p>
              For inquiries regarding draw schedules, winner announcements, platform fee verification, or tracking of dispatched orders, contact our dedicated support desk with your registered mobile number and Order ID.
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <span className="text-[11px] text-neutral-500">
            Last Updated: October 2026 · LuckyDrawWin Legal
          </span>

          <button
            onClick={() => setIsTermsOpen(false)}
            className="px-6 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold cursor-pointer transition-colors"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
