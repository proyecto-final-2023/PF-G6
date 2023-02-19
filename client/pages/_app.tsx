// Libraries
import type { AppProps } from "next/app";
// Types
// Components/Assets
import "../globals.css";
import Layout from "@/components/Layout";

// ? * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
