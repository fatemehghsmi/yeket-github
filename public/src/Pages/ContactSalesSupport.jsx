import React from "react";
import styles from "./ContactSalesSupport.module.css";

function ContactSalesSupport() {
  return (
    <div dir="rtl" className={styles.container}>
      <h1>ارتباط با پشتیبانی فروش</h1>
      <p>در صورت نیاز با شماره زیر تماس بگیرید:</p>
      <p className={styles.phone}>09134290190</p>
    </div>
  );
}

export default ContactSalesSupport;
