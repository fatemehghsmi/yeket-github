import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import CategoryModal from "./CategoryModal";
import { Link } from "react-router-dom";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import { useCart } from "../../context/CartContext"; // ایمپورت useCart

function Header() {
  const [category, setCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const resultsRef = useRef(null);
  const cartRef = useRef(null);

  const { cart, removeFromCart } = useCart(); // استفاده از useCart

  const showCategoryHandeler = () => {
    setCategory(true);
  };

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get(
          "https://yeket.liara.run/api/store/products/"
        );
        setAllProducts(response.data);
      } catch (error) {
        console.error("خطا در دریافت اطلاعات محصولات:", error);
      }
    };

    fetchAllProducts();
  }, []);

  const handleInputChange = async (e) => {
    const term = e.target.value.trim();
    setSearchTerm(term);

    if (term === "") {
      setSearchResults([]);
      setShowResults(false);
    } else {
      setLoadingSearch(true);
      setShowResults(true);

      const filteredResults = allProducts.filter((product) =>
        product.title.toLowerCase().includes(term.toLowerCase())
      );
      setTimeout(() => {
        setSearchResults(filteredResults);
        setLoadingSearch(false);
      }, 500);
    }
  };

  const handleResultClick = () => {
    setSearchTerm("");
    setShowResults(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowResults(false);
        setSearchTerm("");
      }

      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setShowCart(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleCart = () => {
    console.log("Toggle Cart:", !showCart); // بررسی تغییر state
    setShowCart(!showCart);
  };

  return (
    <header id="header" className={styles.headerContainer}>
      <div className={styles.container}>
        <button className={styles.btn}>ورود | ثبت نام</button>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="" className={styles.logo} />
          <p className={styles.header}>یکت</p>
          <p className={styles.header2}>اولین فروشگاه بدون تخفیف</p>
        </Link>
      </div>
      <div className={styles.container2}>
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

          {showResults && (
            <div
              className={`${styles.searchResults} ${
                searchResults.length >= 4 ? styles.scrollable : ""
              }`}
              ref={resultsRef}
            >
              {loadingSearch ? (
                <div className={styles.loadingSearch}>
                  <FadeLoader
                    color="#386641"
                    height={6}
                    width={2}
                    radius={1}
                    margin={2}
                  />
                </div>
              ) : searchResults.length > 0 ? (
                searchResults.map((result) => (
                  <Link
                    to={`/product/${result.id}`}
                    key={result.id}
                    className={styles.resultItem}
                    onClick={handleResultClick}
                  >
                    <p>{result.title}</p>
                    <p className={styles.categorytitle}>{result.collection.title}</p>
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

        <div className={styles.iconsWrapper}>
          <FiShoppingCart
            className={styles.icon}
            onClick={toggleCart}
          />
          <GoHeartFill className={styles.icon} />
        </div>

        {showCart && (
          <div className={styles.cartDropdown} ref={cartRef}>
            <h3>سبد خرید</h3>
            <ul>
              {cart.length === 0 ? (
                <p>سبد خرید شما خالی است.</p>
              ) : (
                cart.map((product) => (
                  <li key={product.id}>
                    <p>{product.title}</p>
                    <button onClick={() => removeFromCart(product.id)}>
                      حذف
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
      {!!category && (
        <CategoryModal category={category} setCategory={setCategory} />
      )}
    </header>
  );
}

export default Header;