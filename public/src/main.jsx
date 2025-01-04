import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import HomePage from "./Pages/HomePage.jsx";
import "./Fonts/IranianSans.ttf";
import "./Fonts/Vazir-FD-WOL.ttf";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
