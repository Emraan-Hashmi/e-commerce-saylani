import React from 'react';
import { Link } from 'react-router-dom';
import { PackageCheck, Heart, User, ArrowRight, Clock, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';
import { useWishlist } from '../../context/WishlistContext';

export const CustomerDashboard = () => {
  const { currentUser } = useAuth();
  const { getCustomerOrders } = useOrders();
  const { wishlistCount } = useWishlist();

  const myOrders = getCustomerOrders(currentUser?.id);
  const recentOrder = myOrders[0];

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Welcome Header Banner */}
      <div className="glass-card p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-gradient-to-r from-brand-900/10 via-indigo-900/10 to-slate-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-600 text-white font-extrabold text-2xl flex items-center justify-center shadow-lg">
            {currentUser?.name?.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Welcome, {currentUser?.name}!
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-brand-500/20 text-brand-600 dark:text-brand-400 uppercase">
                Customer
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Account registered on {new Date(currentUser?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <Link
          to="/products"
          className="px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs flex items-center space-x-2 shadow-md w-fit"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Shop New Items</span>
        </Link>
      </div>

      {/* Customer Statistics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <PackageCheck className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Orders</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{myOrders.length}</h3>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
            <Heart className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Wishlist Items</span>
            <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">{wishlistCount}</h3>
          </div>
        </div>

        <div className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
            <User className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Account Status</span>
            <h3 className="text-sm font-extrabold text-emerald-600 dark:text-emerald-400">Verified Customer</h3>
          </div>
        </div>
      </div>

      {/* Recent Order Preview */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center space-x-2">
            <Clock className="w-5 h-5 text-brand-600" />
            <span>Latest Order Activity</span>
          </h2>
          <Link
            to="/customer/orders"
            className="text-xs font-bold text-brand-600 dark:text-brand-400 hover:underline flex items-center space-x-1"
          >
            <span>View All My Orders</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {!recentOrder ? (
          <div className="text-center py-8 text-xs text-slate-500">
            You haven't placed any orders yet.
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-3">
                <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Order #{recentOrder.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/20 text-indigo-600 dark:text-indigo-300">
                  {recentOrder.status}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Placed on {new Date(recentOrder.orderDate).toLocaleDateString()} • {recentOrder.items.length} items
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                ${recentOrder.totalAmount.toFixed(2)}
              </span>
              <Link
                to="/customer/orders"
                className="px-3.5 py-1.5 rounded-xl bg-brand-600 text-white text-xs font-semibold"
              >
                Order Details
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
