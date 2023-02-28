import type { AppProps } from "next/app";
import Layout from "@/components/Layout";

import "../globals.css";

// for carousel
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PayPalScriptProvider
      options={{ "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "" }}
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PayPalScriptProvider>
  );
}
