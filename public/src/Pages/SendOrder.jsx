import React from "react";
import styles from "./SendOrder.module.css";

function SendOrder() {
  return (
    <div dir="rtl" className={styles.container}>
      <h1>نحوه ارسال سفارش</h1>
      <p>
        پس از تکمیل فرآیند خرید، حداکثر 72 ساعت پس از ثبت سفارش، کالای مربوطه
        توسط فروشنده به خریدار ارسال خواهد گردید.
      </p>
      <p>
        لازم به ذکر است مبلغ پرداختی صرفاً بابت کالا بوده و هزینه آن به صورت
        دریافت در مقصد از خریدار دریافت خواهد شد.
      </p>
    </div>
  );
}

export default SendOrder;
