import React, { useState } from 'react';
import { 
  Home,
  Sparkles, 
  Utensils, 
  Bath,
  Zap,
  Smartphone, 
  PenTool, 
  Shirt,
  Footprints,
  Palette,
  Smile,
  Activity,
  ShoppingBag, 
  Car,
  Wrench,
  Heart,
  Gift, 
  Lamp,
  BookOpen,
  Flame
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

const categoryImages: Record<string, string> = {
  'toys-games': 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=80',
  'mens-jackets': 'https://images.unsplash.com/photo-1544441893-675973e31985?w=400&auto=format&fit=crop&q=80',
  'mixer-appliances': 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=400&auto=format&fit=crop&q=80',
  'womens-dresses': 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&auto=format&fit=crop&q=80',
  'mens-jeans': 'https://images.unsplash.com/photo-1542272604-780c96856592?w=400&auto=format&fit=crop&q=80',
  'mens-shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80',
  'bags-accessories': 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&auto=format&fit=crop&q=80',
  'jewellery': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&auto=format&fit=crop&q=80',
  'footwear': 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?w=400&auto=format&fit=crop&q=80',
  'smartwatches': 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&auto=format&fit=crop&q=80',
  'electronics-audio': 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&auto=format&fit=crop&q=80',
  'smartphones': 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&auto=format&fit=crop&q=80',
  'cosmetics-beauty': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop&q=80',
  'mobiles-laptops': 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&auto=format&fit=crop&q=80',
  'deals-offers': 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=400&auto=format&fit=crop&q=80',
  'home-household': 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&auto=format&fit=crop&q=80',
  'cleaning-household': 'https://images.unsplash.com/photo-1585421514738-01798e348b17?w=400&auto=format&fit=crop&q=80',
  'kitchen-dining': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=400&auto=format&fit=crop&q=80',
  'bathroom-personal-care': 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&auto=format&fit=crop&q=80',
  'electrical-electronics': 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=400&auto=format&fit=crop&q=80',
  'mobile-accessories': 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&auto=format&fit=crop&q=80',
  'stationery-office': 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=400&auto=format&fit=crop&q=80',
  'fashion-clothing': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&auto=format&fit=crop&q=80',
  'beauty-cosmetics': 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&auto=format&fit=crop&q=80',
  'toys-kids': 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=400&auto=format&fit=crop&q=80',
  'sports-fitness': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=400&auto=format&fit=crop&q=80',
  'automobile-accessories': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&auto=format&fit=crop&q=80',
  'tools-hardware': 'https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400&auto=format&fit=crop&q=80',
  'pet-supplies': 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&auto=format&fit=crop&q=80',
  'gifts-accessories': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop&q=80',
  'home-decor': 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400&auto=format&fit=crop&q=80',
  'books-education': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&auto=format&fit=crop&q=80'
};

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-4 h-4" />,
  Sparkles: <Sparkles className="w-4 h-4" />,
  Utensils: <Utensils className="w-4 h-4" />,
  Bath: <Bath className="w-4 h-4" />,
  Zap: <Zap className="w-4 h-4" />,
  Smartphone: <Smartphone className="w-4 h-4" />,
  PenTool: <PenTool className="w-4 h-4" />,
  Shirt: <Shirt className="w-4 h-4" />,
  Footprints: <Footprints className="w-4 h-4" />,
  Palette: <Palette className="w-4 h-4" />,
  Smile: <Smile className="w-4 h-4" />,
  Activity: <Activity className="w-4 h-4" />,
  ShoppingBag: <ShoppingBag className="w-4 h-4" />,
  Car: <Car className="w-4 h-4" />,
  Wrench: <Wrench className="w-4 h-4" />,
  Heart: <Heart className="w-4 h-4" />,
  Gift: <Gift className="w-4 h-4" />,
  Lamp: <Lamp className="w-4 h-4" />,
  BookOpen: <BookOpen className="w-4 h-4" />,
  Flame: <Flame className="w-4 h-4" />
};

