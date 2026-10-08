import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Menu, 
  X, 
  ShieldCheck, 
  Tag, 
  Sparkles, 
  User, 
  ArrowRight
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const Header: React.FC = () => {
  const { 
    cartItemCount, 
    setIsCartOpen, 
    searchQuery, 
    setSearchQuery, 
    setActiveCategory, 
    websiteSettings,
    setIsAdminOpen,
    categories
  } = useStore();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const handleNavClick = (category: string) => {
    setActiveCategory(category);
    setMobileMenuOpen(false);
    // Smooth scroll to product grid
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Promotional Ticker / Banner */}
      <div className="bg-neutral-900 text-white text-xs py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-[11px] sm:text-xs">
          <div className="flex items-center gap-2 font-medium tracking-wide mx-auto sm:mx-0">
            <span className="text-amber-400 font-bold">{websiteSettings.megaDealBanner}</span>
            <span className="hidden md:inline text-neutral-400">· 🚚 FREE PAN-India Delivery On All Orders · Dispatched in 24–48h</span>
          </div>

          <div className="hidden sm:flex items-center gap-4 text-neutral-300">
            <span className="text-emerald-400 font-bold flex items-center gap-1.5 text-[11px]">
              <span>🚚 FREE DELIVERY</span>
            </span>
            <span className="text-neutral-600">|</span>
            <button 
              onClick={() => setIsAdminOpen(true)}
              className="hover:text-amber-400 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Admin Portal"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 text-neutral-700 hover:text-neutral-950 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            <button
              onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
              className="p-2 text-neutral-700 hover:text-neutral-950 sm:hidden"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <a 
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setActiveCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center gap-2.5 group"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-white shadow-sm shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <Sparkles className="w-5 h-5 text-neutral-950" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-950 font-display">
                  LUCKYDRAW<span className="text-amber-600">WIN</span>
                </span>
                <div className="text-[10px] text-neutral-500 tracking-wider font-semibold uppercase -mt-1 hidden sm:block">
                  All Items ₹9 – ₹99 Only
                </div>
              </div>
            </a>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-neutral-600">
            <button 
              onClick={() => {
                setActiveCategory('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="hover:text-amber-600 transition-colors cursor-pointer"
            >
              Home
            </button>
            <button 
              onClick={() => handleNavClick('all')}
              className="hover:text-amber-600 transition-colors cursor-pointer"
            >
              All Products
            </button>

            {/* Categories dropdown or direct */}
            <div className="relative group">
              <button 
                onClick={() => handleNavClick('all')}
                className="hover:text-amber-600 transition-colors flex items-center gap-1 cursor-pointer py-2"
              >
                <span>Categories</span>
                <span className="text-xs text-neutral-400 group-hover:rotate-180 transition-transform">▼</span>
              </button>
              <div className="absolute top-full left-0 w-64 bg-white border border-neutral-200 rounded-xl shadow-xl py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150 z-50">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => handleNavClick(cat.name)}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-amber-50 hover:text-amber-800 transition-colors flex items-center justify-between"
                  >
                    <span>{cat.name}</span>
                    <ArrowRight className="w-3 h-3 opacity-40" />
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={() => handleNavClick('Trending Products')}
              className="hover:text-amber-600 transition-colors cursor-pointer flex items-center gap-1 text-amber-700"
            >
              <Tag className="w-3.5 h-3.5" />
              <span>New Arrivals</span>
            </button>
            <button 
              onClick={() => handleNavClick('all')}
              className="hover:text-amber-600 transition-colors cursor-pointer text-emerald-700 font-bold"
            >
              Offers (₹9–₹99)
            </button>
          </nav>

          {/* Search Bar - Desktop & Tablet */}
          <div className="hidden sm:flex items-center flex-1 max-w-xs lg:max-w-sm mx-2">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search products under ₹99..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-100/90 hover:bg-neutral-100 focus:bg-white text-xs pl-10 pr-4 py-2.5 rounded-full border border-transparent focus:border-amber-500 focus:outline-none transition-all placeholder:text-neutral-400"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right Actions: Cart & Profile/Admin */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-neutral-700 hover:text-neutral-950 bg-neutral-100 hover:bg-neutral-200 rounded-lg transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-neutral-600" />
              <span>Admin / Staff</span>
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-neutral-950 text-white hover:bg-neutral-800 transition-all shadow-sm active:scale-95 cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold hidden sm:inline">Cart</span>
              {cartItemCount > 0 ? (
                <span className="bg-amber-500 text-neutral-950 font-extrabold text-[11px] px-1.5 py-0.2 rounded-full min-w-5 text-center">
                  {cartItemCount}
                </span>
              ) : (
                <span className="text-neutral-400 text-xs hidden sm:inline">0</span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Input Drawer (Visible when search icon tapped on mobile) */}
        {mobileSearchOpen && (
          <div className="sm:hidden px-4 pb-3 border-t border-neutral-100 bg-neutral-50 pt-2 animate-in slide-in-from-top-2">
            <div className="relative">
              <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                autoFocus
                placeholder="Search ₹9 to ₹99 items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-xs pl-10 pr-8 py-2.5 rounded-xl border border-neutral-300 focus:border-amber-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 text-xs"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Flyout Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-18 bg-white border-b border-neutral-200 shadow-2xl p-6 z-50 max-h-[85vh] overflow-y-auto animate-in slide-in-from-top-4">
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200/60 text-xs text-amber-900 font-medium">
                ⚡ <strong>Notice:</strong> LuckyDrawWin is an e-commerce retail store. All items strictly ₹9 to ₹99. Real physical products dispatched to your door.
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm font-semibold">
                <button
                  onClick={() => {
                    setActiveCategory('all');
                    setMobileMenuOpen(false);
                  }}
                  className="p-3 text-left bg-neutral-100 rounded-xl hover:bg-neutral-200"
                >
                  🏠 Home
                </button>
                <button
                  onClick={() => handleNavClick('all')}
                  className="p-3 text-left bg-neutral-100 rounded-xl hover:bg-neutral-200"
                >
                  🛍️ All Products
                </button>
                <button
                  onClick={() => handleNavClick('Trending Products')}
                  className="p-3 text-left bg-amber-100/60 text-amber-900 rounded-xl hover:bg-amber-100"
                >
                  🔥 Trending Deals
                </button>
                <button
                  onClick={() => {
                    setIsAdminOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="p-3 text-left bg-neutral-100 rounded-xl hover:bg-neutral-200"
                >
                  ⚙️ Admin Portal
                </button>
              </div>

              <div className="pt-2">
                <h4 className="text-xs uppercase tracking-wider font-bold text-neutral-400 mb-2">
                  Browse Categories
                </h4>
                <div className="space-y-1">
                  {categories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => handleNavClick(cat.name)}
                      className="w-full text-left py-2 px-3 text-xs font-medium text-neutral-700 hover:bg-neutral-100 rounded-lg flex items-center justify-between"
                    >
                      <span>{cat.name}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-500">
                <span>Support: {websiteSettings.supportPhone}</span>
                <button 
                  onClick={() => {
                    setMobileMenuOpen(false);
                    useStore().setIsTermsOpen(true);
                  }}
                  className="underline hover:text-neutral-900"
                >
                  Terms & Conditions
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
