import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from "./LoginSignupPage.module.css";
import logo from "../../assets/logo.png";
import AlertMessage from "../../Components/Alert/AlertMessage";

function LoginSignupPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isSeller, setIsSeller] = useState(false); // حالت چک‌باکس
  const [isLoggedIn, setIsLoggedIn] = useState(false); // حالت ورود موفقیت‌آمیز
  const navigate = useNavigate();

  let timerInterval;

  // ترفند جاوااسکریپت برای جلوگیری از autofill
  useEffect(() => {
    const phoneInput = document.getElementById("phone");
    const codeInput = document.getElementById("code");

    if (phoneInput) {
      phoneInput.setAttribute("autocomplete", "off");
      phoneInput.setAttribute("readonly", true); // اضافه کردن readonly
      setTimeout(() => {
        phoneInput.removeAttribute("readonly");
      }, 100);
    }

    if (codeInput) {
      codeInput.setAttribute("autocomplete", "off");
      codeInput.setAttribute("readonly", true); // اضافه کردن readonly
      setTimeout(() => {
        codeInput.removeAttribute("readonly");
      }, 100);
    }
  }, [isCodeSent]);

  const validatePhoneNumber = (phoneNumber) => {
    const regex = /^09\d{9}$/;
    return regex.test(phoneNumber);
  };

  const handlePhoneNumberSubmit = () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setAlertMessage("شماره تلفن وارد شده معتبر نیست.");
      return;
    }
    setIsCodeSent(true);
    setAlertMessage("کد تایید به شماره شما ارسال شد.");
    setIsTimerActive(true);
    startTimer();
  };

  const handleVerificationSubmit = () => {
    if (verificationCode === "1234") {
      setIsLoggedIn(true); // ورود موفقیت‌آمیز
      setAlertMessage("ورود موفقیت‌آمیز بود");
      setPhoneNumber("");
      setVerificationCode("");
    } else {
      setAlertMessage("کد وارد شده اشتباه است");
      setVerificationCode("");
    }
  };

  const handleResendCode = () => {
    setTimer(30);
    setIsTimerActive(true);
    startTimer();
    setAlertMessage("کد تایید به شماره شما دوباره ارسال شد.");
  };

  const startTimer = () => {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      setTimer((prevTime) => {
        if (prevTime === 0) {
          clearInterval(timerInterval);
          setIsTimerActive(false);
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const closeAlert = () => {
    setAlertMessage(null);
  };

  return (
    <div className={styles.loginContainer}>
      {alertMessage && (
        <AlertMessage message={alertMessage} onClose={closeAlert} />
      )}
      <div
        className={`${styles.loginBox} ${isCodeSent ? styles.codeSent : ""} ${
          isLoggedIn ? styles.loggedIn : ""
        }`}
      >
        <Link to="/" className={styles.logoLink}>
          <img src={logo} alt="" className={styles.logo} />
        </Link>
        <h2
          className={styles.welcome}
          style={isLoggedIn ? { margin: "25px" } : {}}
        >
          سلام به
          <Link to="/" className={styles.boldLink}>
            <span>&nbsp;یکت&nbsp;</span>
          </Link>
          خوش آمدید
        </h2>

        {/* اگر کاربر وارد نشده باشد، فرم دریافت کد نمایش داده می‌شود */}
        {!isLoggedIn ? (
          <>
            <div className={styles.addPhoneNumber}>
              <p className={styles.phoneNumberText}>
                {!isCodeSent
                  ? "لطفا شماره موبایل خود را وارد کنید"
                  : "لطفا کمی صبر کنید اگه کد را دریافت نکردید دوباره درخواست بدید و لطفا چک کنید که شماره موبایل خود را درست وارد کردید"}
              </p>
            </div>
            <div className={styles.editIconContainer}>
              <label htmlFor="phone"></label>
              <input
                className={styles.phoneInput}
                type="text"
                id="phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="شماره موبایل"
                autoComplete="off" // غیرفعال کردن autocomplete
              />
              {isCodeSent && (
                <span
                  className={styles.editIcon}
                  onClick={() => setIsCodeSent(false)}
                >
                  🖉
                </span>
              )}
            </div>

            {/* چک‌باکس "من فروشنده هستم" */}
            {!isCodeSent && (
              <div className={styles.checkboxContainer}>
                <input
                  type="checkbox"
                  id="sellerCheckbox"
                  checked={isSeller}
                  onChange={(e) => setIsSeller(e.target.checked)}
                  className={styles.checkbox}
                />
                <label
                  htmlFor="sellerCheckbox"
                  className={styles.checkboxLabel}
                >
                  من فروشنده هستم
                </label>
              </div>
            )}

            {isCodeSent && (
              <input
                className={styles.inputField}
                type="text"
                id="code"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="کد تایید را وارد کنید"
                autoComplete="off" // غیرفعال کردن autocomplete
              />
            )}

            {isCodeSent && (
              <div className={styles.resendContainer}>
                <button
                  onClick={handleResendCode}
                  className={styles.resendBtn}
                  disabled={isTimerActive}
                >
                  دریافت مجدد کد
                </button>
                <span className={styles.timer}>
                  {isTimerActive ? `${timer} ثانیه` : ""}
                </span>
              </div>
            )}
            <button
              onClick={
                isCodeSent ? handleVerificationSubmit : handlePhoneNumberSubmit
              }
              className={styles.submitBtn}
            >
              {isCodeSent ? "تایید کد" : "ارسال کد"}
            </button>
          </>
        ) : (
          // اگر کاربر وارد شده باشد، پیام موفقیت و دکمه‌ها نمایش داده می‌شود
          <div className={styles.successMessage}>
            <p>
              شما میتوانید به خرید خود ادامه دهید
              <br />
              یا وارد پنل کاربری خود شوید
            </p>{" "}
            <div className={styles.buttons}>
              <button
                className={styles.continueButton}
                onClick={() => navigate("/")}
              >
                ادامه خرید
              </button>
              <Link to="/info">
                <button className={styles.completeInfoButton}>
                  پنل کاربری
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginSignupPage;
