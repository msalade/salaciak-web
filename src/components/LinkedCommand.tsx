import { useContext, useEffect, useRef } from "react";
import { TerminalContext } from "react-terminal";
import { runLinkedCommand, type CommandHandlers } from "../terminal/commandLinks";

type LinkedCommandProps = {
  command: string | null;
  handlers: CommandHandlers;
  prompt: string;
  consumeSubmitted?: (command: string) => boolean;
};

export default function LinkedCommand({ command, handlers, prompt, consumeSubmitted }: LinkedCommandProps) {
  const { setBufferedContent, appendCommandToHistory } = useContext(TerminalContext);
  const previousCommand = useRef<string | null>(null);

  useEffect(() => {
    // React Strict Mode and terminal/theme updates must not replay the URL command.
    if (previousCommand.current === command) return;
    previousCommand.current = command;
    if (!command) return;
    if (consumeSubmitted?.(command)) {
      return;
    }
    const output = runLinkedCommand(command, handlers);
    appendCommandToHistory(command);
    setBufferedContent(command.split(" ")[0] === "clear" ? "" : (
      <>
        <span>{prompt} {command}</span><br />
        {output}<br />
      </>
    ));
  }, [command, handlers, prompt, consumeSubmitted, setBufferedContent, appendCommandToHistory]);

  return null;
}
