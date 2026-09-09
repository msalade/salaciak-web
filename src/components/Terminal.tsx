import { TerminalContextProvider, ReactTerminal } from "react-terminal";
import { commands } from "./commands";
import useLocalStorage from "../hooks/useLocalStorage";
import { themes, ThemeType } from "./themes";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Router, { useRouter } from "next/router";
import { parseCommandLink, type CommandHandlers } from "../terminal/commandLinks";
import LinkedCommand from "./LinkedCommand";
import BootScreen from "./BootScreen";
import AccessiblePortfolio from "./AccessiblePortfolio";
import HistoryHydrator from "./HistoryHydrator";
import { getMessages, resolveLocale, type Locale } from "../i18n/messages";
import { appendCommandHistory, commandHistoryStorageKey, formatCommand } from "../terminal/history";
import { cycleCompletion, getCompletionAliases, getCompletionCandidates, getRecentSearches } from "../terminal/autocomplete";
import { parseCursorStyle, type CursorStyle } from "../terminal/cursor";
import styles from "./Terminal.module.css";

import { commandUrl, createCommandUrlSync, wrapInputHandlers } from "../terminal/commandUrl";

const Terminal = () => {
  const router = useRouter();
  const [urlSync] = useState(() => createCommandUrlSync((command) => {
    void Router.replace(commandUrl(Router.pathname, Router.query, command), undefined, {
      shallow: true, scroll: false,
    });
  }));
  const locale = resolveLocale(router.locale);
  const copy = getMessages(locale);
  const [theme, setTheme] = useLocalStorage<ThemeType>("salaciak-web-theme", "dracula");
  const [history, setHistory] = useLocalStorage<string[]>(commandHistoryStorageKey, []);
  const [reducedMotion, setReducedMotion] = useLocalStorage("salaciak-reduced-motion", false);
  const [cursorStyle, setCursorStyle] = useLocalStorage<CursorStyle>("salaciak-cursor-style", "block");
  const activeCursorStyle = parseCursorStyle(String(cursorStyle)) ?? "block";
  const safeHistory = useMemo(() => (Array.isArray(history) ? history : []), [history]);
  const setLocale = useCallback((nextLocale: Locale) => {
    void router.push({ pathname: "/", query: { ...router.query, command: `lang ${nextLocale}` } }, undefined, { locale: nextLocale });
  }, [router]);
  const baseHandlers = useMemo(() => ({
    ...commands(setTheme, locale, safeHistory),
    accessible: () => <AccessiblePortfolio locale={locale} />,
    motion: (mode: string) => {
      if (mode !== "reduce" && mode !== "on") return <span>{copy.help.motion}</span>;
      setReducedMotion(mode === "reduce");
      return <span>{mode === "reduce" ? copy.terminal.motionReduced : copy.terminal.motionEnabled}</span>;
    },
    cursor: (style: string) => {
      const parsed = parseCursorStyle(style);
      if (!parsed) return <span>{copy.terminal.cursorInvalid}</span>;
      setCursorStyle(parsed);
      return <span>{copy.terminal.cursorChanged(parsed)}</span>;
    },
    lang: (nextLocale: string) => {
      if (nextLocale !== "en" && nextLocale !== "pl") return <span>{copy.terminal.languageInvalid}</span>;
      setLocale(nextLocale);
      return <span>{copy.terminal.languageChanged(nextLocale)}</span>;
    },
  }), [copy, locale, safeHistory, setCursorStyle, setLocale, setReducedMotion, setTheme]);
  const argumentCatalog = useMemo(() => ({
    cat: ["about_me.md", "me.jpeg", "experience.md", "tech.md", "contact.md", "social.md"],
    theme: ["light", "dark", "total-dark", "material-light", "material-dark", "material-ocean", "matrix", "dracula"],
    search: ["kubernetes", ...getRecentSearches(safeHistory)],
    motion: ["reduce", "on"],
    lang: ["en", "pl"],
    cursor: ["block", "bar", "underline", "pulse"],
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
  const completionRef = useRef<{ anchor: string; value: string } | null>(null);
  useEffect(() => {
    const handleTabCompletion = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const target = event.target as Element | null;
      const editor = target?.closest("#terminalEditor");
      if (!editor) return;
      const lines = editor.querySelectorAll<HTMLElement>('[class*="lineText"]');
      const input = lines.item(lines.length - 1)?.textContent ?? "";
      let anchor = completionRef.current?.value === input ? completionRef.current.anchor : input;
      if (completionRef.current?.value === input && /\s/.test(anchor.trimStart())) {
        const commandMatch = anchor.match(/^(\s*)(\S+)(\s+)/);
        if (commandMatch) anchor = `${commandMatch[1]}${commandMatch[2]}${commandMatch[3]}`;
      }
      const catalog = {
        commands: Object.keys(handlers)
          .filter((name) => !name.includes(" "))
          .map((name) => ({ name, description: "" })),
        arguments: argumentCatalog,
      };
      const candidates = getCompletionCandidates(anchor, catalog);
      if (candidates.length === 0) {
        completionRef.current = null;
        return;
      }
      const next = cycleCompletion(input, catalog, anchor);
      if (next === input) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      for (let index = 0; index < input.length; index += 1) {
        editor.dispatchEvent(new KeyboardEvent("keydown", { key: "Backspace", bubbles: true }));
      }
      for (const key of next) {
        editor.dispatchEvent(new KeyboardEvent("keydown", { key, bubbles: true }));
      }
      completionRef.current = { anchor, value: next };
    };
    document.addEventListener("keydown", handleTabCompletion, true);
    return () => document.removeEventListener("keydown", handleTabCompletion, true);
  }, [argumentCatalog, handlers]);
  const linkedCommand = parseCommandLink(router.query.command);
  const inputHandlers = useMemo(() => wrapInputHandlers(handlers, urlSync.submit), [handlers, urlSync]);

  // Wait for the client router to decode the query before mounting the terminal.
  if (!router.isReady) return null;

  return (
    <div
      className={`${styles.shell} ${reducedMotion ? styles.reducedMotion : ""}`}
      data-reduced-motion={reducedMotion ? "true" : "false"}
      data-cursor-style={activeCursorStyle}
    >
      <BootScreen reduced={reducedMotion} shared={Boolean(router.query.command)} />
      <TerminalContextProvider>
        <HistoryHydrator entries={safeHistory} />
        <LinkedCommand command={linkedCommand} consumeSubmitted={urlSync.consume} handlers={handlers} prompt={copy.terminal.prompt} />
        <ReactTerminal
          commands={inputHandlers}
          welcomeMessage={<span>{copy.terminal.welcome}<br /></span>}
          theme={theme}
          showControlBar={false}
          showControlButtons={false}
          prompt={copy.terminal.prompt}
          errorMessage={copy.terminal.commandNotFound}
          themes={themes}
        />
      </TerminalContextProvider>
    </div>
  );
};

export default Terminal;
