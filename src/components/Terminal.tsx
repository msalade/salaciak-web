import { TerminalContextProvider, ReactTerminal } from "react-terminal";
import { commands } from "./commands";
import useLocalStorage from "../hooks/useLocalStorage";
import { themes, ThemeType } from "./themes";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { parseCommandLink } from "../terminal/commandLinks";
import LinkedCommand from "./LinkedCommand";
import CommandMenu from "./CommandMenu";
import { getMessages, resolveLocale } from "../i18n/messages";

const Terminal = () => {
  const router = useRouter();
  const locale = resolveLocale(router.locale);
  const copy = getMessages(locale);
  const [theme, setTheme] = useLocalStorage<ThemeType>(
    "salaciak-web-theme",
    "dracula"
  );
  const handlers = useMemo(() => commands(setTheme, locale), [setTheme, locale]);
  const linkedCommand = parseCommandLink(router.query.command);

  // Wait for the client router to decode the query before mounting the terminal.
  if (!router.isReady) return null;

  return (
    <TerminalContextProvider key={linkedCommand ?? ""}>
      <CommandMenu locale={locale} />
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
  );
};

export default Terminal;
