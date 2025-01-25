import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from "./context/CartContext.jsx"; // ایمپورت CartProvider
import "./index.css";
import "./Fonts/IranianSans.ttf";
import "./Fonts/Vazir-FD-WOL.ttf";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <CartProvider> {/* اضافه کردن CartProvider */}
        <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>
);