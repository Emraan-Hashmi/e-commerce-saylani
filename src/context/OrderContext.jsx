import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialOrders } from '../data/initialData';
import { useToast } from './ToastContext';
import { useProducts } from './ProductContext';

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  const { addToast } = useToast();
  const { updateStock } = useProducts();

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('saylani_orders');
    return saved ? JSON.parse(saved) : initialOrders;
  });

  useEffect(() => {
    localStorage.setItem('saylani_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (orderData, user) => {
    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      userId: user.id,
      customerName: orderData.fullName || user.name,
      customerEmail: user.email,
      phone: orderData.phone,
      address: orderData.address,
      city: orderData.city,
      postalCode: orderData.postalCode || 'N/A',
      notes: orderData.notes || '',
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      orderDate: new Date().toISOString(),
      status: 'Pending'
    };

    setOrders((prev) => [newOrder, ...prev]);
    // Reduce product inventory stock
    updateStock(orderData.items);

    addToast(`Order ${newOrder.id} placed successfully!`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    addToast(`Order ${orderId} status updated to ${newStatus}`, 'success');
  };

  const getCustomerOrders = (userId) => {
    return orders.filter((o) => o.userId === userId);
  };

  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);

  return (
    <OrderContext.Provider
      value={{
        orders,
        placeOrder,
        updateOrderStatus,
        getCustomerOrders,
        totalRevenue
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};
