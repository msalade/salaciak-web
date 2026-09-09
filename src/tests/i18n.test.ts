import assert from "node:assert/strict";
import { test } from "node:test";
import { getMessages, resolveLocale, supportedLocales } from "../i18n/messages";
import { commands } from "../components/commands";
import { runLinkedCommand } from "../terminal/commandLinks";
import { renderToStaticMarkup } from "react-dom/server";

test("supported locales are explicit and unknown locales fall back to English", () => {
  assert.deepEqual(supportedLocales, ["en", "pl"]);
  assert.equal(resolveLocale("pl"), "pl");
  assert.equal(resolveLocale("de"), "en");
  assert.equal(getMessages("de").help.available, "Available commands:");
});

test("commands render translated Polish output", () => {
  const output = renderToStaticMarkup(runLinkedCommand("help", commands(() => {}, "pl")));
  assert.match(output, /Dostępne polecenia/);
  assert.match(output, /pokaż projekty/);
});

test("Polish translations cover terminal and user-facing command copy", () => {
  const messages = getMessages("pl");
  assert.equal(messages.terminal.welcome, "Wpisz 'help', aby zobaczyć dostępne polecenia.");
  assert.equal(messages.help.search.startsWith("wyszukaj"), true);
  assert.equal(messages.search.usage, "Użycie: search [ZAPYTANIE]");
  assert.equal(messages.search.category.Experience, "Doświadczenie");
  assert.equal(messages.captcha.unavailable, "CAPTCHA jest obecnie niedostępna.");
});
