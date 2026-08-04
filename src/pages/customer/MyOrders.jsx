import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PackageCheck, Clock, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useOrders } from '../../context/OrderContext';

export const MyOrders = () => {
  const { currentUser } = useAuth();
  const { getCustomerOrders } = useOrders();
  const location = useLocation();

  const newlyPlacedId = location.state?.orderId;
  const myOrders = getCustomerOrders(currentUser?.id);

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Newly Placed Order Success Banner */}
      {newlyPlacedId && (
        <div className="p-5 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-800 dark:text-emerald-200 flex items-center space-x-4 shadow-lg">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-extrabold text-base">Order Placed Successfully!</h3>
            <p className="text-xs mt-0.5 opacity-90">
              Your order <strong>#{newlyPlacedId}</strong> has been saved and is currently being processed.
            </p>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-3">
            <span>My Order History</span>
            <PackageCheck className="w-7 h-7 text-brand-600" />
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Displaying your customer orders placed with SaylaniMart
          </p>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold bg-brand-500/10 text-brand-600 border border-brand-500/20">
          {myOrders.length} Orders
        </span>
      </div>

      {myOrders.length === 0 ? (
        <div className="text-center py-20 glass-card rounded-3xl">
          <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No Orders Found</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            You haven't placed any orders with this account yet.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs"
          >
            <span>Start Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {myOrders.map((order) => (
            <div
              key={order.id}
              className={`glass-card p-6 rounded-3xl border transition-all ${
                order.id === newlyPlacedId
                  ? 'border-emerald-500 shadow-xl'
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Order Top Line info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center space-x-3">
                    <span className="font-extrabold text-base text-slate-900 dark:text-white">
                      Order ID: {order.id}
                    </span>
                    <span
                      className={`px-3 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${
                        order.status === 'Delivered'
                          ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                          : order.status === 'Shipped'
                          ? 'bg-sky-500/20 text-sky-600 dark:text-sky-400'
                          : order.status === 'Processing'
                          ? 'bg-amber-500/20 text-amber-600 dark:text-amber-400'
                          : 'bg-slate-500/20 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Order Date: {new Date(order.orderDate).toLocaleString()}</span>
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Total Amount</span>
                  <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                    ${order.totalAmount.toFixed(2)}
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="py-4 space-y-3">
                <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Ordered Products ({order.items.length}):
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center space-x-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 bg-slate-100"
                      />
                      <div className="min-w-0 flex-1 text-xs">
                        <h5 className="font-bold text-slate-900 dark:text-slate-100 truncate">
                          {item.name}
                        </h5>
                        <p className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                          Qty: <strong>{item.quantity}</strong> × ${item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Shipping Address Summary */}
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap justify-between gap-2">
                <span>Shipping To: <strong>{order.customerName}</strong> ({order.address}, {order.city})</span>
                <span>Contact Phone: <strong>{order.phone}</strong></span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
