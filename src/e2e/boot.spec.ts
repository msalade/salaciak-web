import { expect, test } from "@playwright/test";

test("CRT entrance plays on every reload", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.getByTestId("crt-boot")).toBeVisible();
  await expect(page.getByTestId("crt-boot")).toHaveCount(0);
  await page.reload();
  await expect(page.getByTestId("crt-boot")).toBeVisible();
  await expect(page.locator("#terminalEditor")).toBeVisible();
});

test("boot entrance can be skipped with keyboard or click", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await expect(page.getByTestId("crt-boot")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByTestId("crt-boot")).toHaveCount(0);
  await page.reload();
  await expect(page.getByTestId("crt-boot")).toBeVisible();
  await page.getByTestId("crt-boot").click();
  await expect(page.getByTestId("crt-boot")).toHaveCount(0);
});

test("shared links and reduced-motion preferences bypass the entrance", async ({ page }) => {
  await page.goto("/?command=projects");
  await expect(page.getByText(/Personal portfolio with/)).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator("#terminalEditor")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.evaluate(() => localStorage.setItem("salaciak-reduced-motion", "true"));
  await page.reload();
  await expect(page.locator("#terminalEditor")).toBeVisible();
  await expect(page.getByTestId("crt-boot")).toHaveCount(0);
});
