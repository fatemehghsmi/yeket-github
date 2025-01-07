import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SelectionBoxes.module.css";

const SelectionBoxes = ({ productId }) => {
  const [colors, setColors] = useState([]); // ذخیره رنگ‌ها
  const [sizes, setSizes] = useState([]); // ذخیره سایزها
  const [selectedColor, setSelectedColor] = useState(null); // رنگ انتخاب‌شده
  const [selectedSize, setSelectedSize] = useState(null); // سایز انتخاب‌شده
  const [quantity, setQuantity] = useState(1); // تعداد انتخاب‌شده

  // دریافت داده‌ها از API
  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await axios.get(
          `https://yeket.liara.run/api/store/products/${productId}`
        );

        if (response.data.variants) {
          const colorVariants = response.data.variants.map((variant) => ({
            id: variant.id,
            color: variant.color,
          }));
          const sizeVariants = response.data.variants.map((variant) => ({
            id: variant.id,
            size: variant.size,
          }));

          // حذف سایزهای تکراری
          const uniqueSizes = Array.from(
            new Set(sizeVariants.map((variant) => variant.size))
          ).map((size) => ({
            id: sizeVariants.find((variant) => variant.size === size).id,
            size,
          }));

          setColors(colorVariants);
          setSizes(uniqueSizes);
        }
      } catch (error) {
        console.error("خطا در دریافت اطلاعات از API:", error);
      }
    };

    fetchVariants();
  }, [productId]);

  const handleColorSelection = (color) => {
    setSelectedColor(color); // تنظیم رنگ انتخاب‌شده
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size); // تنظیم سایز انتخاب‌شده
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0) {
      setQuantity(value); // تنظیم مقدار انتخاب‌شده
    }
  };

  return (
    <div className={styles.selectionBoxes}>
     

      {/* انتخاب سایز */}
      <div className={styles.sizeBox}>
        <label className={styles.labels}>انتخاب سایز:</label>
        <select
          className={styles.sizeDropdown}
          value={selectedSize || ""}
          onChange={(e) =>
            handleSizeSelection(
              sizes.find((size) => size.size === e.target.value)
            )
          }
        >
          <option value="">سایز را انتخاب کنید</option>
          {sizes.map((size) => (
            <option key={size.id} value={size.size}>
              {size.size}
            </option>
          ))}
        </select>
      </div>

      {/* انتخاب تعداد */}
      <div className={styles.quantityBox}>
        <label className={styles.labels}>تعداد:</label>
        <input
          type="number"
          className={styles.quantityInput}
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
      </div>
       {/* انتخاب رنگ */}
       <div className={styles.colorBox}>
        <label className={styles.labels}>انتخاب رنگ:</label>
        <div className={styles.colorOptions}>
          {colors.map((color) => (
            <div
              key={color.id}
              className={`${styles.colorCircle} ${
                selectedColor === color ? styles.selected : ""
              }`}
              style={{ backgroundColor: color.color }}
              onClick={() => handleColorSelection(color)}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectionBoxes;
