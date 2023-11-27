import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { waitingMinutes } from "../../../constants/transferDetails";
import { updateTransferDetailsInput } from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import {
  DroopOffPointsOneWayCopy,
  DropOffPointsReturnCopy,
  PickUpPointsOneWayCopy,
  PickUpPointsReturnCopy,
  PointsOnewayCheckforFligh,
  PointsReturnCheckforFligh,
  selectPickUpDropOffReducer,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import Select from "../Select";
import TextInput from "../TextInput";
import styles from "./styles.module.scss";
//bura propslar selected listeden geir
const CheckForFlight = ({
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

  // const selectPointsOnewayCheckforFlight = useSelector(PointsOnewayCheckforFligh)
  // const selectPointsReturnCheckforFlight = useSelector(PointsReturnCheckforFligh)
  const [flightDetails, setFlightDetails] = useState({
    flightNumber: "",
    waitingPickupTime: "",
  });

  // const [indexSelected, setIndexSelected] = useState(0);
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

    let sendedValue
    if (e.target.value.length && e.target.name === "waitingPickupTime") {
      sendedValue = Number(e.target.value.split(" ")[0])
    } else {
      sendedValue = e.target.value
    }
    dispatch(
      updateTransferDetailsInput(
        sendedValue,
        pickUpOrDropOff,
        journeyType,
        e.target.name,
        whichSelectedItem,
        1
      )
    );
    setFlightDetails((flightDetails) => ({
      ...flightDetails,
      [e.target.name]:
        e.target.name === "waitingPickupTime"
          ? Number(e.target.value.split(" ")[0])
          : e.target.value,
    }));
  };




  return (
    <>
      {/* //!checking for flight pickups transfer */}
      {inTransferComp && item.pcatId === 1 && index === 0 && journeyType === 0 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[1]?.flightDetails.flightNumber.pickup ===
              1 && (
                <TextInput
                  title="Flight No"
                  icon="plane-departure"
                  type="text"
                  name="flightNumber"
                  //degerleri direk store da tutmadigimizdan client geri gayidanda storda olan degerleri yazdiririq
                  value={
                    flightDetails.flightNumber
                      ? flightDetails.flightNumber
                      : selectedPickUpPointsOneWay[whichSelectedItem]
                        ?.flightDetails?.flightNumber
                  }
                  fromTrDetails={true}
                  errorMessage={
                    trDetailsPageError
                      ? flightDetails.flightNumber.length < 1 &&
                      selectedPickUpPointsOneWay[whichSelectedItem]
                        ?.errorMessage
                      : ""
                  }
                  onChange={(e) => onchangeHandler(e, 0, 0)}
                  fromBooking={true}
                />
              )}
            {objectDetailStatuses[1]?.flightDetails?.waitingPickupTime
              .pickup === 1 && (
                <Select
                  icon="plane-arrival"
                  title="When should the driver pick you up?"
                  data={waitingMinutes}
                  name="waitingPickupTime"
                  onChange={(e) => onchangeHandler(e, 0, 0)}
                  fromTrDetails={true}
                  //     flightDetails.flightNumber
                  // ? flightDetails.flightNumber
                  // : selectedPickUpPointsOneWay[whichSelectedItem]
                  //   ?.flightDetails?.flightNumber
                  errorMessage={
                    trDetailsPageError
                      ? selectedPickUpPointsOneWay[whichSelectedItem]?.waitingTime.length < 1 &&
                      "required"
                      : ""
                  }
                  defaultValue={`${selectedPickUpPointsOneWay[whichSelectedItem]?.waitingTime ?
                    selectedPickUpPointsOneWay[whichSelectedItem]?.waitingTime :
                    "--select--"}`
                  }
                  value={
                    `
                      ${flightDetails?.waitingPickupTime
                      ? `${flightDetails?.waitingPickupTime} minute${+flightDetails?.waitingPickupTime === 0 ? '' : 's'} after flight has landed`
                      : `${selectedPickUpPointsOneWay[whichSelectedItem]?.waitingTime} minute${+selectedPickUpPointsOneWay[whichSelectedItem]?.waitingTime === 0 ? '' : 's'} after flight has landed`}
                      `
                  }
                  infoForFlight={true}
                  fromBooking={true}
                  forFlight={true}

                  placeholder="--select--"
                />
              )}
          </div>
        </div>
      )}

      {/* //!checking for flight dropOff  transfer */}
      {inTransferComp && item.pcatId === 1 && index === 1 && journeyType === 0 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[1]?.flightDetails.flightNumber.dropoff ===
              2 && (
                <TextInput
                  title="Flight No "
                  icon="plane-departure"
                  type="text"
                  name="flightNumber"
                  value={
                    flightDetails.flightNumber
                      ? flightDetails.flightNumber
                      : selectedDropOffPointsOneWay[whichSelectedItem]
                        ?.flightDetails?.flightNumber
                  }
                  onChange={(e) => onchangeHandler(e, 1, 0)}
                  fromTrDetails={true}
                  fromBooking={true}
                />
              )}
          </div>
        </div>
      )}

      {/* //!checking for flight pickups return */}
      {inTransferComp && item.pcatId === 1 && index === 0 && journeyType === 1 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[1]?.flightDetails.flightNumber.pickup ===
              1 && (
                <TextInput
                  title="Flight No"
                  icon="plane-departure"
                  type="text"
                  name="flightNumber"
                  onChange={(e) => onchangeHandler(e, 0, 1)}
                  value={
                    flightDetails.flightNumber
                      ? flightDetails.flightNumber
                      : selectedPickUpPointsReturn[whichSelectedItem]
                        ?.flightDetails?.flightNumber
                  }
                  errorMessage={
                    trDetailsPageError
                      ? flightDetails.flightNumber.length < 1 &&
                      selectedPickUpPointsReturn[whichSelectedItem]
                        ?.errorMessage
                      : ""
                  }
                  fromTrDetails={true}
                  fromBooking={true}
                />
              )}
            {objectDetailStatuses[1]?.flightDetails?.waitingPickupTime
              .pickup === 1 && (
                <Select
                  icon="plane-arrival"
                  data={waitingMinutes}
                  name="waitingPickupTime"
                  errorMessageIsMandatory={true}
                  title="When should the driver pick you up?"
                  onChange={(e) => onchangeHandler(e, 0, 1)}
                  fromTrDetails={true}

                  infoForFlight={true}
                  fromBooking={true}
                  errorMessage={
                    trDetailsPageError
                      ? selectedPickUpPointsReturn[whichSelectedItem]?.waitingTime.length < 1 &&
                      "required"
                      : ""
                  }
                  forFlight={true}
                  defaultValue={`${selectedPickUpPointsReturn[whichSelectedItem]?.waitingTime ?
                    selectedPickUpPointsReturn[whichSelectedItem]?.waitingTime :
                    "--select--"}`
                  }
                  value={
                    `
                      ${flightDetails?.waitingPickupTime
                      ? `${flightDetails?.waitingPickupTime} minute${+flightDetails?.waitingPickupTime === 0 ? '' : 's'} after flight has landed`
                      : `${selectedPickUpPointsReturn[whichSelectedItem]?.waitingTime} minute${+selectedPickUpPointsReturn[whichSelectedItem]?.waitingTime === 0 ? '' : 's'} after flight has landed`}
                      `
                  }
                  placeholder="--select--"
                />
              )}
          </div>
        </div>
      )}
      {/* //!checking for flight dropoff return */}
      {inTransferComp && item.pcatId === 1 && index === 1 && journeyType === 1 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[1]?.flightDetails.flightNumber.dropoff ===
              2 && (
                <TextInput
                  title="Flight No"
                  icon="plane-departure"
                  type="text"
                  name="flightNumber"
                  onChange={(e) => onchangeHandler(e, 1, 1)}
                  value={
                    flightDetails.flightNumber
                      ? flightDetails.flightNumber
                      : selectedDropOffPointsReturn[whichSelectedItem]
                        ?.flightDetails?.flightNumber
                  }
                  errorMessageIsMandatory={false}
                  fromTrDetails={true}
                />
              )}

            {objectDetailStatuses[1]?.flightDetails?.waitingPickupTime
              .droppoff === 2 && (
                <Select
                  icon="plane-arrival"
                  title="When should the driver dropp you off?"
                  data={waitingMinutes}
                  errorMessageIsMandatory={true}
                  onChange={(e) => onchangeHandler(e, 1, 1)}
                  fromTrDetails={true}
                  value={
                    flightDetails.waitingPickupTime > 0
                      ? flightDetails.waitingPickupTime
                      : `${selectedDropOffPointsReturn[whichSelectedItem]?.flightDetails?.waitingPickupTime} minutes`
                  }
                />
              )}
          </div>
        </div>
      )}
    </>
  );
};

export default CheckForFlight;
