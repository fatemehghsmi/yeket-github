import React from "react";
import styles from "./HowToSell.module.css";

function HowToSell() {
  return (
    <div dir="rtl" className={styles.container}>
      <h1>نحوه فروش</h1>
      <p>
        فروش در وبسایت یکت به صورت اعلام کالا، ارائه توضیحات کالا و عرضه تصاویر
        کالا به وبسایت یکت توسط عرضه کنندگان و بارگذاری آن روی وبسایت می‌باشد.
      </p>
      <p>
        یکی از شعارهای یکت "اولین فروشگاه بدون تخفیف" است که نشان‌دهنده صداقت و
        قیمت‌گذاری منصفانه است.
      </p>
    </div>
  );
}

export default HowToSell;
