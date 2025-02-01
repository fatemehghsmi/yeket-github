import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SelectionBoxes.module.css";

const SelectionBoxes = ({
  productId,
  onColorChange,
  onSizeChange,
  onQuantityChange,
}) => {
  const [colors, setColors] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchVariants = async () => {
      try {
        const response = await axios.get(
          `https://yeket.liara.run/api/store/products/${productId}`
        );

        if (response.data.variants) {
          // استخراج رنگ‌ها و سایزها از attributes
          const colorSet = new Set();
          const sizeSet = new Set();

          response.data.variants.forEach((variant) => {
            variant.attributes.forEach((attr) => {
              if (attr.includes("رنگ")) {
                colorSet.add(attr.replace(" (رنگ)", ""));
              } else if (attr.includes("سایز")) {
                sizeSet.add(attr.replace(" (سایز)", ""));
              }
            });
          });

          // تبدیل Set به آرایه و ذخیره در state
          setColors(Array.from(colorSet).map((color, index) => ({ id: index + 1, color })));
          setSizes(Array.from(sizeSet).map((size, index) => ({ id: index + 1, size })));
        }
      } catch (error) {
        console.error("خطا در دریافت اطلاعات از API:", error);
      }
    };

    fetchVariants();
  }, [productId]);

  useEffect(() => {
    setQuantity(1);
    onQuantityChange(1);
  }, [productId, onQuantityChange]);

  const handleColorSelection = (color) => {
    setSelectedColor(color);
    onColorChange(color);
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    onSizeChange(size);
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (value >= 1) {
      setQuantity(value);
      onQuantityChange(value);
    } else {
      setQuantity(1);
      onQuantityChange(1);
    }
  };

  return (
    <div className={styles.selectionBoxes}>
      {/* نمایش باکس رنگ فقط اگر رنگ‌ها وجود داشته باشند */}
      {colors.length > 0 && (
        <div className={styles.colorBox}>
          <label className={styles.labels}>انتخاب رنگ:</label>
          <div className={styles.colorOptions}>
            {colors.map((color) => (
              <div
                key={color.id}
                className={`${styles.colorCircle} ${
                  selectedColor?.color === color.color ? styles.selected : ""
                }`}
                style={{ backgroundColor: color.color }}
                onClick={() => handleColorSelection(color)}
              ></div>
            ))}
          </div>
        </div>
      )}

      {/* نمایش باکس سایز فقط اگر سایزها وجود داشته باشند */}
      {sizes.length > 0 && (
        <div className={styles.sizeBox}>
          <label className={styles.labels}>انتخاب سایز:</label>
          <select
            className={styles.sizeDropdown}
            value={selectedSize?.size || ""}
            onChange={(e) =>
              handleSizeSelection(
                sizes.find((size) => size.size === e.target.value)
              )
            }
          >
            <option value="">انتخاب</option>
            {sizes.map((size) => (
              <option key={size.id} value={size.size}>
                {size.size}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* نمایش باکس تعداد همیشه */}
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
    </div>
  );
};

export default SelectionBoxes;