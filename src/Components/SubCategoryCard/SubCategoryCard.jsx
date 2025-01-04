import React from "react";
import styles from "./SubCategoryCard.module.css";
import { Link } from "react-router-dom";

const SubCategoryCard = ({ subCategory }) => {
  const link = subCategory.subcollection_ids.length
    ? `/category/${subCategory.id}`
    : `/subcategory/${subCategory.id}`;
  // console.log(subCategory.title);

  return (
    <Link to={link}>
      <div className={styles.container}>
        <img src={subCategory.image} alt="" className={styles.img} />
      </div>
      <h1 className={styles.title}>{subCategory.title}</h1>
    </Link>
  );
};

export default SubCategoryCard;
