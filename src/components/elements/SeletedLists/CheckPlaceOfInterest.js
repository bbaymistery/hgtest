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
const CheckPlaceOfInterest = ({
  inTransferComp,
  item,
  index,
  journeyType,
  whichSelectedItem,
}) => {
  const { appData } = useSelector(selectPickUpDropOffReducer);
  const [placeOfInterest, setPlaceOfInterest] = useState({
    "address-description": "",
  });
  const selectedPickUpPointsOneWay = useSelector(PickUpPointsOneWayCopy);
  const selectedDropOffPointsOneWay = useSelector(DroopOffPointsOneWayCopy);
  const selectedPickUpPointsReturn = useSelector(PickUpPointsReturnCopy);
  const selectedDropOffPointsReturn = useSelector(DropOffPointsReturnCopy);
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
        7,
        item.pcatId
      )
    );
    setPlaceOfInterest((placeOfInterest) => ({
      ...placeOfInterest,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      {/* //pick up tr  */}
      {inTransferComp && item.pcatId === 7 && index === 0 && journeyType === 0 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[7]?.["address-description"].pickup === 2 && (
              <TextInput
                title="Places of Interest"
                type="text"
                name="address-description"
                onChange={(e) => onchangeHandler(e, 0, 0)}
                fromBooking={true}
                icon="id-badge"
                value={
                  placeOfInterest["address-description"]
                    ? placeOfInterest["address-description"]
                    : selectedPickUpPointsOneWay[whichSelectedItem]?.[
                    "address-description"
                    ]
                }
                fromTrDetails={true}
              />
            )}
          </div>
        </div>
      )}
      {/* //drop tr  */}

      {inTransferComp && item.pcatId === 7 && index === 1 && journeyType === 0 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[7]?.["address-description"].dropoff === 2 && (
              <TextInput
                icon="id-badge"
                title="Places of Interest"
                type="text"
                fromBooking={true}
                onChange={(e) => onchangeHandler(e, 1, 0)}
                name="address-description"
                value={
                  placeOfInterest["address-description"]
                    ? placeOfInterest["address-description"]
                    : selectedDropOffPointsOneWay[whichSelectedItem]?.[
                    "address-description"
                    ]
                }
                fromTrDetails={true}
              />
            )}
          </div>
        </div>
      )}

      {inTransferComp && item.pcatId === 7 && index === 0 && journeyType === 1 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[7]?.["address-description"].pickup === 2 && (
              <TextInput
                icon="id-badge"
                fromBooking={true}
                title="Places of Interest"
                type="text"
                name="address-description"
                value={
                  placeOfInterest["address-description"]
                    ? placeOfInterest["address-description"]
                    : selectedPickUpPointsReturn[whichSelectedItem]?.[
                    "address-description"
                    ]
                }
                fromTrDetails={true}
                onChange={(e) => onchangeHandler(e, 0, 1)}
              />
            )}
          </div>
        </div>
      )}
      {inTransferComp && item.pcatId === 7 && index === 1 && journeyType === 1 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[7]?.["address-description"].dropoff === 2 && (
              <TextInput
                icon="id-badge"
                title="Places of Interest"
                type="text"
                fromBooking={true}
                name="address-description"
                value={
                  placeOfInterest["address-description"]
                    ? placeOfInterest["address-description"]
                    : selectedDropOffPointsReturn[whichSelectedItem]?.[
                    "address-description"
                    ]
                }
                fromTrDetails={true}
                onChange={(e) => onchangeHandler(e, 1, 1)}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CheckPlaceOfInterest;
