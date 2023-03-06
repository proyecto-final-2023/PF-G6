import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
// import { NextSeo } from 'next-seo';

import "../globals.css";

// for carousel
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

// calendar
import "react-circular-progressbar/dist/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      {/* <NextSeo noindex={true} /> */}
      <PayPalScriptProvider
        options={{
          "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || ""
        }}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PayPalScriptProvider>
    </>
  );
}
