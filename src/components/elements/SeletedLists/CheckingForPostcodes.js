import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTransferDetailsInput } from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import {
  DroopOffPointsOneWayCopy,
  DropOffPointsReturnCopy,
  PickUpPointsOneWayCopy,
  PickUpPointsReturnCopy,
  selectPickUpDropOffReducer,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import Select from "../Select";
import TextArea from "../TextArea";
import styles from "./styles.module.scss";
const CheckingForPostcodes = ({
  inTransferComp,
  item,
  index,
  journeyType,
  whichSelectedItem,
}) => {
  const { appData, trDetailsPageError, postCodeAdresses } = useSelector(
    selectPickUpDropOffReducer
  );

  const [postCodes, setPostCodes] = useState([]);
  const selectedPickUpPointsOneWay = useSelector(PickUpPointsOneWayCopy);
  const selectedDropOffPointsOneWay = useSelector(DroopOffPointsOneWayCopy);
  const selectedPickUpPointsReturn = useSelector(PickUpPointsReturnCopy);
  const selectedDropOffPointsReturn = useSelector(DropOffPointsReturnCopy);
  const [postCodeDetails, setPostCodeDetails] = useState({
    id: 0,
    postCodeAddress: "",
  });
  const dispatch = useDispatch();
  const objectDetailStatuses = appData?.pointTypeCategories?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: JSON.parse(item.detailsStatus),
    }),
    []
  );

  //   console.log(objectDetailStatuses);
  const onchangeHandler = (e, pickUpOrDropOff, journeyType) => {
    let inpValue = e.target.value
    if (inpValue.includes('"') || inpValue.includes(`'`) || inpValue.includes('/') || inpValue.includes('\\')) {
      return
    }
    dispatch(
      updateTransferDetailsInput(
        e?.target?.name === "id"
          ? Number(
            e?.target?.options[e?.target?.selectedIndex].getAttribute("id")
          )
          : 0,
        pickUpOrDropOff,
        journeyType,
        e?.target?.name === "postCodeAddress"
          ? e?.target.value
          : e?.target?.options[e?.target?.selectedIndex]?.value,
        whichSelectedItem,
        5
      )
    );

    let id =
      e?.target?.name === "id"
        ? Number(
          e?.target?.options[e?.target?.selectedIndex].getAttribute("id")
        )
        : 0;
    setPostCodeDetails((postCodeDetails) => ({
      ...postCodeDetails,
      id,
      postCodeAddress:
        e?.target?.name === "postCodeAddress"
          ? e?.target.value
          : e?.target?.options[e?.target?.selectedIndex]?.value,
    }));
  };

  useEffect(() => {
    let postcodes = postCodeAdresses.filter(
      (codes) => item.postcode === codes.postcode && codes.addresses
    );
    setPostCodes(postcodes[0]?.addresses);
  }, [item, objectDetailStatuses]);
  if (postCodeDetails.id){
    console.log("zero");
    console.log(postCodeDetails);
    
  }

  return (
    <>
      {/* //!checking for postcode pickups transfer */}
      {inTransferComp && item.pcatId === 5 && index === 0 && journeyType === 0 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[5]?.postCodeDetails?.id.pickup === 1 && (
              <Select
                icon="thumbtack"
                placeholder="add a new adress if not listed "
                data={postCodes?.length > 0 ? postCodes : postCodes}
                name="id"
                onChange={(e) => onchangeHandler(e, 0, 0)}
                defaultValue={true}
                value={
                  postCodeDetails.id
                    ? postCodeDetails.id
                    : selectedPickUpPointsOneWay[whichSelectedItem]
                      ?.postCodeDetails?.id
                }
                fromTrDetails={true}
                fromBooking={true}
                title="Postcode Address"
              />
            )}

            {selectedPickUpPointsOneWay[whichSelectedItem]
              ?.postCodeDetails?.id === 0
              ? objectDetailStatuses[5]?.postCodeDetails?.postCodeAddress
                .pickup === 1 && (
                <TextArea
                  fromTrDetails={true}
                  title="Adress Description *"
                  name="postCodeAddress"
                  icon="id-badge"
                  onChange={(e) => onchangeHandler(e, 0, 0)}
                  value={
                    postCodeDetails.postCodeAddress
                      ? postCodeDetails.postCodeAddress
                      : selectedPickUpPointsOneWay[whichSelectedItem]
                        ?.postCodeDetails?.postCodeAddress
                  }
                  errorMessage={
                    trDetailsPageError
                      ? postCodeDetails?.postCodeAddress?.length < 1 &&
                      selectedPickUpPointsOneWay[whichSelectedItem]
                        ?.errorMessage
                      : ""
                  }
                  defaultValue={true}
                  fromBooking={true}
                />
              )
              : null}
          </div>
        </div>
      )}

      {/* //!checking for flight drop transfer */}

      {inTransferComp && item.pcatId === 5 && index === 1 && journeyType === 0 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[5]?.postCodeDetails?.id.dropoff === 1 && (
              <Select
                icon="thumbtack"
                placeholder="add a new adress if not listed "
                data={postCodes?.length > 0 ? postCodes : postCodes}
                name="id"
                onChange={(e) => onchangeHandler(e, 1, 0)}
                defaultValue={true}
                value={
                  postCodeDetails.id
                    ? postCodeDetails.id
                    : selectedDropOffPointsOneWay[whichSelectedItem]
                      ?.postCodeDetails?.id
                }
                fromTrDetails={true}
                title="Postcode Address"
                fromBooking={true}
              />
            )}
            {selectedDropOffPointsOneWay[whichSelectedItem]
              ?.postCodeDetails?.id === 0
              ? objectDetailStatuses[5]?.postCodeDetails?.postCodeAddress
                .dropoff === 1 && (
                <TextArea
                  fromTrDetails={true}
                  title="Adress Description"
                  name="postCodeAddress"
                  fromBooking={true}
                  icon="id-badge"
                  onChange={(e) => onchangeHandler(e, 1, 0)}
                  value={
                    postCodeDetails.postCodeAddress
                      ? postCodeDetails.postCodeAddress
                      : selectedDropOffPointsOneWay[whichSelectedItem]
                        ?.postCodeDetails?.postCodeAddress
                  }
                  errorMessage={
                    trDetailsPageError
                      ? postCodeDetails?.postCodeAddress?.length < 1 &&
                      selectedDropOffPointsOneWay[whichSelectedItem]
                        ?.errorMessage
                      : ""
                  }
                  defaultValue={true}
                />
              )
              : null}
          </div>
        </div>
      )}

      {/* //!checking for flight pick  return */}
      {inTransferComp && item.pcatId === 5 && index === 0 && journeyType === 1 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[5]?.postCodeDetails?.id.pickup === 1 && (
              <Select
                icon="thumbtack"
                placeholder="add a new adress if not listed "
                data={postCodes?.length > 0 ? postCodes : postCodes}
                name="id"
                onChange={(e) => onchangeHandler(e, 0, 1)}
                defaultValue={true}
                value={
                  postCodeDetails.id
                    ? postCodeDetails.id
                    : selectedPickUpPointsReturn[whichSelectedItem]
                      ?.postCodeDetails?.id
                }
                fromTrDetails={true}
                title="Postcode Address"
              />
            )}
            {selectedPickUpPointsReturn[whichSelectedItem]
              ?.postCodeDetails?.id === 0
              ? objectDetailStatuses[5]?.postCodeDetails?.postCodeAddress
                .pickup === 1 && (
                <TextArea
                  fromTrDetails={true}
                  title="Adress Description"
                  name="postCodeAddress"
                  icon="id-badge"
                  onChange={(e) => onchangeHandler(e, 0, 1)}
                  value={
                    postCodeDetails.postCodeAddress
                      ? postCodeDetails.postCodeAddress
                      : selectedPickUpPointsReturn[whichSelectedItem]
                        ?.postCodeDetails?.postCodeAddress
                  }
                  errorMessage={
                    trDetailsPageError
                      ? postCodeDetails?.postCodeAddress?.length < 1 &&
                      selectedPickUpPointsReturn[whichSelectedItem]
                        ?.errorMessage
                      : ""
                  }
                  placeholder="add a new adress if not listed "
                  defaultValue={true}
                />
              )
              : //
              null}
          </div>
        </div>
      )}

      {/* //!checking for flight dropoff return */}
      {inTransferComp && item.pcatId === 5 && index === 1 && journeyType === 1 && (
        <div className={styles.insideInputs}>
          <div className={styles.insideInputs_input}>
            {objectDetailStatuses[5]?.postCodeDetails?.id.dropoff === 1 && (
              <Select
                icon="plane-arrival"
                placeholder="add a new adress if not listed "
                data={postCodes?.length > 0 ? postCodes : postCodes}
                name="id"
                onChange={(e) => onchangeHandler(e, 1, 1)}
                defaultValue={true}
                value={
                  postCodeDetails.id
                    ? postCodeDetails.id
                    : selectedDropOffPointsReturn[whichSelectedItem]
                      ?.postCodeDetails?.id
                }
                fromTrDetails={true}
                title="Postcode Address"
              />
            )}

            {selectedDropOffPointsReturn[whichSelectedItem]
              ?.postCodeDetails?.id === 0
              ? objectDetailStatuses[5]?.postCodeDetails?.postCodeAddress
                .dropoff === 1 && (
                <TextArea
                  fromTrDetails={true}
                  title="Adress Description"
                  name="postCodeAddress"
                  icon="id-badge"
                  onChange={(e) => onchangeHandler(e, 1, 1)}
                  value={
                    postCodeDetails.postCodeAddress
                      ? postCodeDetails.postCodeAddress
                      : selectedDropOffPointsReturn[whichSelectedItem]
                        ?.postCodeDetails?.postCodeAddress
                  }
                  errorMessage={
                    trDetailsPageError
                      ? postCodeDetails?.postCodeAddress?.length < 1 &&
                      selectedDropOffPointsReturn[whichSelectedItem]
                        ?.errorMessage
                      : ""
                  }
                  placeholder="add a new adress if not listed "
                  defaultValue={true}
                />
              )
              : null}
          </div>
        </div>
      )}
    </>
  );
};

export default CheckingForPostcodes;
