import { TerminalContextProvider, ReactTerminal } from "react-terminal";
import { commands } from "./commands";

const welcomeMessage = (
  <span>
    Type &apos;help&apos; for all available commands. <br />
  </span>
);

const themes = {
  totalDark: {
    themeBGColor: "#000000",
    themeToolbarColor: "#0D0208",
    themeColor: "#00FF41",
    themePromptColor: "#008F11"
  }
}

const Terminal = () => {
  return (
    <TerminalContextProvider>
      <ReactTerminal
        commands={commands}
        welcomeMessage={welcomeMessage}
        theme="totalDark"
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
