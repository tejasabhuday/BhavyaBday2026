"use client";
import { useState } from "react";
import { motion } from "motion/react";
import { films } from "@/src/data/films";
import { Motif } from "./Artwork";
const moods = [
  "All the films",
  "All the drama",
  "A little mischief",
  "Take the scenic route",
  "Soft & sweet",
];
export function FilmShelf() {
  const [mood, setMood] = useState("All the films");
  const [selected, setSelected] = useState<string | null>(null);
  const shown = films.filter(
    (f) => mood === "All the films" || f.mood === mood,
  );
  return (
    <>
      <div
        className="film-filters"
        role="group"
        aria-label="Choose a movie mood"
      >
        {moods.map((m) => (
          <button key={m} aria-pressed={m === mood} onClick={() => setMood(m)}>
            {m}
          </button>
        ))}
      </div>
      <p className="film-count" aria-live="polite">
        {shown.length} birthday moods on this shelf
      </p>
      <div className="film-grid">
        {shown.map((f) => (
          <motion.article
            className="film-card"
            key={f.id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <button
              className={`film-cover film-${f.theme}`}
              aria-expanded={selected === f.id}
              aria-controls={`film-${f.id}-dedication`}
              onClick={() => setSelected(selected === f.id ? null : f.id)}
              aria-label={`Open ${f.title}`}
            >
              <span className="film-cover-top">THE BHAVYA CUT · {f.year}</span>
              <Motif
                name={
                  f.theme === "train"
                    ? "train"
                    : f.theme === "teen" || f.theme === "sunset"
                      ? "heart"
                      : f.theme === "yellow"
                        ? "flower"
                        : "star"
                }
              />
              <span className="film-cover-title">{f.short}</span>
              <span className="film-cover-line">{f.line}</span>
              <span className="film-cover-bottom">
                {selected === f.id
                  ? "FOLD THE LITTLE NOTE −"
                  : "A NOTE FOR THE BIRTHDAY GIRL +"}
              </span>
            </button>
            <div className="film-caption">
              <h2>{f.title}</h2>
              <span>{f.year}</span>
            </div>
            <div
              className="film-dedication"
              id={`film-${f.id}-dedication`}
              hidden={selected !== f.id}
            >
              <p>{f.dedication}</p>
              <span className="script">Starring Bhavya. Obviously.</span>
            </div>
          </motion.article>
        ))}
      </div>
      <div className="cinema-dedication">
        <Motif name="star" />
        <h2>
          Every genre.
          <br />
          <em>The same unforgettable girl.</em>
        </h2>
        <p>
          A little rom-com sparkle for a birthday that deserves its own
          premiere.
        </p>
      </div>
    </>
  );
}
