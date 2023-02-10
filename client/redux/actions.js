import axios from "axios";
// REDUX ACTION TYPES
export const SET_QUOTE = "SET_QUOTE";
export const INCREMENT = "INCREMENT";
export const DECREMENT = "DECREMENT";
export const RESET = "RESET";

export const setQuote = (payload) => ({ type: SET_QUOTE, payload });

// GET QUOTE OF THE DAY
export const getQuote = () => (dispatch, getState) => {
  const state = getState();
  if (state.quoteOfTheDay.quote) {
    return;
  }

  axios
    .get("https://quotes.rest/qod")
    .then(({ data }) => {
      const contents = data.contents.quotes[0];
      dispatch(setQuote({ quote: contents.quote, author: contents.author }));
    })
    .catch((error) => {
      let message = "There was an error getting quote of the day";
      if (error.response) {
        message = `Server responded with status ${error.response.status}`;
      }
      dispatch(
        setQuote({
          quote: message,
        })
      );
    });
};

// INCREMENT COUNTER BY 1
export const incrementCount = () => ({ type: INCREMENT });

// DECREMENT COUNTER BY 1
export const decrementCount = () => ({ type: DECREMENT });

// RESET COUNTER
export const resetCount = () => ({ type: RESET });
