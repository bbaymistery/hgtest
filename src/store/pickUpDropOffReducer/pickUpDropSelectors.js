//todo selecting general reducer
export const selectPickUpDropOffReducer = (state) => state.pickUpDropOffReducer;

//todo selecting reservations
export const onewayResevationDetails = (state) =>
  state.pickUpDropOffReducer?.reservations[0];
export const returnReservationDetails = (state) =>
  state.pickUpDropOffReducer?.reservations[1];

//todo selecting type of journey
export const selectedJourneyType = (state) =>
  state.pickUpDropOffReducer?.params?.journeyType;

//todo selecting  inputsValues for one way
export const selectedPickUpInputOneWay = (state) =>
  state?.pickUpDropOffReducer?.params?.searchEngine[0]?.pickupInput;
export const selectedDroppOffInputOneWay = (state) =>
  state?.pickUpDropOffReducer?.params?.searchEngine[0]?.dropoffInput;

//todo selecting inputValues for return direction
export const selectedPickUpInputReturn = (state) =>
  state?.pickUpDropOffReducer?.params?.searchEngine[1]?.pickupInput;
export const selectedDroppOffInputReturn = (state) =>
  state?.pickUpDropOffReducer?.params?.searchEngine[1]?.dropoffInput;

//!points
//todo selecting Points(we will check if first index contains pcat10)
//todo or we will reach to this items and write each by with map
export const PickUpPointsOneWay = (state) =>
  state?.pickUpDropOffReducer?.reservations[0]?.selectedPickupPoints;
export const DroopOffPointsOneWay = (state) =>
  state?.pickUpDropOffReducer?.reservations[0]?.selectedDropoffPoints;
export const PickUpPointsReturn = (state) =>
  state?.pickUpDropOffReducer?.reservations[1]?.selectedPickupPoints;
export const DropOffPointsReturn = (state) =>
  state?.pickUpDropOffReducer?.reservations[1]?.selectedDropoffPoints;

//todo selectTimezone current date  for transfer return point
export const transferDateTimeString = (state) =>
  state.pickUpDropOffReducer?.reservations[0]?.transferDetails
    ?.transferDateTimeString;
export const returnDateTimeString = (state) =>
  state.pickUpDropOffReducer?.reservations[1]?.transferDetails
    ?.transferDateTimeString;

// todo selectingerrormessages
export const transferErrorParams = (state) =>
  state.pickUpDropOffReducer?.params?.reservationsError[0];
export const returnErrorParams = (state) =>
  state.pickUpDropOffReducer?.params?.reservationsError[1];

//todo quotation selectors
export const quotTransferLoading = (state) =>
  state.pickUpDropOffReducer?.params?.quotations?.quotTransferLoading;
export const quotReturnLoading = (state) =>
  state?.pickUpDropOffReducer?.params?.quotations?.quotReturnLoading;
export const quotBothLoading = (state) =>
  state?.pickUpDropOffReducer?.params?.quotations?.quotBothLoading;
export const transferQuotOptions = (state) =>
  state?.pickUpDropOffReducer?.params?.quotations?.transferQuotations;
export const returnQuotOptions = (state) =>
  state?.pickUpDropOffReducer?.params?.quotations?.returnQuotations; //it is quotations options
export const selectedTransferQuot = (state) =>
  state?.pickUpDropOffReducer?.reservations[0]?.quotation;
export const selectedReturnQuot = (state) =>
  state?.pickUpDropOffReducer?.reservations[1]?.quotation;

//todo for addingextraitems when click add extra pickup for transferr
export const showExtraTextForPickUpTr = (state) =>
  state.pickUpDropOffReducer.initalInputsStatesForAddingExtraItems[0]
    .showAddExtraTextPickUp;
export const showExtraTextForDropTr = (state) =>
  state.pickUpDropOffReducer.initalInputsStatesForAddingExtraItems[0]
    .showAddExtraTextDropOff;
export const showInputAfterAddPickUpTr = (state) =>
  state.pickUpDropOffReducer.initalInputsStatesForAddingExtraItems[0]
    .inputAfterAddingPickUp;
