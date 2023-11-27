import React, { useEffect, useState } from "react";
import styles from "./return.module.scss";
import stylesFromOneWay from "../OneWay/oneway.module.scss";
import TextInput from "../../TextInput";
import TimePicker from "../../TimePicker";
import DateInput from "../../DateInput";
import BlueBotton from "../../Buttons/BlueButton";
import { hourss, minutes } from "../../../../constants/showCase";
import HandleSearchResults from "../../HandleSearchResults";
import { useDispatch, useSelector } from "react-redux";
import {
  DroopOffPointsOneWay,
  DropOffPointsReturn,
  PickUpPointsOneWay,
  PickUpPointsReturn,
  returnDateTimeString,
  returnErrorParams,
  selectedDroppOffInputOneWay,
  selectedDroppOffInputReturn,
  selectedJourneyType,
  selectedPickUpInputOneWay,
  selectedPickUpInputReturn,
  selectPickUpDropOffReducer,
  transferDateTimeString,
  transferErrorParams,
  showExtraTextForDropTr,
  showExtraTextForPickUpTr,
  showInputAfterAddPickUpTr,
  showInputAfterAdDropTr,
  showExtraTxtFrPickUpRt,
  showExtraTextForDropRt,
  showInputAfterAddPckUpRt,
  showInputAfterAdDropRt,
  quotReturnLoading,
  quotBothLoading,
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
  convertDateToMilliSecond,
  dateTimeStringFunc,
  dateTimeStringFuncForReturn,
} from "../../../../helpers/getDate";
import LoadBtn from "../../Buttons/LoadBtn";
import { useRouter } from "next/router";
import Alert from "../../AlertMessages";
import { useWindowSize } from "../../../../hooks/useWindowSize";
const Return = ({
  btnTittle,
  border,
  responsive = false,
  showHeader,
  remainTransferSide,
  remainReturnSide,
  dontChangeRouter = false,
  forBooking,
  inTransferComp,
  noAlert = false,
  fromQuotation = false,
}) => {
  const {
    loadingPickUpOneWay,
    loadingDropOffOneWay,
    loadingPickUpReturn,
    loadingDropOffReturn,
    direction,
    params
  } = useSelector(selectPickUpDropOffReducer);
  const selectJourneyType = useSelector(selectedJourneyType);

  const selectPickUpInputOneWay = useSelector(selectedPickUpInputOneWay);
  const selectDroppOffInputOneWay = useSelector(selectedDroppOffInputOneWay);
  const selectedPickUpPointsOneWay = useSelector(PickUpPointsOneWay);
  const selectedDropOffPointsOneWay = useSelector(DroopOffPointsOneWay);
  const selectTransferDateTimeString = useSelector(transferDateTimeString);
  const selectTransferErorParams = useSelector(transferErrorParams);
  const selectShowAddExtraTextPickUp = useSelector(showExtraTextForPickUpTr);
  const selectShowInpAfterAdItmPicUp = useSelector(showInputAfterAddPickUpTr);
  const selectShowInpAddItemDropOff = useSelector(showInputAfterAdDropTr);
  const selectShowAddExtraTextDropOff = useSelector(showExtraTextForDropTr);

  const selectPickUpInputReturn = useSelector(selectedPickUpInputReturn);
  const selectDroppOffInputReturn = useSelector(selectedDroppOffInputReturn);
  const selectedPickUpPointsReturn = useSelector(PickUpPointsReturn);
  const selectedDropOffPointsReturn = useSelector(DropOffPointsReturn);
  const selectReturnDateTimeString = useSelector(returnDateTimeString);
  const selectReturnErrorParams = useSelector(returnErrorParams);
  const selectShowAddExtraTextPckUpReturn = useSelector(showExtraTxtFrPickUpRt);
  const selectShowInpAfterAdItmPicUpRetrn = useSelector(
    showInputAfterAddPckUpRt
  );
  const selectShowInpAddItemDropOffRtrn = useSelector(showInputAfterAdDropRt);
  const selectShowAddExtraTextDropOffRtrn = useSelector(showExtraTextForDropRt);

  const selectQuotReturnLoading = useSelector(quotReturnLoading);
  const selectBothQuotLoading = useSelector(quotBothLoading);
  const dispatch = useDispatch();
  const router = useRouter();

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
    let { e, destination, index } = params
    if (width < 990) {
      let navbarElement = document.querySelector("#navbar_container")
      navbarElement.style.display = "none"
      e.target.style.opacity = 0
      setInternalState({ [`${destination}-search-focus-${index}`]: window.innerWidth > 990 ? false : true })

      const pickup0 = document?.querySelector("#pickup0");
      const drop0 = document?.querySelector("#drop0");
      const drop1 = document?.querySelector("#drop1");
      const pickup1 = document?.querySelector("#pickup1");
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
      if (destination === "pickup" && index === 1) {
        setTimeout(() => {
          window.scroll({ top: pickup1, left: 0, behavior: "smooth", });
        }, 100);
      }

      if (destination === "dropoff" && index === 1) {
        setTimeout(() => {
          window.scroll({ top: drop1, left: 0, behavior: "smooth", });
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


  const onChangeHandler = (e, pickUpOrDropOff, journeyType) => {
    let inpValue = e.target.value
    if (inpValue.includes('"') || inpValue.includes(`'`) || inpValue.includes('/') || inpValue.includes('\\')) {
      return
    }
    if (pickUpOrDropOff === "date") {
      dispatch(setDataTime(e.target.value, pickUpOrDropOff, journeyType));

      if (
        (router.pathname === "/quotation" && direction === "left") ||
        (router.pathname === "/quotation" && direction === "right" && journeyType === 0)
      ) {
        dispatch(
          gettingQuotations(router, 0, {
            updateInsideQuotation: true,
          })
        );
      }

      //bunu deyiseceyik sadece return ucun edeceyik
      if (
        (router.pathname === "/quotation" && direction === "right") ||
        (router.pathname === "/quotation" &&
          direction === "left" &&
          journeyType === 1)
      ) {
        dispatch(
          gettingQuotations(router, 1, {
            updateInsideQuotation: true,
          })
        );
      }
    } else {
      dispatch(updateSearchValue(e.target.value, pickUpOrDropOff, journeyType));
      if (e.target.value.length > 2) {
        dispatch(
          collectPickUpPoints(e.target.value, pickUpOrDropOff, journeyType)
        );
      }
      if (e.target.value.length < 3) dispatch(resetData());
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      selectedDropOffPointsOneWay.length < 1 ||
      selectedPickUpPointsOneWay.length < 1
    ) {
      dispatch(setParamsError("Select one point at least, invalid", "both", 0));
    } else {
      dispatch(setParamsError("", "both", 0));
    }

    // ! for return
    if (
      selectedDropOffPointsReturn.length < 1 ||
      selectedPickUpPointsReturn.length < 1
    ) {
      dispatch(setParamsError("Select one point at least, invalid", "both", 1));
    } else {
      dispatch(setParamsError("", "both", 1));
    }

    if (
      selectedDropOffPointsReturn.length > 0 &&
      selectedPickUpPointsReturn.length > 0 &&
      selectedDropOffPointsOneWay.length > 0 &&
      selectedPickUpPointsOneWay.length > 0
    ) {
      if (router.pathname === "/quotation") {
        if (
          !selectTransferErorParams.dateTimeForBoolean &&
          !selectReturnErrorParams.dateTimeForBoolean
        ) {
          dispatch(
            gettingQuotations(router, selectJourneyType, {
              updateInsideQuotation: true,
            })
          );
        }
      } else {
        if (
          !selectTransferErorParams.dateTimeForBoolean &&
          !selectReturnErrorParams.dateTimeForBoolean
        ) {
          // console.log("calisdimmmmm");

          dispatch(
            gettingQuotations(
              !dontChangeRouter ? router : "",
              selectJourneyType,
              {
                updateInsideQuotation: false,
              }
            )
          );
        }
      }
    }

    //burdaki fonksyon manage booka gelende Her journey ucun edit edende calismasini saglamamiz icin yaziyoruz

    if (
      selectedDropOffPointsReturn.length > 0 &&
      selectedPickUpPointsReturn.length > 0
    ) {
      if (router.pathname === "/managebooking") {
        if (!selectReturnErrorParams.dateTimeForBoolean) {
          dispatch(
            gettingQuotations(router, 1, {
              updateInsideQuotation: true, //guotation sayfasinda nasil otomatik calisdiriyorduksak burdada oyle yapiyoruz
            })
          );
        }
      } else {
        if (!selectReturnErrorParams.dateTimeForBoolean) {
          dispatch(
            gettingQuotations(
              !dontChangeRouter ? router : "",
              selectJourneyType,
              {
                updateInsideQuotation: false,
              }
            )
          );
        }
      }
    }
  };
  const handleAddNewInput = (pickOrDrop, journeyType, whereFuncComes) => {
    dispatch(addExtraInputForJourney(pickOrDrop, journeyType, whereFuncComes));
  };
  useEffect(() => {
    if (Number(dateTimeStringFunc()?.split(" ")?.[1].split(":")[0]) >= 10) {
      if (
        dateTimeStringFunc().split(" ")[0] ===
        selectTransferDateTimeString.split(" ")[0] &&
        Number(dateTimeStringFunc()?.split(" ")?.[1].split(":")[0]) >
        Number(selectTransferDateTimeString.split(" ")[1].split(":")[0])
      ) {
        // console.log("frsr");

        dispatch(
          setParamsError("İnvalid   time", "dateTimeError", 0, true)
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
    //if return date is behind transfer date it will show up error
    if (
      convertDateToMilliSecond(selectReturnDateTimeString.split(" ")[0]) <
      convertDateToMilliSecond(selectTransferDateTimeString.split(" ")[0])
    ) {
      dispatch(setParamsError("İnvalid   time", "dateTimeError", 1, true));
    } else {
      dispatch(setParamsError("", "dateTimeError", 1, false));
    }
  }, [selectTransferDateTimeString, selectReturnDateTimeString]);
  // console.log(params?.quotations?.quotationError)
  return (
    <>
      {/* eger booking trudursa returnun tek componenti gelecek Yo eger  degilse Normal return komponenti gelecek */}
      {!forBooking ? (
        <div
          className={`
      ${responsive
              ? styles.responsice_return_tab_content
              : styles.return_tab_content
            }
      ${border === "blue" && styles.border_blue}
      ${forBooking ? styles.forBooking : ""}
      `}
        >
          <form action="" onSubmit={handleSubmit}>
            {/* //!transfer details */}
            {/* booking management de transfer detailse deymirik Genel olarak dispay none dur */}
            <div id="ttttt" className={`${styles.form_transfer} ${styles.general_box} ${remainReturnSide && styles.hiddenTransfer}`}    >
              <h1 className={styles.general_box_title}>Transfer Details</h1>
              <div className={styles.inp_boxes}>
                <div className={`${styles.inp_box} ${styles['search-input-container']}`} f={String(internalState[`pickup-search-focus-0`])} id="pickup0">
                  {!fromQuotation ? <div className={styles.popup_header} f={String(internalState[`pickup-search-focus-0`])}>
                    <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={(e) => closeModal({ index: 0, destination: "pickup" })}></i>
                    <p>From ?</p>
                  </div> : ""}
                  {selectedPickUpPointsOneWay.length === 0 && (
                    <TextInput
                      title={`${(internalState[`pickup-search-focus-0`]) ? "" : "Pick Up Point"}`}
                      icon="location-dot"
                      placeholder="City or Airport"
                      type="text"
                      name="Flyingfrom"
                      onChange={(e) => onChangeHandler(e, 0, 0)}
                      value={selectPickUpInputOneWay}

                      onBlur={onBlur}
                      isLoading={loadingPickUpOneWay}
                      errorMessage={
                        selectedPickUpPointsOneWay.length < 1
                          ? selectTransferErorParams.selectedPickUpPointError
                          : ""
                      }
                      onFocus={e => onFocus({ e, destination: "pickup", index: 0 })}
                      dataid="input_focused"
                      f={String(internalState[`pickup-search-focus-0`])}//bu responsivde asagidaki boslugu goturur (csse bax)
                    />
                  )}

                  {selectedPickUpPointsOneWay.length === 0 &&
                    selectPickUpInputOneWay?.length > 2 &&
                    selectJourneyType === 0 &&
                    focused && (
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
                      fromQuotation={fromQuotation}
                    />
                  )}

                  {selectShowInpAfterAdItmPicUp && selectedPickUpPointsOneWay.length !== 0 && (
                    <TextInput
                      title=""
                      icon="location-dot"
                      placeholder="City or Airport"
                      type="text"
                      name="Flyingfrom"
                      onChange={(e) => onChangeHandler(e, 0, 0)}
                      value={selectPickUpInputOneWay}
                      onBlur={onBlur}
                      isLoading={loadingPickUpOneWay}
                      errorMessage={
                        selectedPickUpPointsOneWay.length < 1
                          ? selectTransferErorParams.selectedPickUpPointError
                          : ""
                      }
                      noMarginTop={true}
                      onFocus={e => onFocus({ e, destination: "pickup", index: 0 })}
                      dataid="input_focused"
                      f={String(internalState[`pickup-search-focus-0`])}//bu responsivde asagidaki boslugu goturur (csse bax)

                    />
                  )}
                  {!selectShowAddExtraTextPickUp &&
                    selectPickUpInputOneWay?.length > 2 &&
                    selectJourneyType === 0 &&
                    focused && (
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
                <div className={`${styles.inp_box} ${styles['search-input-container']}`} f={String(internalState[`dropoff-search-focus-0`])} id="drop0">
                  {!fromQuotation ?
                    <div className={styles.popup_header} f={String(internalState[`dropoff-search-focus-0`])}>
                      <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={(e) => closeModal({ index: 0, destination: "dropoff" })}></i>
                      <p>From ?</p>
                    </div>
                    : ""}
                  {selectedDropOffPointsOneWay?.length === 0 && (
                    <TextInput
                      title={`${(internalState[`dropoff-search-focus-0`]) ? "" : "Drop Off Location"}`}
                      name="Flyingto"
                      icon="location-dot"
                      placeholder="City or Airport"
                      type="text"
                      onChange={(e) => onChangeHandler(e, 1, 0)}
                      value={selectDroppOffInputOneWay}
                      onFocus={e => onFocus({ e, destination: "dropoff", index: 0 })}
                      onBlur={onBlur}
                      isLoading={loadingDropOffOneWay}
                      errorMessage={
                        selectedDropOffPointsOneWay.length < 1 &&
                        selectTransferErorParams.selectedDropOffPointsError
                      }
                      dataid="input_focused"
                      f={String(internalState[`dropoff-search-focus-0`])}//bu responsivde asagidaki boslugu goturur (csse bax)

                    />
                  )}
                  {selectedDropOffPointsOneWay?.length === 0 &&
                    selectDroppOffInputOneWay?.length > 2 &&
                    selectJourneyType === 0 &&
                    focused && (
                      <HandleSearchResults pickOrDrop={"dropoffPoints"} setInternalState={setInternalState} />
                    )}

                  {selectedDropOffPointsOneWay?.length > 0 && !internalState[`dropoff-search-focus-0`] && (
                    <p className={styles.point_headerr}>Drop Off Points</p>
                  )}
                  {selectedDropOffPointsOneWay?.length > 0 && !internalState[`dropoff-search-focus-0`] && (
                    <SelectedLists
                      selectedItems={selectedDropOffPointsOneWay}
                      index={1}
                      journeyType={0}
                      fromQuotation={fromQuotation}
                    />
                  )}
                  {selectShowInpAddItemDropOff && selectedDropOffPointsOneWay?.length !== 0 && (
                    <TextInput
                      title=""
                      name="Flyingto"
                      icon="location-dot"
                      placeholder="City or Airport"
                      type="text"
                      onChange={(e) => onChangeHandler(e, 1, 0)}
                      value={selectDroppOffInputOneWay}
                      onBlur={onBlur}
                      isLoading={loadingDropOffOneWay}
                      errorMessage={
                        selectedDropOffPointsOneWay.length < 1 &&
                        selectTransferErorParams.selectedDropOffPointsError
                      }
                      noMarginTop={true}
                      onFocus={e => onFocus({ e, destination: "dropoff", index: 0 })}
                      dataid="input_focused"
                      f={String(internalState[`dropoff-search-focus-0`])}//bu responsivde asagidaki boslugu goturur (csse bax)
                    />
                  )}
                  {!selectShowAddExtraTextDropOff &&
                    selectDroppOffInputOneWay?.length > 2 &&
                    selectJourneyType === 0 &&
                    focused && (
                      <HandleSearchResults pickOrDrop="dropoffPoints" setInternalState={setInternalState} />
                    )}
                  {selectedDropOffPointsOneWay?.length > 0 &&
                    selectShowAddExtraTextDropOff && (
                      <div
                        className={styles.add_extrafly_div}
                        onClick={() =>
                          handleAddNewInput("dropoffPoints", 0, "handleInp")
                        }
                      >
                        <i
                          className={`fa-solid fa-plus ${styles.add_extrafly_div_icon}`}
                        ></i>
                        <p className={styles.add_extrafly_div_text}>
                          Add Extra D Point
                        </p>
                      </div>
                    )}
                </div>
                <div
                  className={` ${styles.inp_date}`}
                  data-id="is"
                  style={{ dispay: "flex", flexDirection: "column" }}
                >
                  <DateInput
                    title={`${selectedPickUpPointsOneWay[0]?.pcatId === 1
                      ? "Flight Landing Date"
                      : "Pick Up Date"
                      }`}
                    name="DeparuteDate"
                    type="date"
                    onChange={(e) => onChangeHandler(e, "date", 0)}
                    //here we sending 2022-0422   part of
                    value={selectTransferDateTimeString?.split(" ")[0]}
                    errorMessage={
                      selectTransferErorParams.selectedTimeError &&
                      selectTransferErorParams.selectedTimeError
                    }
                    min={dateTimeStringFunc()?.split(" ")[0]}
                  />
                  <div className={` ${styles.inp_time}`}>
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
                      className={styles.minute}
                      options={minutes}
                      journeyType={0}
                      errorMessage={selectTransferErorParams.dateTimeForBoolean}
                    />
                  </div>
                </div>
                {/*
              old inp time was located here */}
              </div>
            </div>
            {/* //!return details */}
            {
              <div className={`${styles.form_return} ${styles.general_box} ${remainTransferSide && styles.hiddenReturn}`}>
                <h1 className={styles.general_box_title}>Return Details</h1>
                <div className={styles.inp_boxes}>
                  <div className={`${styles.inp_box} ${styles['search-input-container']}`} f={String(internalState[`pickup-search-focus-1`])} id="pickup1">
                    {!fromQuotation ?
                      <div className={styles.popup_header} f={String(internalState[`pickup-search-focus-1`])}>
                        <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={(e) => closeModal({ index: 1, destination: "pickup" })}></i>
                        <p>From ?</p>
                      </div>
                      : ""}
                    {selectedPickUpPointsReturn.length === 0 && (
                      <TextInput
                        title={`${(internalState[`pickup-search-focus-1`]) ? "" : "Pick Up Point"}`}
                        icon="location-dot"
                        placeholder="City or Airport"
                        type="text"
                        name="Flyingfrom"
                        onChange={(e) => onChangeHandler(e, 0, 1)}
                        value={selectPickUpInputReturn}
                        onBlur={onBlur}
                        isLoading={loadingPickUpReturn}
                        forBooking={forBooking}
                        errorMessage={
                          selectedPickUpPointsReturn.length < 1 &&
                          selectReturnErrorParams.selectedPickUpPointError
                        }
                        onFocus={e => onFocus({ e, destination: "pickup", index: 1 })}
                        dataid="input_focused"
                        f={String(internalState[`pickup-search-focus-1`])}//bu responsivde asagidaki boslugu goturur (csse bax)
                      />
                    )}

                    {selectedPickUpPointsReturn.length === 0 &&
                      selectPickUpInputReturn?.length > 2 &&
                      selectJourneyType === 1 &&
                      focused && (
                        <HandleSearchResults pickOrDrop={"pickupPoints"} setInternalState={setInternalState} />
                      )}
                    {selectedPickUpPointsReturn?.length > 0 && !internalState[`pickup-search-focus-1`] && (
                      <p className={styles.point_headerr}>Pick Up Points</p>
                    )}
                    {selectedPickUpPointsReturn?.length > 0 && !internalState[`pickup-search-focus-1`] && (
                      <SelectedLists
                        selectedItems={selectedPickUpPointsReturn}
                        index={0}
                        journeyType={1}
                        forBooking={forBooking}
                        fromQuotation={fromQuotation}
                        inTransferComp={inTransferComp}
                      />
                    )}
                    {selectShowInpAfterAdItmPicUpRetrn && selectedPickUpPointsReturn.length !== 0 && (
                      <TextInput
                        title=""
                        icon="location-dot"
                        placeholder="City or Airport"
                        type="text"
                        name="Flyingfrom"
                        onChange={(e) => onChangeHandler(e, 0, 1)}
                        value={selectPickUpInputReturn}
                        onBlur={onBlur}
                        isLoading={loadingPickUpReturn}
                        errorMessage={
                          selectedPickUpPointsReturn.length < 1 &&
                          selectReturnErrorParams.selectedPickUpPointError
                        }
                        noMarginTop={true}
                        forBooking={forBooking}
                        onFocus={e => onFocus({ e, destination: "pickup", index: 1 })}
                        dataid="input_focused"
                        f={String(internalState[`pickup-search-focus-1`])}//bu responsivde asagidaki boslugu goturur (csse bax)

                      />
                    )}
                    {!selectShowAddExtraTextPckUpReturn &&
                      selectPickUpInputReturn?.length > 2 &&
                      selectJourneyType === 1 &&
                      focused && (
                        <HandleSearchResults pickOrDrop={"pickupPoints"} setInternalState={setInternalState} />
                      )}

                    {selectedPickUpPointsReturn.length > 0 &&
                      selectShowAddExtraTextPckUpReturn && (
                        <div
                          className={styles.add_extrafly_div}
                          onClick={() =>
                            handleAddNewInput("pickupPoints", 1, "handleInp")
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
                  <div className={` ${styles.inp_box} ${styles['search-input-container']}`} f={String(internalState[`dropoff-search-focus-1`])} id="drop1">
                    {!fromQuotation ?
                      <div className={styles.popup_header} f={String(internalState[`dropoff-search-focus-1`])}>
                        <i className={`fa-solid fa-xmark ${styles.close_icon}`} onClick={(e) => closeModal({ index: 1, destination: "dropoff" })}></i>
                        <p>From ?</p>
                      </div>
                      : ""}
                    {selectedDropOffPointsReturn?.length === 0 && (
                      <TextInput
                        title={`${(internalState[`dropoff-search-focus-1`]) ? "" : "Drop Off Location"}`}
                        name="Flyingto"
                        icon="location-dot"
                        placeholder="City or Airport"
                        type="text"
                        onChange={(e) => onChangeHandler(e, 1, 1)}
                        value={selectDroppOffInputReturn}
                        onFocus={e => onFocus({ e, destination: "dropoff", index: 1 })}
                        onBlur={onBlur}
                        isLoading={loadingDropOffReturn}
                        forBooking={forBooking}
                        errorMessage={
                          selectedDropOffPointsReturn.length < 1 &&
                          selectReturnErrorParams.selectedPickUpPointError
                        }
                        dataid="input_focused"
                        f={String(internalState[`dropoff-search-focus-1`])}//bu responsivde asagidaki boslugu goturur (csse bax)
                      />
                    )}

                    {selectedDropOffPointsReturn?.length === 0 &&
                      selectDroppOffInputReturn?.length > 2 &&
                      selectJourneyType === 1 &&
                      focused && (
                        <HandleSearchResults pickOrDrop={"dropoffPoints"} setInternalState={setInternalState} />
                      )}
                    {selectedDropOffPointsReturn?.length > 0 && !internalState[`dropoff-search-focus-1`] && (
                      <p className={styles.point_headerr}>Drop Off Points</p>
                    )}
                    {selectedDropOffPointsReturn?.length > 0 && !internalState[`dropoff-search-focus-1`] && (
                      <SelectedLists
                        selectedItems={selectedDropOffPointsReturn}
                        index={1}
                        journeyType={1}
                        inTransferComp={inTransferComp}
                        forBooking={forBooking}
                        fromQuotation={fromQuotation}
                      />
                    )}

                    {selectShowInpAddItemDropOffRtrn && selectedDropOffPointsReturn?.length !== 0 && (
                      <TextInput
                        title=""
                        name="Flyingto"
                        icon="location-dot"
                        placeholder="City or Airport"
                        type="text"
                        onChange={(e) => onChangeHandler(e, 1, 1)}
                        value={selectDroppOffInputReturn}
                        onBlur={onBlur}
                        isLoading={loadingDropOffReturn}
                        errorMessage={
                          selectedDropOffPointsReturn.length < 1 &&
                          selectReturnErrorParams.selectedPickUpPointError
                        }
                        forBooking={forBooking}
                        noMarginTop={true}
                        onFocus={e => onFocus({ e, destination: "dropoff", index: 1 })}
                        dataid="input_focused"
                        f={String(internalState[`dropoff-search-focus-1`])}//bu responsivde asagidaki boslugu goturur (csse bax)

                      />
                    )}
                    {!selectShowAddExtraTextDropOffRtrn &&
                      selectDroppOffInputReturn?.length > 2 &&
                      selectJourneyType === 1 &&
                      focused && (
                        <HandleSearchResults pickOrDrop={"dropoffPoints"} setInternalState={setInternalState} />
                      )}
                    {selectedDropOffPointsReturn?.length > 0 &&
                      selectShowAddExtraTextDropOffRtrn && (
                        <div
                          className={styles.add_extrafly_div}
                          onClick={() =>
                            handleAddNewInput("dropoffPoints", 1, "handleInp")
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
                  <div className={` ${styles.inp_date}`}>
                    <DateInput
                      title={`${selectedPickUpPointsReturn[1]?.pcatId === 1
                        ? "Flight Landing Date"
                        : "Pick Up Date"
                        }`}
                      name="DeparuteDate"
                      type="date"
                      onChange={(e) => onChangeHandler(e, "date", 1)}
                      //here we sending 2022-0422   part of
                      value={selectReturnDateTimeString?.split(" ")[0]}
                      min={dateTimeStringFuncForReturn()?.split(" ")[0]}
                      errorMessage={
                        selectReturnErrorParams.dateTimeForBoolean &&
                        selectReturnErrorParams.selectedTimeError
                      }
                      forBooking={forBooking}
                    />
                    <div className={` ${styles.inp_time}`}>
                      <TimePicker
                        name="hour"
                        title={`${selectedPickUpPointsOneWay[1]?.pcatId === 1
                          ? "Landing Hour"
                          : "Pick Up Hour"
                          }`}
                        className={styles.hour}
                        options={hourss}
                        valueReturnHour={
                          selectReturnDateTimeString
                            ?.split(" ")[1]
                            ?.split(":")[0]
                        }
                        journeyType={1}
                        forBooking={forBooking}
                        errorMessage={
                          selectReturnErrorParams.dateTimeForBoolean
                        }
                      />
                      <TimePicker
                        name="minute"
                        title={`${selectedPickUpPointsOneWay[1]?.pcatId === 1
                          ? "Landing Minute"
                          : "Pick Up Minute"
                          }`}
                        className={styles.minute}
                        options={minutes}
                        valueReturnMinute={
                          selectReturnDateTimeString
                            ?.split(" ")[1]
                            ?.split(":")[1]
                        }
                        journeyType={1}
                        forBooking={forBooking}
                        errorMessage={
                          selectReturnErrorParams.dateTimeForBoolean
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
            }

            {
              <div
                className={`${remainTransferSide && styles.hiddenButtonForTransfer
                  } ${styles.btn_component}`}
              >
                {remainReturnSide ? (
                  selectQuotReturnLoading &&
                    !selectReturnErrorParams.dateTimeForBoolean ? (
                    <LoadBtn />
                  ) : (
                    <BlueBotton
                      title={btnTittle ? btnTittle : "Search Now"}
                      type="submit"
                    />
                  )
                ) : selectBothQuotLoading ? (
                  <LoadBtn />
                ) : (
                  <BlueBotton
                    title={btnTittle ? btnTittle : "Search Now"}
                    type="submit"
                  />
                )}
              </div>
            }
            {/* {params?.quotations?.quotationError?.errorMessage ? <p className={"errorBookedMessage"}>{params.quotations.quotationError.errorMessage}</p> : <></>} */}
            {params?.quotations?.quotationError?.errorMessage  ? <p className={"errorBookedMessage"}>{params.quotations.quotationError.errorMessage}</p> : <></>}




            {!noAlert && (
              <div className={styles.alertOrMessage}>
                {remainReturnSide ? (
                  selectReturnErrorParams.dateTimeForBoolean && (
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
                {/* //remainReturnSide */}
              </div>
            )}
          </form>
        </div>
      ) : (
        <div
          className={`
      ${responsive
              ? stylesFromOneWay.responsive_oneway_tab_content
              : stylesFromOneWay.oneway_tab_content
            }
       ${border === "blue" ? stylesFromOneWay.border_blue : " "}
       ${forBooking ? stylesFromOneWay.forBooking : ""}

       `}
        >
          <form
            className={stylesFromOneWay.form_container}
            onSubmit={handleSubmit}
          >
            {showHeader && (
              <h1 className={stylesFromOneWay.general_box_title}>
                Return Details
              </h1>
            )}

            <div className={stylesFromOneWay.form_flying}>
              <div className={`col_6 ${stylesFromOneWay.inp_box}`}>
                {selectedPickUpPointsReturn.length === 0 && (
                  <TextInput
                    title="Pick Up Point"
                    icon="location-dot"
                    placeholder="City or Airport"
                    type="text"
                    name="Flyingfrom"
                    onChange={(e) => onChangeHandler(e, 0, 1)}
                    value={selectPickUpInputReturn}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    isLoading={loadingPickUpReturn}
                    forBooking={forBooking}
                    errorMessage={
                      selectedPickUpPointsReturn.length < 1 &&
                      selectReturnErrorParams.selectedPickUpPointError
                    }
                  />
                )}

                {selectedPickUpPointsReturn.length === 0 &&
                  selectPickUpInputReturn?.length > 2 &&
                  selectJourneyType === 1 &&
                  focused && (
                    <HandleSearchResults pickOrDrop={"pickupPoints"} />
                  )}
                {selectedPickUpPointsReturn?.length > 0 && (
                  <p className={stylesFromOneWay.point_headerr}>
                    Pick Up Points
                  </p>
                )}
                {selectedPickUpPointsReturn?.length > 0 && (
                  <SelectedLists
                    selectedItems={selectedPickUpPointsReturn}
                    index={0}
                    journeyType={1}
                    forBooking={forBooking}
                    inTransferComp={inTransferComp}
                    fromQuotation={fromQuotation}
                  />
                )}
                {selectShowInpAfterAdItmPicUpRetrn && (
                  <TextInput
                    title=""
                    icon="location-dot"
                    placeholder="City or Airport"
                    type="text"
                    name="Flyingfrom"
                    onChange={(e) => onChangeHandler(e, 0, 1)}
                    value={selectPickUpInputReturn}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    isLoading={loadingPickUpReturn}
                    errorMessage={
                      selectedPickUpPointsReturn.length < 1 &&
                      selectReturnErrorParams.selectedPickUpPointError
                    }
                    noMarginTop={true}
                    forBooking={forBooking}
                  />
                )}
                {!selectShowAddExtraTextPckUpReturn &&
                  selectPickUpInputReturn?.length > 2 &&
                  selectJourneyType === 1 &&
                  focused && (
                    <HandleSearchResults pickOrDrop={"pickupPoints"} />
                  )}

                {selectedPickUpPointsReturn.length > 0 &&
                  selectShowAddExtraTextPckUpReturn && (
                    <div
                      className={stylesFromOneWay.add_extrafly_div}
                      onClick={() =>
                        handleAddNewInput("pickupPoints", 1, "handleInp")
                      }
                    >
                      <i
                        className={`fa-solid fa-plus ${stylesFromOneWay.add_extrafly_div_icon}`}
                      ></i>
                      <p className={stylesFromOneWay.add_extrafly_div_text}>
                        Add Extra Point
                      </p>
                    </div>
                  )}
              </div>

              <div className={`col_6 ${stylesFromOneWay.inp_box}`}>
                {selectedDropOffPointsReturn?.length === 0 && (
                  <TextInput
                    title="Drop Off Location"
                    name="Flyingto"
                    icon="location-dot"
                    placeholder="City or Airport"
                    type="text"
                    onChange={(e) => onChangeHandler(e, 1, 1)}
                    value={selectDroppOffInputReturn}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    isLoading={loadingDropOffReturn}
                    forBooking={forBooking}
                    errorMessage={
                      selectedDropOffPointsReturn.length < 1 &&
                      selectReturnErrorParams.selectedPickUpPointError
                    }
                  />
                )}

                {selectedDropOffPointsReturn?.length === 0 &&
                  selectDroppOffInputReturn?.length > 2 &&
                  selectJourneyType === 1 &&
                  focused && (
                    <HandleSearchResults pickOrDrop={"dropoffPoints"} />
                  )}
                {selectedDropOffPointsReturn?.length > 0 && (
                  <p className={stylesFromOneWay.point_headerr}>
                    Drop Off Points
                  </p>
                )}
                {selectedDropOffPointsReturn?.length > 0 && (
                  <SelectedLists
                    selectedItems={selectedDropOffPointsReturn}
                    index={1}
                    journeyType={1}
                    inTransferComp={inTransferComp}
                    forBooking={forBooking}
                    fromQuotation={fromQuotation}
                  />
                )}

                {selectShowInpAddItemDropOffRtrn && (
                  <TextInput
                    title=""
                    name="Flyingto"
                    icon="location-dot"
                    placeholder="City or Airport"
                    type="text"
                    onChange={(e) => onChangeHandler(e, 1, 1)}
                    value={selectDroppOffInputReturn}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    isLoading={loadingDropOffReturn}
                    errorMessage={
                      selectedDropOffPointsReturn.length < 1 &&
                      selectReturnErrorParams.selectedPickUpPointError
                    }
                    forBooking={forBooking}
                    noMarginTop={true}
                  />
                )}
                {!selectShowAddExtraTextDropOffRtrn &&
                  selectDroppOffInputReturn?.length > 2 &&
                  selectJourneyType === 1 &&
                  focused && (
                    <HandleSearchResults pickOrDrop={"dropoffPoints"} />
                  )}
                {selectedDropOffPointsReturn?.length > 0 &&
                  selectShowAddExtraTextDropOffRtrn && (
                    <div
                      className={stylesFromOneWay.add_extrafly_div}
                      onClick={() =>
                        handleAddNewInput("dropoffPoints", 1, "handleInp")
                      }
                    >
                      <i
                        className={`fa-solid fa-plus ${stylesFromOneWay.add_extrafly_div_icon}`}
                      ></i>
                      <p className={stylesFromOneWay.add_extrafly_div_text}>
                        Add Extra Point
                      </p>
                    </div>
                  )}
              </div>
            </div>
            <div className={stylesFromOneWay.form_departing}>
              <div className={`${stylesFromOneWay.departing_date} coll_6 `}>
                <DateInput
                  title={`${selectedPickUpPointsReturn[1]?.pcatId === 1
                    ? "Flight Landing Date"
                    : "Pick Up Date"
                    }`}
                  name="DeparuteDate"
                  type="date"
                  onChange={(e) => onChangeHandler(e, "date", 1)}
                  //here we sending 2022-0422   part of
                  value={selectReturnDateTimeString?.split(" ")[0]}
                  min={dateTimeStringFuncForReturn()?.split(" ")[0]}
                  errorMessage={
                    selectReturnErrorParams.dateTimeForBoolean &&
                    selectReturnErrorParams.selectedTimeError
                  }
                  forBooking={forBooking}
                />
              </div>
              {/* //? hour and time  clo_lg-3*/}
              <div className={stylesFromOneWay.departing_time}>
                <TimePicker
                  name="hour"
                  title={`${selectedPickUpPointsOneWay[1]?.pcatId === 1
                    ? "Landing Hour"
                    : "Pick Up Hour"
                    }`}
                  className={stylesFromOneWay.hour}
                  options={hourss}
                  valueReturnHour={
                    selectReturnDateTimeString?.split(" ")[1]?.split(":")[0]
                  }
                  journeyType={1}
                  forBooking={forBooking}
                  errorMessage={selectReturnErrorParams.dateTimeForBoolean}
                />
                <TimePicker
                  name="minute"
                  title={`${selectedPickUpPointsOneWay[1]?.pcatId === 1
                    ? "Landing Minute"
                    : "Pick Up Minute"
                    }`}
                  className={stylesFromOneWay.minute}
                  options={minutes}
                  valueReturnMinute={
                    selectReturnDateTimeString?.split(" ")[1]?.split(":")[1]
                  }
                  journeyType={1}
                  forBooking={forBooking}
                  errorMessage={selectReturnErrorParams.dateTimeForBoolean}
                />
              </div>
              <div className={stylesFromOneWay.departing_btn}>
                {remainReturnSide ? (
                  selectQuotReturnLoading &&
                    !selectReturnErrorParams.dateTimeForBoolean ? (
                    <LoadBtn />
                  ) : (
                    <BlueBotton
                      title={btnTittle ? btnTittle : "Search Now"}
                      type="submit"
                    />
                  )
                ) : selectBothQuotLoading ? (
                  <LoadBtn />
                ) : (
                  <BlueBotton
                    title={btnTittle ? btnTittle : "Search Now"}
                    type="submit"
                  />
                )}
                {/*
                {selectQuotReturnLoading &&
                !selectReturnErrorParams.dateTimeForBoolean ? (
                  <LoadBtn />
                ) : (
                  <BlueBotton
                    title={btnTittle ? btnTittle : "Search Now"}
                    type="submit"
                  />
                )} */}
              </div>
            </div>

            {params?.quotations?.quotationError?.errorMessage ? <p className={"errorBookedMessage"}>{params.quotations.quotationError.errorMessage}</p> : <></>}
          </form>
          {!noAlert && (
            <div className={stylesFromOneWay.alertOrMessage}>
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
      )}
    </>
  );
};

export default Return;
