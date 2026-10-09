import sharp from "sharp";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
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
const manifestPath = "src/data/media-manifest.json";
const photos = JSON.parse(readFileSync(manifestPath, "utf8"));
for (const [id, source] of manifest) {
  const original = path.join(sourceDir, source);
  const alias = path.join(sourceDir, `${id}.jpg`);
  const input = existsSync(original) ? original : alias;
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
  photos.find((photo) => photo.id === id).revision = createHash("sha256")
    .update(readFileSync(`public/media/photos/${id}.webp`))
    .digest("hex").slice(0, 12);
  console.log(`Prepared ${id}.webp (proportions preserved)`);
}
writeFileSync(manifestPath, JSON.stringify(photos, null, 2) + "\n");
