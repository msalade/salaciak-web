import Head from "next/head";
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
        <h1 className={styles.title}>
          Hello! My name is <a href="https://www.linkedin.com/in/michal-salaciak/">Michał Sałaciak</a>
        </h1>

        <p className={styles.description}>
          Im <code className={styles.code}>full stack</code> developer.
        </p>
      </main>
    </div>
  );
}
