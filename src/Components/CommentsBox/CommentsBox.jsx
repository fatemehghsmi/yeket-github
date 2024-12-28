import React from "react";
import styles from "./CommentsBox.module.css";

const CommentsBox = () => {
  const comments = [
    {
      author: "محمد",
      text: "این محصول واقعاً فوق‌العاده است و کیفیتش بسیار بالاست!",
      type: "positive",
    },
    {
      author: "علی",
      text: "کیفیت این محصول خوب نبود و به هیچ عنوان پیشنهاد نمی‌کنم. بسته‌بندی نامناسب بود و وقتی کالا رسید، یکی از قسمت‌ها شکسته بود. همچنین زمان ارسال هم بسیار طولانی بود و اصلاً مطابق انتظارم نبود.",
      type: "negative",
    },
    {
      author: "سارا",
      text: "واقعا ممنونم از تیم پشتیبانی برای پاسخ‌گویی عالی و ارسال سریع.",
      type: "positive",
    },
    {
      author: "زهرا",
      text: "بسته‌بندی اصلاً مناسب نبود و یکی از قطعات شکسته بود. متأسفانه تجربه بدی بود. کیفیت محصول هم پایین‌تر از چیزی بود که فکر می‌کردم و رنگ محصول مطابق عکس‌های سایت نبود. انتظار داشتم که ارسال سریع‌تر انجام شود.",
      type: "negative",
    },
    {
      author: "نیما",
      text: "محصول کاملاً با توضیحات مطابقت داشت. از خریدم راضی هستم.",
      type: "positive",
    },
    {
      author: "فاطمه",
      text: "محصول دیر به دستم رسید و کیفیت بسته‌بندی اصلاً خوب نبود. همچنین رنگ محصول متفاوت بود و جنس آن هم مطابق انتظارم نبود. به نظرم قیمت نسبت به کیفیت خیلی بالا بود و این مورد اصلاً قابل قبول نیست.",
      type: "negative",
    },
  ];

  const handleReadMore = () => {
    alert("برای مشاهده ادامه متن، لطفاً در سایت ثبت‌نام کنید.");
  };

  const positiveComments = comments.filter((comment) => comment.type === "positive");
  const negativeComments = comments.filter((comment) => comment.type === "negative");

  return (
    <div className={styles.commentsContainer}>
      {/* ستون کامنت‌های مثبت (سمت راست) */}
      <div className={styles.positiveColumn}>
        <h3>نظرات مثبت</h3>
        {positiveComments.map((comment, index) => (
          <div key={index} className={`${styles.comment} ${styles.positiveComment}`}>
            <p className={styles.commentAuthor}>
              <strong>{comment.author}</strong> گفت:
            </p>
            <p className={styles.commentText}>{comment.text}</p>
          </div>
        ))}
      </div>

      {/* ستون کامنت‌های منفی (سمت چپ) */}
      <div className={styles.negativeColumn}>
        <h3>نظرات منفی</h3>
        {negativeComments.map((comment, index) => (
          <div key={index} className={`${styles.comment} ${styles.negativeComment}`}>
            <p className={styles.commentAuthor}>
              <strong>{comment.author}</strong> گفت:
            </p>
            <p className={styles.commentText}>
              {comment.text.length > 100 ? (
                <>
                  {comment.text.substring(0, 100)}...
                  <span className={styles.readMore} onClick={handleReadMore}>
                    ادامه...
                  </span>
                </>
              ) : (
                comment.text
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsBox;
