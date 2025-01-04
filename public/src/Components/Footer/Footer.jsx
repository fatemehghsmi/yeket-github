import React from "react";
import styles from "./Footer.module.css";
import logo from "../../assets/logo.png";
import { IoLocationOutline } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { LuPhone } from "react-icons/lu";
import { FaArrowUpLong } from "react-icons/fa6";

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer} dir="rtl">
      {/* بخش بالایی */}
      <div className={styles.top}>
        <div className={styles.logo}>
          <img src={logo} alt="YeKet" />
          <span>YeKet</span>
        </div>
        <div className={styles.backToTop}>
          <a href="#header">
            <button>
              بازگشت به بالا
              <FaArrowUpLong />
            </button>
          </a>
        </div>
      </div>

      {/* بخش میانی */}
      <div className={styles.content}>
        <div>
          <h1>یکت</h1>
          <ul>
            <li>
              <Link to="/contactyeket">تماس با یکت</Link>
            </li>
            <li>
              <Link to="/aboutyeket">درباره یکت</Link>
            </li>
            <li>
              <Link to="/reaportinyeket">گزارش تخلف در یکت</Link>
            </li>
            <li>
              <Link to="/contactsupportyeket">ارتباط با پشتیبانی یکت</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1>فروش در یکت</h1>
          <ul>
            <li>
              <Link to="/termsofsale">شرایط فروش</Link>
            </li>
            <li>
              <Link to="/howtosell">نحوه ی فروش</Link>
            </li>
            <li>
              <Link to="/answersquestions">پاسخ به پرسش‌های متداول</Link>
            </li>
            <li>
              <Link to="/contactsalessupport">ارتباط با پشتیبانی فروش</Link>
            </li>
          </ul>
        </div>
        <div>
          <h1>خرید از یکت</h1>
          <ul>
            <li>
              <Link to="/purchaseconditions">شرایط خرید</Link>
            </li>
            <li>
              <Link to="/howtobuy">نحوه ی خرید و ثبت سفارش</Link>
            </li>
            <li>
              <Link to="/paymentguide">راهنمای پرداخت</Link>
            </li>
            <li>
              <Link to="/sendorder">نحوه‌ی ارسال سفارش</Link>
            </li>
            <li>
              <Link to="/returning">شرایط بازگرداندن کالا</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* شبکه‌های اجتماعی */}
      <div className={styles.socialMediaContainer}>
        <div className={styles.socialMedia}>
          {/* لینک اینستاگرام */}
          <a
            href="https://www.instagram.com/yeket_iran"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="اینستاگرام"
          >
            <FaInstagram className={styles.socialMediaIcon} />
          </a>

          {/* لینک مکان */}
          <a
            href="https://goo.gl/maps/example"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="مکان"
          >
            <IoLocationOutline className={styles.socialMediaIcon} />
          </a>

          {/* لینک تماس */}
          <a href="tel:09134290190" aria-label="تماس">
            <LuPhone className={styles.socialMediaIcon} />
          </a>
        </div>
      </div>

      {/* لینک پایین */}
      <div className={styles.link}>
        <p>
          طراحی و راه‌اندازی این سایت توسط تیم نرم‌افزاری{" "}
          <a href="https://www.farda.team">farda.team</a> انجام شده است.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
