import env from "../../resources/env";
import {
  FETCH_LOCATIONS_FAILURE,
  FETCH_LOCATIONS_REQUEST,
  FETCH_LOCATIONS_SUCCESS,
  GET_APP_DATA,
  SET_SEARCH_ENGINE_VALUE,
  SWITCH_JOURNEY,
  RESET_DATA,
  ADD_ITEM_TO_SELECTED_LIST,
  DELETE_ITEM_FROM_SELECTED_LIST,
  SET_DATE_TIME,
  SET_HOUR_AND_MINUTE,
  SET_PARAMS,
  SET_QUOTATION,
  ADD_EXTRA_INPUT_FOR_JOURNEY,
  GET_TRANSFER_QUOTATIONS,
  GET_RETURN_QUOTATIONS,
  GET_QUOT_TRANSFER_ERROR,
  GET_TRANSFER_QUOT_REQUEST,
  GET_RETURN_QUOT_REQUEST,
  UPDATE_SELECTED_ITEMS_INPUTS,
  SET_ERROR_IN_TRANSFER_DETAILS_PAGE,
  SET_ERROR_IN_RETURN_DETAILS_PAGE,
  UPDATE_PASSENGER_DETAILS_FOR_BOTH_JOURNEY,
  CHECKED_INPUT_FOR_RETURN,
  SET_ERROR_FOR_PASSENGER_DETAILS,
  GET_BOTH_TOGETHER_QUOT_REQUEST,
  GET_BOTH_TOGETHER_QUOTATIONS,
  GET_BOTH_TOGETHER_ERROR_QUOT,
  SET_POST_CODE_ADRESSES,
  GET_PAYMENT_DATA,
  SET_PAYMENT,
  GET_DATAS_FOR_EDITING,
  EDIT_SAVE_TRANSFER_PASSENGER_VALUES,
  CANCEL__TRANSFER_JOURNEY_EDITING,
  IF_HAS_BOOKED_INSIDE_QUOTATION_PAGE,
  GET_RETURN_ERROR_QUOT,
} from "./pickUpDropTypes";

export const updateSearchValue =
  (inpValue, index, journeyType) => (dispatch) => {
    dispatch({
      type: SET_SEARCH_ENGINE_VALUE,
      payload: {
        inpValue,
        index,
        journeyType,
      },
    });
  };

export const collectPickUpPoints =
  (inpValue, index, journeyType) => (dispatch, getState) => {
    const {
      pickUpDropOffReducer: {
        cookies: { sessionToken },
      },
    } = getState();
    dispatch({
      type: FETCH_LOCATIONS_REQUEST,
      payload: { journeyType, index },
    });
    const url = `${env.apiDomain}/api/v1/suggestions`;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        value: inpValue,
        "session-token": `${sessionToken ? sessionToken : ""}`,
      }),
    };
    fetch(url, config)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: FETCH_LOCATIONS_SUCCESS,
          payload: {
            data,
            index,
            inpValue,
            journeyType,
          },
        });
        // console.log(data);
      })
      .catch((error) => {
        dispatch({
          type: FETCH_LOCATIONS_FAILURE,
          payload: { errorMessage: error.message, index },
        });
      });
  };
