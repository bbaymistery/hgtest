import React from "react";
import styles from "./styles.module.scss";
/**
 * @TextInput { //? value:string, onChange:function,onFocus:function,onBlur:function, name, title:string, icon:string, className:string,fromTrDetails:boolean, placeholder:string,pl:boolean,errorMessage:string}
 **/
const TextArea = (props) => {
  let {
    value = "",
    onChange = (e) => {},
    name,
    icon,
    placeholder,
    errorMessage = "",
    fromTrDetails = false,
    title = "",
    pl = false,
    fromBooking = false,
  } = props;

  return (
    <div
      className={`${styles.form_control} ${fromTrDetails && styles.tr_details}
      ${fromBooking && styles.fromBooking}
      `}
    >
      <div className={styles.top}>
        <p className={`${styles.title} ${pl && styles.pl}  `}>
          {title && title}
        </p>
        <p className={styles.error}>{errorMessage && errorMessage}</p>
      </div>
      <div className={styles.bottom}>
        <i className={`${styles.form_icon} fa-solid fa-${icon}`}></i>
        <textarea
          placeholder={placeholder}
          onChange={onChange}
          name={name}
          className={`${styles.textarea} ${
            errorMessage && styles.error_textarear
          }`}
          id=""
          value={value}
        ></textarea>
      </div>
    </div>
  );
};

export default TextArea;
