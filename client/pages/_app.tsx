import "@/styles/globals.css";
// import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { useStore } from "../redux/store";

type ProvisionalType = {
  Component: any;
  pageProps: any;
};

export default function App({ Component, pageProps }: ProvisionalType) {
  const store = useStore(pageProps.initialReduxState);

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
