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
