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
  const [cruiseNumber, setCruiseNumber] = useState({
    cruiseNumber: "",
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
    // console.log(waitingMinutes[e.target.selectedIndex].value);
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
        2,
        item.pcatId
      )
    );
    setCruiseNumber((cruiseNumber) => ({
      ...cruiseNumber,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* //!checking for cruises pickups transfer */}
      {inTransferComp && item.pcatId === 2 && index === 0 && journeyType === 0 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[2]?.cruiseNumber.pickup === 1 && (
              <TextInput
                icon="ship"
                title="Cruise Name"
                type="text"
                name="cruiseNumber"
                value={
                  cruiseNumber.cruiseNumber
                    ? cruiseNumber.cruiseNumber
                    : selectedPickUpPointsOneWay[whichSelectedItem]
                      ?.cruiseNumber
                }
                fromTrDetails={true}
                errorMessage={
                  trDetailsPageError
                    ? cruiseNumber.cruiseNumber.length < 1 &&
                    selectedPickUpPointsOneWay[whichSelectedItem]
                      ?.errorMessage
                    : ""
                }
                onChange={(e) => onchangeHandler(e, 0, 0)}
                fromBooking={true}
              />
            )}
          </div>
        </div>
      )}

      {/* //!checking for cruisess dropOff  transfer */}
      {inTransferComp && item.pcatId === 2 && index === 1 && journeyType === 0 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[2]?.cruiseNumber.dropoff === 2 && (
              <TextInput
                icon="ship"
                title="Cruise Name"
                type="text"
                name="cruiseNumber"
                value={
                  cruiseNumber.cruiseNumber
                    ? cruiseNumber.cruiseNumber
                    : selectedDropOffPointsOneWay[whichSelectedItem]
                      ?.cruiseNumber
                }
                fromTrDetails={true}
                onChange={(e) => onchangeHandler(e, 1, 0)}
                fromBooking={true}
              />
            )}
          </div>
        </div>
      )}

      {/* //!checking for cruises pickups return */}
      {inTransferComp && item.pcatId === 2 && index === 0 && journeyType === 1 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input} id="sss">
            {objectDetailStatuses[2]?.cruiseNumber.pickup === 1 && (
              <TextInput
                icon="ship"
                title="Cruise Name"
                type="text"
                name="cruiseNumber"
                value={
                  cruiseNumber.cruiseNumber
                    ? cruiseNumber.cruiseNumber
                    : selectedPickUpPointsReturn[whichSelectedItem]
                      ?.cruiseNumber
                }
                onChange={(e) => onchangeHandler(e, 0, 1)}
                errorMessage={
                  trDetailsPageError
                    ? cruiseNumber.cruiseNumber.length < 1 &&
                    selectedPickUpPointsReturn[whichSelectedItem]
                      ?.errorMessage
                    : ""
                }
                fromTrDetails={true}
              />
            )}
          </div>
        </div>
      )}
      {/* //!checking for cruises dropoff return */}
      {inTransferComp && item.pcatId === 2 && index === 1 && journeyType === 1 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[2]?.cruiseNumber.dropoff === 2 && (
              <TextInput
                icon="ship"
                title="Cruise Name"
                type="text"
                name="cruiseNumber"
                value={
                  cruiseNumber.cruiseNumber
                    ? cruiseNumber.cruiseNumber
                    : selectedDropOffPointsReturn[whichSelectedItem]
                      ?.cruiseNumber
                }
                //
                onChange={(e) => onchangeHandler(e, 1, 1)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CheckForCruises;
