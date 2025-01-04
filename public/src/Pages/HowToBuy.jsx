import React from "react";
import styles from "./HowToBuy.module.css";

function HowToBuy() {
  return (
    <div dir="rtl" className={styles.container}>
      <h1>نحوه خرید و ثبت سفارش</h1>
      <p>
        با انتخاب نوع و تعداد کالا و افزودن آن به سبد خرید و اقدام به پرداخت وجه
        آن به صورت ثبت فیش یا پرداخت آنلاین می‌توانید نسبت به ثبت سفارش اقدام
        نمایید.
      </p>
      <p>لازم به ذکر است هزینه پست محصول به عهده مشتری و در مقصد می‌باشد.</p>
    </div>
  );
}

export default HowToBuy;
