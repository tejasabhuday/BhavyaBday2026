import sharp from "sharp";
import { existsSync, mkdirSync } from "node:fs";
import path from "node:path";
import { manifest } from "./media-manifest.mjs";
const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error(
    "Usage: npm run media:prepare -- /path/to/approved-source-photos",
  );
  process.exit(1);
}
mkdirSync("public/media/photos", { recursive: true });
for (const [id, source] of manifest) {
  const input = path.join(sourceDir, source);
  if (!existsSync(input)) {
    console.log(`Missing: ${source}`);
    continue;
  }
  await sharp(input)
    .rotate()
    .resize({
      width: id === "hero" ? 1200 : 900,
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality: 82 })
    .toFile(`public/media/photos/${id}.webp`);
  console.log(`Prepared ${id}.webp (proportions preserved)`);
}
