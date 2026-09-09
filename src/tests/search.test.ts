import assert from "node:assert/strict";
import { test } from "node:test";
import { renderToStaticMarkup } from "react-dom/server";
import { commands } from "../components/commands";
import { runLinkedCommand } from "../terminal/commandLinks";
import { searchPortfolio } from "../search/searchPortfolio";

test("search finds experience by company and technology", () => {
  assert.ok(searchPortfolio("apptio").some((result) => result.category === "Experience"));
  assert.ok(searchPortfolio("MongoDB").some((result) => result.category === "Experience"));
});

test("search finds skills and projects with links to their terminal commands", () => {
  assert.ok(searchPortfolio("Kubernetes").some((result) => result.command === "cat tech.md"));
  assert.ok(searchPortfolio("salaciak-web").some((result) => result.command === "projects"));
});

test("search ignores case and surrounding whitespace", () => {
  assert.deepEqual(searchPortfolio("  REACT  "), searchPortfolio("react"));
});

test("multi-word searches require all words within the same result", () => {
  const results = searchPortfolio("Apptio MongoDB");
  assert.ok(results.length > 0);
  assert.ok(results.every((result) => result.category === "Experience"));
  assert.deepEqual(searchPortfolio("salaciak-web nonexistentterm"), []);
});

test("empty and unmatched queries return no results", () => {
  for (const query of ["", "  ", "nonexistentterm", ".*", "[", "a".repeat(257)]) {
    assert.deepEqual(searchPortfolio(query), []);
  }
});

test("search results have unique IDs and readable excerpts", () => {
  const results = searchPortfolio("react");
  assert.equal(new Set(results.map((result) => result.id)).size, results.length);
  assert.ok(results.every((result) => result.title && result.excerpt && result.excerpt.length <= 200));
});

test("the search command provides usage and a no-results message", () => {
  const handlers = commands(() => {});
  assert.match(renderToStaticMarkup(runLinkedCommand("search", handlers)), /Usage: search/);
  assert.match(renderToStaticMarkup(runLinkedCommand("search nonexistentterm", handlers)), /No results/);
});

test("search works through shareable command links and renders result links", () => {
  const output = renderToStaticMarkup(runLinkedCommand("search Kubernetes", commands(() => {})));
  assert.match(output, /Skills/);
  assert.match(output, /href="\/\?command=cat%20tech.md"/);
  assert.doesNotMatch(output, /command not found/);
});

test("search input is escaped when displayed", () => {
  const output = renderToStaticMarkup(runLinkedCommand("search <script>alert(1)</script>", commands(() => {})));
  assert.ok(output.includes("&lt;script&gt;"));
  assert.ok(!output.includes("<script>"));
});
