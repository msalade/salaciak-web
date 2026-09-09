import { useEffect, useState } from "react";
import { shouldPlayBoot } from "../terminal/boot";
import styles from "./BootScreen.module.css";

export default function BootScreen({ reduced, shared }: {
  reduced: boolean; shared: boolean;
}) {
  const [active, setActive] = useState(() => {
    return shouldPlayBoot({ shared,
      reduced: reduced || window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  });
  useEffect(() => {
    if (!active) return;
    try { sessionStorage.setItem("salaciak-boot-seen", "true"); } catch { /* Storage is optional. */ }
    const finish = () => setActive(false);
    const skip = (event: Event) => {
      event.preventDefault();
      event.stopImmediatePropagation();
      finish();
    };
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const timer = window.setTimeout(finish, 750);
    document.addEventListener("keydown", skip, true);
    document.addEventListener("pointerdown", skip, true);
    media.addEventListener("change", finish);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("keydown", skip, true);
      document.removeEventListener("pointerdown", skip, true);
      media.removeEventListener("change", finish);
    };
  }, [active]);
  if (!active || reduced) return null;
  return <div className={styles.screen} data-testid="crt-boot" aria-hidden="true">
    <div className={styles.top} /><div className={styles.bottom} /><div className={styles.line} />
  </div>;
}
