import dynamic from 'next/dynamic'
import { EmailContextTypeProvider } from "../context/EmailContext";
import styles from "../styles/Home.module.css";

const Terminal = dynamic(() => import("../components/Terminal"), { ssr: false })

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
