import React, { useState, useMemo } from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, Sparkles, LayoutGrid, List, Zap, RotateCcw } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

type PriceFilter = 'all' | 'under100' | 'under2000' | 'under5000';
type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating';

export const ProductGrid: React.FC = () => {
  const { 
    products, 
    activeCategory, 
    setActiveCategory, 
    searchQuery, 
    setSearchQuery,
    storefrontLayout,
    setStorefrontLayout,
    resetProductsToDefault
  } = useStore();

  const [priceFilter, setPriceFilter] = useState<PriceFilter>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('ldw_admin_auth') === 'true';

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // 1. Category filter
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false;
      }

      // 2. Search query filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = product.name.toLowerCase().includes(query);
        const matchCat = product.category.toLowerCase().includes(query);
        const matchDesc = product.description.toLowerCase().includes(query);
        if (!matchTitle && !matchCat && !matchDesc) return false;
      }

      // 3. Price range filter
      if (priceFilter === 'under100' && product.finalPrice > 100) return false;
      if (priceFilter === 'under2000' && product.finalPrice > 2000) return false;
      if (priceFilter === 'under5000' && product.finalPrice > 5000) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.finalPrice - b.finalPrice;
      if (sortBy === 'price-desc') return b.finalPrice - a.finalPrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, activeCategory, searchQuery, priceFilter, sortBy]);

  const resetFilters = () => {
    setActiveCategory('all');
    setSearchQuery('');
    setPriceFilter('all');
    setSortBy('featured');
  };

  return (
    <section id="products-section" className="py-14 bg-neutral-50 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 pb-6 border-b border-neutral-200">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Mega Unbeatable Price Deals</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight font-display">
              {activeCategory === 'all' ? 'EXPLORE ALL PRODUCTS' : activeCategory.toUpperCase()}
            </h2>
            <div className="flex items-center gap-3 mt-1 flex-wrap">
              <p className="text-xs sm:text-sm text-neutral-500">
                Showing {filteredProducts.length} verified products in stock
              </p>
              {isAdmin && (
                <button
                  onClick={resetProductsToDefault}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-800 hover:text-amber-950 bg-amber-50 hover:bg-amber-100 px-2.5 py-0.5 rounded-md border border-amber-200/80 transition-colors cursor-pointer"
                  title="Admin: Restore all default items"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Admin: Reset / Restore Default Items</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Price Range Segmented Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-200/80 rounded-xl overflow-x-auto max-w-full">
            <button
              onClick={() => setPriceFilter('all')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                priceFilter === 'all'
                  ? 'bg-white text-neutral-900 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              All Prices
            </button>
            <button
              onClick={() => setPriceFilter('under100')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                priceFilter === 'under100'
                  ? 'bg-amber-500 text-neutral-950 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Under ₹100
            </button>
            <button
              onClick={() => setPriceFilter('under2000')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                priceFilter === 'under2000'
                  ? 'bg-amber-500 text-neutral-950 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Under ₹2,000
            </button>
            <button
              onClick={() => setPriceFilter('under5000')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                priceFilter === 'under5000'
                  ? 'bg-amber-500 text-neutral-950 shadow-xs'
                  : 'text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Under ₹5,000
            </button>
          </div>
        </div>

        {/* Filter Bar with Sort Dropdown and Active Tag & Template Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-2xl border border-neutral-200/80 shadow-xs">
          
          <div className="flex items-center gap-2 text-xs font-medium text-neutral-600">
            <Filter className="w-4 h-4 text-amber-600" />
            <span>Active Filter:</span>
            <span className="font-bold text-neutral-900 bg-neutral-100 px-2.5 py-1 rounded-md">
              {activeCategory === 'all' ? 'All Categories' : activeCategory}
            </span>
            {searchQuery && (
              <span className="bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-[11px] font-semibold">
                "{searchQuery}"
              </span>
            )}
            {(activeCategory !== 'all' || searchQuery || priceFilter !== 'all') && (
              <button
                onClick={resetFilters}
                className="text-amber-700 hover:text-amber-900 underline text-xs ml-2 cursor-pointer font-semibold"
              >
                Clear all
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 ml-auto">
            {/* View Templates Switcher */}
            <div className="flex items-center bg-neutral-100 p-1 rounded-xl text-xs">
              <button
                onClick={() => setStorefrontLayout('grid')}
                className={`p-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  storefrontLayout === 'grid'
                    ? 'bg-white text-neutral-900 shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
                title="Modern Grid Template"
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Grid</span>
              </button>
              <button
                onClick={() => setStorefrontLayout('compact')}
                className={`p-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  storefrontLayout === 'compact'
                    ? 'bg-white text-neutral-900 shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
                title="Compact Flash Sale Template"
              >
                <Zap className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Flash Deals</span>
              </button>
              <button
                onClick={() => setStorefrontLayout('catalog')}
                className={`p-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer ${
                  storefrontLayout === 'catalog'
                    ? 'bg-white text-neutral-900 shadow-xs font-bold'
                    : 'text-neutral-500 hover:text-neutral-800'
                }`}
                title="Detailed Catalog List Template"
              >
                <List className="w-3.5 h-3.5" />
                <span className="hidden sm:inline text-[11px]">Catalog</span>
              </button>
            </div>

            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-neutral-50 text-neutral-900 text-xs font-bold py-1.5 px-3 rounded-lg border border-neutral-200 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                <option value="featured">Featured</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Grid Render by Template */}
        {filteredProducts.length > 0 ? (
          <div>
            {storefrontLayout === 'grid' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} variant="grid" />
                ))}
              </div>
            )}

            {storefrontLayout === 'compact' && (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} variant="compact" />
                ))}
              </div>
            )}

            {storefrontLayout === 'catalog' && (
              <div className="space-y-4">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} variant="catalog" />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-16 bg-white rounded-3xl border border-neutral-200 p-8 max-w-lg mx-auto shadow-xs">
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 mx-auto mb-4 text-2xl">
              🔍
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-1">
              No products found
            </h3>
            <p className="text-xs text-neutral-500 mb-5">
              We couldn't find any products matching your active filters. Try clearing your search query or selecting "All Categories".
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
