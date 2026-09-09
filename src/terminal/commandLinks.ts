import type { ReactNode } from "react";

export type CommandHandlers = Record<string, (args: string) => ReactNode>;

/** Next's router has already decoded the query value. */
export function parseCommandLink(value: string | string[] | undefined): string | null {
  if (typeof value !== "string" || value.length > 256 || /[\r\n]/.test(value)) return null;
  return value.trim().replace(/\s+/g, " ") || null;
}

export function runLinkedCommand(command: string, handlers: CommandHandlers): ReactNode {
  const [name, ...args] = command.split(" ");
  if (name === "clear") return null;
  if (!Object.hasOwn(handlers, name)) return `command not found: ${name}`;
  return handlers[name](args.join(" "));
}
