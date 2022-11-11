import { TerminalContextProvider, ReactTerminal } from "react-terminal";
import { commands } from "./commands";

const welcomeMessage = (
  <span>
    Type &apos;help&apos; for all available commands. <br />
  </span>
);

const Terminal = () => {
  return (
    <TerminalContextProvider>
      <ReactTerminal
        commands={commands}
        welcomeMessage={welcomeMessage}
        theme="matrix"
        showControlBar={false}
        showControlButtons={false}
        prompt="guest >"
      />
    </TerminalContextProvider>
  );
};

export default Terminal;
