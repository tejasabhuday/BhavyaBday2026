# The photos and videos to send

Send these as separate uploads or one ZIP. Only include files you want on her birthday website. Keep original quality; I’ll optimize dimensions and file sizes without changing faces or cropping them. No need to have every item: the pages already have original artwork when an asset is absent.

## The three most personal photos (highest priority)

1. **`first-meeting.jpg`** — a photo from the first meeting, a photo of the two of you around that time, or a photo of the bicycle connected to that day. Say which it is; I won’t label a later photo as the actual first meeting.
2. **`movie-night.jpg`** — a long-distance movie-night screenshot/photo. Crop or redact phone numbers, notifications, private chat messages and other contacts before sending. Don’t include copyrighted film frames as the main image.
3. **`ordinary-day.jpg`** — a natural everyday photo of her that you love. No special outfit or pose required.

## Her photographs (12 more, maximum 15 first batch)

4. **`hero.jpg`** — the favourite portrait you want on the home page. Ideally uncropped vertical, with head and shoulders safely in frame. Existing requested equivalent: `PHOTO-2026-10-08-12-17-45 11.jpg` (mint festive portrait); the café alternative is `PHOTO-2026-10-08-12-17-45 18.jpg`. Tell me which to use.
5. **`expressions.jpg`** — one playful expression (`PHOTO-2026-10-08-12-17-45 2.jpg`).
6. **`smile.jpg`** — your favourite smiling photo (`PHOTO-2026-10-08-12-17-45 17.jpg`).
7–11. **Five childhood photos**: `hats.jpg`, `peace.jpg`, `coconut.jpg`, `tradition.jpg`, `outing.jpg`. Existing equivalents: `PHOTO-2026-10-08-12-28-42 5.jpg`, `14.jpg`, `2.jpg`, `9.jpg`, `16.jpg` (the full shared prefix applies to each). Four are fine if you prefer fewer. No family identities, ages or dates will be invented.
12–15. **Four adventure photos**: `beach.jpg`, `gallery.jpg`, `mountains.jpg`, `forest.jpg`. Existing equivalents: `PHOTO-2026-10-08-12-17-45 7.jpg`, `8.jpg`, `9.jpg`, `12.jpg`.

Semantic filenames above and the complete original filenames in `src/data/media-manifest.json` both work with the import script. If a new photo replaces an old one, tell me the slot and I’ll update its alt text to match the actual photograph.

## Video: 2–4 clips to start

- **`dandelion.mp4`** — her green-hills moment. Existing source: `VIDEO-2026-10-08-12-13-40.mp4`.
- **`scenic.mp4`** — a candid, scenic clip. Existing source: `VIDEO-2026-10-08-12-13-40 9.mp4`.
- **`movie-night.mp4`** — optional 10–30 second clip of a late-night call or the two of you saying hello. Hide contacts/private messages. Avoid a recording of the movie itself.
- **`hello.mp4`** — optional birthday message from you to her, in your own voice. Keep the entire message; there’s no forced length limit. I can use a longer file, too.
- **Birthday film** — send the completed MP4 or its real approved HTTPS viewing URL when ready. This is separate from the small clips; it gets its own feature CTA.

For new videos, tell me what each contains and which slot it should use. If the source is MOV, upload it as-is and I’ll convert it without trimming or changing the message. For spoken clips, a transcript you’ve checked makes it possible to add accurate captions. Captions won’t be guessed.

## Your words

Already included: her 21st birthday; beautiful baingan, Chunnilal, my everything; the first meeting after cycling 10 km; late-night long-distance movie nights; loving her on an ordinary day.

Optional: your name for the signature, a nickname she calls you, and a short phrase you actually say to her. The current signature is “Yours, with all my love.”

## Approval and import

Uploading a chosen file for use in this website approves that selected use; tell me if an upload is reference-only. Personal greetings from other people remain excluded until you confirm they approve being shown on the shareable site. I won’t upload your whole camera roll or unselected wish videos. The website has no analytics. Enable Vercel deployment protection before sharing if the memories should be access-controlled.

For an approved ZIP/folder:

```sh
npm run media:prepare -- /absolute/path/to/approved-photos
npm run media:videos -- /absolute/path/to/approved-videos
npm run media:audit
npm run build
```

Only allowlisted files are processed. Original sources stay outside the web root. Public derivatives are ignored by Git until deliberately selected for a deployment. Each selected photo keeps its proportions; the site uses contain, not a face crop.
