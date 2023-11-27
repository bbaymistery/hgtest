import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadBtn from "../Buttons/LoadBtn";
import { setQuotation } from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import {
  DropOffPointsReturn,
  PickUpPointsReturn,
  selectPickUpDropOffReducer,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import styles from "./styles.module.scss";
import InfoModal from "../InfoModal/InfoModal";
import { SET_MODAL_INFO } from "../../../store/pickUpDropOffReducer/pickUpDropTypes";
import env from "../../../resources/env";
const CardQuotation = ({
  datas,
  selectedQuotation,
  journeyType,
  quotLoading,
  errorMessageForShowNull,
  forBooking = false,
  dontChangeRouter = false,
}) => {
  const { appData } = useSelector(selectPickUpDropOffReducer);
  const router = useRouter();
  const dispatch = useDispatch();
  const selectedPickUpPointsReturn = useSelector(PickUpPointsReturn);
  const selectedDropOffPointsReturn = useSelector(DropOffPointsReturn);
  //{1:{image:'sds, name:Economy}}
  const carObject = appData?.carsTypes?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item,
    }),
    {}
  );
  // console.log(carObject);

  const addQuotationToStore = (item) => {
    dispatch(setQuotation(item, journeyType));
  };
  // console.log(quotationResult?.quotationOptions);
  const handleClick = (e, item) => {
    if (
      selectedDropOffPointsReturn?.length < 1 ||
      selectedPickUpPointsReturn?.length < 1
    ) {
      addQuotationToStore(item, journeyType);

      if (!dontChangeRouter) {
        router.push("/transfer-details");
      }
    } else {
      addQuotationToStore(item, journeyType);
    }
  };
  const getModalInfo = () => {
    dispatch({ type: SET_MODAL_INFO, payload: true });
    // document.body.style.overflow = "hidden";
  };
  const handleClickForMobile = (e, item) => {
    if (e.target.classList.contains("fa-circle-info")) {
      dispatch({ type: SET_MODAL_INFO, payload: true });
    }
    if (!e.target.classList.contains("fa-circle-info")) {
      if (451 > document.documentElement.clientWidth) {
        if (
          selectedDropOffPointsReturn?.length < 1 ||
          selectedPickUpPointsReturn?.length < 1
        ) {
          addQuotationToStore(item, journeyType);

          if (!dontChangeRouter) {
            router.push("/transfer-details");
          }
        } else {
          addQuotationToStore(item, journeyType);
        }
      }
    }
  };

  return (
    <>
      {datas?.quotationOptions &&
        datas?.quotationOptions?.map((item, i) => {
          return (
            <div
              className={`${styles.item} ${forBooking && styles.forBooking}`}
              key={i}
            >
              {!errorMessageForShowNull ? (
                <div
                  onClick={(e) => handleClickForMobile(e, item)}
                  className={`${styles.main_body} ${451 > document.documentElement.clientWidth &&
                      Number(selectedQuotation?.carId) ===
                      Number(carObject[item?.carId].id)
                      ? styles.selectedCard
                      : ""
                    } `}
                >
                  <div className={styles.item_body_left}>
                    <div className={styles.item_main}>
                      <div className={styles.main_left}>
                        <div className={styles.left_title}>
                          {carObject[item?.carId]?.name}
                          <i
                            className="fa-solid fa-circle-info"
                            onClick={getModalInfo}
                          ></i>
                        </div>
                        <div className={styles.left_subtitle}>
                          {carObject[item?.carId]?.transferType}
                        </div>
                        <ul className={styles.icon_details}>
                          <li className={styles.icon_details_item}>
                            <i
                              className={`fa-solid fa-users ${styles.icon_details_icon}`}
                            ></i>
                            {carObject[item?.carId]?.suitcases}
                          </li>
                          <li className={styles.icon_details_item}>
                            <i
                              className={`fa-solid fa-suitcase ${styles.icon_details_icon}`}
                            ></i>
                            {carObject[item?.carId]?.pax}
                          </li>
                          {/* <li className={styles.icon_details_item}>
                            <i className="fa-solid fa-snowflake"></i> A/C
                          </li> */}
                        </ul>
                      </div>
                      <div className={styles.main_right}>
                        <img
                          src={`${env.apiDomain}${carObject[item?.carId]?.image
                            }`}
                          alt="car"
                        />
                      </div>
                    </div>
                    <div className={styles.item_bottom}>
                      <div className={`${styles.free_meet} ${styles.first}`}>
                        <p>
                          <span>
                            <i className="fa-solid fa-check"></i>
                          </span>
                          Flight Tracking
                        </p>
                        <p>
                          <span>
                            <i className="fa-solid fa-check"></i>
                          </span>
                          Free Waiting Time
                        </p>

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
                      </div>

                      <div className={`${styles.free_meet} ${styles.second}`}>
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
                      </div>

                      <div
                        className={`${styles.free_meet} ${styles.free_meet_price}`}
                      >
                        <div className={styles.price}>
                          {quotLoading ? (
                            <LoadBtn className={"loading_inside_quot"} />
                          ) : (
                            `£ ${item?.price}`
                          )}
                        </div>
                        <button
                          onClick={(e) => handleClick(e, item)}
                          className={`
                          ${styles.button}
                          ${Number(selectedQuotation?.carId) ===
                              Number(carObject[item?.carId].id)
                              ? styles.selectedBtn
                              : ""
                            }`}
                        >
                          {Number(selectedQuotation?.carId) ===
                            Number(carObject[item?.carId].id)
                            ? "Selected"
                            : "Select"}
                        </button>
                        <p className={styles.enjoy_travel}>Enjoy Travel</p>
                      </div>
                    </div>
                  </div>

                  <p className={styles.outer_icon}>
                    <i className="fa-solid fa-gauge-high"></i>
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
    </>
  );
};

export default CardQuotation;
