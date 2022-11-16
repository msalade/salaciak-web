import Terminal from "../components/Terminal";
import { EmailContextTypeProvider } from "../context/EmailContext";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <EmailContextTypeProvider>
          <Terminal />
        </EmailContextTypeProvider>
      </main>
    </div>
  );
}
