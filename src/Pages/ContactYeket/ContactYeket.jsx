import React from "react";
import styles from "./ContactYeket.module.css";

function ContactYeket() {
  return (
    <div dir="rtl" className={styles.contactContainer}>
      <h1>تماس با یکت</h1>
      <p>در صورت نیاز به تماس، با شماره زیر در ارتباط باشید:</p>
      <p className={styles.phoneNumber}>09134290190</p>
    </div>
  );
}

export default ContactYeket;
