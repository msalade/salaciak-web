import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { commands } from "../components/commands";
import { parseCommandLink, runLinkedCommand } from "../terminal/commandLinks";

test("ordinary visits and empty command parameters do not run a command", () => {
  for (const value of [undefined, "", "   "]) {
    assert.equal(parseCommandLink(value), null);
  }
});

test("command links preserve arguments and normalize surrounding whitespace", () => {
  const query = new URL("https://example.com/?command=cat%20experience.md").searchParams;
  assert.equal(parseCommandLink(query.get("command") ?? undefined), "cat experience.md");
  assert.equal(parseCommandLink("  cat   experience.md  "), "cat experience.md");
});

test("ambiguous, multiline, and oversized command links are ignored", () => {
  for (const value of [["help", "projects"], ["help"], "help\nprojects", "help\rprojects", "a".repeat(257)]) {
    assert.equal(parseCommandLink(value), null);
  }
});

test("a linked command receives its arguments exactly once", () => {
  const calls: string[] = [];
  const result = runLinkedCommand("cat experience.md", {
    cat: (args: string) => { calls.push(args); return "experience content"; },
  });
  assert.equal(result, "experience content");
  assert.deepEqual(calls, ["experience.md"]);
});

test("unknown commands, including inherited object keys, produce a readable error", () => {
  for (const command of ["missing", "constructor", "toString", "__proto__"]) {
    assert.equal(runLinkedCommand(command, {}), `command not found: ${command}`);
  }
});

test("the built-in clear command does not produce an unknown-command error", () => {
  assert.equal(runLinkedCommand("clear", {}), null);
});

test("untrusted command text is rendered as text, never executable markup", () => {
  const output = renderToStaticMarkup(runLinkedCommand("<img src=x onerror=alert(1)>", {}));
  assert.ok(output.includes("&lt;img"));
  assert.ok(!output.includes("<img"));
});

test("projects links open real portfolio content", () => {
  const output = renderToStaticMarkup(runLinkedCommand("projects", commands(() => {})));
  assert.match(output, /salaciak-web/i);
  assert.doesNotMatch(output, /command not found/);
});

test("experience links use the same content as the existing cat command", () => {
  const output = renderToStaticMarkup(runLinkedCommand("cat experience.md", commands(() => {})));
  assert.match(output, /Senior Software Engineer/);
  assert.match(output, /Apptio/);
});

test("history renders persisted commands in order", () => {
  const output = renderToStaticMarkup(runLinkedCommand("history", commands(() => {}, "en", ["projects", "search react"])));
  assert.match(output, /1 projects/);
  assert.match(output, /2 search react/);
});
