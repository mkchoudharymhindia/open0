import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  Mail, 
  MapPin, 
  Clock, 
  Lock, 
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Footer: React.FC = () => {
  const { websiteSettings, setIsTermsOpen, setIsAdminOpen, setActiveCategory } = useStore();
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: 'How does LuckyDrawWin work?',
      a: 'LuckyDrawWin is a lucky-draw-based promotional platform. After a customer completes an order/entry, the winner is selected according to the pre-announced rules. Only selected/winning customers receive the relevant product or prize. This is not a standard e-commerce purchase where every paying customer is guaranteed to receive a product.'
    },
    {
      q: 'Is LuckyDrawWin a genuine platform?',
      a: 'Yes, LuckyDrawWin is a genuine platform and is not intended to be fraudulent. All promotional draws and winner selections are conducted in strict adherence to pre-announced rules.'
    },
    {
      q: 'What is the platform fee requirement?',
      a: 'If you want to receive the selected order/product/item, you are required to pay a platform fee of ₹1,499. This platform fee is applicable for processing and fulfillment of the selected order.'
    },
    {
      q: 'How does UPI / QR payment verification work?',
      a: 'You scan the QR code using any UPI app (GPay, PhonePe, Paytm, BHIM) and submit your 12-digit UTR/Transaction reference number. Our team verifies the transaction against bank settlement and prepares your order.'
    }
  ];

  return (
    <footer className="bg-neutral-950 text-neutral-300 pt-16 pb-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* FAQ Section */}
        <div className="border-b border-neutral-800/80 pb-12">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Frequently Asked Questions
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white font-display mt-1">
                EVERYTHING YOU NEED TO KNOW
              </h3>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = activeFaq === index;
                return (
                  <div 
                    key={index}
                    className="rounded-2xl border border-neutral-800 bg-neutral-900/60 overflow-hidden transition-colors"
                  >
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : index)}
                      className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-neutral-200 hover:text-white cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                        <span>{faq.q}</span>
                      </span>
                      <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-4 pt-1 text-xs text-neutral-400 leading-relaxed border-t border-neutral-800/60">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 text-xs">
          
          {/* Column 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-neutral-950 font-black">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="text-xl font-black tracking-tight text-white font-display">
                LUCKYDRAW<span className="text-amber-500">WIN</span>
              </span>
            </div>

            <p className="text-neutral-400 leading-relaxed max-w-sm">
              LuckyDrawWin is a lucky-draw-based promotional platform. Complete your order entry for a chance to win curated lifestyle products, smartphones, and accessories under pre-announced rules.
            </p>

            <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-[11px] text-amber-400/90 leading-normal flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Genuine Promotional Platform:</strong> LuckyDrawWin is a genuine platform and is not intended to be fraudulent. Platform fee of ₹1,499 applicable for processing and fulfillment of selected orders.
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#products-section" 
                  onClick={() => setActiveCategory('all')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  All Products
                </a>
              </li>
              <li>
                <a 
                  href="#products-section" 
                  onClick={() => setActiveCategory('Trending Products')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Trending Deals
                </a>
              </li>
              <li>
                <a 
                  href="#products-section" 
                  onClick={() => setActiveCategory('Gadgets')} 
                  className="hover:text-amber-400 transition-colors"
                >
                  Gadgets Under ₹99
                </a>
              </li>
              <li>
                <button 
                  onClick={() => setIsAdminOpen(true)} 
                  className="hover:text-amber-400 transition-colors flex items-center gap-1 cursor-pointer text-neutral-400"
                >
                  <Lock className="w-3 h-3 text-amber-400" />
                  <span>Admin Login</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care & Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Customer Support & Policies
            </h4>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button 
                  onClick={() => setIsTermsOpen(true)} 
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsTermsOpen(true)} 
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsTermsOpen(true)} 
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Shipping & Delivery Policy
                </button>
              </li>
              <li>
                <button 
                  onClick={() => setIsTermsOpen(true)} 
                  className="hover:text-amber-400 transition-colors text-left cursor-pointer"
                >
                  Return & Refund Policy
                </button>
              </li>
              <li>
                <span className="text-neutral-500">FAQ & Help Desk</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact Us
            </h4>
            <div className="space-y-2.5 text-neutral-400">
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{websiteSettings.supportEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>{websiteSettings.supportHours}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] text-neutral-500 block">Socials:</span>
              <span className="text-amber-400 font-semibold">{websiteSettings.instagramHandle}</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Payments & Copyright */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <div>
            © {new Date().getFullYear()} LuckyDrawWin E-Commerce Private Limited. All rights reserved.
          </div>

          {/* Payment Badges */}
          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Accepted UPI:</span>
            <span className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-300 font-semibold">GPay</span>
            <span className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-300 font-semibold">PhonePe</span>
            <span className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-300 font-semibold">Paytm</span>
            <span className="bg-neutral-900 border border-neutral-800 px-2 py-0.5 rounded text-neutral-300 font-semibold">BHIM</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
