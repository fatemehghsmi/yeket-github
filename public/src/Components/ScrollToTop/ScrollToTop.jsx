import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation(); // آدرس صفحه فعلی را دریافت می‌کند

  useEffect(() => {
    window.scrollTo(0, 0); // اسکرول به بالای صفحه
  }, [pathname]); // هر بار که آدرس تغییر کرد اجرا می‌شود

  return null; // این کامپوننت چیزی نمایش نمی‌دهد
}

export default ScrollToTop;
