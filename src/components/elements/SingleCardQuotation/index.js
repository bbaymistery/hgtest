import { useRouter } from "next/router";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import LoadBtn from "../Buttons/LoadBtn";
import { setQuotation } from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import {
  DropOffPointsReturn,
  PickUpPointsReturn,
  selectPickUpDropOffReducer,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import styles from "./styles.module.scss";
import env from "../../../resources/env";
const EachQuotatCarItem = ({
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
                <div className={styles.item_img_div}>
                  <img
                    src={`${env.apiDomain}${carObject[item?.carId]?.image
                      }`}
                    alt="car"
                  ></img>
                </div>
              ) : null}

              {!errorMessageForShowNull ? (
                <div id="test" className={styles.item_body}>
                  <div className={styles.item_body_header}>
                    <div className={styles.header_titles}>
                      <h3 className={styles.title}>
                        {carObject[item?.carId]?.name}
                      </h3>
                      <p className={styles.subtitle}>
                        {carObject[item?.carId]?.transferType}
                      </p>
                    </div>
                    <div className={styles.header_attributes}>
                      <ul className={styles.item_atr_ul}>
                        <li className={styles.item_atr_li}>
                          <span className={styles.li_desc}>
                            {/* No of Passengers */}
                            {carObject[item?.carId]?.pax}
                            <i
                              className={`fa-solid fa-users ${styles.li_icon}`}
                            ></i>
                          </span>
                        </li>
                      </ul>
                      <ul className={styles.item_atr_ul}>
                        <li className={styles.item_atr_li}>
                          <span className={styles.li_desc}>
                            {carObject[item?.carId]?.suitcases}
                          </span>
                          <i
                            className={`fa-solid fa-suitcase ${styles.li_icon}`}
                          ></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className={styles.item_body_desc}>
                    <div className={styles.desc_price_section}>
                      <div className={styles.price__num}>
                        {quotLoading ? (
                          <LoadBtn className={"loading_inside_card"} />
                        ) : (
                          `£ ${item?.price}`
                        )}
                      </div>
                    </div>
                    {quotLoading ? null : (
                      <div
                        id="test"
                        className={`${styles.perJourney_section} ${Number(selectedQuotation?.carId) ===
                            Number(carObject[item?.carId].id)
                            ? styles.selectedBtn
                            : ""
                          }`}
                      >
                        <button onClick={(e) => handleClick(e, item)}>
                          {Number(selectedQuotation?.carId) ===
                            Number(carObject[item?.carId].id)
                            ? "Selected"
                            : "Select"}
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : null}
            </div>
          );
        })}
    </>
  );
};

export default EachQuotatCarItem;
