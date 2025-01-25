import React, { useState } from "react";
import styles from "./Customer.module.css";

const Customer = () => {
  // state برای کنترل نمایش ordersSelection
  const [showOrdersSelection, setShowOrdersSelection] = useState(false);

  // state برای ذخیره‌ی دکمه‌ی فعال
  const [activeButton, setActiveButton] = useState(null);

  // تابع برای نمایش ordersSelection هنگام کلیک روی "سفارش های من"
  const handleOrdersClick = () => {
    setShowOrdersSelection(true); // نمایش ordersSelection
    setActiveButton("orders"); // فعال کردن دکمه‌ی "سفارش های من"
  };

  // تابع برای مخفی کردن ordersSelection و تغییر دکمه‌ی فعال
  const handleOtherClicks = (buttonName) => {
    setShowOrdersSelection(false); // مخفی کردن ordersSelection
    setActiveButton(buttonName); // فعال کردن دکمه‌ی کلیک‌شده
  };

  return (
    <div className={styles.container}>
      <div className={styles.firstContainer}>
        <div className={styles.selectionPart}>
          <button className={styles.hami}>حامی</button>
          <button className={styles.vendor}>فروشگاه من</button>
          <button className={styles.customer}>خرید های من</button>
        </div>
        <div className={styles.information}>
          <div className={styles.infoItem}>
            <p className={styles.infoTitle}>منصور حاج ابراهیمی</p>
            <button className={styles.infoButton}>ویرایش</button>
          </div>
          <div className={styles.infoItem}>
            <p className={styles.infoTitle}>کیف پول:</p>
            <button className={styles.infoButton}>افزایش اعتبار</button>
          </div>
        </div>
      </div>
      <div className={styles.secondContainer}>
        {/* نمایش ordersSelection فقط اگر showOrdersSelection true باشد */}
        {showOrdersSelection && (
          <div className={styles.ordersSelection}>
            <button
              className={styles.orderStateBtn}
              style={{ color: "#F36F16" }}
            >
              مرجوعی
            </button>
            <button
              className={styles.orderStateBtn}
              style={{ color: "#6A994E" }}
            >
              سفارش های تحویل شده
            </button>
            <button
              className={styles.orderStateBtn}
              style={{ color: "#386641" }}
            >
              سفارش های جاری
            </button>
          </div>
        )}

        {/* mainContainer همیشه نمایش داده می‌شود */}
        <div className={styles.mainContainer}>
          {/* محتوای mainContainer اینجا قرار می‌گیرد */}
        </div>

        {/* sideBar */}
        <div className={styles.sideBar}>
          <button
            className={`${styles.sideBarItem} ${
              activeButton === "orders" ? styles.active : ""
            }`}
            onClick={handleOrdersClick} // نمایش ordersSelection هنگام کلیک روی "سفارش های من"
          >
            سفارش های من
          </button>
          <button
            className={`${styles.sideBarItem} ${
              activeButton === "cart" ? styles.active : ""
            }`}
            onClick={() => handleOtherClicks("cart")} // فعال کردن دکمه‌ی "سبد خرید"
          >
            سبد خرید
          </button>
          <button
            className={`${styles.sideBarItem} ${
              activeButton === "favorites" ? styles.active : ""
            }`}
            onClick={() => handleOtherClicks("favorites")} // فعال کردن دکمه‌ی "لیست مورد علاقه ها"
          >
            لیست مورد علاقه ها
          </button>
          <button
            className={`${styles.sideBarItem} ${
              activeButton === "comments" ? styles.active : ""
            }`}
            onClick={() => handleOtherClicks("comments")} // فعال کردن دکمه‌ی "دیدگاه ها"
          >
            دیدگاه ها
          </button>
          <button
            className={`${styles.sideBarItem} ${
              activeButton === "addresses" ? styles.active : ""
            }`}
            onClick={() => handleOtherClicks("addresses")} // فعال کردن دکمه‌ی "آدرس ها"
          >
            آدرس ها
          </button>
          <button
            className={`${styles.sideBarItem} ${
              activeButton === "account" ? styles.active : ""
            }`}
            onClick={() => handleOtherClicks("account")} // فعال کردن دکمه‌ی "اطلاعات حساب"
          >
            اطلاعات حساب
          </button>
          <button
            className={`${styles.sideBarItem} ${
              activeButton === "logout" ? styles.active : ""
            }`}
            onClick={() => handleOtherClicks("logout")} // فعال کردن دکمه‌ی "خروج"
          >
            خروج
          </button>
        </div>
      </div>
    </div>
  );
};

export default Customer;