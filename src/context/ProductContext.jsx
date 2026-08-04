import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialProducts } from '../data/initialData';
import { useToast } from './ToastContext';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const { addToast } = useToast();

  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('saylani_products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  useEffect(() => {
    localStorage.setItem('saylani_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (productData) => {
    const newProduct = {
      id: `prod_${Date.now()}`,
      ...productData,
      price: parseFloat(productData.price),
      stock: parseInt(productData.stock, 10),
      createdAt: new Date().toISOString()
    };

    setProducts((prev) => [newProduct, ...prev]);
    addToast(`Product "${newProduct.name}" added successfully!`, 'success');
    return newProduct;
  };

  const updateProduct = (id, updatedData) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...updatedData,
              price: parseFloat(updatedData.price),
              stock: parseInt(updatedData.stock, 10)
            }
          : p
      )
    );
    addToast('Product updated successfully!', 'success');
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product deleted from store', 'info');
  };

  const updateStock = (items) => {
    setProducts((prev) =>
      prev.map((p) => {
        const itemInOrder = items.find((i) => i.id === p.id);
        if (itemInOrder) {
          const newStock = Math.max(0, p.stock - itemInOrder.quantity);
          return { ...p, stock: newStock };
        }
        return p;
      })
    );
  };

  // Get distinct categories
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  return (
    <ProductContext.Provider
      value={{
        products,
        categories,
        addProduct,
        updateProduct,
        deleteProduct,
        updateStock
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};
