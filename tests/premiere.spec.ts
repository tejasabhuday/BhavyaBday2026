import { test, expect } from "@playwright/test";
test("story works, media stays silent, cards and dialog support keyboard", async ({
  page,
}, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "BHAVYA", exact: true }),
  ).toBeVisible();
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-invitation.png`,
    fullPage: false,
  });
  await page.getByRole("link", { name: "Skip intro" }).click();
  await expect(page).toHaveURL(/#poster$/);
  await expect(page.getByRole("heading", { name: /How to be/ })).toBeVisible();
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-poster.png`,
    fullPage: false,
  });
  const cards = page.locator(".love-card");
  await expect(cards).toHaveCount(10);
  await cards.first().focus();
  await page.keyboard.press("Space");
  await expect(cards.first()).toHaveAttribute("aria-pressed", "true");
  await cards.first().click();
  await expect(cards.first()).toHaveAttribute("aria-pressed", "false");
  await page.getByRole("button", { name: "Next childhood photo" }).click();
  await expect(page.locator(".rail-controls")).toContainText("2 / 5");
  const opener = page.getByRole("button", { name: /Watch the little moments/ });
  await opener.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  const player = page.locator("video");
  const hasVideo = (await player.count()) > 0;
  if (hasVideo) {
    expect(
      await player.evaluate(
        (el: HTMLVideoElement) => el.paused && el.muted && !el.autoplay,
      ),
    ).toBe(true);
    await player.focus();
    await page.keyboard.press("Space");
    await expect
      .poll(() => player.evaluate((el: HTMLVideoElement) => !el.paused))
      .toBe(true);
  } else {
    await expect(page.getByText("A few little moments,")).toBeVisible();
  }
  await page.getByRole("button", { name: "Close gallery" }).focus();
  await page.keyboard.press("Shift+Tab");
  if (hasVideo)
    await expect(page.locator(".video-tabs button").last()).toBeFocused();
  else
    await expect(
      page.getByRole("button", { name: "Close gallery" }),
    ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(opener).toBeFocused();
  await expect(page.getByText("The full feature is coming soon")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Watch your birthday movie" }),
  ).toHaveCount(0);
  if (hasVideo)
    expect(await player.evaluate((el: HTMLVideoElement) => el.paused)).toBe(
      true,
    );
  else await expect(player).toHaveCount(0);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  expect(errors).toEqual([]);
  await page.screenshot({
    path: `test-results/${testInfo.project.name}-story.png`,
    fullPage: true,
  });
});
test("reduced motion and no JavaScript retain the complete letter", async ({
  browser,
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
  const context = await browser.newContext({ javaScriptEnabled: false });
  const staticPage = await context.newPage();
  await staticPage.goto("/");
  await expect(
    staticPage.getByRole("heading", { name: "Dear Bhavya," }),
  ).toBeVisible();
  await expect(
    staticPage.getByText("Happy Birthday, Bhavya. This one’s all about you."),
  ).toBeVisible();
  await context.close();
});
