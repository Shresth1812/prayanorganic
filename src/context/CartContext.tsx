import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
  weight: string;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product, weight: string, quantity?: number) => void;
  removeFromCart: (productId: number, weight: string) => void;
  updateQuantity: (productId: number, weight: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getWeightMultiplier: (weight: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'prayan-organic-cart';

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const getWeightMultiplier = (weight: string): number => {
    switch (weight) {
      case '100g': return 1;
      case '250g': return 2.3;
      case '500g': return 4.2;
      default: return 1;
    }
  };

  const addToCart = (product: Product, weight: string, quantity: number = 1) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.product.id === product.id && item.weight === weight
      );
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      
      return [...prev, { product, quantity, weight }];
    });
  };

  const removeFromCart = (productId: number, weight: string) => {
    setItems(prev => prev.filter(
      item => !(item.product.id === productId && item.weight === weight)
    ));
  };

  const updateQuantity = (productId: number, weight: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, weight);
      return;
    }
    
    setItems(prev => prev.map(item => 
      item.product.id === productId && item.weight === weight
        ? { ...item, quantity }
        : item
    ));
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const multiplier = getWeightMultiplier(item.weight);
      return total + (item.product.price * multiplier * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getTotalPrice,
      getWeightMultiplier
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
