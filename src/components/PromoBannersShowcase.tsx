import React from 'react';
import { Sparkles, ArrowRight, Tag, Zap, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PROMO_BANNER_TEMPLATES } from '../data/templatesData';

export const PromoBannersShowcase: React.FC = () => {
  const { setActiveCategory } = useStore();

  const handleBannerClick = (categoryTarget: string) => {
    setActiveCategory(categoryTarget);
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-8 bg-neutral-100 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-md bg-amber-500 text-neutral-950 font-black text-xs">
              HOT
            </span>
            <h3 className="text-base sm:text-lg font-black text-neutral-900 tracking-tight uppercase font-display">
              FEATURED DEAL TEMPLATES
            </h3>
          </div>
          <span className="text-xs text-neutral-500 font-semibold hidden sm:inline">
            Direct Deals • Instant Dispatch • Pan-India
          </span>
        </div>

        {/* 3 Promo Banners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROMO_BANNER_TEMPLATES.map((banner) => (
            <div
              key={banner.id}
              onClick={() => handleBannerClick(banner.categoryTarget)}
              className="group relative overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-800 shadow-lg hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 cursor-pointer flex flex-col justify-between p-6 min-h-[220px]"
            >
              {/* Background Product Image */}
              <img
                src={banner.imageUrl}
                alt={banner.headline}
                className="absolute inset-0 w-full h-full object-cover object-center opacity-30 group-hover:scale-105 group-hover:opacity-40 transition-all duration-700 pointer-events-none"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent pointer-events-none" />

              {/* Top Banner Tag & Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-full bg-neutral-800/90 text-amber-300 text-[10px] font-black uppercase tracking-wider border border-neutral-700/80">
                  {banner.tag}
                </span>

                <span className="px-3 py-1 rounded-lg bg-amber-500 text-neutral-950 text-xs font-black tracking-tight shadow-md">
                  {banner.priceBadge}
                </span>
              </div>

              {/* Center / Bottom Headline */}
              <div className="relative z-10 my-3">
                <h4 className="text-xl sm:text-2xl font-black text-white font-display uppercase tracking-tight group-hover:text-amber-300 transition-colors">
                  {banner.headline}
                </h4>
                <p className="text-xs text-neutral-300 mt-1 line-clamp-2 leading-relaxed">
                  {banner.subheadline}
                </p>
              </div>

              {/* Action Button */}
              <div className="relative z-10 pt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 group-hover:text-white transition-colors">
                  <span>{banner.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
