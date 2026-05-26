import React, { useState } from 'react';
import ProductCard from './productCart';

interface FlashDealsProps {
  onAddToCart: () => void;
}

const dummyProducts = [
  { title: 'LANEIGE Lip Sleeping Mask', price: 1199.00, originalPrice: 1499.00, discountBadge: '-20%', status: 'Available' as const, rating: 4.5, category: 'Makeup', image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=500&q=80' },
  { title: 'Blush Bold Blurring Powder', price: 1650.00, originalPrice: 1800.00, discountBadge: '-8%', status: 'Available' as const, rating: 5.0, category: 'Trending', image: 'https://images.unsplash.com/photo-1631730359577-38e4755d772b?auto=format&fit=crop&w=500&q=80' },
  { title: 'Luxe Length Nail Gloss', price: 799.00, status: 'Sold Out' as const, rating: 4.0, category: 'Cosmetics', image: 'https://images.unsplash.com/photo-1604654894610-df4906b185af?auto=format&fit=crop&w=500&q=80' },
  { title: 'Enriched Hand Wash', price: 550.00, originalPrice: 600.00, discountBadge: '-8%', status: 'Available' as const, rating: 4.8, category: 'Beauty', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=500&q=80' }
];

const tabs = ['All Collection', 'Trending', 'Beauty', 'Cosmetics'];

export default function FlashDeals({ onAddToCart }: FlashDealsProps) {
  const [activeTab, setActiveTab] = useState('All Collection');

  const filteredProducts = activeTab === 'All Collection'
    ? dummyProducts
    : dummyProducts.filter((p) => p.category === activeTab);

  return (
    <section className="flash-deals-section">
      <div className="section-header-centered">
        <h2 className="section-main-heading">Our Flash Deals</h2>
        <p className="section-sub-heading">Superior performance and customer satisfaction in one.</p>
      </div>

      <div className="filter-tabs-container">
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`tab-toggle-btn ${activeTab === tab ? 'active-tab' : ''}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="product-grid-layout">
        {filteredProducts.map((prod, index) => (
          <ProductCard
            key={index}
            title={prod.title}
            price={prod.price}
            originalPrice={prod.originalPrice}
            discountBadge={prod.discountBadge}
            status={prod.status}
            rating={prod.rating}
            image={prod.image}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </section>
  );
}