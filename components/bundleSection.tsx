'use client';
import React, { useState } from 'react';


interface BundleProduct {
  id: string;
  title: string;
  price: number;
  rating: number;
  image: string;
}

export default function BundleSection() {
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({
    prod1: 'default',
    prod2: 'default',
    prod3: 'default'
  });

  const bundledProducts: BundleProduct[] = [
    { id: 'prod1', title: 'Ribbed Tank Top - Orange', price: 99.00, rating: 4.8, image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=150&q=80' },
    { id: 'prod2', title: 'Hydrating Tint Lip Gloss', price: 44.00, rating: 5.0, image: 'https://images.unsplash.com/photo-1631730359577-38e4755d772b?auto=format&fit=crop&w=150&q=80' },
    { id: 'prod3', title: 'Soft Matte Concealer Balm', price: 59.00, rating: 4.5, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=150&q=80' }
  ];

  const totalBundleCost = bundledProducts.reduce((acc, curr) => acc + curr.price, 0);

  const handleSelectChange = (productId: string, val: string) => {
    setSelectedVariants(prev => ({ ...prev, [productId]: val }));
  };

  return (
    <div className="bundle-section-root">
      <div className="bundle-layout-grid-split">
        {/* Left Big Lifestyle Asset Visual Section */}
        <div className="bundle-hero-visual-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80" 
            alt="Bundle Look Collection Showcase" 
            className="bundle-hero-img"
          />
        </div>

        {/* Right Product Selection Form Parameters */}
        <div className="bundle-form-interface-panel">
          <span className="bundle-mini-tag">BUNDLE AND SAVE</span>
          <h2 className="bundle-main-title">Shop this look</h2>

          <div className="bundle-items-stack">
            {bundledProducts.map((product) => (
              <div key={product.id} className="bundle-item-row">
                <img src={product.image} alt={product.title} className="bundle-item-thumbnail" />
                <div className="bundle-item-details-block">
                  <div className="bundle-stars-flex">
                    
                  </div>
                  <h4 className="bundle-item-heading-text">{product.title}</h4>
                  
                  <div className="variant-select-wrapper">
                    <select 
                      value={selectedVariants[product.id]}
                      onChange={(e) => handleSelectChange(product.id, e.target.value)}
                      className="bundle-select-node"
                    >
                      <option value="default">Select An Option</option>
                      <option value="sm">Small Variant / Standard</option>
                      <option value="lg">Large Variant / Pro Edition</option>
                    </select>
                  </div>
                </div>
                <div className="bundle-item-price-label">
                  ${product.price.toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <button type="button" className="bundle-checkout-submit-cta">
            Add Selected to Cart — ${totalBundleCost.toFixed(2)}
          </button>
        </div>
      </div>
    </div>
  );
}