import React from "react";
import styles from "./ReaportInYeket.module.css";

function ReaportInYeket() {
  return (
    <div dir="rtl" className={styles.reportContainer}>
      <h1>گزارش تخلف در یکت</h1>
      <p>
        در صورت هر گونه مغایرت کالای تحویل شده با کالای معرفی شده در وبسایت توسط
        فروشنده، لطفاً فرم زیر را پر کنید:
      </p>
      <form>
        <textarea
          className={styles.textarea}
          placeholder="شرح تخلف را وارد کنید..."
        ></textarea>
        <button type="submit" className={styles.submitButton}>
          ارسال گزارش
        </button>
      </form>
    </div>
  );
}

export default ReaportInYeket;
