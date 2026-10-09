"use client";
import { useState } from "react";
import { photos, type Photo } from "@/src/data/media";
import { PhotoFrame } from "./Experience";
const categories = [
  { id: "together", label: "My favourite scenes" },
  { id: "childhood", label: "Little you" },
  { id: "adventures", label: "Out in the world" },
  { id: "portraits", label: "Just being you" },
];
export function MemoryBook({ available }: { available: string[] }) {
  const [category, setCategory] = useState("together");
  const chosen = photos.filter((p) => p.group === category);
  return (
    <>
      <div
        className="memory-filters"
        role="group"
        aria-label="Photo album chapters"
      >
        {categories.map((c) => (
          <button
            key={c.id}
            aria-pressed={category === c.id}
            onClick={() => setCategory(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="album-caption" aria-live="polite">
        <span className="tiny-label">
          {categories.find((c) => c.id === category)?.label} · {chosen.length}{" "}
          SCENES
        </span>
      </div>
      <div className={`album-grid album-${category}`}>
        {chosen.map((photo, i) => (
          <MemoryCard
            key={photo.id}
            photo={photo}
            available={available.includes(photo.id)}
            index={i}
          />
        ))}
      </div>
    </>
  );
}
function MemoryCard({
  photo,
  available,
  index,
}: {
  photo: Photo;
  available: boolean;
  index: number;
}) {
  return (
    <figure className="album-polaroid">
      <span className="album-tape" aria-hidden="true" />
      {available ? (
        <PhotoFrame photo={photo} available />
      ) : (
        <div
          className={`memory-art memory-art-${photo.id}`}
          role="img"
          aria-label={`${photo.caption}. Personal photo to be added.`}
        >
          <span className="memory-art-symbol" aria-hidden="true">
            {photo.group === "together"
              ? index === 0
                ? "10 km"
                : index === 1
                  ? "▶"
                  : "♡"
              : photo.group === "childhood"
                ? "✿"
                : photo.group === "adventures"
                  ? "✧"
                  : "B."}
          </span>
          <span className="script">
            {photo.artLabel || "A little piece of your story."}
          </span>
          <span className="tiny-label">A PLACE FOR THIS PHOTOGRAPH</span>
        </div>
      )}
      <figcaption>
        <span className="tiny-label">
          FRAME {String(index + 1).padStart(2, "0")}
        </span>
        <h2>{photo.caption}</h2>
        <p>{photo.note}</p>
      </figcaption>
    </figure>
  );
}
