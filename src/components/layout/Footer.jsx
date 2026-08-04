import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Features Banner */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pb-12 border-b border-slate-800">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-brand-600/20 text-brand-400 flex items-center justify-center shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Free Express Shipping</h4>
              <p className="text-slate-400 text-xs mt-0.5">On all orders over $150</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">Secure JWT Checkout</h4>
              <p className="text-slate-400 text-xs mt-0.5">100% encrypted & protected</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">30 Days Returns</h4>
              <p className="text-slate-400 text-xs mt-0.5">Hassle-free money back guarantee</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-600/20 text-amber-400 flex items-center justify-center shrink-0">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm">24/7 Dedicated Support</h4>
              <p className="text-slate-400 text-xs mt-0.5">Ready to assist anytime</p>
            </div>
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-10">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold">
                S
              </div>
              <span className="text-lg font-bold text-white">SaylaniMart</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              A premium, full-featured MERN Stack E-Commerce web application built with modern React, role-based authorization, and real-time order processing.
            </p>
          </div>

          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Store Catalog</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/products?category=Electronics" className="hover:text-white transition-colors">Electronics</Link></li>
              <li><Link to="/products?category=Fashion" className="hover:text-white transition-colors">Fashion Apparel</Link></li>
              <li><Link to="/products?category=Home%20%26%20Living" className="hover:text-white transition-colors">Home & Living</Link></li>
              <li><Link to="/products?category=Accessories" className="hover:text-white transition-colors">Accessories</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4">User Services</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/customer/dashboard" className="hover:text-white transition-colors">Customer Dashboard</Link></li>
              <li><Link to="/customer/orders" className="hover:text-white transition-colors">Order History</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">My Favorites</Link></li>
              <li><Link to="/checkout" className="hover:text-white transition-colors">Inline Checkout Flow</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Admin Controls</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/admin/dashboard" className="hover:text-white transition-colors">Analytics & Metrics</Link></li>
              <li><Link to="/admin/products" className="hover:text-white transition-colors">Product CRUD</Link></li>
              <li><Link to="/admin/users" className="hover:text-white transition-colors">User Management</Link></li>
              <li><Link to="/admin/orders" className="hover:text-white transition-colors">Global Orders</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>© {new Date().getFullYear()} SaylaniMart E-Commerce. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
