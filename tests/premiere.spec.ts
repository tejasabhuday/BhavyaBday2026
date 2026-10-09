import { test, expect } from "@playwright/test";
import { siteContent } from "../src/data/siteContent";
const routes = [
  ["/", "Bhavya, in full bloom."],
  ["/love-notes", "10 things I love about you."],
  ["/memories", "Little you. Wonderful you."],
  ["/rom-coms", "A little cinema. A lot of you."],
  ["/letter", "For my everything."],
  ["/a-little-magic", "Twenty-one. Still full of wonder."],
  ...siteContent.loveNotes.map((note, i) => [
    `/love-notes/${i + 1}`,
    note.title,
  ]),
];
for (const [route, title] of routes) {
  test(`${route} is a responsive independent page`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    expect(response?.headers()["x-robots-tag"]).toContain("noindex");
    await expect(page.getByRole("link", { name: "For My beautiful baingan, home" })).toBeVisible();
    await expect(
      page.getByRole("heading", { level: 1, name: title, exact: true }),
    ).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    for (const img of await page.locator(".photo-frame img, .candid-thumbnail img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (el: HTMLImageElement) => el.complete && el.naturalWidth > 0,
          ),
        )
        .toBe(true);
      await img.evaluate((el: HTMLImageElement) => el.decode());
    }
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    const text = await page.locator("main").innerText();
    expect(text.replaceAll("Jab We Met", "")).not.toMatch(/\bwe\b/i);
    expect(text).not.toContain("Screening room");
    expect(errors).toEqual([]);
    await page.screenshot({
      path: `test-results/${info.project.name}-${route === "/" ? "premiere" : route.slice(1).replaceAll("/", "-")}.png`,
      fullPage: true,
    });
  });
}
test("chapter navigation and nested scrapbook stamps work", async ({
  page,
}, info) => {
  await page.goto("/");
  await expect(
    page.getByText("THE BHAVYA 21ST BIRTHDAY PRODUCTION"),
  ).toBeVisible();
  await page.getByRole("button", { name: "A tiny secret for you" }).click();
  await expect(
    page.getByText("Beautiful baingan, even this tiny heart is yours."),
  ).toBeVisible();
  if (info.project.name === "mobile") {
    await page.getByRole("button", { name: "Chapters" }).click();
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
  await page.getByRole("link", { name: /OPEN YOUR SCRAPBOOK/ }).click();
  await expect(page).toHaveURL(/\/love-notes\/1$/);
  await page.getByRole("link", { name: "Next lovely thing" }).click();
  await expect(page).toHaveURL(/\/love-notes\/2$/);
  await page.getByRole("link", { name: "Previous page" }).click();
  await expect(page).toHaveURL(/\/love-notes\/1$/);
  await page.goto("/");
  await expect(page.locator(".passport-stamps .stamped")).toHaveCount(2);
  await page.evaluate(() =>
    localStorage.setItem(
      "bhavya-visited-chapters-v2",
      JSON.stringify([
        "/",
        "/love-notes",
        "/memories",
        "/rom-coms",
        "/letter",
        "/screening-room",
        "/a-little-magic",
      ]),
    ),
  );
  await page.reload();
  await expect(page.locator(".passport-stamps .stamped")).toHaveCount(6);
  await expect(page.locator(".passport-complete")).toBeVisible();
});
test("all ten scrapbook pages have individual photo slots and page navigation", async ({
  page,
}) => {
  await page.goto("/love-notes");
  await expect(page.locator(".scrap-index-card")).toHaveCount(10);
  for (let n = 1; n <= 10; n++) {
    await page.goto(`/love-notes/${n}`);
    await expect(
      page.locator(`.photo-love-${String(n).padStart(2, "0")}`),
    ).toHaveCount(1);
    await expect(
      page.locator(".scrap-page-tabs a[aria-current=page]"),
    ).toHaveText(String(n).padStart(2, "0"));
    await expect(page.locator(".scrapbook-writing-leaf>p")).toHaveCount(2);
  }
  await page.getByRole("link", { name: "Her memory book" }).click();
  await expect(page).toHaveURL(/\/memories$/);
  const bad = await page.goto("/love-notes/11");
  expect(bad?.status()).toBe(404);
});
test("memory album centres her and birthday wishes are reversible", async ({
  page,
}) => {
  await page.goto("/memories");
  await expect(page.locator(".album-polaroid")).toHaveCount(3);
  await expect(
    page.getByRole("button", { name: "My favourite scenes" }),
  ).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText("10 km");
  await page.getByRole("button", { name: "Little you", exact: true }).click();
  await expect(page.locator(".album-polaroid")).toHaveCount(5);
  await page
    .getByRole("button", { name: "Out in the world", exact: true })
    .click();
  await expect(page.locator(".album-polaroid")).toHaveCount(4);
  const wish = page.locator(".birthday-dreams .future-grid button").first();
  await wish.click();
  await expect(wish).toHaveAttribute("aria-pressed", "true");
  await wish.click();
  await expect(wish).toHaveAttribute("aria-pressed", "false");
});
test("movie shelf keeps K3G, adds 50 First Dates and has no external film links", async ({
  page,
}) => {
  await page.goto("/rom-coms");
  await expect(page.locator(".film-cover")).toHaveCount(6);
  await expect(page.getByText("Notting Hill", { exact: true })).toHaveCount(0);
  await expect(page.getByText("50 First Dates", { exact: true })).toBeVisible();
  await expect(page.locator('main a[href^="http"]')).toHaveCount(0);
  await page
    .getByRole("button", { name: "All the drama", exact: true })
    .click();
  await expect(page.locator(".film-cover")).toHaveCount(2);
  await page
    .getByRole("button", { name: "Open Kabhi Khushi Kabhie Gham" })
    .click();
  await expect(page.locator("#film-k3g-dedication")).toBeVisible();
  await page
    .getByRole("button", { name: "Open Kabhi Khushi Kabhie Gham" })
    .click();
  await expect(page.locator("#film-k3g-dedication")).not.toBeVisible();
  await page.getByRole("button", { name: "Soft & sweet", exact: true }).click();
  await expect(page.locator(".film-cover")).toHaveCount(1);
  await page.getByRole("button", { name: "Open 50 First Dates" }).click();
  await expect(
    page.locator("#film-fifty-first-dates-dedication"),
  ).toBeVisible();
});
test("ancient scroll opens with keyboard, preserves the letter, works without JS", async ({
  page,
  browser,
}, info) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/letter");
  await expect(page.locator(".scroll-envelope")).not.toHaveAttribute("open");
  await page.locator("summary").focus();
  await page.keyboard.press("Enter");
  await expect(page.locator(".scroll-envelope")).toHaveAttribute("open", "");
  await expect(
    page.getByRole("heading", { name: "My beautiful baingan," }),
  ).toBeVisible();
  await expect(
    page.getByText(/I came ten kilometres on a cycle/),
  ).toBeVisible();
  await expect(page.getByText(/Happy 21st Birthday, Bhavya/)).toBeVisible();
  await expect(page.locator(".scroll-parchment")).not.toContainText("\\n");
  await page.screenshot({
    path: `test-results/${info.project.name}-scroll-open.png`,
    fullPage: true,
  });
  await page.getByRole("button", { name: "Blow out the candles" }).click();
  await expect(
    page.getByRole("heading", { name: "I hope it comes true." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Light them again" }).click();
  await expect(page.locator(".candles-lit")).toHaveCount(1);
  await page.locator("summary").click();
  await expect(page.locator(".scroll-envelope")).not.toHaveAttribute("open");
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: page.viewportSize() || undefined,
  });
  const staticPage = await context.newPage();
  await staticPage.goto("/letter");
  await staticPage.locator("summary").click();
  await expect(
    staticPage.getByRole("heading", { name: "My beautiful baingan," }),
  ).toBeVisible();
  await context.close();
});
test("globe dances, pauses and shakes; reduced motion is respected and wishes cycle", async ({
  page,
}) => {
  await page.goto("/a-little-magic");
  await expect(page.locator(".is-dancing")).toHaveCount(0);
  await page.getByRole("button", { name: "Let them dance" }).click();
  await expect(page.locator(".is-dancing")).toHaveCount(1);
  expect(
    await page
      .locator(".dancer-pair")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("couple-dance");
  await page.getByRole("button", { name: "Pause the dance" }).click();
  expect(
    await page
      .locator(".dancer-pair")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page.getByRole("button", { name: "Shake the globe" }).click();
  await expect(page.locator(".globe-shaken .globe-particle")).toHaveCount(24);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.getByRole("button", { name: "Let them dance" }).click();
  expect(
    await page
      .locator(".dancer-pair")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  await page.getByRole("button", { name: "Pick a birthday wish" }).click();
  await expect(page.locator(".wish-jar-note")).toContainText("WISH 1 / 21");
  for (let i = 0; i < 20; i++)
    await page.getByRole("button", { name: "One more little wish" }).click();
  await expect(page.locator(".wish-jar-note")).toContainText("WISH 21 / 21");
  await page.getByRole("button", { name: "One more little wish" }).click();
  await expect(page.locator(".wish-jar-note")).toContainText("WISH 1 / 21");
  await expect(page.locator("video,iframe")).toHaveCount(0);
});
test("globe soundtrack starts with the dance, pauses, mutes and stops on leaving", async ({ page }) => {
  await page.goto("/a-little-magic");
  const audio = page.locator("audio");
  if (await audio.count() === 0) {
    await expect(page.getByRole("button", { name: "Mute song" })).toHaveCount(0);
    await expect(page.locator(".globe-music")).toHaveCount(0);
    return;
  }
  expect(await audio.evaluate((el: HTMLAudioElement) => el.paused && !el.autoplay && el.preload === "none")).toBe(true);
  await page.getByRole("button", { name: "Let them dance" }).click();
  await expect.poll(() => audio.evaluate((el: HTMLAudioElement) => !el.paused && el.currentTime > 0)).toBe(true);
  await page.getByRole("button", { name: "Mute song" }).click();
  expect(await audio.evaluate((el: HTMLAudioElement) => el.muted)).toBe(true);
  await page.getByRole("button", { name: "Unmute song" }).click();
  expect(await audio.evaluate((el: HTMLAudioElement) => el.muted)).toBe(false);
  await page.getByRole("slider", { name: "Song volume" }).fill("0.2");
  expect(await audio.evaluate((el: HTMLAudioElement) => el.volume)).toBeCloseTo(0.2);
  await page.getByRole("button", { name: "Pause the dance" }).click();
  expect(await audio.evaluate((el: HTMLAudioElement) => el.paused)).toBe(true);
  const position = await audio.evaluate((el: HTMLAudioElement) => el.currentTime);
  await page.getByRole("button", { name: "Let them dance" }).click();
  await expect.poll(() => audio.evaluate((el: HTMLAudioElement, previous: number) => !el.paused && el.currentTime > previous, position)).toBe(true);
  await audio.evaluate((el: HTMLAudioElement) => { el.currentTime = el.duration - 0.05; });
  await expect(page.locator(".is-dancing")).toHaveCount(0);
  expect(await audio.evaluate((el: HTMLAudioElement) => el.paused)).toBe(true);
  await page.getByRole("button", { name: "Let them dance" }).click();
  await expect.poll(() => audio.evaluate((el: HTMLAudioElement) => !el.paused && el.currentTime < 2)).toBe(true);
  await page.evaluate(() => {
    (window as unknown as { globeAudio: HTMLAudioElement }).globeAudio = document.querySelector("audio")!;
  });
  await page.getByRole("link", { name: "For My beautiful baingan, home" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect.poll(() => page.evaluate(() => (window as unknown as { globeAudio: HTMLAudioElement }).globeAudio.paused)).toBe(true);
});
test("old screening URL redirects and reduced-motion navigation remains usable", async ({
  page,
}) => {
  await page.goto("/screening-room");
  await expect(page).toHaveURL(/\/a-little-magic$/);
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
});
test("candid clips in the album are silent and pause on switching or closing when supplied", async ({
  page,
}) => {
  await page.goto("/memories");
  const choices = page.locator(".candid-buttons button");
  if ((await choices.count()) === 0) {
    await expect(page.locator(".candid-moments,video")).toHaveCount(0);
    return;
  }
  await choices.first().click();
  const video = page.locator("video");
  expect(
    await video.evaluate(
      (el: HTMLVideoElement) =>
        el.paused && el.muted && !el.autoplay && el.preload === "none",
    ),
  ).toBe(true);
  await video.focus();
  await page.keyboard.press("Space");
  await expect
    .poll(() => video.evaluate((el: HTMLVideoElement) => !el.paused))
    .toBe(true);
  await page.evaluate(() => {
    (window as unknown as { previousVideo: HTMLVideoElement }).previousVideo =
      document.querySelector("video")!;
  });
  if ((await choices.count()) > 1) {
    await choices.last().click();
    expect(
      await page.evaluate(
        () =>
          (window as unknown as { previousVideo: HTMLVideoElement })
            .previousVideo.paused,
      ),
    ).toBe(true);
  }
  await page.getByRole("button", { name: "Close this moment" }).click();
  await expect(video).toHaveCount(0);
  for (const choice of await choices.all()) {
    await choice.click();
    await video.evaluate((el: HTMLVideoElement) => {
      el.preload = "metadata";
      el.load();
    });
    await expect
      .poll(() => video.evaluate((el: HTMLVideoElement) => Number.isFinite(el.duration) && el.duration > 0 && el.videoWidth > 0))
      .toBe(true);
    await expect(page.getByText("This moment couldn’t play. Try a different little scene.")).toHaveCount(0);
    await page.getByRole("button", { name: "Close this moment" }).click();
  }
});
