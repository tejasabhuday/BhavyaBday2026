import { existsSync, mkdirSync, copyFileSync } from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { videos } from "./media-manifest.mjs";
const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error("Usage: npm run media:videos -- /path/to/approved-videos");
  process.exit(1);
}
mkdirSync("public/media/videos", { recursive: true });
function run(args) {
  const result = spawnSync(
    "ffmpeg",
    ["-hide_banner", "-loglevel", "error", ...args],
    { stdio: "inherit" },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`ffmpeg exited ${result.status}`);
}
for (const [id, source] of videos) {
  const original = path.join(sourceDir, source);
  const alias = path.join(sourceDir, `${id}.mp4`);
  const mov = path.join(sourceDir, `${id}.mov`);
  const upperMov = path.join(sourceDir, `${id}.MOV`);
  const input = existsSync(original)
    ? original
    : existsSync(alias)
      ? alias
      : existsSync(mov)
        ? mov
        : upperMov;
  if (!existsSync(input)) {
    console.log(`Not supplied: ${source}`);
    continue;
  }
  const output = `public/media/videos/${id}.mp4`;
  // Preserve duration, native audio, and proportions. No montage edits, cropping, music or face alteration.
  run([
    "-y",
    "-i",
    input,
    "-map",
    "0:v:0",
    "-map",
    "0:a?",
    "-vf",
    "scale=w=1280:h=1280:force_original_aspect_ratio=decrease:force_divisible_by=2",
    "-c:v",
    "libx264",
    "-crf",
    "23",
    "-preset",
    "medium",
    "-pix_fmt",
    "yuv420p",
    "-c:a",
    "aac",
    "-b:a",
    "128k",
    "-movflags",
    "+faststart",
    output,
  ]);
  run(["-y", "-i", output, "-frames:v", "1", `public/media/videos/${id}.jpg`]);
  const captions = path.join(sourceDir, `${id}.vtt`);
  if (existsSync(captions)) {
    copyFileSync(captions, `public/media/videos/${id}.vtt`);
    console.log(
      `Copied supplied captions: ${id}.vtt (review before deployment)`,
    );
  }
  console.log(
    `Prepared ${id}.mp4 + poster; full length, native audio, no crop.`,
  );
}
