import "../globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";

const MyApp = ({ Component, pageProps }: AppProps) => (
  <Layout>
    <Component {...pageProps} />
  </Layout>
);


export default MyApp;
