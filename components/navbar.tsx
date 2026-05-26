'use client';
import React from 'react';


interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
}

export default function Navbar({ cartCount = 0, wishlistCount = 2 }: NavbarProps) {
  return (
    <nav className="navbar-main-shell">
      <div className="navbar-container">
        {/* Brand Brand Name Grid Frame */}
        <div className="logo-main">
          Baza<span className="logo-sub">ro</span>
        </div>

        {/* Links Menu Wrapper Row Links */}
        <div className="nav-links-cluster">
          <span>Home</span>
          <span>Shop</span>
          <span>Products</span>
          <span>Pages</span>
          <span>Blog</span>
          <span>Contact</span>
        </div>

        {/* Right Nav Options Group */}
        <div className="nav-utilities-icons">
          
          
          <div className="icon-badge-wrapper">
            
            <span className="utility-counter-badge wishlist">{wishlistCount}</span>
          </div>

          <div className="icon-badge-wrapper">
            
            <span className="utility-counter-badge">{cartCount}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}