import Head from "next/head";
import Terminal from "../components/Terminal";
import { EmailContextTypeProvider } from "../context/EmailContext";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Michał Sałaciak</title>
        <meta name="description" content="Michał Sałaciak" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <EmailContextTypeProvider>
          <Terminal />
        </EmailContextTypeProvider>
      </main>
    </div>
  );
}
