import { expect, test } from "@playwright/test";

test("submitted commands update the shareable URL without replaying output", async ({ page }) => {
  await page.goto("/?ref=test");
  await page.locator("#terminalEditor").click();
  await page.keyboard.type("projects");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/command=projects/);
  await expect(page.getByText(/Personal portfolio with/)).toHaveCount(1);
  await page.keyboard.type("search kubernetes");
  await page.keyboard.press("Enter");
  await expect.poll(() => new URL(page.url()).searchParams.get("command")).toBe("search kubernetes");
  expect(new URL(page.url()).searchParams.get("ref")).toBe("test");
  await expect(page.getByText(/Personal portfolio with/)).toHaveCount(1);
  await page.reload();
  await expect(page.getByText('Search results for "kubernetes":')).toHaveCount(1);
  await expect(page.getByText(/Personal portfolio with/)).toHaveCount(0);
});

test("typed commands retain the Polish locale and encode special characters", async ({ page }) => {
  await page.goto("/pl/?ref=shared");
  await page.locator("#terminalEditor").click();
  await page.keyboard.type("search React & TypeScript");
  await page.keyboard.press("Enter");
  await expect.poll(() => new URL(page.url()).searchParams.get("command")).toBe("search React & TypeScript");
  expect(new URL(page.url()).pathname).toMatch(/^\/pl/);
  expect(new URL(page.url()).searchParams.get("ref")).toBe("shared");
  await expect(page.locator("html")).toHaveAttribute("lang", "pl");
});

test("opens a shared search command and renders linked results", async ({ page }) => {
  await page.goto("/?command=search%20kubernetes");
  await expect(page.getByText("Search results for \"kubernetes\":")).toBeVisible();
  await expect(page.getByText("[Skills] Technology stack")).toBeVisible();
  await expect(page.getByRole("link", { name: /Open: cat tech\.md/ })).toHaveAttribute(
    "href",
    "/?command=cat%20tech.md",
  );
});

test("shows only the terminal by default", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("#terminalEditor")).toBeVisible();
  await expect(page.getByRole("navigation", { name: "Command menu" })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Open accessible portfolio view" })).toHaveCount(0);
});

test("completes known command arguments with Tab", async ({ page }) => {
  await page.goto("/");
  const editor = page.locator("#terminalEditor");
  await editor.click();
  await page.keyboard.type("cat ex");
  await page.keyboard.press("Tab");
  await expect(editor.locator('[class*="lineText"]').last()).toContainText("cat experience.md");
});

test("cycles to the next completion candidate with Tab", async ({ page }) => {
  await page.goto("/");
  const editor = page.locator("#terminalEditor");
  await editor.click();
  await page.keyboard.type("cat ");
  await page.keyboard.press("Tab");
  await expect(editor.locator('[class*="lineText"]').last()).toContainText("cat about_me.md");
  await page.keyboard.press("Tab");
  await expect(editor.locator('[class*="lineText"]').last()).toContainText("cat me.jpeg");
});

test("expands partial argument completion on the second Tab", async ({ page }) => {
  await page.goto("/");
  const editor = page.locator("#terminalEditor");
  await editor.click();
  await page.keyboard.type("cat ex");
  await page.keyboard.press("Tab");
  await expect(editor.locator('[class*="lineText"]').last()).toContainText("cat experience.md");
  await page.keyboard.press("Tab");
  await expect(editor.locator('[class*="lineText"]').last()).toContainText("cat tech.md");
});

test("persists command history between terminal navigations", async ({ page }) => {
  await page.goto("/?command=projects");
  await expect(page.locator("#terminalEditor")).toContainText("Personal portfolio");
  await page.goto("/?command=history");
  await expect(page.locator("#terminalEditor")).toContainText(/projects/);
});

test("opens the semantic portfolio view through a terminal command", async ({ page }) => {
  await page.goto("/?command=accessible");
  await expect(page.getByRole("heading", { name: "Accessible portfolio" })).toBeVisible();
  await expect(page.locator("#terminalEditor")).toBeVisible();
});

test("changes motion mode through a terminal command", async ({ page }) => {
  await page.goto("/?command=motion%20reduce");
  await expect(page.locator("[data-reduced-motion='true']")).toBeVisible();
});

test("switches and persists cursor animation through a terminal command", async ({ page }) => {
  await page.goto("/?command=cursor%20pulse");
  await expect(page.locator("[data-cursor-style='pulse']")).toBeVisible();
  await expect.poll(() => page.evaluate(() => localStorage.getItem("salaciak-cursor-style"))).toBe('"pulse"');
  await page.reload();
  await expect(page.locator("[data-cursor-style='pulse']")).toBeVisible();

  await page.locator("#terminalEditor").click();
  await page.keyboard.type("cursor bar");
  await page.keyboard.press("Enter");
  await expect(page.locator("[data-cursor-style='bar']")).toBeVisible();
});

test("uses the requested locale for command output", async ({ page }) => {
  await page.goto("/pl/?command=help");
  await expect(page.locator("#terminalEditor")).toContainText("Dostępne polecenia:");
  await expect(page.locator("#terminalEditor")).toContainText("wyszukaj doświadczenie");
  await expect(page.locator("html")).toHaveAttribute("lang", "pl");
});

test("serves the PWA manifest directly", async ({ request }) => {
  const response = await request.get("/manifest.json");
  await expect(response).toBeOK();
  expect(response.headers()["content-type"]).toContain("application/json");
  expect((await response.json()).start_url).toBe("/");

  const iconResponse = await request.get("/favicon-16x16.png");
  await expect(iconResponse).toBeOK();
});

test("uses MSW to verify a valid CAPTCHA token through the real email API", async ({ request }) => {
  const response = await request.get("/api/email?token=e2e-valid-token");
  expect(response.status()).toBe(200);
  await expect(response).toBeOK();
  expect(await response.json()).toEqual({ email: "e2e@example.test" });
});

test("rejects unsupported API methods before CAPTCHA verification", async ({ request }) => {
  const response = await request.post("/api/email");
  expect(response.status()).toBe(405);
  expect(response.headers()["allow"]).toBe("GET");
  expect(await response.json()).toEqual({ message: "Method not allowed" });
});
