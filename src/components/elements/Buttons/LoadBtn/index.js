import React from "react";
import styles from "./styles.module.scss";

const Loading = ({ className }) => {
  return (
    <div className={`${styles.loading} ${className ? className : ""}`}>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
      <div className={styles.dot}></div>
    </div>
  );
};

export default Loading;
