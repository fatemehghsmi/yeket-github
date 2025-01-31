import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
      );

      if (existingProduct) {
        // اگر محصول قبلاً در سبد خرید وجود دارد، تعداد آن را به‌روزرسانی کنید
        return prevCart.map((item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
            ? { ...item, selectedQuantity: item.selectedQuantity + product.selectedQuantity }
            : item
        );
      } else {
        // اگر محصول جدید است، آن را به سبد خرید اضافه کنید
        return [...prevCart, product];
      }
    });
  };

  const removeFromCart = (productToRemove) => {
    setCart((prevCart) =>
      prevCart.filter((product) =>
        product.id !== productToRemove.id ||
        product.selectedColor !== productToRemove.selectedColor ||
        product.selectedSize !== productToRemove.selectedSize
      )
    );
  };
  
  const totalPrice = cart.reduce(
    (total, product) => total + product.price * (product.selectedQuantity || 1),
    0
  );

  const totalItems = cart.reduce(
    (total, product) => total + (product.selectedQuantity || 1),
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, totalPrice, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);