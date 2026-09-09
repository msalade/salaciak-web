import test from "node:test";
import assert from "node:assert/strict";
import {
  completeCommand,
  commandHref,
  getCommandSuggestions,
  type CommandSuggestion,
} from "../terminal/autocomplete";

const suggestions: CommandSuggestion[] = [
  { name: "projects", description: "explore projects" },
  { name: "pong", description: "play Pong" },
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
