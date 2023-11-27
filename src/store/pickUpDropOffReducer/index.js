import {
  dateTimeStringFunc,
  dateTimeStringFuncForReturn,
} from "../../helpers/getDate";
import {
  FETCH_LOCATIONS_FAILURE,
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  SET_SEARCH_ENGINE_VALUE,
  GET_APP_DATA,
  CHECKED_INPUT_FOR_RETURN,
  RESET_DATA,
  SWITCH_JOURNEY,
  ADD_ITEM_TO_SELECTED_LIST,
  DELETE_ITEM_FROM_SELECTED_LIST,
  SET_DATE_TIME,
  SET_HOUR_AND_MINUTE,
  SET_PARAMS,
  SET_QUOTATION,
  ADD_EXTRA_INPUT_FOR_JOURNEY,
  GET_TRANSFER_QUOTATIONS,
  GET_RETURN_QUOTATIONS,
  GET_TRANSFER_QUOT_REQUEST,
  GET_RETURN_QUOT_REQUEST,
  GET_QUOT_TRANSFER_ERROR,
  GET_RETURN_ERROR_QUOT,
  UPDATE_SELECTED_ITEMS_INPUTS,
  SET_ERROR_IN_TRANSFER_DETAILS_PAGE,
  SET_ERROR_IN_RETURN_DETAILS_PAGE,
  UPDATE_PASSENGER_DETAILS_FOR_BOTH_JOURNEY,
  SET_ERROR_FOR_PASSENGER_DETAILS,
  GET_BOTH_TOGETHER_QUOT_REQUEST,
  GET_BOTH_TOGETHER_QUOTATIONS,
  GET_BOTH_TOGETHER_ERROR_QUOT,
  SET_ERROR_FOR_TRANSFER_DETAILS_PAGE,
  SET_POST_CODE_ADRESSES,
  GET_PAYMENT_DATA,
  SET_PAYMENT,
  GET_DATAS_FOR_EDITING,
  EDIT_SAVE_TRANSFER_PASSENGER_VALUES,
  CANCEL__TRANSFER_JOURNEY_EDITING,
  EDIT_SAVE_SPECIAL_REQUESTS_TR,
  SET_MODAL_INFO,
  GET_MEET_POINT,
  GET_VALUES_FROM_ARTICLES,
  RESET_RESERVATION,
  SET_INITIAL_MANAGE_BOOKING_PRICE_FOR_QUOTATION_DIFFERENCE,
  SET_INITIAL_PRICE_IF_CANCELED,
  RESERVATION_TOKEN_UPDATED,
  SET_NEW_CURRENT_QUOTATION,
  IF_HAS_BOOKED_INSIDE_QUOTATION_PAGE,
} from "./pickUpDropTypes";

