import React from "react";
import styles from "./elgun.module.scss";
const TextError = (props) => {
  return <div className={styles.error}>{props.errorMessage}</div>;
};

export default TextError;
