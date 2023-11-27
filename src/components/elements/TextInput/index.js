import React from "react";
import styles from "./elgun.module.scss";
import TextError from "../TextError";
import Loading from "../Loading";
/**
 * @TextInput { //? value , onChange:function,onFocus:function,onBlur:function, name, title:string, icon:string,placeholder:string,type:string ,errorMessage:string,isLoading:boolean || string,fromTrDetails:boolean,noErrorMessage:boolean,from_Tr_with_padding:boolean,noMarginTop:boolean,labelWhite:boolean,readOnly:boolean
 * }
 **/
function TextInput(props) {
  let {
    value = "",
    onChange = (e) => { },
    onFocus = (e) => { },
    onBlur = (e) => { },
    name = "",
    title = "",
    icon = "",
    placeholder = "",
    type = "",
    errorMessage = "",
    isLoading = false,
    fromTrDetails = false,
    noErrorMessage,
    from_Tr_with_padding = false,
    noMarginTop = false,
    readOnly = false,
    fromBooking = false,
    dataid = ""
    ,
    f = false//bu responsivde asagidaki boslugu goturur (csse bax
  } = props;

  return (
    <div
      className={`${styles.form_control} ${fromTrDetails && styles.tr_details
        }  ${from_Tr_with_padding && styles.tr_details_withpadding}
       ${noMarginTop && styles.noMargin}
      ${fromBooking && styles.fromBooking}
      `}
      f={f}
    >
      {!noErrorMessage && (
        <div
          className={`${styles.header} ${fromTrDetails && styles.marginTop}`}
        >
          <label className={`${styles.form_label}`} htmlFor={title}>
            {title}
          </label>{" "}
          {errorMessage && <TextError errorMessage={errorMessage} />}
        </div>
      )}
      <div className={`${styles.input_div} `}>
        <i className={`${styles.form_icon} fa-solid fa-${icon}`}></i>
        <input
          autoComplete="off"
          autoCapitalize={`${name === "email" ? "off" : "on"}`}
          placeholder={placeholder}
          name={name}
          id={title}
          className={`${styles.input} ${errorMessage ? styles.errorInput : ""}`}
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          type={type}
          value={value}
          readOnly={readOnly}
          dataid={dataid}
        />
        {isLoading && <Loading />}
      </div>
    </div>
  );
}
// example
export default TextInput;
