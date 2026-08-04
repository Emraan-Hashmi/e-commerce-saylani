import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Lock, 
  Unlock, 
  CheckCircle2, 
  ShoppingBag, 
  UserCheck, 
  CreditCard, 
  ShieldCheck, 
  LogIn,
  ArrowLeft
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useToast } from '../context/ToastContext';

export const Checkout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, currentUser, login } = useAuth();
  const { cart, subtotal, shippingFee, totalAmount, clearCart } = useCart();
  const { placeOrder } = useOrders();
  const { addToast } = useToast();

  // State for Top Inline Login Section (Unauthenticated Users)
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // State for Checkout Form
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    notes: ''
  });

  // Auto-fill form values when user logs in or is already authenticated
  useEffect(() => {
    if (isAuthenticated && currentUser) {
      setFormData((prev) => ({
        ...prev,
        fullName: currentUser.name || prev.fullName,
        email: currentUser.email || prev.email
      }));
    }
  }, [isAuthenticated, currentUser]);

  const handleInlineLogin = (e) => {
    e.preventDefault();
    setLoginError('');
    const res = login(loginEmail, loginPassword);
    if (!res.success) {
      setLoginError(res.message || 'Invalid email or password');
    } else {
      setLoginEmail('');
      setLoginPassword('');
    }
  };

  const handleQuickDemoLogin = (email, password) => {
    login(email, password);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      addToast('Please login at the top to enable and place your order', 'error');
      return;
    }

    if (cart.length === 0) {
      addToast('Your cart is empty', 'error');
      return;
    }

    // Validate required fields
    if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
      addToast('Please fill in all required shipping fields', 'error');
      return;
    }

    const orderPayload = {
      ...formData,
      items: cart,
      subtotal,
      shippingFee,
      totalAmount
    };

    const newOrder = placeOrder(orderPayload, currentUser);
    clearCart();
    navigate('/customer/orders', { state: { orderId: newOrder.id } });
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mb-4">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">Your Cart is Empty</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Add items to your cart before proceeding to checkout.
        </p>
        <Link to="/products" className="mt-4 px-4 py-2 bg-brand-600 text-white rounded-xl text-xs font-semibold">
          Return to Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Banner */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800">
        <Link to="/products" className="inline-flex items-center space-x-1.5 text-xs text-slate-500 hover:text-brand-600 mb-2">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </Link>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-2">
          <span>Checkout & Place Order</span>
          <ShieldCheck className="w-6 h-6 text-emerald-500" />
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Complete your customer order details securely
        </p>
      </div>

      {/* 1. TOP LOGIN SECTION (ONLY FOR UNAUTHENTICATED USERS) */}
      {!isAuthenticated && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border-2 border-brand-500/40 bg-gradient-to-br from-brand-50/50 to-indigo-50/30 dark:from-slate-900 dark:to-slate-800/80 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-brand-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-600 text-white flex items-center justify-center font-bold">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  Customer Authentication Required
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  Please log in to enable the checkout form below and place your order.
                </p>
              </div>
            </div>

            {/* Quick Demo Login Preset Buttons */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handleQuickDemoLogin('zohaib@example.com', 'password123')}
                className="px-3 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-semibold shadow-sm hover:bg-brand-700 transition-colors"
              >
                Quick Demo Customer Login
              </button>
            </div>
          </div>

          <form onSubmit={handleInlineLogin} className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="customer@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500/50 outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500/50 outline-none"
              />
            </div>

            <div className="flex items-end">
              <button
                type="submit"
                className="w-full py-2.5 px-4 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center justify-center space-x-2 shadow-md transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Log In & Unlock Form</span>
              </button>
            </div>
          </form>

          {loginError && (
            <p className="text-xs text-rose-500 font-semibold">{loginError}</p>
          )}
        </div>
      )}

      {/* AUTHENTICATED SUCCESS BANNER */}
      {isAuthenticated && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2 font-semibold">
            <UserCheck className="w-5 h-5 text-emerald-500 shrink-0" />
            <span>Authenticated as <strong>{currentUser.name}</strong> ({currentUser.email})</span>
          </div>
          <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-white font-bold text-[10px] uppercase">
            Form Unlocked
          </span>
        </div>
      )}

      {/* MAIN CHECKOUT SECTION (GRID: FORM + ORDER SUMMARY) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* CHECKOUT FORM (DISABLED IF NOT LOGGED IN) */}
        <div className="lg:col-span-2 relative">
          
          {/* Overlay mask if not authenticated */}
          {!isAuthenticated && (
            <div className="absolute inset-0 z-20 bg-slate-900/10 dark:bg-slate-950/40 backdrop-blur-[2px] rounded-3xl flex flex-col items-center justify-center p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center mb-3 shadow-xl">
                <Lock className="w-7 h-7" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Checkout Form Disabled
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-sm">
                Please enter your credentials in the login section above to unlock shipping details.
              </p>
            </div>
          )}

          <form
            onSubmit={handlePlaceOrder}
            className={`glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6 transition-opacity ${
              !isAuthenticated ? 'opacity-40 pointer-events-none' : 'opacity-100'
            }`}
          >
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-200 dark:border-slate-800">
              <CreditCard className="w-5 h-5 text-brand-600" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Shipping & Delivery Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleFormChange}
                  placeholder="Zohaib Ahmed"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address (Auto-filled) *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  readOnly
                  value={formData.email}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 outline-none cursor-not-allowed"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleFormChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleFormChange}
                  placeholder="New York"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Shipping Address *
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleFormChange}
                  placeholder="Street address, apartment, suite"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Postal Code (Optional)
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleFormChange}
                  placeholder="10001"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>
            </div>

            <div className="text-xs">
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Order Notes (Optional)
              </label>
              <textarea
                rows="2"
                name="notes"
                value={formData.notes}
                onChange={handleFormChange}
                placeholder="Special delivery instructions or gate code..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-brand-500/50 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!isAuthenticated}
              className="w-full py-4 px-6 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-sm shadow-xl shadow-brand-600/30 flex items-center justify-center space-x-2 transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>Place Order (${totalAmount.toFixed(2)})</span>
            </button>
          </form>
        </div>

        {/* ORDER SUMMARY */}
        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 h-fit space-y-6">
          <h3 className="text-base font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-200 dark:border-slate-800">
            Order Summary ({cart.length} items)
          </h3>

          <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center space-x-3 text-xs">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-100"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 truncate">{item.name}</h4>
                  <p className="text-slate-400 font-semibold mt-0.5">
                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                  </p>
                </div>
                <span className="font-extrabold text-slate-900 dark:text-white shrink-0">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Subtotal</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-slate-500 dark:text-slate-400">
              <span>Shipping Fee</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between text-sm font-extrabold text-slate-900 dark:text-white pt-2 border-t border-slate-200 dark:border-slate-700">
              <span>Total Amount</span>
              <span className="text-brand-600 dark:text-brand-400 text-base">${totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
