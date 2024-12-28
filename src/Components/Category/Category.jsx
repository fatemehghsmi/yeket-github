import React, { useState, useEffect } from "react";
import styles from "./Category.module.css";
import CategoryCard from "../CategoryCard/CategoryCard";
import { GrFormNext } from "react-icons/gr";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

function Category() {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      "https://yeket.liara.run/api/store/collections/"
    );
    setCategory(response.data);
  };
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  return (
    <div>
      <h2 className={styles.title}>
        <GrFormNext className={styles.morebtn} size="30px" />
        دسته بندی
      </h2>
      <div className={styles.container}>
        <Slider {...settings}>
          {category.map(
            (item) =>
              item.parent == null && (
                <CategoryCard category={item} key={item.id} />
              )
          )}
        </Slider>
      </div>
    </div>
  );
}

export default Category;
