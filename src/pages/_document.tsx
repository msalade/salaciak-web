import { Html, Head, Main, NextScript } from "next/document";
import type { DocumentContext, DocumentInitialProps } from "next/document";

export default function Document({ locale }: DocumentInitialProps & { locale?: string }) {
  return (
    <Html lang={locale === "pl" ? "pl" : "en"}>
      <Head />
      <body><Main /><NextScript /></body>
    </Html>
  );
}

Document.getInitialProps = async (context: DocumentContext) => {
  const initialProps = await context.defaultGetInitialProps(context);
  return { ...initialProps, locale: context.locale };
};
