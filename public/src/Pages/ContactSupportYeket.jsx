import React from "react";
import styles from "./ContactSupportYeket.module.css";

function ContactSupportYeket() {
  return (
    <div dir="rtl" className={styles.supportContainer}>
      <h1>ارتباط با پشتیبانی یکت</h1>
      <form>
        <input
          className={styles.input}
          type="text"
          placeholder="نام و نام خانوادگی"
        />
        <input className={styles.input} type="text" placeholder="شماره تلفن" />
        <textarea
          className={styles.textarea}
          placeholder="شرح درخواست..."
        ></textarea>
        <button type="submit" className={styles.submitButton}>
          ارسال درخواست
        </button>
      </form>
      <p>
        در مواقع ضروری با شماره{" "}
        <span className={styles.phone}>09393677744</span> تماس بگیرید.
      </p>
    </div>
  );
}

export default ContactSupportYeket;