//Make Request for google places .This action was triggeren inside HanndleSearchResults
//we r also  cleaning input after selecting one item
export const addItemToSelectedList =
  (requestBody, pickOrDrop, journeyType, objectDetails) => (dispatch) => {
    const url = `${env.apiDomain}/api/v1/google-places`;
    let index = pickOrDrop === "pickupPoints" ? 0 : 1;
    //request for google place and add item to the list
    if (requestBody.pcatId === 10) {
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ point: requestBody }),
      };
      fetch(url, config)
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);

          dispatch({
            type: ADD_ITEM_TO_SELECTED_LIST,
            payload: {
              data: data?.point,
              index,
              journeyType,
              objectDetails,
            },
          });
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (requestBody.pcatId === 5) {
      //?transfer details icin post coda uygun adresleri getiririk
      const url = `${env.apiDomain}/api/v1/postcode-address`;
      const config = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          postcodes: [requestBody.postcode],
        }),
      };
      fetch(url, config)
        .then((res) => res.json())
        .then((data) => {
          dispatch({ type: SET_POST_CODE_ADRESSES, payload: data.results[0] });
        })
        .catch((error) => {
          console.log(error);
        });
      // add item to the list directly
      dispatch({
        type: ADD_ITEM_TO_SELECTED_LIST,
        payload: {
          data: requestBody,
          index,
          journeyType,
          objectDetails,
        },
      });
    } else {
      // add item to the list directly
      dispatch({
        type: ADD_ITEM_TO_SELECTED_LIST,
        payload: {
          data: requestBody,
          index,
          journeyType,
          objectDetails,
        },
      });
    }
  };
export const deleteItemFromList =
  (item, index, journeyType, indexOfCurrentItem) => (dispatch) => {
    dispatch({
      type: DELETE_ITEM_FROM_SELECTED_LIST,
      payload: { item, index, journeyType, indexOfCurrentItem },
    });
  };

export const setDataTime =
  (dateValue, pickupOrDropOrDate, journeyType) => (dispatch) => {
    //here we wiil not touch to index becase it is obvious that when journey type zero it means that it is transferdetails
    dispatch({
      type: SET_DATE_TIME,
      payload: { dateValue, pickupOrDropOrDate, journeyType },
    });
  };

export const setHourAndMinute =
  (valueOfHourOrMinute, transferOrReturn) => (dispatch) => {
    dispatch({
      type: SET_HOUR_AND_MINUTE,
      payload: { valueOfHourOrMinute, transferOrReturn },
    });
    // console.log(valueOfHourOrMinute, transferOrReturn);
  };

//SET APRAMS IT IS ASSINGING error message inside field
export const setParamsError =
  (message, pickOrDrop, journeyType, dateTimeForBoolean = false) =>
    (dispatch) => {
      dispatch({
        type: SET_PARAMS,
        payload: { message, pickOrDrop, journeyType, dateTimeForBoolean },
      });
    };

export const gettingQuotations =
  (router, journeyType, updateInsideQuotation) => (dispatch, getState) => {
    const { pickUpDropOffReducer: { reservations }, } = getState();
    //transfer
    let trSelectedPickPoints = reservations[0]?.selectedPickupPoints;
    let trSelectedDroppPoints = reservations[0]?.selectedDropoffPoints;
    let transferDAteTimeString =
      reservations[0]?.transferDetails?.transferDateTimeString;

    //return
    let returnPickPoints = reservations[1]?.selectedPickupPoints;
    let returnDroppPoints = reservations[1]?.selectedDropoffPoints;
    let returnDAteTimeString =
      reservations[1]?.transferDetails?.transferDateTimeString;

    const url = `${env.apiDomain}/api/v1/quotation`;
    const configTransfer = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedPickupPoints: trSelectedPickPoints,
        selectedDropoffPoints: trSelectedDroppPoints,
        transferDateTimeString: transferDAteTimeString,
      }),
    };
    const configReturn = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        selectedPickupPoints: returnPickPoints,
        selectedDropoffPoints: returnDroppPoints,
        transferDateTimeString: returnDAteTimeString,
      }),
    };
    //!
    //sadece disardan home pageden isteg gondererse calisir Transfer
    if (journeyType === 0 && !updateInsideQuotation.updateInsideQuotation) {
      dispatch({ type: GET_TRANSFER_QUOT_REQUEST, payload: "", });
      fetch(url, configTransfer)
        .then((res) => res.json())
        .then((data) => {

          if (data.status === 200) {
            if (router) {
              dispatch({ type: GET_TRANSFER_QUOTATIONS, payload: { data, }, });
              router?.push("/quotation");
            }
          } else {
            dispatch({ type: GET_QUOT_TRANSFER_ERROR, payload: { errorMessage: data?.error?.global[0] }, });
            setTimeout(() => {
              dispatch({ type: GET_QUOT_TRANSFER_ERROR, payload: { errorMessage: "" }, });

            }, 4000)
          }
        })
        .catch((error) => {
          dispatch({ type: GET_QUOT_TRANSFER_ERROR, payload: { errorMessage: error.message }, });
        });
    }
