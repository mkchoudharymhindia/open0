import React from 'react';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategoriesSection } from './components/CategoriesSection';
import { PromoBannersShowcase } from './components/PromoBannersShowcase';
import { ProductGrid } from './components/ProductGrid';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CheckoutFlow } from './components/CheckoutFlow';
import { OrderConfirmationModal } from './components/OrderConfirmationModal';
import { InvoiceModal } from './components/InvoiceModal';
import { TermsModal } from './components/TermsModal';
import { AdminPanel } from './components/AdminPanel';
import { MobileBottomNav } from './components/MobileBottomNav';
import { Toast } from './components/Toast';

export default function App() {
  return (
    <StoreProvider>
      <div className="min-h-screen bg-neutral-50 text-neutral-900 flex flex-col font-sans selection:bg-amber-500 selection:text-white pb-14 lg:pb-0">
        
        {/* Navigation Header */}
        <Header />

        {/* Main Content Sections */}
        <main className="flex-1">
          {/* Hero Section */}
          <Hero />

          {/* 9 Product Categories Showcase */}
          <CategoriesSection />

          {/* Featured Deal Banner Templates */}
          <PromoBannersShowcase />

          {/* Large Responsive Product Grid */}
          <ProductGrid />
        </main>

        {/* Global Footer */}
        <Footer />

        {/* Mobile Sticky Quick Navigation */}
        <MobileBottomNav />

        {/* Overlays, Drawers & Modals */}
        <ProductDetailModal />
        <CartDrawer />
        <CheckoutFlow />
        <OrderConfirmationModal />
        <InvoiceModal />
        <TermsModal />
        <AdminPanel />
        <Toast />

      </div>
    </StoreProvider>
  );
}
