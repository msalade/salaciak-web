export type CommandSuggestion = {
  name: string;
  description: string;
};

export type CompletionCatalog = {
  commands: readonly CommandSuggestion[];
  arguments: Readonly<Record<string, readonly string[]>>;
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

export function getArgumentSuggestions(
  input: string,
  argumentCatalog: Readonly<Record<string, readonly string[]>>,
  limit = 8,
): string[] {
  const trimmedInput = input.trimStart();
  const [command = "", ...parts] = trimmedInput.split(/\s+/);
  if (!command || !/\s/.test(trimmedInput)) return [];

  const prefix = parts.join(" ");
  return (argumentCatalog[command.toLocaleLowerCase()] ?? [])
    .filter((candidate) => candidate.toLocaleLowerCase().startsWith(prefix.toLocaleLowerCase()))
    .slice(0, Math.max(0, limit));
}

export function completeCommandLine(input: string, catalog: CompletionCatalog): string {
  const commandMatches = getCommandSuggestions(input, catalog.commands, 1);
  if (!/\s/.test(input.trimStart())) return commandMatches[0] ? completeCommand(input, catalog.commands) : input;

  const argument = getArgumentSuggestions(input, catalog.arguments, 1)[0];
  if (!argument) return input;

  const match = input.match(/^(\s*)(\S+)(\s+)(.*)$/s);
  if (!match) return input;
  return `${match[1]}${match[2]}${match[3]}${argument}`;
}

/** Returns the matching command line candidates in their display order. */
export function getCompletionCandidates(input: string, catalog: CompletionCatalog): string[] {
  if (!/\s/.test(input.trimStart())) {
    return getCommandSuggestions(input, catalog.commands).map(({ name }) => {
      const leadingWhitespace = input.slice(0, input.length - input.trimStart().length);
      return `${leadingWhitespace}${name}`;
    });
  }

  const match = input.match(/^(\s*)(\S+)(\s+)(.*)$/s);
  if (!match) return [];
  return getArgumentSuggestions(input, catalog.arguments)
    .map((argument) => `${match[1]}${match[2]}${match[3]}${argument}`);
}

/** Advances to the next matching candidate, wrapping around at the end. */
export function cycleCompletion(input: string, catalog: CompletionCatalog, anchor = input): string {
  const candidates = getCompletionCandidates(anchor, catalog);
  if (candidates.length === 0) return input;
  const current = candidates.indexOf(input);
  return candidates[(current + 1) % candidates.length] ?? input;
}

export function getCompletionAliases(
  argumentCatalog: Readonly<Record<string, readonly string[]>>,
): string[] {
  return Object.entries(argumentCatalog).flatMap(([command, values]) =>
    values.map((value) => `${command} ${value}`),
  );
}

export function getRecentSearches(history: readonly string[], limit = 5): string[] {
  const searches: string[] = [];
  for (const entry of [...history].reverse()) {
    const match = entry.trim().match(/^search\s+(.+)$/i);
    if (match && !searches.includes(match[1])) searches.push(match[1]);
  }
  return searches.slice(0, Math.max(0, limit));
}

export function commandHref(command: string, locale: "en" | "pl" = "en"): string {
  const path = locale === "pl" ? "/pl/" : "/";
  return `${path}?command=${encodeURIComponent(command)}`;
}
