import React from "react";
import styles from "./SubCategoryCard.module.css";
import { Link } from "react-router-dom";

const SubCategoryCard = ({ subCategory }) => {
  const link = subCategory.subcollection_ids.length
    ? `/category/${subCategory.id}`
    : `/subcategory/${subCategory.id}`;
  console.log(link);

  return (
    <Link to={link}>
      <div className={styles.container}>
        <img src={subCategory.image} alt="" className={styles.img} />
        <h4 className={styles.title}>{subCategory.title}</h4>
      </div>
    </Link>
  );
};

export default SubCategoryCard;
