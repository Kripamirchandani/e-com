"use client";

import React, { useState } from "react";

interface CategoryItem {
  id: string;
  title: string;
  count: number;
  imageUrl: string;
}

export default function CircleCategory() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const categories: CategoryItem[] = [
  {
    id: "skincare",
    title: "Skincare",
    count: 6,
    // Premium amber bottle with droplet – matches pink/neutral tones perfectly
    imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "makeup",
    title: "Makeup",
    count: 9,
    imageUrl: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "haircare",
    title: "Haircare",
    count: 12,
    // Luxury minimalist pump bottle on neutral background
    imageUrl: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "moisturizers",
    title: "Moisturizers",
    count: 12,
    imageUrl: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=300&auto=format&fit=crop",
  },
  {
    id: "essential-oils",
    title: "Essential Oils",
    count: 8,
    imageUrl: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=300&auto=format&fit=crop",
  },
  {
  id: "bodycare",
  title: "Bodycare",
  count: 5,
  // High-fidelity luxury spa cosmetic bottle and towel texture
  imageUrl: "https://c8.alamy.com/comp/2G01JX4/bottles-of-cosmetic-products-towels-and-spa-stones-on-white-background-2G01JX4.jpg?q=80&w=300&auto=format&fit=crop",
}
];

  return (
    <div style={{
      width: "100%",
      padding: "40px 0",
      backgroundColor: "#FFFFFF",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "40px",
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "0 20px"
      }}>
        {categories.map((category) => (
          <div
            key={category.id}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer"
            }}
            onMouseEnter={() => setHoveredId(category.id)}
            onMouseLeave={() => setHoveredId(null)}
          >
            {/* Minimalist Interactive Circle Container */}
            <div style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "#FCEAE6", // Soft pink placeholder frame
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              border: "1px solid rgba(17, 17, 17, 0.05)",
              transform: hoveredId === category.id ? "scale(1.04)" : "scale(1)",
              transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: hoveredId === category.id ? "0 4px 12px rgba(0,0,0,0.05)" : "none"
            }}>
              <img
                src={category.imageUrl}
                alt={category.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.98) contrast(1.01)" // Enhances high contrast luxury feel
                }}
                loading="lazy"
              />
            </div>

            {/* Typography Matrix Labels */}
            <div style={{
              marginTop: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px"
            }}>
              <span style={{
                fontSize: "11px",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "#111111"
              }}>
                {category.title}
              </span>
              <sup style={{
                fontSize: "8px",
                fontWeight: 500,
                color: "rgba(17, 17, 17, 0.4)",
                top: "-0.2em"
              }}>
                {category.count}
              </sup>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}