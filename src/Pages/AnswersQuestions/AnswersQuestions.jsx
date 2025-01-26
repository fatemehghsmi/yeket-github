import React from "react";
import styles from "./AnswersQuestions.module.css";

function AnswersQuestions() {
  return (
    <div dir="rtl" className={styles.container}>
      <h1>پاسخ به پرسش‌های متداول</h1>
      <div className={styles.question}>
        <h2>1- چرا یکت فروشگاه بدون تخفیف است؟</h2>
        <p>
          یکی از شعارهای یکت رفتار صادقانه و قیمت‌های منصفانه و معقول کالاها
          می‌باشد.
        </p>
      </div>
      <div className={styles.question}>
        <h2>2- آیا فروشندگان می‌توانند کالاهای خود را حضوری بفروشند؟</h2>
        <p>
          بله، با اعلام مشخصات و نشانی فروشگاه خود، فروشندگان می‌توانند به صورت
          حضوری نیز کالا را بفروشند و امتیازات ویژه‌ای کسب کنند.
        </p>
      </div>
    </div>
  );
}

export default AnswersQuestions;
