import React from "react";
import styles from "./Customer.module.css";

const Customer = () => {
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
        <div className={styles.ordersSelection}>
          <button className={styles.orderStateBtn} style={{color: "#F36F16"}}> مرجوعی</button>
          <button className={styles.orderStateBtn} style={{color: "#6A994E"}}> سفارش های تحویل شده</button>
          <button className={styles.orderStateBtn} style={{color: "#386641"}}>سفارش های جاری</button>
        </div>
        <div>
        </div>
      </div>
    </div>
  );
};

export default Customer;
