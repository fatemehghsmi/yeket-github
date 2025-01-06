import React from "react";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  function formatNumber(num) {
    if (!num) return ""; // اگر مقدار عددی وجود ندارد
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  return (
    <Link to={`/product/${product.id}`}>
      <div className={styles.card}>
        <img src={product.images[0].image} alt="" className={styles.img} />
        <p className={styles.title}>{product.title}</p>
        <button className={styles.price}>
          {formatNumber(product.unit_price)}&nbsp; تومان
        </button>
      </div>
    </Link>
  );
}

export default ProductCard;
