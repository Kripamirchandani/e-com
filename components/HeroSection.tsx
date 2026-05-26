import React from 'react';

export default function HeroSection() {
  return (
    <section className="hero-wrapper-section">
      <div className="hero-content-left">
        <span className="hero-mini-badge">NEW COLLECTION</span>
        <h1 className="hero-title-text">
          Reveal the <br /> beauty of Skin.
        </h1>
        <button type="button" className="hero-discover-btn">
          Discover Now →
        </button>
      </div>
      <div className="hero-image-right">
        <img
          src="https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80"
          alt="Model Skin Product Showcase"
        />
      </div>
    </section>
  );
}