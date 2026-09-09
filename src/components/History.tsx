import { getMessages, type Locale } from "../i18n/messages";

type HistoryProps = { entries: readonly string[]; locale?: Locale };

export default function History({ entries, locale = "en" }: HistoryProps) {
  const copy = getMessages(locale);
  return (
    <span>
      <strong>{copy.help.history}</strong>
      <br />
      {entries.length === 0
        ? copy.terminal.historyEmpty
        : entries.map((entry, index) => (
            <span key={`${index}-${entry}`}>
              {index + 1} {entry}
              <br />
            </span>
          ))}
    </span>
  );
}
