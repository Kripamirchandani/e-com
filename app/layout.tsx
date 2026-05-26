import React, { ReactNode } from 'react';
import './globals.css';
import { ShopProvider } from '@/context/ShopContext'; 

export const metadata = {
  title: 'Bazaro — Premium Fashion & Cosmetics E-Commerce',
  description: 'Experience premium curated skincare items and collections crafted to bring out your skin\'s natural radiant glow.',
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0 }}>
        
        <ShopProvider>
          <main className="main-layout-shell">
            {children}
          </main>
        </ShopProvider>
      </body>
    </html>
  );
}