import React from "react";
import { features } from "../../../constants/features";
import styles from "./styles.module.scss";
const Features = () => {
  return (
    <div className={styles.features}>
      <div className={`container ${styles.feature_container}`}>
        <div className={styles.cards}>
          {features.map((card) => {
            return (
              <div key={card.id} className={styles.card}>
                <div className={styles.card_icon}>{card.fontAwesome}</div>
                <h3 className={styles.card_title}>{card.title}</h3>
                <p className={styles.card_desc}>{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;
