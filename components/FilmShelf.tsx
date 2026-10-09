"use client";
import { useState } from "react";
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
  const [pick, setPick] = useState<string | null>(null);
  const shown = films.filter(
    (f) => mood === "All the films" || f.mood === mood,
  );
  const picked = films.find((f) => f.id === pick);
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
        {shown.length} films on this shelf
      </p>
      <div className="film-grid">
        {shown.map((f) => (
          <article className="film-card" key={f.id}>
            <button
              className={`film-cover film-${f.theme}`}
              aria-expanded={selected === f.id}
              aria-controls={`film-${f.id}-details`}
              onClick={() => setSelected(selected === f.id ? null : f.id)}
              aria-label={`Open ${f.title}`}
            >
              <span className="film-cover-top">
                A LITTLE CINEMATIC INSPIRATION · {f.year}
              </span>
              <Motif
                name={
                  f.theme === "train"
                    ? "train"
                    : f.theme === "teen"
                      ? "heart"
                      : f.theme === "bookshop"
                        ? "envelope"
                        : f.theme === "yellow"
                          ? "flower"
                          : "star"
                }
              />
              <span className="film-cover-title">{f.short}</span>
              <span className="film-cover-line">{f.line}</span>
              <span className="film-cover-bottom">
                {selected === f.id ? "CLOSE THE NOTES −" : "OPEN THE NOTES +"}
              </span>
            </button>
            <div className="film-caption">
              <h2>{f.title}</h2>
              <span>{f.year}</span>
            </div>
            <div
              className="film-details"
              id={`film-${f.id}-details`}
              hidden={selected !== f.id}
            >
              <p>{f.personal}</p>
              <p className="film-design-note">{f.inspiration}</p>
              <div className="film-resource-links">
                <a href={f.resource} target="_blank" rel="noopener noreferrer">
                  About the film →
                </a>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(f.trailerSearch)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Find the official trailer →
                </a>
              </div>
              <button
                className="pick-film"
                aria-pressed={pick === f.id}
                onClick={() => setPick(pick === f.id ? null : f.id)}
              >
                {pick === f.id
                  ? "Your movie-night pick ✓"
                  : "Pick for a movie night →"}
              </button>
            </div>
          </article>
        ))}
      </div>
      <div className="movie-night-pick" aria-live="polite">
        <Motif name="ticket" />
        <div>
          <span className="tiny-label">
            SAME FILM. TWO SCREENS. YOU AND ME.
          </span>
          <h2>
            {picked
              ? `${picked.title}? It’s a date.`
              : "My favourite kind of long-distance plan."}
          </h2>
          <p>
            {picked
              ? "Press play at the same time. Stay on the call. I’ll be happy just watching it with you."
              : "Open a cover and pick a film for a late-night rewatch."}
          </p>
          {picked && (
            <a
              href={`https://www.youtube.com/results?search_query=${encodeURIComponent(picked.trailerSearch)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underlined-link"
            >
              Find the trailer →
            </a>
          )}
        </div>
      </div>
      <p className="resource-note">
        Six films that lent this birthday story a little colour. The film notes
        and trailer searches open in a new tab.
      </p>
    </>
  );
}
