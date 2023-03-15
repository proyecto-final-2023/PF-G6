import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="w-full">
      <Head>
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>
      <body className="w-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
