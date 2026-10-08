import React, { useState } from 'react';
import { Star, ShoppingCart, Zap, Check, Eye, ShieldCheck, Tag, Heart, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  variant?: 'grid' | 'compact' | 'catalog';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'grid' }) => {
  const { addToCart, startDirectCheckout, setSelectedProduct, toggleWishlist, isInWishlist, deleteProduct } = useStore();
  const [imageError, setImageError] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string>(
    product.colors?.[0]?.name || ''
  );

  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('ldw_admin_auth') === 'true';

  const handleRemoveProduct = (e: React.MouseEvent) => {
    e.stopPropagation();
    deleteProduct(product.id);
  };

  const displayPrice = product.finalPrice;
  const isWishlisted = isInWishlist(product.id);

  // Calculate discount percentage if original price is higher
  const discountPercent = product.originalPrice > displayPrice
    ? Math.round(((product.originalPrice - displayPrice) / product.originalPrice) * 100)
    : null;

  // Determine badge text
  const badgeText = product.badge || `₹${displayPrice.toLocaleString('en-IN')} ONLY`;

  // Find image matching color or default image
  const currentColorObj = product.colors?.find(c => c.name === selectedColor);
  const activeImage = currentColorObj?.image || product.images?.[0];

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1, selectedColor || undefined);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    startDirectCheckout(product, 1, selectedColor || undefined);
  };

  // --- CATALOG HORIZONTAL TEMPLATE ---
  if (variant === 'catalog') {
    return (
      <div 
        onClick={() => setSelectedProduct(product)}
        className="group relative bg-white rounded-2xl border border-neutral-200 hover:border-amber-400 p-4 sm:p-5 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col md:flex-row gap-5 cursor-pointer"
      >
        {/* Media Thumbnail */}
        <div className="relative w-full md:w-56 h-48 md:h-auto rounded-xl bg-neutral-100 overflow-hidden shrink-0 flex items-center justify-center">
          <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
            <span className="px-2.5 py-1 bg-amber-500 text-neutral-950 text-xs font-black rounded-md tracking-tight uppercase shadow-xs">
              {badgeText}
            </span>
            {discountPercent ? (
              <span className="px-2 py-0.5 bg-rose-500 text-white text-[10px] font-bold rounded shadow-xs">
                {discountPercent}% OFF
              </span>
            ) : null}
          </div>

          {/* Wishlist & Remove Buttons */}
          <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className={`w-8 h-8 rounded-full bg-white/95 hover:bg-white shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-90 ${
                isWishlisted ? 'text-rose-500 ring-2 ring-rose-400' : 'text-neutral-500 hover:text-rose-500'
              }`}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            {isAdmin && (
              <button
                type="button"
                onClick={handleRemoveProduct}
                className="w-8 h-8 rounded-full bg-white/95 hover:bg-rose-500 text-neutral-400 hover:text-white shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-90 border border-neutral-200/50"
                title="Admin: Remove product from store"
                aria-label="Admin Remove product"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          {!imageError && activeImage ? (
            <img
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-amber-50 text-neutral-400">
              <span className="text-3xl">📦</span>
              <span className="text-xs font-bold text-neutral-600 mt-1">{product.category}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="flex-1 flex flex-col justify-between gap-3">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
              <span className="uppercase tracking-wider font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-600 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                <span>{product.rating.toFixed(1)}</span>
                <span className="text-neutral-400 text-[11px]">({product.reviewCount} reviews)</span>
              </div>
            </div>

            <h3 className="font-bold text-base sm:text-lg text-neutral-900 group-hover:text-amber-600 transition-colors leading-snug">
              {product.name}
            </h3>

            {product.boughtInPastMonth && (
              <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md w-fit mt-1.5">
                <span>🛒</span>
                <span>{product.boughtInPastMonth}</span>
              </div>
            )}

            <p className="text-xs text-neutral-600 line-clamp-2 mt-1.5 leading-relaxed">
              {product.description}
            </p>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-3 flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <span className="text-[11px] font-bold text-neutral-500">Colors:</span>
                <div className="flex items-center gap-1.5">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                      className={`w-5 h-5 rounded-full border transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'ring-2 ring-amber-500 ring-offset-1 scale-110 border-neutral-900'
                          : 'border-neutral-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
                {selectedColor && (
                  <span className="text-xs font-semibold text-neutral-700 ml-1">
                    ({selectedColor})
                  </span>
                )}
              </div>
            )}

            {/* Feature Highlights */}
            {product.features && product.features.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2.5">
                {product.features.slice(0, 3).map((feat, i) => (
                  <span key={i} className="text-[10px] font-medium bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded-md">
                    ✓ {feat}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Pricing & CTA Row */}
          <div className="pt-3 border-t border-neutral-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-neutral-950 font-display tabular-nums">
                ₹{displayPrice.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > displayPrice && (
                <span className="text-xs text-neutral-400 line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Verified Price
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleAddToCart}
                className={`py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  isAdded ? 'bg-emerald-600 text-white' : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
                }`}
              >
                {isAdded ? <Check className="w-3.5 h-3.5" /> : <ShoppingCart className="w-3.5 h-3.5" />}
                <span>{isAdded ? 'Added' : 'Add to Cart'}</span>
              </button>

              <button
                onClick={handleBuyNow}
                className="py-2 px-4 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 text-neutral-950 transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5 fill-neutral-950" />
                <span>BUY NOW</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- COMPACT FLASH DEALS TEMPLATE ---
  if (variant === 'compact') {
    return (
      <div 
        onClick={() => setSelectedProduct(product)}
        className="group relative bg-white rounded-xl border border-neutral-200 hover:border-amber-400 p-2.5 shadow-2xs hover:shadow-md transition-all duration-200 flex flex-col justify-between cursor-pointer"
      >
        <div className="relative aspect-square w-full rounded-lg bg-neutral-100 overflow-hidden mb-2">
          <span className="absolute top-1.5 left-1.5 z-10 px-1.5 py-0.5 bg-amber-500 text-neutral-950 text-[10px] font-black rounded uppercase">
            ₹{displayPrice.toLocaleString('en-IN')}
          </span>
          {/* Action Buttons: Wishlist & Remove */}
          <div className="absolute top-1.5 right-1.5 z-20 flex items-center gap-1">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className={`w-6 h-6 rounded-full bg-white/95 shadow-xs flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-90 ${
                isWishlisted ? 'text-rose-500 ring-1 ring-rose-300' : 'text-neutral-500 hover:text-rose-500'
              }`}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              aria-label="Wishlist"
            >
              <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            {isAdmin && (
              <button
                type="button"
                onClick={handleRemoveProduct}
                className="w-6 h-6 rounded-full bg-white/95 hover:bg-rose-500 text-neutral-400 hover:text-white shadow-xs flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-90"
                title="Admin: Remove product"
                aria-label="Admin Remove product"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            )}
          </div>
          {!imageError && activeImage ? (
            <img
              src={activeImage}
              alt={product.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xl bg-neutral-100">📦</div>
          )}
        </div>

        <div>
          <h4 className="font-bold text-xs text-neutral-900 group-hover:text-amber-600 line-clamp-1">
            {product.name}
          </h4>

          {/* Color dots preview */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1 mt-1" onClick={(e) => e.stopPropagation()}>
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setSelectedColor(c.name)}
                  title={c.name}
                  className={`w-3.5 h-3.5 rounded-full border cursor-pointer ${
                    selectedColor === c.name ? 'ring-1 ring-amber-500 border-neutral-900 scale-110' : 'border-neutral-300'
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-1.5">
            <span className="text-sm font-black text-neutral-950 font-display">
              ₹{displayPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] text-amber-700 font-semibold flex items-center gap-0.5">
              ★ {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="mt-2 w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-black text-[11px] rounded-lg transition-all flex items-center justify-center gap-1 cursor-pointer"
        >
          <Zap className="w-3 h-3 fill-neutral-950" />
          <span>BUY ₹{displayPrice.toLocaleString('en-IN')}</span>
        </button>
      </div>
    );
  }

  // --- STANDARD MODERN GRID TEMPLATE ---
  return (
    <div 
      onClick={() => setSelectedProduct(product)}
      className="group relative bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-amber-400/80 transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Top Media Container */}
      <div className="relative aspect-square w-full bg-neutral-100 overflow-hidden flex items-center justify-center">
        
        {/* Promotional Price Pill / Tag */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          <span className="px-2.5 py-1 bg-amber-500 text-neutral-950 text-[11px] font-black rounded-md tracking-tight shadow-sm uppercase">
            {badgeText}
          </span>
          {discountPercent ? (
            <span className="px-2 py-0.5 bg-rose-500 text-white text-[10px] font-black rounded-md tracking-tight shadow-xs">
              {discountPercent}% OFF
            </span>
          ) : null}
          {product.isTrending && (
            <span className="px-2 py-0.5 bg-neutral-900 text-white text-[10px] font-bold rounded-md tracking-tight shadow-xs">
              🔥 POPULAR
            </span>
          )}
        </div>

        {/* Top Right Actions: Wishlist, Remove & Energy Badge */}
        <div className="absolute top-2.5 right-2.5 z-20 flex flex-col gap-1.5 items-end">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlist(product.id);
              }}
              className={`w-8 h-8 rounded-full bg-white/95 hover:bg-white shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-90 ${
                isWishlisted ? 'text-rose-500 ring-2 ring-rose-400' : 'text-neutral-500 hover:text-rose-500'
              }`}
              title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              aria-label="Wishlist"
            >
              <Heart className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>

            {isAdmin && (
              <button
                type="button"
                onClick={handleRemoveProduct}
                className="w-8 h-8 rounded-full bg-white/95 hover:bg-rose-500 text-neutral-400 hover:text-white shadow-md flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-90 border border-neutral-200/50"
                title="Admin: Remove product from store"
                aria-label="Admin Remove product"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          {product.energyBadge && (
            <span className="px-2 py-0.5 bg-gradient-to-r from-emerald-600 to-green-500 text-white text-[10px] font-black rounded-md tracking-tight shadow-sm flex items-center gap-0.5">
              ★ {product.energyBadge} BEE
            </span>
          )}
        </div>

        {/* Product Image with Fallback */}
        {!imageError && activeImage ? (
          <img
            src={activeImage}
            alt={product.name}
            referrerPolicy="no-referrer"
            onError={() => setImageError(true)}
            className="w-full h-full object-cover object-center group-hover:scale-106 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 bg-gradient-to-tr from-neutral-100 via-amber-50/40 to-neutral-200 text-neutral-400">
            <span className="text-3xl mb-1">📦</span>
            <span className="text-[11px] font-bold text-neutral-600 text-center line-clamp-1">{product.category}</span>
            <span className="text-[10px] text-neutral-400">LuckyDrawWin</span>
          </div>
        )}

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 bg-neutral-950/20 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-3 pointer-events-none">
          <span className="px-3 py-1.5 bg-white/95 text-neutral-900 text-xs font-bold rounded-lg shadow-lg flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform">
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between gap-2.5">
        <div>
          {/* Category & Rating Row */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 truncate max-w-[140px]">
              {product.category}
            </span>

            <div className="flex items-center gap-1 text-amber-600 shrink-0 font-semibold text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
              <span>{product.rating.toFixed(1)}</span>
              <span className="text-[10px] text-neutral-400">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Title */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <h3 className="font-bold text-sm text-neutral-900 group-hover:text-amber-600 transition-colors line-clamp-1 leading-snug">
              {product.name}
            </h3>
            {(product.variant || product.storage) && (
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 shrink-0">
                {product.variant || product.storage}
              </span>
            )}
          </div>

          <p className="text-[11px] text-neutral-500 line-clamp-1 mt-0.5">
            {product.description}
          </p>

          {product.boughtInPastMonth && (
            <div className="flex items-center gap-1 text-[10px] font-bold text-neutral-700 bg-amber-50 border border-amber-200/60 px-1.5 py-0.5 rounded w-fit mt-1">
              <span>🛒</span>
              <span>{product.boughtInPastMonth}</span>
            </div>
          )}

          {/* Color Selection Options */}
          {product.colors && product.colors.length > 0 && (
            <div 
              className="mt-2.5 pt-2 border-t border-neutral-100 flex items-center justify-between gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                  Color:
                </span>
                <div className="flex items-center gap-1">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                      className={`w-4 h-4 rounded-full border transition-all cursor-pointer ${
                        selectedColor === c.name
                          ? 'ring-2 ring-amber-500 ring-offset-1 scale-110 border-neutral-900'
                          : 'border-neutral-300 hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              {selectedColor && (
                <span className="text-[10px] font-semibold text-neutral-600 truncate max-w-[90px]">
                  {selectedColor}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Pricing Block */}
        <div className="pt-2 border-t border-neutral-100">
          <div className="flex items-baseline gap-2 mb-2.5">
            <span className="text-xl font-extrabold text-neutral-950 font-display tabular-nums">
              ₹{displayPrice.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > displayPrice && (
              <span className="text-xs text-neutral-400 line-through tabular-nums">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-[10px] text-emerald-700 font-bold ml-auto bg-emerald-50 px-1.5 py-0.5 rounded">
              Verified
            </span>
          </div>

          {/* Action Buttons: ADD TO CART & BUY NOW */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handleAddToCart}
              className={`py-2 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                isAdded 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-800'
              }`}
              title="Add to shopping cart"
            >
              {isAdded ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Added</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-3.5 h-3.5 text-neutral-600" />
                  <span>ADD TO CART</span>
                </>
              )}
            </button>

            <button
              onClick={handleBuyNow}
              className="py-2 px-2 rounded-xl text-xs font-black bg-amber-500 hover:bg-amber-400 active:scale-95 text-neutral-950 transition-all flex items-center justify-center gap-1 shadow-xs hover:shadow-sm cursor-pointer"
              title="Buy now with 3-step checkout"
            >
              <Zap className="w-3.5 h-3.5 fill-neutral-950" />
              <span>BUY NOW</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
