import React, { useState } from "react";
import styles from "../PersonalInformation/PersonalInformation.module.css";

const PersonalInformation = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    nationalCode: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputInformation}>
        <input
          type="text"
          name="firstName"
          placeholder="نام"
          value={formData.firstName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="نام خانوادگی"
          value={formData.lastName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phoneNumber"
          placeholder="شماره تماس"
          value={formData.phoneNumber}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="nationalCode"
          placeholder="کدملی"
          value={formData.nationalCode}
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.dateOfBirth}>
        <h3>تاریخ تولد</h3>
        {/* اضافه کردن input یا کامپوننت تاریخ تولد */}
      </div>
      <div className={styles.gender}>
        <h3>جنسیت</h3>
        {/* اضافه کردن radio button یا dropdown برای جنسیت */}
      </div>
      <div className={styles.address}>
        <h3>آدرس</h3>
        {/* اضافه کردن textarea یا input برای آدرس */}
      </div>
    </div>
  );
};

export default PersonalInformation;
