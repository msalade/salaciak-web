import { TerminalContextProvider, ReactTerminal } from "react-terminal";
import Link from "next/link";
import { commands } from "./commands";
import useLocalStorage from "../hooks/useLocalStorage";
import { themes, ThemeType } from "./themes";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/router";
import { parseCommandLink } from "../terminal/commandLinks";
import LinkedCommand from "./LinkedCommand";
import CommandMenu from "./CommandMenu";
import AccessiblePortfolio from "./AccessiblePortfolio";
import HistoryHydrator from "./HistoryHydrator";
import { getMessages, resolveLocale } from "../i18n/messages";
import { appendCommandHistory, commandHistoryStorageKey, formatCommand } from "../terminal/history";
import { getCompletionAliases, getRecentSearches } from "../terminal/autocomplete";
import type { CommandHandlers } from "../terminal/commandLinks";
import styles from "./Terminal.module.css";

const Terminal = () => {
  const router = useRouter();
  const locale = resolveLocale(router.locale);
  const copy = getMessages(locale);
  const [theme, setTheme] = useLocalStorage<ThemeType>(
    "salaciak-web-theme",
    "dracula"
  );
  const [history, setHistory] = useLocalStorage<string[]>(commandHistoryStorageKey, []);
  const [accessibleView, setAccessibleView] = useLocalStorage("salaciak-accessible-view", false);
  const [reducedMotion, setReducedMotion] = useLocalStorage("salaciak-reduced-motion", false);
  const safeHistory = useMemo(() => (Array.isArray(history) ? history : []), [history]);
  const baseHandlers = useMemo(() => commands(setTheme, locale, safeHistory), [setTheme, locale, safeHistory]);
  const argumentCatalog = useMemo(() => ({
    cat: ["about_me.md", "me.jpeg", "experience.md", "tech.md", "contact.md", "social.md"],
    theme: ["light", "dark", "total-dark", "material-light", "material-dark", "material-ocean", "matrix", "dracula"],
    search: ["kubernetes", ...getRecentSearches(safeHistory)],
  }), [safeHistory]);
  const handlers = useMemo<CommandHandlers>(() => {
    const wrapped = Object.entries(baseHandlers).map(([name, handler]) => [
      name,
      (args: string) => {
        if (name !== "history") {
          setHistory((current) => appendCommandHistory(Array.isArray(current) ? current : [], formatCommand(name, args)));
        }
        return handler(args);
      },
    ] as const);
    const commandHandlers = Object.fromEntries(wrapped) as CommandHandlers;
    const aliases = Object.fromEntries(
      getCompletionAliases(argumentCatalog)
        .map((alias) => [alias, commandHandlers[alias.split(" ", 1)[0]]])
        .filter((entry): entry is [string, CommandHandlers[string]] => Boolean(entry[1])),
    );
    return { ...commandHandlers, ...aliases };
  }, [argumentCatalog, baseHandlers, setHistory]);
  const linkedCommand = parseCommandLink(router.query.command);

  const toggleAccessibleView = useCallback(() => setAccessibleView((current) => !current), [setAccessibleView]);
  const toggleReducedMotion = useCallback(() => setReducedMotion((current) => !current), [setReducedMotion]);

  // Wait for the client router to decode the query before mounting the terminal.
  if (!router.isReady) return null;

  return (
    <div className={`${styles.shell} ${reducedMotion ? styles.reducedMotion : ""}`}>
      <div className={styles.controls} role="group" aria-label={copy.terminal.displayOptions}>
        <button className={styles.button} type="button" onClick={toggleAccessibleView} aria-pressed={accessibleView}>
          {accessibleView ? copy.terminal.showTerminal : copy.terminal.showAccessibleView}
        </button>
        <button className={styles.button} type="button" onClick={toggleReducedMotion} aria-pressed={reducedMotion}>
          {reducedMotion ? copy.terminal.reducedMotionOn : copy.terminal.reducedMotionOff}
        </button>
        <Link
          className={styles.button}
          href={{ pathname: "/", query: router.query }}
          locale={locale === "en" ? "pl" : "en"}
          aria-label={copy.terminal.switchLanguage}
        >
          {locale === "en" ? "PL" : "EN"}
        </Link>
      </div>
      {accessibleView ? (
        <AccessiblePortfolio locale={locale} />
      ) : (
        <TerminalContextProvider key={linkedCommand ?? ""}>
          <HistoryHydrator entries={safeHistory} />
          <CommandMenu locale={locale} history={safeHistory} />
          <LinkedCommand command={linkedCommand} handlers={handlers} prompt={copy.terminal.prompt} />
          <ReactTerminal
            commands={handlers}
            welcomeMessage={<span>{copy.terminal.welcome}<br /></span>}
            theme={theme}
            showControlBar={false}
            showControlButtons={false}
            prompt={copy.terminal.prompt}
            errorMessage={copy.terminal.commandNotFound}
            themes={themes}
          />
        </TerminalContextProvider>
      )}
    </div>
  );
};

export default Terminal;
