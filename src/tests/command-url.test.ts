import assert from "node:assert/strict";
import test from "node:test";
import { commandUrl, createCommandUrlSync, wrapInputHandlers } from "../terminal/commandUrl";

test("submission preserves query parameters and encodes arguments through the router URL object", () => {
  const updates: unknown[] = [];
  const sync = createCommandUrlSync((command) => updates.push(commandUrl("/", { ref: "test" }, command)));
  const handlers = wrapInputHandlers({ search: (args) => args }, sync.submit);
  assert.deepEqual(updates, []);
  assert.equal(handlers.search("React & TypeScript"), "React & TypeScript");
  assert.deepEqual(updates, [{ pathname: "/", query: { ref: "test", command: "search React & TypeScript" } }]);
  assert.equal(sync.consume("search React & TypeScript"), true);
  assert.equal(sync.consume("search React & TypeScript"), false);
});

test("each explicit submission executes once, even when repeating a command", () => {
  let calls = 0;
  const updates: string[] = [];
  const sync = createCommandUrlSync((command) => updates.push(command));
  const handlers = wrapInputHandlers({ projects: () => ++calls }, sync.submit);
  handlers.projects("");
  handlers.projects("");
  assert.equal(calls, 2);
  assert.deepEqual(updates, ["projects", "projects"]);
});

test("external navigation is not suppressed by a different submitted command", () => {
  const sync = createCommandUrlSync(() => {});
  sync.submit("projects", "");
  assert.equal(sync.consume("search react"), false);
  assert.equal(sync.consume("projects"), false);
});

test("valid language commands defer URL updates to locale navigation", () => {
  const updates: string[] = [];
  const sync = createCommandUrlSync((command) => updates.push(command));
  sync.submit("lang", "pl");
  assert.deepEqual(updates, []);
  assert.equal(sync.consume("lang pl"), true);
  sync.submit("lang", "invalid");
  assert.deepEqual(updates, ["lang invalid"]);
});
