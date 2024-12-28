import React, { useState, useEffect } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import CategoryModal from "./CategoryModal";
import { Link } from "react-router-dom";
import axios from "axios";
import { FadeLoader } from "react-spinners";

function Header() {
  const [category, setCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // مقدار جستجو
  const [allProducts, setAllProducts] = useState([]); // همه محصولات
  const [searchResults, setSearchResults] = useState([]); // نتایج جستجو
  const [showResults, setShowResults] = useState(false); // نمایش یا مخفی کردن نتایج
  const [loadingSearch, setLoadingSearch] = useState(false); // وضعیت لودینگ

  const showCategoryHandeler = () => {
    setCategory(true);
  };

  // فراخوانی تمامی محصولات از API در اولین بارگیری
  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          "https://yeket.liara.run/api/store/products/"
        );
        setAllProducts(response.data); // ذخیره تمامی محصولات
      } catch (error) {
        console.error("خطا در دریافت اطلاعات محصولات:", error);
      }
    };

    fetchAllProducts();
  }, []);

  // فیلتر کردن محصولات بر اساس عبارت جستجو
  const handleInputChange = async (e) => {
    const term = e.target.value.trim(); // حذف فاصله‌های اضافی
    setSearchTerm(term);

    if (term === "") {
      setSearchResults([]);
      setShowResults(false);
    } else {
      setLoadingSearch(true);
      setShowResults(true);

      const filteredResults = allProducts.filter((product) =>
        product.title.toLowerCase().includes(term.toLowerCase()) // جستجو بر اساس عنوان محصول
      );
      setTimeout(() => {
        setSearchResults(filteredResults);
        setLoadingSearch(false);
      }, 500); // شبیه‌سازی تأخیر برای لودینگ
    }
  };

  const handleResultClick = () => {
    setSearchTerm("");
    setShowResults(false);
  };

  return (
    <header id="header" className={styles.headerContainer}>
      <div className={styles.container}>
        <button className={styles.btn}>ورود | ثبت نام</button>
        <Link to="/" className={styles.logoLink}>
          <p className={styles.header}>یکت</p>
          <img src={logo} alt="" className={styles.logo} />
        </Link>
      </div>
      <div className={styles.container2}>
        <div className={styles.rightSection}>
          <button
            onClick={showCategoryHandeler}
            className={styles.categoryButton}
          >
            دسته بندی
          </button>
          <div className={styles.searchWrapper}>
            <IoSearchOutline className={styles.searchIcon} />
            <input
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="جستجو کنید..."
            />

            {/* نمایش نتایج جستجو */}
            {showResults && (
              <div
                className={`${styles.searchResults} ${
                  searchResults.length >= 4 ? styles.scrollable : ""
                }`}
              >
                {loadingSearch ? (
                  <div className={styles.loadingSearch}>
                    <FadeLoader
                      color="#386641" // رنگ سبز
                      height={6} // ارتفاع کوچک‌تر
                      width={2} // عرض باریک‌تر
                      radius={1} // گردی
                      margin={2}
                    />
                  </div>
                ) : searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <Link
                      to={`/product/${result.id}`}
                      key={result.id}
                      className={styles.resultItem}
                      onClick={handleResultClick} // بستن باکس هنگام کلیک
                    >
                      <p>{result.title}</p>
                    </Link>
                  ))
                ) : (
                  <div className={styles.noResults}>
                    <p>نتیجه‌ای یافت نشد</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.iconsWrapper}>
          <FiShoppingCart className={styles.icon} />
          <GoHeartFill className={styles.icon} />
        </div>
      </div>
      {!!category && (
        <CategoryModal category={category} setCategory={setCategory} />
      )}
    </header>
  );
}

export default Header;
