import Head from "next/head";
import Image from "next/image";
import Script from "next/script";
import style from "../styles/instax.module.css";

const InstaxManual = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="keywords" content="wesele, instax, instrukcja, darmowa" />
        <title>Instrukcja instax na wesele</title>
        <meta
          name="description"
          content="Darmowa instrukcja instax na wesele do edycji"
        />
        <meta property="og:title" content="Instrukcja instax na wesele" />
        <meta
          property="og:description"
          content="Darmowa instrukcja instax na wesele do edycji"
        />
        <meta
          property="og:image"
          content="/wesele-instax/instax_instrukcja.png"
        />
      </Head>
      <Script src="https://cdn.tailwindcss.com" />
      <div className={style.wrapper}>
        <h1 className="font-bold text-xl mb-2">Instrukcja instax na wesele</h1>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <Image
            src="/wesele-instax/instax_instrukcja.png"
            height={400}
            width={400}
            alt="Wesele instrukcja instax"
          />
        </div>
        <div className="inline-flex">
          <button className="bg-blue-500 hover:bg-gray-400 border text-gray-800 font-bold py-2 px-4 rounded-l">
            <a
              href="/wesele-instax/instax_instrukcja.png"
              download="Wesle instrukcja instax PNG"
            >
              Pobierz w formacie PNG
            </a>
          </button>
          <button className="bg-blue-500 hover:bg-gray-400 border text-gray-800 font-bold py-2 px-4 rounded-r">
            <a
              href="/wesele-instax/instax_instrukcja.xcf"
              download="Wesle instrukcja instax GIMP"
            >
              Pobierz do edycji GIMP
            </a>
          </button>
        </div>
      </div>
    </>
  );
};

export default InstaxManual;
