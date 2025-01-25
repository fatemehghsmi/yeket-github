import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // بازیابی سبد خرید از localStorage هنگام بارگذاری برنامه
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // ذخیره‌سازی سبد خرید در localStorage هر زمان که cart تغییر کند
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // تابع برای افزودن محصول به سبد خرید
  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  // تابع برای حذف محصول از سبد خرید
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // تابع برای خالی کردن سبد خرید
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);