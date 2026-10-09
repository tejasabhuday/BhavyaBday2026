# For Bhavya — the twenty-first birthday cut

A bright pink-and-yellow birthday website that centres **Bhavya**: her smile, expressions, style, childhood, adventures, and the next chapter of her life. The personal letter keeps the relationship memories; they no longer dominate the album and love notes.

## Pages

- `/`: a sunshine-yellow premiere, pink birthday chapter cards, and a large cake finale with 21 candles, blow-out smoke, confetti, a birthday wish and relighting.
- `/love-notes`: a scrapbook cover and table of contents.
- `/love-notes/1` through `/love-notes/10`: **ten independent scrapbook pages**, each with an approved-photo slot, two handwritten-style notes, page tabs, and previous/next navigation.
- `/memories`: her portraits, childhood and adventure albums, birthday wishes, and optional approved candid clips. No couple-album tab.
- `/letter`: the existing letter inside an animated, native HTML opening scroll. It opens with keyboard, mouse or without JavaScript.
- `/a-little-magic`: a glass keepsake globe with an original black-suit/yellow-dress dancing couple, play/pause, shake-the-globe and 21 birthday wishes.

The former `/screening-room` permanently redirects to the globe, and `/rom-coms` redirects to the letter. Both pages are removed. The original `/#poster` bookmark still lands on the homepage hero.

## Run and check

Node 24, npm 11, Next.js App Router, React, TypeScript, Tailwind and Motion. Use the existing checkout; cloud tasks are isolated and do not need an additional worktree.

```sh
npm ci --cache /workspace/.npm-cache # outside cloud, use your normal cache
npm run dev
npm run lint
npm run typecheck
npm run build
npm test
```

`npm run start` runs a production build. Playwright starts its own fresh server on port 3100 and exercises mobile 360×800 and desktop 1440×900. It checks all fifteen content routes, scrapbook photos/navigation, her album filters, the five-chapter flow and removed-page redirects, the scroll with/without JS, homepage candle blowing/relighting, dance/pause/shake, 21 wishes, reduced motion, and the legacy redirect. Screenshots are written to ignored `test-results/`. Outside cloud, install Chromium with `npx playwright install chromium`; a custom system binary can be selected with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

## Animation and accessibility

Finite homepage title/art arrivals, a few star winks, scrapbook paper/page movement, hover doodles, scroll unfurling add motion. The homepage cake has flickering candles, a staggered blow-out, drifting smoke and a finite confetti shower. Reduced motion gives an immediate candle/wish state change with no confetti or smoke. The globe dances only after a deliberate click and has a pause control. Shake particles are finite. All animations respect `prefers-reduced-motion`; the globe stays static under that preference. Nothing autoplays audio. Important copy remains readable and every chapter remains directly browsable.

## Media checklist and import

**[MEDIA_REQUEST.md](MEDIA_REQUEST.md)** is the complete checklist: 10 independent scrapbook photo slots, 3 present-day portrait slots, 5 childhood slots and 4 adventure slots. All 22 slots now use distinct originals; the scrapbook cover previews its page photos and the homepage portrait also opens the present-day album. Four selected candid videos are supplied in her album. The globe needs no uploaded photo/video. All 22 photo slots are now supplied from the uploaded archive; see [MEDIA_SELECTION.md](MEDIA_SELECTION.md) for exact selections.

```sh
npm run media:prepare -- /absolute/path/to/approved-photos
npm run media:videos -- /absolute/path/to/approved-videos
npm run media:audit
npm run build
```

Photo source mappings are centralized in `src/data/media-manifest.json`, and clip mappings in `src/data/video-manifest.json`. Semantic `<slot>.jpg` aliases and exact manifest originals work. Sharp creates proportion-preserving WebP and records content revisions to refresh cached previews; every site image uses contain, with no face crops, retouching or generated faces. ffmpeg creates H.264/AAC clips and posters while preserving duration and native audio. Reviewed `<slot>.vtt` files supply captions. Raw media stays outside the web root; public derivatives are ignored by Git until explicitly approved. Media is discovered at build time, so rebuild after adding files.

No standalone screening room is needed. If candid clips arrive, a small on-demand section appears in the memory book; without clips it stays hidden. The full birthday-film link is optional through `siteContent.movieUrl`, and absent links do not create a fake CTA. Other people's wishes require their approval before inclusion.

## Editing and deployment

- `src/data/siteContent.ts`: her 21st birthday, ten expanded notes, unchanged personal letter, nicknames, signature, optional film URL and chapters.
- `components/DancingGlobe.tsx`: fictional, faceless SVG couple and glass globe, not personal-photo manipulation.
- `components/BirthdayWishJar.tsx`: 21 extra birthday wishes.

Deploy as Next.js on the existing Vercel project (`https://bhavya-bday2026.vercel.app`), Node 24, `npm ci`, `npm run build`. If connected to `main`, pushing triggers the project's configured build; a push is not proof of Vercel completion. No required backend or credentials. `SITE_URL` is optional social metadata.

Bundled licensed fonts need no external font requests. There are no external movie links, embeds, trackers or analytics. The chapter passport is stored only in this browser. `noindex` metadata and headers reduce indexing; enable Vercel deployment protection for actual access control. See [ASSET_CREDITS.md](ASSET_CREDITS.md). Images are optimized WebP and video files are fetched only after a visitor selects a clip.

Globe soundtrack support: place an approved MP3 at `public/media/audio/globe-song.mp3`, update `src/data/globe-music.json` if choosing a different song, and rebuild. Playback starts only with the dance button, pauses with the dance or when leaving/hiding the page, and stops the dance when the song ends. Mute and volume controls appear only when the file is supplied. No song file is bundled yet.
