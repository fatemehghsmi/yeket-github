import React from "react";
import styles from "./PaymentGuide.module.css";

function PaymentGuide() {
  return (
    <div dir="rtl" className={styles.container}>
      <h1>راهنمای پرداخت</h1>
      <p>
        برای پرداخت وجه محصولات می‌توانید علاوه بر پرداخت از درگاه‌های پرداخت
        وبسایت، در صورت عدم پاسخگویی سامانه پرداخت، با ارسال وجه مورد نظر به
        شماره حساب و یا کارت‌های متعلق به وبسایت یکت و ارسال فیش آن به شماره
        پشتیبانی اقدام به تکمیل فرایند خرید نمایید.
      </p>
      <ul>
        <li>شماره کارت: [شماره کارت]</li>
        <li>شماره حساب: [شماره حساب]</li>
        <li>شماره شبا: [شماره شبا]</li>
      </ul>
    </div>
  );
}

export default PaymentGuide;
