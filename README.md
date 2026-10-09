# For Bhavya. With love.

A personal, six-page 21st birthday website for beautiful baingan, Chunnilal, my everything. Next.js App Router, React, TypeScript, Tailwind and Motion. Original cinema-inspired artwork, bundled licensed fonts, and real memories: the first meeting after a 10 km cycle ride, late-night movie nights across the distance, and her on an ordinary day.

## Pages

| Route | Experience |
| --- | --- |
| `/` | Yellow editorial premiere, illustrated birthday collage, a tiny secret, chapter directory and passport |
| `/love-notes` | Ten expandable personal notes, open-all/fold-all, and four “open when” letters |
| `/memories` | Four album filters, full-proportion photo frames and a locally saved future-scenes list |
| `/rom-coms` | Six original film-inspired covers, mood filters, film resources and a movie-night picker |
| `/letter` | Personal letter, the 21st birthday wish and reversible birthday candles |
| `/screening-room` | User-controlled, initially muted clips, pause/switch controls, and a real-film CTA only when supplied |

Mobile has a keyboard-accessible chapter menu. All routes can be opened directly and have metadata, active navigation and next-page links. The old `/#poster` link still lands on the new home hero. No page is locked behind a loader, intro or forced playback.

## Run

Node.js 24 and npm 11 were used in cloud. Use the existing checkout; cloud tasks are already isolated and do not need another worktree.

```sh
npm ci --cache /workspace/.npm-cache # outside cloud, use npm ci with your normal cache
npm run dev
```

Production: `npm run build`, then `npm run start`. No backend or secrets. `SITE_URL` is optional and only sets metadata; it defaults to the supplied Vercel URL. Fonts are bundled from Fontsource, not requested from Google at runtime.

## Check

```sh
npm run lint
npm run typecheck
npm run media:audit
npm run build
npm test
```

Playwright starts a fresh production server on port 3100 and checks all six routes at 360×800 and 1440×900, horizontal overflow, navigation, local chapter stamps, keyboard notes, album filters, locally saved picks, rom-com filters, the 21st birthday letter, candle interaction, reduced motion, no-JavaScript letter rendering, and the missing-media state. All twelve page screenshots are saved under ignored `test-results/`. For browsers outside this cloud image, run `npx playwright install chromium`; set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` if using a system browser.

When approved clips exist, the playback test also verifies paused/muted/no-autoplay startup, keyboard play, pause, pausing before switching, and a failed-video fallback. Temporary plain-color fixtures can validate this before personal clips arrive; they are not gifts or public assets.

## Personalise

- `src/data/siteContent.ts`: nickname, first-person dedication, ten confessions, letter, open-when notes, future scene ideas, signature and the real `movieUrl`.
- `src/data/media-manifest.json`: single allowlist of fifteen photo slots, source mapping, honest descriptions and captions.
- `src/data/media.ts`: approved clips and the deliberately empty optional personal-wishes list.
- `src/data/films.ts`: six movie inspirations and resource links. Covers are original illustrations, not downloaded posters. “Find the official trailer” opens a labelled YouTube search; it does not claim an unverified video is official.

Narrative copy speaks from “I” to “you.” The word “We” appears only inside the actual film title **Jab We Met**. Nothing pretends to be a quote from somebody else.

## Add the approved media

See **[MEDIA_REQUEST.md](MEDIA_REQUEST.md)** for the exact photo/video list. Only the markdown brief has been supplied so far; no personal media is included in this repository. Artwork intentionally fills missing scenes. The highest-priority photos are the hero portrait, first-meeting memory, long-distance movie night and an ordinary-day photo.

```sh
npm run media:prepare -- /absolute/path/to/approved-photos
npm run media:videos -- /absolute/path/to/approved-videos
npm run media:audit
npm run build
```

Photo imports accept the original manifest filenames or semantic `<slot>.jpg` aliases. Sharp preserves the complete image proportions, applies EXIF orientation and outputs optimized WebP. No facial edits, beauty filters or cropping. Video imports need ffmpeg and accept manifest filenames or `<slot>.mp4`/`<slot>.mov`; H.264/AAC outputs preserve the full duration, proportions and native audio, with a JPEG poster. Supply a reviewed `<slot>.vtt` for speech captions. MOV source copies stay untouched.

Media availability is discovered **at build time**. Rebuild after adding media. Public derivatives are ignored by Git until explicitly approved for a deploy; raw originals belong outside the public web root. A personal greeting from someone else should only be added after their approval. The site doesn’t require greeting videos to work.

## Deployment

The existing site is `https://bhavya-bday2026.vercel.app`. If the Vercel project is connected to this repository’s `main` branch, a pushed commit triggers its configured deployment. A Git push alone does not establish that Vercel completed the build. To deploy manually, import this repository as Next.js, Node 24, install `npm ci`, build `npm run build`. All six routes are prerendered; use a Next-compatible host for bundled fonts, image optimization and routing.

There is no analytics, tracking, social embed, background audio or automatic video fetch. The passport and future list use this browser’s localStorage only; nothing is sent to me or a server. The website requests only same-origin assets during normal browsing. Movie resource destinations are contacted only when their links are clicked. `robots` metadata and `X-Robots-Tag` disable indexing. For access-controlled viewing, enable Vercel deployment protection: a secret URL and noindex alone are not private access controls.

See [ASSET_CREDITS.md](ASSET_CREDITS.md) for artwork, font licences and film-resource provenance. Live performance with the actual media remains to be measured after the approved files arrive.
