import test from "node:test";
import assert from "node:assert/strict";
import { shouldPlayBoot } from "../terminal/boot";

const firstVisit = { shared: false, reduced: false };
test("boot plays on every ordinary visit", () => {
  assert.equal(shouldPlayBoot(firstVisit), true);
  assert.equal(shouldPlayBoot({ ...firstVisit, shared: true }), false);
});
test("boot always respects reduced motion", () => {
  assert.equal(shouldPlayBoot({ ...firstVisit, reduced: true }), false);
});
