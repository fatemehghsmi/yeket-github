import React from 'react'
import styles from "./FirstBanner.module.css"
import banner from "../../assets/banner.png"

function FirstBanner() {
  return (
    <div>
        <img src={banner} alt="" className={styles.banner}/>
    </div>
  )
}

export default FirstBanner