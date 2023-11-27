import React, { useEffect, useState } from "react";
import { useWindowSize } from "../../../../hooks/useWindowSize";

import styles from "./oneway.module.scss";
import TextInput from "../../TextInput";
import DateInput from "../../DateInput";
import TimePicker from "../../TimePicker";
import BlueBotton from "../../Buttons/BlueButton";
import Alert from "../../AlertMessages";
import { hourss, minutes } from "../../../../constants/showCase";
import { useDispatch, useSelector } from "react-redux";
import HandleSearchResults from "../../HandleSearchResults";
import {
  DroopOffPointsOneWay,
  PickUpPointsOneWay,
  quotTransferLoading,
  selectedDroppOffInputOneWay,
  selectedJourneyType,
  selectedPickUpInputOneWay,
  selectPickUpDropOffReducer,
  showExtraTextForDropTr,
  showExtraTextForPickUpTr,
  showInputAfterAddPickUpTr,
  showInputAfterAdDropTr,
  transferDateTimeString,
  transferErrorParams,
} from "../../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import {
  addExtraInputForJourney,
  collectPickUpPoints,
  gettingQuotations,
  resetData,
  setDataTime,
  setParamsError,
  updateSearchValue,
} from "../../../../store/pickUpDropOffReducer/pickUpDropAction";
import SelectedLists from "../../SeletedLists";
import {
  dateTimeStringFunc,
  dateTimeStringFuncOneHourAhead,
} from "../../../../helpers/getDate";
import LoadBtn from "../../Buttons/LoadBtn";
import { useRouter } from "next/router";
import { GET_VALUES_FROM_ARTICLES } from "../../../../store/pickUpDropOffReducer/pickUpDropTypes";
const OneWay = ({
  btnTittle,
  border,
  responsive,
  showHeader,
  noAlert,
  dontChangeRouter = false,
  forBooking,
  inTransferComp, //manage bookingden gelir =>//pickupointin adi gelende asagisinda flightnumberdegelsindeye bunu gonderik
  fromQuotation = false,
  fromArticle = false,
  preSelectedPickupPoint = [],
  preSelectedDropoffPoint = [],
}) => {
  //selectors
  const router = useRouter();
  const dispatch = useDispatch();
  const { loadingDropOffOneWay, loadingPickUpOneWay, direction, params } = useSelector(
    selectPickUpDropOffReducer
  );
  console.log(
  );

  const selectJourneyType = useSelector(selectedJourneyType);
  const selectPickUpInputOneWay = useSelector(selectedPickUpInputOneWay);
  const selectDroppOffInputOneWay = useSelector(selectedDroppOffInputOneWay);
  const selectedPickUpPointsOneWay = useSelector(PickUpPointsOneWay);
  const selectedDropOffPoints = useSelector(DroopOffPointsOneWay);
  const selectTransferDateTimeString = useSelector(transferDateTimeString);
  const selectTransferErorParams = useSelector(transferErrorParams);
  const selectShowAddExtraTextPickUp = useSelector(showExtraTextForPickUpTr);
  const selectShowInpAfterAdItmPicUp = useSelector(showInputAfterAddPickUpTr);
  const selectShowInpAddItemDropOff = useSelector(showInputAfterAdDropTr);
  const selectShowAddExtraTextDropOff = useSelector(showExtraTextForDropTr);
  const selectQuotTransferLoading = useSelector(quotTransferLoading);
  const [focused, setFocused] = useState(false);
  let [internalState, setInternalState] = React.useReducer((s, o) => ({ ...s, ...o }), {
    'pickup-search-focus-0': false,//it is for modal
    'dropoff-search-focus-0': false,//it is for modal
    'pickup-search-focus-1': false,//it is for modal
    'dropoff-search-focus-1': false,//it is for modal
  })
  let size = useWindowSize()
  let { width } = size
  const closeModal = (params = {}) => {
    if (width < 990) {
      let { index, destination } = params
      let inputField = document.querySelector('[dataid="input_focused"]');
      inputField.style.opacity = 1
      setInternalState({ [`${destination}-search-focus-${index}`]: false })
      let navbarElement = document.querySelector("#navbar_container")
      navbarElement.style.display = "flex"
      //set Focus?
    }

  }

  const onFocus = (params = {}) => {
    setFocused(true);
    if (width < 990) {
      let navbarElement = document.querySelector("#navbar_container")
      navbarElement.style.display = "none"
      let { e, destination, index } = params
      e.target.style.opacity = 0
      setInternalState({ [`${destination}-search-focus-${index}`]: window.innerWidth > 990 ? false : true })
      const pickup0 = document?.querySelector("#pickup0");
      const drop0 = document?.querySelector("#drop0");
      e.target.style.opacity = 1

      if (destination === "pickup" && index === 0) {
        setTimeout(() => {
          window.scroll({ top: pickup0, left: 0, behavior: "smooth", });
        }, 100);
      }

      if (destination === "dropoff" && index === 0) {
        setTimeout(() => {
          window.scroll({ top: drop0, left: 0, behavior: "smooth", });
        }, 100);
      }


    }
  }
  const onBlur = () => {
    setTimeout(() => {
      setFocused(false);
      dispatch(resetData());
    }, 200);
  };


  //handleChange function
  const onchangeHandler = (e, pickUpOrDropOff, journeyType) => {

    let inpValue = e.target.value
    if (inpValue.includes('"') || inpValue.includes(`'`) || inpValue.includes('/') || inpValue.includes('\\')) {
      return
    }
    if (pickUpOrDropOff === "date") {
      dispatch(setDataTime(e.target.value, pickUpOrDropOff, journeyType));
      // console.log(e.target.value);
      if (router.pathname === "/managebooking") {
        dispatch(
          gettingQuotations(router, 0, {
            updateInsideQuotation: true,
          })
        );
      }

      if (router.pathname === "/quotation" && direction === "left" || router.pathname === "/quotation" && direction === "right" && journeyType === 0) {
        // console.log(journeyType);
        // console.log("inside oneway");
        // console.log(e, pickUpOrDropOff, journeyType);

        dispatch(
          gettingQuotations(router, 0, {
            updateInsideQuotation: true,
          })
        );
      }
    } else {
      //updating input value in redux
      dispatch(updateSearchValue(e.target.value, pickUpOrDropOff, journeyType));
      //collecting suggestion if input value more than 2 letter
      if (e.target.value.length > 2) {
        dispatch(
          collectPickUpPoints(e.target.value, pickUpOrDropOff, journeyType)
        );
      }
      //if input value less than 3 letter it will clean  previous data
      if (e.target.value.length < 3) dispatch(resetData());
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedDropOffPoints.length < 1 || selectedPickUpPointsOneWay.length < 1) {
      dispatch(setParamsError("Select one point at least, invalid", "both", 0));
    } else {
      dispatch(setParamsError("", "both", 0));

      if (router.pathname === "/quotation") {
        if (!selectTransferErorParams.dateTimeForBoolean) {
          dispatch(gettingQuotations(router, 0, { updateInsideQuotation: true, }));
        }
      } else {
        if (!selectTransferErorParams.dateTimeForBoolean) {
          dispatch(gettingQuotations(!dontChangeRouter ? router : "", 0, { updateInsideQuotation: false, }));
        }
      }
    }
  };
  const handleAddNewInput = (pickOrDrop, journeyType, whereFuncComes) => {
    dispatch(addExtraInputForJourney(pickOrDrop, journeyType, whereFuncComes));
  };
  const deleteField = (params = {}) => {
    let { destination, index } = params
    // setInternalState({
    //   [`${destination}-search-value-${index}`]: "",
    //   [`${destination}-points-error-${index}`]: "",
    //   [`${destination}-search-focus-${index}`]: false,
    //   [`collecting-${destination}-points-${index}`]: [],
    //   [`show-${destination}-extra-point-${index}`]: true,
    // })
  }
  //burdaki use effect degerinde beraber farki var yuxardakiynan
  useEffect(() => {
    if (Number(dateTimeStringFunc()?.split(" ")?.[1].split(":")[0]) >= 10) {
      if (
        dateTimeStringFunc().split(" ")[0] ===
        selectTransferDateTimeString?.split(" ")[0] &&
        Number(dateTimeStringFunc()?.split(" ")?.[1].split(":")[0]) >
        Number(selectTransferDateTimeString.split(" ")[1].split(":")[0])
      ) {
        // console.log("frsr");

        dispatch(
          setParamsError("İnvalid  time", "dateTimeError", 0, true)
        );
      } else {
        dispatch(setParamsError("", "dateTimeError", 0, false));
      }
    }
    //if date is equal 2022-02-19  ===2022-02-19       01 current  02 client choiced
    //yani bu durumda eger saat 01 is e client birden buyuk secmelidirki hata vermesin
    if (Number(dateTimeStringFunc()?.split(" ")?.[1].split(":")[0]) <= 10) {
      if (
        dateTimeStringFunc().split(" ")[0] ===
        selectTransferDateTimeString.split(" ")[0] &&
        Number(dateTimeStringFunc()?.split(" ")?.[1].split(":")[0]) >
        Number(selectTransferDateTimeString.split(" ")[1].split(":")[0])
      ) {
        dispatch(
          setParamsError("İnvalid  time", "dateTimeError", 0, true)
        );
      } else {
        dispatch(setParamsError("", "dateTimeError", 0, false));
      }
    }
  }, [selectTransferDateTimeString]);

  useEffect(() => {
    if (fromArticle) {
      dispatch({
        type: GET_VALUES_FROM_ARTICLES,
        payload: {
          preSelectedPickupPoint,
          preSelectedDropoffPoint,
          dateTime: dateTimeStringFuncOneHourAhead(),
        },
      });
    }
  }, []);

  return (
    <div
      style={{
        border: `${fromArticle ? "1px solid #2565df66" : "none"}`,
      }}
      className={`
      ${responsive
          ? styles.responsive_oneway_tab_content
          : styles.oneway_tab_content
        }
       ${border === "blue" ? styles.border_blue : " "}

       ${forBooking && styles.forBooking}
       `}
    >
      <form className={styles.form_container} onSubmit={handleSubmit}>
        {showHeader && (
          <h1 className={styles.general_box_title}>Transfer Details</h1>
        )}

        <div className={styles.form_flying}>
          <div className={`col_6 ${styles.inp_box} ${styles['search-input-container']}`} f={String(internalState[`pickup-search-focus-0`])} id="pickup0">
            {!fromQuotation ?
              <div className={styles.popup_header} f={String(internalState[`pickup-search-focus-0`])}>
                <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={(e) => closeModal({ index: 0, destination: "pickup" })}></i>
                <p>From ?</p>
              </div>
              : ""}
            {selectedPickUpPointsOneWay.length === 0 && (
              <TextInput
                title={`${(internalState[`pickup-search-focus-0`]) ? "" : "Pick Up Point"}`}
                icon="location-dot"
                placeholder="City or Airport"
                type="text"
                name="PickUpPoint"
                onChange={(e) => onchangeHandler(e, 0, 0)}
                value={selectPickUpInputOneWay}
                isLoading={loadingPickUpOneWay}
                onBlur={onBlur}
                errorMessage={
                  selectedPickUpPointsOneWay.length < 1 &&
                  selectTransferErorParams.selectedPickUpPointError
                }
                onFocus={e => onFocus({ e, destination: "pickup", index: 0 })}
                dataid="input_focused"
                f={String(internalState[`pickup-search-focus-0`])}//bu responsivde asagidaki boslugu goturur (csse bax)

              />
            )}
            {/* for showing results on screen we need three conditoon together  */}
            {selectedPickUpPointsOneWay.length === 0 &&
              selectPickUpInputOneWay?.length > 2 &&
              selectJourneyType === 0 && (
                <HandleSearchResults pickOrDrop={"pickupPoints"} setInternalState={setInternalState} />
              )}
            {selectedPickUpPointsOneWay?.length > 0 && !internalState[`pickup-search-focus-0`] && (
              <p className={styles.point_headerr}>Pick up Points</p>
            )}
            {selectedPickUpPointsOneWay?.length > 0 && !internalState[`pickup-search-focus-0`] && (
              <SelectedLists
                selectedItems={selectedPickUpPointsOneWay}
                index={0}
                journeyType={0}
                inTransferComp={inTransferComp}
                forBooking={forBooking}
                fromQuotation={fromQuotation}
              />
            )}
            {selectShowInpAfterAdItmPicUp && selectedPickUpPointsOneWay.length !== 0 && (
              <div style={{ position: "relative" }}>
                <TextInput
                  title=""
                  icon="location-dot"
                  placeholder="City or Airport"
                  type="text"
                  name="PickUpPoint"
                  onChange={(e) => onchangeHandler(e, 0, 0)}
                  value={selectPickUpInputOneWay}
                  isLoading={loadingPickUpOneWay}
                  onBlur={onBlur}
                  errorMessage={
                    selectedPickUpPointsOneWay.length < 1 &&
                    selectTransferErorParams.selectedPickUpPointError
                  }
                  noMarginTop={true}
                  onFocus={e => onFocus({ e, destination: "pickup", index: 0 })}
                  dataid="input_focused"
                  f={String(internalState[`pickup-search-focus-0`])}//bu responsivde asagidaki boslugu goturur (csse bax)

                />
                {/* <i onClick={(e) => deleteField({ destination: "pickup", index })} className={`fa-solid fa-delete-left ${styles.input_delete_field_icon}`}></i> */}
              </div>
            )}

            {/* selectedPickUpPointsOneWay.length > 0 && */}
            {!selectShowAddExtraTextPickUp &&
              selectPickUpInputOneWay?.length > 2 &&
              selectJourneyType === 0 && (
                <HandleSearchResults pickOrDrop={"pickupPoints"} setInternalState={setInternalState} />
              )}
            {selectedPickUpPointsOneWay.length > 0 &&
              selectShowAddExtraTextPickUp && (
                <div
                  className={styles.add_extrafly_div}
                  onClick={() =>
                    handleAddNewInput("pickupPoints", 0, "handleInp")
                  }
                >
                  <i
                    className={`fa-solid fa-plus ${styles.add_extrafly_div_icon}`}
                  ></i>
                  <p className={styles.add_extrafly_div_text}>
                    Add Extra Point
                  </p>
                </div>
              )}
          </div>
          <div className={`col_6 ${styles.inp_box} ${styles['search-input-container']}`} f={String(internalState[`dropoff-search-focus-0`])} id="drop0">
            {!fromQuotation ? <div className={styles.popup_header} f={String(internalState[`dropoff-search-focus-0`])}>
              <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={(e) => closeModal({ index: 0, destination: "dropoff" })}></i>
              <p>From ?</p>
            </div> : ""}
            {selectedDropOffPoints.length === 0 && (
              <TextInput
                title={`${(internalState[`dropoff-search-focus-0`]) ? "" : "Drop Off Location"}`}
                name="DropOffLocation"
                icon="location-dot"
                placeholder="City or Airport"
                type="text"
                onChange={(e) => onchangeHandler(e, 1, 0)}
                value={selectDroppOffInputOneWay}
                onFocus={e => onFocus({ e, destination: "dropoff", index: 0 })}
                onBlur={onBlur}
                isLoading={loadingDropOffOneWay}
                errorMessage={
                  selectedDropOffPoints.length < 1 &&
                  selectTransferErorParams.selectedDropOffPointsError
                }
                dataid="input_focused"
                f={String(internalState[`dropoff-search-focus-0`])}//bu responsivde asagidaki boslugu goturur (csse bax)

              />
            )}

            {/* for showing results on screen we need three conditoon together  */}
            {selectedDropOffPoints.length === 0 &&
              selectDroppOffInputOneWay?.length > 2 &&
              selectJourneyType === 0 &&
              focused && <HandleSearchResults pickOrDrop={"dropoffPoints"} setInternalState={setInternalState} />}

            {selectedDropOffPoints?.length > 0 && !internalState[`dropoff-search-focus-0`] && (
              <p className={styles.point_headerr}>Drop Off Points</p>
            )}
            {selectedDropOffPoints?.length > 0 && !internalState[`dropoff-search-focus-0`] && (
              <SelectedLists
                selectedItems={selectedDropOffPoints}
                index={1}
                journeyType={0}
                inTransferComp={inTransferComp}
                forBooking={forBooking}
                fromQuotation={fromQuotation}
              />
            )}

            {selectShowInpAddItemDropOff && selectedDropOffPoints.length !== 0 && (
              <div style={{ position: 'relative' }}>
                <TextInput
                  title=""
                  name="DropOffLocation"
                  icon="location-dot"
                  placeholder="City or Airport"
                  type="text"
                  onChange={(e) => onchangeHandler(e, 1, 0)}
                  value={selectDroppOffInputOneWay}

                  onBlur={onBlur}
                  isLoading={loadingDropOffOneWay}
                  errorMessage={
                    selectedDropOffPoints.length < 1 &&
                    selectTransferErorParams.selectedDropOffPointsError
                  }
                  noMarginTop={true}
                  forBooking={true}
                  onFocus={e => onFocus({ e, destination: "dropoff", index: 0 })}
                  dataid="input_focused"
                  f={String(internalState[`dropoff-search-focus-0`])}//bu responsivde asagidaki boslugu goturur (csse bax)

                />
                {/* {(!internalState[`show-pickup-extra-point-${index}`] && selectedPickupPoints.length > 0 && !internalState[`pickup-search-loading-${index}`]) ? */}
                {/* <i onClick={(e) => deleteField({ pickOrDrop: "dropoffPoints", index })} className={`fa-solid fa-delete-left ${styles.input_delete_field_icon}`}></i> */}
                {/* : <React.Fragment></React.Fragment>} */}
              </div>
            )}
            {/* delete field icon  */}

            {/* /selectedDropOffPoints.length > 0 && */}
            {!selectShowAddExtraTextDropOff &&
              selectDroppOffInputOneWay?.length > 2 &&
              selectJourneyType === 0 &&
              focused && <HandleSearchResults pickOrDrop={"dropoffPoints"} setInternalState={setInternalState} />}

            {selectedDropOffPoints.length > 0 && selectShowAddExtraTextDropOff && (
              <div
                className={styles.add_extrafly_div}
                onClick={() =>
                  handleAddNewInput("dropoffPoints", 0, "handleInp")
                }
              >
                <i
                  className={`fa-solid fa-plus ${styles.add_extrafly_div_icon}`}
                ></i>
                <p className={styles.add_extrafly_div_text}>Add Extra Point</p>
              </div>
            )}



          </div>
        </div>
        <div className={styles.form_departing}>
          <div className={`${styles.departing_date} coll_6 `}>
            <DateInput
              title={`${selectedPickUpPointsOneWay[0]?.pcatId === 1
                ? "Flight Landing Date"
                : "Pick Up Date"
                }`}
              name="DeparuteDate"
              min={dateTimeStringFunc()?.split(" ")[0]}
              type="date"
              onChange={(e) => onchangeHandler(e, "date", 0)}
              //here we sending 2022-0422   part of
              value={selectTransferDateTimeString?.split(" ")[0]}
              errorMessage={
                selectTransferErorParams.dateTimeForBoolean &&
                selectTransferErorParams.selectedTimeError
              }
            />
          </div>
          {/* //? hour and time  clo_lg-3*/}
          <div className={styles.departing_time}>
            <TimePicker
              name="hour"
              title={`${selectedPickUpPointsOneWay[0]?.pcatId === 1
                ? "Landing Hour"
                : "Pick Up Hour"
                }`}
              className={styles.hour}
              options={hourss}
              journeyType={0}
              errorMessage={selectTransferErorParams.dateTimeForBoolean}
            />
            <TimePicker
              name="minute"
              title={`${selectedPickUpPointsOneWay[0]?.pcatId === 1
                ? "Landing Minute"
                : "Pick Up Minute"
                }`}
              journeyType={0}
              className={styles.minute}
              options={minutes}
              errorMessage={selectTransferErorParams.dateTimeForBoolean}
            />
          </div>
          <div className={styles.departing_btn}>
            {selectQuotTransferLoading &&
              !selectTransferErorParams.dateTimeForBoolean ? (
              <LoadBtn />
            ) : (
              <BlueBotton
                title={btnTittle ? btnTittle : "Search Now"}
                type="submit"
              />
            )}
          </div>
        </div>

        {params?.quotations?.quotationError?.errorMessage && params?.quotations?.transferQuotations?.status !== 200 ? <p className={styles.errorBookedMessage}>{params.quotations.quotationError.errorMessage}</p> : <></>}
      </form>
      {!noAlert && (
        <div className={styles.alertOrMessage}>
          {responsive ? (
            selectTransferErorParams.dateTimeForBoolean && (
              <Alert
                alert={"alert"}
                alert_color="alert_sky"
                message="If you would like to make a last minute booking or for within the next 3 hours please kindly call our office on +442086832330 in which our friendly team will be more than happy to assist you further. Have a safe journey! "
              />
            )
          ) : (
            <Alert
              alert={"alert"}
              alert_color="alert_sky"
              message="If you would like to make a last minute booking or for within the next 3 hours please kindly call our office on +442086832330 in which our friendly team will be more than happy to assist you further. Have a safe journey! "
            />
          )}
        </div>
      )}
    </div>
  );
};
export default OneWay;
