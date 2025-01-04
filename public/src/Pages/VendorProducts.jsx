import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../Components/Card/ProductCard";
import styles from "./VendorProducts.module.css";
import { FadeLoader } from "react-spinners";

function VendorProducts() {
  const { vendor } = useParams(); // دریافت نام فروشنده از آدرس
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendorProducts = async () => {
      try {
        const response = await axios.get(
          `https://yeket.liara.run/api/store/products?vendor=${vendor}`
        );
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("خطا در دریافت محصولات فروشنده:", error);
        setLoading(false);
      }
    };

    fetchVendorProducts();
  }, [vendor]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <FadeLoader
          color="#386641"
          height={10}
          width={4}
          radius={1}
          margin={2}
        />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className={styles.noProducts}>
        محصولی برای این فروشنده وجود ندارد.
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>محصولات فروشنده: {vendor}</h2>
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div className={styles.productCard} key={product.id}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default VendorProducts;
