'use client';

import React, { useState } from 'react';
import Header from '@/components/header';
import Footer from '@/components/footer';
import BundleSection from '@/components/bundleSection';
import HeroSection from '@/components/HeroSection';
import CategorySlider from '@/components/CategorySlider';
import FlashDeals from '@/components/FlashDeals';

export default function HomeLandingPage() {
  const [cartItemsCount, setCartItemsCount] = useState(0);

  const handleAddToCart = () => {
    setCartItemsCount((prev) => prev + 1);
  };

  return (
    <div className="main-viewport-container" style={{ width: '100%', backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Header />

      <HeroSection />

      <CategorySlider />

      <FlashDeals onAddToCart={handleAddToCart} />

      <section className="bundle-outer-wrapper">
        <BundleSection />
      </section>

      <Footer />
    </div>
  );
}