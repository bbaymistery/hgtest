import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectedLists from "../SeletedLists";
import TextArea from "../TextArea";
import { updatePassDetailsForBothJourney } from "../../../store/pickUpDropOffReducer/pickUpDropAction";
import {
  commentReturn,
  commentTransfer,
  selectPickUpDropOffReducer,
} from "../../../store/pickUpDropOffReducer/pickUpDropSelectors";
import styles from "./styles.module.scss";
const JourneyDetails = ({
  pickUps,
  drops,
  title,
  returnJourneyTrue,
  onlyTransferJourney,
  journeyType,
}) => {
  const { appData } = useSelector(selectPickUpDropOffReducer);
  const selectCommentTransfer = useSelector(commentTransfer);
  const selectCommentReturn = useSelector(commentReturn);
  const dispatch = useDispatch();
  //bunu sadece imgni getirmek ucun yazdg Secilen cardn img si
  const carObject = appData?.carsTypes?.reduce(
    (obj, item) => ({
      ...obj,
      [item.id]: item,
    }),
    {}
  );

  const handleChange = (e) => {
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
        true
      )
    );
  };

  return (
    <div
      className={`${returnJourneyTrue ? styles.journeyWithMargin : ""} ${styles.journey_details
        }`}
    >
      <div className={styles.journey_details_title}>
        <h3>{title}</h3>
      </div>
      {carObject && (
        <div>
          <div className={styles.selecteditems}>
            <div className={styles.points}>
              <div className={styles.points_header}>
                <h3>Selected Pick Up points</h3>
              </div>
              {pickUps?.length > 0 && (
                <SelectedLists
                  selectedItems={pickUps}
                  index={0}
                  journeyType={journeyType}
                  inTransferComp={true}
                />
              )}
            </div>

            <div className={styles.points}>
              <div className={styles.points_header}>
                <h3>Selected Drop off points</h3>
              </div>

              {drops?.length > 0 && (
                <SelectedLists
                  selectedItems={drops}
                  index={1}
                  journeyType={journeyType}
                  inTransferComp={true}
                />
              )}
            </div>
          </div>
          <div>
            {returnJourneyTrue && (
              <div className={`${styles.textarea} ${styles.boxx}`}>
                <TextArea
                  name="specialRequests"
                  icon="pen-to-square"
                  onChange={handleChange}
                  value={selectCommentReturn}
                  fromTrDetails={true}
                  title="Special Request "
                  pl={true}
                />
              </div>
            )}

            {onlyTransferJourney && (
              <div className={`${styles.textarea} ${styles.boxx}`}>
                <TextArea
                  name="specialRequests"
                  icon="pen-to-square"
                  value={selectCommentTransfer}
                  onChange={handleChange}
                  fromTrDetails={true}
                  title="Special Request "
                  pl={true}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JourneyDetails;
