import React from 'react'
import styles from "./About.module.css"
import shop from "../../assets/shop.png"
import question from "../../assets/question.png"
import delivery from "../../assets/delivery.png"

function About() {
  return (
    <div className={styles.container}>
        <div className={styles.part}>
            <img src={shop} alt="" />
            <p className={styles.title}>مناسب ترین قیمت</p>
           
        </div>
        <div className={styles.part}>
            <img src={question} alt="" />
            <p className={styles.title}>پشتیبانی 24 ساعته</p>
        </div>
        <div className={styles.part}>
            <img src={delivery} alt="" />
            <p className={styles.title}>ارسال به تمام نقاط</p>
        </div>
    </div>
  )
}

export default About