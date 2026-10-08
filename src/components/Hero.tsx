import React from 'react';
import { ShoppingBag, ArrowRight, ShieldCheck, Truck, Sparkles, CheckCircle2, Zap } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Hero: React.FC = () => {
  const { setActiveCategory, products, setSelectedProduct, websiteSettings } = useStore();

  const scrollToProducts = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Top spotlight items from the live product catalog
  const spotlightProducts = products.slice(0, 4);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-900 to-neutral-950 text-white pt-8 pb-16 sm:py-16 md:py-20">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-r from-amber-500/10 via-amber-400/20 to-orange-500/10 blur-3xl pointer-events-none -z-0" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none -z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Promotional Tag */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 via-amber-400/20 to-amber-500/20 border border-amber-400/30 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-inner">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{websiteSettings?.megaDealBanner || '🔥 MEGA LAUNCH DEALS — iPHONES, SMARTWATCHES & BLUE STAR 5-STAR AC 🔥'}</span>
          </div>
        </div>

        {/* Main Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-bold">
                Authentic Indian E-Commerce Store
              </span>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white font-display uppercase leading-none">
                LUCKYDRAW<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">WIN</span>
              </h1>
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-neutral-100 tracking-tight font-display">
                {websiteSettings?.heroSubheadline || 'PREMIUM SHOPPING STORE'}
              </h2>
            </div>

            <p className="text-neutral-300 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {websiteSettings?.heroSupportingText || 'LuckyDrawWin is a genuine lucky-draw-based promotional platform. Complete your entry for a chance to receive authentic products with verified pre-announced rules.'}
            </p>

            {/* Price Cap Assurance */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
              {['₹1 JEWELLERY & FOOTWEAR', '₹15 COSMETICS', '₹29 DRESSES', '₹49 BEAUTY', '₹99 JEANS & SHOES', 'FROM ₹999 SMARTPHONES'].map((badge) => (
                <span 
                  key={badge}
                  className="px-2.5 py-1 text-[11px] font-bold bg-neutral-800/90 text-amber-300 border border-neutral-700/80 rounded-md tracking-tight"
                >
                  {badge}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-3">
              <button
                onClick={scrollToProducts}
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-neutral-950 font-extrabold text-sm uppercase tracking-wider hover:brightness-105 active:scale-98 transition-all shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>SHOP NOW</span>
              </button>

              <button
                onClick={() => {
                  setActiveCategory('all');
                  scrollToProducts();
                }}
                className="w-full sm:w-auto px-7 py-4 rounded-xl bg-neutral-800/80 hover:bg-neutral-800 text-white font-bold text-sm uppercase tracking-wider border border-neutral-700 hover:border-neutral-600 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>VIEW ALL PRODUCTS ({products.length})</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </button>
            </div>

            {/* Legitimacy & Trust Points */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-neutral-400 border-t border-neutral-800/80">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Physical Products</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero Hidden Fees</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Verified UPI QR Payment</span>
              </div>
            </div>
          </div>

          {/* Right Showcase Box */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame */}
              <div className="relative rounded-3xl bg-gradient-to-b from-neutral-800 to-neutral-900 p-1.5 shadow-2xl border border-neutral-700/60">
                <div className="rounded-[22px] bg-neutral-950 p-5 sm:p-7 space-y-5">
                  
                  {/* Top card header */}
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
                    <div>
                      <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider block">Today's Spotlight</span>
                      <h3 className="text-lg font-bold text-white font-display">Featured Catalog</h3>
                    </div>
                    <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-400 text-xs font-extrabold border border-amber-500/30">
                      LIVE DEALS
                    </span>
                  </div>

                  {/* Highlights list with real product images */}
                  <div className="space-y-3">
                    {spotlightProducts.map((p) => (
                      <div 
                        key={p.id}
                        onClick={() => setSelectedProduct(p)}
                        className="flex items-center justify-between p-2.5 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-amber-500/60 transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img 
                            src={p.images[0]} 
                            alt={p.name}
                            className="w-12 h-12 rounded-lg object-cover bg-neutral-800 shrink-0 border border-neutral-700/60 group-hover:scale-105 transition-transform"
                            loading="lazy"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <p className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                                {p.name}
                              </p>
                              {(p.variant || p.storage) && (
                                <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
                                  {p.variant || p.storage}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-neutral-400 truncate">
                              {p.category} · ★ {p.rating}
                            </p>
                          </div>
                        </div>
                        <span className="text-xs font-black text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20 shrink-0 ml-2">
                          ₹{p.finalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Bottom banner in showcase */}
                  <div className="p-3 bg-gradient-to-r from-amber-950/40 to-neutral-900 rounded-xl border border-amber-900/50 flex items-center justify-between">
                    <div className="text-[11px] text-neutral-300">
                      <span className="font-bold text-amber-400">Pan-India Express Dispatch:</span> Orders shipped safely via reputed Indian couriers with live tracking.
                    </div>
                    <Truck className="w-5 h-5 text-amber-400 shrink-0 ml-2" />
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Feature Strip below Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-neutral-800/80">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-neutral-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Genuine Platform</p>
              <p className="text-[11px] text-neutral-400">Pre-announced draw rules</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
              <span className="font-extrabold text-base">₹</span>
            </div>
            <div>
              <p className="text-xs font-bold text-white">Unbeatable Pricing</p>
              <p className="text-[11px] text-neutral-400">Direct warehouse deals</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Fast Doorstep Dispatch</p>
              <p className="text-[11px] text-neutral-400">Tracking details provided</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center text-amber-400 shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white">Instant UPI / QR Checkout</p>
              <p className="text-[11px] text-neutral-400">GPay, PhonePe, Paytm, BHIM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
