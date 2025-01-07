import React, { useState, useEffect, useRef } from "react";
import { IoClose } from "react-icons/io5";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoShareSocialOutline } from "react-icons/io5";

import { GoHeart } from "react-icons/go";
import { GoHeartFill } from "react-icons/go";
import MiniCard from "../Card/MiniCard";
import CommentsBox from "../CommentsBox/CommentsBox";
import CustomSlider from "../Slider/CustomSlider";
import SelectionBoxes from "../SelectionBoxes/SelectionBoxes";

import styles from "./CardDetail.module.css";

function CardDetail() {
  function formatNumber(num) {
    if (!num) return "";
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const [like, setLike] = useState(false);
  const { id } = useParams();

  const commentsRef = useRef(null); // مرجع برای بخش نظرات

  const likeHandeler = () => {
    setLike(!like);
  };

  const handleShare = () => {
    const shareData = {
      title: "مشاهده محصول",
      text: "این محصول فوق‌العاده را مشاهده کنید:",
      url: window.location.href,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("اشتراک‌گذاری موفقیت‌آمیز بود"))
        .catch((error) => console.error("خطا در اشتراک‌گذاری:", error));
    } else {
      alert(
        "مرورگر شما از اشتراک‌گذاری بومی پشتیبانی نمی‌کند. لطفاً لینک زیر را کپی کنید:"
      );
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const [images, setImages] = useState([]);
  const [colors, setColors] = useState([]);
  const [product, setProduct] = useState({});
  const [breadcrumb, setBreadcrumb] = useState(""); // برای ذخیره عنوان breadcrumb
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

    // ذخیره عنوان مجموعه برای breadcrumb
    if (response.data.collection && response.data.collection.title) {
      setBreadcrumb(response.data.collection.title);
    }

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
          left: "-30px",
          top: "50%",
          transform: "translateY(-50%)",
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
          right: "-40px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        <IoIosArrowForward style={{ fontSize: "30px", color: "#386641" }} />
      </div>
    );
  }

  const sliderSettings = {
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
          arrows: false
        },
      },
    ],
  };

  // تابع اسکرول به بخش نظرات
  const scrollToComments = () => {
    commentsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className={styles.mother}>
      <div className={styles.container}>
        <div className={styles.images}>
          <CustomSlider productId={id} /> 
        </div>
        <div className={styles.details}>
          {/* Breadcrumb */}
          {product.collection && (
            <div className={styles.breadcrumb}>
              <span>دسته‌بندی / </span>
              <Link
                to={`/subcategory/${product.collection.id}`}
                className={styles.breadcrumbLink}
              >
                {product.collection.title}
              </Link>
            </div>
          )}
          <p>
            نام محصول: <span>{product.title}</span>
          </p>
          <Link to={`/vendor/${product.vendor}`}>
            <p>
              فروشنده: <span>{product.vendor}</span>
            </p>
          </Link>
          <p onClick={scrollToComments} style={{ cursor: "pointer" }}>
            نظرات: <span>4 نظر مثبت </span>
            <span style={{ color: "red" }}>4 نظر منفی</span>
          </p>
          <SelectionBoxes productId={id} />
          <div className={styles.descriptionBox}>
            <h3 className={styles.descriptionTitle}>توضیحات محصول</h3>
            <p className={styles.descriptionText}>{product.description}</p>
          </div>
          {/* باکس اطلاعیه غیر قابل مرجوعی */}
          {product.collection &&
            product.collection.title === "لوازم آرایشی" && (
              <div className={styles.returnNoticeWrapper}>
                <div className={styles.returnNoticeContent}>
                  <span className={styles.returnNoticeIcon}>🛑</span>
                  <p className={styles.returnNoticeText}>
                    توجه: این کالا به دلایل بهداشتی غیر قابل مرجوعی است.
                  </p>
                </div>
              </div>
            )}
        </div>
      </div>
      <div className={styles.actions}>
        <button className={styles.pricebtn}>
          {formatNumber(product.unit_price)}&nbsp; تومان
        </button>
        <button className={styles.buybtn}>افزودن به سبد خرید</button>
        <span className={styles.icon} onClick={likeHandeler}>
          {like ? <GoHeartFill size={33} /> : <GoHeart size={33} />}
        </span>
        <IoShareSocialOutline
          className={styles.icon}
          size={30}
          onClick={handleShare}
        />
      </div>
      <div className={styles.noticeBox}>
        <p className={styles.noticeText}>
          تمامی ارسال کالا ها با <b>تیپاکس</b> انجام میشود و هزینه پرداخت آن توسط <b>لینک </b>
          به خریدار فرستاده می شود
        </p>
      </div>
      <div className={styles.title}>
        <h3>تجربه خرید مشتریان</h3>
      </div>
      <div ref={commentsRef}>
        <CommentsBox />
      </div>
      <div className={styles.title}>
        <h3>محصولات مشابه</h3>
      </div>
      <div className={styles.similarproducts}>
        <Slider {...sliderSettings}>
          {similarproducts.map((item) => (
            <MiniCard product={item} key={item.id} className={styles.product} />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default CardDetail;
