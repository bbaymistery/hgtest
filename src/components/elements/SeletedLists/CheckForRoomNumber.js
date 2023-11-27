import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTransferDetailsInput } from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import {
  DroopOffPointsOneWayCopy,
  DropOffPointsReturnCopy,
  PickUpPointsOneWayCopy,
  PickUpPointsReturnCopy,
  selectPickUpDropOffReducer,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import TextInput from "../TextInput";
import styles from "./styles.module.scss";
//bura propslar selected listeden geir
const CheckForCruises = ({
  inTransferComp,
  item,
  index,
  journeyType,
  whichSelectedItem,
}) => {
  const { appData, trDetailsPageError } = useSelector(
    selectPickUpDropOffReducer
  );

  const selectedPickUpPointsOneWay = useSelector(PickUpPointsOneWayCopy);
  const selectedDropOffPointsOneWay = useSelector(DroopOffPointsOneWayCopy);
  const selectedPickUpPointsReturn = useSelector(PickUpPointsReturnCopy);
  const selectedDropOffPointsReturn = useSelector(DropOffPointsReturnCopy);

  const [roomNumber, setRoomNumber] = useState({
    roomNumber: "",
  });
  const dispatch = useDispatch();
  const objectDetailStatuses = appData?.pointTypeCategories?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: JSON.parse(item.detailsStatus),
    }),
    []
  );
  const onchangeHandler = (e, pickUpOrDropOff, journeyType) => {
    let inpValue = e.target.value
    if (inpValue.includes('"') || inpValue.includes(`'`) || inpValue.includes('/') || inpValue.includes('\\')) {
      return
    }
    dispatch(
      updateTransferDetailsInput(
        e.target.value,
        pickUpOrDropOff,
        journeyType,
        e.target.name,
        whichSelectedItem,
        4,
        item.pcatId
      )
    );
    setRoomNumber((roomNumber) => ({
      ...roomNumber,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* //!checking for room number  pickups transfer */}
      {/* {inTransferComp && item.pcatId === 4 && index === 0 && journeyType === 0 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[4]?.roomNumber.pickup === 1 && (
              <TextInput
                icon="hotel"
                title="Adress Description"
                // roomNumber mi olucak
                type="text"
                name="roomNumber"
                value={
                  roomNumber.roomNumber
                    ? roomNumber.roomNumber
                    : selectedPickUpPointsOneWay[whichSelectedItem]?.roomNumber
                }
                fromTrDetails={true}
                errorMessage={
                  trDetailsPageError
                    ? roomNumber.roomNumber.length < 1 &&
                      selectedPickUpPointsOneWay[whichSelectedItem]
                        ?.errorMessage
                    : ""
                }
                fromBooking={true}
                onChange={(e) => onchangeHandler(e, 0, 0)}
              />
            )}
          </div>
        </div>
      )} */}

      {/* //!checking for roomNumber dropOff  transfer */}
      {/* {inTransferComp && item.pcatId === 4 && index === 1 && journeyType === 0 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[4]?.roomNumber.dropoff === 2 && (
              <TextInput
                icon="hotel"
                title="Adress Description"
                type="text"
                name="roomNumber"
                value={
                  roomNumber.roomNumber
                    ? roomNumber.roomNumber
                    : selectedDropOffPointsOneWay[whichSelectedItem]?.roomNumber
                }
                fromTrDetails={true}
                onChange={(e) => onchangeHandler(e, 1, 0)}
              />
            )}
          </div>
        </div>
      )} */}

      {/* //!checking for roomnumber pickups return */}
      {/* {inTransferComp && item.pcatId === 4 && index === 0 && journeyType === 1 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[4]?.roomNumber.pickup === 1 && (
              <TextInput
                icon="hotel"
                title="Adress Description"
                type="text"
                name="roomNumber"
                value={
                  roomNumber.roomNumber
                    ? roomNumber.roomNumber
                    : selectedPickUpPointsReturn[whichSelectedItem]?.roomNumber
                }
                onChange={(e) => onchangeHandler(e, 0, 1)}
                errorMessage={
                  trDetailsPageError
                    ? roomNumber.roomNumber.length < 1 &&
                      selectedPickUpPointsReturn[whichSelectedItem]
                        ?.errorMessage
                    : ""
                }
                fromTrDetails={true}
              />
            )}
          </div>
        </div>
      )} */}
      {/* //!checking for roomnumber dropoff return */}
      {/* {inTransferComp && item.pcatId === 4 && index === 1 && journeyType === 1 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[4]?.roomNumber.dropoff === 2 && (
              <TextInput
                icon="hotel"
                title="Adress Description"
                type="text"
                name="roomNumber"
                value={
                  roomNumber.roomNumber
                    ? roomNumber.roomNumber
                    : selectedDropOffPointsReturn[whichSelectedItem]?.roomNumber
                }
                onChange={(e) => onchangeHandler(e, 1, 1)}
                fromTrDetails={true}
              />
            )}
          </div>
        </div>
      )} */}
    </>
  );
};

export default CheckForCruises;
