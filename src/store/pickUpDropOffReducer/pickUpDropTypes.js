//FETCHING REQUEST AND GETTING SUGGESTIONS
export const FETCH_LOCATIONS_REQUEST = " FETCH_LOCATIONS_REQUEST";
export const FETCH_LOCATIONS_SUCCESS = "FETCH_LOCATIONS_SUCCESS";
export const FETCH_LOCATIONS_FAILURE = "FETCH_LOCATIONS_FAILURE";

//ading item to the list
export const ADD_ITEM_TO_SELECTED_LIST = "ADD_ITEM_TO_SELECTED_LIST";
export const DELETE_ITEM_FROM_SELECTED_LIST = "DELETE_ITEM_FROM_SELECTED_LIST";

//getting all app datas which cars   =>    /app/en
export const GET_APP_DATA = "GET_APP_DATA";
export const GET_PAYMENT_DATA = "GET_PAYMENT_DATA";
//settting serach engine and updating values inside reducer
export const SET_SEARCH_ENGINE_VALUE = "SET_SEARCH_ENGINE_VALUE";

//swithing types of journey
export const SWITCH_JOURNEY = "SWITCH_JOURNEY";

//RESET DATAS WHENVER I WILL FOCUS OUTSIDE OF INPUT
export const RESET_DATA = "RESET_DATA";

//setting datetime hour minute
export const SET_DATE_TIME = "SET_DATE_TIME";
export const SET_HOUR_AND_MINUTE = "SET_HOUR_AND_MINUTE";

//set params it is about error messages
export const SET_PARAMS = "SET_PARAMS";

//getting quatations
export const GET_QUOTATIONS_REQUEST = "GET_QUOTATIONS_REQUEST";
export const GET_QUOTATIONS_ERROR = "GET_QUOTATIONS_ERROR";

export const GET_TRANSFER_QUOT_REQUEST = "GET_TRANSFER_QUOT_REQUEST";
export const GET_TRANSFER_QUOTATIONS = "GET_TRANSFER_QUOTATIONS";
export const GET_QUOT_TRANSFER_ERROR = "GET_QUOT_TRANSFER_ERROR";

export const GET_BOTH_TOGETHER_QUOTATIONS = "GET_BOTH_TOGETHER_QUOTATIONS";
export const GET_BOTH_TOGETHER_QUOT_REQUEST = "GET_BOTH_TOGETHER_QUOT_REQUEST";
export const GET_BOTH_TOGETHER_ERROR_QUOT = "GET_BOTH_TOGETHER_ERROR_QUOT";

export const GET_RETURN_QUOTATIONS = "GET_RETURN_QUOTATIONS";
export const GET_RETURN_QUOT_REQUEST = "GET_RETURN_QUOT_REQUEST";
export const GET_RETURN_ERROR_QUOT = "GET_RETURN_ERROR_QUOT";

export const SET_QUOTATION = "SET_QUOTATION";
export const CHECKED_INPUT_FOR_RETURN = "CHECKED_INPUT_FOR_RETURN";
export const IF_HAS_BOOKED_INSIDE_QUOTATION_PAGE ="IF_HAS_BOOKED_INSIDE_QUOTATION_PAGE"

//for addingextra pick or dropinputs
export const ADD_EXTRA_INPUT_FOR_JOURNEY = " ADD_EXTRA_INPUT_FOR_JOURNEY";
//
//? ******************* start  update and giving error of selected items on transfer page details
//flightdetails faln onlari udpdate elyrk
export const UPDATE_SELECTED_ITEMS_INPUTS = "UPDATE_SELECTED_ITEMS_INPUTS";
//FOR  TRANSFER DETAILS PAGE selected items
export const SET_ERROR_IN_TRANSFER_DETAILS_PAGE =
  "SET_ERROR_IN_TRANSFER_DETAILS_PAGE";
export const SET_ERROR_IN_RETURN_DETAILS_PAGE =
  "SET_ERROR_IN_RETURN_DETAILS_PAGE";
//! ******************* end of update and giving error of selected items on transfer page details

//
//? ******************* start update and giving error of passenger details
//passenger details
export const UPDATE_PASSENGER_DETAILS_FOR_BOTH_JOURNEY =
  "UPDATE_PASSENGER_DETAILS_FOR_BOTH_JOURNEY";
export const SET_ERROR_FOR_PASSENGER_DETAILS =
  "SET_ERROR_FOR_PASSENGER_DETAILS";
//! ******************* end of update and giving   error of passenger details

export const SET_ERROR_FOR_TRANSFER_DETAILS_PAGE =
  "SET_ERROR_FOR_TRANSFER_DETAILS_PAGE";

export const SET_POST_CODE_ADRESSES = "SET_POST_CODE_ADRESSES";

//?payment start
export const SET_PAYMENT = "SET_PAYMENT";
//!payment finish

// ?Mnage booking
export const GET_DATAS_FOR_EDITING = "GET_DATAS_FOR_EDITING";
export const EDIT_SAVE_TRANSFER_PASSENGER_VALUES =
  "EDIT_SAVE_TRANSFER_PASSENGER_VALUES";
export const EDIT_SAVE_SPECIAL_REQUESTS_TR = "EDIT_SAVE_SPECIAL_REQUESTS_TR";
export const CANCEL__TRANSFER_JOURNEY_EDITING =
  "CANCEL__TRANSFER_JOURNEY_EDITING";
//!manage booking finish

//?modal ifo
export const SET_MODAL_INFO = "SET_MODAL_INFO";

//get meeting point
export const GET_MEET_POINT = "GET_MEET_POINT";

export const GET_VALUES_FROM_ARTICLES = "GET_VALUES_FROM_ARTICLES";
export const RESET_RESERVATION = "RESET_RESERVATION"; //KULLANMADIK
export const SET_INITIAL_MANAGE_BOOKING_PRICE_FOR_QUOTATION_DIFFERENCE =
  "SET_INITIAL_MANAGE_BOOKING_PRICE_FOR_QUOTATION_DIFFERENCE";
export const SET_INITIAL_PRICE_IF_CANCELED = "SET_INITIAL_PRICE_IF_CANCELED";

export const RESERVATION_TOKEN_UPDATED = "RESERVATION_TOKEN_UPDATED";
export const SET_NEW_CURRENT_QUOTATION = "SET_NEW_CURRENT_QUOTATION"; // kullanmadk
