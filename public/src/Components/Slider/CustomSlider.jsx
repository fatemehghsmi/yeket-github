import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { FadeLoader } from "react-spinners"; // برای بارگذاری
import styles from "./CustomSlider.module.css";

function CustomSlider({ productId }) {
  const [images, setImages] = useState([]); // تصاویر اصلی
  const [currentIndex, setCurrentIndex] = useState(0); // اندیس تصویر فعال (پیش‌فرض 0)
  const [isLoading, setIsLoading] = useState(true); // مدیریت بارگذاری

  // فراخوانی تصاویر از API
  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true); // فعال کردن بارگذاری
      try {
        const response = await axios.get(
          `https://yeket.liara.run/api/store/products/${productId}`
        );
        setImages(response.data.images);
        setCurrentIndex(0); // بازنشانی به اولین تصویر
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false); // غیرفعال کردن بارگذاری
      }
    };

    fetchImages();
  }, [productId]);

  // جابه‌جایی به تصویر بعدی
  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // جابه‌جایی به تصویر قبلی
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // کلیک روی تصاویر کوچک
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  // حالت بارگذاری
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <FadeLoader color="#a7c957" height={15} width={5} radius={2} margin={2} />
      </div>
    );
  }

  // اگر تصویری برای نمایش وجود ندارد
  if (!images || images.length === 0) {
    return <p>تصویری برای نمایش وجود ندارد.</p>;
  }

  return (
    <div className={styles.sliderContainer}>
      {/* نوار تصاویر اصلی */}
      <div
        className={styles.sliderTrack}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // حرکت به سمت تصویر فعال
        }}
      >
        {images.map((image, index) => (
          <div key={index} className={styles.slide}>
            <img
              src={image.image}
              alt={`Slide ${index}`}
              className={styles.image} // استفاده از استایل به‌روزرسانی شده
            />
          </div>
        ))}
      </div>

      {/* دکمه‌های ناوبری */}
      <button
        className={`${styles.navButton} ${styles.prevButton}`}
        onClick={handlePrev}
        disabled={currentIndex === 0}
      >
        <IoIosArrowBack size={20} />
      </button>
      <button
        className={`${styles.navButton} ${styles.nextButton}`}
        onClick={handleNext}
        disabled={currentIndex === images.length - 1}
      >
        <IoIosArrowForward size={20} />
      </button>

      {/* تصاویر کوچک (Thumbnails) */}
      <div className={styles.thumbnails}>
        {images.map((thumbnail, index) => (
          <div
            key={index}
            className={`${styles.thumbnail} ${
              currentIndex === index ? styles.activeThumbnail : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
          >
            <img
              src={thumbnail.image}
              alt={`Thumbnail ${index}`}
              className={styles.thumbnailImage}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CustomSlider;
