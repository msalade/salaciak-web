import type { CommandHandlers } from "./commandLinks";
import { formatCommand } from "./history";

export function commandUrl(pathname: string, query: Record<string, string | string[] | undefined>, command: string) {
  return { pathname, query: { ...query, command } };
}

export function createCommandUrlSync(update: (command: string) => void) {
  let submitted: string | null = null;
  return {
    submit(name: string, args: string) {
      const command = formatCommand(name.split(" ")[0], args);
      submitted = command;
      if (!(name === "lang" && (args === "en" || args === "pl"))) update(command);
    },
    consume(command: string) {
      const matches = submitted === command;
      submitted = null;
      return matches;
    },
  };
}

export function wrapInputHandlers(handlers: CommandHandlers, onSubmit: (name: string, args: string) => void): CommandHandlers {
  return Object.fromEntries(Object.entries(handlers).map(([name, handler]) => [
    name, (args: string) => { onSubmit(name, args); return handler(args); },
  ]));
}
