import React, { useState, useEffect, useRef } from "react";
import styles from "./Header.module.css";
import logo from "../../assets/logo.png";
import { IoSearchOutline } from "react-icons/io5";
import { GoHeartFill } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";
import { RiDeleteBin5Fill } from "react-icons/ri";
import CategoryModal from "./CategoryModal";
import { Link } from "react-router-dom";
import axios from "axios";
import { FadeLoader } from "react-spinners";
import { useCart } from "../../context/CartContext";

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

  const { cart, addToCart, removeFromCart, totalPrice, totalItems } = useCart();

  const showCategoryHandler = () => {
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

  const handleInputChange = (e) => {
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
    setShowCart((prev) => !prev);
  };


  
  return (
    <header id="header" className={styles.headerContainer}>
      <div className={styles.container}>
        <button className={styles.btn}>ورود | ثبت نام</button>
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="logo" className={styles.logo} />
          <p className={styles.header}>یکت</p>
          <p className={styles.header2}>اولین فروشگاه بدون تخفیف</p>
        </Link>
      </div>
      <div className={styles.container2}>
        <button onClick={showCategoryHandler} className={styles.categoryButton}>
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
                searchResults.map((result, index) => (
                  <Link
                    to={`/product/${result.id}`}
                    key={`${result.id}-${index}`}
                    className={styles.resultItem}
                    onClick={handleResultClick}
                  >
                    <p>{result.title}</p>
                    <p className={styles.categorytitle}>
                      {result.collection.title}
                    </p>
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
          <button className={styles.cartIconWrapper} onClick={toggleCart}>
            {totalItems > 0 && (
              <span className={styles.cartBadge}>{totalItems}</span>
            )}
            <FiShoppingCart className={styles.icon} />
          </button>
          <GoHeartFill className={styles.icon} />
        </div>

        {showCart && (
  <div className={styles.cartDropdown} ref={cartRef}>
    <h3 className={styles.cartTitle}>سبد خرید</h3>
    {cart.length === 0 ? (
      <p className={styles.emptyCart}>سبد خرید شما خالی است.</p>
    ) : (
      <>
        <ul className={styles.cartList}>
        {cart.map((product, index) => (
  <li key={`${product.id}-${index}`} className={styles.cartItem}>
    <div className={styles.productHeader}>
      <img
        src={product.image?.image || 'path/to/default-image.jpg'}
        alt={product.title}
        className={styles.productImage}
      />
      <h4 className={styles.productTitle}>{product.title}</h4>
    </div>
    <div className={styles.productAttributes}>
      {/* نمایش رنگ و سایز اگر attributes وجود داشته باشد */}
      {product.variants && product.variants.length > 0 && (
        <>
          {product.variants[0].attributes.map((attr, idx) => {
            if (attr.includes("رنگ")) {
              return (
                <p key={idx}>
                  رنگ{" "}
                  <span
                    className={styles.colorCircle}
                    style={{ backgroundColor: attr.replace(" (رنگ)", "") }}
                  ></span>
                </p>
              );
            } else if (attr.includes("سایز")) {
              return (
                <p key={idx}>سایز {attr.replace(" (سایز)", "")}</p>
              );
            }
            return null;
          })}
        </>
      )}
      <p>تعداد {product.selectedQuantity || 1}</p>
      <p className={styles.productPrice}>
        {new Intl.NumberFormat('fa-IR').format(
          product.price * (product.selectedQuantity || 1)
        )}{" "}
        تومان
      </p>
      <RiDeleteBin5Fill
        onClick={() => removeFromCart(product)} // ارسال محصول به تابع removeFromCart
        className={styles.deleteIcon}
      />
    </div>
  </li>
))}
        </ul>
        <div className={styles.cartTotal}>
          <p>مجموع: {new Intl.NumberFormat('fa-IR').format(totalPrice)} تومان</p>
          <Link to="/checkout" className={styles.checkoutButton}>
            پرداخت
          </Link>
        </div>
      </>
    )}
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