import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "../Select";
import TextInput from "../TextInput";
import { updatePassDetailsForBothJourney } from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import {
  paxReturn,
  paxTransfer,
  selectPickUpDropOffReducer,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";

import styles from "./styles.module.scss";
const PassengerDetails = ({
  title,
  journeyType,
  fullname,
  email,
  phone,
  passErrors,
  quot,
}) => {
  const dispatch = useDispatch();
  const { appData } = useSelector(selectPickUpDropOffReducer);
  const selectPaxTransfer = useSelector(paxTransfer);
  const selectPaxReturn = useSelector(paxReturn);
  //bunu sadece imgni getirmek ucun yazdg Secilen cardn img si
  const carObject = appData?.carsTypes?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item,
    }),
    {}
  );
  const onchangeHandler = (e) => {
    let inpValue = e.target.value
    if (inpValue.includes('"') || inpValue.includes(`'`) || inpValue.includes('/') || inpValue.includes('\\')) {
      return
    }
    dispatch(
      updatePassDetailsForBothJourney(
        e.target.name === "passengersNumber"
          ? Number(e.target.value)
          : e.target.value,
        e.target.name,
        journeyType,
        e.target.name === "passengersNumber" ? true : false
      )
    );
  };

  return (
    <div className={styles.passenger_details}>
      <div className={styles.passenger_details_title}>
        <h3>{title}</h3>
      </div>

      <div className={styles.inp_boxes}>
        <div className={`${styles.inp_box}`}>
          <TextInput
            title="Full Name"
            icon="user"
            placeholder="Full Name * "
            type="text"
            name="firstname"
            onChange={onchangeHandler}
            value={fullname}
            from_Tr_with_padding={true}
            errorMessage={fullname?.length < 1 && passErrors?.fullnameError}
          />
        </div>
        <div className={`${styles.inp_box}`}>
          <TextInput
            title="Email"
            icon="at"
            placeholder="Email * "
            type="text"
            name="email"
            onChange={onchangeHandler}
            value={email}
            errorMessage={
              !email.includes("@") ||
                email.includes(' ')
                ? passErrors?.emailError
                : ""
            }
            /*
             emailTransfer.includes("@") &&
      !emailTransfer.includes(' ') &&
            */
            from_Tr_with_padding={true}
          />
        </div>
      </div>
      <div className={styles.inp_boxes}>
        {carObject && (
          <div className={`${styles.inp_box}`}>
            {
              <Select
                title="Number of passengers"
                icon="users"
                placeholder="Select Pax"
                data={quot ? carObject[quot?.carId]?.pax : ""}
                onChange={onchangeHandler}
                value={journeyType === 0 ? selectPaxTransfer : selectPaxReturn}
                name="passengersNumber"
                from_Tr_with_padding={true}
              />
            }
          </div>
        )}
        <div className={`${styles.inp_box}`}>
          <TextInput
            title="Phone Number"
            icon="phone"
            placeholder="Phone Number * "
            type="number"
            name="phone"
            onChange={onchangeHandler}
            value={phone}
            errorMessage={phone?.length < 1 && passErrors?.pgoneError}
            from_Tr_with_padding={true}
          />
          <p className={styles.subtitle}>* with international dialling code</p>
        </div>
      </div>
    </div>
  );
};

export default PassengerDetails;
