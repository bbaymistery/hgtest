import React from "react";
import styles from "./styles.module.scss";
const BgLoader = () => {
  return (
    <div className={styles.bg_container}>
      <div className={styles.loading}></div>
    </div>
  );
};

export default BgLoader;
