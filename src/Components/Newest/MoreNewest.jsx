import React, { useState, useEffect } from "react";
import ProductCard from "../Card/ProductCard";
import styles from "./MoreNewest.module.css";
import { GrFormNext } from "react-icons/gr";
import axios from "axios";
import "../../Fonts/B-NAZANIN.ttf";
import { FaSortAmountDown } from "react-icons/fa";
function MoreNewest() {
  const [products, setProducts] = useState([]);
  const [categorys, setCategorys] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const categoryResponse = await axios.get(
      "https://yeket.liara.run/api/store/collections/"
    );
    setCategorys(categoryResponse.data);
    const response = await axios.get(
      "https://yeket.liara.run/api/store/products/"
    );
    setProducts(response.data);
  };
  return (
    <div>
      <h2 className={styles.title}> جدیدترین ها</h2>

      <div className={styles.container}>
        <div className={styles.morecontainer}>
          {products.map((product) => (
            <div className={styles.product} key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
        <div className={styles.sidebar}>
          <h4>همه</h4>
          {categorys.map(
            (item) => item.parent == null && <p key={item.id}>{item.title}</p>
          )}
          <div className={styles.sortcontainer}>
            <h3>
              مرتب کردن بر اساس&nbsp;
              <FaSortAmountDown />
            </h3>
            <p>ارزان ترین</p>
            <p>گران ترین</p>
            <p>مورد علاقه ها</p>
            <p>پیشنهاد حامی</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MoreNewest;
