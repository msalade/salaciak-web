import { TerminalContextProvider, ReactTerminal } from "react-terminal";
import { commands } from "./commands";
import useLocalStorage from "../hooks/useLocalStorage";
import { themes, ThemeType } from "./themes";

const welcomeMessage = (
  <span>
    Type &apos;help&apos; for all available commands. <br />
  </span>
);

const Terminal = () => {
  const [theme, setTheme] = useLocalStorage<ThemeType>(
    "salaciak-web-theme",
    "dracula"
  );

  return (
    <TerminalContextProvider>
      <ReactTerminal
        commands={commands(setTheme)}
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