//!
    //sadece disardan return ile istek gondererse Ikisi icinde calisdiririq
    if (journeyType === 1 && !updateInsideQuotation.updateInsideQuotation) {
      dispatch({ type: GET_BOTH_TOGETHER_QUOT_REQUEST, payload: "" });
      Promise.all([fetch(url, configTransfer), fetch(url, configReturn)])
        .then(function (responses) {
          // Get a JSON object from each of the responses
          return Promise.all(
            responses.map(function (response) {
              return response.json();
            })
          );
        })
        .then(function (data) {
          console.log(data);

          // Log the data to the console
          // You would do something with both sets of data here
          if (data[0].status === 200 && data[1].status === 200) {
            dispatch({ type: GET_BOTH_TOGETHER_QUOTATIONS, payload: { trQuots: data[0], retrunQuots: data[1], }, });
            if (router) { router?.push("/quotation"); }
          }
          if (data[0].status !== 200 && data[0]?.error?.global[0]) {
            dispatch({ type: GET_BOTH_TOGETHER_ERROR_QUOT, payload: { errorMessage: data[0]?.error?.global[0] } });
            setTimeout(() => {
              dispatch({ type: GET_QUOT_TRANSFER_ERROR, payload: { errorMessage: "" }, });

            }, 4000)
          }
          if (data[1].status !== 200 && data[1]?.error?.global[0]) {
            dispatch({ type: GET_BOTH_TOGETHER_ERROR_QUOT, payload: { errorMessage: data[1]?.error?.global[0] } });
            setTimeout(() => {
              dispatch({ type: GET_QUOT_TRANSFER_ERROR, payload: { errorMessage: "" }, });

            }, 4000)

          }


        })
        .catch(function (error) {
          dispatch({ type: GET_BOTH_TOGETHER_ERROR_QUOT, payload: { errorMessage: error.message } });
          console.log(error);
        });
    }

    //!inside quotation pageden request ederse
    //fo tr
    //!
    if (updateInsideQuotation.updateInsideQuotation && journeyType === 0) {
      console.log("calisiyorum for transfer");

      dispatch({ type: GET_TRANSFER_QUOT_REQUEST, payload: "", });
      fetch(url, configTransfer)
        .then((res) => res.json())
        .then((data) => {
console.log(data);
          if (data.status === 200) {
            dispatch({ type: GET_TRANSFER_QUOTATIONS, payload: { data, }, });
          } else {
            dispatch({ type: GET_QUOT_TRANSFER_ERROR, payload: { errorMessage: data?.error?.global[0] }, });
            dispatch({ type: "IF_HAS_BOOKED_INSIDE_QUOTATION_PAGE_TRANSFER" });
          }
        })
        .catch((error) => {
          dispatch({ type: GET_QUOT_TRANSFER_ERROR, payload: { errorMessage: error.message }, });
        });
    }

    // for rt
    if (updateInsideQuotation.updateInsideQuotation && journeyType === 1) {
      console.log("calisiyorum for rt");

      dispatch({ type: GET_RETURN_QUOT_REQUEST, payload: "", });
      fetch(url, configReturn)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.status === 200) {

            dispatch({ type: GET_RETURN_QUOTATIONS, payload: { data, }, });
          } else {
            dispatch({ type: GET_RETURN_ERROR_QUOT, payload: { errorMessage: data?.error?.global[0] }, });
            dispatch({ type: "IF_HAS_BOOKED_INSIDE_QUOTATION_PAGE_RETURN" });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

export const setQuotation = (quotation, journeyType) => (dispatch) => {
  dispatch({ type: SET_QUOTATION, payload: { quotation, journeyType } });
};
//words cartypes categorytypes ...
export const getAppData = () => (dispatch) => {
  const url = `${env.apiDomain}/app/en`;
  const config = {
    method: "GET",
  };
  fetch(url, config)
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: GET_APP_DATA, payload: data });
    })
    .catch((error) => {
      console.log(error);
    });

  //getting all payment types
  //
  const urlPaymentTypes = `${env.apiDomain}/api/v1/payment-types`;
  fetch(urlPaymentTypes, config)
    .then((res) => res.json())
    .then((data) => {
      dispatch({ type: GET_PAYMENT_DATA, payload: data });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const resetData = () => (dispatch) => {
  dispatch({ type: RESET_DATA });
};

export const switchJourneyType = (journeyType) => (dispatch) => {
  dispatch({ type: SWITCH_JOURNEY, payload: journeyType });
};

export const changeCheckedInput = () => (dispatch) => {
  dispatch({ type: CHECKED_INPUT_FOR_RETURN });
};

export const addExtraInputForJourney =
  (pickOrDrop, journeyType, whereFuncComes) => (dispatch) => {
    dispatch({
      type: ADD_EXTRA_INPUT_FOR_JOURNEY,
      payload: { pickOrDrop, journeyType, whereFuncComes },
    });
  };

//

//?updating trasfer details page selected items values   and giing error for them
export const updateTransferDetailsInput =
  (
    value,
    pickOrDrop,
    journeyType,
    nameOfInput,
    whichSelectedItem,
    categoryOfTheType,
    Id
  ) =>
    (dispatch) => {
      console.log({
        value,
        pickOrDrop,
        journeyType,
        nameOfInput,
        whichSelectedItem,
        categoryOfTheType,
        Id
      });

      dispatch({
        type: UPDATE_SELECTED_ITEMS_INPUTS,
        payload: {
          value,
          pickOrDrop,
          journeyType,
          nameOfInput,
          whichSelectedItem,
          categoryOfTheType,
          Id,
        },
      });
    };

export const setErrorInTransferDetailsPage =
  (erMessage, jourrneyType, categoryOfError, router, whichSelectedItem) =>
    (dispatch) => {
      dispatch({
        type: SET_ERROR_IN_TRANSFER_DETAILS_PAGE,
        payload: {
          erMessage,
          jourrneyType,
          categoryOfError,
          whichSelectedItem,
        },
      });
    };

export const setErorReturnDetailsPage =
  (erMessage, jourrneyType, categoryOfError, whichSelectedItem) =>
    (dispatch) => {
      dispatch({
        type: SET_ERROR_IN_RETURN_DETAILS_PAGE,
        payload: {
          erMessage,
          jourrneyType,
          categoryOfError,
          whichSelectedItem,
        },
      });
    };

//?updating passenger  details page values   and giving error for them
export const updatePassDetailsForBothJourney =
  (value, nameofInput, journeyType, selectAndRequest = false) =>
    (dispatch) => {
      dispatch({
        type: UPDATE_PASSENGER_DETAILS_FOR_BOTH_JOURNEY,
        payload: {
          value,
          nameofInput,
          journeyType,
          selectAndRequest,
        },
      });
    };

export const setErrorForPassengerDetails =
  (erMessage, journeyType) => (dispatch) => {
    dispatch({
      type: SET_ERROR_FOR_PASSENGER_DETAILS,
      payload: {
        erMessage,
        journeyType,
      },
    });
  };

//!odo finish ****

//Payment
export const setPayment = (id, token, router) => (dispatch, getState) => {
  let payment;
  let paymentPagePath;
  const {
    pickUpDropOffReducer: { paymentTypes },
  } = getState();

  if (id === 1) {
    payment = paymentTypes.filter((payment) => payment.id === id)[0]?.pagePath;
    paymentPagePath = JSON.parse(payment)?.path;
  }

  dispatch({ type: SET_PAYMENT, payload: { token, paymentType: id } });

  if (id === 1) {
    router?.push(`${paymentPagePath}`);
  }

  if (id === 7) {
    router?.push(`/reservations-document`);
  }
  if (id === 6) {
    router?.push(`/reservations-document`);
  }
};
/*



*/
/*
  const {
    pickUpDropOffReducer: { paymentTypes },
  } = getState();

  let paymentPagePath = JSON.parse(
    paymentTypes.filter((payment) => payment.id === id)[0].pagePath
  ).path;

  let paymentType = "";
  let token = "";
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      quotations: [],
      type: id,
      language: "en",
      passengerEmail: "info@aplcars.com",
      mode: "sandbox",
    }),
  };

  dispatch({ type: SET_PAYMENT, payload: { token, paymentType } });


*/

// * EDITINGS ITEMSSSS
export const getAllDatasForEditing = (datas) => (dispatch) => {
  //transfer
  let trSelectedPickPoints = datas[0]?.selectedPickupPoints;
  let trSelectedDroppPoints = datas[0]?.selectedDropoffPoints;
  let transferDAteTimeString =
    datas[0]?.transferDetails?.transferDateTimeString;
  //!operation for postcodes
  let allTogetherForGetPostCode = [];
  if (datas?.length > 1) {
    allTogetherForGetPostCode = [
      ...trSelectedDroppPoints,
      ...trSelectedPickPoints,
    ];
  }

  let postCodes = [];
  allTogetherForGetPostCode?.map((item) => {
    if (item.pcatId === 5) {
      postCodes.push(item.postcode);
    }
  });

  if (postCodes?.length > 0) {
    // ?transfer details icin post coda uygun adresleri getiririk
    const url = `${env.apiDomain}/api/v1/postcode-address`;
    const config = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postcodes: postCodes,
      }),
    };
    fetch(url, config)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: SET_POST_CODE_ADRESSES,
          payload: data.results,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // Getting Guotations
  const url = `${env.apiDomain}/api/v1/quotation`;
  const configTransfer = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      selectedPickupPoints: trSelectedPickPoints,
      selectedDropoffPoints: trSelectedDroppPoints,
      transferDateTimeString: new Date(
        datas[0]?.transferDetails?.transferDateTime
      )
        .toISOString()
        .slice(0, 16)
        .replace("T", " "),
    }),
  };

  if (datas?.length === 1) {
    dispatch({
      type: GET_TRANSFER_QUOT_REQUEST,
      payload: "",
    });
    fetch(url, configTransfer)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        // console.log("data");

        dispatch({
          type: GET_TRANSFER_QUOTATIONS,
          payload: {
            data,
          },
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_QUOT_TRANSFER_ERROR,
          payload: { errorMessage: error.message },
        });
      });
  }

  dispatch({
    type: GET_DATAS_FOR_EDITING,
    payload: datas,
  });
};

export const editSaveTransferPassenger =
  (phone, email, firstname, passengersNumber) => (dispatch) => {
    dispatch({
      type: EDIT_SAVE_TRANSFER_PASSENGER_VALUES,
      payload: { phone, email, firstname, passengersNumber },
    });
  };

// export const calcelTransferJourneyEditing =
//   (PickUpPointsOneWayCopy, DroopOffPointsOneWayCopy, reservations) =>
//   (dispatch) => {
//     dispatch({
//       type: CANCEL__TRANSFER_JOURNEY_EDITING,
//       payload: {
//         PickUpPointsOneWayCopy,
//         DroopOffPointsOneWayCopy,
//         reservations,
//       },
//     });
//   };
// !finishhhhhhhhhh
/*

*/
