import React from "react";
import "./styles.module.scss";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
const PaymentModal = ({ content }) => {
  const dispatch = useDispatch();
  const setToFalse = () => {
    // setOpenModalInfo(false);
    dispatch({ type: SET_MODAL_INFO, payload: false });
    document.body.style.overflow = "unset";
  };
  return (
    <div className={` ${styles.modal} `}>
      <div className={`${styles.modal_container}`}>
        <p>{content?.length ? content : null}</p>

        <div className={styles.button_div}>
          <button onClick={setToFalse} className="btn_primary">
            Okay
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;
