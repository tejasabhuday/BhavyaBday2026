import "server-only";
import { existsSync } from "node:fs";
import path from "node:path";
import { photos, clips, approvedWishes } from "./media";
import globeMusic from "./globe-music.json";
export function mediaExists(file: string) {
  return existsSync(
    path.join(process.cwd(), "public", file.replace(/^\//, "")),
  );
}
export function availablePhotos() {
  return photos
    .filter((p) => mediaExists(`media/photos/${p.id}.webp`))
    .map((p) => p.id);
}
export function availableGlobeMusic() {
  return mediaExists(globeMusic.file) ? globeMusic : null;
}
export function availableVideos() {
  return [
    ...clips
      .filter((p) => mediaExists(`media/videos/${p.id}.mp4`))
      .map((p) => ({
        title: p.title,
        file: `/media/videos/${p.id}.mp4`,
        poster: mediaExists(`media/videos/${p.id}.jpg`)
          ? `/media/videos/${p.id}.jpg`
          : undefined,
        captions: mediaExists(`media/videos/${p.id}.vtt`)
          ? `/media/videos/${p.id}.vtt`
          : undefined,
      })),
    ...approvedWishes
      .filter((p) => mediaExists(p.file))
      .map((p) => ({ ...p, poster: undefined })),
  ];
}
