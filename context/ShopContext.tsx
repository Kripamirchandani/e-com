'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';


export interface Product {
  title: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  status: 'Available' | 'Sold Out';
  rating: number;
  category: string;
  image: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface ShopContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product) => Promise<void>;
  toggleWishlist: (product: Product) => Promise<void>;
  isInWishlist: (productTitle: string) => boolean;
  cartCount: number;
  wishlistCount: number;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  
  useEffect(() => {
    async function loadSavedData() {
      try {
        const [cartRes, wishlistRes] = await Promise.all([
          axios.get('/api/cart'),
          axios.get('/api/wishlist')
        ]);
        
        if (cartRes.data) setCart(cartRes.data);
        if (wishlistRes.data) setWishlist(wishlistRes.data);
      } catch (err) {
        console.error("Could not sync data from database", err);
      }
    }
    loadSavedData();
  }, []);


  const addToCart = async (product: Product) => {
    if (product.status === 'Sold Out') return;

    
    setCart((prev) => {
      const existing = prev.find((item) => item.title === product.title);
      if (existing) {
        return prev.map((item) => item.title === product.title ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    try {
      await axios.post('/api/cart', {
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        status: product.status,
        rating: product.rating
      });
    } catch (err) {
      console.error("Error saving cart to backend:", err);
    }
  };


  const toggleWishlist = async (product: Product) => {
    const exists = wishlist.some((item) => item.title === product.title);
    
    // Optimistic UI Update
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.title !== product.title));
    } else {
      setWishlist((prev) => [...prev, product]);
    }

    try {
      await axios.post('/api/wishlist', {
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        status: product.status,
        rating: product.rating
      });
    } catch (err) {
      console.error("Error saving wishlist to backend:", err);
    }
  };

  const isInWishlist = (productTitle: string) => wishlist.some((item) => item.title === productTitle);
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <ShopContext.Provider value={{ cart, wishlist, addToCart, toggleWishlist, isInWishlist, cartCount, wishlistCount }}>
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) throw new Error('useShop must be used within a ShopProvider');
  return context;
}