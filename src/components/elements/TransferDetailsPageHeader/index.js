import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import env from "../../../resources/env";
import { selectPickUpDropOffReducer } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import styles from "./styles.module.scss";
const DetailsHeader = ({
  date,
  quot,
  pickUps,
  drops,
  returnJourneyTrue,
  notitle = false,
}) => {
  const { appData } = useSelector(selectPickUpDropOffReducer);

  //bunu sadece imgni getirmek ucun yazdg Secilen cardn img si
  const carObject = appData?.carsTypes?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item,
    }),
    {}
  );

  //
  useEffect(() => {
    if (
      2000 <= document.documentElement.clientWidth &&
      1400 >= document.documentElement.clientWidth
    ) {
      window.scrollTo({
        top: 41,
        left: 0,
        behavior: "smooth",
      });
    } else if (
      1400 > document.documentElement.clientWidth &&
      1220 <= document.documentElement.clientWidth
    ) {
      window.scrollTo({
        top: 45,
        left: 0,
        behavior: "smooth",
      });
    } else if (
      990 > document.documentElement.clientWidth &&
      768 <= document.documentElement.clientWidth
    ) {
      window.scrollTo({
        top: 45,
        left: 0,
        behavior: "smooth",
      });
    } else if (
      768 > document.documentElement.clientWidth &&
      350 <= document.documentElement.clientWidth
    ) {
      window.scrollTo({
        top: 45,
        left: 0,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <div
      className={`${styles.details_header} ${returnJourneyTrue && styles.margin_top
        }`}
    >
      {carObject && (
        <div>
          <div className={styles.header_card}>
            <div className={`${styles.card_left} ${styles.hide_for_mobile}`}>
              <h2>
                {carObject[quot?.carId] && carObject[quot?.carId]?.name}{" "}
                <span>or Similar</span>
              </h2>
              <div className={styles.subtitle}>
                {carObject[quot?.carId]?.transferType}
              </div>
              <div className={styles.img_and_price}>
                <div className={styles.image_div}>
                  {quot ? (
                    <img
                      src={`${env.apiDomain}${carObject[quot?.carId]?.image
                        }`}
                      alt="car"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <div className={styles.price}>
                  <strong>£ {quot.price}</strong>
                  <span>/Per Vehicle</span>
                  <ul>
                    <li>
                      <i className="fa-solid fa-users "></i>
                      {carObject[quot?.carId]?.pax}
                    </li>
                    <li>
                      <i className="fa-solid fa-suitcase "></i>
                      {carObject[quot?.carId]?.suitcases}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.hide_for_desktop}>
              <div className={styles.card_left}>
                <h2>
                  {carObject[quot?.carId] && carObject[quot?.carId]?.name}{" "}
                  <span>or Similar</span>
                </h2>
                <div className={styles.subtitle}>
                  {carObject[quot?.carId]?.transferType}
                </div>
                <div className={styles.img_and_price}>
                  <div className={styles.image_div}>
                    {quot ? (
                      <img
                        src={`${env.apiDomain}${carObject[quot?.carId]?.image}`}
                        alt="car"
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className={styles.price}>
                    <strong>£ {quot.price}</strong>
                    <span>/Per Vehicle</span>
                    <ul>
                      <li>
                        <i className="fa-solid fa-users undefined"></i>3
                      </li>
                      <li>
                        <i className="fa-solid fa-suitcase undefined"></i>3
                      </li>
                      {/* <li>
                        <i className="fa-solid fa-snowflake"></i> A/C
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
              <div className={styles.card_center}>
                <h3>We give you the following for free</h3>
                <ul>
                  <li>
                    <i className="fa-solid fa-circle-check"></i>
                    Flight Tracking
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check"></i>Free Waiting
                    Time
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check"></i>Free meet and
                    greet
                  </li>
                  <li>
                    <i className="fa-solid fa-circle-check"></i>No charge for
                    flight delays
                  </li>
                </ul>
              </div>
              <div className={styles.item_bottom}>
                <div className={`${styles.free_meet} ${styles.first}`}>
                  <p className={styles.uzunad}>
                    <span>
                      <i className="fa-solid fa-check"></i>
                    </span>
                    Free meet and greet
                  </p>
                  <p className={styles.uzunad}>
                    <span>
                      <i className="fa-solid fa-check"></i>
                    </span>
                    No charge for flight delays
                  </p>

                  <p>
                    <span>
                      <i className="fa-solid fa-check"></i>
                    </span>
                    Free meet and greet
                  </p>
                  <p>
                    <span>
                      <i className="fa-solid fa-check"></i>
                    </span>
                    No charge for flight delays
                  </p>
                </div>

                <div className={`${styles.free_meet} ${styles.second}`}>
                  <p className={styles.uzunad}>
                    <span>
                      <i className="fa-solid fa-check"></i>
                    </span>
                    Flight Tracking
                  </p>
                  <p className={styles.uzunad}>
                    <span>
                      <i className="fa-solid fa-check"></i>
                    </span>
                    Free Waiting Time
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.card_center}>
              <h3>We give you the following for free</h3>
              <ul>
                <li>
                  <i className="fa-solid fa-circle-check"></i>
                  Flight Tracking
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i>Free Waiting Time
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i>Free meet and
                  greet
                </li>
                <li>
                  <i className="fa-solid fa-circle-check"></i>No charge for
                  flight delays
                </li>
              </ul>
            </div>
            <div className={styles.card_right}>
              <div className={styles.info}>
                <ul>
                  <li>
                    <div className={styles.details}>
                      <div className={styles.details_headerr_li}>
                        <i
                          className="fas fa-map-marker-alt"
                          aria-hidden="true"
                        ></i>
                        <p>Pick-up Location :</p>
                      </div>

                      {pickUps.map((point, i) => {
                        return (
                          <div className={styles.details_bottom} key={i}>
                            <i className="fa-solid fa-check"></i>
                            <span className={styles.desc}>
                              {/* London Heathrow Airport, Terminal 3<b>TW61EW</b> */}
                              {point.address}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </li>
                  <li>
                    <div className={styles.details}>
                      <div className={styles.details_headerr_li}>
                        <i
                          className="fas fa-map-marker-alt"
                          aria-hidden="true"
                        ></i>
                        <p>Drop off Location :</p>
                      </div>
                      {drops.map((point, i) => {
                        return (
                          <div className={styles.details_bottom} key={i}>
                            <i className="fa-solid fa-check"></i>
                            <span className={styles.desc}>{point.address}</span>
                          </div>
                        );
                      })}
                    </div>
                  </li>

                  <li>
                    <div className={`${styles.details} ${styles.details_flex}`}>
                      <div className={styles.details_headerr_li}>
                        <i
                          className="fas fa-calendar-alt"
                          aria-hidden="true"
                        ></i>
                        <p>Landing Date :</p>
                      </div>
                      <div className={styles.details_bottom}>
                        <span className={styles.desc}>
                          {date
                            .split(" ")[0]
                            .replace(/(\d+)\-(\d+)-(\d+)/, "$3-$2-$1")}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className={`${styles.details} ${styles.details_flex}`}>
                      <div className={styles.details_headerr_li}>
                        <i className="fas fa-clock" aria-hidden="true"></i>
                        <p>Landing Time :</p>
                      </div>
                      <div className={styles.details_bottom}>
                        <span className={styles.desc}>
                          {date.split(" ")[1]}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsHeader;
