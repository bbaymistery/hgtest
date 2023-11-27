import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteItemFromList,
  gettingQuotations,
} from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import { selectPickUpDropOffReducer } from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import CheckForCruises from "./CheckForCruises";
import CheckForFlight from "./CheckForFlight";
import CheckForTrain from "./CheckForTrain";
import CheckingForPostcodes from "./CheckingForPostcodes";
import CheckForRoomNumber from "./CheckForRoomNumber";
import styles from "./styles.module.scss";
import CheckPlaceOfInterest from "./CheckPlaceOfInterest";
import CheckForCitites from "./CheckForCitites";
import CheckForUniversity from "./CheckForUniversity";
import CheckForOther from "./CheckForOther";
import { useRouter } from "next/router";
import env from "../../../resources/env";
//bura propslar transfer js deki journey detailsden gelir
const SelectedLists = ({
  selectedItems,
  index,
  journeyType,
  inTransferComp,
  forBooking,
  fromQuotation,
}) => {
  const { direction, appData } = useSelector(selectPickUpDropOffReducer);
  const dispatch = useDispatch();
  const imageObjects = appData?.pointTypeCategories?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item.image,
    }),
    {}
  );

  const router = useRouter();
  const handleDelete = (item, indexOfCurrentItem) => {

    dispatch(deleteItemFromList(item, index, journeyType, indexOfCurrentItem));
    if (router.pathname === "/quotation" && direction === "left") {
      dispatch(
        gettingQuotations(router, 0, {
          updateInsideQuotation: true,
        })
      );
    }
    //bunu deyiseceyik sadece return ucun edeceyik
    if (router.pathname === "/quotation" && direction === "right") {
      dispatch(
        gettingQuotations(router, 1, {
          updateInsideQuotation: true,
        })
      );
    }
    if (router.pathname === "/managebooking") {
      dispatch(
        gettingQuotations(router, 0, {
          updateInsideQuotation: true,
        })
      );
    }
  };

  return (
    <>
      {selectedItems?.map((item, i) => {
        return (
          <div
            className={`
            ${styles.selected_list}

            ${inTransferComp && styles.intrasferComponent}
            ${fromQuotation && styles.fromQuotation}
               ${forBooking && styles.forbookingpage}
            `}
            key={i}
          >
            <div className={styles.list_container}>
              <div className={styles.list}>
                <span className={styles.list_number}>{i + 1}</span>
                {imageObjects && (
                  <img
                    className={styles.list_image}
                    src={`${env.apiDomain}${imageObjects[item?.pcatId]
                      }`}
                    alt={item.address}
                  />
                )}
                <p className={styles.list_description}>{item?.address}</p>
                {forBooking ? (
                  <div className={styles.icons}>
                    <i
                      className={`fa fa-times sef-loc-delete ${styles.delete_icon}`}
                      aria-hidden="true"
                      onClick={() => handleDelete(item, i)}
                    ></i>
                  </div>
                ) : null}
                {!inTransferComp ? (
                  <div className={styles.icons}>
                    <i
                      className={`fa fa-times sef-loc-delete ${styles.delete_icon}`}
                      aria-hidden="true"
                      onClick={() => handleDelete(item, i)}
                    ></i>

                    <i
                      className={`fa-solid fa-check ${styles.check_button}`}
                    ></i>
                  </div>
                ) : null}
              </div>

              {/* //!checking for flight pickups */}
              <CheckForFlight
                item={item}
                journeyType={journeyType}
                index={index}
                inTransferComp={inTransferComp}
                whichSelectedItem={i}
              />

              {/* //! checkingForCruises  */}
              <CheckForCruises
                item={item}
                journeyType={journeyType}
                index={index}
                inTransferComp={inTransferComp}
                whichSelectedItem={i}
              />
              {/* CHECK FOR TRAIN */}
              <CheckForTrain
                item={item}
                journeyType={journeyType}
                index={index}
                inTransferComp={inTransferComp}
                whichSelectedItem={i}
              />
              {/* check for room */}
              <CheckForRoomNumber
                item={item}
                journeyType={journeyType}
                index={index}
                inTransferComp={inTransferComp}
                whichSelectedItem={i}
              />
              {/*//! checking for postcodes  */}
              <CheckingForPostcodes
                item={item}
                journeyType={journeyType}
                index={index}
                inTransferComp={inTransferComp}
                whichSelectedItem={i}
              />

              {/*chck for place of interest  */}
              <CheckPlaceOfInterest
                item={item}
                journeyType={journeyType}
                index={index}
                inTransferComp={inTransferComp}
                whichSelectedItem={i}
              />

              {/* //check for citites   */}

              <CheckForCitites
                item={item}
                journeyType={journeyType}
                index={index}
                inTransferComp={inTransferComp}
                whichSelectedItem={i}
              />

              {/* universitirs */}

              <CheckForUniversity
                item={item}
                journeyType={journeyType}
                index={index}
                inTransferComp={inTransferComp}
                whichSelectedItem={i}
              />

              {/* CHECK FOR  other locations */}
              <CheckForOther
                item={item}
                journeyType={journeyType}
                index={index}
                inTransferComp={inTransferComp}
                whichSelectedItem={i}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default SelectedLists;
