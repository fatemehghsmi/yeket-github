import React, { useState, useEffect } from "react";
import styles from "./Newest.module.css";
import { GrFormNext } from "react-icons/gr";
import ProductCard from "../Card/ProductCard";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Newest() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(
      "https://yeket.liara.run/api/store/products/"
    );
    setProducts(response.data);
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
    <div>
      <Link to="/newests">
        <h2 className={styles.title}>
          <GrFormNext className={styles.morebtn} size="30px" />
          جدیدترین ها
        </h2>
      </Link>
      <div className={styles.container}>
        <Slider {...settings}>
        {products.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
          
        </Slider>
      </div>
    </div>
  );
}

export default Newest;
