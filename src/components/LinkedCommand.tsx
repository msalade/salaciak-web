import { useContext, useEffect, useRef } from "react";
import { TerminalContext } from "react-terminal";
import { runLinkedCommand, type CommandHandlers } from "../terminal/commandLinks";

type LinkedCommandProps = {
  command: string | null;
  handlers: CommandHandlers;
  prompt: string;
};

export default function LinkedCommand({ command, handlers, prompt }: LinkedCommandProps) {
  const { setBufferedContent, appendCommandToHistory } = useContext(TerminalContext);
  const initialized = useRef(false);

  useEffect(() => {
    // React Strict Mode and terminal/theme updates must not replay the URL command.
    if (initialized.current || !command) return;
    initialized.current = true;
    const output = runLinkedCommand(command, handlers);
    appendCommandToHistory(command);
    setBufferedContent(command.split(" ")[0] === "clear" ? "" : (
      <>
        <span>{prompt} {command}</span><br />
        {output}<br />
      </>
    ));
  }, [command, handlers, prompt, setBufferedContent, appendCommandToHistory]);

  return null;
}
