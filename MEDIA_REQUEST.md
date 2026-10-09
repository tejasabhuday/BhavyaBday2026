# Complete media checklist — Bhavya’s 21st birthday

**Import complete:** all 22 photo slots and four candid video cards are supplied from `Phtos&VideosBhavya.zip`. See [MEDIA_SELECTION.md](MEDIA_SELECTION.md) for actual filenames and selections. No more photos or videos are needed for the current design. The larger `BhavyaBday.zip` could not be transferred because it exceeds 32 MiB. The original checklist below is retained as a guide for future replacements.

The birthday story is now primarily about **her**. Shared memories are kept in your letter. There are **22 photo slots**: 10 scrapbook photos, 3 present-day portraits, 5 childhood photos and 4 adventure photos. This does **not** mean 22 different photographs: reuse a favourite across the hero, a scrapbook page and the album if you like. Send only the selected files you want used on the website, with a quick note explaining replacements. Files marked “reference only” will not be published.

## 1. The ten scrapbook pages — highest priority

Each is an actual page at `/love-notes/1` through `/love-notes/10`. Each has its own full-proportion photo frame, handwritten note and page-turn navigation.

| Filename / slot | Page | What to send |
| --- | --- | --- |
| `love-01.jpg` | Your smile | Her favourite natural smiling photo. Can reuse `smile.jpg`. |
| `love-02.jpg` | Those expressions | A funny expression, cheeky candid or playful pose. Can reuse `expressions.jpg`. |
| `love-03.jpg` | Your kind of beautiful | Your favourite portrait of her. Can reuse the homepage portrait. |
| `love-04.jpg` | Your everyday magic | An ordinary-day photo: casual, unposed, just her being herself. |
| `love-05.jpg` | The little mischief | A goofy pose, laughing candid or a moment showing her not-so-serious side. |
| `love-06.jpg` | Your effortless style | Her favourite outfit photo, festive look or dressed-up portrait. |
| `love-07.jpg` | Little you | One childhood photo; can reuse one from the childhood album. |
| `love-08.jpg` | Your sense of adventure | A travel/outdoor photo; can reuse one from the adventure album. |
| `love-09.jpg` | All your possibilities | A recent photo that feels like her next chapter: confident, happy, relaxed, or one she loves. No graduation/achievement assumed. |
| `love-10.jpg` | Simply being Bhavya | Your absolute favourite “this is so her” photograph. A second smile or a favourite candid is perfect. |

No artificial face changes, no retouching, no fake clothing. Photos stay fully in frame with `contain`; decoration stays around the photo, not over her face.

## 2. Homepage and present-day album — three slots

| Semantic filename | Suggested original, if available | Use |
| --- | --- | --- |
| `hero.jpg` | `PHOTO-2026-10-08-12-17-45 11.jpg` | Homepage hero: mint festive portrait. Café alternative: `PHOTO-2026-10-08-12-17-45 18.jpg`; tell me if you prefer that. |
| `expressions.jpg` | `PHOTO-2026-10-08-12-17-45 2.jpg` | Her playful expression in the album. |
| `smile.jpg` | `PHOTO-2026-10-08-12-17-45 17.jpg` | Favourite smiling photo in the album. |

You can nominate a new photo for any slot instead. These three may reuse scrapbook photos; you do not need duplicates from your camera roll.

## 3. Childhood album — five slots

| Semantic filename | Complete suggested original filename | Description |
| --- | --- | --- |
| `hats.jpg` | `PHOTO-2026-10-08-12-28-42 5.jpg` | Colourful childhood hats |
| `peace.jpg` | `PHOTO-2026-10-08-12-28-42 14.jpg` | Playful peace sign |
| `coconut.jpg` | `PHOTO-2026-10-08-12-28-42 2.jpg` | Coconut drink |
| `tradition.jpg` | `PHOTO-2026-10-08-12-28-42 9.jpg` | Childhood traditional outfit |
| `outing.jpg` | `PHOTO-2026-10-08-12-28-42 16.jpg` | Childhood outing |

Four or five favourites are enough. If you choose fewer, tell me which slots to hide. Dates, ages and family identities will not be guessed.

## 4. Adventure album — four slots

| Semantic filename | Complete suggested original filename | Description |
| --- | --- | --- |
| `beach.jpg` | `PHOTO-2026-10-08-12-17-45 7.jpg` | Beach / white outfit |
| `gallery.jpg` | `PHOTO-2026-10-08-12-17-45 8.jpg` | Art gallery / red outfit |
| `mountains.jpg` | `PHOTO-2026-10-08-12-17-45 9.jpg` | Mountain view |
| `forest.jpg` | `PHOTO-2026-10-08-12-17-45 12.jpg` | Forest pose |

New adventure photos are welcome in place of these. Caption and alt text will be checked against the actual selected photograph.

## 5. Videos — optional, within her memory book

There is **no screening-room page**. A supplied candid clip appears as a small on-demand “Her little moving moments” section inside the memory book. If no clips are supplied, that section stays hidden.

| Filename / slot | Suggested original | What to send |
| --- | --- | --- |
| `dandelion.mp4` (or `.mov`) | `VIDEO-2026-10-08-12-13-40.mp4` | Her candid moment in the green hills |
| `scenic.mp4` (or `.mov`) | `VIDEO-2026-10-08-12-13-40 9.mp4` | Another outdoor/scenic candid of her |

For a different new clip, tell me which slot it replaces. Upload original quality, not a screen recording of a film. Full duration and native audio are preserved. A spoken clip needs a transcript you have reviewed before I add captions; no captions will be invented. If other people appear or speak, confirm they approve this selected use.

Optional **full birthday film**: send the completed file or the real approved HTTPS viewing URL. If configured, it gets a small link in the memory book, not a separate screening room. No invented film URL appears.

## 6. Dancing globe — no photo or video required

The `/a-little-magic` page already includes an original glass keepsake globe with a dancing couple: black suit, yellow dress, gold stars. Dance/pause, shake-the-globe, and 21 birthday-wish interactions are built in. The couple is a stylised illustration, not a generated portrait or face swap. Nothing personal is needed to make it work.

There is no default music. If you want a soundtrack later, send a track you have permission to use; it must start only after a deliberate visitor action. Do not send copyrighted film soundtracks as assumed background music.

## 7. Optional personal wording

The existing letter is retained. The site already knows her 21st birthday, “beautiful baingan,” “Chunnilal,” and “my everything.” Optional: your signature name, her favourite short phrase, an approved inside joke about her, or a wording change to the letter. The cycle ride and long-distance memories stay in the letter instead of dominating the birthday pages.

## Upload and handling

A single ZIP is easiest, or upload files individually. Use the semantic filenames above, or keep originals and tell me the slot mapping. Where a photo is reused, say e.g. **“Use this for hero + love-03 + love-10.”** Do not send extra unselected camera-roll files. Crop/redact private contact details and notifications before uploading screenshots.

Only approved selected derivatives go into `public/media/`. Raw sources remain outside the public web root. The media allowlist is `src/data/media-manifest.json`. Originals are untouched. Images are resized to WebP, videos to H.264/AAC with posters; rebuild after adding media. Until then, intentional original artwork keeps the site complete without broken images.

```sh
npm run media:prepare -- /absolute/path/to/approved-photos
npm run media:videos -- /absolute/path/to/approved-videos
npm run media:audit
npm run build
```

A share URL and noindex are not access controls. Enable Vercel deployment protection if these memories should require authorised viewing.
