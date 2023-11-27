import React from "react";

import styles from "./elgun.module.scss";
const BlueBotton = (props) => {
  return (
    <div className={`${styles.btn_box} `}>
      <button
        className={`${styles.btn_primary}

         ${props.colorViceVerse && styles.contained}
         ${props.responsive && styles.btn_primary_responsive}
        `}
        type={props.type ? props.type : ""}
      >
        {props.title}
      </button>
    </div>
  );
};

export default BlueBotton;
