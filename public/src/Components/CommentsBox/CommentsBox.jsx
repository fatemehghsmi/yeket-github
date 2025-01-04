import React from "react";
import styles from "./CommentsBox.module.css";

const CommentsBox = () => {
  const comments = [
    {
      author: "محمد",
      text: "این محصول واقعاً فوق‌العاده است و کیفیتش بسیار بالاست!",
      type: "positive",
      date: "2024-12-20T10:00:00Z",
    },
    {
      author: "علی",
      text: "کیفیت این محصول خوب نبود و به هیچ عنوان پیشنهاد نمی‌کنم. بسته‌بندی نامناسب بود و وقتی کالا رسید، یکی از قسمت‌ها شکسته بود. همچنین زمان ارسال هم بسیار طولانی بود و اصلاً مطابق انتظارم نبود. به نظر می‌رسد که نظارت کافی روی ارسال و کیفیت محصول انجام نمی‌شود.",
      type: "negative",
      date: "2024-12-22T12:30:00Z",
    },
    {
      author: "سارا",
      text: "واقعا ممنونم از تیم پشتیبانی برای پاسخ‌گویی عالی و ارسال سریع.",
      type: "positive",
      date: "2024-12-23T09:45:00Z",
    },
    {
      author: "زهرا",
      text: "بسته‌بندی اصلاً مناسب نبود و یکی از قطعات شکسته بود. متأسفانه تجربه بدی بود. کیفیت محصول هم پایین‌تر از چیزی بود که فکر می‌کردم و رنگ محصول مطابق عکس‌های سایت نبود. انتظار داشتم که ارسال سریع‌تر انجام شود. همچنین اطلاعات موجود در توضیحات محصول کامل و شفاف نبود.",
      type: "negative",
      date: "2024-12-22T11:15:00Z",
    },
    {
      author: "نیما",
      text: "محصول کاملاً با توضیحات مطابقت داشت. از خریدم راضی هستم.",
      type: "positive",
      date: "2024-12-21T08:20:00Z",
    },
    {
      author: "فاطمه",
      text: "محصول دیر به دستم رسید و کیفیت بسته‌بندی اصلاً خوب نبود. همچنین رنگ محصول متفاوت بود و جنس آن هم مطابق انتظارم نبود. به نظرم قیمت نسبت به کیفیت خیلی بالا بود و این مورد اصلاً قابل قبول نیست. اگر امکان بهبود در ارسال و بسته‌بندی فراهم شود، تجربه خرید بهتری خواهد بود.",
      type: "negative",
      date: "2024-12-21T14:00:00Z",
    },
  ];

  const calculateDaysAgo = (date) => {
    const now = new Date();
    const commentDate = new Date(date);
    const diffInMilliseconds = now - commentDate;
    const diffInDays = Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    return diffInDays > 0 ? `${diffInDays} روز پیش` : "امروز";
  };

  const handleReadMore = () => {
    alert("برای مشاهده ادامه متن، لطفاً در سایت ثبت‌نام کنید.");
  };

  const handleAddToCart = () => {
    alert("محصول به سبد خرید اضافه شد!");
  };

  const handleRemoveFromCart = () => {
    alert("محصول از سبد خرید حذف شد!");
  };

  const positiveComments = comments.filter((comment) => comment.type === "positive");
  const negativeComments = comments.filter((comment) => comment.type === "negative");

  return (
    <div className={styles.commentsContainer}>
      {/* ستون کامنت‌های مثبت (سمت راست) */}
      <div className={`${styles.positiveColumn} ${positiveComments.length > 5 ? styles.scrollable : ""}`}>
        <h3 className={styles.cmd}>نظرات مثبت</h3>
        {positiveComments.map((comment, index) => (
          <div key={index} className={`${styles.comment} ${styles.positiveComment}`}>
            <p className={styles.commentAuthor}>
              <strong>{comment.author}</strong> گفت:
            </p>
            <p className={styles.commentText}>{comment.text}</p>
            <p className={styles.commentDate}>{calculateDaysAgo(comment.date)}</p>
            <button className={styles.addToCartBtn} onClick={handleAddToCart}>
              افزودن به سبد خرید
            </button>
          </div>
        ))}
      </div>

      {/* ستون کامنت‌های منفی (سمت چپ) */}
      <div className={`${styles.negativeColumn} ${negativeComments.length > 5 ? styles.scrollable : ""}`}>
        <h3 className={styles.cmd}>نظرات منفی</h3>
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
            <p className={styles.commentDate}>{calculateDaysAgo(comment.date)}</p>
            <button className={styles.removeFromCartBtn} onClick={handleRemoveFromCart}>
              حذف از سبد خرید
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsBox;