export const CategoriesSection: React.FC = () => {
  const { categories, products, activeCategory, setActiveCategory } = useStore();
  const [viewStyle, setViewStyle] = useState<'visual' | 'compact'>('visual');

  const handleSelectCategory = (catName: string) => {
    setActiveCategory(catName);
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-12 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>SHOPPING APP CATEGORIES ({categories.length})</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight font-display">
              EXPLORE BY CATEGORY
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1">
              Browse curated store categories with mega launch discounts
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* View style toggle */}
            <div className="hidden sm:flex items-center bg-neutral-100 p-1 rounded-xl text-xs font-semibold">
              <button
                onClick={() => setViewStyle('visual')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  viewStyle === 'visual'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Visual Cards
              </button>
              <button
                onClick={() => setViewStyle('compact')}
                className={`px-3 py-1 rounded-lg transition-all cursor-pointer ${
                  viewStyle === 'compact'
                    ? 'bg-white text-neutral-900 shadow-xs'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
              >
                Compact Pills
              </button>
            </div>

            <button
              onClick={() => handleSelectCategory('all')}
              className={`text-xs font-bold px-4 py-2 rounded-xl transition-all cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-neutral-900 text-white shadow-sm'
                  : 'text-neutral-600 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200'
              }`}
            >
              All Products ({products.length})
            </button>
          </div>
        </div>

        {/* 20 Categories Grid */}
        {viewStyle === 'visual' ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-10 gap-2.5 sm:gap-3">
            {categories.map((cat) => {
              const count = products.filter(p => p.category === cat.name).length;
              const isSelected = activeCategory === cat.name;
              const catImg = categoryImages[cat.id] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80';

              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.name)}
                  className={`relative group overflow-hidden rounded-2xl text-left transition-all duration-300 cursor-pointer h-36 flex flex-col justify-end p-2.5 border ${
                    isSelected
                      ? 'border-amber-500 ring-2 ring-amber-500/30 scale-[1.03] shadow-md'
                      : 'border-neutral-200/80 hover:border-amber-400 hover:shadow-sm hover:scale-[1.02]'
                  }`}
                >
                  {/* Background Image */}
                  <img
                    src={catImg}
                    alt={cat.name}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />

                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 transition-opacity duration-300 ${
                    isSelected
                      ? 'bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-900/30 opacity-95'
                      : 'bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent group-hover:from-neutral-950/90'
                  }`} />

                  {/* Top Badge Icon */}
                  <div className="relative z-10 flex items-center justify-between w-full mb-auto">
                    <span className={`p-1.5 rounded-lg backdrop-blur-md transition-all ${
                      isSelected
                        ? 'bg-amber-500 text-neutral-950 shadow-xs font-bold'
                        : 'bg-neutral-900/70 text-amber-300 border border-neutral-700/60 group-hover:bg-amber-500 group-hover:text-neutral-950'
                    }`}>
                      {iconMap[cat.iconName] || <ShoppingBag className="w-3.5 h-3.5" />}
                    </span>

                    {count > 0 && (
                      <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500 text-neutral-950">
                        {count} {count === 1 ? 'item' : 'items'}
                      </span>
                    )}
                  </div>

                  {/* Bottom Text Content */}
                  <div className="relative z-10">
                    <h3 className={`text-[11px] font-bold leading-tight line-clamp-2 transition-colors ${
                      isSelected ? 'text-amber-400' : 'text-white group-hover:text-amber-300'
                    }`}>
                      {cat.name}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          /* Compact Pills View */
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
            {categories.map((cat) => {
              const count = products.filter(p => p.category === cat.name).length;
              const isSelected = activeCategory === cat.name;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleSelectCategory(cat.name)}
                  className={`p-2.5 rounded-xl text-left transition-all duration-200 flex items-center gap-2.5 border cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 ring-2 ring-amber-500/20 shadow-xs'
                      : 'bg-neutral-50 border-neutral-200 hover:bg-white hover:border-amber-300'
                  }`}
                >
                  <div className={`p-1.5 rounded-lg ${
                    isSelected ? 'bg-amber-500 text-neutral-950' : 'bg-white text-amber-600 shadow-2xs'
                  }`}>
                    {iconMap[cat.iconName] || <ShoppingBag className="w-4 h-4" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className={`text-xs font-bold line-clamp-1 ${
                      isSelected ? 'text-amber-900' : 'text-neutral-800'
                    }`}>
                      {cat.name}
                    </h3>
                    <p className="text-[10px] text-neutral-400">
                      {count > 0 ? `${count} available` : 'Browse'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
