import React from "react";
import styles from "./styles.module.scss";

const HeaderOfResults = ({ title, selectedTrQuots }) => {
  return (
    <div className={`alert_success ${styles.quotation_header}`}>
      <h3>{title}</h3>
      <ul>
        {selectedTrQuots?.duration ? (
          <li>
            <span>
              <i className={`fa-solid fa-check ${styles.li_icon}`}></i>
            </span>{" "}
            Duration : <span>{selectedTrQuots?.duration}</span>
          </li>
        ) : (
          ""
        )}
        {selectedTrQuots?.distance ? (
          <li>
            <span>
              <i className={`fa-solid fa-check ${styles.li_icon}`}></i>
            </span>{" "}
            Distance : <span>{selectedTrQuots?.distance}</span>
          </li>
        ) : (
          ""
        )}

        <li>
          <span>
            <i className={`fa-solid fa-check ${styles.li_icon}`}></i>
          </span>{" "}
          We constantly monitor all flights and do not charge for flight delays
          or cancellations.
        </li>
        <li>
          <span>
            <i className={`fa-solid fa-check ${styles.li_icon}`}></i>
          </span>
          <span className={styles.strong}>ALL INCLUSIVE PRICES</span> No Hidden
          Charges; Meet and Greet included for airport and port pickups.
        </li>
      </ul>
    </div>
  );
};

export default HeaderOfResults;
