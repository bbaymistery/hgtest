import React from "react";
import BreadCrumb from "../../components/elements/breadCrubm";
import Layout from "../../components/layouts/Layout";
import { carsItems } from "../../constants/carss";
import env from "../../resources/env";
import styles from "./styles.module.scss";
const OurFleet = () => {
  return (
    <Layout title="Our Fleet" keywords="Our Fleet" description="Our Fleet">
      <div className={styles.fleet_section}>
        <BreadCrumb title="Our Fleet" />

        <div className={styles.faq_area}>
          <div className={styles.faq_container}>
            <h2 className={styles.faq_container_title}>
              Our company offers VIP as well as Economy services. You may choose
              one of the 3 available car options: Saloon, MPV (People Carrier),
              and an 8-Seater Minibus.
            </h2>
          </div>
        </div>

        <div className={styles.car_section}>
          <div className={styles.car_container}>
            <div className={styles.header}>
              <h2 className={styles.header_title}>Vehicle Types </h2>
            </div>
            <div className={styles.content_car_wrap}>
              {carsItems.map((car, i) => {
                return (
                  <div className={styles.car_item} key={car.id}>
                    <div className={styles.card_img_div}>
                      <div className={styles.card_image_link}>
                        {/* { src="https://www.heathrow-gatwick-transfers.com/images/mpvPeople2.png"} */}
                        <img
                          src={!env.isDevelopment ? `https://www.heathrow-gatwick-transfers.com${car.carImage}` : car.carImage}
                          alt="car-img"
                          className={styles.img}
                        />
                      </div>
                    </div>
                    <div className={styles.card_body}>
                      <h3 className={styles.card_body_title}>{car.carName}</h3>
                      <br />
                      <div className={styles.card_body_attributes}>
                        <ul className={styles.card_atr_ul}>
                          <li className={styles.card_atr_li}>
                            <i
                              className={`fa-solid fa-users ${styles.li_icon}`}
                            ></i>
                            <span className={styles.li_desc}>
                              No of Passengers {car.passenger}
                            </span>
                          </li>
                        </ul>
                        <ul className={styles.card_atr_ul}>
                          <li className={styles.card_atr_li}>
                            <i
                              style={{ marginLeft: "4px" }}
                              className={`fa-solid fa-suitcase ${styles.li_icon}`}
                            ></i>
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
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OurFleet;
