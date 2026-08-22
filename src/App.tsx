/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { PromoBanner } from './components/PromoBanner';
import { BestsellersSection } from './components/BestsellersSection';
import { AnimatedProductCarousel } from './components/AnimatedProductCarousel';
import { TrendingSection } from './components/TrendingSection';
import { WhyShowOn } from './components/WhyShowOn';
import { LeadCaptureSection } from './components/LeadCaptureSection';
import { SocialGallery } from './components/SocialGallery';
import { Footer } from './components/Footer';
import { ShopView } from './components/ShopView';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { CheckoutModal } from './components/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { AboutModal } from './components/AboutModal';
import { ContactModal } from './components/ContactModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { UserAuthModal } from './components/UserAuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AdminAuthModal } from './components/AdminAuthModal';
import { AdminDashboard } from './components/AdminDashboard';
import { ToastNotification } from './components/ToastNotification';

const AppContent: React.FC = () => {
  const { currentView } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#F7F3EE] text-[#292725]">
      {/* Navigation Header */}
      <Header />
      <MobileMenu />

      {/* Main Content Pages / Views */}
      <main className="flex-1">
        {currentView === 'admin' ? (
          <AdminDashboard />
        ) : currentView === 'home' ? (
          <>
            <Hero />
            <CategorySection />
            <PromoBanner />
            <BestsellersSection />
            <AnimatedProductCarousel />
            <TrendingSection />
            <WhyShowOn />
            <LeadCaptureSection />
            <SocialGallery />
          </>
        ) : (
          <ShopView />
        )}
      </main>

      {/* Multi-Column Footer */}
      {currentView !== 'admin' && <Footer />}

      {/* Global Modals, Slide-overs & Notifications */}
      <ProductDetailModal />
      <UserAuthModal />
      <UserProfileModal />
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <CheckoutModal />
      <OrderTrackingModal />
      <AdminAuthModal />
      <SizeGuideModal />
      <AboutModal />
      <ContactModal />
      <ToastNotification />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <AppContent />
    </ShopProvider>
  );
}


