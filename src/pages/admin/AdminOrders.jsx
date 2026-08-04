import React from 'react';
import { ShoppingBag, Clock, ChevronDown } from 'lucide-react';
import { useOrders } from '../../context/OrderContext';

export const AdminOrders = () => {
  const { orders, updateOrderStatus } = useOrders();

  const statuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

  return (
    <div className="space-y-8 pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="pb-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center space-x-3">
            <span>Global Order Management</span>
            <ShoppingBag className="w-7 h-7 text-brand-600" />
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            View customer order details, items, quantities, total amounts, and change order processing status
          </p>
        </div>

        <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-brand-500/10 text-brand-600 border border-brand-500/20">
          Total Store Orders: {orders.length}
        </span>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="glass-card p-6 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-md"
          >
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 text-xs">
              <div className="space-y-1">
                <div className="flex items-center space-x-3">
                  <span className="font-extrabold text-base text-slate-900 dark:text-white">
                    Order {order.id}
                  </span>
                  <span className="text-slate-400 flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{new Date(order.orderDate).toLocaleString()}</span>
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400">
                  Customer: <strong>{order.customerName}</strong> ({order.customerEmail}) • Phone: {order.phone}
                </p>
              </div>

              {/* Status Selector */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <span className="text-[10px] font-bold text-slate-400 uppercase block">Total Amount</span>
                  <span className="text-lg font-extrabold text-slate-900 dark:text-white">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="relative">
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                    className="pl-3 pr-8 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 outline-none cursor-pointer focus:ring-2 focus:ring-brand-500/50 appearance-none"
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Ordered items breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/60 text-xs"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-10 h-10 rounded-xl object-cover shrink-0 bg-slate-100"
                  />
                  <div className="min-w-0 flex-1">
                    <h5 className="font-bold text-slate-900 dark:text-slate-100 truncate">{item.name}</h5>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Qty: <strong>{item.quantity}</strong> × ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shipping Address Footer */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex flex-wrap justify-between gap-2">
              <span>Shipping Address: <strong>{order.address}, {order.city} ({order.postalCode})</strong></span>
              {order.notes && <span>Notes: <em>"{order.notes}"</em></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
