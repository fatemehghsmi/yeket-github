import React from 'react'
import styles from "./SecondBanner.module.css"
import banner2 from "../../assets/banner2.jpg"

function SecondBanner() {
  return (
    <div>
        <img src={banner2} alt="" className={styles.banner}/>
    </div>
  )
}

export default SecondBanner