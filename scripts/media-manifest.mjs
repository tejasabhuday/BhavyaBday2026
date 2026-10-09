import photos from "../src/data/media-manifest.json" with { type: "json" };
import clips from "../src/data/video-manifest.json" with { type: "json" };
export const manifest = photos.map((p) => [p.id, p.source]);
export const videos = clips.map((p) => [p.id, p.source]);
