import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./SubCategoryPage.module.css";
import ProductCard from "../Components/Card/ProductCard";
import { useParams } from "react-router-dom";

const SubCategoryPage = () => {
  const { collectionId } = useParams(); // شناسه کالکشن
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    attributes: [],
    min_price: "",
    max_price: "",
    in_stock: false,
  });
  const [attributes, setAttributes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // دریافت لیست اتریبیوت‌ها
  const fetchAttributes = async () => {
    try {
      const response = await axios.get(
        `https://yeket.liara.run/api/store/collections/${collectionId}/attributes/`
      );
      setAttributes(response.data);
    } catch {
      setError("Failed to fetch attributes for the collection.");
    }
  };

  // دریافت لیست محصولات
  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();

      if (filters.min_price) queryParams.append("min_price", filters.min_price);
      if (filters.max_price) queryParams.append("max_price", filters.max_price);
      if (filters.in_stock) queryParams.append("in_stock", filters.in_stock);

      filters.attributes.forEach((attr) =>
        queryParams.append("attributes", attr)
      );

      const response = await axios.get(
        `https://yeket.liara.run/api/store/collections/${collectionId}/products/?${queryParams.toString()}`
      );

      setProducts(response.data);
    } catch {
      setError("Failed to fetch products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // تغییر مقادیر فیلترها
  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: checked,
      }));
    } else if (name === "attributes") {
      const attrTitle = e.target.getAttribute("data-title");
      setFilters((prevFilters) => {
        const newAttributes = [...prevFilters.attributes];
        const attrString = `${attrTitle}:${value}`;
        const index = newAttributes.findIndex((attr) =>
          attr.startsWith(attrTitle)
        );
        if (value === "") {
          if (index > -1) newAttributes.splice(index, 1);
        } else {
          if (index > -1) {
            newAttributes[index] = attrString;
          } else {
            newAttributes.push(attrString);
          }
        }
        return { ...prevFilters, attributes: newAttributes };
      });
    } else {
      setFilters((prevFilters) => ({
        ...prevFilters,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    fetchAttributes();
    fetchProducts();
  }, [filters, collectionId]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1>محصولات</h1>
        {/* {loading && <p>Loading products...</p>} */}
        {error && <p className={styles.error}>{error}</p>}
        <div className={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </main>
      <aside className={styles.sidebar}>
        <h2>فیلترها</h2>
        <div className={styles.filterContainer}>
          <div
            className={`${styles.filterGroup} ${
              filters.min_price ? styles.active : styles.inactive
            }`}
          >
            <label>کمترین قیمت</label>
            <input
              type="number"
              name="min_price"
              value={filters.min_price}
              onChange={handleFilterChange}
              placeholder="کمترین قیمت مدنظر خود را وارد کنید"
            />
          </div>
          <div
            className={`${styles.filterGroup} ${
              filters.max_price ? styles.active : styles.inactive
            }`}
          >
            {" "}
            <label>بیشترین قیمت</label>
            <input
              type="number"
              name="max_price"
              value={filters.max_price}
              onChange={handleFilterChange}
              placeholder="بیشترین قیمت مدنظر خود را وارد کنید"
            />
          </div>
          <div
            className={`${styles.filterGroup} ${
              filters.in_stock ? styles.active : styles.inactive
            }`}
          >
            {/* {" "}
            <label>موجود </label>
            <input
              type="checkbox"
              name="in_stock"
              checked={filters.in_stock}
              onChange={handleFilterChange}
              className={styles.checkbox}
            /> */}
          </div>
          {attributes.map((attribute) => (
            <div
              className={`${styles.filterGroup} ${
                filters.attributes.some((attr) =>
                  attr.startsWith(attribute.title)
                )
                  ? styles.active
                  : styles.inactive
              }`}
              key={attribute.id}
            >
              {" "}
              <label>{attribute.title}</label>
              <select
                name="attributes"
                data-title={attribute.title}
                onChange={handleFilterChange}
                className={`${styles.select} ${
                  filters.attributes.some((attr) =>
                    attr.startsWith(attribute.title)
                  )
                    ? styles.selectActive
                    : styles.selectInactive
                }`}
              >
                <option value="">انتخاب</option>
                {attribute.values.map((value) => (
                  <option key={value.id} value={value.value}>
                    {value.value}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default SubCategoryPage;
