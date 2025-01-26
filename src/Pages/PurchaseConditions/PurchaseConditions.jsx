import React from "react";
import styles from "./PurchaseConditions.module.css";

function PurchaseConditions() {
  return (
    <div dir="rtl" className={styles.container}>
      <h1>شرایط خرید</h1>
      <p>
        تمامی مراجعه کنندگان به وبسایت می‌توانند به راحتی خرید از یک فروشگاه
        حقیقی، اقدام به خرید نمایند و با پرداخت وجه امن با تضمین وبسایت یکت، تا
        دریافت کالا و تایید عدم مغایرت با محصول عرضه شده در وبسایت توسط فروشنده،
        از طلب وجه خود و مرجوعی کالا اطمینان خاطر داشته باشند.
      </p>
    </div>
  );
}

export default PurchaseConditions;
