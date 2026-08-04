import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Providers
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { ProductProvider } from './context/ProductContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';

// Layout
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ProtectedRoute } from './components/layout/ProtectedRoute';
import { CartDrawer } from './components/cart/CartDrawer';

// Public Pages
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Wishlist } from './pages/Wishlist';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

// Customer Pages
import { CustomerDashboard } from './pages/customer/CustomerDashboard';
import { MyOrders } from './pages/customer/MyOrders';

// Admin Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminProducts } from './pages/admin/AdminProducts';
import { AdminOrders } from './pages/admin/AdminOrders';

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <ProductProvider>
          <AuthProvider>
            <CartProvider>
              <WishlistProvider>
                <OrderProvider>
                  <Router>
                    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-200">
                      <Navbar />
                      <CartDrawer />
                      <main className="flex-1 pt-6">
                        <Routes>
                          {/* Public Pages */}
                          <Route path="/" element={<Home />} />
                          <Route path="/products" element={<Products />} />
                          <Route path="/products/:id" element={<ProductDetails />} />
                          <Route path="/wishlist" element={<Wishlist />} />
                          <Route path="/checkout" element={<Checkout />} />
                          <Route path="/login" element={<Login />} />
                          <Route path="/register" element={<Register />} />

                          {/* Protected Customer Routes */}
                          <Route
                            path="/customer/dashboard"
                            element={
                              <ProtectedRoute requiredRole="customer">
                                <CustomerDashboard />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/customer/orders"
                            element={
                              <ProtectedRoute requiredRole="customer">
                                <MyOrders />
                              </ProtectedRoute>
                            }
                          />

                          {/* Protected Admin Routes */}
                          <Route
                            path="/admin/dashboard"
                            element={
                              <ProtectedRoute requiredRole="admin">
                                <AdminDashboard />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/admin/users"
                            element={
                              <ProtectedRoute requiredRole="admin">
                                <AdminUsers />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/admin/products"
                            element={
                              <ProtectedRoute requiredRole="admin">
                                <AdminProducts />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/admin/orders"
                            element={
                              <ProtectedRoute requiredRole="admin">
                                <AdminOrders />
                              </ProtectedRoute>
                            }
                          />
                        </Routes>
                      </main>
                      <Footer />
                    </div>
                  </Router>
                </OrderProvider>
              </WishlistProvider>
            </CartProvider>
          </AuthProvider>
        </ProductProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
