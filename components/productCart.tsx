'use client';
import React from 'react';

interface ProductCardProps {
  title: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  image: string;
  status: 'Available' | 'Pre-Order' | 'Sold Out';
  rating: number;
  onAddToCart?: () => void;
}

export default function ProductCard({
  title,
  price,
  originalPrice,
  discountBadge,
  image,
  status,
  rating,
  onAddToCart
}: ProductCardProps) {
  
  const renderStatusBadge = () => {
    switch(status) {
      case 'Pre-Order':
        return <span className="status-badge pre-order">Pre-Order</span>;
      case 'Sold Out':
        return <span className="status-badge sold-out">Sold Out</span>;
      default:
        if (discountBadge) {
          return <span className="status-badge discount">{discountBadge}</span>;
        }
        return null;
    }
  };

  return (
    <div className="product-card-container group">
      {/* Product Image Frame */}
      <div className="product-card-visual-frame">
        <div className="status-badge-container">
          {renderStatusBadge()}
        </div>

        <img 
          src={image} 
          alt={title} 
          className="product-display-img"
        />

        {/* Hover Option Overlay Panel using Pure Raw Inline SVGs */}
        <div className="product-card-action-overlay">
          <button type="button" onClick={onAddToCart} disabled={status === 'Sold Out'} className="overlay-action-btn" title="Add to Cart">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
          </button>
          <button type="button" className="overlay-action-btn" title="Quick View">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
          </button>
          <button type="button" className="overlay-action-btn" title="Add to Wishlist">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </button>
          <button type="button" className="overlay-action-btn" title="Compare">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
          </button>
        </div>
      </div>

      {/* Info Pricing Detail Block */}
      <div className="product-info-wrapper">
        <div className="rating-stars-row">
          {Array.from({ length: 5 }).map((_, index) => (
            <svg 
              key={index} 
              xmlns="http://www.w3.org/2000/svg" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill={index < Math.floor(rating) ? "#FB923C" : "none"} 
              stroke={index < Math.floor(rating) ? "#FB923C" : "#E5E7EB"} 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          ))}
        </div>
        
        <h3 className="product-title-text">{title}</h3>

        <div className="pricing-flex-row">
          <span className="current-price-label">${price.toFixed(2)}</span>
          {originalPrice && (
            <span className="original-price-label">${originalPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
}