import React, { useState, useEffect } from "react";
import styles from "./CategoryPage.module.css";
import { GrFormNext } from "react-icons/gr";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "../Components/Card/ProductCard";
import CategoryCard from "../components/CategoryCard/CategoryCard";

import SubCategoryCard from "../components/SubCategoryCard/SubCategoryCard";
import Newest from "../components/Newest/Newest";

function CategoryPage() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      "https://yeket.liara.run/api/store/products/"
      // `https://yeket.liara.run/api/store/collections/${id}/products`
    );
    const categoriesResponse = await axios.get(
      "https://yeket.liara.run/api/store/collections/"
    );
    setProducts(response.data);
    setCategories(categoriesResponse.data);
  };
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className={styles.body}>
      <h1 className={styles.categoryName}>مد و پوشاک</h1>
      <Link to="/bestsellers">
        <h2 className={styles.title}>
          <GrFormNext className={styles.morebtn} size="30px" />
          پرفروش ترین ها
        </h2>
      </Link>
      <div className={styles.container}>
        <Slider {...settings}>
          {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </Slider>
      </div>
      <div className={styles.subCategory}>
        {categories.map(
          (subCategory) =>
            subCategory.parent == id && (
              <SubCategoryCard subCategory={subCategory} key={subCategory.id} />
            )
        )}
      </div>
      <Newest />
    </div>
  );
}

export default CategoryPage;
