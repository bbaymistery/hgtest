import thunk from "redux-thunk";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { pickUpDropOffReducer } from "./pickUpDropOffReducer";
const reducer = combineReducers({
  pickUpDropOffReducer,
});

const initialState = {};

const middleware = [thunk];

const store = createStore(
  // rootReducer,
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
