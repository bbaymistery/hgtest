import React from "react";
import { useDispatch } from "react-redux";
import { SET_MODAL_INFO } from "../../../store/pickUpDropOffReducer/pickUpDropTypes";
import styles from "./styles.module.scss";
/**
 * @TextInput { //? value:string , onChange:function,onFocus:function,onBlur:function, name, title:string, icon:string, className:string, placeholder:string,type:string ,errorMessage:string,isLoading:boolean,default:boolean,fromTrDetails:boolean,from_Tr_with_padding:boolean,readOnly:boolean,labelWhite:boolean,infoForFlight:boolean}
 **/
const Select = (props) => {
  let {
    value,
    onChange = (e) => { },
    name,
    title = "",
    icon,
    placeholder,
    errorMessage = "",
    data,
    fromTrDetails = false,
    from_Tr_with_padding = false,
    readOnly = false,
    forBooking = false,
    defaultValue,
    infoForFlight = false,
    fromBooking = false,
    forFlight = false
  } = props;

  const dispacth = useDispatch();
  const setModal = () => {
    // console.log("ss");

    dispacth({ type: SET_MODAL_INFO, payload: true });
  };
  console.log({ value, defaultValue });


  return (
    <div
      className={`${styles.form_control} ${fromTrDetails && styles.tr_details
        } ${from_Tr_with_padding && styles.tr_details_withpadding}
      ${fromBooking && styles.fromBooking}
      `}
    >
      <p className={`${styles.form_label} ${forBooking && styles.labelWhite}`}>
        {title}

        {infoForFlight && (
          <i onClick={setModal} className="fa-solid fa-circle-info"></i>
        )}


        {errorMessage ? <span>required</span> : ""}
      </p>{" "}
      <div className={`${styles.select_div} ${errorMessage ? "error_borderr" : ""}`} >
        <i className={`${styles.form_icon} fa-solid fa-${icon}`}></i>
        {<i className={`${styles.form_icon_arrow} fa-solid fa-angle-down`}></i>}
        <select
          name={name}
          onChange={onChange}
          className={`${styles.select} ${errorMessage ? styles.error_select : ""
            }
          `}
          defaultValue={forFlight ? value?.trim() : value}
          disabled={readOnly}
        >
          {defaultValue && (
            <option value="" id={0}>
              {placeholder}
            </option>
          )}
          {Number(data)
            ? Array(data)
              .fill()
              .map((x, i) => {
                return (
                  <option key={i} value={i + 1}>
                    {`${i + 1}`}
                  </option>
                );
              })
            : data?.map((d, i) => {
              return (
                <option key={i} value={d.value} id={d?.id && d?.id} selected={forFlight ? Number(defaultValue) === Number(d?.value?.split(" ")[0]) : value === +d?.id}>
                  {d.value}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default Select;
