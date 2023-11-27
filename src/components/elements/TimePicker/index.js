import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  gettingQuotations,
  setHourAndMinute,
} from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import {
  returnDateTimeString,
  selectPickUpDropOffReducer,
  transferDateTimeString,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import styles from "./elgun.module.scss";
/**
 **/
const TimePicker = (props) => {
  let {
    className = "",
    options = [],
    title = "",
    name = "",
    journeyType = "" || boolean || number,
    errorMessage = false,
  } = props;
  //i pass value with ransfer and with return so which one is current passed that one willbe active
  //the same goes to active minute
  const selectTransferDateTimeString = useSelector(transferDateTimeString);
  const { direction } = useSelector(selectPickUpDropOffReducer);
  const selectReturnDateTimeString = useSelector(returnDateTimeString);
  const [dropdownActive, setDropdownActive] = useState(false); //it is for hour
  const [opt, setOpt] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  //it is for transfers

  const [activeHour, setActiveHour] = useState(
    journeyType === 0
      ? selectTransferDateTimeString?.split(" ")[1]?.split(":")[0]
      : selectReturnDateTimeString?.split(" ")[1]?.split(":")[0]
  );
  const [activeMinute, setActiveMinute] = useState(
    journeyType === 0
      ? selectTransferDateTimeString?.split(" ")[1]?.split(":")[1]
      : selectReturnDateTimeString?.split(" ")[1]?.split(":")[1]
  ); //it is for display value inside ul Active

  //when click to hour time picker
  const selectValue = (e, i) => {
    // setIndexOption(i);
    setActiveHour(e.target.innerText);
    setDropdownActive(false);
    setActiveMinute(e.target.innerText);
  };

  useEffect(() => {
    if (journeyType === 0 && name === "hour") {
      dispatch(setHourAndMinute(activeHour, "hourTr"));
    }

    if (journeyType === 0 && name === "minute") {
      dispatch(setHourAndMinute(activeMinute, "minuteTr"));
    }

    if (journeyType === 1 && name === "hour") {
      dispatch(setHourAndMinute(activeHour, "hourReturn"));
    }
    if (journeyType === 1 && name === "minute") {
      dispatch(setHourAndMinute(activeMinute, "minuteReturn"));
    }
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

    setOpt(options);
  }, [activeHour, activeMinute]);
  // console.log(selectTransferDateTimeString?.split(" ")[1]?.split(":")[0]);
  // console.log(Number("00"));

  return (
    //styles.hour  => classname
    <div className={`${className} ${styles.select_box_hour_minute} `}>
      <p className={styles.labelText}>{title}</p>
      <div
        className={styles.dropholder}
        onClick={() => setDropdownActive(!dropdownActive)}
      >
        <div
          className={`${styles.dropdown} ${
            dropdownActive ? styles.DropDownActive : ""
          } ${errorMessage ? styles.errrorDropdown : ""}`}
        >
          <p className={styles.holder}>
            {name === "hour" ? activeHour : activeMinute}
          </p>
        </div>
        <ul className={styles.dropdownOption} name={name}>
          {name === "hour" && opt.length > 0
            ? opt.map((item, i) => {
                return (
                  <li
                    onClick={(e) => selectValue(e, i)}
                    className={`${styles.li} ${
                      Number(activeHour) === Number(item.value)
                        ? styles.current
                        : ""
                    }`}
                    key={item.id}
                    value={item.value}
                    name={name}
                  >
                    {item.value}
                  </li>
                );
              })
            : opt.map((item, i) => {
                return (
                  <li
                    onClick={(e) => selectValue(e, i)}
                    className={`${styles.li} ${
                      Number(activeMinute) === Number(item.value)
                        ? styles.current
                        : ""
                    }`}
                    key={item.id}
                    value={item.value}
                    name={name}
                  >
                    {item.value}
                  </li>
                );
              })}
        </ul>
      </div>
    </div>
  );
};

export default TimePicker;
