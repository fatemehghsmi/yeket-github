import { useState, useEffect, useRef } from "react";
import styles from "./CategoryModal.module.css";
import { IoClose } from "react-icons/io5";
import { GrFormNext } from "react-icons/gr";
import axios from "axios";
import { FadeLoader } from "react-spinners"; // لودر
import { Link } from "react-router-dom";

function CategoryModal({ category, setCategory }) {
  const [categorys, setCategorys] = useState([]);
  const [loading, setLoading] = useState(true); // حالت بارگذاری
  const modalEl = useRef(); // مرجع برای مودال

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      setLoading(true); // فعال کردن حالت بارگذاری
      const response = await axios.get(
        "https://yeket.liara.run/api/store/collections/"
      );
      setCategorys(response.data);
    } catch (error) {
      console.error("خطا در دریافت داده‌ها:", error);
    } finally {
      setLoading(false); // غیرفعال کردن حالت بارگذاری
    }
  };

  useEffect(() => {
    // بررسی کلیک در خارج از مودال
    const handleClickOutside = (event) => {
      if (modalEl.current && !modalEl.current.contains(event.target)) {
        setCategory(false); // بستن مودال
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // اضافه کردن رویداد کلیک
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // پاک کردن رویداد در زمان خروج
    };
  }, [setCategory]);

  useEffect(() => {
    // بستن مودال هنگام اسکرول
    const handleScroll = () => {
      setCategory(false);
    };

    window.addEventListener("scroll", handleScroll); // اضافه کردن رویداد اسکرول
    return () => {
      window.removeEventListener("scroll", handleScroll); // پاک کردن رویداد هنگام خروج
    };
  }, [setCategory]);

  return (
    <div className={styles.container}>
      <div className={styles.category} ref={modalEl}>
        <span className={styles.cross} onClick={() => setCategory(null)}>
          <IoClose size="25px" />
        </span>
        {loading ? ( // نمایش لودر هنگام بارگذاری
          <div className={styles.loading}>
            <FadeLoader
              color="#f0b653"
              height={8} // ارتفاع خطوط
              width={3} // عرض خطوط
              radius={1} // گردی خطوط
              margin={2}
            />
          </div>
        ) : (
          <ul>
            {categorys.map(
              (item) =>
                item.parent == null && (
                  <Link
                    to={
                      item.subcollection_ids.length
                        ? `/category/${item.id}`
                        : `/subcategory/${item.id}`
                    }
                    key={item.id}
                    onClick={() => setCategory(false)} // بستن مودال هنگام کلیک
                  >
                    <li className={styles.title}>
                      {item.title}
                      <GrFormNext className={styles.more} />
                    </li>
                  </Link>
                )
            )}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CategoryModal;