const INITIAL_STATE = {
  cookies: {
    sessionToken: "",
  },
  showOnlyTransferCOmp: true,
  direction: "left",
  reservations: [
    {
      reservationDetails: {
        channelId: 5,
        accountId: 225,
      },
      selectedPickupPoints: [],
      selectedDropoffPoints: [],
      quotation: {},
      transferDetails: {
        // transferDateTime: getDateTimeFromFormat(
        // dateTimeStringFunc(),
        // "yyyy-mm-dd HH:MM",
        // "Europe/London"
        // ),
        transferDateTimeString: dateTimeStringFunc(),
        pickupCategoryId: "",
        passengersNumber: 1,
        passengerSuitcase: 1,
        specialRequests: "",
      },
      passengerDetails: {
        token: "",
        lastname: "",
        language: "en",
        firstname: "",
        email: "",
        phone: "",
      },
      paymentDetails: {
        token: "",
        paymentType: "",
        account: 225,
      },
    },
    {
      reservationDetails: {
        channelId: 5,
        accountId: 225,
      },
      selectedPickupPoints: [],
      selectedDropoffPoints: [],
      quotation: {},
      transferDetails: {
        // transferDateTime: getDateTimeFromFormat(
        // dateTimeStringFuncForReturn(),
        // "yyyy-mm-dd HH:MM",
        // "Europe/London"
        // ),
        transferDateTimeString: dateTimeStringFuncForReturn(),
        pickupCategoryId: "",
        passengersNumber: 1,
        passengerSuitcase: 1,
        specialRequests: "",
      },
      passengerDetails: {
        token: "",
        lastname: "",
        language: "en",
        firstname: "",
        email: "",
        phone: "",
      },
      paymentDetails: {
        token: "",
        paymentType: "",
        account: 225,
      },
    },
  ],

  loadingPickUpOneWay: false,
  loadingDropOffOneWay: false,
  loadingPickUpReturn: false,
  loadingDropOffReturn: false,
  appData: {},
  params: {
    journeyType: "0",
    searchLoading: false,
    quotations: {
      quotationLoading: false,
      quotTransferLoading: false,
      quotReturnLoading: false,
      quotBothLoading: false,
      quotationError: "",
      transferQuotations: [],
      returnQuotations: [],
    },
    reservationsError: [
      {
        selectedPickUpPointError: "",
        selectedDropOffPointsError: "",
        selectedTimeError: "",
        dateTimeForBoolean: false, //if client choice less than current time or date it will be true
      },
      {
        selectedPickUpPointError: "",
        selectedDropOffPointsError: "",
        selectedTimeError: "",
        dateTimeForBoolean: false,
      },
    ],
    searchErrors: [],
    searchEngine: [
      {
        pickupPoints: {},
        dropoffPoints: {},
        pickupInput: "",
        dropoffInput: "",
      },
      {
        pickupPoints: {},
        dropoffPoints: {},
        pickupInput: "",
        dropoffInput: "",
      },
    ],
    transferDetailsPageError: [
      {
        trPickUpPointError: "",
        trDropOffPointsError: "",
      },
      {
        returnPickUpPointError: "",
        returnDropOffPointsError: "",
      },
    ],
  },
  initalInputsStatesForAddingExtraItems: [
    {
      showAddExtraTextPickUp: false,
      inputAfterAddingPickUp: false,
      showAddExtraTextDropOff: false,
      inputAfterAddingDropOff: false,
    },
    {
      showAddExtraTextPickUp: false,
      inputAfterAddingPickUp: false,
      showAddExtraTextDropOff: false,
      inputAfterAddingDropOff: false,
    },
  ],
  checked: true,
  passenegerDetailsErrors: [
    {
      fullnameError: "",
      emailError: "",
      pgoneError: "",
    },
    {
      fullnameError: "",
      emailError: "",
      pgoneError: "",
    },
  ],
  reservationsTrDetailsPageErrors: [
    {
      selectedPickupPoints: [],
      // collected dropoff point(s) from /api/v1/suggestion API End Point
      selectedDropoffPoints: [],
    },
    {
      selectedPickupPoints: [],
      // collected dropoff point(s) from /api/v1/suggestion API End Point
      selectedDropoffPoints: [],
    },
  ],
  trDetailsPageError: false,
  postCodeAdresses: [],
  paymentTypes: [],
  tokenForArchieve: "",
  modalInfo: false,
  meetPoint: "",

};
export const pickUpDropOffReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LOCATIONS_REQUEST: {
      let { journeyType, index } = action.payload;
      return {
        ...state,
        loadingPickUpOneWay: journeyType === 0 && index === 0 ? true : false,
        loadingDropOffOneWay: journeyType === 0 && index === 1 ? true : false,
        loadingPickUpReturn: journeyType === 1 && index === 0 ? true : false,
        loadingDropOffReturn: journeyType === 1 && index === 1 ? true : false,
      };
    }
    case FETCH_LOCATIONS_SUCCESS: {
      const { index, data, journeyType } = action.payload;
      // console.log(data);
      // console.log(data?.token);

      return {
        ...state,
        cookies: {
          ...state.cookies,
          sessionToken: `${data["session-token"]}`,
        },
        reservations: [
          {
            ...state.reservations[0],
            passengerDetails: {
              ...state.reservations[0].passengerDetails,
              token: data?.token,
            },
          },
          {
            ...state.reservations[1],
            passengerDetails: {
              ...state.reservations[1].passengerDetails,
              token: data?.token,
            },
          },
        ],
        loadingPickUpOneWay: false,
        loadingDropOffOneWay: false,
        loadingPickUpReturn: false,
        loadingDropOffReturn: false,
        // session_token: data.session - token,
        params: {
          ...state.params,
          journeyType,
          searchEngine: [
            //!here changing pickup or dropoff  *points*
            journeyType === 0
              ? {
                ...state.params.searchEngine[0],
                pickupPoints:
                  index === 0
                    ? data.result
                    : state.params.searchEngine[0].pickupPoints,
                dropoffPoints:
                  index === 1
                    ? data.result
                    : state.params.searchEngine[0].dropoffPoints,
              }
              : { ...state.params.searchEngine[0] },

            //!here changing pickup or dropoff  *points*
            journeyType === 1
              ? {
                ...state.params.searchEngine[1],
                pickupPoints:
                  index === 0
                    ? data.result
                    : state.params.searchEngine[1].pickupPoints,
                dropoffPoints:
                  index === 1
                    ? data.result
                    : state.params.searchEngine[1].dropoffPoints,
              }
              : {
                ...state.params.searchEngine[1],
              },
          ],
        },
        tokenForArchieve: data?.token,
      };
    }
    case FETCH_LOCATIONS_FAILURE: {
      const { errorMessage, index } = action.payload;
      return {
        ...state,
        loadingPickUpOneWay: false,
        loadingDropOffOneWay: false,
        loadingPickUpReturn: false,
        loadingDropOffReturn: false,
        params: {
          ...state.params,
          searchErrors: [
            { pickUpError: index === 0 ? errorMessage : "" },
            { dropOffError: index === 1 ? errorMessage : "" },
          ],
        },
      };
    }
    case SET_SEARCH_ENGINE_VALUE: {
      const { index, inpValue, journeyType } = action.payload;
      let direction = state.direction;

      if (journeyType === 0) {
        direction = "left";
      }
      if (journeyType === 1) {
        direction = "right";
      }

      return {
        ...state,
        direction: direction,
        params: {
          ...state.params,
          // journeyType: journeyType,
          searchEngine: [
            //!here we update inp values for transfer(oneway) direction  It means journey type 0

            journeyType === 0
              ? {
                ...state.params.searchEngine[0],
                pickupInput:
                  index === 0
                    ? inpValue
                    : state.params.searchEngine[0].pickupInput,
                dropoffInput:
                  index === 1
                    ? inpValue
                    : state.params.searchEngine[0].dropoffInput,
              }
              : {
                ...state.params.searchEngine[0],
              },

            //!here we update inp values for return direction It means journey type 1
            journeyType === 1
              ? {
                ...state.params.searchEngine[1],
                pickupInput:
                  index === 0
                    ? inpValue
                    : state.params.searchEngine[1].pickupInput,
                dropoffInput:
                  index === 1
                    ? inpValue
                    : state.params.searchEngine[1].dropoffInput,
              }
              : {
                ...state.params.searchEngine[1],
              },
          ],
        },
      };
    }

    case ADD_ITEM_TO_SELECTED_LIST: {
      const { data, index, journeyType, objectDetails } = action.payload;

      let newFinalObj = {
        ...data,
        ...objectDetails,
      };


      let pickUpsTr = state?.reservations[0].selectedPickupPoints;
      let dropOffsTr = state?.reservations[0].selectedDropoffPoints;

      let pickUpsReturn = state?.reservations[1]?.selectedPickupPoints;
      let dropOffsReturn = state?.reservations[1]?.selectedDropoffPoints;

      if (index === 0 && journeyType === 0) {
        pickUpsTr = [...pickUpsTr, newFinalObj];
      }

      if (index === 1 && journeyType === 0) {
        dropOffsTr = [...dropOffsTr, newFinalObj];
      }

      if (index === 0 && journeyType === 1) {
        pickUpsReturn = [...pickUpsReturn, newFinalObj];
      }

      if (index === 1 && journeyType === 1) {
        dropOffsReturn = [...dropOffsReturn, newFinalObj];
      }

      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            selectedPickupPoints: pickUpsTr,
            selectedDropoffPoints: dropOffsTr,
          },
          {
            ...state.reservations[1],
            selectedPickupPoints: pickUpsReturn,
            selectedDropoffPoints: dropOffsReturn,
          },
        ],

        //we r cleaning input after selecting one item
        params: {
          ...state.params,
          searchEngine: [
            {
              ...state.params.searchEngine[0],
              pickupInput: "",
              dropoffInput: "",
            },
            {
              ...state.params.searchEngine[1],
              pickupInput: "",
              dropoffInput: "",
            },
          ],
        },
        reservationsTrDetailsPageErrors: [
          {
            ...state.reservationsTrDetailsPageErrors[0],
            selectedPickupPoints: pickUpsTr?.map((item) => {
              // console.log(item?.flightDetails?.flightNumber?.length);

              return (item?.pcatId === 1 &&
                item?.flightDetails?.flightNumber?.length === 0) ||
                (item?.pcatId === 2 && item.cruiseNumber)?.length === 0 ||
                (item?.pcatId === 5 &&
                  item?.postCodeDetails?.postCodeAddress?.length === 0)
                ? { ...item, errorMessage: "required", waitingError: item?.pcatId === 1 ? "required" : "", waitingTime: item?.pcatId === 1 ? "" : "1" }
                : { ...item, errorMessage: "", waitingError: "", waitingTime: "1" };
            }),
            selectedDropoffPoints: dropOffsTr?.map((item) => {
              return item?.pcatId === 5 &&
                item?.postCodeDetails?.postCodeAddress?.length === 0
                ? { ...item, errorMessage: "required", waitingTime: "1" }
                : { ...item, errorMessage: "", waitingTime: "1" };
            }),
          },
          {
            ...state.reservationsTrDetailsPageErrors[1],
            selectedPickupPoints: pickUpsReturn?.map((item) => {
              return item.pcatId === 1 || item.pcatId === 2 || item.pcatId === 5
                ? { ...item, errorMessage: "required", waitingError: item?.pcatId === 1 ? "required" : "", waitingTime: item?.pcatId === 1 ? "" : "1" }
                : { ...item, errorMessage: "", waitingError: "", waitingTime: "1" };
            }),
            selectedDropoffPoints: dropOffsReturn?.map((item) => {
              return item?.pcatId === 5
                ? { ...item, errorMessage: "required", waitingTime: "1" }
                : { ...item, errorMessage: "", waitingTime: "1" };
            }),
          },
        ],
      };
    }
    case DELETE_ITEM_FROM_SELECTED_LIST: {
      const { item, index, journeyType, indexOfCurrentItem } = action.payload;
      let pickUpsOneWAY = state.reservations[0].selectedPickupPoints;
      let dropOffOneWay = state.reservations[0].selectedDropoffPoints;
      // console.log(index, journeyType, indexOfCurrentItem);

      let pickUpsReturn = state.reservations[1]?.selectedPickupPoints;
      let dropOffReturn = state.reservations[1]?.selectedDropoffPoints;

      let pickUpTransferPointsCopy =
        state?.reservationsTrDetailsPageErrors[0]?.selectedPickupPoints;
      let dropOfTransferPointsCopy =
        state?.reservationsTrDetailsPageErrors[0]?.selectedDropoffPoints;
      let pickUpReturnPointsCopy =
        state?.reservationsTrDetailsPageErrors[1]?.selectedPickupPoints;
      let dropOfReturnPointsCopy =
        state?.reservationsTrDetailsPageErrors[1]?.selectedDropoffPoints;

      //filter for  oneway
      if (index === 0 && journeyType === 0) {
        pickUpsOneWAY?.splice(indexOfCurrentItem, 1);
        pickUpTransferPointsCopy?.splice(indexOfCurrentItem, 1);
        // console.log("index === 0 && journeyType === 0");
      }
      if (index === 1 && journeyType === 0) {
        dropOffOneWay?.splice(indexOfCurrentItem, 1);
        dropOfTransferPointsCopy?.splice(indexOfCurrentItem, 1);
        // console.log("index === 1 && journeyType === 0");
      }
      //filter for  return
      if (index === 0 && journeyType === 1) {
        pickUpsReturn?.splice(indexOfCurrentItem, 1);
        pickUpReturnPointsCopy?.splice(indexOfCurrentItem, 1);
        // console.log("index === 0 && journeyType === 1");
      }
      if (index === 1 && journeyType === 1) {
        dropOffReturn?.splice(indexOfCurrentItem, 1);

        dropOfReturnPointsCopy?.splice(indexOfCurrentItem, 1);

        // console.log("index === 1 && journeyType === 1");
      }

      return {
        ...state,

        reservations: [
          {
            ...state.reservations[0],
            selectedPickupPoints: pickUpsOneWAY,
            selectedDropoffPoints: dropOffOneWay,
          },
          {
            ...state.reservations[1],
            selectedPickupPoints: pickUpsReturn,
            selectedDropoffPoints: dropOffReturn,
          },
        ],
        reservationsTrDetailsPageErrors: [
          {
            ...state.reservationsTrDetailsPageErrors[0],
            selectedPickupPoints: pickUpTransferPointsCopy,
            selectedDropoffPoints: dropOfTransferPointsCopy,
          },
          {
            ...state.reservationsTrDetailsPageErrors[1],
            selectedPickupPoints: pickUpReturnPointsCopy,
            selectedDropoffPoints: dropOfReturnPointsCopy,
          },
        ],
      };
    }
    case SET_DATE_TIME: {
      const { dateValue, journeyType, pickupOrDropOrDate } = action.payload;
      //these are for getting input date
      let tranferDatatime =
        state?.reservations[0].transferDetails?.transferDateTimeString;
      let hourMinuteTransfer = tranferDatatime?.split(" ")[1];

      let returnDatatime =
        state?.reservations[1].transferDetails?.transferDateTimeString;
      let hourMinuteReturn = returnDatatime?.split(" ")[1];

      //replacing frist index with new input date value
      if (pickupOrDropOrDate === "date") {
        if (journeyType === 0) {
          tranferDatatime = `${dateValue} ${hourMinuteTransfer}`;
        }
        if (journeyType === 1) {
          returnDatatime = `${dateValue} ${hourMinuteReturn}`;
        }
      }
      //these are for getting hour and minute for each return and transfer
      let direction = state.direction;

      if (journeyType === 0) {
        direction = "left";
      }
      if (journeyType === 1) {
        direction = "right";
      }
      // console.log(tranferDatatime);

      return {
        ...state,
        direction: direction,
        reservations: [
          {
            ...state.reservations[0],
            transferDetails: {
              ...state.reservations[0].transferDetails,
              transferDateTimeString: tranferDatatime,
              // transferDateTime:
              //   journeyType === 0
              //     ? getDateTimeFromFormat(
              //         tranferDatatime,
              //         "yyyy-mm-dd HH:MM",
              //         "Europe/London"
              //       )
              //     : state.reservations[0].transferDetails.transferDateTime,
            },
          },
          {
            ...state.reservations[1],
            transferDetails: {
              ...state.reservations[1].transferDetails,
              transferDateTimeString: returnDatatime,
              // transferDateTime:
              //   journeyType === 0
              //     ? getDateTimeFromFormat(
              //         returnDatatime,
              //         "yyyy-mm-dd HH:MM",
              //         "Europe/London"
              //       )
              //     : state.reservations[0].transferDetails.transferDateTime,
            },
          },
        ],
      };
    }

    case SET_HOUR_AND_MINUTE: {
      const { valueOfHourOrMinute, transferOrReturn } = action.payload;
      //these are for getting input date
      let tranferDatatime =
        state?.reservations[0].transferDetails?.transferDateTimeString;
      let trDate = tranferDatatime.split(" ")[0]; //2022-04-18
      let trMinute = tranferDatatime.split(" ")[1]?.split(":")[1]; //00   15 20 25
      let trHour = tranferDatatime?.split(" ")[1]?.split(":")[0]; //1 2 3 4 5 6

      //taking each hour 12   and minute 00
      let returnDatatime;
      let returnDate;
      let returnMinute; //00   15 20 25
      let returnHour;
      if (state?.reservations[1]) {
        returnDatatime =
          state?.reservations[1]?.transferDetails?.transferDateTimeString;
        returnDate = returnDatatime?.split(" ")[0];
        returnMinute = returnDatatime?.split(" ")[1]?.split(":")[1]; //00   15 20 25
        returnHour = returnDatatime?.split(" ")[1]?.split(":")[0];
      }

      //replacing frist index with new input date value
      if (transferOrReturn === "hourTr") {
        tranferDatatime = `${trDate} ${valueOfHourOrMinute}:${trMinute}`;
      }
      if (transferOrReturn === "minuteTr") {
        tranferDatatime = `${trDate} ${trHour}:${valueOfHourOrMinute}`;
      }

      if (transferOrReturn === "hourReturn") {
        returnDatatime = `${returnDate} ${valueOfHourOrMinute}:${returnMinute}`;
      }
      if (transferOrReturn === "minuteReturn") {
        returnDatatime = `${returnDate} ${returnHour}:${valueOfHourOrMinute}`;
      }

      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            transferDetails: {
              ...state.reservations[0].transferDetails,
              transferDateTimeString: tranferDatatime,
              // transferDateTime:
              //   transferOrReturn === "hourTr" || transferOrReturn === "minuteTr"
              //     ? getDateTimeFromFormat(
              //         tranferDatatime,
              //         "yyyy-mm-dd HH:MM",
              //         "Europe/London"
              //       )
              //     : state.reservations[0].transferDetails.transferDateTime,
            },
          },
          {
            ...state.reservations[1],
            transferDetails: {
              ...state.reservations[1]?.transferDetails,
              transferDateTimeString: returnDatatime,
              // transferDateTime:
              //   transferOrReturn === "minuteReturn" ||
              //   transferOrReturn === "hourReturn"
              //     ? getDateTimeFromFormat(
              //         returnDatatime,
              //         "yyyy-mm-dd HH:MM",
              //         "Europe/London"
              //       )
              //     : state?.reservations[1]?.transferDetails?.transferDateTime,
            },
          },
        ],
      };
    }

    //setting errors for fields
    case SET_PARAMS: {
      const { message, pickOrDrop, journeyType, dateTimeForBoolean } =
        action.payload;

      let pickError =
        state.params.reservationsError[0].selectedPickUpPointError;
      let dropError =
        state.params.reservationsError[0].selectedDropOffPointsError;
      let dateError = state.params.reservationsError[0].selectedTimeError;
      let booleanForCheck =
        state.params.reservationsError[0].dateTimeForBoolean;

      if (journeyType === 0) {
        if (pickOrDrop === "both") {
          pickError = message;
          dropError = message;
        }

        if (pickOrDrop === "dateTimeError") {
          (dateError = message), (booleanForCheck = dateTimeForBoolean);
        }
      }

      let pickErrorReturn =
        state.params.reservationsError[1].selectedPickUpPointError;
      let dropErrorReturn =
        state.params.reservationsError[1].selectedDropOffPointsError;
      let dateErrorReturn = state.params.reservationsError[1].selectedTimeError;
      let booleanForCheckReturn =
        state.params.reservationsError[1].dateTimeForBoolean;

      if (journeyType === 1) {
        if (pickOrDrop === "both") {
          pickErrorReturn = message;
          dropErrorReturn = message;
        }
        if (pickOrDrop === "dateTimeError") {
          (dateErrorReturn = message),
            (booleanForCheckReturn = dateTimeForBoolean);
        }
      }
      return {
        ...state,
        params: {
          ...state.params,
          reservationsError: [
            {
              ...state.params.reservationsError[0],
              selectedPickUpPointError: pickError,
              selectedDropOffPointsError: dropError,
              selectedTimeError: dateError,
              dateTimeForBoolean: booleanForCheck,
            },
            {
              ...state.params.reservationsError[1],
              selectedPickUpPointError: pickErrorReturn,
              selectedDropOffPointsError: dropErrorReturn,
              selectedTimeError: dateErrorReturn,
              dateTimeForBoolean: booleanForCheckReturn,
            },
          ],
        },
      };
    }

    //*TRANSFER QUOTATIONS
    case GET_TRANSFER_QUOT_REQUEST: {
      return {
        ...state,
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            quotTransferLoading: true,
          },
        },
      };
    }

    case GET_TRANSFER_QUOTATIONS: {
      let tr = action.payload.data;
      return {
        ...state,
        // otomotik secilmesi icin direk quotation icine birinci geleni atrq quotation icine(ve bu olur ilk secilen quotation)
        reservations: [
          {
            ...state?.reservations[0],
            // quotation: {
            //   ...action.payload?.data?.quotationOptions[0],
            // },
          },
          { ...state?.reservations[1] },
        ],
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            quotTransferLoading: false,
            transferQuotations: tr,
          },
        },
      };
    }
    case GET_QUOT_TRANSFER_ERROR: {
      return {
        ...state,
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            quotationError: action.payload,
            quotTransferLoading: false,
          },
        },
      };
    }

    case GET_BOTH_TOGETHER_QUOT_REQUEST: {
      return {
        ...state,
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            quotBothLoading: true,
          },
        },
      };
    }

    case GET_BOTH_TOGETHER_QUOTATIONS: {
      let { trQuots, retrunQuots } = action.payload;

      return {
        ...state,
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            quotBothLoading: false,
            transferQuotations: trQuots,
            returnQuotations: retrunQuots,
          },
        },
      };
    }
    case "DELETE_BOOKED_MESSAGE": {

      return {
        ...state,
        params: {
          ...state.params,
          quotations: {
            quotationError: "",
          },
        },
      };
    }

    case IF_HAS_BOOKED_INSIDE_QUOTATION_PAGE: {
      return {
        ...state,
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            transferQuotations: [],

          },
        },
      };
    }
      ""
    case "IF_HAS_BOOKED_INSIDE_QUOTATION_PAGE_TRANSFER": {
      return {
        ...state,
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            transferQuotations: [],

          },
        },
      };
    }
    // case "DELETE_BOOKED_MESSAGE": {
    //   return {
    //     ...state,
    //     params: {
    //       ...state.params,
    //       quotations: {
    //         ...state.params.quotations,
    //         quotationError: "",
    //       },
    //     },
    //   };
    // }

    case "IF_HAS_BOOKED_INSIDE_QUOTATION_PAGE_RETURN": {
      return {
        ...state,
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            returnQuotations: [],

          },
        },
      };
    }

    case GET_BOTH_TOGETHER_ERROR_QUOT: {
      return {
        ...state,
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            quotationError: action.payload,
            quotBothLoading: false,
          },
        },
      };
    }

    //*RETURN QUOTATIONS
    case GET_RETURN_QUOT_REQUEST: {
      return {
        ...state,
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            quotReturnLoading: true,
          },
        },
      };
    }

    case GET_RETURN_QUOTATIONS: {
      let rt = action.payload.data;

      return {
        ...state,
        // otomotik secilmesi icin direk quotation icine birinci geleni atrq quotation icine(ve bu olur ilk secilen quotation)
        reservations: [
          { ...state.reservations[0] },
          {
            ...state.reservations[1],
            // quotation: {
            //   ...action?.payload?.data?.quotationOptions[0],
            // },
          },
        ],
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            quotReturnLoading: false,
            returnQuotations: rt,
          },
        },
      };
    }
    case GET_RETURN_ERROR_QUOT: {
      return {
        ...state,
        params: {
          ...state.params,
          quotations: {
            ...state.params.quotations,
            quotationError: action.payload,
            quotReturnLoading: false,
          },
        },
      };
    }

    //*RETURN QUOTATIONS

    case SET_QUOTATION: {
      const { quotation, journeyType } = action.payload;
      let pickUpsTr = state?.reservations[0]?.selectedPickupPoints;
      let pickUpsReturn = state?.reservations[1]?.selectedPickupPoints;
      let newQuotationReturn = state?.reservations[1]?.quotation;
      let newQuotationTransfer = state?.reservations[0]?.quotation;
      if (journeyType === 0) newQuotationTransfer = quotation;
      if (journeyType === 1) newQuotationReturn = quotation;
      console.log(state.params);


      // let pickUpTransferPointsCopy =
      //   state?.reservationsTrDetailsPageErrors[0]?.selectedPickupPoints;

      // let pickUpReturnPointsCopy =
      //   state?.reservationsTrDetailsPageErrors[1]?.selectedPickupPoints;


      // //changing waitingpickuptime to empty string if destination is pickup
      //   let newSelectedPickUpPointsTr = pickUpTransferPointsCopy?.map((point, index) => {
      //   if (point?.pcatId === 1) {
      //     return point = { ...point, flightDetails: { ...point?.flightDetails, waitingPickupTime: "" } }
      //   } else {
      //     return point
      //   }
      // })
      // //changing waitingpickuptime to empty string if destination is pickup
      // let newSelectedPickUpPointsReturn = pickUpReturnPointsCopy?.map((point, index) => {
      //   if (point?.pcatId === 1) {
      //     return point = { ...point, flightDetails: { ...point?.flightDetails, waitingPickupTime: "" } }
      //   } else {
      //     return point
      //   }
      // })

      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            quotation: newQuotationTransfer,
            // selectedPickupPoints: newSelectedPickUpPointsTr,
            transferDetails: {
              ...state.reservations[0].transferDetails,
              pickupCategoryId:
                pickUpsTr.length > 0 ? pickUpsTr[0]?.pcatId : "",
            },
            paymentDetails: {
              ...state.reservations[0].paymentDetails,
              price: Number(newQuotationTransfer?.price),
            },
          },
          {
            ...state.reservations[1],
            quotation: newQuotationReturn,
            // selectedPickupPoints: newSelectedPickUpPointsReturn,
            transferDetails: {
              ...state?.reservations[1]?.transferDetails,
              pickupCategoryId:
                pickUpsReturn?.length > 0 ? pickUpsReturn[0]?.pcatId : "",
            },
            paymentDetails: {
              ...state.reservations[1]?.paymentDetails,
              price: Number(newQuotationReturn?.price),
            },
          },
        ],
        // reservationsTrDetailsPageErrors: [
        //   {
        //     ...state.reservationsTrDetailsPageErrors[0],
        //     selectedPickupPoints: newSelectedPickUpPointsTr,
        //   },
        //   {
        //     ...state.reservationsTrDetailsPageErrors[1],
        //     selectedPickupPoints: newSelectedPickUpPointsReturn,
        //   },
        // ],
      };
    }
    case SWITCH_JOURNEY: {
      let pickUpsTr = state.reservations[0].selectedPickupPoints;
      let dropOffsTr = state.reservations[0].selectedDropoffPoints;

      let extraTextPickUpReturn =
        state.initalInputsStatesForAddingExtraItems[1].showAddExtraTextPickUp;
      let extraTextDropOffReturn =
        state.initalInputsStatesForAddingExtraItems[1].showAddExtraTextDropOff;
      if (pickUpsTr.length > 0) {
        extraTextDropOffReturn = true;
      }

      if (dropOffsTr.length > 0) {
        extraTextPickUpReturn = true;
      }
      return {
        ...state,
        showOnlyTransferCOmp: +action.payload === 0 ? true : false,
        params: {
          ...state.params,
          journeyType: action.payload,
        },
        reservations: [
          { ...state.reservations[0], quotation: {} },
          {
            ...state.reservations[1],
            selectedPickupPoints: +action.payload === 0 ? [] : [...dropOffsTr],
            selectedDropoffPoints: +action.payload === 0 ? [] : [...pickUpsTr],
            quotation: {}
          },
        ],
        initalInputsStatesForAddingExtraItems: [
          { ...state.initalInputsStatesForAddingExtraItems[0] },
          {
            ...state.initalInputsStatesForAddingExtraItems[1],

            showAddExtraTextPickUp: extraTextPickUpReturn,
            // inputAfterAddingPickUp: false,
            showAddExtraTextDropOff: extraTextDropOffReturn,
            // inputAfterAddingDropOff: false,
          },
        ],
        reservationsTrDetailsPageErrors: [
          { ...state.reservationsTrDetailsPageErrors[0] },
          {
            ...state.reservationsTrDetailsPageErrors[1],
            // selectedPickupPoints: [...dropOffsTr],
            // selectedDropoffPoints: [...pickUpsTr] ,
            selectedPickupPoints: +action.payload === 0 ? [] : dropOffsTr.map((item) => {
              return item.pcatId === 1 || item.pcatId === 2 || item.pcatId === 5
                ? { ...item, errorMessage: "required", waitingError: item?.pcatId === 1 ? "required" : "", waitingTime: item?.pcatId === 1 ? "" : "1" }
                : { ...item, errorMessage: "", waitingError: "", waitingTime: "1" };
            }),
            selectedDropoffPoints: +action.payload === 0 ? [] : pickUpsTr.map((item) => {
              return item?.pcatId === 5
                ? { ...item, errorMessage: "required", waitingTime: "1" }
                : { ...item, errorMessage: "", waitingTime: "1" };
            }),
          },
        ],
      };
    }

    //if inp value less than 3 it will clear previos picklocatios or droppoff locations
    case RESET_DATA: {
      return {
        ...state,
        params: {
          ...state.params,
          searchEngine: [
            {
              ...state.params.searchEngine[0],
              pickupPoints: {},
              dropoffPoints: {},
            },
            {
              ...state.params.searchEngine[1],
              pickupPoints: {},
              dropoffPoints: {},
            },
          ],
        },
      };
    }

    case GET_APP_DATA: {
      return {
        ...state,
        appData: action.payload,
        loadingPickUpOneWay: false,
      };
    }
    case GET_PAYMENT_DATA: {
      const { data } = action.payload;
      return {
        ...state,
        paymentTypes: data,
      };
    }

    case CHECKED_INPUT_FOR_RETURN: {
      let checked = state.checked;
      //PASSENGER DETAILS
      const passTrDetails = state.reservations[0].passengerDetails;
      const passReturnDetails = state.reservations[1].passengerDetails;

      let newValues = null;
      if (!checked) {
        newValues = {
          ...passTrDetails,
        };
      }
      if (checked) {
        newValues = {
          ...passReturnDetails,
        };
      }

      return {
        ...state,
        checked: !state.checked,
        reservations: [
          {
            ...state.reservations[0],
            passengerDetails: newValues ? newValues : passTrDetails,
          },
          {
            ...state.reservations[1],
            passengerDetails: newValues ? newValues : passReturnDetails,
            transferDetails: {
              ...state.reservations[1].transferDetails,
              passengersNumber: !checked
                ? state.reservations[0].transferDetails.passengersNumber
                : state.reservations[1].transferDetails.passengersNumber,
            },
          },
        ],
      };
    }

    //?extra inputs
    case ADD_EXTRA_INPUT_FOR_JOURNEY: {
      const { pickOrDrop, journeyType, whereFuncComes } = action.payload;
      let showAddExtraTextPickUp =
        state.initalInputsStatesForAddingExtraItems[0].showAddExtraTextPickUp;
      let inputAfterAddingPickUp =
        state.initalInputsStatesForAddingExtraItems[0].inputAfterAddingPickUp;
      //
      let showAddExtraTextDropOff =
        state.initalInputsStatesForAddingExtraItems[0].showAddExtraTextDropOff;
      let inputAfterAddingDropOff =
        state.initalInputsStatesForAddingExtraItems[0].inputAfterAddingDropOff;
      if (
        pickOrDrop === "pickupPoints" &&
        journeyType === 0 &&
        whereFuncComes === "handleInp"
      ) {
        showAddExtraTextPickUp = false;
        inputAfterAddingPickUp = true;
      }

      if (
        pickOrDrop === "pickupPoints" &&
        journeyType === 0 &&
        whereFuncComes === "insideHandleSearch"
      ) {
        showAddExtraTextPickUp = true;
        inputAfterAddingPickUp = false;
      }

      if (
        pickOrDrop === "dropoffPoints" &&
        journeyType === 0 &&
        whereFuncComes === "handleInp"
      ) {
        showAddExtraTextDropOff = false;
        inputAfterAddingDropOff = true;
      }

      if (
        pickOrDrop === "dropoffPoints" &&
        journeyType === 0 &&
        whereFuncComes === "insideHandleSearch"
      ) {
        showAddExtraTextDropOff = true;
        inputAfterAddingDropOff = false;
      }

      //?the ssame logi c for return
      let showAddExtraTextPickUpReturn =
        state.initalInputsStatesForAddingExtraItems[1].showAddExtraTextPickUp;
      let inputAfterAddingPickUpReturn =
        state.initalInputsStatesForAddingExtraItems[1].inputAfterAddingPickUp;
      //dropoffPoints
      let showAddExtraTextDropOffReturn =
        state.initalInputsStatesForAddingExtraItems[1].showAddExtraTextDropOff;
      let inputAfterAddingDropOffReturn =
        state.initalInputsStatesForAddingExtraItems[1].inputAfterAddingDropOff;
      if (
        pickOrDrop === "pickupPoints" &&
        journeyType === 1 &&
        whereFuncComes === "handleInp"
      ) {
        showAddExtraTextPickUpReturn = false;
        inputAfterAddingPickUpReturn = true;
      }

      if (
        pickOrDrop === "pickupPoints" &&
        journeyType === 1 &&
        whereFuncComes === "insideHandleSearch"
      ) {
        showAddExtraTextPickUpReturn = true;
        inputAfterAddingPickUpReturn = false;
      }

      if (
        pickOrDrop === "dropoffPoints" &&
        journeyType === 1 &&
        whereFuncComes === "handleInp"
      ) {
        showAddExtraTextDropOffReturn = false;
        inputAfterAddingDropOffReturn = true;
      }

      if (
        pickOrDrop === "dropoffPoints" &&
        journeyType === 1 &&
        whereFuncComes === "insideHandleSearch"
      ) {
        showAddExtraTextDropOffReturn = true;
        inputAfterAddingDropOffReturn = false;
      }

      return {
        ...state,
        initalInputsStatesForAddingExtraItems: [
          {
            ...state.initalInputsStatesForAddingExtraItems[0],
            showAddExtraTextPickUp,
            inputAfterAddingPickUp,
            showAddExtraTextDropOff,
            inputAfterAddingDropOff,
          },
          {
            ...state.initalInputsStatesForAddingExtraItems[1],
            showAddExtraTextPickUp: showAddExtraTextPickUpReturn,
            inputAfterAddingPickUp: inputAfterAddingPickUpReturn,
            showAddExtraTextDropOff: showAddExtraTextDropOffReturn,
            inputAfterAddingDropOff: inputAfterAddingDropOffReturn,
          },
        ],
      };
    }

    //?updating trasfer details page selected items values   and giing error for them

    //flightdetails faln onlari udpdate elyrk
    case UPDATE_SELECTED_ITEMS_INPUTS: {
      const {
        value,
        pickOrDrop,
        journeyType,
        nameOfInput,
        whichSelectedItem,
        categoryOfTheType,
        Id,
      } = action.payload;
      //flightCategory
      // console.log({
      //   value,
      //   pickOrDrop,
      //   journeyType,
      //   nameOfInput,
      //   whichSelectedItem,
      //   categoryOfTheType,
      //   Id,
      // });

      let pickUpTransferPoints = state?.reservations[0]?.selectedPickupPoints;
      let dropOfTransferPoints = state?.reservations[0]?.selectedDropoffPoints;

      let pickUpTransferPointsCopy =
        state?.reservationsTrDetailsPageErrors[0]?.selectedPickupPoints;
      let dropOfTransferPointsCopy =
        state?.reservationsTrDetailsPageErrors[0]?.selectedDropoffPoints;

      let pickUpReturnPoints = state?.reservations[1]?.selectedPickupPoints;
      let dropOfReturnPoints = state?.reservations[1]?.selectedDropoffPoints;

      let pickUpReturnPointsCopy =
        state?.reservationsTrDetailsPageErrors[1]?.selectedPickupPoints;
      let dropOfReturnPointsCopy =
        state?.reservationsTrDetailsPageErrors[1]?.selectedDropoffPoints;

      // console.log(value,"value");

      //*flight start
      //!transferin pickup ayarlamasi
      if (journeyType === 0 && pickOrDrop === 0 && categoryOfTheType === 1) {
        pickUpTransferPoints = pickUpTransferPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              flightDetails: {
                ...item?.flightDetails,
                [nameOfInput]: value,
              },
            }
            : item;
        });
        pickUpTransferPointsCopy = pickUpTransferPointsCopy?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              errorMessage:
                nameOfInput === "flightNumber" && value
                  ? ""
                  : item.errorMessage,
              flightDetails: {
                ...item.flightDetails,
                [nameOfInput]: value,
              },
              waitingTime:
                nameOfInput === "waitingPickupTime"
                  ? value.toString()
                  : "",
              waitingError: nameOfInput === "waitingPickupTime" && value.toString().length > 0
                ? ""
                : "required",
            }
            : item;
        });
      }
      //!transferin dropOff ayarlamasi
      //burda waiting numberi gizletdik cunki gelen jsonnan aldgmz deger 3 du
      if (journeyType === 0 && pickOrDrop === 1 && categoryOfTheType === 1) {
        dropOfTransferPoints = dropOfTransferPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              flightDetails: {
                ...item.flightDetails,
                ["flightNumber"]: value,
              },
            }
            : item;
        });
        dropOfTransferPointsCopy = dropOfTransferPointsCopy?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              flightDetails: {
                ...item.flightDetails,
                ["flightNumber"]: value,
              },
            }
            : item;
        });
      }

      //!return pick up ayarlamasi
      if (journeyType === 1 && pickOrDrop === 0 && categoryOfTheType === 1) {
        pickUpReturnPoints = pickUpReturnPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              flightDetails: {
                ...item.flightDetails,
                [nameOfInput]: value,
              },
            }
            : item;
        });
        pickUpReturnPointsCopy = pickUpReturnPointsCopy?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              errorMessage:
                nameOfInput === "flightNumber" && value
                  ? ""
                  : item.errorMessage,
              flightDetails: {
                ...item.flightDetails,
                [nameOfInput]: value,
              },
              waitingTime:
                nameOfInput === "waitingPickupTime"
                  ? value.toString()
                  : "",
              waitingError: nameOfInput === "waitingPickupTime" && value.toString().length > 0
                ? ""
                : "required",
            }
            : item;
        });

      }
      //!return drop off ayarlamasi
      if (journeyType === 1 && pickOrDrop === 1 && categoryOfTheType === 1) {
        dropOfReturnPoints = dropOfReturnPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              flightDetails: {
                ...item.flightDetails,
                ["flightNumber"]: value,
              },
            }
            : item;
        });

        dropOfReturnPointsCopy = dropOfReturnPointsCopy?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              flightDetails: {
                ...item.flightDetails,
                ["flightNumber"]: value,
              },
            }
            : item;
        });
      }
      //?flight finish

      //?start cruices /train/ RoomNumber / Place of interest //cities //universities //otthers(10)
      if (journeyType === 0 && pickOrDrop === 0 && categoryOfTheType === Id) {
        pickUpTransferPoints = pickUpTransferPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              [nameOfInput]: value,
            }
            : item;
        });
        pickUpTransferPointsCopy = pickUpTransferPointsCopy?.map((item, i) => {
          return i === whichSelectedItem
            ? //roomNumber
            {
              ...item,
              errorMessage:
                nameOfInput === "cruiseNumber"
                  ? ""
                  : item.errorMessage || nameOfInput === "roomNumber"
                    ? ""
                    : item.errorMessage,
              [nameOfInput]: value,
            }
            : item;
        });
      }
      if (journeyType === 0 && pickOrDrop === 1 && categoryOfTheType === Id) {
        dropOfTransferPoints = dropOfTransferPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              [nameOfInput]: value,
            }
            : item;
        });
        dropOfTransferPointsCopy = dropOfTransferPointsCopy?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              [nameOfInput]: value,
            }
            : item;
        });
      }
      if (journeyType === 1 && pickOrDrop === 0 && categoryOfTheType === Id) {
        pickUpReturnPoints = pickUpReturnPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              [nameOfInput]: value,
            }
            : item;
        });

        pickUpReturnPointsCopy = pickUpReturnPointsCopy?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              errorMessage:
                nameOfInput === "cruiseNumber"
                  ? ""
                  : item.errorMessage || nameOfInput === "roomNumber"
                    ? ""
                    : item.errorMessage,
              [nameOfInput]: value,
            }
            : item;
        });
      }
      if (journeyType === 1 && pickOrDrop === 1 && categoryOfTheType === Id) {
        dropOfReturnPoints = dropOfReturnPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              [nameOfInput]: value,
            }
            : item;
        });
        dropOfReturnPointsCopy = dropOfReturnPointsCopy?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              [nameOfInput]: value,
            }
            : item;
        });
      }
      //****

      //*postCodeStart
      if (journeyType === 0 && pickOrDrop === 0 && categoryOfTheType === 5) {
        pickUpTransferPoints = pickUpTransferPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,

              postCodeDetails: {
                ...item.postCodeDetails,
                id: value,
                postCodeAddress: nameOfInput,
              },
            }
            : item;
        });
        pickUpTransferPointsCopy = pickUpTransferPointsCopy?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              errorMessage: nameOfInput ? "" : item.errorMessage,
              postCodeDetails: {
                ...item.postCodeDetails,
                id: value,
                postCodeAddress: nameOfInput,
              },
            }
            : item;
        });
      }
      if (journeyType === 0 && pickOrDrop === 1 && categoryOfTheType === 5) {
        dropOfTransferPoints = dropOfTransferPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              postCodeDetails: {
                ...item.postCodeDetails,
                id: value,
                postCodeAddress: nameOfInput,
              },
            }
            : item;
        });
        dropOfTransferPointsCopy = dropOfTransferPointsCopy?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              errorMessage: nameOfInput ? "" : item.errorMessage,
              postCodeDetails: {
                ...item.postCodeDetails,
                id: value,
                postCodeAddress: nameOfInput,
              },
            }
            : item;
        });
      }

      if (journeyType === 1 && pickOrDrop === 0 && categoryOfTheType === 5) {
        pickUpReturnPoints = pickUpReturnPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              postCodeDetails: {
                ...item.postCodeDetails,
                id: value,
                postCodeAddress: nameOfInput,
              },
            }
            : item;
        });
        pickUpReturnPointsCopy = pickUpReturnPointsCopy?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              errorMessage: nameOfInput ? "" : item.errorMessage,
              postCodeDetails: {
                ...item.postCodeDetails,
                id: value,
                postCodeAddress: nameOfInput,
              },
            }
            : item;
        });
      }
      if (journeyType === 1 && pickOrDrop === 1 && categoryOfTheType === 5) {
        dropOfReturnPoints = dropOfReturnPoints?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              postCodeDetails: {
                ...item.postCodeDetails,
                id: value,
                postCodeAddress: nameOfInput,
              },
            }
            : item;
        });
        dropOfReturnPointsCopy = dropOfReturnPointsCopy?.map((item, i) => {
          return i === whichSelectedItem
            ? {
              ...item,
              errorMessage: nameOfInput ? "" : item.errorMessage,
              postCodeDetails: {
                ...item.postCodeDetails,
                id: value,
                postCodeAddress: nameOfInput,
              },
            }
            : item;
        });
      }
      //?fpostCOde finish

      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            selectedPickupPoints: pickUpTransferPoints,
            selectedDropoffPoints: dropOfTransferPoints,
          },
          {
            ...state.reservations[1],
            selectedPickupPoints: pickUpReturnPoints,
            selectedDropoffPoints: dropOfReturnPoints,
          },
        ],
        reservationsTrDetailsPageErrors: [
          {
            ...state.reservationsTrDetailsPageErrors[0],
            selectedPickupPoints: pickUpTransferPointsCopy,
            selectedDropoffPoints: dropOfTransferPointsCopy,
          },
          {
            ...state.reservationsTrDetailsPageErrors[1],
            selectedPickupPoints: pickUpReturnPointsCopy,
            selectedDropoffPoints: dropOfReturnPointsCopy,
          },
        ],
      };
    }
    //BURDA flight postcodes ve diger point type categorilere error atayrg
    case SET_ERROR_IN_TRANSFER_DETAILS_PAGE: {
      const { erMessage, jourrneyType, categoryOfError, whichSelectedItem } =
        action.payload;
      let pickUpTransferPoints =
        state.reservationsTrDetailsPageErrors[0]?.selectedPickupPoints;
      let dropOfTransferPoints =
        state.reservationsTrDetailsPageErrors[0]?.selectedDropoffPoints;

      //transferPickUp
      if (jourrneyType === "transfer" && categoryOfError === "flightCategory") {
        pickUpTransferPoints = pickUpTransferPoints?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 1
            ? {
              ...item,
              errorMessage: erMessage,
              flightDetails: {
                ...item.flightDetails,
                errorMessage: erMessage,
              },
            }
            : item;
        });
      }

      //transferPickUp
      if (jourrneyType === "transfer" && categoryOfError === "flightCategory_Waiting") {
        pickUpTransferPoints = pickUpTransferPoints?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 1
            ? {
              ...item,
              waitingError: erMessage ? erMessage : ""

            }
            : item;
        });
      }
      //!cruise start
      if (jourrneyType === "transfer" && categoryOfError === "cruise") {
        pickUpTransferPoints = pickUpTransferPoints?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 2
            ? {
              ...item,
              errorMessage: erMessage,
            }
            : item;
        });
      }
      //!cruise finish

      //!roomStart
      if (jourrneyType === "transfer" && categoryOfError === "roomNumber") {
        pickUpTransferPoints = pickUpTransferPoints?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 4
            ? {
              ...item,
              errorMessage: erMessage,
            }
            : item;
        });
      }

      //!roomFinish

      //*post statr
      if (jourrneyType === "transfer" && categoryOfError === "postCategory") {
        pickUpTransferPoints = pickUpTransferPoints?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 5
            ? {
              ...item,
              errorMessage: erMessage,
            }
            : item;
        });
      }
      if (
        jourrneyType === "transfertwo" &&
        categoryOfError === "postCategory"
      ) {
        dropOfTransferPoints = dropOfTransferPoints?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 5
            ? {
              ...item,
              errorMessage: erMessage,
            }
            : item;
        });
      }
      //*post finish

      return {
        ...state,
        reservationsTrDetailsPageErrors: [
          {
            ...state.reservationsTrDetailsPageErrors[0],
            selectedPickupPoints: pickUpTransferPoints,
            selectedDropoffPoints: dropOfTransferPoints,
          },
          {
            ...state.reservationsTrDetailsPageErrors[1],
          },
        ],
      };
    }

    case SET_ERROR_IN_RETURN_DETAILS_PAGE: {
      const { erMessage, jourrneyType, categoryOfError, whichSelectedItem } =
        action.payload;
      let pickUpReturnPoints =
        state.reservationsTrDetailsPageErrors[1]?.selectedPickupPoints;
      let dropOfReturnPoints =
        state.reservationsTrDetailsPageErrors[1]?.selectedDropoffPoints;
      //return pickuppoints

      if (jourrneyType === "return" && categoryOfError === "flightCategory") {
        pickUpReturnPoints = pickUpReturnPoints?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 1
            ? {
              ...item,
              errorMessage: erMessage,
              flightDetails: {
                ...item.flightDetails,
                errorMessage: erMessage,
              },
            }
            : item;
        });
      }
      if (jourrneyType === "return" && categoryOfError === "flightCategory_Waiting") {
        pickUpReturnPoints = pickUpReturnPoints?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 1
            ? {
              ...item,
              waitingError: erMessage ? erMessage : ""
            }
            : item;
        });
      }
      //!cruise start
      if (jourrneyType === "return" && categoryOfError === "cruise") {
        pickUpReturnPoints = pickUpReturnPoints?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 2
            ? {
              ...item,
              errorMessage: erMessage,
            }
            : item;
        });
      }

      if (jourrneyType === "return" && categoryOfError === "roomNumber") {
        pickUpReturnPoints = pickUpReturnPoints?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 4
            ? {
              ...item,
              errorMessage: erMessage,
            }
            : item;
        });
      }
      //!cruise finish

      //!post start
      if (jourrneyType === "return" && categoryOfError === "postCategory") {
        pickUpReturnPoints = pickUpReturnPoints?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 5
            ? {
              ...item,
              errorMessage: erMessage,
            }
            : item;
        });
      }
      if (jourrneyType === "returntwo" && categoryOfError === "postCategory") {
        dropOfReturnPoints = dropOfReturnPoints?.map((item, i) => {
          return i === whichSelectedItem && item.pcatId === 5
            ? {
              ...item,
              errorMessage: erMessage,
            }
            : item;
        });
      }
      //!post finish

      return {
        ...state,
        reservationsTrDetailsPageErrors: [
          {
            ...state.reservationsTrDetailsPageErrors[0],
          },
          {
            ...state.reservationsTrDetailsPageErrors[1],
            selectedPickupPoints: pickUpReturnPoints,
            selectedDropoffPoints: dropOfReturnPoints,
          },
        ],
      };
    }
    //!finishhh
    //

    //?updating passenger  details page values   and giving error for them
    case UPDATE_PASSENGER_DETAILS_FOR_BOTH_JOURNEY: {
      const { value, nameofInput, journeyType, selectAndRequest } =
        action.payload;
      const passTrDetails = state.reservations[0]?.passengerDetails;
      const passReturnDetails = state.reservations[1]?.passengerDetails;
      const checked = state.checked;
      let newValue = null;
      let returnValue = null;

      if (
        journeyType === 0 &&
        nameofInput !== "passengersNumber" &&
        nameofInput !== "specialRequests"
      ) {
        newValue = {
          ...passTrDetails,
          [nameofInput]: value,
        };
        if (checked) {
          returnValue = {
            ...passTrDetails,
            [nameofInput]: value,
          };
        }
      }

      if (
        journeyType === 1 &&
        nameofInput !== "passengersNumber" &&
        nameofInput !== "specialRequests"
      ) {
        returnValue = {
          ...passReturnDetails,
          [nameofInput]: value,
        };
      }
      //*

      //*
      //burda pax ve requwest ucun degerleri stora yazrg
      const paxTr = state.reservations[0]?.transferDetails;
      const paxReturn = state.reservations[1]?.transferDetails;
      //PASSENGERNUMBERS
      let newPaxValueForTr = null;
      let newPaxReturnValue = null;

      if (
        journeyType === 0 &&
        selectAndRequest &&
        nameofInput === "passengersNumber"
      ) {
        newPaxValueForTr = {
          ...paxTr,
          passengersNumber: value,
        };

        //burda ise transferde degisen passenger numberi return icine atyrq eger checked ise
        if (checked) {
          newPaxReturnValue = {
            ...paxReturn,
            passengersNumber: value,
          };
        }
      }

      if (
        journeyType === 0 &&
        selectAndRequest &&
        nameofInput === "specialRequests"
      ) {
        newPaxValueForTr = {
          ...paxTr,
          specialRequests: value,
        };
      }

      if (
        journeyType === 1 &&
        selectAndRequest &&
        nameofInput === "passengersNumber" &&
        !checked
      ) {
        newPaxReturnValue = {
          ...paxReturn,
          passengersNumber: value,
        };
      }
      if (
        journeyType === 1 &&
        selectAndRequest &&
        nameofInput === "specialRequests"
      ) {
        newPaxReturnValue = {
          ...paxReturn,
          specialRequests: value,
        };
      }
      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            passengerDetails: newValue ? newValue : passTrDetails,
            transferDetails: newPaxValueForTr ? newPaxValueForTr : paxTr,
          },
          {
            ...state.reservations[1],
            passengerDetails: returnValue ? returnValue : passReturnDetails,
            transferDetails: newPaxReturnValue ? newPaxReturnValue : paxReturn,
          },
        ],
      };
    }

    case SET_ERROR_FOR_PASSENGER_DETAILS: {
      const { erMessage, journeyType } = action.payload;
      let trFull = state.passenegerDetailsErrors[0].fullnameError;
      let trEmail = state.passenegerDetailsErrors[0].emailError;
      let trPhone = state.passenegerDetailsErrors[0].pgoneError;

      let returnFull = state.passenegerDetailsErrors[1].fullnameError;
      let returnEmail = state.passenegerDetailsErrors[1].emailError;
      let returnPhone = state.passenegerDetailsErrors[1].pgoneError;
      if (journeyType === 0) {
        trFull = erMessage;
        trEmail = erMessage;
        trPhone = erMessage;
      }
      if (journeyType === 1) {
        returnFull = erMessage;
        returnEmail = erMessage;
        returnPhone = erMessage;
      }
      return {
        ...state,
        passenegerDetailsErrors: [
          {
            ...state.passenegerDetailsErrors[0],
            fullnameError: trFull,
            emailError: trEmail,
            pgoneError: trPhone,
          },
          {
            ...state.passenegerDetailsErrors[1],
            fullnameError: returnFull,
            emailError: returnEmail,
            pgoneError: returnPhone,
          },
        ],
      };
    }
    //!finishhh

    case SET_ERROR_FOR_TRANSFER_DETAILS_PAGE: {
      return {
        ...state,
        trDetailsPageError: true,
      };
    }

    case SET_POST_CODE_ADRESSES: {
      let newpostcodeAdress = state.postCodeAdresses;

      if (action.payload?.length > 0) {
        newpostcodeAdress.push(...action.payload);
      } else {
        newpostcodeAdress.push(action.payload);
      }
      return {
        ...state,
        postCodeAdresses: newpostcodeAdress,
      };
    }

    case SET_PAYMENT: {
      const journeyType = state.params.journeyType;
      // console.log("SET_PAYMENT reducer");
      /*
 paymentType:
                action?.payload?.paymentType !== 1
                  ? action?.payload?.paymentType.toString()
                  :
                  action?.payload?.paymentType,
*/
      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            paymentDetails: {
              ...state.reservations[0].paymentDetails,
              token: action?.payload.token,
              paymentType: action?.payload?.paymentType,
            },
          },
          {
            ...state?.reservations[1],
            paymentDetails: {
              ...state.reservations[1]?.paymentDetails,
              token: action?.payload?.token,
              paymentType: action?.payload?.paymentType,
            },
          },
        ],
      };
    }

    //?Editings and savings
    case GET_DATAS_FOR_EDITING: {
      let newData = [
        {
          reservationDetails: {
            accountId: action?.payload[0]?.reservationDetails?.accountId,
            channelId: 225,
          },
          selectedPickupPoints: [...action?.payload[0]?.selectedPickupPoints],
          selectedDropoffPoints: [...action?.payload[0]?.selectedDropoffPoints],
          quotation: {
            token: action?.payload[0]?.quotation.token, //?  ??????whwre is token
            price: action?.payload[0]?.quotation?.price,
            carId: action?.payload[0]?.quotation?.carId,
          },
          transferDetails: {
            // transferDateTime:
            //   action?.payload[0]?.transferDetails?.transferDateTime,
            transferDateTimeString: new Date(
              action?.payload[0]?.transferDetails?.transferDateTime
            )
              .toISOString()
              .slice(0, 16)
              .replace("T", " "),
            pickupCategoryId:
              action?.payload[0]?.transferDetails?.pickupCategoryId,
            passengersNumber:
              action?.payload[0]?.transferDetails?.passengersNumber,
            passengerSuitcase:
              action?.payload[0]?.transferDetails?.passengerSuitcase,
            specialRequests:
              action?.payload[0]?.transferDetails?.specialRequests,
          },
          passengerDetails: {
            ...action.payload[0]?.passengerDetails,
            language: action.payload[0]?.passengerDetails?.language,
          },
          paymentDetails: {
            token: action.payload[0]?.paymentDetails?.token,
            paymentType: action.payload[0]?.paymentDetails?.paymentType,
            account: action.payload[0]?.paymentDetails?.account, //?shouldnt it be 225  ?
            price: action.payload[0].paymentDetails.price,
          },
        },
      ];
      // console.log(newData);

      return {
        ...state,
        reservations: newData,
        reservationsTrDetailsPageErrors: [
          {
            selectedPickupPoints: [...action.payload[0]?.selectedPickupPoints],
            selectedDropoffPoints: [
              ...action.payload[0]?.selectedDropoffPoints,
            ],
          },
        ],
        reservationsTrDetailsPageErrors: [
          {
            ...state.reservationsTrDetailsPageErrors[0],
            selectedPickupPoints: [
              ...action.payload[0]?.selectedPickupPoints,
            ]?.map((item) => {
              // console.log(item?.flightDetails?.flightNumber?.length);

              return (item?.pcatId === 1 &&
                item.flightDetails.flightNumber.length === 0) ||
                (item.pcatId === 2 && item.cruiseNumber).length === 0 ||
                (item.pcatId === 5 &&
                  item.postCodeDetails?.postCodeAddress?.length === 0)
                ? { ...item, errorMessage: "required" }
                : { ...item, errorMessage: "" };
            }),
            selectedDropoffPoints: [
              ...action.payload[0]?.selectedDropoffPoints,
            ]?.map((item) => {
              return item.pcatId === 5 &&
                item.postCodeDetails?.postCodeAddress?.length === 0
                ? { ...item, errorMessage: "required" }
                : { ...item, errorMessage: "" };
            }),
          },
        ],
        checked: false,
        initalInputsStatesForAddingExtraItems: [
          {
            showAddExtraTextPickUp: true,
            inputAfterAddingPickUp: false,
            showAddExtraTextDropOff: true,
            inputAfterAddingDropOff: false,
          },
          {
            showAddExtraTextPickUp: true,
            inputAfterAddingPickUp: false,
            showAddExtraTextDropOff: true,
            inputAfterAddingDropOff: false,
          },
        ],
        allDatasHandled: true,
      };
    }

    // ?passenger values
    case EDIT_SAVE_TRANSFER_PASSENGER_VALUES: {
      const { phone, email, passengersNumber, firstname } = action.payload;
      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            passengerDetails: {
              ...state.reservations[0]?.passengerDetails,
              firstname,
              email,
              phone,
            },
            transferDetails: {
              ...state.reservations[0]?.transferDetails,
              passengersNumber,
            },
          },
        ],
      };
    }

    // ?passenger values

    case EDIT_SAVE_SPECIAL_REQUESTS_TR: {
      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            transferDetails: {
              ...state.reservations[0].transferDetails,
              specialRequests: action.payload?.specialRequests,
            },
          },
        ],
      };
    }
    //*textArer

    //*textArerFinis

    // *ucuslar postcodlar
    case CANCEL__TRANSFER_JOURNEY_EDITING: {
      //  let newData = [
      //    {

      //      selectedPickupPoints: [
      //        ...action?.payload[0]?.selectedPickupPoints,
      //      ],
      //      selectedDropoffPoints: [
      //        ...action?.payload[0]?.selectedDropoffPoints,
      //      ],
      //      quotation: {
      //        token: "",
      //        price: action?.payload[0]?.quotation?.price,
      //        carId: action?.payload[0]?.quotation?.carId,
      //      },
      //      transferDetails: {
      //        transferDateTime:
      //          action?.payload[0]?.transferDetails?.transferDateTime,
      //        transferDateTimeString: new Date(
      //          action?.payload[0]?.transferDetails?.transferDateTime
      //        )
      //          .toISOString()
      //          .slice(0, 16)
      //          .replace("T", " "),
      //        pickupCategoryId:
      //          action?.payload[0]?.transferDetails?.pickupCategoryId,
      //         //  *cunki passnegers numbers daha onceden save olunmus olacag
      //        passengersNumber:
      //          state?.reservations[0]?.transferDetails?.passengersNumber,
      //        passengerSuitcase:
      //          action?.payload[0]?.transferDetails?.passengerSuitcase,
      //        specialRequests:
      //          action?.payload[0]?.transferDetails?.specialRequests,
      //      },
      //      passengerDetails: {
      //        ...state.reservations[0]?.passengerDetails,
      //        language: action.payload[0]?.passengerDetails?.language,
      //      },
      //      paymentDetails: {
      //        token: "",
      //        paymentType: action.payload[0]?.paymentDetails?.paymentType,
      //      },
      //    },
      //  ];
      let reservations = [];
      let reservationsTrDetailsPageErrors = [];
      // console.log(
      //   action?.payload?.quotation?.price,
      //   "action?.payload?.quotation?.price"
      // );

      reservations = [
        {
          ...state.reservations[0],
          selectedPickupPoints: [...action?.payload?.selectedPickupPoints],
          selectedDropoffPoints: [...action?.payload?.selectedDropoffPoints],
          quotation: {
            token: "",
            price: action?.payload?.quotation?.price,
            carId: action?.payload?.quotation?.carId,
          },
          transferDetails: {
            transferDateTime:
              action?.payload?.transferDetails?.transferDateTime,
            transferDateTimeString: new Date(
              action?.payload?.transferDetails?.transferDateTime
            )
              .toISOString()
              .slice(0, 16)
              .replace("T", " "),
            pickupCategoryId:
              action?.payload?.transferDetails?.pickupCategoryId,
            //  *cunki passnegers numbers daha onceden save olunmus olacag
            passengersNumber:
              state?.reservations[0]?.transferDetails?.passengersNumber,
            passengerSuitcase:
              action?.payload?.transferDetails?.passengerSuitcase,
            specialRequests:
              state?.reservations[0]?.transferDetails.specialRequests,
          },
          passengerDetails: {
            ...state.reservations[0]?.passengerDetails,
            language: action.payload?.passengerDetails?.language,
          },
          paymentDetails: {
            token: action.payload?.paymentDetails?.token,
            account: action.payload?.paymentDetails?.account, //?should
            paymentType: action.payload?.paymentDetails?.paymentType,
          },
        },
      ];
      reservationsTrDetailsPageErrors = [
        {
          selectedPickupPoints: [...action.payload.selectedPickupPoints],
          selectedDropoffPoints: [...action.payload.selectedDropoffPoints],
        },
      ];

      return {
        ...state,
        reservations: reservations,
        reservationsTrDetailsPageErrors: reservationsTrDetailsPageErrors,
      };
    }

    // *ucuslar postcodlar

    //!finishhh

    case SET_MODAL_INFO: {
      return {
        ...state,
        modalInfo: action.payload,
      };
    }

    case GET_MEET_POINT: {
      return {
        ...state,
        meetPoint: action.payload,
      };
    }
    case GET_VALUES_FROM_ARTICLES: {
      const { preSelectedPickupPoint, preSelectedDropoffPoint, dateTime } =
        action.payload;

      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            selectedPickupPoints: [...preSelectedPickupPoint],
            selectedDropoffPoints: [...preSelectedDropoffPoint],
            transferDetails: {
              ...state.reservations[0].transferDetails,
              transferDateTimeString: dateTime,
            },
          },
          {
            ...state.reservations[1],
          },
        ],
        reservationsTrDetailsPageErrors: [
          {
            ...state.reservationsTrDetailsPageErrors[0],
            selectedPickupPoints: [...preSelectedPickupPoint],
            selectedDropoffPoints: [...preSelectedDropoffPoint],
          },
          {
            ...state.reservationsTrDetailsPageErrors[1],
            selectedPickupPoints: [],
            // collected dropoff point(s) from /api/v1/suggestion API End Point
            selectedDropoffPoints: [],
          },
        ],
      };
    }

    //BUNU KULLANMADIK
    case RESET_RESERVATION: {
      return {
        ...state,
        reservations: [
          {
            reservationDetails: {
              channelId: 5,
              accountId: 225,
            },
            selectedPickupPoints: [],
            selectedDropoffPoints: [],
            quotation: {},
            transferDetails: {
              // transferDateTime: getDateTimeFromFormat(
              // dateTimeStringFunc(),
              // "yyyy-mm-dd HH:MM",
              // "Europe/London"
              // ),
              transferDateTimeString: dateTimeStringFunc(),
              pickupCategoryId: "",
              passengersNumber: 1,
              passengerSuitcase: 1,
              specialRequests: "",
            },
            passengerDetails: {
              token: "",
              lastname: "",
              language: "en",
              firstname: "",
              email: "",
              phone: "",
            },
            paymentDetails: {
              token: "",
              paymentType: "",
              account: 225,
            },
          },
          {
            reservationDetails: {
              channelId: 5,
              accountId: 225,
            },
            selectedPickupPoints: [],
            selectedDropoffPoints: [],
            quotation: {},
            transferDetails: {
              // transferDateTime: getDateTimeFromFormat(
              // dateTimeStringFuncForReturn(),
              // "yyyy-mm-dd HH:MM",
              // "Europe/London"
              // ),
              transferDateTimeString: dateTimeStringFuncForReturn(),
              pickupCategoryId: "",
              passengersNumber: 1,
              passengerSuitcase: 1,
              specialRequests: "",
            },
            passengerDetails: {
              token: "",
              lastname: "",
              language: "en",
              firstname: "",
              email: "",
              phone: "",
            },
            paymentDetails: {
              token: "",
              paymentType: "",
              account: 225,
            },
          },
        ],
        reservationsTrDetailsPageErrors: [
          {
            ...state.reservationsTrDetailsPageErrors[0],
            selectedPickupPoints: [],
            selectedDropoffPoints: [],
          },
          {
            ...state.reservationsTrDetailsPageErrors[1],
            selectedPickupPoints: [],
            // collected dropoff point(s) from /api/v1/suggestion API End Point
            selectedDropoffPoints: [],
          },
        ],
      };
    }

    case SET_INITIAL_MANAGE_BOOKING_PRICE_FOR_QUOTATION_DIFFERENCE: {
      return {
        ...state,
        reservations: [
          {
            ...state?.reservations[0],
            quotation: {
              ...state?.reservations[0].quotation,
              price: String(action.payload),
            },
          },
          { ...state?.reservations[1] },
        ],
      };
    }

    case SET_INITIAL_PRICE_IF_CANCELED: {
      // console.log(action.payload, "reducer");

      return {
        ...state,
        reservations: [
          {
            ...state?.reservations[0],
            quotation: {
              ...state?.reservations[0].quotation,
              price: action.payload,
            },
          },
          { ...state?.reservations[1] },
        ],
      };
    }

    case RESERVATION_TOKEN_UPDATED: {
      return {
        ...state,
        reservations: [
          {
            ...state?.reservations[0],
            paymentDetails: {
              ...state.reservations[0].paymentDetails,
              token: action.payload,
            },
          },
          { ...state?.reservations[1] },
        ],
      };
    }

    case SET_NEW_CURRENT_QUOTATION: {
      const { quotation, journeyType } = action.payload;
      console.log(quotation, "redurrrecerererer");

      return {
        ...state,
        reservations: [
          {
            ...state.reservations[0],
            quotation: {
              ...quotation,
              token: quotation[0].token,
              price: quotation[0].price,
              carId: quotation[0].carId,
            },
            // transferDetails: {
            //   ...state.reservations[0].transferDetails,
            //   pickupCategoryId:
            //     pickUpsTr.length > 0 ? pickUpsTr[0]?.pcatId : "",
            // },
            // paymentDetails: {
            //   ...state.reservations[0].paymentDetails,
            //   price: Number(newQuotationTransfer?.price),
            // },
          },
          {
            ...state.reservations[1],
          },
        ],
      };
    }

    default:
      return state;
  }
};

