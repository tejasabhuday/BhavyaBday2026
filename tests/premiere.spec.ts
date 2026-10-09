import { test, expect } from "@playwright/test";
const pages = [
  ["/", "You, in every universe."],
  ["/love-notes", "10 things I love about you."],
  ["/memories", "I’d keep every little moment."],
  ["/rom-coms", "A little cinema. A lot of you."],
  ["/letter", "For my everything."],
  ["/screening-room", "My favourite leading lady."],
];
for (const [route, title] of pages) {
  test(`${route} is a responsive standalone chapter`, async ({
    page,
  }, info) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    expect(response?.headers()["x-robots-tag"]).toContain("noindex");
    await expect(
      page.getByRole("heading", { level: 1, name: title }),
    ).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    for (const img of await page.locator(".photo-frame img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const text = await page.locator("main").innerText();
    expect(text.replaceAll("Jab We Met", "")).not.toMatch(/\bwe\b/i);
    expect(errors).toEqual([]);
    await page.screenshot({
      path: `test-results/${info.project.name}-${route === "/" ? "premiere" : route.slice(1)}.png`,
      fullPage: true,
    });
  });
}
test("real page navigation, birthday detail and private chapter stamps", async ({
  page,
}, info) => {
  await page.goto("/");
  await expect(
    page.getByText("THE BHAVYA 21ST BIRTHDAY PRODUCTION"),
  ).toBeVisible();
  const secret = page.getByRole("button", { name: "A tiny secret for you" });
  await secret.click();
  await expect(
    page.getByText("Beautiful baingan, even this tiny heart is yours."),
  ).toBeVisible();
  await secret.click();
  if (info.project.name === "mobile") {
    await page.getByRole("button", { name: "Chapters" }).click();
    await expect(
      page.getByRole("navigation", { name: "Mobile chapters" }),
    ).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(
      page.getByRole("button", { name: "Chapters" }),
    ).toHaveAttribute("aria-expanded", "false");
    await page.getByRole("button", { name: "Chapters" }).click();
    await page
      .getByRole("navigation", { name: "Mobile chapters" })
      .getByRole("link", { name: /10 things I love/ })
      .click();
  } else {
    await page
      .getByRole("navigation", { name: "Chapters", exact: true })
      .getByRole("link", { name: "Love notes", exact: true })
      .click();
  }
  await expect(page).toHaveURL(/\/love-notes$/);
  await page.getByRole("link", { name: /The memory book/ }).click();
  await expect(page).toHaveURL(/\/memories$/);
  await page.goto("/");
  await expect(page.locator(".passport-stamps .stamped")).toHaveCount(3);
});
test("love notes open with keyboard, open-all and open-when reverse", async ({
  page,
}) => {
  await page.goto("/love-notes");
  const note = page.locator(".note-card button").first();
  await note.focus();
  await page.keyboard.press("Space");
  await expect(note).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("#love-note-0")).toBeVisible();
  await page.getByRole("button", { name: "Open every note" }).click();
  await expect(page.locator(".note-open")).toHaveCount(10);
  await page.getByRole("button", { name: "Fold them back" }).click();
  await expect(page.locator(".note-open")).toHaveCount(0);
  const when = page.getByRole("button", { name: "You miss me" });
  await when.click();
  await expect(page.getByText("Here’s a tiny piece of me")).toBeVisible();
  await when.click();
  await expect(when).toHaveAttribute("aria-expanded", "false");
});
test("memory filters and future-scene picks persist locally", async ({
  page,
}) => {
  await page.goto("/memories");
  await expect(
    page.getByText("10 km. One cycle. You.", { exact: true }),
  ).toHaveCount(2);
  await expect(page.locator(".album-polaroid")).toHaveCount(3);
  await page.getByRole("button", { name: "Little you", exact: true }).click();
  await expect(page.locator(".album-polaroid")).toHaveCount(5);
  await page
    .getByRole("button", { name: "Out in the world", exact: true })
    .click();
  await expect(page.locator(".album-polaroid")).toHaveCount(4);
  const pick = page.locator(".future-grid button").first();
  await pick.click();
  await expect(pick).toHaveAttribute("aria-pressed", "true");
  await page.reload();
  await expect(pick).toHaveAttribute("aria-pressed", "true");
  await pick.click();
  await expect(pick).toHaveAttribute("aria-pressed", "false");
});
test("rom-com mood filters and movie-night pick work without external embeds", async ({
  page,
}) => {
  await page.goto("/rom-coms");
  await expect(page.locator(".film-cover")).toHaveCount(6);
  await page
    .getByRole("button", { name: "All the drama", exact: true })
    .click();
  await expect(page.locator(".film-cover")).toHaveCount(2);
  await page
    .getByRole("button", { name: "Open Kabhi Khushi Kabhie Gham" })
    .click();
  const resource = page.getByRole("link", { name: "About the film" });
  await expect(resource).toHaveAttribute(
    "href",
    "https://en.wikipedia.org/wiki/Kabhi_Khushi_Kabhie_Gham...",
  );
  await page.getByRole("button", { name: "Pick for a movie night" }).click();
  await expect(page.locator(".movie-night-pick")).toContainText(
    "Kabhi Khushi Kabhie Gham? It’s a date.",
  );
  await expect(page.locator("iframe,audio")).toHaveCount(0);
  await page
    .getByRole("button", { name: "All the films", exact: true })
    .click();
  await expect(page.locator(".film-cover")).toHaveCount(6);
});
test("letter contains real memories, birthday candles reverse, and no JS keeps the letter", async ({
  page,
  browser,
}) => {
  await page.goto("/letter");
  await expect(
    page.getByText(/I came ten kilometres on a cycle/),
  ).toBeVisible();
  await expect(page.getByText(/Happy 21st Birthday, Bhavya/)).toBeVisible();
  await page.getByRole("button", { name: "Blow out the candles" }).click();
  await expect(
    page.getByRole("heading", { name: "I hope it comes true." }),
  ).toBeVisible();
  await expect(page.locator(".candles-lit")).toHaveCount(0);
  await page.getByRole("button", { name: "Light them again" }).click();
  await expect(page.locator(".candles-lit")).toHaveCount(1);
  const context = await browser.newContext({ javaScriptEnabled: false, viewport:page.viewportSize()||undefined });
  const staticPage = await context.newPage();
  await staticPage.goto("/letter");
  await expect(
    staticPage.getByRole("heading", { name: "My beautiful baingan," }),
  ).toBeVisible();
  await expect(
    staticPage.getByText(/I came ten kilometres on a cycle/),
  ).toBeVisible();
  await context.close();
});
test("screening-room playback starts silent, pauses, switches and survives missing media", async ({
  page,
}) => {
  await page.goto("/screening-room");
  await expect(page.getByText("THE FULL FEATURE IS COMING SOON")).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Watch your birthday film" }),
  ).toHaveCount(0);
  const choices = page.locator(".screening-playlist button");
  if ((await choices.count()) === 0) {
    await expect(
      page.getByRole("heading", { name: /Some scenes are worth waiting for/ }),
    ).toBeVisible();
    await expect(page.locator("video")).toHaveCount(0);
    return;
  }
  await expect(page.locator("video")).toHaveCount(0);
  await page.getByRole("button", { name: "Open this scene" }).click();
  const player = page.locator("video");
  expect(
    await player.evaluate(
      (el: HTMLVideoElement) =>
        el.paused && el.muted && !el.autoplay && el.preload === "none",
    ),
  ).toBe(true);
  await player.focus();
  await page.keyboard.press("Space");
  await expect
    .poll(() => player.evaluate((el: HTMLVideoElement) => !el.paused))
    .toBe(true);
  await page.getByRole("button", { name: "Pause this scene" }).click();
  expect(await player.evaluate((el: HTMLVideoElement) => el.paused)).toBe(true);
  await player.focus();
  await page.keyboard.press("Space");
  await page.evaluate(() => {
    (window as unknown as { previousVideo: HTMLVideoElement }).previousVideo =
      document.querySelector("video")!;
  });
  await choices.last().click();
  expect(
    await page.evaluate(
      () =>
        (window as unknown as { previousVideo: HTMLVideoElement }).previousVideo
          .paused,
    ),
  ).toBe(true);
  await expect(player).toHaveCount(0);
  await page.route("**/media/videos/*.mp4", (route) => route.abort());
  await page.getByRole("button", { name: "Open this scene" }).click();
  await player.focus();
  await page.keyboard.press("Space");
  await expect(
    page.getByText("This little scene couldn’t play."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Back to the title card" }).click();
  await expect(player).toHaveCount(0);
});
test("reduced motion and not-found path retain usable navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(
    await page
      .locator("html")
      .evaluate((el) => getComputedStyle(el).scrollBehavior),
  ).toBe("auto");
  await page.keyboard.press("Tab");
  await expect(
    page.getByRole("link", { name: "Skip to content" }),
  ).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  const response = await page.goto("/not-a-real-chapter");
  expect(response?.status()).toBe(404);
  await page.getByRole("link", { name: "Back to the premiere" }).click();
  await expect(
    page.getByRole("heading", { level: 1, name: "You, in every universe." }),
  ).toBeVisible();
});
