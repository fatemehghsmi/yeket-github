import { Component, useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

import styles from "./CardDetail.module.css";

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import MiniCard from "../Card/MiniCard";
import ProductCard from "../Card/ProductCard";
import CommentsBox from "../CommentsBox/CommentsBox";

import CustomSlider from "../Slider/CustomSlider";

function CardDetail() {
  const [like, setLike] = useState(false);
  const { id } = useParams();
  const likeHandeler = () => {
    setLike(!like);
  };

  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [product, setProduct] = useState({});
  const [similarproducts, setSimilarproducts] = useState([]);
  useEffect(() => {
    getData();
  }, [id]);

  const getData = async () => {
    const response = await axios.get(
      `https://yeket.liara.run/api/store/products/${id}`
    );

    setProduct(response.data);
    setColors(response.data.colors);
    setImages(response.data.images);

    const similarRespons = await axios.get(
      "https://yeket.liara.run/api/store/products/"
    );
    setSimilarproducts(similarRespons.data);
  };

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          position: "absolute",
          left: "-30px", // فاصله از لبه چپ
          top: "50%",
          transform: "translateY(-50%)", // وسط‌چین در محور عمودی
          zIndex: 10,
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <IoIosArrowBack style={{ fontSize: "30px", color: "#386641" }} />
      </div>
    );
  }

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,
          position: "absolute",
          right: "-40px", // فاصله از لبه راست
          top: "50%",
          transform: "translateY(-50%)", // وسط‌چین در محور عمودی
          zIndex: 10,
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <IoIosArrowForward style={{ fontSize: "30px", color: "#386641" }} />
      </div>
    );
  }

  var setting = {
    dots: true,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1000,
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

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img
            className={styles.smallimg}
            src={images[i].image}
            // style={{
            //   width: "100px",
            //   height: "100px",
            //   margin: " 20px 10px",
            //   objectFit: "cover",
            //   justifySelf: "center",
            //   responsive: [
            //     {
            //       breakpoint: 1300,
            //       settings: {
            //         width: "35px",
            //         height: "35px",
            //         margin: " 10px 30px",
            //       },
            //     },
            //     {
            //       breakpoint: 830,
            //       settings: {
            //         width: "80px",
            //         height: "80px",
            //         margin: " 30px 10px",
            //       },
            //     },
            //   ],
            // }}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: `slick-dots ${styles.customIndicator}`,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (
    <div className={styles.mother}>
      <div className={styles.container}>
        <div className={styles.images}>
          <div className="slider-container">
            {/* <Slider {...settings} className={styles.slider}>
              {images.map((item) => (
                <div key={item.id}>
                  <img
                    src={item.image}
                    alt={item.id}
                    className={styles.image}
                    />
                    </div>
                    ))}
                    </Slider> */}
            <CustomSlider productId={product.id} />
          </div>
        </div>
        <div className={styles.details}>
          <p>
            نام محصول: <span>{product.title}</span>
          </p>
          {/* <p>
            قیمت: <span>{product.unit_price}&nbsp; تومان </span>
          </p> */}
          {/* <p>
            رنگ:
            {colors.map((color, index) => (
              <span key={index}>&nbsp; {color.title}&nbsp; </span>
            ))}
          </p> */}
          <Link to={`/vendor/${product.vendor}`}>
          <p>
            فروشنده: <span>{product.vendor}</span>
          </p>
          </Link>
          <p>
            وضعیت: <span>{product.stock > 0 ? "موجود" : "ناموجود"} </span>
          </p>
          {/* بخش توضیحات به عنوان باکس جدا */}
          <div className={styles.descriptionBox}>
            <h3 className={styles.descriptionTitle}>توضیحات محصول</h3>
            <p className={styles.descriptionText}>{product.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.pricebtn}>
          {product.unit_price}&nbsp; تومان{" "}
        </button>
        <div className={styles.buy}>
          <button className={styles.buybtn}>افزودن به سبد خرید</button>
          <span className={styles.icon} onClick={likeHandeler}>
            {like ? <GoHeartFill size={33} /> : <GoHeart size={33} />}
          </span>
        </div>
      </div>
      <div className={styles.title}>
        <h3>محصولات مشابه</h3>
      </div>
      <div className={styles.similarproducts}>
        <Slider {...setting}>
          {similarproducts.map((item) => (
            <MiniCard product={item} key={item.id} className={styles.product} />
          ))}
        </Slider>
      </div>
      <div className={styles.title}>
        <h3>نظرات مشتریان</h3>
      </div>
      <div>
        <CommentsBox/>
      </div>
    </div>
  );
}

export default CardDetail;