//  reservations: [
//         {
//           ...state.reservations[0],
//           transferDetails: {
//             ...state.reservations[0].transferDetails,
//             transferDateTimeString: tranferDatatime,
//             // transferDateTime:
//             //   journeyType === 0
//             //     ? getDateTimeFromFormat(
//             //         tranferDatatime,
//             //         "yyyy-mm-dd HH:MM",
//             //         "Europe/London"
//             //       )
//             //     : state.reservations[0].transferDetails.transferDateTime,
//           },
//         },
//         {
//           ...state.reservations[1],
//           transferDetails: {
//             ...state.reservations[1].transferDetails,
//             transferDateTimeString: returnDatatime,
//             // transferDateTime:
//             //   journeyType === 0
//             //     ? getDateTimeFromFormat(
//             //         returnDatatime,
//             //         "yyyy-mm-dd HH:MM",
//             //         "Europe/London"
//             //       )
//             //     : state.reservations[0].transferDetails.transferDateTime,
//           },
//         },
//       ],
/*
new version

    case SET_PAYMENT: {
      const journeyType = state.params.journeyType;
      console.log(journeyType);

      let reservations = [];
      if (journeyType === 0) {
        reservations = [
          {
            ...state.reservations[0],
            paymentDetails: {
              ...state.reservations[0].paymentDetails,
              token: action?.payload.token,
              paymentType: action?.payload?.paymentType,
            },
          },
        ];

        // console.log(reservations);
      }

      if (journeyType === 1) {
        reservations = [
          {
            ...state.reservations[0],
            paymentDetails: {
              ...state.reservations[0].paymentDetails,
              token: action?.payload.token,
              paymentType: action?.payload?.paymentType,
            },
          },
          {
            ...state.reservations[1],
            paymentDetails: {
              ...state.reservations[1].paymentDetails,
              token: action?.payload.token,
              paymentType: action?.payload?.paymentType,
            },
          },
        ];
      }
      return {
        ...state,
        reservations: reservations,
      };
    }
*/
