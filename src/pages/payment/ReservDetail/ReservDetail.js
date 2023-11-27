import React from "react";
import { useSelector } from "react-redux";
import env from "../../../resources/env";
import { selectPickUpDropOffReducer } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import DropOffPoints from "./DropOffPoints";
import PickUpPoints from "./PickUpPoints";
import styles from "./styles.module.scss";
const DetailsHeader = ({
  date,
  quot,
  pickUps,
  drops,
  fullName,
  email,
  passengers,
  phone,
  specialRequest,
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

  return (
    <div className={styles.details_header}>
      {carObject && (
        <div>
          <div className={styles.header_card}>
            <div className={styles.card_top}>
              <div className={styles.card_info}>
                <div className={styles.info}>
                  <ul>
                    <li>
                      <div className={styles.details}>
                        <div className={styles.details_headerr_li}>
                          <i className="fas fa-user" aria-hidden="true"></i>
                          <div className={styles.li_info}>
                            <p className={styles.property}>Full Name:</p>
                            <p className={styles.value}>{fullName}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={styles.details}>
                        <div className={styles.details_headerr_li}>
                          <i className="fas fa-phone" aria-hidden="true"></i>
                          <div className={styles.li_info}>
                            <p className={styles.property}>Phone Number:</p>
                            <p className={styles.value}>+{phone}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div className={styles.details}>
                        <div className={styles.details_headerr_li}>
                          <i className="fas fa-at" aria-hidden="true"></i>
                          <div className={styles.li_info}>
                            <p className={styles.property}>Email Address:</p>
                            <p className={styles.value}>{email}</p>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className={styles.details}>
                        <div className={styles.details_headerr_li}>
                          <i className="fas fa-users" aria-hidden="true"></i>
                          <div className={styles.li_info}>
                            <p className={styles.property}>Passengers:</p>
                            <p className={styles.value}>{passengers}</p>
                          </div>
                        </div>
                      </div>
                    </li>
                    {specialRequest.length ? (
                      <li>
                        <div className={styles.details}>
                          <div
                            className={styles.details_headerr_li}
                            style={{ display: "block" }}
                          >
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <i
                                className="fa-solid fa-comment"
                                aria-hidden="true"
                              ></i>
                              <p className={styles.property}>Notes:</p>
                            </div>
                            <div className={styles.li_info}>
                              <p className={styles.value}>{specialRequest}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ) : null}
                    {/* {specialRequest.length && (
                      <li>
                        <div className={styles.details}>
                          <div className={styles.details_headerr_li}>
                            <i
                              className="fa-solid fa-comment"
                              aria-hidden="true"
                            ></i>
                            <div className={styles.li_info}>
                              <p className={styles.property}>Notes:</p>
                              <p className={styles.value}>{specialRequest}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    )} */}
                  </ul>
                </div>
              </div>
              {quot ? (
                <div className={styles.card_center}>
                  <img
                    src={`${env.apiDomain}${carObject[quot?.carId]?.image
                      }`}
                    alt="car"
                  />
                  <div className={styles.card_price}>
                    <div className={styles.top}>
                      <h2>
                        {carObject[quot?.carId] && carObject[quot?.carId]?.name}
                      </h2>
                      <div className={styles.subtitle}>
                        {carObject[quot?.carId]?.transferType}
                      </div>
                    </div>
                    <div className={styles.price}>
                      <strong>£ {quot.price}</strong>
                      <p>/Per Vehicle</p>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
              <div className={styles.card_right}>
                <div className={styles.info}>
                  <ul>
                    <li>
                      <PickUpPoints pickUps={pickUps} />
                    </li>
                    <li>
                      <DropOffPoints drops={drops} />
                    </li>

                    <li>
                      <div
                        className={`${styles.details} ${styles.details_flex}`}
                      >
                        <div className={styles.details_headerr_li}>
                          <i
                            className="fas fa-calendar-alt"
                            aria-hidden="true"
                          ></i>
                          <p>Landing Date :</p>
                        </div>
                        <div className={styles.details_bottom_container}>
                          <div className={styles.details_bottom}>
                            <span className={styles.desc}>
                              {date.split(" ")[0]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li>
                      <div
                        className={`${styles.details} ${styles.details_flex}`}
                      >
                        <div className={styles.details_headerr_li}>
                          <i className="fas fa-clock" aria-hidden="true"></i>
                          <p>Landing Time :</p>
                        </div>

                        <div className={styles.details_bottom_container}>
                          <div className={styles.details_bottom}>
                            <span className={styles.desc}>
                              {date.split(" ")[1]}
                            </span>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className={styles.card_bottom}>
              <div className={styles.left}>
                <p>
                  <span>
                    <i className="fa-solid fa-check-double"></i>
                  </span>
                  Free meet and greet
                </p>
                <p>
                  <span>
                    <i className="fa-solid fa-check-double"></i>
                  </span>
                  Flight tracking
                </p>
              </div>
              <div className={styles.center}>
                <p>
                  <span>
                    <i className="fa-solid fa-check-double"></i>
                  </span>
                  Max {carObject[quot?.carId]?.pax} passengers
                </p>
                <p>
                  <span>
                    <i className="fa-solid fa-check-double"></i>
                  </span>
                  Max {carObject[quot?.carId]?.suitcases} medium suitcase
                </p>
              </div>
              <div className={styles.right}>
                <p>
                  <span>
                    <i className="fa-solid fa-check-double"></i>
                  </span>
                  Free waiting time
                </p>
                <p>
                  <span>
                    <i className="fa-solid fa-check-double"></i>
                  </span>
                  No charge for flight delays
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailsHeader;
