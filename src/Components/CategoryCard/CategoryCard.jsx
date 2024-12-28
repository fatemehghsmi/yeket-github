import React from "react";
import styles from "./CategoryCard.module.css";
import { Link } from "react-router-dom";

function CategoryCard({ category }) {
  const link = category.subcollection_ids.length
    ? `/category/${category.id}`
    : `/subcategory/${category.id}`;
 

  return (
    <Link to={link}>
      <div className={styles.container}>
        <img src={category.image} alt="" className={styles.img} />
        <h4 className={styles.title}>{category.title}</h4>
      </div>
    </Link>
  );
}

export default CategoryCard;
