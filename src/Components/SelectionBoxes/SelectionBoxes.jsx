import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SelectionBoxes.module.css";

const SelectionBoxes = ({ productId }) => {
  // داده‌ها از API
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const quantities = Array.from({ length: 10 }, (_, i) => i + 1);

  // ذخیره انتخاب‌های کاربر
  const [selectedColor, setSelectedColor] = useState([]);
  const [selectedSize, setSelectedSize] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(1);

  // فراخوانی API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://yeket.liara.run/api/store/products/${productId}`
        );

        // تنظیم داده‌های رنگ و سایز
        if (response.data.colors) {
          setColors(response.data.colors); // داده‌های رنگ
        }
        if (response.data.sizes) {
          setSizes(response.data.sizes); // داده‌های سایز
        }
      } catch (error) {
        console.error("خطا در دریافت اطلاعات از API:", error);
      }
    };

    fetchData();
  }, [productId]);

  return (
    <div className={styles.selectionBoxes}>
      {/* انتخاب رنگ */}
      <div className={styles.box}>
        <label htmlFor="color">انتخاب رنگ:</label>
        <select
          id="color"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          <option value="">رنگ را انتخاب کنید</option>
          {colors.map((color) => (
            <option key={color.id} value={color.title}>
              {color.title}
            </option>
          ))}
        </select>
      </div>

      {/* انتخاب سایز */}
      <div className={styles.box}>
        <label htmlFor="size">انتخاب سایز:</label>
        <select
          id="size"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
        >
          <option value="">سایز را انتخاب کنید</option>
          {sizes.map((size) => (
            <option key={size.id} value={size.title}>
              {size.title}
            </option>
          ))}
        </select>
      </div>

      {/* انتخاب تعداد */}
      <div className={styles.box}>
        <label htmlFor="quantity">انتخاب تعداد:</label>
        <select
          id="quantity"
          value={selectedQuantity}
          onChange={(e) => setSelectedQuantity(e.target.value)}
        >
          {quantities.map((quantity, index) => (
            <option key={index} value={quantity}>
              {quantity}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SelectionBoxes;
