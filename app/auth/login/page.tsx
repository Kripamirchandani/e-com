"use client";

import React, { useState } from "react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email || !formData.password) {
      setError("Please input both credentials.");
      return;
    }

    setLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid credentials provided.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#FCEAE6",
      padding: "0 16px",
      fontFamily: "sans-serif"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "440px",
        border: "1px solid rgba(17, 17, 17, 0.1)",
        backgroundColor: "#FFFFFF",
        padding: "40px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)"
      }}>
        <div style={{ marginBottom: "32px" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "normal", letterSpacing: "-0.025em", color: "#111111", margin: 0 }}>LOG IN</h1>
          <p style={{ marginTop: "8px", fontSize: "14px", color: "rgba(17, 17, 17, 0.6)", margin: 0 }}>Welcome back. Please enter your credentials.</p>
        </div>

        {error && (
          <div style={{
            marginBottom: "24px",
            borderLeft: "2px solid #DC2626",
            backgroundColor: "#FEF2F2",
            padding: "12px",
            fontSize: "12px",
            color: "#B91C1C"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em", color: "#111111", textTransform: "uppercase" }}>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              style={{
                marginTop: "8px",
                width: "100%",
                boxSizing: "border-box",
                border: focusedField === "email" ? "1px solid #111111" : "1px solid #D1D5DB",
                backgroundColor: "#FFFFFF",
                padding: "12px 16px",
                fontSize: "14px",
                color: "#111111",
                outline: "none",
                transition: "border-color 0.15s ease"
              }}
              placeholder="name@domain.com"
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: "12px", fontWeight: 500, letterSpacing: "0.05em", color: "#111111", textTransform: "uppercase" }}>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onFocus={() => setFocusedField("password")}
              onBlur={() => setFocusedField(null)}
              style={{
                marginTop: "8px",
                width: "100%",
                boxSizing: "border-box",
                border: focusedField === "password" ? "1px solid #111111" : "1px solid #D1D5DB",
                backgroundColor: "#FFFFFF",
                padding: "12px 16px",
                fontSize: "14px",
                color: "#111111",
                outline: "none",
                transition: "border-color 0.15s ease"
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: "#111111",
              padding: "12px 0",
              fontSize: "12px",
              fontWeight: 500,
              letterSpacing: "0.1em",
              color: "#FFFFFF",
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              opacity: loading ? 0.5 : 1,
              transition: "opacity 0.15s ease"
            }}
          >
            {loading ? "AUTHENTICATING..." : "SIGN IN"}
          </button>
        </form>

        <div style={{ marginTop: "32px", borderTop: "1px solid #F3F4F6", paddingTop: "24px", textAlign: "center" }}>
          <p style={{ fontSize: "12px", color: "rgba(17, 17, 17, 0.6)", margin: 0 }}>
            New client?{" "}
            <a href="/auth/signup" style={{ fontWeight: 500, color: "#111111", textDecoration: "underline", textUnderlineOffset: "4px" }}>
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}