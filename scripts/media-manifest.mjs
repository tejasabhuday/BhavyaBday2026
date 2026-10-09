import photos from "../src/data/media-manifest.json" with { type: "json" };
export const manifest = photos.map((p) => [p.id, p.source]);
export const videos = [
  ["dandelion", "VIDEO-2026-10-08-12-13-40.mp4"],
  ["scenic", "VIDEO-2026-10-08-12-13-40 9.mp4"],
  ["movie-night", "movie-night.mp4"],
  ["hello", "hello.mp4"],
];
