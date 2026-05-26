"use client";

import React, { useState } from "react";

interface NavLink {
  label: string;
  url: string;
}

export default function Header() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  const navLinks: NavLink[] = [
    { label: "Home", url: "/" },
    { label: "Shop", url: "/shop" },
    { label: "Products", url: "/products" },
    { label: "Pages", url: "/pages" },
    { label: "Blog", url: "/blog" },
    { label: "Contact", url: "/contact" },
  ];

  // Shared structural styling engines
  const linkStyle = (id: string) => ({
    fontSize: "13px",
    fontWeight: 600,
    textTransform: "uppercase" as const,
    letterSpacing: "0.1em",
    color: "#111111",
    textDecoration: "none",
    opacity: hoveredLink === id ? 0.6 : 1,
    transition: "opacity 0.15s ease",
    cursor: "pointer",
  });

  return (
    <header style={{
      width: "100%",
      backgroundColor: "#FFFFFF",
      borderBottom: "1px solid rgba(17, 17, 17, 0.05)",
      fontFamily: "sans-serif",
    }}>
      {/* Upper Announcement Utility Banner matched to layout image background */}
      <div style={{
        backgroundColor: "#FCEAE6",
        padding: "10px 40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: "11px",
        color: "#111111",
        letterSpacing: "0.02em"
      }}>
        <div>
          Super discount for your first purchase <strong style={{ fontWeight: 700 }}>COUPON96</strong> Use discount code in the checkout!
        </div>
        <div style={{ display: "flex", gap: "24px", opacity: 0.8 }}>
          <span style={{ cursor: "pointer" }}>Order Tracking</span>
          <span style={{ cursor: "pointer" }}>English / USD</span>
        </div>
      </div>

      {/* Main Structural Navigation Canvas */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "25px 40px",
        maxWidth: "1440px",
        margin: "0 auto",
        boxSizing: "border-box"
      }}>
        
        {/* Brand Luxury Logo Component Container */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <a href="/" style={{ textDecoration: "none" }}>
            <span style={{
              fontSize: "26px",
              fontWeight: 800,
              letterSpacing: "-0.03em",
              color: "#111111"
            }}>
              Baza<span style={{ fontWeight: 300, color: "rgba(17, 17, 17, 0.4)" }}>ro</span>
            </span>
          </a>
        </div>

        {/* Center Main Desktop Navigation Links Matrix */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "32px"
        }}>
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              style={linkStyle(link.label)}
              onMouseEnter={() => setHoveredLink(link.label)}
              onMouseLeave={() => setHoveredLink(null)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Utility Navigation Actions Wrapper (Replacing 2 and 0 badges) */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "14px"
        }}>
          <a
            href="/auth/login"
            style={linkStyle("login")}
            onMouseEnter={() => setHoveredLink("login")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Login
          </a>

          <span style={{ fontSize: "12px", color: "rgba(17, 17, 17, 0.25)" }}>|</span>

          <a
            href="/auth/signup"
            style={linkStyle("signup")}
            onMouseEnter={() => setHoveredLink("signup")}
            onMouseLeave={() => setHoveredLink(null)}
          >
            Signup
          </a>
        </div>

      </div>
    </header>
  );
}