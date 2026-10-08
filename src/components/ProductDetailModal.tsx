import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  ShoppingCart, 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  ChevronRight,
  PackageCheck,
  Trash2
} from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

export const ProductDetailModal: React.FC = () => {
  const { 
    selectedProduct, 
    setSelectedProduct, 
    addToCart, 
    startDirectCheckout,
    deleteProduct,
    products 
  } = useStore();

  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('ldw_admin_auth') === 'true';

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (selectedProduct) {
      setSelectedColor(selectedProduct.colors?.[0]?.name || '');
      setSelectedImageIndex(0);
      setQuantity(1);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const displayPrice = selectedProduct.finalPrice;
  const discountPercent = selectedProduct.originalPrice > displayPrice
    ? Math.round(((selectedProduct.originalPrice - displayPrice) / selectedProduct.originalPrice) * 100)
    : null;

  // Active color object
  const activeColorObj = selectedProduct.colors?.find(c => c.name === selectedColor);
  const activeImage = (selectedImageIndex === 0 && activeColorObj?.image) 
    ? activeColorObj.image 
    : (selectedProduct.images?.[selectedImageIndex] || selectedProduct.images?.[0]);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity, selectedColor || undefined);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  const handleBuyNow = () => {
    startDirectCheckout(selectedProduct, quantity, selectedColor || undefined);
    setSelectedProduct(null);
  };

  // Related products
  const relatedProducts = products
    .filter(p => p.id !== selectedProduct.id)
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      
      {/* Modal Dialog Card */}
      <div 
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-auto animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-5 sm:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            
            {/* Left: Gallery & Images */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-2xl bg-neutral-100 border border-neutral-200 overflow-hidden flex items-center justify-center">
                
                {/* Badges */}
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
                  <span className="px-3 py-1 bg-amber-500 text-neutral-950 font-black text-xs rounded-lg uppercase tracking-tight shadow-sm">
                    {selectedProduct.badge || `₹${displayPrice.toLocaleString('en-IN')} ONLY`}
                  </span>
                  {selectedProduct.energyBadge && (
                    <span className="px-2.5 py-1 bg-gradient-to-r from-emerald-600 to-green-500 text-white font-black text-xs rounded-lg shadow-sm">
                      ★ {selectedProduct.energyBadge} BEE Certified
                    </span>
                  )}
                </div>

                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={selectedProduct.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center p-6 text-neutral-400">
                    <span className="text-4xl">📦</span>
                    <p className="text-xs font-semibold mt-2">{selectedProduct.category}</p>
                  </div>
                )}
              </div>

              {/* Thumbnails */}
              {selectedProduct.images && selectedProduct.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {selectedProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`w-16 h-16 rounded-xl border-2 overflow-hidden shrink-0 transition-all cursor-pointer ${
                        selectedImageIndex === idx 
                          ? 'border-amber-500 ring-2 ring-amber-500/20' 
                          : 'border-neutral-200 hover:border-neutral-400 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Callout */}
              <div className="p-3.5 bg-neutral-50 rounded-xl border border-neutral-200/80 text-xs text-neutral-600 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-neutral-800">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Genuine Lucky-Draw Platform</span>
                </div>
                <p className="text-[11px] text-neutral-500">
                  Winners selected per pre-announced rules. If selected, a platform fee of ₹1,499 applies for order processing & fulfillment.
                </p>
              </div>
            </div>

            {/* Right: Product Purchase Module */}
            <div className="space-y-5">
              
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-amber-600">
                  {selectedProduct.category}
                </span>
                
                <div className="flex items-center gap-2 flex-wrap mt-1">
                  <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 font-display leading-tight">
                    {selectedProduct.name}
                  </h2>
                  {(selectedProduct.variant || selectedProduct.storage) && (
                    <span className="px-2.5 py-0.5 rounded-lg bg-amber-100 border border-amber-300 text-amber-950 font-black text-xs">
                      {selectedProduct.variant || selectedProduct.storage}
                    </span>
                  )}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2 flex-wrap">
                  <div className="flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-900 px-2 py-0.5 rounded text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                    <span>{selectedProduct.rating.toFixed(1)}</span>
                  </div>
                  <span className="text-xs text-neutral-500">
                    Based on {selectedProduct.reviewCount.toLocaleString('en-IN')} reviews
                  </span>
                  {selectedProduct.boughtInPastMonth && (
                    <span className="text-xs font-bold text-neutral-800 bg-amber-100/80 border border-amber-300/60 px-2 py-0.5 rounded-md flex items-center gap-1">
                      🛒 {selectedProduct.boughtInPastMonth}
                    </span>
                  )}
                </div>
              </div>

              {/* Price Block */}
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-200/80">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-neutral-950 font-display tabular-nums">
                    ₹{displayPrice.toLocaleString('en-IN')}
                  </span>
                  {selectedProduct.originalPrice > displayPrice && (
                    <span className="text-base text-neutral-400 line-through tabular-nums">
                      ₹{selectedProduct.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {discountPercent && (
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-extrabold rounded-md">
                      SAVE {discountPercent}%
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-emerald-700 font-bold mt-1.5 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  <span>Verified physical product in stock. Inclusive of all taxes.</span>
                </div>
              </div>

              {/* Color Selection (Mandatory for items with colors) */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div className="space-y-2 p-3 bg-neutral-50/70 rounded-2xl border border-neutral-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-800 uppercase tracking-wider">
                      Select Color:
                    </span>
                    <span className="text-xs font-bold text-amber-900 bg-amber-100/70 px-2 py-0.5 rounded-md">
                      {selectedColor}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap pt-1">
                    {selectedProduct.colors.map((c) => {
                      const isSelected = selectedColor === c.name;
                      return (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => {
                            setSelectedColor(c.name);
                            if (c.image) {
                              setSelectedImageIndex(0);
                            }
                          }}
                          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 border cursor-pointer ${
                            isSelected
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm ring-2 ring-amber-500'
                              : 'bg-white text-neutral-700 border-neutral-300 hover:border-neutral-500'
                          }`}
                        >
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-neutral-400/50 shrink-0"
                            style={{ backgroundColor: c.hex }}
                          />
                          <span>{c.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-neutral-700 uppercase tracking-wider">
                  Quantity:
                </span>
                <div className="flex items-center border border-neutral-300 rounded-xl overflow-hidden bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center hover:bg-neutral-100 font-bold text-neutral-600 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-bold text-xs text-neutral-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 flex items-center justify-center hover:bg-neutral-100 font-bold text-neutral-600 transition-colors"
                  >
                    +
                  </button>
                </div>
                <span className="text-xs text-neutral-500">
                  Total: <strong className="text-neutral-900 font-display">₹{(displayPrice * quantity).toLocaleString('en-IN')}</strong>
                </span>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={handleAddToCart}
                  className={`py-3.5 px-4 rounded-xl font-bold text-xs transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm ${
                    isAdded 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border border-neutral-300'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4" />
                      <span>ADD TO CART</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-4 rounded-xl font-black text-xs bg-amber-500 hover:bg-amber-400 active:scale-98 text-neutral-950 transition-all flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <Zap className="w-4 h-4 fill-neutral-950" />
                  <span>BUY NOW</span>
                </button>
              </div>

              {isAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    deleteProduct(selectedProduct.id);
                    setSelectedProduct(null);
                  }}
                  className="w-full py-2.5 px-4 rounded-xl font-bold text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors flex items-center justify-center gap-2 cursor-pointer mt-1"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>ADMIN: REMOVE PRODUCT FROM STORE</span>
                </button>
              )}

              {/* Description */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-1">
                  Product Overview
                </h4>
                <p className="text-xs text-neutral-600 leading-relaxed">
                  {selectedProduct.description}
                </p>
              </div>

              {/* Key Features */}
              {selectedProduct.features && selectedProduct.features.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                    Key Features
                  </h4>
                  <ul className="grid grid-cols-2 gap-2 text-xs text-neutral-700">
                    {selectedProduct.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specifications Table */}
              {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 && (
                <div className="border-t border-neutral-200 pt-3">
                  <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider mb-2">
                    Specifications
                  </h4>
                  <div className="divide-y divide-neutral-100 text-xs">
                    {Object.entries(selectedProduct.specs).map(([key, val]) => (
                      <div key={key} className="py-1.5 flex justify-between">
                        <span className="text-neutral-500">{key}</span>
                        <span className="font-semibold text-neutral-900">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Badges Strip */}
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-neutral-200 text-center text-[10px] text-neutral-500 font-semibold">
                <div className="p-2 bg-neutral-50 rounded-lg">
                  <Truck className="w-4 h-4 mx-auto mb-1 text-amber-600" />
                  <span>Pan-India Dispatch</span>
                </div>
                <div className="p-2 bg-neutral-50 rounded-lg">
                  <ShieldCheck className="w-4 h-4 mx-auto mb-1 text-emerald-600" />
                  <span>Genuine Products</span>
                </div>
                <div className="p-2 bg-neutral-50 rounded-lg">
                  <RotateCcw className="w-4 h-4 mx-auto mb-1 text-blue-600" />
                  <span>7-Day Replacement</span>
                </div>
              </div>

            </div>

          </div>

          {/* Related Products Carousel */}
          {relatedProducts.length > 0 && (
            <div className="mt-10 pt-6 border-t border-neutral-200">
              <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wider mb-4">
                You May Also Like
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map(rel => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setSelectedProduct(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-neutral-50 hover:bg-neutral-100 border border-neutral-200 transition-colors cursor-pointer group"
                  >
                    <img
                      src={rel.images[0]}
                      alt={rel.name}
                      className="w-14 h-14 rounded-xl object-cover bg-neutral-200 shrink-0 group-hover:scale-105 transition-transform"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-neutral-900 truncate group-hover:text-amber-600">
                        {rel.name}
                      </p>
                      <p className="text-xs font-extrabold text-neutral-950 font-display mt-0.5">
                        ₹{rel.finalPrice.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
