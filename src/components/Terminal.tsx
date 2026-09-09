import { TerminalContextProvider, ReactTerminal } from "react-terminal";
import { commands } from "./commands";
import useLocalStorage from "../hooks/useLocalStorage";
import { themes, ThemeType } from "./themes";
import { useMemo } from "react";
import { useRouter } from "next/router";
import { parseCommandLink } from "../terminal/commandLinks";
import LinkedCommand from "./LinkedCommand";

const welcomeMessage = (
  <span>
    Type &apos;help&apos; for all available commands. <br />
  </span>
);

const Terminal = () => {
  const router = useRouter();
  const [theme, setTheme] = useLocalStorage<ThemeType>(
    "salaciak-web-theme",
    "dracula"
  );
  const handlers = useMemo(() => commands(setTheme), [setTheme]);
  const linkedCommand = parseCommandLink(router.query.command);

  // Wait for the client router to decode the query before mounting the terminal.
  if (!router.isReady) return null;

  return (
    <TerminalContextProvider key={linkedCommand ?? ""}>
      <LinkedCommand command={linkedCommand} handlers={handlers} />
      <ReactTerminal
        commands={handlers}
        welcomeMessage={welcomeMessage}
        theme={theme}
        showControlBar={false}
        showControlButtons={false}
        prompt="msalaciak >"
        errorMessage={(command: string) => `command not found: ${command}`}
        themes={themes}
      />
    </TerminalContextProvider>
  );
};

export default Terminal;
