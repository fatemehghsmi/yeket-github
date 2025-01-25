import React from "react";
import styles from "../Alert/AlertMessage.module.css";

const AlertMessage = ({ message, onClose, type = "success" }) => {
  return (
    <div className={styles.alertContainer} role="alert">
      <div className={`${styles.alertMessage} ${styles[type]}`}>
        <p>{message}</p>
        <button
          onClick={onClose}
          className={styles.closeBtn}
          aria-label="بستن پیام"
        >
          بستن
        </button>
      </div>
    </div>
  );
};

export default React.memo(AlertMessage);
