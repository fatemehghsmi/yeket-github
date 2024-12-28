import React from "react";
import styles from "./ProductCard.module.css";
import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link to={`/product/${product.id}`} >
      <div className={styles.card}>
        <img src={product.images[0].image} alt="" className={styles.img} />
        <p className={styles.title}>{product.title}</p>
        <button className={styles.price}>{product.unit_price}</button>
      </div>
    </Link>
  );
}

export default ProductCard;
