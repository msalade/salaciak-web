import assert from "node:assert/strict";
import test from "node:test";
import { cursorStyles, parseCursorStyle } from "../terminal/cursor";

test("exposes the supported cursor styles", () => {
  assert.deepEqual(cursorStyles, ["block", "bar", "underline", "pulse"]);
});

test("accepts supported cursor styles and rejects unknown values", () => {
  assert.equal(parseCursorStyle("bar"), "bar");
  assert.equal(parseCursorStyle(" underline "), "underline");
  assert.equal(parseCursorStyle("pulse"), "pulse");
  assert.equal(parseCursorStyle("cursor"), null);
  assert.equal(parseCursorStyle(""), null);
});

test("cursor style parsing is case insensitive", () => {
  assert.equal(parseCursorStyle("PULSE"), "pulse");
});
