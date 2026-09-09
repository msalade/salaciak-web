import Link from "next/link";
import { getMessages, type Locale } from "../i18n/messages";
import { commandHref, getCommandSuggestions, getRecentSearches } from "../terminal/autocomplete";
import styles from "./CommandMenu.module.css";

type CommandMenuProps = { locale?: Locale; history?: readonly string[] };

export default function CommandMenu({ locale = "en", history = [] }: CommandMenuProps) {
  const copy = getMessages(locale);
  const recentSearches = getRecentSearches(history);
  const suggestions = getCommandSuggestions("", [
    { name: "help", description: copy.help.help },
    { name: "projects", description: copy.help.projects },
    { name: "search kubernetes", description: copy.help.search },
    { name: "ls", description: copy.help.ls },
    { name: "cat about_me.md", description: copy.help.cat },
    { name: "cat experience.md", description: copy.help.cat },
    { name: "cat tech.md", description: copy.help.cat },
    { name: "curl cv.pdf", description: copy.help.curl },
    { name: "theme dark", description: copy.help.theme },
    { name: "history", description: copy.help.history },
    ...recentSearches.map((query) => ({ name: `search ${query}`, description: copy.help.search })),
  ]);

  return (
    <nav className={styles.menu} aria-label={copy.terminal.suggestionsTitle}>
      <p className={styles.title}>{copy.terminal.suggestionsTitle}</p>
      <p className={styles.hint}>{copy.terminal.suggestionsHint}</p>
      <ul className={styles.list}>
        {suggestions.map((suggestion) => (
          <li key={suggestion.name}>
            <Link className={styles.link} href={commandHref(suggestion.name, locale)}>
              <span className={styles.command}>{suggestion.name}</span>
              <span className={styles.description}>{suggestion.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
