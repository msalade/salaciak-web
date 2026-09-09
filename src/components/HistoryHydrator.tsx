import { useContext, useEffect, useRef } from "react";
import { TerminalContext } from "react-terminal";

type HistoryHydratorProps = { entries: readonly string[] };

/** Seeds react-terminal's arrow-key history from the locally persisted entries. */
export default function HistoryHydrator({ entries }: HistoryHydratorProps) {
  const { appendCommandToHistory } = useContext(TerminalContext);
  const hydrated = useRef(false);

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;
    entries.forEach((entry) => appendCommandToHistory(entry));
  }, [appendCommandToHistory, entries]);

  return null;
}
