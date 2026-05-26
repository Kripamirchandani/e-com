'use client';
import React from 'react';
import axios from 'axios';

interface ProductIdProps {
  _id: string;
  title: string;
  price: number;
  images: string[];
  category?: string;
  status?: 'Available' | 'Pre-Order' | 'Sold Out';
  stockCount?: number;
}

interface CartItemProps {
  item: {
    productId: ProductIdProps;
    quantity: number;
  };
  userId: string;
  onCartUpdate?: () => void;
}

export default function CartItem({ 
  item, 
  userId,
  onCartUpdate 
}: CartItemProps) {
  const { productId, quantity } = item;
  
  const title = productId?.title || 'Premium Cosmetics Product';
  const price = productId?.price || 0;
  const image = productId?.images?.[0] || '/images/placeholder.jpg';

  const handleQuantityChange = async (newQuantity: number): Promise<void> => {
    try {
      const response = await axios.put('/api/cart', {
        userId,
        productId: productId._id,
        quantity: newQuantity
      });
      if (response.status === 200 && onCartUpdate) {
        onCartUpdate();
      }
    } catch (error: any) {
      console.error('Error updating cart quantity tracking:', error.response?.data?.error || error.message);
    }
  };

  const handleRemoveItem = async (): Promise<void> => {
    try {
      const response = await axios.delete(`/api/cart?userId=${userId}&productId=${productId._id}`);
      if (response.status === 200 && onCartUpdate) {
        onCartUpdate();
      }
    } catch (error: any) {
      console.error('Error stripping item from active storage matrix:', error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="cart-item-container">
      <div className="cart-item-image-wrapper">
        <img src={image} alt={title} className="cart-item-img" />
      </div>

      <div className="cart-item-details">
        <div className="cart-item-meta">
          <h4 className="cart-item-title">{title}</h4>
          <p className="cart-item-category">Category: {productId?.category || 'Skincare'}</p>
        </div>

        <div className="cart-item-controls-row">
          <div className="quantity-counter-box">
            <button 
              type="button"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
              className="counter-btn"
            >
              
            </button>
            <span className="counter-display-value">{quantity}</span>
            <button 
              type="button"
              onClick={() => handleQuantityChange(quantity + 1)}
              disabled={productId?.status === 'Sold Out' || quantity >= (productId?.stockCount || 10)}
              className="counter-btn"
            >
              
            </button>
          </div>

          <button type="button" onClick={handleRemoveItem} className="cart-remove-action-btn" title="Remove item">
            
          </button>
        </div>
      </div>

      <div className="cart-item-pricing-summary">
        <span className="cart-item-total-price">${(price * quantity).toFixed(2)}</span>
        {quantity > 1 && (
          <span className="cart-item-unit-price">${price.toFixed(2)} each</span>
        )}
      </div>
    </div>
  );
}