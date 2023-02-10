/* eslint-disable default-param-last */
import { combineReducers } from "redux";
import { INCREMENT, SET_QUOTE, DECREMENT, RESET } from "./actions";

// COUNTER REDUCER
const counterReducer = (state = 0, { type }) => {
  switch (type) {
    case INCREMENT:
      return state + 1;
    case DECREMENT:
      return state - 1;
    case RESET:
      return 0;
    default:
      return state;
  }
};

// QUOTE OF THE DAY
const quoteOfTheDayReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case SET_QUOTE:
      return {
        quote: payload.quote,
        author: payload.author,
      };
    default:
      return state;
  }
};

// COMBINED REDUCERS
const reducers = {
  counter: counterReducer,
  quoteOfTheDay: quoteOfTheDayReducer,
};

export default combineReducers(reducers);
