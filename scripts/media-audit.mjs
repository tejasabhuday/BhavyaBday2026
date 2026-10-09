import { existsSync, statSync } from "node:fs";
import { manifest, videos } from "./media-manifest.mjs";
import globeMusic from "../src/data/globe-music.json" with { type: "json" };
let found = 0;
for (const [id, source] of manifest) {
  const file = `public/media/photos/${id}.webp`;
  const present = existsSync(file);
  if (present) found++;
  console.log(
    `${present ? "READY" : "WAITING (original artwork fallback)"}: ${source} → ${id}.webp${present ? ` (${Math.round(statSync(file).size / 1024)} KB)` : ""}`,
  );
}
console.log(`${found}/${manifest.length} curated photos supplied.`);
console.log(`${new Set(manifest.map(([, source]) => source)).size} distinct photo originals selected.`);
for (const [id, source] of videos) {
  console.log(
    `${existsSync(`public/media/videos/${id}.mp4`) ? "READY" : "WAITING"}: ${source} → ${id}.mp4; poster ${existsSync(`public/media/videos/${id}.jpg`) ? "ready" : "missing"}; reviewed captions ${existsSync(`public/media/videos/${id}.vtt`) ? "present" : "not supplied"}`,
  );
}
console.log(
  "No personal wishes approved by default. Raw media must never go in public/.",
);
console.log(`${existsSync(`public${globeMusic.file}`) ? "READY" : "WAITING (dance works without music)"}: globe soundtrack — ${globeMusic.title} by ${globeMusic.artist}.`);
