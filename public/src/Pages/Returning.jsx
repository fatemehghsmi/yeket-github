import React from "react";
import styles from "./Returning.module.css";

function Returning() {
  return (
    <div dir="rtl" className={styles.container}>
      <h1>شرایط بازگرداندن کالا</h1>
      <p>
        در صورت مغایرت کالای دریافتی با کالای اعلام شده در وبسایت، حداکثر تا 24
        ساعت پس از تحویل می‌توانید با ثبت گزارش تخلف منتظر تماس تیم پشتیبانی
        باشید.
      </p>
      <p>
        تیم یکت کلیه اقدامات لازم برای بازگرداندن کالا و عودت وجه یا در صورت
        درخواست خریدار اقدام به تعویض کالا را انجام می‌دهد.
      </p>
    </div>
  );
}

export default Returning;
