import test from "node:test";
import assert from "node:assert/strict";
import {
  completeCommand,
  completeCommandLine,
  commandHref,
  getCompletionAliases,
  getArgumentSuggestions,
  getCommandSuggestions,
  getRecentSearches,
  type CommandSuggestion,
} from "../terminal/autocomplete";
import {
  appendCommandHistory,
  readCommandHistory,
} from "../terminal/history";

const suggestions: CommandSuggestion[] = [
  { name: "projects", description: "explore projects" },
  { name: "ls", description: "list files" },
  { name: "search", description: "search the portfolio" },
  { name: "theme", description: "set the theme" },
];

test("returns every command for an empty input", () => {
  assert.deepEqual(getCommandSuggestions("", suggestions), suggestions);
});

test("filters suggestions by the command prefix, ignoring case", () => {
  assert.deepEqual(getCommandSuggestions("PR", suggestions), [suggestions[0]]);
  assert.deepEqual(getCommandSuggestions("s", suggestions), [suggestions[2]]);
});

test("limits the number of command suggestions", () => {
  assert.deepEqual(getCommandSuggestions("", suggestions, 2), suggestions.slice(0, 2));
});

test("completes the first matching command and preserves leading whitespace", () => {
  assert.equal(completeCommand("  se", suggestions), "  search");
});

test("does not replace command arguments or unknown input", () => {
  assert.equal(completeCommand("search kub", suggestions), "search kub");
  assert.equal(completeCommand("unknown", suggestions), "unknown");
});

test("creates locale-aware shareable links for menu commands", () => {
  assert.equal(commandHref("cat experience.md"), "/?command=cat%20experience.md");
  assert.equal(commandHref("projects", "pl"), "/pl/?command=projects");
});

const argumentCatalog = {
  cat: ["about_me.md", "experience.md", "tech.md", "contact.md"],
  theme: ["light", "dark", "dracula"],
};

test("suggests cat and theme arguments", () => {
  assert.deepEqual(getArgumentSuggestions("cat ex", argumentCatalog), ["experience.md"]);
  assert.deepEqual(getArgumentSuggestions("theme d", argumentCatalog), ["dark", "dracula"]);
});

test("builds command aliases that enable Tab completion for arguments", () => {
  assert.deepEqual(getCompletionAliases(argumentCatalog), [
    "cat about_me.md",
    "cat experience.md",
    "cat tech.md",
    "cat contact.md",
    "theme light",
    "theme dark",
    "theme dracula",
  ]);
});

test("completes an argument without changing the command", () => {
  assert.equal(completeCommandLine("cat ex", { commands: suggestions, arguments: argumentCatalog }), "cat experience.md");
});

test("extracts recent searches for search suggestions", () => {
  assert.deepEqual(getRecentSearches(["projects", "search react", "cat tech.md", "search kubernetes"]), ["kubernetes", "react"]);
});

test("persists bounded command history and ignores blank commands", () => {
  const values = new Map<string, string>();
  const storage = {
    getItem: (key: string) => values.get(key) ?? null,
    setItem: (key: string, value: string) => values.set(key, value),
  };
  const first = appendCommandHistory([], "projects", storage, 2);
  const second = appendCommandHistory(first, "search react", storage, 2);
  const third = appendCommandHistory(second, "  ", storage, 2);
  assert.deepEqual(third, ["projects", "search react"]);
  assert.deepEqual(readCommandHistory(storage, 2), ["projects", "search react"]);
});
