# Bhavya · The Main Character

An original, responsive birthday premiere: Next.js App Router, TypeScript, Tailwind CSS and Motion. Seven cinematic chapters, accessible interactions, silence by default, and a complete experience without personal media.

## Develop

Use Node.js 24 (validated with 24.19.0) and npm 11. Work in this existing checkout; cloud tasks are already isolated and do not need a worktree.

```sh
npm ci
npm run dev
```

## Validate

```sh
npm run lint
npm run typecheck
npm run media:audit
npm run build
npx playwright install chromium # optional: cloud image already supplies /usr/bin/chromium
npm test
```

Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to your Chrome/Chromium binary on other machines. In cloud, use `npm ci --cache /workspace/.npm-cache` to keep the package cache writable.

The browser suite uses the production server and checks 360×800 and 1440×900, overflow, keyboard cards, photo navigation, dialog Escape/focus restoration, missing media, reduced motion and the letter without JavaScript. Screenshots are written to `test-results/` (ignored). No runtime secrets or environment variables are needed.

## Edit the story

Copy and the optional movie URL live in `src/data/siteContent.ts`. Set `movieUrl` only to a real approved HTTPS video URL. Photo source mapping, `heroImage`, video metadata and the deliberately empty wishes list live in `src/data/media.ts`. All photographs use `object-fit: contain`: no face crops, generated faces or clothing changes. System Georgia and Arial provide locally available fonts without external font requests.

## Missing media and approval

Only the brief was supplied; **no personal photographs, clips, wishes or final film are included**. `npm run media:audit` prints the exact 15 selected photo filenames and semantic destination names. Hero alternative: `PHOTO-2026-10-08-12-17-45 18.jpg`; optional letter photo: `PHOTO-2026-10-08-12-17-45.jpg` (not needed for this layout). The remaining five selected portraits are reserved for future approved visual pairing; the current composition avoids unnecessary repeated placeholders.

Place approved original photos outside the repository or in ignored `private-media/`, then run:

```sh
npm run media:prepare -- /absolute/path/to/approved-photos
npm run media:audit
npm run build
```

Sharp applies EXIF orientation and proportion-preserving resize to WebP; it does not retouch or crop. Validate actual compositions and file sizes before deployment. Only the explicit manifest is copied. Public media is ignored by Git to prevent accidental personal-file commits; include approved derivatives securely in the deployment build workspace or consciously force-add only approved derivatives. Never force-add originals or wish source folders.

Optional approved personal clips: `VIDEO-2026-10-08-12-13-40.mp4` → `public/media/videos/dandelion.mp4` and `VIDEO-2026-10-08-12-13-40 9.mp4` → `scenic.mp4`. Use H.264/AAC full-length content and generate matching `dandelion.jpg`/`scenic.jpg` poster thumbnails with ffmpeg. Videos are discovered at build time; rebuild after adding files. They use native controls, muted initial audio, no autoplay and `preload="none"`. Do not add music without rights-cleared assets. Wishes stay excluded until explicit approval from the people involved; add at most 3–4 approved entries and reviewed WebVTT captions. Keep speeches complete. The brief names `BhavyaMom.MP4`, `Hanancollegefriendclose.MP4`, `ozumIrencollegefriendclose.MP4`, and optional `homefriend2.MOV`; none are present or approved here.

## Deploy when approved

Import the repository into Vercel, choose Next.js, Node 24, install `npm ci`, build `npm run build`. No backend or environment values required. This project uses Node-backed build-time media discovery and Next image optimization; use a Next-compatible host (plain static export is not configured). `npm run start` runs the production build.

No analytics, tracking, social embeds or external media requests are included. Metadata and HTTP headers disable indexing. A secret URL and noindex do **not** provide access control: enable host-level deployment protection for private viewing. No deployment is performed by creating/pushing this code. Open Graph artwork contains only text and original shapes.

## Remaining gift preparation

- Supply and approve curated media; visually review originals and optimized images.
- Supply approved video posters and reviewed captions for any enabled speech.
- Replace the editable letter if desired, configure the real film URL when available.
- Review screenshot artifacts and run mobile performance checks with actual media; LCP/4G targets have not been measured with absent assets.
- Approve deployment and configure host-level privacy before sharing the URL.
