import React from "react";
import { carsItems } from "../../../constants/carss";
import styles from "./styles.module.scss";
import Image from 'next/image'

const CarItem = ({ sliderRef }) => {
  return (
    <div className={styles.owl_stage} ref={sliderRef}>
      {carsItems.map((car, i) => {
        return (
          <div className={styles.car_item} key={car.id}>
            <div className={styles.card_img_div}>
              <div className={styles.card_image_link}>
                {/* <img src={car.carImage} alt="car-img" className={styles.img} /> */}
                <Image
                  src={car.carImage}
                  className={styles.img}
                  layout='fill'
                  alt={car.carName}
                />
              </div>
            </div>
            <div className={styles.card_body}>
              <h3 className={styles.card_body_title}>{car.carName}</h3>
              <br />
              <div className={styles.card_body_attributes}>
                <ul className={styles.card_atr_ul}>
                  <li className={styles.card_atr_li}>
                    <i className={`fa-solid fa-users ${styles.li_icon}`}></i>
                    <span className={styles.li_desc}>
                      No of Passengers {car.passenger}
                    </span>
                  </li>
                </ul>
                <ul className={styles.card_atr_ul}>
                  <li className={styles.card_atr_li}>
                    <i className={`fa-solid fa-suitcase ${styles.li_icon}`}></i>
                    <span className={styles.li_desc}>
                      No of Suitcases {car.suitcase}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CarItem;
