import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingBag, 
  Heart, 
  User, 
  Sun, 
  Moon, 
  LogOut, 
  ShieldCheck, 
  UserCheck, 
  Menu, 
  X,
  Search,
  ChevronDown,
  LayoutDashboard,
  PackageCheck
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useTheme } from '../../context/ThemeContext';

export const Navbar = () => {
  const { currentUser, logout, isAdmin, isCustomer, isAuthenticated, login } = useAuth();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { isDarkMode, toggleTheme } = useTheme();
  
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleDemoSwitch = (role) => {
    if (role === 'admin') {
      login('admin@store.com', 'password123');
      navigate('/admin/dashboard');
    } else {
      login('zohaib@example.com', 'password123');
      navigate('/products');
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 w-full glass-card border-b border-slate-200 dark:border-slate-800">
      {/* Top Banner - Role Switcher & Demo Helper */}
      <div className="bg-gradient-to-r from-brand-600 to-indigo-700 text-white py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold px-2 py-0.5 bg-white/20 rounded">Quick Demo Switcher</span>
            <span className="hidden sm:inline text-indigo-100">Switch user context instantly to test role-based capabilities:</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleDemoSwitch('admin')}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                isAdmin 
                  ? 'bg-emerald-500 text-white shadow-sm' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Login as Admin</span>
            </button>
            <button
              onClick={() => handleDemoSwitch('customer')}
              className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
                isCustomer 
                  ? 'bg-emerald-500 text-white shadow-sm' 
                  : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Login as Customer</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white font-bold shadow-md shadow-brand-500/20">
            S
          </div>
          <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-brand-600 to-indigo-600 dark:from-brand-500 dark:to-indigo-400 bg-clip-text text-transparent">
            SaylaniMart
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
          <Link
            to="/"
            className={`transition-colors hover:text-brand-600 dark:hover:text-brand-400 ${
              isActive('/') ? 'text-brand-600 dark:text-brand-400 font-semibold' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Home
          </Link>
          <Link
            to="/products"
            className={`transition-colors hover:text-brand-600 dark:hover:text-brand-400 ${
              isActive('/products') ? 'text-brand-600 dark:text-brand-400 font-semibold' : 'text-slate-600 dark:text-slate-300'
            }`}
          >
            Products
          </Link>

          {/* Role specific link */}
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-semibold text-xs"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Admin Portal</span>
            </Link>
          )}

          {isCustomer && (
            <Link
              to="/customer/dashboard"
              className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 font-semibold text-xs"
            >
              <User className="w-4 h-4" />
              <span>Customer Portal</span>
            </Link>
          )}
        </nav>

        {/* Search Bar Input */}
        <form onSubmit={handleSearchSubmit} className="hidden lg:flex items-center relative max-w-xs w-full">
          <input
            type="text"
            placeholder="Search catalog..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
        </form>

        {/* Action Controls (Wishlist, Cart, Theme, Profile) */}
        <div className="flex items-center space-x-4">
          {/* Light/Dark Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Toggle theme"
          >
            {isDarkMode ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5 text-slate-600" />}
          </button>

          {/* Wishlist Icon */}
          <Link
            to="/wishlist"
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </Link>

          {/* Cart Drawer Trigger Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItemsCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-600 text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-sm">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* User Account / Login Dropdown */}
          <div className="relative">
            {isAuthenticated ? (
              <div>
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700/80 transition-colors"
                >
                  <div className="w-7 h-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center text-xs font-bold">
                    {currentUser.name.charAt(0)}
                  </div>
                  <span className="hidden sm:inline text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div 
                    onMouseLeave={() => setIsUserDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-2 z-50 text-xs"
                  >
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-700">
                      <p className="font-bold text-slate-800 dark:text-slate-100">{currentUser.name}</p>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">{currentUser.email}</p>
                      <span className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        isAdmin ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400' : 'bg-brand-500/20 text-brand-600 dark:text-brand-400'
                      }`}>
                        {currentUser.role}
                      </span>
                    </div>

                    {isAdmin ? (
                      <>
                        <Link
                          to="/admin/dashboard"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200"
                        >
                          <LayoutDashboard className="w-4 h-4 text-amber-500" />
                          <span>Admin Dashboard</span>
                        </Link>
                        <Link
                          to="/admin/products"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200"
                        >
                          <PackageCheck className="w-4 h-4 text-slate-400" />
                          <span>Manage Products</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <Link
                          to="/customer/dashboard"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200"
                        >
                          <User className="w-4 h-4 text-indigo-500" />
                          <span>Customer Dashboard</span>
                        </Link>
                        <Link
                          to="/customer/orders"
                          onClick={() => setIsUserDropdownOpen(false)}
                          className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-700/50 text-slate-700 dark:text-slate-200"
                        >
                          <PackageCheck className="w-4 h-4 text-slate-400" />
                          <span>My Orders</span>
                        </Link>
                      </>
                    )}

                    <div className="border-t border-slate-100 dark:border-slate-700 mt-1 pt-1">
                      <button
                        onClick={() => {
                          setIsUserDropdownOpen(false);
                          logout();
                        }}
                        className="w-full flex items-center space-x-2 px-4 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 text-left font-medium"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-3">
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Home
          </Link>
          <Link
            to="/products"
            onClick={() => setIsMobileMenuOpen(false)}
            className="block px-3 py-2 rounded-lg text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Products Catalog
          </Link>
          {isAdmin && (
            <Link
              to="/admin/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10"
            >
              Admin Dashboard
            </Link>
          )}
          {isCustomer && (
            <Link
              to="/customer/dashboard"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-500/10"
            >
              Customer Dashboard
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
