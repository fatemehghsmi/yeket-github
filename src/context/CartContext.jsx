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
      // بررسی وجود ویژگی‌ها
      const hasColor = product.selectedColor !== null && product.selectedColor !== undefined;
      const hasSize = product.selectedSize !== null && product.selectedSize !== undefined;
  
      // پیدا کردن محصول موجود در سبد خرید
      const existingProduct = prevCart.find((item) => {
        const matchId = item.id === product.id;
        const matchColor = hasColor ? item.selectedColor === product.selectedColor : true;
        const matchSize = hasSize ? item.selectedSize === product.selectedSize : true;
        return matchId && matchColor && matchSize;
      });
  
      if (existingProduct) {
        // اگر محصول قبلاً در سبد خرید وجود دارد، تعداد آن را به‌روزرسانی کنید
        return prevCart.map((item) => {
          const matchId = item.id === product.id;
          const matchColor = hasColor ? item.selectedColor === product.selectedColor : true;
          const matchSize = hasSize ? item.selectedSize === product.selectedSize : true;
  
          if (matchId && matchColor && matchSize) {
            return {
              ...item,
              selectedQuantity: item.selectedQuantity + product.selectedQuantity,
            };
          } else {
            return item;
          }
        });
      } else {
        // اگر محصول جدید است، آن را به سبد خرید اضافه کنید
        return [
          ...prevCart,
          {
            ...product,
            selectedColor: hasColor ? product.selectedColor : null, // تنظیم به null اگر رنگ وجود نداشته باشد
            selectedSize: hasSize ? product.selectedSize : null, // تنظیم به null اگر سایز وجود نداشته باشد
          },
        ];
      }
    });
  };

  const removeFromCart = (productToRemove) => {
    setCart((prevCart) =>
      prevCart.filter((product) => {
        // مقایسه‌ی id
        if (product.id !== productToRemove.id) {
          return true; // اگر id متفاوت باشد، محصول نگه‌داشته می‌شود
        }
  
        // مقایسه‌ی selectedColor (اگر وجود داشته باشد)
        if (
          productToRemove.selectedColor !== null &&
          productToRemove.selectedColor !== undefined
        ) {
          if (product.selectedColor !== productToRemove.selectedColor) {
            return true; // اگر رنگ متفاوت باشد، محصول نگه‌داشته می‌شود
          }
        }
  
        // مقایسه‌ی selectedSize (اگر وجود داشته باشد)
        if (
          productToRemove.selectedSize !== null &&
          productToRemove.selectedSize !== undefined
        ) {
          if (product.selectedSize !== productToRemove.selectedSize) {
            return true; // اگر سایز متفاوت باشد، محصول نگه‌داشته می‌شود
          }
        }
  
        // اگر همه‌ی مقایسه‌ها مطابقت داشته باشند، محصول حذف می‌شود
        return false;
      })
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