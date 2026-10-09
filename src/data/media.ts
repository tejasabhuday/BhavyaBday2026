import manifest from "./media-manifest.json";
export type Photo = {
  id: string;
  source: string;
  group: string;
  caption: string;
  alt: string;
  note: string;
  artLabel: string;
};
export const photos: Photo[] = manifest;
export const heroImage = photos[0];
export const childhoodPhotos = photos.filter((p) => p.group === "childhood");
export const adventurePhotos = photos.filter((p) => p.group === "adventures");
export const clips = [
  {
    id: "dandelion",
    source: "VIDEO-2026-10-08-12-13-40.mp4",
    title: "A little moment in the green hills",
  },
  {
    id: "scenic",
    source: "VIDEO-2026-10-08-12-13-40 9.mp4",
    title: "Taking the scenic route",
  },
];
// Add personal wishes only after explicit approval. Keep the complete message and reviewed captions.
export const approvedWishes: {
  id: string;
  title: string;
  file: string;
  captions?: string;
}[] = [];