export const showInputAfterAdDropTr = (state) =>
  state.pickUpDropOffReducer.initalInputsStatesForAddingExtraItems[0]
    .inputAfterAddingDropOff;

//todo for addingextraitems when click add extra pickup for  return
export const showExtraTxtFrPickUpRt = (state) =>
  state.pickUpDropOffReducer.initalInputsStatesForAddingExtraItems[1]
    .showAddExtraTextPickUp;
export const showExtraTextForDropRt = (state) =>
  state.pickUpDropOffReducer.initalInputsStatesForAddingExtraItems[1]
    .showAddExtraTextDropOff;
export const showInputAfterAddPckUpRt = (state) =>
  state.pickUpDropOffReducer.initalInputsStatesForAddingExtraItems[1]
    .inputAfterAddingPickUp;
export const showInputAfterAdDropRt = (state) =>
  state.pickUpDropOffReducer.initalInputsStatesForAddingExtraItems[1]
    .inputAfterAddingDropOff;

//* transfer-details page passengerDetailsSelectors  And pax() and Request

export const transferPassengerFullName = (state) =>
  state.pickUpDropOffReducer?.reservations[0]?.passengerDetails?.firstname;
export const transferPassengerEmail = (state) =>
  state?.pickUpDropOffReducer?.reservations[0]?.passengerDetails?.email;
export const transferPassengerPhone = (state) =>
  state?.pickUpDropOffReducer?.reservations[0]?.passengerDetails?.phone;
export const paxTransfer = (state) =>
  state?.pickUpDropOffReducer?.reservations[0]?.transferDetails
    ?.passengersNumber;
export const commentTransfer = (state) =>
  state?.pickUpDropOffReducer?.reservations[0]?.transferDetails
    ?.specialRequests;
export const commentReturn = (state) =>
  state?.pickUpDropOffReducer?.reservations[1]?.transferDetails
    ?.specialRequests;

export const returnPassengerFullName = (state) =>
  state.pickUpDropOffReducer.reservations[1]?.passengerDetails?.firstname;
export const returnPassengerEmail = (state) =>
  state.pickUpDropOffReducer.reservations[1]?.passengerDetails?.email;
export const returnPassengerPhone = (state) =>
  state.pickUpDropOffReducer.reservations[1]?.passengerDetails?.phone;
export const paxReturn = (state) =>
  state.pickUpDropOffReducer.reservations[1]?.transferDetails?.passengersNumber;

//inpt checked for tranferdetails page
export const selectCHheckedInput = (state) =>
  state.pickUpDropOffReducer.checked;
export const selectArchieveToken = (state) =>
  state.pickUpDropOffReducer.tokenForArchieve;
//errors
export const passngTrsErrors = (state) =>
  state.pickUpDropOffReducer.passenegerDetailsErrors[0];
export const returnPassErrors = (state) =>
  state.pickUpDropOffReducer.passenegerDetailsErrors[1];

//!flight:{pcikupptime:0} ve digerleri ucun erroru reservations obje icin edemedigimizden kopyalayb AyriBir arrayda tutarag error mesaji yoxluyuruq
export const PickUpPointsOneWayCopy = (state) =>
  state.pickUpDropOffReducer?.reservationsTrDetailsPageErrors[0]
    ?.selectedPickupPoints;
export const DroopOffPointsOneWayCopy = (state) =>
  state.pickUpDropOffReducer?.reservationsTrDetailsPageErrors[0]
    ?.selectedDropoffPoints;
export const PickUpPointsReturnCopy = (state) =>
  state.pickUpDropOffReducer?.reservationsTrDetailsPageErrors[1]
    ?.selectedPickupPoints;
export const DropOffPointsReturnCopy = (state) =>
  state.pickUpDropOffReducer?.reservationsTrDetailsPageErrors[1]
    ?.selectedDropoffPoints;
//
//
export const PaymentToken = (state) =>
  state.pickUpDropOffReducer?.reservations[0]?.paymentDetails?.token;
export const PaymentType = (state) =>
  state.pickUpDropOffReducer?.reservations[0]?.paymentDetails?.paymentType;
export const ModalInfo = (state) => state?.pickUpDropOffReducer?.modalInfo;
