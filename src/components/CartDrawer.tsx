import React from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Plus, Minus } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateCartQuantity, 
    cartSubtotal, 
    deliveryFee, 
    cartGrandTotal,
    shippingSettings,
    setIsCheckoutOpen
  } = useStore();

  if (!isCartOpen) return null;

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-neutral-950/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      
      {/* Slide-out Panel */}
      <div 
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cart Header */}
        <div className="p-5 border-b border-neutral-200 flex items-center justify-between bg-neutral-50/50">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-600" />
            <h2 className="text-base font-extrabold text-neutral-900 font-display">
              YOUR SHOPPING CART
            </h2>
            <span className="text-xs bg-neutral-200 text-neutral-800 font-bold px-2 py-0.5 rounded-full">
              {cart.reduce((s, i) => s + i.quantity, 0)} items
            </span>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 rounded-full text-neutral-500 hover:text-neutral-900 hover:bg-neutral-200 transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-neutral-100">
          {cart.length > 0 ? (
            cart.map((item, idx) => {
              const itemTotal = item.product.finalPrice * item.quantity;
              const colorObj = item.product.colors?.find(c => c.name === item.selectedColor);
              const itemImg = colorObj?.image || item.product.images[0];

              return (
                <div key={`${item.product.id}-${item.selectedColor || idx}`} className="py-4 first:pt-0 last:pb-0 flex gap-3.5 items-start">
                  
                  {/* Thumbnail */}
                  <img
                    src={itemImg}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 rounded-xl object-cover bg-neutral-100 border border-neutral-200 shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <h4 className="text-xs font-bold text-neutral-900 line-clamp-2 leading-snug">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.product.id, item.selectedColor)}
                        className="text-neutral-400 hover:text-rose-600 transition-colors p-1 -mr-1 cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Color selection label */}
                    {item.selectedColor && (
                      <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-neutral-100 border border-neutral-200 text-[10px] font-semibold text-neutral-700 mt-1">
                        {colorObj?.hex && (
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-neutral-400/50"
                            style={{ backgroundColor: colorObj.hex }}
                          />
                        )}
                        <span>{item.selectedColor}</span>
                      </div>
                    )}

                    <p className="text-[11px] text-amber-600 font-semibold mt-1">
                      ₹{item.product.finalPrice.toLocaleString('en-IN')} each
                    </p>

                    {/* Stepper & Line Total */}
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity - 1, item.selectedColor)}
                          className="p-1 hover:bg-neutral-200 text-neutral-600 rounded-l transition-colors cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-neutral-800 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.quantity + 1, item.selectedColor)}
                          className="p-1 hover:bg-neutral-200 text-neutral-600 rounded-r transition-colors cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-xs font-extrabold text-neutral-950 font-display tabular-nums">
                        ₹{itemTotal.toLocaleString('en-IN')}
                      </span>
                    </div>

                  </div>
                </div>
              );
            })
          ) : (
            /* Empty Cart View */
            <div className="h-full flex flex-col items-center justify-center text-center py-16 px-4">
              <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-neutral-900">Your cart is empty</h3>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                Explore our catalog of smartphones, smartwatches, and appliances at unbelievable prices.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-6 px-6 py-2.5 rounded-xl bg-amber-500 text-neutral-950 text-xs font-bold hover:bg-amber-400 transition-colors cursor-pointer"
              >
                Start Shopping Now
              </button>
            </div>
          )}
        </div>

        {/* Cart Footer Breakdown */}
        {cart.length > 0 && (
          <div className="p-5 border-t border-neutral-200 bg-neutral-50/70 space-y-4">
            
            {/* Free Shipping Indicator */}
            <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-[11px] text-emerald-800 font-semibold flex items-center gap-1.5">
              <span>🚚</span>
              <span>100% FREE PAN-India Delivery on all orders!</span>
            </div>

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-neutral-600">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-bold text-neutral-900 tabular-nums">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charges:</span>
                <span className="tabular-nums">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `₹${deliveryFee}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-neutral-950 pt-2 border-t border-neutral-200">
                <span>Grand Total:</span>
                <span className="font-display text-base tabular-nums">₹{cartGrandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout CTA */}
            <button
              onClick={handleProceedToCheckout}
              className="w-full py-3.5 px-4 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white font-extrabold text-xs tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>PROCEED TO CHECKOUT (3 STEPS)</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe & Verified UPI QR Code Payment</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
