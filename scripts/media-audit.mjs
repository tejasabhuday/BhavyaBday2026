import { existsSync } from "node:fs";
import { manifest } from "./media-manifest.mjs";
let found = 0;
for (const [id, source] of manifest) {
  const present = existsSync(`public/media/photos/${id}.webp`);
  if (present) found++;
  console.log(
    `${present ? "READY" : "MISSING (designed placeholder)"}: ${source} → ${id}.webp`,
  );
}
console.log(
  `${found}/${manifest.length} curated photos supplied. No wish videos approved by default.`,
);
