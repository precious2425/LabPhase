import React from 'react';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem('shopsphere_cart') || '[]'));

  useEffect(() => localStorage.setItem('shopsphere_cart', JSON.stringify(items)), [items]);

  function addToCart(product, quantity = 1) {
    setItems(current => {
      const found = current.find(item => item.product === product._id);
      if (found) return current.map(item => item.product === product._id
        ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) } : item);
      return [...current, { product: product._id, name: product.name, image: product.image, price: product.price, stock: product.stock, quantity }];
    });
  }
  function updateQuantity(id, quantity) {
    setItems(current => current.map(item => item.product === id
      ? { ...item, quantity: Math.max(1, Math.min(Number(quantity), item.stock)) } : item));
  }
  function removeFromCart(id) { setItems(current => current.filter(item => item.product !== id)); }
  function clearCart() { setItems([]); }

  const total = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);
  const count = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);

  return <CartContext.Provider value={{ items, addToCart, updateQuantity, removeFromCart, clearCart, total, count }}>{children}</CartContext.Provider>;
}
export const useCart = () => useContext(CartContext);
