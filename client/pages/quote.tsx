import Head from "next/head";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { Action, Dispatch } from "redux";
import { getQuote } from "../redux/actions";

export default function Quote() {
  // create an interface for default state
  const quoteOfTheDay = useSelector((state: any) => state.quoteOfTheDay);
  const dispatch: (dispatch: any) => void = useDispatch();

  useEffect(() => {
    dispatch(getQuote());
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Head>
        <title>Quote of the day</title>
        <meta name="description" content="Redux thunk test page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Quote of the Day</h1>
        <p>{quoteOfTheDay.quote ?? "Loading quote of the day...."}</p>
        <p>{quoteOfTheDay.author}</p>
      </div>
    </div>
  );
}
