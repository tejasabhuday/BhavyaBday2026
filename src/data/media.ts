export type Photo = {
  id: string;
  source: string;
  caption: string;
  alt: string;
};
const present = "PHOTO-2026-10-08-12-17-45";
const childhood = "PHOTO-2026-10-08-12-28-42";
export const photos: Photo[] = [
  {
    id: "hero",
    source: `${present} 11.jpg`,
    caption: "The leading lady",
    alt: "Bhavya in her mint festive outfit",
  },
  {
    id: "playful",
    source: `${present} 19.jpg`,
    caption: "A little mischief",
    alt: "Bhavya with a heart pendant",
  },
  {
    id: "expressions",
    source: `${present} 2.jpg`,
    caption: "An iconic expression",
    alt: "A playful overhead portrait of Bhavya",
  },
  {
    id: "night",
    source: `${present} 10.jpg`,
    caption: "After-dark energy",
    alt: "Bhavya in a floral dress at night",
  },
  {
    id: "maroon",
    source: `${present} 13.jpg`,
    caption: "Always a classic",
    alt: "Bhavya in a traditional maroon outfit",
  },
  {
    id: "smile",
    source: `${present} 17.jpg`,
    caption: "That smile",
    alt: "Bhavya smiling on a night street",
  },
  {
    id: "hats",
    source: `${childhood} 5.jpg`,
    caption: "Little star, big energy",
    alt: "Childhood photograph of Bhavya wearing colorful hats",
  },
  {
    id: "peace",
    source: `${childhood} 14.jpg`,
    caption: "Already stealing scenes",
    alt: "Young Bhavya making a peace sign",
  },
  {
    id: "coconut",
    source: `${childhood} 2.jpg`,
    caption: "The sweetest intermission",
    alt: "Young Bhavya with a coconut drink",
  },
  {
    id: "tradition",
    source: `${childhood} 9.jpg`,
    caption: "A timeless little moment",
    alt: "Bhavya in a traditional outfit as a child",
  },
  {
    id: "outing",
    source: `${childhood} 16.jpg`,
    caption: "Small adventures, forever memories",
    alt: "A childhood outing with Bhavya and an adult",
  },
  {
    id: "beach",
    source: `${present} 7.jpg`,
    caption: "Salt air & a new scene",
    alt: "Bhavya in a white outfit at the beach",
  },
  {
    id: "gallery",
    source: `${present} 8.jpg`,
    caption: "A work of art",
    alt: "Bhavya in a red outfit in an art gallery",
  },
  {
    id: "mountains",
    source: `${present} 9.jpg`,
    caption: "A different perspective",
    alt: "Bhavya looking toward the mountains",
  },
  {
    id: "forest",
    source: `${present} 12.jpg`,
    caption: "Taking the scenic route",
    alt: "Bhavya posing in a forest",
  },
];
export const heroImage = photos[0];
export const childhoodPhotos = photos.slice(6, 11);
export const adventurePhotos = photos.slice(11);
export const clips = [
  {
    id: "dandelion",
    source: "VIDEO-2026-10-08-12-13-40.mp4",
    title: "A moment in the green hills",
  },
  {
    id: "scenic",
    source: "VIDEO-2026-10-08-12-13-40 9.mp4",
    title: "Taking the scenic route",
  },
];
// Wishes remain excluded until explicit approval, optimized files, and reviewed captions are supplied.
export const approvedWishes: {
  id: string;
  title: string;
  file: string;
  captions?: string;
}[] = [];
