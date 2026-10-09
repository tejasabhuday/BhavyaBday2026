import manifest from "./media-manifest.json";
export type Photo = {
  id: string;
  source: string;
  group: string;
  caption: string;
  alt: string;
  note: string;
  artLabel: string;
  revision?: string;
};
export const photos: Photo[] = manifest;
export const heroImage = photos[0];
export const childhoodPhotos = photos.filter((p) => p.group === "childhood");
export const adventurePhotos = photos.filter((p) => p.group === "adventures");
export { default as clips } from "./video-manifest.json";
// Add personal wishes only after explicit approval. Keep the complete message and reviewed captions.
export const approvedWishes: {
  id: string;
  title: string;
  file: string;
  captions?: string;
}[] = [];
