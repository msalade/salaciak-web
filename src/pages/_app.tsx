import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Analytics } from "@vercel/analytics/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getMessages } from "../i18n/messages";

export default function App({ Component, pageProps }: AppProps) {
  const { locale } = useRouter();
  const copy = getMessages(locale);
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width,user-scalable=yes"
        />
        <meta name="keywords" content={copy.metadata.keywords} />
        <title>{copy.metadata.title}</title>
        <meta name="description" content={copy.metadata.description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <meta name="theme-color" content="#000000" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
