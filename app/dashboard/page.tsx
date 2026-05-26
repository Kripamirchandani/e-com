"use client";

import React, { useState } from "react";

type ViewState = "overview" | "orders" | "profile" | "products" | "fulfillment" | "analytics";
type Role = "User" | "Admin";

interface UserProfile {
  name: string;
  email: string;
  role: Role;
}

export default function DashboardPage() {
  const [currentView, setCurrentView] = useState<ViewState>("overview");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [user] = useState<UserProfile>({
    name: "Alex Mercer",
    email: "alex.m@luxury-design.tech",
    role: "Admin",
  });

  const handleLogout = () => {
    window.location.href = "/auth/login";
  };

  // Nav Item Common Styler Engine
  const getNavItemStyle = (view: ViewState) => ({
    display: "flex",
    width: "100%",
    alignItems: "center",
    gap: "12px",
    padding: "10px 12px",
    fontSize: "12px",
    fontWeight: 500,
    textTransform: "uppercase" as const,
    letterSpacing: "0.05em",
    border: "none",
    cursor: "pointer",
    backgroundColor: currentView === view ? "#FCEAE6" : "transparent",
    color: "#111111",
    textAlign: "left" as const,
    transition: "background-color 0.15s ease",
  });

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F9FAFB", fontFamily: "sans-serif", color: "#111111" }}>
      
      {/* Mobile Top Navigation Banner (Hidden on desktop via window width simulation if necessary, standard mobile flow here) */}
      <style dangerouslySetInnerHTML={{__html: `
        @media (max-width: 1024px) {
          .desktop-side { transform: translateX(${isSidebarOpen ? "0" : "-100%"}); }
          .main-content { padding-left: 0 !important; padding-top: 64px !important; }
          .mobile-header { display: flex !important; }
        }
        @media (min-width: 1025px) {
          .desktop-side { transform: translateX(0) !important; }
          .mobile-header { display: none !important; }
        }
      `}} />

      <header className="mobile-header" style={{
        display: "none",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "64px",
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        alignItems: "center",
        justifyContent: "between",
        padding: "0 16px",
        zIndex: 50,
        boxSizing: "border-box"
      }}>
        <span style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.1em" }}>STUDIO ARCHITECT</span>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{ background: "none", border: "none", cursor: "pointer", padding: "8px", marginLeft: "auto" }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="2">
            {isSidebarOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </header>

      {/* Structural Left Sidebar Panel */}
      <aside className="desktop-side" style={{
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        width: "256px",
        backgroundColor: "#FFFFFF",
        borderRight: "1px solid #E5E7EB",
        zIndex: 40,
        transition: "transform 0.2s ease-in-out",
        boxSizing: "border-box"
      }}>
        <div style={{ display: "flex", height: "100%", flexDirection: "column", justifyContent: "between", padding: "24px", boxSizing: "border-box" }}>
          <div style={{ flexGrow: 1 }}>
            <div style={{ height: "48px", display: "flex", alignItems: "center", marginBottom: "32px" }}>
              <span style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "0.1em" }}>STUDIO ARCHITECT</span>
            </div>

            {/* Profile Matrix Box */}
            <div style={{ marginBottom: "32px", borderBottom: "1px solid #F3F4F6", paddingBottom: "24px" }}>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.name}</p>
              <p style={{ margin: "2px 0 0 0", fontSize: "12px", color: "rgba(17, 17, 17, 0.5)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{user.email}</p>
              <span style={{ display: "inline-block", marginTop: "8px", backgroundColor: "#FCEAE6", padding: "2px 8px", fontSize: "10px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>
                {user.role} Matrix
              </span>
            </div>

            {/* Links Stream */}
            <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
              <button onClick={() => { setCurrentView("overview"); setIsSidebarOpen(false); }} style={getNavItemStyle("overview")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" /></svg>
                Overview
              </button>
              <button onClick={() => { setCurrentView("orders"); setIsSidebarOpen(false); }} style={getNavItemStyle("orders")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" /></svg>
                My Orders
              </button>
              <button onClick={() => { setCurrentView("profile"); setIsSidebarOpen(false); }} style={getNavItemStyle("profile")}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                Profile Management
              </button>

              {user.role === "Admin" && (
                <div style={{ marginTop: "16px", paddingTop: "24px", borderTop: "1px solid #F3F4F6", display: "flex", flexDirection: "column", gap: "4px" }}>
                  <p style={{ margin: "0 0 8px 12px", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "rgba(17, 17, 17, 0.4)", textTransform: "uppercase" }}>Admin controls</p>
                  <button onClick={() => { setCurrentView("products"); setIsSidebarOpen(false); }} style={getNavItemStyle("products")}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /></svg>
                    Product Management
                  </button>
                  <button onClick={() => { setCurrentView("fulfillment"); setIsSidebarOpen(false); }} style={getNavItemStyle("fulfillment")}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                    Fulfillment Tracking
                  </button>
                  <button onClick={() => { setCurrentView("analytics"); setIsSidebarOpen(false); }} style={getNavItemStyle("analytics")}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" /></svg>
                    Analytics Data
                  </button>
                </div>
              )}
            </nav>
          </div>

          <button
            onClick={handleLogout}
            style={{
              display: "flex",
              width: "100%",
              alignItems: "center",
              gap: "12px",
              border: "none",
              borderTop: "1px solid #F3F4F6",
              padding: "16px 12px 0 12px",
              fontSize: "12px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "#DC2626",
              backgroundColor: "transparent",
              cursor: "pointer",
              textAlign: "left"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
            Log Out
          </button>
        </div>
      </aside>

      {/* Main View Canvas Engine */}
      <main className="main-content" style={{ flex: 1, paddingLeft: "256px", width: "100%", boxSizing: "border-box" }}>
        <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "32px", boxSizing: "border-box" }}>
          
          <div>
            <h2 style={{ fontSize: "20px", fontWeight: "normal", letterSpacing: "-0.025em", textTransform: "uppercase", margin: 0 }}>
              {currentView === "overview" && "Dashboard Architecture Overview"}
              {currentView === "orders" && "Client Orders Ledger"}
              {currentView === "profile" && "Profile Account Controls"}
              {currentView === "products" && "Product Catalog System"}
              {currentView === "fulfillment" && "Logistics & Tracking Pipeline"}
              {currentView === "analytics" && "Enterprise Analytical Stream"}
            </h2>
          </div>

          {currentView === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {/* Card Matrix Grid */}
              <div style={{ display: "grid", gap: "24px", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
                <div style={{ border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF", padding: "24px" }}>
                  <p style={{ margin: 0, fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "rgba(17, 17, 17, 0.4)", textTransform: "uppercase" }}>Total Value Expended</p>
                  <p style={{ margin: "8px 0 0 0", fontSize: "24px", fontWeight: 300, letterSpacing: "-0.025em" }}>$1,480.00</p>
                </div>
                <div style={{ border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF", padding: "24px" }}>
                  <p style={{ margin: 0, fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "rgba(17, 17, 17, 0.4)", textTransform: "uppercase" }}>Active Orders Tracker</p>
                  <p style={{ margin: "8px 0 0 0", fontSize: "24px", fontWeight: 300, letterSpacing: "-0.025em" }}>1 Pending</p>
                </div>
                <div style={{ border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF", padding: "24px" }}>
                  <p style={{ margin: 0, fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "rgba(17, 17, 17, 0.4)", textTransform: "uppercase" }}>Account Security Level</p>
                  <p style={{ margin: "8px 0 0 0", fontSize: "24px", fontWeight: 300, letterSpacing: "-0.025em", color: "#059669" }}>Tier 2 (High)</p>
                </div>
              </div>

              {/* Order Ledger Table */}
              <div style={{ border: "1px solid #E5E7EB", backgroundColor: "#FFFFFF" }}>
                <div style={{ borderBottom: "1px solid #E5E7EB", padding: "16px 24px" }}>
                  <h3 style={{ margin: 0, fontSize: "12px", fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>Recent Order Ledgers</h3>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", textAlign: "left", borderCollapse: "collapse" }}>
                    <thead>
                      <tr style={{ borderBottom: "1px solid #E5E7EB", backgroundColor: "#F9FAFB", fontSize: "10px", fontWeight: 600, letterSpacing: "0.1em", color: "rgba(17, 17, 17, 0.5)", textTransform: "uppercase" }}>
                        <th style={{ padding: "12px 24px" }}>Timestamp</th>
                        <th style={{ padding: "12px 24px" }}>Items Count</th>
                        <th style={{ padding: "12px 24px" }}>Total Checkout</th>
                        <th style={{ padding: "12px 24px" }}>System Status</th>
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: "12px" }}>
                      <tr style={{ borderBottom: "1px solid #F3F4F6" }}>
                        <td style={{ padding: "16px 24px", fontFamily: "monospace" }}>2026-05-24 14:32</td>
                        <td style={{ padding: "16px 24px", color: "#6B7280" }}>2 Items</td>
                        <td style={{ padding: "16px 24px", fontWeight: 500 }}>$840.00</td>
                        <td style={{ padding: "16px 24px" }}>
                          <span style={{ backgroundColor: "#D1FAE5", color: "#065F46", border: "1px solid #A7F3D0", padding: "2px 10px", fontSize: "10px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Paid</span>
                        </td>
                      </tr>
                      <tr style={{ borderBottom: "1px solid #F3F4F6" }}>
                        <td style={{ padding: "16px 24px", fontFamily: "monospace" }}>2026-05-10 09:15</td>
                        <td style={{ padding: "16px 24px", color: "#6B7280" }}>1 Item</td>
                        <td style={{ padding: "16px 24px", fontWeight: 500 }}>$640.00</td>
                        <td style={{ padding: "16px 24px" }}>
                          <span style={{ backgroundColor: "#DBEAFE", color: "#1E40AF", border: "1px solid #BFDBFE", padding: "2px 10px", fontSize: "10px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Shipped</span>
                        </td>
                      </tr>
                      <tr>
                        <td style={{ padding: "16px 24px", fontFamily: "monospace" }}>2026-04-28 18:02</td>
                        <td style={{ padding: "16px 24px", color: "#6B7280" }}>4 Items</td>
                        <td style={{ padding: "16px 24px", fontWeight: 500 }}>$1,120.00</td>
                        <td style={{ padding: "16px 24px" }}>
                          <span style={{ backgroundColor: "#FEF3C7", color: "#92400E", border: "1px solid #FDE68A", padding: "2px 10px", fontSize: "10px", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Processing</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {currentView !== "overview" && (
            <div style={{ border: "1px solid #D1D5DB", borderStyle: "dashed", backgroundColor: "#FFFFFF", padding: "48px", textAlign: "center", fontSize: "14px", color: "#9CA3AF" }}>
              {currentView.toUpperCase()} INTERFACE STREAM INITIALIZED. PRODUCTION ENGINE CONNECTED.
            </div>
          )}

        </div>
      </main>
    </div>
  );
}