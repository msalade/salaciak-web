import { expect, test } from "@playwright/test";

test("opens a shared search command and renders linked results", async ({ page }) => {
  await page.goto("/?command=search%20kubernetes");
  await expect(page.getByText("Search results for \"kubernetes\":")).toBeVisible();
  await expect(page.getByText("[Skills] Technology stack")).toBeVisible();
  await expect(page.getByRole("link", { name: /Open: cat tech\.md/ })).toHaveAttribute(
    "href",
    "/?command=cat%20tech.md",
  );
});

test("shows clickable command suggestions", async ({ page }) => {
  await page.goto("/");
  const menu = page.getByRole("navigation", { name: "Command menu" });
  await expect(menu).toBeVisible();
  await expect(menu.getByRole("link", { name: /projects/ })).toHaveAttribute(
    "href",
    "/?command=projects",
  );
});

test("completes known command arguments with Tab", async ({ page }) => {
  await page.goto("/");
  const editor = page.locator("#terminalEditor");
  await editor.click();
  await page.keyboard.type("cat ex");
  await page.keyboard.press("Tab");
  await expect(editor.locator('[class*="lineText"]').last()).toContainText("cat experience.md");
});

test("persists command history between terminal navigations", async ({ page }) => {
  await page.goto("/?command=projects");
  await expect(page.locator("#terminalEditor")).toContainText("Personal portfolio");
  await page.goto("/?command=history");
  await expect(page.locator("#terminalEditor")).toContainText(/projects/);
});

test("switches the interface language from the display controls", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Switch language" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "pl");
  await expect(page.getByRole("link", { name: "Zmień język" })).toBeVisible();
});

test("provides a semantic portfolio view and reduced-motion toggle", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Open accessible portfolio view" }).click();
  await expect(page.getByRole("heading", { name: "Accessible portfolio" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Experience" })).toBeVisible();
  await expect(page.getByRole("link", { name: "projects" })).toHaveAttribute(
    "href",
    "/?command=projects",
  );

  await page.getByRole("button", { name: "Reduce motion" }).click();
  await expect(page.getByRole("button", { name: "Enable motion" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("uses the requested locale for command output", async ({ page }) => {
  await page.goto("/pl/?command=help");
  await expect(page.getByText("Dostępne polecenia:")).toBeVisible();
  await expect(page.getByText(/wyszukaj doświadczenie/)).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "pl");
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
