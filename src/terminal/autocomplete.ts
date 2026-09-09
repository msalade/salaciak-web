export type CommandSuggestion = {
  name: string;
  description: string;
};

export function getCommandSuggestions(
  input: string,
  suggestions: readonly CommandSuggestion[],
  limit = suggestions.length,
): CommandSuggestion[] {
  const trimmedInput = input.trimStart();
  const command = trimmedInput.split(/\s+/, 1)[0] ?? "";
  if (/\s/.test(trimmedInput)) return [];

  const query = command.toLocaleLowerCase();
  return suggestions
    .filter(({ name }) => name.toLocaleLowerCase().startsWith(query))
    .slice(0, Math.max(0, limit));
}

export function completeCommand(
  input: string,
  suggestions: readonly CommandSuggestion[],
): string {
  if (/\s/.test(input.trimStart())) return input;

  const match = getCommandSuggestions(input, suggestions, 1)[0];
  if (!match) return input;

  const leadingWhitespace = input.slice(0, input.length - input.trimStart().length);
  return `${leadingWhitespace}${match.name}`;
}

export function commandHref(command: string, locale: "en" | "pl" = "en"): string {
  const path = locale === "pl" ? "/pl/" : "/";
  return `${path}?command=${encodeURIComponent(command)}`;
}
