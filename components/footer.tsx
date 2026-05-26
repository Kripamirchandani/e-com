'use interface';
import React from 'react';

export default function Footer() {
  return (
    <footer className="w-full bg-white border-t border-neutral-200/60 pt-16 pb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 border-b border-neutral-100 pb-12">
        <div className="md:col-span-2">
          <span className="text-2xl font-black tracking-tighter text-black">Baza<span className="text-neutral-400 font-light">ro</span></span>
          <p className="mt-4 text-sm text-neutral-500 max-w-sm leading-relaxed">
            Experience premium curated skincare items and collections crafted specifically to bring out your skin's natural radiant glow.
          </p>
        </div>
        <div>
          <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-900 mb-4">Shop Categories</h4>
          <ul className="space-y-2.5 text-sm text-neutral-500 font-medium">
            <li className="hover:text-black cursor-pointer transition">Skincare Sets</li>
            <li className="hover:text-black cursor-pointer transition">Essential Oils</li>
            <li className="hover:text-black cursor-pointer transition">Moisturizers</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-900 mb-4">Company</h4>
          <ul className="space-y-2.5 text-sm text-neutral-500 font-medium">
            <li className="hover:text-black cursor-pointer transition">Our Story</li>
            <li className="hover:text-black cursor-pointer transition">Careers</li>
            <li className="hover:text-black cursor-pointer transition">Contact Us</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase font-bold tracking-widest text-neutral-900 mb-4">Newsletter</h4>
          <div className="mt-4 flex flex-col gap-2">
            <input type="email" placeholder="Your email address" className="bg-neutral-50 border border-neutral-200 text-xs px-4 py-3 rounded-sm outline-none focus:border-black transition" />
            <button className="bg-black text-white text-xs font-bold uppercase tracking-wider py-3 px-4 rounded-sm hover:bg-neutral-800 transition">Subscribe</button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-400 font-medium">
        <p>© 2026 Bazaro E-Commerce Platform. Architecture Engine Generated Portfolio Platform.</p>
        <div className="flex gap-6 mt-4 sm:mt-0">
          <span className="hover:text-black cursor-pointer transition">Privacy Policy</span>
          <span className="hover:text-black cursor-pointer transition">Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}