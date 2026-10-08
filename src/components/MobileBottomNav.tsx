import React from 'react';
import { Home, Grid, ShoppingBag, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const MobileBottomNav: React.FC = () => {
  const { 
    cartItemCount, 
    setIsCartOpen, 
    setActiveCategory, 
    setIsAdminOpen 
  } = useStore();

  const handleHomeClick = () => {
    setActiveCategory('all');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProductsClick = () => {
    const el = document.getElementById('products-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-200 px-4 py-2.5 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto text-[11px] font-bold text-neutral-600">
        
        {/* Home */}
        <button
          onClick={handleHomeClick}
          className="flex flex-col items-center gap-1 hover:text-amber-600 transition-colors cursor-pointer"
        >
          <Home className="w-5 h-5 text-neutral-700" />
          <span>Home</span>
        </button>

        {/* Explore Products */}
        <button
          onClick={handleProductsClick}
          className="flex flex-col items-center gap-1 hover:text-amber-600 transition-colors cursor-pointer"
        >
          <Grid className="w-5 h-5 text-neutral-700" />
          <span>₹9–₹99 Store</span>
        </button>

        {/* Cart Button */}
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative flex flex-col items-center gap-1 hover:text-amber-600 transition-colors cursor-pointer"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5 text-neutral-900" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-500 text-neutral-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </div>
          <span>Cart</span>
        </button>

        {/* Admin Portal */}
        <button
          onClick={() => setIsAdminOpen(true)}
          className="flex flex-col items-center gap-1 hover:text-amber-600 transition-colors cursor-pointer text-neutral-700"
        >
          <ShieldCheck className="w-5 h-5 text-amber-600" />
          <span>Admin</span>
        </button>

      </div>
    </div>
  );
};
